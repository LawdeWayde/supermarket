'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Artificial delay for premium feel
    setTimeout(() => {
      // Fixed User Credentials
      if (email === 'walidabdulhameed@gmail.com' && password === 'lawde_mart') {
        setUser({ email, role: 'user', name: 'Walid' });
        router.push('/');
      } 
      // Fixed Admin Credentials
      else if (email === 'lawdewayde@gmail.com' && password === 'lawde_mart') {
        setUser({ email, role: 'admin', name: 'Admin' });
        router.push('/admin');
      } 
      else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <Link href="/" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to Shop</span>
      </Link>

      <div className="login-card fade-in">
        <div className="login-header">
          <div className="logo bubbly">
            <span className="logo-text">Lawde's</span>
            <span className="logo-accent">Mart</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Login to your account to manage orders</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login Now</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="admin-hint">
            <ShieldCheck size={16} />
            <span>Admin? Use admin credentials to access dashboard</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #000;
          padding: 2rem;
          position: relative;
          color: white;
        }
        .back-link {
          position: absolute;
          top: 3rem;
          left: 3rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--muted);
          font-weight: 700;
          transition: all 0.2s;
        }
        .back-link:hover { color: var(--primary); transform: translateX(-5px); }

        .login-card {
          width: 100%;
          max-width: 480px;
          background: #0a0a0a;
          padding: 4rem;
          border-radius: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border);
        }
        .login-header { text-align: center; margin-bottom: 3rem; }
        .logo { 
          font-size: 2.5rem; 
          font-weight: 950; 
          margin-bottom: 2rem; 
          display: flex; 
          justify-content: center;
          gap: 0.25rem;
          text-transform: uppercase;
          letter-spacing: -0.05em;
        }
        .logo.bubbly {
            font-family: 'Fredoka One', cursive;
        }
        .logo-text { color: white; }
        .logo-accent { 
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .login-header h1 { font-size: 2.25rem; font-weight: 900; margin-bottom: 0.75rem; color: white; }
        .login-header p { color: var(--muted); font-size: 1.1rem; font-weight: 600; }

        .login-form { display: flex; flex-direction: column; gap: 2rem; }
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 1rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          text-align: center;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .input-group { display: flex; flex-direction: column; gap: 0.75rem; }
        .input-group label { font-size: 0.9rem; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          transition: color 0.3s;
        }
        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          padding: 1rem 1.25rem 1rem 3.5rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 1.1rem;
          color: white;
          transition: all 0.3s;
        }
        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.1);
        }
        .input-wrapper input:focus + .input-icon { color: var(--primary); }

        .login-submit {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #000;
          padding: 1.25rem;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: all 0.3s;
          margin-top: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .login-submit:hover:not(:disabled) { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0, 255, 163, 0.3); }
        .login-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .login-footer { margin-top: 3rem; padding-top: 3rem; border-top: 1px solid var(--border); }
        .admin-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: var(--muted);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(0,0,0,0.2);
          border-radius: 50%;
          border-top-color: #000;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LoginPage;
