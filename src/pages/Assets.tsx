import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Assets() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Assets</h1>
        <p className="text-gray-500 mt-2">Manage your uploaded images, videos, and files.</p>
        <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400">
          Asset manager coming soon...
        </div>
      </main>
    </div>
  );
}
