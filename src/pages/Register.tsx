import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuthStore } from '../store/useAuthStore';
import { Rocket } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = await api.get('/users');
      if (users.some((u: any) => u.email === email)) {
        setError('Email already exists');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        plan: "Free Plan",
        avatar: "https://i.pravatar.cc/150"
      };

      await api.post('/users', newUser);
      
      const { password: _, ...userData } = newUser;
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <div className="bg-brand-100 p-3 rounded-lg flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-200 focus:border-brand-200 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-200 focus:border-brand-200 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1e49e2] hover:bg-[#00338d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e49e2] transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link to="/login" className="font-medium text-brand-200 hover:text-brand-100">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
