import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Rocket,
  LayoutDashboard,
  Globe,
  Layers,
  Image as ImageIcon,
  BarChart2,
  Settings
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="w-64 bg-[#0f172a] text-gray-400 flex flex-col shrink-0 flex-none fixed inset-y-0 left-0 z-20">
      <div className="h-16 flex items-center px-6">
         <div className="bg-[#1e49e2] p-1.5 rounded-lg mr-3">
           <Rocket className="w-5 h-5 text-white" />
         </div>
         <span className="text-xl font-bold text-white tracking-tight">MicroBuild</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium ${isActive('/dashboard') ? 'bg-[#1e49e2]/10 text-[#3b82f6]' : 'hover:text-white hover:bg-white/5'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/mysites" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium ${isActive('/mysites') ? 'bg-[#1e49e2]/10 text-[#3b82f6]' : 'hover:text-white hover:bg-white/5'}`}
        >
          <Globe className="w-5 h-5" />
          <span>My Sites</span>
        </Link>
        <Link 
          to="/templates" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium ${isActive('/templates') ? 'bg-[#1e49e2]/10 text-[#3b82f6]' : 'hover:text-white hover:bg-white/5'}`}
        >
          <Layers className="w-5 h-5" />
          <span>Templates</span>
        </Link>
        <Link 
          to="/assets" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium ${isActive('/assets') ? 'bg-[#1e49e2]/10 text-[#3b82f6]' : 'hover:text-white hover:bg-white/5'}`}
        >
          <ImageIcon className="w-5 h-5" />
          <span>Assets</span>
        </Link>
        <Link 
          to="/analytics" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors font-medium ${isActive('/analytics') ? 'bg-[#1e49e2]/10 text-[#3b82f6]' : 'hover:text-white hover:bg-white/5'}`}
        >
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </Link>
      </nav>

      <div className="p-4 mb-4">
        <button 
          className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
