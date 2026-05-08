'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '@/lib/data';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="product-card fade-in">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-unit">₦{product.price}/{product.unit}</div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <div className="product-price">₦{product.price.toLocaleString()}</div>
          <button 
            className="add-button" 
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: var(--card);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 255, 163, 0.1);
          border-color: var(--primary);
        }
        .product-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        .product-unit {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          padding: 0.35rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          border: 1px solid rgba(0, 255, 163, 0.3);
        }
        .product-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--secondary);
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .product-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.25rem;
          flex: 1;
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .product-price {
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--primary);
          text-shadow: 0 0 10px rgba(0, 255, 163, 0.2);
        }
        .add-button {
          background: #f0fdf4;
          color: var(--primary);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .add-button:hover {
          background: var(--primary);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
