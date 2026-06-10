import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../utils/api';
import {
  Search,
  Bell,
  Plus,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Clock,
  Copy,
  Trash2,
  Edit2,
  X,
  Image,
  Upload
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<'desc' | 'asc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Renaming State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectThumbnail, setNewProjectThumbnail] = useState('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewProjectThumbnail(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    const newId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    
    const newProject = {
      id: newId,
      userId: user?.id,
      title: newProjectName,
      status: 'draft',
      lastEdited: new Date().toISOString(),
      thumbnailUrl: newProjectThumbnail || 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80',
      pages: [
        {
          id: `p_${newId}`,
          title: 'Home',
          route: '/',
          layout: []
        }
      ]
    };

    try {
      await api.post('/projects', newProject);
      await loadProjects();
      setIsCreateModalOpen(false);
      setNewProjectName('');
      setNewProjectThumbnail('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      // Optimistic update
      setProjects(prev => prev.filter((p: any) => p.id !== id));
      await api.delete(`/projects/${id}`);
    } catch (err) {
      console.error(err);
      loadProjects(); // Revert on error
    }
  };

  const handleClone = async (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    e.preventDefault();
    const newId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newProject = {
      ...project,
      id: newId,
      title: `${project.title} (Copy)`,
      lastEdited: new Date().toISOString(),
      status: 'draft',
      pages: project.pages.map((p: any) => ({ ...p, id: `p_${newId}_${Math.random().toString(36).substring(2, 6)}`}))
    };
    try {
      await api.post('/projects', newProject);
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateThumbnail = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const newThumbnail = event.target.result as string;
        
        // Optimistic UI update
        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, thumbnailUrl: newThumbnail } : p
        ));

        // API update
        try {
          const projectToUpdate = projects.find(p => p.id === projectId);
          if (projectToUpdate) {
            await api.put(`/projects/${projectId}`, { ...projectToUpdate, thumbnailUrl: newThumbnail });
          }
        } catch (err) {
          console.error('Failed to update thumbnail', err);
          loadProjects(); // Revert on failure
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRename = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return setEditingId(null);
    try {
      // Optimistic update
      setProjects(prev => prev.map((p: any) => p.id === id ? { ...p, title: newTitle.trim() } : p));
      await api.patch(`/projects/${id}`, { title: newTitle.trim() });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      loadProjects(); // Revert
    }
  };

  const startEditing = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingId(project.id);
    setEditTitle(project.title);
  };

  const toggleViewMode = (mode: 'grid' | 'list') => setViewMode(mode);

  const filteredProjects = projects
    .filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((p: any) => statusFilter === 'all' ? true : p.status === statusFilter)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.lastEdited).getTime();
      const dateB = new Date(b.lastEdited).getTime();
      return sortMode === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-gray-900">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search your projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e49e2]/20 focus:border-[#1e49e2] transition-colors text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6 ml-4">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white translate-x-1/3 -translate-y-1/3"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 leading-tight group-hover:text-[#1e49e2] transition-colors">{user?.name || 'Alex Rivera'}</div>
                <div className="text-xs text-gray-500">{user?.plan || 'Pro Plan'}</div>
              </div>
              <img src={user?.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-200" />
            </div>
            <button 
              onClick={() => { logout(); navigate('/login'); }}
               className="text-xs text-gray-400 hover:text-gray-700 underline"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          
          {/* Header Row */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Projects Overview</h1>
              <p className="text-gray-500 mt-1 text-sm">You have {projects.length} active microsites this month.</p>
            </div>
            <button 
              onClick={() => {
                setNewProjectName('New Project');
                setNewProjectThumbnail('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80');
                setIsCreateModalOpen(true);
              }}
              className="flex items-center space-x-2 bg-[#1e49e2] hover:bg-[#1a3fc0] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Microsite</span>
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
               <button 
                 onClick={() => setStatusFilter(statusFilter === 'all' ? 'published' : statusFilter === 'published' ? 'draft' : 'all')}
                 className={`flex items-center space-x-2 border px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${statusFilter !== 'all' ? 'bg-[#1e49e2]/10 border-[#1e49e2]/20 text-[#1e49e2]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
               >
                 <Filter className="w-4 h-4" />
                 <span>Filter {statusFilter !== 'all' && `(${statusFilter})`}</span>
               </button>
               <button 
                 onClick={() => setSortMode(sortMode === 'desc' ? 'asc' : 'desc')}
                 className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
               >
                 <SlidersHorizontal className={`w-4 h-4 text-gray-500 transition-transform ${sortMode === 'asc' ? 'rotate-180' : ''}`} />
                 <span>Recently Edited</span>
               </button>
            </div>
            <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
               <button 
                 onClick={() => toggleViewMode('grid')}
                 className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#1e49e2]/10 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <Grid className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => toggleViewMode('list')}
                 className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#1e49e2]/10 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <List className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            
            {filteredProjects.map((project: any) => (
              <div key={project.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all group flex flex-col shadow-sm">
                <div 
                  className="h-44 bg-gray-50 bg-cover bg-center relative cursor-pointer group/thumb"
                  style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                    <label 
                      className="opacity-0 group-hover/thumb:opacity-100 bg-white/90 text-slate-900 px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer hover:bg-white shadow-sm flex items-center gap-1.5 transition-all translate-y-2 group-hover/thumb:translate-y-0 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image className="w-3.5 h-3.5" /> Change Cover
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleUpdateThumbnail(project.id, e)} 
                      />
                    </label>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  {editingId === project.id ? (
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onBlur={() => handleRename(project.id, editTitle)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(project.id, editTitle);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        onClick={e => { e.stopPropagation(); e.preventDefault(); }}
                        className="w-full border-b border-gray-300 focus:border-[#1e49e2] outline-none text-[15px] font-semibold text-gray-900 py-0.5 bg-gray-50/50"
                      />
                    </div>
                  ) : (
                    <h3 className="font-semibold text-gray-900 text-[15px] line-clamp-1 flex justify-between items-center group/title cursor-pointer" onDoubleClick={(e) => startEditing(e, project)}>
                      {project.title}
                      <button onClick={(e) => startEditing(e, project)} className="opacity-0 group-hover/title:opacity-100 text-gray-400 hover:text-[#1e49e2] transition-opacity p-1">
                         <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                  )}

                  <div className="flex items-center text-xs text-gray-500 mt-1.5 space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Edited {new Date(project.lastEdited).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <Link 
                      to={`/project/${project.id}`}
                      className="text-[#1e49e2] font-semibold text-sm hover:text-[#1a3fc0] transition-colors"
                    >
                      Manage Pages
                    </Link>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={(e) => handleClone(e, project)}
                        title="Clone Project"
                        className="p-1.5 text-gray-400 hover:text-[#1e49e2] hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(e, project.id)}
                        title="Delete Project"
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Project Dashed Card */}
            {viewMode === 'grid' && (
              <button
                onClick={() => {
                  setNewProjectName('New Project');
                  setNewProjectThumbnail('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80');
                  setIsCreateModalOpen(true);
                }}
                className="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-[#1e49e2]/50 hover:bg-[#1e49e2]/5 transition-all min-h-[290px] text-gray-500 hover:text-[#1e49e2] group bg-white/50"
              >
                 <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-[#1e49e2]/10 flex items-center justify-center mb-4 transition-colors">
                   <Plus className="w-6 h-6" />
                 </div>
                 <span className="font-semibold">New Project</span>
              </button>
            )}

          </div>
        </div>
      </main>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Create New Project</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e49e2] focus:border-transparent transition-all"
                  placeholder="e.g. Acme Corp Microsite"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Thumbnail Image (URL or Upload)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={newProjectThumbnail}
                      onChange={(e) => setNewProjectThumbnail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e49e2] focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <label className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg cursor-pointer transition-colors border border-slate-200 whitespace-nowrap">
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {newProjectThumbnail && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 h-32 w-full bg-slate-50 relative group">
                    <img src={newProjectThumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=Invalid+Image'; }} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <label className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer hover:bg-white shadow-sm flex items-center gap-1.5">
                        <Upload className="w-3 h-3" /> Change Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="px-6 py-2 bg-[#1e49e2] text-white text-sm font-bold rounded-lg hover:bg-[#1a3fc0] disabled:opacity-50 transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
