import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuthStore } from '../store/useAuthStore';
import { Rocket } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const loginAsGuest = useAuthStore((state) => state.loginAsGuest);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await api.get('/users');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Strip password before saving to state
        const { password: _, ...userData } = user;
        login(userData);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/builder/guest/new');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="bg-brand-100 p-3 rounded-lg flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-200 focus:border-brand-200 focus:z-10 sm:text-sm"
                placeholder="Email address (alex@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-200 focus:border-brand-200 focus:z-10 sm:text-sm"
                placeholder="Password (password123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1e49e2] hover:bg-[#00338d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e49e2] transition-colors"
            >
              Sign in
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue without an account</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-200 transition-colors shadow-sm"
            >
              Continue as Guest
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link to="/register" className="font-medium text-brand-200 hover:text-brand-100">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
