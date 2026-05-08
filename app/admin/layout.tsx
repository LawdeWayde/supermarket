'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, setUser } = useStore();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Inventory', icon: <Package size={20} />, path: '/admin/inventory' },
    { name: 'Financial Records', icon: <BarChart3 size={20} />, path: '/admin/finance' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/" className="logo bubbly">
            <span className="logo-text">Lawde's</span>
            <span className="logo-accent">Mart</span>
          </Link>
          <div className="admin-badge">ADMIN PORTAL</div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`nav-link ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {pathname === item.path && <ChevronRight size={16} className="active-arrow" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => (window.location.href = '/')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="Search orders, products..." />
          </div>
          
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="user-avatar">A</div>
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Manager</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          {children}
        </div>
      </main>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #050505;
          color: white;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: #0a0a0a;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 10;
        }
        .sidebar-header {
          padding: 2.5rem 2rem;
          border-bottom: 1px solid var(--border);
        }
        .logo { 
          font-size: 2rem; 
          font-weight: 900; 
          display: flex; 
          gap: 0.25rem;
          margin-bottom: 0.75rem; 
          text-transform: uppercase;
          letter-spacing: -0.05em;
        }
        .logo-text { color: white; }
        .logo-accent { 
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .admin-badge {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--primary);
          background: rgba(0, 255, 163, 0.1);
          border: 1px solid rgba(0, 255, 163, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          display: inline-block;
          letter-spacing: 0.1em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          border-radius: 16px;
          color: var(--muted);
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          border: 1px solid transparent;
        }
        .nav-link:hover { 
          background: rgba(255, 255, 255, 0.03); 
          color: white; 
          transform: translateX(5px);
        }
        .nav-link.active { 
          background: rgba(0, 255, 163, 0.08); 
          color: var(--primary);
          border-color: rgba(0, 255, 163, 0.2);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.05);
        }
        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }
        .nav-link:hover .nav-icon { transform: scale(1.2); }
        .active-arrow { margin-left: auto; color: var(--primary); }

        .sidebar-footer { padding: 2rem; border-top: 1px solid var(--border); }
        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          color: #ff4d4d;
          font-weight: 800;
          border-radius: 16px;
          transition: all 0.2s;
          background: rgba(255, 77, 77, 0.05);
          border: 1px solid transparent;
        }
        .logout-btn:hover { 
          background: rgba(255, 77, 77, 0.15);
          border-color: rgba(255, 77, 77, 0.3);
        }

        /* Main Content */
        .main-content { flex: 1; display: flex; flex-direction: column; overflow-x: hidden; }
        .content-header {
          height: 90px;
          background: #0a0a0a;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 3rem;
          position: sticky;
          top: 0;
          z-index: 5;
          backdrop-filter: blur(20px);
        }
        .header-search {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 450px;
          transition: all 0.3s;
        }
        .header-search:focus-within {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.1);
        }
        .header-search input { background: transparent; border: none; outline: none; font-size: 1rem; flex: 1; color: white; }
        .header-search input::placeholder { color: var(--muted); }
        
        .header-actions { display: flex; align-items: center; gap: 2rem; }
        .icon-btn {
          position: relative;
          color: var(--muted);
          padding: 0.75rem;
          border-radius: 50%;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.03);
        }
        .icon-btn:hover { background: rgba(255, 255, 255, 0.08); color: white; }
        .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          border: 2px solid #0a0a0a;
          box-shadow: 0 0 10px var(--primary);
        }

        .user-profile { display: flex; align-items: center; gap: 1rem; padding-left: 1.5rem; border-left: 1px solid var(--border); }
        .user-avatar {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #000;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.25rem;
        }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-size: 1rem; font-weight: 800; color: white; line-height: 1; }
        .user-role { font-size: 0.75rem; color: var(--muted); font-weight: 700; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }

        .page-content { padding: 3rem; flex: 1; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .content-header { padding: 0 1.5rem; }
          .header-search { display: none; }
          .page-content { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
