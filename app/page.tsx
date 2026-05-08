'use client';

import React, { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CategoryFilters from '@/components/CategoryFilters';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/data';
import { useStore } from '@/lib/store';
import { MapPin, Phone, Info } from 'lucide-react';

export default function Home() {
  const { searchQuery, activeCategory } = useStore();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Banner / Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="location-badge">
              <MapPin size={14} />
              <span>Delivering from Ikotun, Alimosho LGA</span>
            </div>
            <h1 className="hero-title bubbly">
              Fresh Groceries <br />
              <span className="text-gradient">Delivered in Lagos</span>
            </h1>
            <p className="hero-subtitle">
              Premium quality groceries at your doorstep. Fast, fresh, and reliable.
            </p>
          </div>
          <div className="hero-banner">
             <div className="promo-card pulse">
                <Info size={20} />
                <span>Large Orders? +2349168994000</span>
             </div>
          </div>
        </div>
      </section>

      <CategoryFilters />

      {/* Product List */}
      <section className="products-section">
        <div className="section-container">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: #0a0a0a;
          color: white;
          padding: 5rem 1.5rem;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 255, 163, 0.1) 0%, transparent 70%);
          filter: blur(80px);
          z-index: 0;
        }
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-content { max-width: 700px; }
        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 163, 0.3);
          color: var(--primary);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .hero-title {
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 0.95;
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
        }
        .text-gradient {
          background: linear-gradient(to right, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.8;
          font-weight: 500;
          max-width: 500px;
          line-height: 1.6;
        }
        .promo-card {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 800;
          box-shadow: 0 0 30px rgba(0, 255, 163, 0.3);
        }
        .pulse {
          animation: pulse 2s infinite;
        }

        .products-section {
          padding: 2rem 1.5rem 4rem;
        }
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
        }
        .no-results {
          text-align: center;
          padding: 4rem;
          color: var(--muted);
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .hero-container { flex-direction: column; text-align: center; gap: 2rem; }
          .hero-content { max-width: none; }
          .location-badge { justify-content: center; }
          .promo-card { width: 100%; justify-content: center; }
        }
      `}</style>
    </main>
  );
}
