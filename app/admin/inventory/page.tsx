'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ArrowUpDown,
  AlertTriangle,
  CheckCircle2,
  Edit2
} from 'lucide-react';
import { PRODUCTS as initialProducts } from '@/lib/data';

const InventoryPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const handleRestock = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, stock: p.stock + 10 } : p
    ));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <div className="page-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Manage your stock levels and product catalog.</p>
        </div>
        <button className="add-product-btn">
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="table-controls">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="filter-btn">
            <ArrowUpDown size={18} />
            <span>Sort</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const isLowStock = product.stock < 20;
              const isCritical = product.stock < 10;

              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={product.image} alt="" />
                      <div className="product-info">
                        <span className="name">{product.name}</span>
                        <span className="id">ID: #{product.id}00{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="category-tag">{product.category}</span></td>
                  <td><span className="price">₦{product.price.toLocaleString()}</span></td>
                  <td>
                    <div className="stock-cell">
                      <div className="stock-bar-bg">
                        <div 
                          className={`stock-bar-fill ${isCritical ? 'critical' : isLowStock ? 'low' : ''}`}
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        ></div>
                      </div>
                      <span className="stock-val">{product.stock} {product.unit}s</span>
                    </div>
                  </td>
                  <td>
                    {isLowStock ? (
                      <span className={`status-badge ${isCritical ? 'critical' : 'warning'}`}>
                        <AlertTriangle size={14} />
                        {isCritical ? 'Critical' : 'Low Stock'}
                      </span>
                    ) : (
                      <span className="status-badge success">
                        <CheckCircle2 size={14} />
                        In Stock
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn edit" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="restock-btn" 
                        onClick={() => handleRestock(product.id)}
                      >
                        Restock +10
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--foreground); }
        .page-header p { color: var(--muted); }
        .add-product-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }
        .add-product-btn:hover { background: var(--primary-dark); }

        .table-controls { display: flex; justify-content: space-between; margin-bottom: 1.5rem; gap: 1rem; }
        .search-bar {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          max-width: 400px;
        }
        .search-bar input { border: none; outline: none; flex: 1; font-size: 0.9rem; }
        .filter-group { display: flex; gap: 0.75rem; }
        .filter-btn {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.6rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--muted);
          transition: all 0.2s;
        }
        .filter-btn:hover { border-color: var(--primary); color: var(--primary); }

        .table-container {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .inventory-table { width: 100%; border-collapse: collapse; text-align: left; }
        .inventory-table th {
          padding: 1rem 1.5rem;
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
        }
        .inventory-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        
        .product-cell { display: flex; align-items: center; gap: 1rem; }
        .product-cell img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border); }
        .product-info { display: flex; flex-direction: column; }
        .product-info .name { font-weight: 700; color: var(--foreground); font-size: 0.95rem; }
        .product-info .id { font-size: 0.75rem; color: var(--muted); font-family: monospace; }
        
        .category-tag {
          background: #f1f5f9;
          color: var(--muted);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .price { font-weight: 700; color: var(--foreground); }
        
        .stock-cell { display: flex; flex-direction: column; gap: 0.4rem; min-width: 140px; }
        .stock-bar-bg { height: 6px; background: #f1f5f9; border-radius: 10px; overflow: hidden; }
        .stock-bar-fill { height: 100%; background: var(--primary); transition: width 0.3s, background 0.3s; }
        .stock-bar-fill.low { background: #f59e0b; }
        .stock-bar-fill.critical { background: #ef4444; }
        .stock-val { font-size: 0.75rem; font-weight: 600; color: var(--muted); }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .status-badge.success { background: #ecfdf5; color: #10b981; }
        .status-badge.warning { background: #fff7ed; color: #f59e0b; }
        .status-badge.critical { background: #fef2f2; color: #ef4444; }
        
        .action-btns { display: flex; align-items: center; gap: 0.75rem; }
        .edit { color: var(--muted); border: 1px solid var(--border); }
        .edit:hover { background: #f1f5f9; color: var(--foreground); }
        .restock-btn {
          background: #f0fdf4;
          color: var(--primary);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid #dcfce7;
          transition: all 0.2s;
        }
        .restock-btn:hover { background: var(--primary); color: white; }

        @media (max-width: 1024px) {
          .inventory-table { display: block; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
};

export default InventoryPage;
