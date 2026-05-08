'use client';

import React from 'react';
import { User, Bell, Lock, Globe, Truck, CreditCard, Save } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and store configuration.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="section-header">
            <User size={20} />
            <h3>Profile Information</h3>
          </div>
          <div className="section-content">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-input" defaultValue="Admin User" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-input" defaultValue="lawdewayde@gmail.com" />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Truck size={20} />
            <h3>Delivery Configuration</h3>
          </div>
          <div className="section-content">
            <div className="form-group">
              <label>Base Delivery Fee (₦)</label>
              <input type="number" className="form-input" defaultValue="500" />
            </div>
            <div className="form-group">
              <label>Operating Hours</label>
              <input type="text" className="form-input" defaultValue="8:00 AM - 9:00 PM" />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Lock size={20} />
            <h3>Security</h3>
          </div>
          <div className="section-content">
            <button className="secondary-btn">Change Password</button>
            <button className="secondary-btn">Enable Two-Factor Auth</button>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button className="save-btn">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 800; }
        .page-header p { color: var(--muted); }

        .settings-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; max-width: 800px; }
        .settings-section { background: white; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; }
        .section-header { padding: 1.25rem 1.5rem; background: #f8fafc; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.75rem; }
        .section-header h3 { font-size: 1rem; font-weight: 700; }
        .section-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }

        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--muted); }
        .form-input { padding: 0.75rem; border: 1px solid var(--border); border-radius: 10px; font-size: 0.95rem; }
        .form-input:focus { outline: none; border-color: var(--primary); }

        .secondary-btn { padding: 0.75rem 1.25rem; border: 1px solid var(--border); border-radius: 10px; font-weight: 700; color: var(--muted); text-align: left; transition: all 0.2s; width: fit-content; }
        .secondary-btn:hover { border-color: var(--primary); color: var(--primary); }

        .settings-footer { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
        .save-btn { background: var(--primary); color: white; padding: 0.85rem 2rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 0.75rem; transition: background 0.2s; }
        .save-btn:hover { background: var(--primary-dark); }
      `}</style>
    </div>
  );
};

export default SettingsPage;
