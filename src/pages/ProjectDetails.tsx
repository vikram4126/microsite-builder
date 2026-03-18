import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { 
  Plus, 
  FileText, 
  Settings, 
  Copy, 
  Trash2, 
  ChevronLeft,
  Layout,
  Edit2
} from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Renaming State
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editPageTitle, setEditPageTitle] = useState('');

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setIsLoading(true);
      const data = await api.get(`/projects/${projectId}`);
      setProject(data);
    } catch (err) {
      console.error('Failed to load project details', err);
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!project) return;
    
    const newPageId = `p_${projectId}_${Date.now().toString().substring(5)}`;
    const newPage = {
      id: newPageId,
      title: `Page ${project.pages.length + 1}`,
      route: `/page-${project.pages.length + 1}`,
      layout: []
    };

    const updatedProject = {
      ...project,
      lastEdited: new Date().toISOString(),
      pages: [...project.pages, newPage]
    };

    try {
      // Optimistic update
      setProject(updatedProject);
      await api.put(`/projects/${projectId}`, updatedProject);
    } catch (err) {
      console.error(err);
      loadProject();
    }
  };

  const handleClonePage = async (pageToClone: any) => {
    if (!project) return;

    const newPageId = `p_${projectId}_${Date.now().toString().substring(5)}`;
    const newPage = {
      ...pageToClone,
      id: newPageId,
      title: `${pageToClone.title} (Copy)`,
      route: `${pageToClone.route}-copy`
    };

    const updatedProject = {
      ...project,
      lastEdited: new Date().toISOString(),
      pages: [...project.pages, newPage]
    };

    try {
      setProject(updatedProject);
      await api.put(`/projects/${projectId}`, updatedProject);
    } catch (err) {
      console.error(err);
      loadProject();
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!project) return;
    if (project.pages.length <= 1) {
      alert('A project must have at least one page.');
      return;
    }

    const updatedProject = {
      ...project,
      lastEdited: new Date().toISOString(),
      pages: project.pages.filter((p: any) => p.id !== pageId)
    };

    try {
      setProject(updatedProject);
      await api.put(`/projects/${projectId}`, updatedProject);
    } catch (err) {
      console.error(err);
      loadProject();
    }
  };

  const handleRenamePage = async (pageId: string, newTitle: string) => {
    if (!project || !newTitle.trim()) return setEditingPageId(null);
    
    const updatedProject = {
      ...project,
      lastEdited: new Date().toISOString(),
      pages: project.pages.map((p: any) => p.id === pageId ? { ...p, title: newTitle.trim() } : p)
    };

    try {
      setProject(updatedProject);
      await api.put(`/projects/${projectId}`, updatedProject);
      setEditingPageId(null);
    } catch (err) {
      console.error(err);
      loadProject();
    }
  };

  const startEditingPage = (e: React.MouseEvent, page: any) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingPageId(page.id);
    setEditPageTitle(page.title);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e49e2]"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 shrink-0 sticky top-0 z-10">
          <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-[#1e49e2] transition-colors mr-4">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium text-sm ml-1">Back</span>
          </Link>
          <div className="h-5 w-px bg-gray-200 mx-4"></div>
          <h1 className="font-semibold text-lg">{project.title}</h1>
          <span className="ml-3 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
            {project.pages.length} Pages
          </span>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Project Pages</h2>
              <p className="text-gray-500 mt-1 text-sm">Manage the structure and inner pages of your microsite.</p>
            </div>
            <button 
              onClick={handleCreatePage}
              className="flex items-center space-x-2 bg-[#1e49e2] hover:bg-[#1a3fc0] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Page</span>
            </button>
          </div>

          <div className="grid gap-4">
            {project.pages.map((page: any) => (
              <div key={page.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-[#1e49e2]/30 hover:shadow-sm transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1e49e2]/10 flex items-center justify-center shrink-0">
                     <Layout className="w-6 h-6 text-[#1e49e2]" />
                  </div>
                  <div>
                    {editingPageId === page.id ? (
                        <input 
                          type="text" 
                          value={editPageTitle}
                          onChange={e => setEditPageTitle(e.target.value)}
                          onBlur={() => handleRenamePage(page.id, editPageTitle)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRenamePage(page.id, editPageTitle);
                            if (e.key === 'Escape') setEditingPageId(null);
                          }}
                          autoFocus
                          onClick={e => { e.stopPropagation(); e.preventDefault(); }}
                          className="font-semibold text-gray-900 border-b border-gray-300 focus:border-[#1e49e2] outline-none py-0.5 bg-gray-50 max-w-[200px]"
                        />
                    ) : (
                        <h3 className="font-semibold text-gray-900 flex items-center group/pagetitle cursor-pointer" onDoubleClick={(e) => startEditingPage(e, page)}>
                          {page.title}
                          <button onClick={(e) => startEditingPage(e, page)} className="opacity-0 group-hover/pagetitle:opacity-100 text-gray-400 hover:text-[#1e49e2] transition-opacity p-1 ml-1">
                             <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </h3>
                    )}
                    <p className="text-sm text-gray-500 font-mono mt-0.5">{page.route === '/' ? '/ (Home)' : page.route}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => navigate(`/builder/${project.id}/${page.id}`)}
                    className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Edit in Builder</span>
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-1"></div>
                  <button 
                    onClick={() => handleClonePage(page)}
                    title="Clone Page"
                    className="p-2 text-gray-400 hover:text-[#1e49e2] hover:bg-[#1e49e2]/10 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePage(page.id)}
                    title="Delete Page"
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
