'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, MapPin, ChevronDown, CheckCircle } from 'lucide-react';
import { useStore } from '@/lib/store';
import { LOCATIONS } from '@/lib/data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    totalPrice, 
    selectedLocation, 
    setSelectedLocation 
  } = useStore();

  const [showLocationSelect, setShowLocationSelect] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer slide-in-right" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="header-title">
            <span className="cart-icon">🛒</span>
            <h2>Your Cart</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length > 0 ? (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">₦{item.price.toLocaleString()}</p>
                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                        </div>
                        <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="item-total">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="delivery-section">
                <div className="delivery-header" onClick={() => setShowLocationSelect(!showLocationSelect)}>
                  <div className="delivery-info">
                    <MapPin size={18} className="text-primary" />
                    <div className="delivery-text">
                      <span className="delivery-label">Delivery Location</span>
                      <span className="delivery-value">
                        {selectedLocation ? selectedLocation.name : 'Select your area...'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={20} className={`chevron ${showLocationSelect ? 'rotated' : ''}`} />
                </div>

                {showLocationSelect && (
                  <div className="location-list">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        className={`location-item ${selectedLocation?.id === loc.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setShowLocationSelect(false);
                        }}
                      >
                        <div className="loc-name">
                          <span>{loc.name}</span>
                          {loc.distance && <small>{loc.distance}</small>}
                        </div>
                        <span className="loc-fee">₦{loc.fee}</span>
                        {selectedLocation?.id === loc.id && <CheckCircle size={16} className="check-icon" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <span className="empty-icon">🛍️</span>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Select location'}</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
            <Link href="/checkout" style={{ width: '100%' }}>
              <button 
                className="checkout-btn" 
                disabled={!selectedLocation}
                onClick={onClose}
              >
                Proceed to Checkout
              </button>
            </Link>
            {!selectedLocation && (
              <p className="checkout-hint">Please select a delivery location first</p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          justify-content: flex-end;
        }
        .cart-drawer {
          width: 100%;
          max-width: 480px;
          background: rgba(18, 18, 18, 0.95);
          backdrop-filter: blur(25px);
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 50px rgba(0, 0, 0, 0.5);
          border-left: 1px solid var(--border);
          color: white;
        }
        .cart-header {
          padding: 2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .header-title h2 { font-size: 1.5rem; font-weight: 800; }
        .cart-icon { font-size: 1.75rem; }
        .close-button { color: var(--muted); padding: 0.5rem; border-radius: 50%; transition: all 0.2s; }
        .close-button:hover { background: rgba(255, 255, 255, 0.05); color: white; }

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .cart-item {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .item-details {
          flex: 1;
        }
        .item-name { font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem; color: white; }
        .item-price { font-size: 0.9rem; color: var(--muted); margin-bottom: 0.75rem; }
        .item-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.35rem 0.75rem;
          border-radius: 10px;
          border: 1px solid var(--border);
        }
        .quantity-controls button {
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .quantity-controls button:hover { transform: scale(1.2); }
        .quantity-controls span { font-weight: 800; min-width: 24px; text-align: center; font-size: 1rem; color: white; }
        .remove-button { color: #ef4444; opacity: 0.6; transition: opacity 0.2s; }
        .remove-button:hover { opacity: 1; }
        .item-total { font-weight: 900; font-size: 1.1rem; color: var(--primary); }

        .delivery-section {
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          margin-top: 2rem;
        }
        .delivery-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        .delivery-info { display: flex; align-items: center; gap: 1rem; }
        .delivery-text { display: flex; flex-direction: column; }
        .delivery-label { font-size: 0.8rem; color: var(--muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .delivery-value { font-size: 1rem; font-weight: 800; color: white; }
        .chevron { color: var(--primary); transition: transform 0.3s; }
        .chevron.rotated { transform: rotate(180deg); }

        .location-list {
          max-height: 300px;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid var(--border);
        }
        .location-item {
          width: 100%;
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          transition: all 0.2s;
          color: var(--muted);
        }
        .location-item:hover { background: rgba(0, 255, 163, 0.05); color: white; }
        .location-item.selected { background: rgba(0, 255, 163, 0.1); color: var(--primary); }
        .loc-name { display: flex; flex-direction: column; align-items: flex-start; }
        .loc-name span { font-size: 0.95rem; font-weight: 700; }
        .loc-name small { font-size: 0.75rem; opacity: 0.7; }
        .loc-fee { font-weight: 800; color: var(--primary); }

        .empty-cart {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }
        .empty-icon { font-size: 5rem; margin-bottom: 2rem; opacity: 0.2; }
        .empty-cart h3 { font-size: 1.5rem; margin-bottom: 0.75rem; color: white; }
        .empty-cart p { color: var(--muted); margin-bottom: 2.5rem; font-size: 1.1rem; }
        .continue-btn {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 100px;
          font-weight: 800;
          box-shadow: 0 10px 20px rgba(0, 255, 163, 0.2);
        }

        .cart-footer {
          padding: 2.5rem 2rem;
          border-top: 1px solid var(--border);
          background: rgba(18, 18, 18, 0.8);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          color: var(--muted);
          font-size: 1rem;
          font-weight: 600;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 1.25rem 0 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          font-size: 1.75rem;
          font-weight: 900;
          color: white;
        }
        .checkout-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #000;
          padding: 1.25rem;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 15px 30px rgba(0, 255, 163, 0.3);
        }
        .checkout-btn:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0, 255, 163, 0.4); }
        .checkout-btn:disabled { background: var(--border); color: var(--muted); cursor: not-allowed; box-shadow: none; }
        .checkout-hint {
          text-align: center;
          font-size: 0.85rem;
          color: #ef4444;
          margin-top: 1rem;
        }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
