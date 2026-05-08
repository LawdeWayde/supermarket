'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CreditCard, Banknote, Truck, Clock, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store';
import Navbar from '@/components/Navbar';

const CheckoutPage = () => {
  const { cart, subtotal, deliveryFee, totalPrice, selectedLocation, clearCart } = useStore();
  const [isPlaced, setIsPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryTime, setDeliveryTime] = useState('asap');

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    // In a real app, we would send this to the server here
    // clearCart(); // We'll keep it for the success view until they click "Continue Shopping"
  };

  if (isPlaced) {
    return (
      <div className="checkout-page success-view">
        <div className="success-card fade-in">
          <div className="success-icon pulse">
            <CheckCircle2 size={80} color="var(--primary)" />
          </div>
          <h1 className="bubbly">Order Placed!</h1>
          <p className="success-msg">Your fresh groceries are being prepared. Get ready for delivery!</p>
          
          <div className="order-details">
            <div className="detail-row">
              <span className="label">Order Number</span>
              <span className="value">#FC-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="detail-row">
              <span className="label">Estimated Delivery</span>
              <span className="value">30-60 minutes</span>
            </div>
          </div>

          <Link href="/" onClick={() => clearCart()} className="continue-shopping">
            Continue Shopping
          </Link>
        </div>

        <style jsx>{`
          .success-view {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            padding: 2rem;
          }
          .success-card {
            background: #0a0a0a;
            padding: 4rem;
            border-radius: 2rem;
            border: 1px solid var(--border);
            text-align: center;
            max-width: 550px;
            width: 100%;
            box-shadow: 0 0 50px rgba(0, 255, 163, 0.1);
          }
          .success-icon { margin-bottom: 2rem; display: inline-block; padding: 1.5rem; background: rgba(0, 255, 163, 0.1); border-radius: 50%; }
          .success-card h1 { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; color: white; }
          .success-msg { color: var(--muted); margin-bottom: 2.5rem; font-size: 1.25rem; line-height: 1.6; }
          
          .order-details {
            background: rgba(255, 255, 255, 0.03);
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 3rem;
            border: 1px solid var(--border);
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }
          .detail-row:last-child { margin-bottom: 0; }
          .label { color: var(--muted); font-size: 1rem; font-weight: 700; }
          .value { font-weight: 900; color: var(--primary); font-size: 1.1rem; }

          .continue-shopping {
            display: block;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: #000;
            padding: 1.25rem;
            border-radius: 100px;
            font-weight: 900;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.3s;
          }
          .continue-shopping:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0, 255, 163, 0.3); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />
      
      <div className="checkout-container">
        <Link href="/" className="back-to-shop">
          <ArrowLeft size={18} />
          <span>Back to Shopping</span>
        </Link>

        <div className="checkout-grid">
          <div className="checkout-main">
            <div className="checkout-card">
              <h2 className="card-title">Delivery Details</h2>
              
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Harry Simeon" className="checkout-input" />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+2349168994000" className="checkout-input" />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea placeholder="22 b kehinde Olalobi street, Germade estate" className="checkout-input" rows={3}></textarea>
              </div>

              <div className="delivery-meta">
                <div className="meta-item">
                  <div className="meta-label">Selected Area</div>
                  <div className="meta-value">{selectedLocation?.name} ({selectedLocation?.distance})</div>
                </div>
                <div className="meta-item">
                  <div className="meta-label">Delivery Fee</div>
                  <div className="meta-value">₦{deliveryFee.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2 className="card-title">Delivery Time</h2>
              <div className="option-grid">
                {[
                  { id: 'asap', label: 'As soon as possible', sub: '30-60 mins' },
                  { id: '2h', label: 'Within 2 hours', sub: '' },
                  { id: 'evening', label: 'Today Evening', sub: '4PM - 7PM' },
                  { id: 'tomorrow', label: 'Tomorrow Morning', sub: '9AM - 12PM' }
                ].map((time) => (
                  <button 
                    key={time.id}
                    className={`option-btn ${deliveryTime === time.id ? 'active' : ''}`}
                    onClick={() => setDeliveryTime(time.id)}
                  >
                    <Clock size={18} />
                    <div className="option-text">
                      <span className="option-label">{time.label}</span>
                      {time.sub && <span className="option-sub">{time.sub}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="checkout-card">
              <h2 className="card-title">Payment Method</h2>
              <div className="option-grid">
                {[
                  { id: 'cash', label: 'Cash', icon: <Banknote size={18} /> },
                  { id: 'transfer', label: 'Transfer', icon: <ShieldCheck size={18} /> },
                  { id: 'card', label: 'Card', icon: <CreditCard size={18} /> }
                ].map((method) => (
                  <button 
                    key={method.id}
                    className={`option-btn ${paymentMethod === method.id ? 'active' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    {method.icon}
                    <span className="option-label">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="checkout-sidebar">
            <div className="summary-card">
              <h3 className="summary-title">Summary</h3>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <span className="item-q-n">{item.quantity}x {item.name}</span>
                    <span className="item-p">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="summary-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Total Amount</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page { background: #000; min-height: 100vh; color: white; }
        .checkout-container { max-width: 1200px; margin: 0 auto; padding: 3rem 1.5rem; }
        .back-to-shop { display: flex; align-items: center; gap: 0.75rem; color: var(--muted); font-weight: 700; margin-bottom: 2.5rem; transition: all 0.2s; width: fit-content; }
        .back-to-shop:hover { color: var(--primary); transform: translateX(-5px); }

        .checkout-grid { display: grid; grid-template-columns: 1fr 400px; gap: 3rem; }
        .checkout-main { display: flex; flex-direction: column; gap: 2rem; }
        .checkout-card { background: #0a0a0a; padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .card-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 2rem; color: white; border-left: 4px solid var(--primary); padding-left: 1rem; }

        .form-group { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
        .form-group label { font-size: 0.9rem; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .checkout-input { padding: 1rem 1.25rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); border-radius: 12px; font-size: 1.1rem; color: white; transition: all 0.3s; }
        .checkout-input:focus { outline: none; border-color: var(--primary); background: rgba(255, 255, 255, 0.07); box-shadow: 0 0 20px rgba(0, 255, 163, 0.1); }

        .delivery-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .meta-label { font-size: 0.8rem; color: var(--muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; }
        .meta-value { font-weight: 900; color: var(--primary); font-size: 1rem; }

        .option-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
        .option-btn { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); border-radius: 16px; transition: all 0.3s; text-align: left; color: var(--muted); }
        .option-btn.active { border-color: var(--primary); background: rgba(0, 255, 163, 0.05); color: white; box-shadow: 0 0 20px rgba(0, 255, 163, 0.1); }
        .option-text { display: flex; flex-direction: column; }
        .option-label { font-weight: 800; font-size: 1rem; }
        .option-sub { font-size: 0.75rem; opacity: 0.7; }

        .summary-card { background: #0a0a0a; padding: 2.5rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: sticky; top: 120px; }
        .summary-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
        .summary-items { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem; }
        .summary-item { display: flex; justify-content: space-between; font-size: 1rem; }
        .item-q-n { color: var(--muted); font-weight: 600; }
        .item-p { color: white; font-weight: 800; }
        
        .summary-footer { border-top: 1px dashed var(--border); padding-top: 2rem; margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem; }
        .summary-row { display: flex; justify-content: space-between; font-size: 1.1rem; color: var(--muted); font-weight: 700; }
        .total-row { display: flex; justify-content: space-between; font-size: 2rem; font-weight: 950; color: var(--primary); margin-top: 1rem; text-shadow: 0 0 20px rgba(0, 255, 163, 0.2); }
        
        .place-order-btn { width: 100%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #000; padding: 1.5rem; border-radius: 100px; font-weight: 900; font-size: 1.25rem; margin-top: 2.5rem; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.05em; }
        .place-order-btn:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 255, 163, 0.4); }

        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .checkout-sidebar { order: -1; }
          .summary-card { position: static; }
        }
      `}</style>
    </div>

  );
};

export default CheckoutPage;
