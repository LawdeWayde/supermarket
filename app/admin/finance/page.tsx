'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Plus, 
  Download, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  DollarSign,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';

const FinancePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowAddModal(false);
    }, 2000);
  };

  const transactions = [
    { id: 'TR-9021', date: 'May 08, 2026', desc: 'Grocery Sale - Order #8821', type: 'Income', amount: 23500, status: 'Completed' },
    { id: 'TR-9020', date: 'May 08, 2026', desc: 'Bulk Supply Restock (Apples)', type: 'Expense', amount: 45000, status: 'Completed' },
    { id: 'TR-9019', date: 'May 07, 2026', desc: 'Grocery Sale - Order #8819', type: 'Income', amount: 12800, status: 'Completed' },
    { id: 'TR-9018', date: 'May 07, 2026', desc: 'Utility Bill - Electricity', type: 'Expense', amount: 15000, status: 'Completed' },
    { id: 'TR-9017', date: 'May 06, 2026', desc: 'Grocery Sale - Order #8815', type: 'Income', amount: 31200, status: 'Completed' },
  ];

  return (
    <div className="finance-page">
      <div className="page-header">
        <div>
          <h1>Financial Records</h1>
          <p>Monitor revenue, expenses, and transaction history.</p>
        </div>
        <div className="header-btns">
          <button className="export-btn">
            <Download size={20} />
            <span>Export CSV</span>
          </button>
          <button className="add-record-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            <span>Add New Record</span>
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card income">
          <div className="summary-info">
            <span className="label">Total Income (May)</span>
            <span className="value">₦1,850,200</span>
          </div>
          <div className="summary-icon"><TrendingUp size={24} /></div>
        </div>
        <div className="summary-card expense">
          <div className="summary-info">
            <span className="label">Total Expenses (May)</span>
            <span className="value">₦420,500</span>
          </div>
          <div className="summary-icon"><TrendingDown size={24} /></div>
        </div>
        <div className="summary-card profit">
          <div className="summary-info">
            <span className="label">Net Profit</span>
            <span className="value">₦1,429,700</span>
          </div>
          <div className="summary-icon"><DollarSign size={24} /></div>
        </div>
      </div>

      <div className="records-card">
        <div className="card-header">
          <h3>Recent Transactions</h3>
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search transactions..." />
          </div>
        </div>

        <div className="table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tr) => (
                <tr key={tr.id}>
                  <td><span className="tr-id">{tr.id}</span></td>
                  <td><span className="date">{tr.date}</span></td>
                  <td><span className="desc">{tr.desc}</span></td>
                  <td>
                    <span className={`type-tag ${tr.type.toLowerCase()}`}>
                      {tr.type === 'Income' ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                      {tr.type}
                    </span>
                  </td>
                  <td><span className={`amount ${tr.type.toLowerCase()}`}>₦{tr.amount.toLocaleString()}</span></td>
                  <td><span className="status">Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Financial Record</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <Plus size={24} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            {isSuccess ? (
              <div className="success-state">
                <CheckCircle size={64} color="var(--primary)" />
                <h3>Record Added Successfully</h3>
                <p>The transaction has been recorded in the system.</p>
              </div>
            ) : (
              <form onSubmit={handleAddRecord}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Transaction Type</label>
                    <select className="form-input">
                      <option>Income</option>
                      <option>Expense</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount (₦)</label>
                    <input type="number" className="form-input" placeholder="0.00" required />
                  </div>
                  <div className="form-group full">
                    <label>Description</label>
                    <input type="text" className="form-input" placeholder="e.g. Daily sales summary" required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-input">
                      <option>Sales</option>
                      <option>Supplies</option>
                      <option>Utilities</option>
                      <option>Rent</option>
                      <option>Salary</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-input" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">Record Transaction</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--foreground); }
        .page-header p { color: var(--muted); }
        .header-btns { display: flex; gap: 1rem; }
        
        .export-btn {
          background: white;
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .export-btn:hover { border-color: var(--muted); color: var(--foreground); }
        
        .add-record-btn {
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
        .add-record-btn:hover { background: var(--primary-dark); }

        .summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .summary-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .summary-info { display: flex; flex-direction: column; }
        .summary-info .label { font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; }
        .summary-info .value { font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0.25rem; }
        .summary-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        
        .income .summary-icon { background: #f0fdf4; color: #10b981; }
        .income .value { color: #10b981; }
        .expense .summary-icon { background: #fef2f2; color: #ef4444; }
        .expense .value { color: #ef4444; }
        .profit .summary-icon { background: #eff6ff; color: #3b82f6; }
        .profit .value { color: #3b82f6; }

        .records-card { background: white; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .card-header { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .card-header h3 { font-size: 1.1rem; font-weight: 700; }
        .search-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.75rem; min-width: 300px; }
        .search-box input { background: transparent; border: none; outline: none; flex: 1; font-size: 0.9rem; }

        .table-container { width: 100%; overflow-x: auto; }
        .finance-table { width: 100%; border-collapse: collapse; text-align: left; }
        .finance-table th { padding: 1rem 1.5rem; background: #f8fafc; font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
        .finance-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        
        .tr-id { font-family: monospace; font-weight: 700; color: var(--muted); }
        .type-tag { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.75rem; }
        .type-tag.income { background: #f0fdf4; color: #10b981; }
        .type-tag.expense { background: #fef2f2; color: #ef4444; }
        .amount { font-weight: 800; }
        .amount.income { color: #10b981; }
        .amount.expense { color: #ef4444; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .modal-card { background: white; width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); overflow: hidden; }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .modal-header h2 { font-size: 1.25rem; font-weight: 800; }
        .close-btn { color: var(--muted); }
        
        form { padding: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--muted); margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 10px; font-size: 1rem; }
        .form-input:focus { outline: none; border-color: var(--primary); }
        
        .modal-footer { padding: 1.5rem; background: #f8fafc; display: flex; justify-content: flex-end; gap: 1rem; }
        .cancel-btn { padding: 0.75rem 1.5rem; font-weight: 700; color: var(--muted); }
        .submit-btn { background: var(--primary); color: white; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; }

        .success-state { padding: 3rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; }
      `}</style>
    </div>
  );
};

export default FinancePage;
