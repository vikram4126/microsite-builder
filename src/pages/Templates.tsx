import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Templates() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Templates</h1>
        <p className="text-gray-500 mt-2">Start from a pre-designed premium template.</p>
        <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400">
          Template library coming soon...
        </div>
      </main>
    </div>
  );
}
