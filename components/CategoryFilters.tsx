'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/data';
import { useStore } from '@/lib/store';
import { Apple, Leaf, Milk, Croissant, CupSoda, LayoutGrid } from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Fruits': return <Apple size={18} />;
    case 'Vegetables': return <Leaf size={18} />;
    case 'Dairy': return <Milk size={18} />;
    case 'Bakery': return <Croissant size={18} />;
    case 'Beverages': return <CupSoda size={18} />;
    default: return <LayoutGrid size={18} />;
  }
};

const CategoryFilters = () => {
  const { activeCategory, setActiveCategory } = useStore();

  return (
    <div className="filters-container">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`filter-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => setActiveCategory(category)}
        >
          <CategoryIcon category={category} />
          <span>{category}</span>
        </button>
      ))}

      <style jsx>{`
        .filters-container {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding: 1rem 1.5rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
          max-width: 1200px;
          margin: 0 auto;
        }
        .filters-container::-webkit-scrollbar {
          display: none;
        }
        .filter-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: var(--muted);
          font-weight: 700;
          font-size: 0.95rem;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .filter-button:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(0, 255, 163, 0.05);
          transform: translateY(-2px);
        }
        .filter-button.active {
          background: var(--primary);
          color: #000;
          border-color: var(--primary);
          box-shadow: 0 0 25px rgba(0, 255, 163, 0.4);
        }
      `}</style>
    </div>
  );
};

export default CategoryFilters;
