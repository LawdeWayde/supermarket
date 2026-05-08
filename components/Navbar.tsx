'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { useStore } from '@/lib/store';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { cart, searchQuery, setSearchQuery } = useStore();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" className="logo bubbly">
            <span className="logo-text">Lawde's</span>
            <span className="logo-accent">Mart</span>
          </Link>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for fruits, vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <Search size={20} />
            </button>
          </div>

          <div className="nav-actions">
            <Link href="/login" className="nav-item">
              <User size={24} />
              <span>Login</span>
            </Link>
            <button className="nav-item cart-button" onClick={() => setIsCartOpen(true)}>
              <div className="cart-icon-container">
                <ShoppingCart size={24} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
              <span>Cart</span>
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 0;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          gap: 2rem;
        }
        .logo {
          font-size: 3.5rem;
          font-weight: 950;
          display: flex;
          gap: 0.1rem;
          text-transform: uppercase;
          letter-spacing: -0.06em;
          filter: drop-shadow(0 0 15px rgba(0, 255, 163, 0.4));
          padding: 0.5rem 0;
        }
        .logo-text { color: white; }
        .logo-accent { 
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(0, 255, 163, 0.2);
        }
        
        .search-container {
          flex: 1;
          display: flex;
          max-width: 600px;
          position: relative;
        }
        .search-input {
          width: 100%;
          padding: 1rem 1.5rem;
          padding-right: 3.5rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          transition: all 0.3s;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.2);
        }
        .search-button {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--primary);
          padding: 0.5rem;
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          color: var(--muted);
          font-size: 0.8rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .nav-item:hover { color: var(--primary); transform: translateY(-2px); }
        
        .cart-icon-container {
          position: relative;
        }
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .navbar-container { gap: 1rem; }
          .nav-item span { display: none; }
          .search-container { order: 3; max-width: none; width: 100%; margin-top: 0.5rem; }
          .navbar-container { flex-wrap: wrap; }
        }
      `}</style>
      </>
  );
};

export default Navbar;
