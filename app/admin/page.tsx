'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 198 },
  { name: 'Wed', sales: 2000, orders: 150 },
  { name: 'Thu', sales: 2780, orders: 190 },
  { name: 'Fri', sales: 1890, orders: 130 },
  { name: 'Sat', sales: 2390, orders: 180 },
  { name: 'Sun', sales: 3490, orders: 250 },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening at Lawde's Mart today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper sales">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <div className="stat-value-container">
              <span className="stat-value">₦2,450,000</span>
              <span className="stat-trend up">
                <ArrowUpRight size={14} /> 12%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper orders">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <div className="stat-value-container">
              <span className="stat-value">1,342</span>
              <span className="stat-trend up">
                <ArrowUpRight size={14} /> 8%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper users">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Customers</span>
            <div className="stat-value-container">
              <span className="stat-value">854</span>
              <span className="stat-trend down">
                <ArrowDownRight size={14} /> 3%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stock">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Low Stock Items</span>
            <div className="stat-value-container">
              <span className="stat-value">12</span>
              <div className="stock-alert">
                <AlertTriangle size={14} /> Critical
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Sales Analytics</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Orders by Category</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="orders" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header { margin-bottom: 2rem; }
        .dashboard-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--foreground); }
        .dashboard-header p { color: var(--muted); margin-top: 0.25rem; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .stat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon-wrapper.sales { background: #ecfdf5; color: #10b981; }
        .stat-icon-wrapper.orders { background: #eff6ff; color: #3b82f6; }
        .stat-icon-wrapper.users { background: #fdf2f8; color: #ec4899; }
        .stat-icon-wrapper.stock { background: #fff7ed; color: #f59e0b; }

        .stat-info { flex: 1; }
        .stat-label { font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.025em; }
        .stat-value-container { display: flex; align-items: baseline; gap: 0.75rem; margin-top: 0.25rem; }
        .stat-value { font-size: 1.25rem; font-weight: 800; color: var(--foreground); }
        
        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: 6px;
        }
        .stat-trend.up { background: #f0fdf4; color: #16a34a; }
        .stat-trend.down { background: #fef2f2; color: #dc2626; }
        
        .stock-alert {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: #dc2626;
          background: #fef2f2;
          padding: 0.15rem 0.4rem;
          border-radius: 6px;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .chart-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .chart-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 2rem; color: var(--foreground); }
        .chart-container { width: 100%; height: 300px; }

        @media (max-width: 1024px) {
          .charts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
