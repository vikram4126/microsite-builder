import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { exportStaticWebsite } from '../utils/exportWebsite';
import { registerBlocks } from '../components/builder/Blocks';
import { registerTemplates } from '../components/builder/Templates';
import { registerStyles } from '../components/builder/Styles';
import {
  Monitor, Smartphone, Tablet, Save, Undo, Redo, Play, ChevronLeft, Trash2, Plus, X, Download, Code, Paintbrush, ChevronRight, ChevronDown, Maximize, Minimize, SquareDashed, Search, Cog, Moon, Sun, Palette, Layers, Image
} from 'lucide-react';
import { api } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BoxModelUI } from '../components/builder/BoxModelUI';
import { TypographyUI } from '../components/builder/TypographyUI';
import { MediaUI } from '../components/builder/MediaUI';
import { BorderUI } from '../components/builder/BorderUI';
import { StructuralMap } from '../components/builder/StructuralMap';

// Helper: build breadcrumb path from a GrapesJS component model
function getBreadcrumb(model: any): { name: string; cid: string }[] {
  const crumbs: { name: string; cid: string }[] = [];
  let current = model;
  while (current) {
    const tag = current.get('tagName') || current.get('type') || 'Element';
    const customName = current.getName?.() || '';
    const label = customName || tag.charAt(0).toUpperCase() + tag.slice(1);
    crumbs.unshift({ name: label, cid: current.cid });
    current = current.parent?.();
  }
  return crumbs;
}

export default function Builder() {
  const { projectId, pageSlug } = useParams();
  const navigate = useNavigate();
  const [pageId, setPageId] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const previewWindowRef = useRef<Window | null>(null);

  const [device, setDevice] = useState('desktop');
  const [autoSave, setAutoSave] = useState(true);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [insertAfterCid, setInsertAfterCid] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Layout');
  const [hasSelection, setHasSelection] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [themeColor, setThemeColor] = useState<string>('default');
  const [projectData, setProjectData] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<{ name: string; cid: string }[]>([]);
  const [isBordersActive, setIsBordersActive] = useState(true);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [state, setState] = useState<string>('');

  // Library State
  const [libraryMode, setLibraryMode] = useState<'layouts' | 'elements'>('layouts');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'elements' | 'layers' | 'settings' | 'style' | 'media'>('elements');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Header: true,
  });
  const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [pageToDelete, setPageToDelete] = useState<any>(null);
  const activeTabRef = useRef(activeTab);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Refs for auto-save closures
  const autoSaveRef = useRef(autoSave);
  const projectDataRef = useRef(projectData);
  const isProjectLoaded = useRef(false);
  const pageIdRef = useRef(pageId);
  const saveTimeoutRef = useRef<any>(null);
  const isSyncingRef = useRef(false);
  const injectTailwindThemeRef = useRef<(() => void) | null>(null);
  const forceReScanRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    autoSaveRef.current = autoSave;
  }, [autoSave]);

  useEffect(() => {
    projectDataRef.current = projectData;
  }, [projectData]);

  useEffect(() => {
    pageIdRef.current = pageId;
  }, [pageId]);

  // Handle messages from preview tab
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE_PAGE' && event.data?.pageId) {
        // Find slug for this pageId
        const pData = projectDataRef.current;
        if (pData) {
          const targetPage = pData.pages.find((p: any) => p.id === event.data.pageId);
          if (targetPage) {
            const slug = pData.pages.indexOf(targetPage) === 0 ? 'home' : (targetPage.title || targetPage.name || 'page').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            navigate(`/builder/${projectId}/${slug}`);
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [projectId, navigate]);

  const toggleCategory = (catName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const handleAddPage = async () => {
    if (!newPageName.trim()) {
      toast.error('Page name cannot be empty');
      return;
    }

    const pData = projectDataRef.current;
    if (pData) {
      const newId = Math.random().toString(36).substring(2, 9);
      const newSlug = newPageName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Check if slug already exists
      const exists = pData.pages.some((p: any, idx: number) => {
        const s = idx === 0 ? 'home' : (p.title || p.name || 'page').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return s === newSlug;
      });

      if (exists) {
        toast.error('A page with this name already exists');
        return;
      }

      const updatedProjectWithNew = {
        ...pData,
        pages: [...pData.pages, { 
          id: newId, 
          name: newPageName, 
          title: newPageName,
          route: `/${newSlug}`,
          layout: {} 
        }]
      };

      try {
        if (projectId !== 'guest') {
          await api.put(`/projects/${projectId}`, updatedProjectWithNew);
        }
        setProjectData(updatedProjectWithNew);
        projectDataRef.current = updatedProjectWithNew;
        setIsAddPageModalOpen(false);
        setNewPageName('');
        toast.success(`Page "${newPageName}" added successfully`);
        
        // Update pageId ref immediately before navigation
        pageIdRef.current = newId;
        setPageId(newId);

        navigate(`/builder/${projectId}/${newSlug}`);
        setTimeout(syncNavLinks, 500);
      } catch (err) {
        console.error('Failed to add page', err);
        toast.error('Failed to add page');
      }
    }
  };

  const handleDeletePage = () => {
    const pData = projectDataRef.current;
    if (!pData || !pageId) return;
    
    const currentPage = pData.pages.find((p: any) => p.id === pageId);
    if (!currentPage) return;

    if (currentPage.name === 'Home' || currentPage.title === 'Home' || pData.pages.indexOf(currentPage) === 0) {
      toast.error('Cannot delete the Home page');
      return;
    }

    setPageToDelete(currentPage);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pageToDelete || !projectDataRef.current) return;
    
    const updatedPages = projectDataRef.current.pages.filter((p: any) => p.id !== pageToDelete.id);
    const updatedProject = {
      ...projectDataRef.current,
      pages: updatedPages
    };

    try {
      if (projectId !== 'guest') {
        await api.put(`/projects/${projectId}`, updatedProject);
      }
      setProjectData(updatedProject);
      projectDataRef.current = updatedProject;
      setIsDeleteModalOpen(false);
      setPageToDelete(null);
      toast.success(`Page "${pageToDelete.title || pageToDelete.name}" deleted successfully`);
      
      // Navigate to home page
      navigate(`/builder/${projectId}/home`);
      setTimeout(syncNavLinks, 100);
    } catch (err) {
      console.error('Failed to delete page', err);
      toast.error('Failed to delete page');
    }
  };

  const syncNavLinks = () => {
    if (!editorRef.current || !projectDataRef.current) return;
    const pages = projectDataRef.current.pages;
    const wrapper = editorRef.current.getWrapper();
    const navContainers = wrapper.find('[data-nav-type="dynamic"]');
    
    navContainers.forEach((nav: any) => {
      nav.components().reset();
      pages.forEach((p: any, idx: number) => {
        const slug = idx === 0 ? 'home' : (p.title || p.name || 'page').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        nav.append({
          tagName: 'a',
          type: 'link',
          classes: ['text-slate-600', 'dark:text-slate-300', 'hover:text-accent', 'transition-colors', 'w-full', 'md:w-auto', 'text-center', 'py-2', 'md:py-0', 'border-b', 'border-gray-100', 'md:border-none'],
          attributes: { 
            href: idx === 0 ? 'index.html' : `${slug}.html`, // Relative paths for better compatibility
            'data-page-id': p.id,
            'data-slug': slug
          },
          content: p.title || p.name,
        });
      });
      // Add standard CTA button at the end
      nav.append({
        tagName: 'a',
        type: 'link',
        classes: ['bg-primary', 'text-white', 'hover:bg-accent', 'px-5', 'py-2.5', 'rounded-lg', 'shadow', 'transition-all', 'w-full', 'md:w-auto', 'text-center', 'mt-2', 'md:mt-0'],
        attributes: { href: '#' },
        content: 'Get Started',
      });
    });
  };

  // Sync Theme Settings to Canvas
  useEffect(() => {
    if (!editorRef.current) return;

    const applyTheme = () => {
      const themePresets: any = {
        default: { primary: '#00338d', secondary: '#1e49e2', accent: '#00b8f5' },
        purple: { primary: '#4c1d95', secondary: '#7c3aed', accent: '#a78bfa' },
        dark: { primary: '#0f172a', secondary: '#334155', accent: '#38bdf8' },
        pink: { primary: '#be185d', secondary: '#db2777', accent: '#f472b6' }
      };
      const colors = themePresets[themeColor];

      const body = editorRef.current.Canvas.getBody();
      const iframe = editorRef.current.Canvas.getFrameEl();
      if (!body || !iframe) return;

      // Dark Mode
      if (themeMode === 'dark') {
        body.classList.add('dark');
        body.style.backgroundColor = '#0c233c';
      } else {
        body.classList.remove('dark');
        body.style.backgroundColor = '#ffffff';
      }

      // Inject @custom-variant dark FIRST so Tailwind uses class-based dark mode,
      // never OS prefers-color-scheme. This must run on every canvas reload.
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        let darkVariantStyle = iframeDoc.getElementById('tw-dark-variant-config');
        if (!darkVariantStyle) {
          darkVariantStyle = iframeDoc.createElement('style');
          darkVariantStyle.id = 'tw-dark-variant-config';
          darkVariantStyle.setAttribute('type', 'text/tailwindcss');
          iframeDoc.head.insertBefore(darkVariantStyle, iframeDoc.head.firstChild);
        }
        darkVariantStyle.textContent = `
          @custom-variant dark (&:where(.dark, .dark *));
          @theme {
            --color-primary: #00338d;
            --color-secondary: #1e49e2;
            --color-accent: #00b8f5;
            --color-dark: #0c233c;
            --color-light-accent: #aceaff;
            --color-cta: #00b8f5;
            --color-purple: #7213ea;
            --color-pink: #fd349c;
            --color-success: #00b894;
            --color-background-dark: #071728;
            --font-sans: "Open Sans", sans-serif;
            --font-display: "Open Sans Condensed", sans-serif;
          }
          body { font-family: "Open Sans", sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: "Open Sans Condensed", sans-serif; }
        `;
      }

      // Inject theme variables
      let styleTag = iframe.contentDocument.getElementById('tailwind-theme-vars');
      if (!styleTag) {
        styleTag = iframe.contentDocument.createElement('style');
        styleTag.id = 'tailwind-theme-vars';
        iframe.contentDocument.head.appendChild(styleTag);
      }
      styleTag.textContent = `
        :root {
          --theme-primary: ${colors.primary};
          --theme-secondary: ${colors.secondary};
          --theme-accent: ${colors.accent};
        }
      `;

      if (colors) {
        body.style.setProperty('--theme-primary', colors.primary);
        body.style.setProperty('--color-primary', colors.primary);
        body.style.setProperty('--theme-secondary', colors.secondary);
        body.style.setProperty('--color-secondary', colors.secondary);
        body.style.setProperty('--theme-accent', colors.accent);
        body.style.setProperty('--color-accent', colors.accent);
      }
    };

    applyTheme();

    // Notify preview window of theme change
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      previewWindowRef.current.postMessage({
        type: 'UPDATE_THEME',
        themeMode,
        themeColor
      }, '*');
    }

    // Also apply whenever the canvas loads
    editorRef.current.on('canvas:load', applyTheme);

    return () => {
      if (editorRef.current) {
        editorRef.current.off('canvas:load', applyTheme);
      }
    };
  }, [themeMode, themeColor, pageId]);

  // Custom Code Editor Widget
  const [isCustomCodeModalOpen, setIsCustomCodeModalOpen] = useState(false);
  const [activeCodeBlock, setActiveCodeBlock] = useState<any>(null);
  const [customHtml, setCustomHtml] = useState('');
  const [customCss, setCustomCss] = useState('');
  const [customJs, setCustomJs] = useState('');

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: '100%',
        fromElement: true,
        storageManager: false,
        assetManager: {
          assets: [
            '/images/finance-1.jpg', '/images/finance-2.jpg', '/images/finance-3.jpg', '/images/finance-4.jpg', '/images/finance-5.jpg',
            '/images/business-1.jpg', '/images/business-2.jpg', '/images/business-3.jpg', '/images/business-4.jpg', '/images/business-5.jpg',
            '/images/audit-1.jpg', '/images/audit-2.jpg', '/images/audit-3.jpg', '/images/audit-4.jpg', '/images/audit-5.jpg',
            '/images/tax-1.jpg', '/images/tax-2.jpg', '/images/tax-3.jpg', '/images/tax-4.jpg', '/images/tax-5.jpg',
            '/images/team-1.jpg', '/images/team-2.jpg', '/images/team-3.jpg', '/images/team-4.jpg', '/images/team-5.jpg',
            '/images/banner-background-1.jpg', '/images/banner-background-2.jpg', '/images/banner-background-3.jpg', '/images/banner-background-4.jpg', '/images/banner-background-5.jpg',
            '/images/image-1.png', '/images/image-2.png', '/images/image-3.png', '/images/image-4.png', '/images/image-5.png', '/images/image-6.jpg',
            '/images/signature-image.png', '/images/signature.png'
          ]
        },
        plugins: [],
        blockManager: { appendTo: '#gjs-blocks' },
        styleManager: { appendTo: '#gjs-styles-container' },
        traitManager: { appendTo: '#gjs-traits-container' },
        layerManager: { appendTo: '#gjs-layers-container' },
        selectorManager: { 
          componentFirst: true,
          escapeName: (name: string) => name // Preserve Tailwind classes like md:, dark:, []
        },
        avoidInlineStyle: false,
        undoManager: { trackSelection: false },
        panels: { defaults: [] },
        deviceManager: {
          devices: [
            { id: 'desktop', name: 'Desktop', width: '' },
            { id: 'tablet', name: 'Tablet', width: '768px', widthMedia: '992px' },
            { id: 'mobile', name: 'Mobile', width: '320px', widthMedia: '480px' },
          ]
        },
        colorPicker: {
          hideAfterPaletteSelect: true,
          palette: [
            ['#00338d', '#1e49e2', '#00b894', '#fd349c', '#0c233c']
          ]
        },
        canvas: {
          styles: [
            'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Open+Sans+Condensed:wght@300;400;600;700;800&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
            `data:text/css;base64,${btoa('@custom-variant dark (&:where(.dark, .dark *));')}`
          ],
          scripts: [
            'https://unpkg.com/@tailwindcss/browser@4'
          ]
        }
      });

      editorRef.current = editor;

      registerBlocks(editor);
      registerTemplates(editor);
      registerStyles(editor);

      // Register Custom Trait BEFORE load so it is available when components are parsed
      editor.TraitManager.addType('layout-toggle', {
        createInput() {
          const el = document.createElement('div');
          el.innerHTML = `
            <div class="flex bg-gray-100 rounded-lg p-1 mt-1 cursor-pointer w-full shadow-inner text-xs font-semibold border border-gray-200">
              <div class="flex-1 text-center py-1.5 rounded-md transition-all toggle-opt" data-val="full-width">Full Width</div>
              <div class="flex-1 text-center py-1.5 rounded-md transition-all toggle-opt" data-val="container">Container</div>
            </div>
          `;
          return el;
        },
        onUpdate({ elInput, component }: any) {
          const val = component.getAttributes()['layout-mode'] || 'container';
          const options = elInput.querySelectorAll('.toggle-opt');
          options.forEach((opt: any) => {
            if (opt.getAttribute('data-val') === val) {
              opt.className = "flex-1 text-center py-1.5 rounded-md transition-all toggle-opt bg-white shadow-sm text-[#1e49e2] border border-gray-200/50";
            } else {
              opt.className = "flex-1 text-center py-1.5 rounded-md transition-all toggle-opt text-gray-500 hover:text-gray-800";
            }
            opt.onclick = () => {
              const clickedVal = opt.getAttribute('data-val');
              component.addAttributes({ 'layout-mode': clickedVal });
              component.trigger('trait:update');
            };
          });
        }
      });

      editor.TraitManager.addType('column-manager', {
        createInput({ trait }: any) {
          const el = document.createElement('div');
          el.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;width:100%;">
              <div style="display:flex;flex-direction:column;background:#f8fafc;padding:8px;border:1px solid #e2e8f0;border-radius:4px;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <i class="fa fa-desktop" style="color:#94a3b8;font-size:13px;"></i>
                  <span style="font-size:11px;font-weight:600;color:#475569;">Desktop</span>
                </div>
                <select style="width:100%;background:white;border:1px solid #e2e8f0;border-radius:4px;padding:4px 6px;font-size:12px;color:#1e293b;outline:none;" data-bp="desktop">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => `<option value="${n}">${n} Column${n > 1 ? 's' : ''}</option>`).join('')}
                </select>
              </div>
              <div style="display:flex;flex-direction:column;background:#f8fafc;padding:8px;border:1px solid #e2e8f0;border-radius:4px;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <i class="fa fa-tablet" style="color:#94a3b8;font-size:13px;"></i>
                  <span style="font-size:11px;font-weight:600;color:#475569;">Tablet</span>
                </div>
                <select style="width:100%;background:white;border:1px solid #e2e8f0;border-radius:4px;padding:4px 6px;font-size:12px;color:#1e293b;outline:none;" data-bp="tablet">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => `<option value="${n}">${n} Column${n > 1 ? 's' : ''}</option>`).join('')}
                </select>
              </div>
              <div style="display:flex;flex-direction:column;background:#f8fafc;padding:8px;border:1px solid #e2e8f0;border-radius:4px;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <i class="fa fa-mobile" style="color:#94a3b8;font-size:13px;"></i>
                  <span style="font-size:11px;font-weight:600;color:#475569;">Mobile</span>
                </div>
                <select style="width:100%;background:white;border:1px solid #e2e8f0;border-radius:4px;padding:4px 6px;font-size:12px;color:#1e293b;outline:none;" data-bp="mobile">
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => `<option value="${n}">${n} Column${n > 1 ? 's' : ''}</option>`).join('')}
                </select>
              </div>
            </div>
          `;
          return el;
        },
        onEvent({ elInput, component }: any) {
          const desktop = elInput.querySelector('[data-bp="desktop"]')?.value;
          const tablet = elInput.querySelector('[data-bp="tablet"]')?.value;
          const mobile = elInput.querySelector('[data-bp="mobile"]')?.value;

          if (!desktop || !tablet || !mobile) return;

          // update component classes
          const classes = component.getClasses();
          const newClasses = classes.filter((c: string) => !c.match(/^(md:|sm:)?grid-cols-\d+$/));
          newClasses.push(`grid-cols-${mobile}`);
          newClasses.push(`sm:grid-cols-${tablet}`);
          newClasses.push(`md:grid-cols-${desktop}`);

          component.setClass(newClasses.join(' '));

          // save config to attributes to retain selection
          component.addAttributes({
            'data-cols-desktop': desktop,
            'data-cols-tablet': tablet,
            'data-cols-mobile': mobile,
          });

          // If it's a structural change, we might want to alert GrapesJS
          editor.trigger('component:update', component);
        },
        onUpdate({ elInput, component }: any) {
          const attrs = component.getAttributes();
          // fallback logic in case it's newly dropped and attrs haven't synced
          let desktop = attrs['data-cols-desktop'];
          let tablet = attrs['data-cols-tablet'];
          let mobile = attrs['data-cols-mobile'];

          if (!desktop) {
            const classes = component.getClasses();
            classes.forEach((c: string) => {
              if (c.startsWith('md:grid-cols-')) desktop = c.split('-')[2];
              else if (c.startsWith('sm:grid-cols-')) tablet = c.split('-')[2];
              else if (c.startsWith('grid-cols-')) mobile = c.split('-')[2];
            });
            if (!desktop) desktop = mobile || '1';
            if (!tablet) tablet = mobile || '1';
            if (!mobile) mobile = '1';

            // Backfill
            component.addAttributes({
              'data-cols-desktop': desktop,
              'data-cols-tablet': tablet,
              'data-cols-mobile': mobile,
            });
          }

          const dSel = elInput.querySelector('[data-bp="desktop"]');
          const tSel = elInput.querySelector('[data-bp="tablet"]');
          const mSel = elInput.querySelector('[data-bp="mobile"]');

          if (dSel) dSel.value = desktop;
          if (tSel) tSel.value = tablet;
          if (mSel) mSel.value = mobile;
        }
      });

      const domc = editor.DomComponents;

      // Register Responsive Grid Widget
      domc.addType('responsive-grid', {
        extend: 'default',
        model: {
          defaults: {
            traits: [
              'id',
              'title',
              {
                type: 'column-manager',
                name: 'column-manager',
                label: 'Responsive Columns',
              }
            ]
          }
        }
      });

      // Register Custom Code Widget Type
      domc.addType('custom-code-block', {
        model: {
          defaults: {
            name: 'Custom Code',
            droppable: false,
            traits: ['id', 'title'],
            customHtml: '<div class="custom-block">Hello Custom Code</div>',
            customCss: '.custom-block {\\n  padding: 1rem;\\n  text-align: center;\\n  background: #f8fafc;\\n  border: 1px dashed #c7d2fe;\\n}',
            customJs: 'console.log("Custom code block loaded");'
          },
          init() {
            this.on('change:customHtml change:customCss', this.handleCodeChange);
            this.handleCodeChange();
          },
          handleCodeChange() {
            const html = this.get('customHtml') || '';
            const css = this.get('customCss') || '';
            const js = this.get('customJs') || '';

            if (!html.trim() && !css.trim() && !js.trim()) {
              this.components().reset();
              this.components('<div style="padding: 10px; text-align: center; color: #94a3b8; font-family: sans-serif; border: 1px dashed #cbd5e1; font-size: 12px;">Empty Custom Code</div>');
            } else {
              this.components(`<style>${css}</style>\n${html}`);
            }
          }
        }
      });

      // Section component type - provides Layout Mode toggle + animation trait to section elements
      domc.addType('section', {
        extend: 'default',
        isComponent: (el: any) => el.getAttribute && el.getAttribute('data-gjs-type') === 'section',
        model: {
          defaults: {
            traits: [
              'id',
              'title',
              {
                type: 'select',
                name: 'data-animation',
                label: 'GSAP Animation',
                options: [
                  { id: '', name: 'None' },
                  { id: 'fade-in', name: 'Fade In' },
                  { id: 'slide-up', name: 'Slide Up' },
                  { id: 'zoom-in', name: 'Zoom In' }
                ]
              },
              {
                type: 'select',
                name: 'data-responsive',
                label: 'Responsive Visibility',
                options: [
                  { id: '', name: 'Always Visible' },
                  { id: 'hidden-mobile', name: 'Hide on Mobile' },
                  { id: 'hidden-tablet', name: 'Hide on Tablet' },
                  { id: 'hidden-desktop', name: 'Hide on Desktop' },
                ]
              },
              {
                type: 'layout-toggle',
                name: 'layout-mode',
                label: 'Content Layout Width',
              }
            ]
          },
          init() {
            this.on('change:attributes:layout-mode', this.handleLayoutChange);
          },
          handleLayoutChange() {
            const layout = this.getAttributes()['layout-mode'] || 'container';
            const comps = this.components();

            const getInnerContainer = () => {
              if (comps.length === 1) {
                return comps.at(0);
              }
              return null;
            };

            this.removeStyle('width');
            this.removeStyle('max-width');
            this.removeStyle('margin-left');
            this.removeStyle('margin-right');

            const innerContainer = getInnerContainer();
            if (innerContainer) {
              if (layout === 'container') {
                innerContainer.removeClass('w-full');
                innerContainer.addClass('container');
                innerContainer.addClass('mx-auto');
              } else {
                innerContainer.removeClass('container');
                innerContainer.addClass('w-full');
                innerContainer.addClass('mx-auto');
              }
            } else {
              if (layout === 'container') {
                const layoutClassesToMove = this.getClasses().filter((cls: string) =>
                  cls.startsWith('flex') || cls.startsWith('grid') || cls.startsWith('items-') || cls.startsWith('justify-') || cls.startsWith('gap-')
                );
                layoutClassesToMove.forEach((cls: string) => this.removeClass(cls));
                const childrenToMove: any[] = [];
                comps.each((child: any) => childrenToMove.push(child));
                const containerComp = comps.add({
                  type: 'default',
                  classes: ['container', 'mx-auto', ...layoutClassesToMove],
                  style: { 'min-height': '50px' }
                });
                childrenToMove.forEach(child => {
                  if (child.move) child.move(containerComp);
                  else containerComp.components().add(child);
                });
              }
            }
          }
        }
      });

      // Custom Video Background component type with pre-loaded options dropdown
      domc.addType('video-bg', {
        extend: 'default',
        isComponent: (el: any) => {
          if (el.tagName !== 'VIDEO') return false;
          return (
            (el.classList && el.classList.contains('video-bg-element')) ||
            el.getAttribute?.('data-gjs-type') === 'video-bg'
          );
        },
        model: {
          defaults: {
            tagName: 'video',
            traits: [
              {
                type: 'select',
                name: 'src',
                label: 'Video File',
                options: [
                  { id: '/videos/video-1.mp4', name: 'Video 1' },
                  { id: '/videos/video-2.mp4', name: 'Video 2' },
                  { id: '/videos/video-3.mp4', name: 'Video 3' },
                  { id: '/videos/video-4.mp4', name: 'Video 4' },
                  { id: '/videos/video-5.mp4', name: 'Video 5' }
                ]
              }
            ]
          },
          init() {
            this.on('change:attributes:src', () => {
              const src = this.getAttributes()['src'];
              if (!src) return;
              // Force the real DOM video element to reload with the new src
              setTimeout(() => {
                const el = this.getEl() as HTMLVideoElement | null;
                if (el) {
                  el.src = src;
                  el.load();
                  el.play().catch(() => {});
                }
              }, 50);
            });
          }
        }
      });

      // Icon component type - prevents <i> tags from collapsing or acting as editable text
      domc.addType('icon', {
        isComponent: (el: any) => el.tagName === 'I' || (el.getAttribute && el.getAttribute('data-gjs-type') === 'icon'),
        model: {
          defaults: {
            tagName: 'i',
            droppable: false,
            editable: false,
            traits: ['id', 'title', 'class']
          }
        }
      });

      // Default component type - provides animation trait to all base elements
      domc.addType('default', {
        model: {
          defaults: {
            traits: [
              'id',
              'title',
              {
                type: 'select',
                name: 'data-animation',
                label: 'GSAP Animation',
                options: [
                  { id: '', name: 'None' },
                  { id: 'fade-in', name: 'Fade In' },
                  { id: 'slide-up', name: 'Slide Up' },
                  { id: 'zoom-in', name: 'Zoom In' }
                ]
              },
              {
                type: 'select',
                name: 'data-responsive',
                label: 'Responsive Visibility',
                options: [
                  { id: '', name: 'Always Visible' },
                  { id: 'hidden-mobile', name: 'Hide on Mobile' },
                  { id: 'hidden-tablet', name: 'Hide on Tablet' },
                  { id: 'hidden-desktop', name: 'Hide on Desktop' },
                ]
              }
            ]
          }
        }
      });

      let saveTimeout: any;

      // Make tailwind injection reusable to persist across canvas frame reloads
      const injectTailwindTheme = () => {
        const doc = editor.Canvas.getDocument();
        if (!doc) return;
        // Always remove old tag to force Tailwind to re-process when called after loadProjectData
        const old = doc.getElementById('tw-canvas-theme');
        if (old) old.remove();
        
        const tailwindStyle = doc.createElement('style');
        tailwindStyle.id = 'tw-canvas-theme';
        tailwindStyle.setAttribute('type', 'text/tailwindcss');
        tailwindStyle.innerHTML = `
          @custom-variant dark (&:where(.dark, .dark *));
          @theme {
            --color-primary: var(--theme-primary, #00338d);
            --color-secondary: var(--theme-secondary, #1e49e2);
            --color-accent: var(--theme-accent, #1e49e2);
            --color-dark: var(--theme-dark, #0c233c);
            --color-light-accent: var(--theme-light-accent, #aceaff);
            --color-cta: var(--theme-cta, #00b8f5);
            --color-purple: var(--theme-purple, #7213ea);
            --color-pink: var(--theme-pink, #fd349c);
            --color-success: var(--theme-success, #00b894);
            --color-background-dark: var(--theme-background-dark, #071728);
            --font-sans: "Open Sans", sans-serif;
            --font-display: "Open Sans Condensed", sans-serif;
          }
          body { font-family: "Open Sans", sans-serif !important; }
          h1, h2, h3, h4, h5, h6 { font-family: "Open Sans Condensed", sans-serif !important; }
        `;
        doc.head.appendChild(tailwindStyle);
      };

      // Force Tailwind CDN to re-scan the entire canvas DOM.
      // Tailwind @4 browser watches for DOM mutations, but a batch rebuild via
      // loadProjectData can be missed. We trick it by toggling a class on the body.
      const forceTailwindRescan = () => {
        const win = editor.Canvas.getWindow() as any;
        const body = editor.Canvas.getBody();
        if (!body) return;
        // First inject/re-inject the @theme style block
        injectTailwindTheme();
        // Toggle a harmless class to trigger MutationObserver in Tailwind CDN
        body.classList.add('__tw-rescan');
        requestAnimationFrame(() => {
          body.classList.remove('__tw-rescan');
          // If Tailwind exposes a programmatic API, use it
          if (win && typeof win.__tailwindBrowser?.rebuild === 'function') {
            win.__tailwindBrowser.rebuild();
          }
        });
      };

      // Store references so loadData useEffect can call them
      injectTailwindThemeRef.current = injectTailwindTheme;
      forceReScanRef.current = forceTailwindRescan;

      editor.on('load', () => {
        // Inject Tailwind theme mapping into Editor Canvas for live design consistency
        injectTailwindTheme();

        // Make default template components easily selectable
        const style = editor.Canvas.getDocument().createElement('style');
        style.innerHTML = `
          /* Enhanced visibility for layout grids and columns in editor mode */
          body.gjs-dashed [data-gjs-type="responsive-grid"] > div,
          body.gjs-dashed .container-custom > div {
             outline: 1px dashed rgba(100, 116, 139, 0.6) !important;
             outline-offset: -2px;
             background-color: rgba(241, 245, 249, 0.3);
          }
          body.gjs-dashed [data-gjs-type="responsive-grid"],
          body.gjs-dashed .container-custom {
             outline: 1px dashed rgba(59, 130, 246, 0.6) !important;
             outline-offset: -2px;
          }
          
          /* Add a placeholder hint when columns are totally empty */
          body.gjs-dashed [data-gjs-type="responsive-grid"] > div:empty::after,
          body { font-family: 'Open Sans', sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Open Sans Condensed', sans-serif; }
          * { box-sizing: inherit; }
          .container-custom { width: 100%; max-width: 1200px; padding-left: 1rem; padding-right: 1rem; }
          img { max-width: 100%; height: auto; }
          
          /* GrapesJS specific overrides for better editing experience */
          .gjs-dashed *[data-gjs-type] {
             outline: 1px dashed rgba(30, 73, 226, 0.4);
             outline-offset: -2px;
          }
          .gjs-selected {
             outline: 2px solid #1e49e2 !important;
             outline-offset: -2px !important;
             box-shadow: 0 0 0 4px rgba(30,73,226,0.2) !important;
          }
          .gjs-hovered {
             outline: 2px dashed #00b894 !important;
             outline-offset: -2px !important;
          }
          /* Improve drag and drop zone targeting for section blocks */
          body.gjs-dashed [data-gjs-type="section"],
          body.gjs-dashed .template-wrapper > * {
             margin-top: 4px !important;
             margin-bottom: 4px !important;
          }
          /* Placeholder component styles */
          [data-gjs-type="default"]:empty, [data-gjs-type="responsive-grid"]:empty {
             min-height: 10px;
             border: 1px dashed rgba(0, 0, 0, 0.1);
             display: flex;
             align-items: center;
             justify-content: center;
          }
          [data-gjs-type="default"]:empty::before, [data-gjs-type="responsive-grid"]:empty::before {
             content: '';
          }

          /* Tailwind Grid Dynamic Classes for GrapesJS Breakpoints */
          @media (min-width: 481px) {
            .sm\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .sm\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .sm\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
            .sm\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
            .sm\\:grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
            .sm\\:grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
            .sm\\:grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
            .sm\\:grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
            .sm\\:grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
            .sm\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
          }
          @media (min-width: 993px) {
            .md\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .md\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
            .md\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
            .md\\:grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
            .md\\:grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
            .md\\:grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
            .md\\:grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
            .md\\:grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
            .md\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
          }
        `;
        editor.Canvas.getDocument().head.appendChild(style);

        // Turn on component outlines (borders) by default
        editor.Commands.run('sw-visibility');

        const allBlocks = editor.BlockManager.getAll().models;
        setBlocks(allBlocks);

        const cats = Array.from(new Set(allBlocks.map((b: any) => b.get('category').id || b.get('category')))) as string[];
        // Sort: push Footer to the end
        cats.sort((a, b) => {
          if (a === 'Footer') return 1;
          if (b === 'Footer') return -1;
          return 0;
        });
        setCategories(cats);
        if (cats.length > 0) setSelectedCategory(cats[0]);

        // Auto Save Listener
        editor.on('update', () => {
          if (projectId === 'guest' || isSyncingRef.current) return;

          if (autoSaveRef.current && projectDataRef.current) {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            
            saveTimeoutRef.current = setTimeout(async () => {
              try {
                // Purge empty CSS rules before saving to prevent style corruption on reload
                // GrapesJS generates empty placeholder rules for Tailwind classes — we must remove them
                try {
                  const cssRules = editor.Css.getAll();
                  const emptyRules = cssRules.filter((rule: any) => {
                    const style = rule.getStyle();
                    return !style || Object.keys(style).length === 0;
                  });
                  if (emptyRules.length > 0) {
                    emptyRules.forEach((rule: any) => editor.Css.remove(rule));
                  }
                } catch (_) { /* ignore */ }

                const editorData = editor.getProjectData();
                const pData = projectDataRef.current;
                const activeId = pageIdRef.current;
                
                const updatedProject = {
                  ...pData,
                  lastEdited: new Date().toISOString(),
                  pages: pData.pages.map((p: any) =>
                    p.id === activeId ? { ...p, layout: editorData } : p
                  )
                };
                await api.put(`/projects/${projectId}`, updatedProject);
                projectDataRef.current = updatedProject;
                setProjectData(updatedProject);
                console.log('Autosaved project page:', activeId);
              } catch (err) {
                console.error('Autosave failed', err);
              } finally {
                saveTimeoutRef.current = null;
              }
            }, 1000);
          }
        });

      });

      // Helper to identify components that act as visual group wrappers
      const isContainer = (comp: any) => {
        return comp && comp.getClasses && comp.getClasses().includes('template-wrapper');
      };

      // Custom toolbar commands
      editor.Commands.add('custom:move-up', {
        run(ed: any) {
          const sel = ed.getSelected();
          if (!sel) return;
          const parent = sel.parent();
          if (!parent) return;
          const comps = parent.components();
          const idx = comps.indexOf(sel);

          if (idx > 0) {
            const prevSibling = comps.at(idx - 1);
            if (isContainer(prevSibling)) {
              // Move INTO the container, just above its LAST child
              const targetComps = prevSibling.components();
              const targetIdx = Math.max(0, targetComps.length);
              comps.remove(sel);
              targetComps.add(sel, { at: targetIdx });
              ed.select(sel);
              return;
            }

            // Normal sibling swap
            comps.remove(sel);
            comps.add(sel, { at: idx - 1 });
            ed.select(sel);
          } else {
            // At the top of parent. Move OUT of parent, just ABOVE the parent.
            const grandParent = parent.parent();
            if (grandParent && isContainer(parent)) {
              const pIdx = grandParent.components().indexOf(parent);
              parent.components().remove(sel);
              grandParent.components().add(sel, { at: pIdx });
              ed.select(sel);
            }
          }
        }
      });

      editor.Commands.add('custom:move-down', {
        run(ed: any) {
          const sel = ed.getSelected();
          if (!sel) return;
          const parent = sel.parent();
          if (!parent) return;
          const comps = parent.components();
          const idx = comps.indexOf(sel);

          if (idx < comps.length - 1) {
            const nextSibling = comps.at(idx + 1);
            if (isContainer(nextSibling)) {
              // Move INTO the container, just BELOW its FIRST child
              const targetComps = nextSibling.components();
              const targetIdx = Math.min(targetComps.length, 0);
              comps.remove(sel);
              targetComps.add(sel, { at: targetIdx });
              ed.select(sel);
              return;
            }

            comps.remove(sel);
            comps.add(sel, { at: idx + 1 });
            ed.select(sel);
          } else {
            // At the bottom of parent. Move OUT of parent, just BELOW the parent.
            const grandParent = parent.parent();
            if (grandParent && isContainer(parent)) {
              const pIdx = grandParent.components().indexOf(parent);
              parent.components().remove(sel);
              grandParent.components().add(sel, { at: pIdx + 1 });
              ed.select(sel);
            }
          }
        }
      });
      editor.Commands.add('custom:clone', {
        run(ed: any) {
          const sel = ed.getSelected();
          if (!sel) return;
          const cloned = sel.clone();
          const parent = sel.parent();
          if (parent) {
            const idx = parent.components().indexOf(sel);
            parent.components().add(cloned, { at: idx + 1 });
            ed.select(cloned);
          }
        }
      });
      editor.Commands.add('custom:delete', {
        run(ed: any) {
          const sel = ed.getSelected();
          if (sel) {
            sel.remove();
          }
        }
      });
      editor.Commands.add('custom:add-inside', {
        run(ed: any) {
          const sel = ed.getSelected();
          const cid = sel?.cid || '';
          window.postMessage({ type: 'GJS_ADD_INSIDE', cid }, '*');
        }
      });

      // Custom toolbar for every component
      // Combined Selection Listener for performance and consistency
      editor.on('component:selected', (model: any) => {
        if (!model) {
          setHasSelection(false);
          setBreadcrumb([]);
          return;
        }

        const newBreadcrumb = getBreadcrumb(model);
        setBreadcrumb(prev => {
          if (JSON.stringify(prev) === JSON.stringify(newBreadcrumb)) return prev;
          return newBreadcrumb;
        });
        setHasSelection(true);

        // Auto-switch to media tab when image or video selected, style tab on fresh selection from layers
        const selTag = (model.get('tagName') || '').toLowerCase();
        const isImgSel = (typeof model.is === 'function' && model.is('image')) || model.get('type') === 'image' || selTag === 'img';
        const isVideoSel = (typeof model.is === 'function' && model.is('video')) || model.get('type') === 'video' || model.get('type') === 'video-bg' || selTag === 'video';
        const isTextSel = (typeof model.is === 'function' && model.is('text')) || model.get('type') === 'text' || ['h1','h2','h3','h4','h5','h6','p','span','a','b','i','strong','em'].includes(selTag);
        
        // Also check if any ancestor or child has a video — to auto-show media tab for entire video hero sections
        const hasVideoChild = !isVideoSel && typeof model.find === 'function' && model.find('video').length > 0;
        const hasVideoAncestor = (() => {
          if (isVideoSel || hasVideoChild) return false;
          let p = typeof model.parent === 'function' ? model.parent() : null;
          while (p) {
            if (typeof p.find === 'function' && p.find('video').length > 0) return true;
            p = typeof p.parent === 'function' ? p.parent() : null;
          }
          return false;
        })();

        if (isTextSel) {
          setActiveTab('style');
        } else if (isImgSel || isVideoSel || hasVideoChild || hasVideoAncestor) {
          setActiveTab('media');
        } else {
          // Always switch to style tab for any non-image/video element selection
          setActiveTab('style');
        }

        // Redirect LI selection to parent UL/OL
        if (model.get('tagName')?.toLowerCase() === 'li') {
          const parent = model.parent();
          if (parent && (parent.get('tagName')?.toLowerCase() === 'ul' || parent.get('tagName')?.toLowerCase() === 'ol')) {
            setTimeout(() => editor.select(parent), 10);
            return;
          }
        }

        // Dynamically add requested traits ONLY if missing
        // NOTE: Do NOT call TraitManager.render() or StyleManager.render() — 
        // GrapesJS auto-updates when addTrait is called. Forcing render()
        // destroys and recreates the DOM, causing visible flicker.
        if (!model.getTrait('data-animation')) {
          model.addTrait({
            type: 'select',
            name: 'data-animation',
            label: 'GSAP Animation',
            options: [
              { id: '', name: 'None' },
              { id: 'fade-in', name: 'Fade In' },
              { id: 'slide-up', name: 'Slide Up' },
              { id: 'zoom-in', name: 'Zoom In' }
            ]
          });
        }

        if (!model.getTrait('data-responsive')) {
          model.addTrait({
            type: 'select',
            name: 'data-responsive',
            label: 'Responsive Visibility',
            options: [
              { id: '', name: 'Always Visible' },
              { id: 'hidden-mobile', name: 'Hide on Mobile' },
              { id: 'hidden-tablet', name: 'Hide on Tablet' },
              { id: 'hidden-desktop', name: 'Hide on Desktop' },
            ]
          });
        }

        if (model.get('type') === 'section' && !model.getTrait('layout-mode')) {
          model.addTrait({
            type: 'layout-toggle',
            name: 'layout-mode',
            label: 'Content Layout Width',
          });
        }

        // Ensure typography sector opens for text elements
        const type = model.get('type');
        if (type === 'text' || type === 'header' || type === 'heading') {
          const typographySector = editor.StyleManager.getSector('typography');
          if (typographySector) typographySector.set('open', true);
        }

        // Set custom toolbar
        model.set('toolbar', [
          { attributes: { class: 'fa fa-arrow-up', title: 'Move Up' }, command: 'custom:move-up' },
          { attributes: { class: 'fa fa-arrow-down', title: 'Move Down' }, command: 'custom:move-down' },
          { attributes: { class: 'fa fa-plus', title: 'Add Inside' }, command: 'custom:add-inside' },
          { attributes: { class: 'fa fa-clone', title: 'Clone' }, command: 'custom:clone' },
          { attributes: { class: 'fa fa-trash', title: 'Delete' }, command: 'custom:delete' },
        ]);
      });

      editor.on('component:deselected', () => {
        setHasSelection(false);
        setBreadcrumb([]);
      });

      editor.on('styleManager:state', (s: string) => {
        setState(s);
      });

      // Note: Automatic Text Contrast logic is now securely embedded inside 
      // the custom Style Manager property types (in Styles.ts) to guarantee
      // execution whenever a user modifies a background via the UI.

      // Persist tailwind styling on preview mode toggles and screen resizing iframe reloads
      editor.on('canvas:canvas:load', injectTailwindTheme);

      // Animation Live Preview in Editor
      editor.on('trait:value', (payload: any) => {
        if (payload.trait.get('name') === 'data-animation') {
          const comp = payload.component;
          const anim = payload.value;
          const el = comp.getEl();
          if (el && anim && anim !== 'none' && anim !== '') {
            el.style.transition = 'all 0.6s ease-out';
            if (anim === 'fade-in') {
              el.style.opacity = '0';
              setTimeout(() => { el.style.opacity = '1'; }, 50);
            } else if (anim === 'slide-up') {
              el.style.opacity = '0';
              el.style.transform = 'translateY(30px)';
              setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 50);
            }
            else if (anim === 'zoom-in') {
              el.style.opacity = '0';
              el.style.transform = 'scale(0.9)';
              setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; }, 50);
            }

            // Clean up inline styles after animation so it doesn't pollute the export
            setTimeout(() => {
              el.style.transition = '';
              el.style.opacity = '';
              el.style.transform = '';
            }, 700);
          }
        }
      });

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }
  }, []);

  // Listen for messages from the canvas iframe (add inside)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'GJS_ADD_INSIDE') {
        setLibraryMode('elements');
        setSelectedCategory('Basic');
        setInsertAfterCid(e.data.cid || null);
        setIsLibraryOpen(true);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Load project data
  useEffect(() => {
    const loadData = async () => {
      // 1. Cancel any pending autosaves from the previous page immediately
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }

      // Always reset loading flag when page changes to trigger hydration
      isProjectLoaded.current = false;

      // Ensure canvas body is clean before loading new page
      if (editorRef.current) {
        const body = editorRef.current.Canvas.getBody();
        if (body) {
          body.className = '';
          body.style.cssText = '';
        }
      }

      if (projectId === 'guest') {
        const dummyProject = {
          id: 'guest',
          name: 'Guest Project',
          pages: [{ id: 'new', name: 'Home', layout: {} }]
        };
        setProjectData(dummyProject);
        projectDataRef.current = dummyProject;

        if (editorRef.current && !isProjectLoaded.current) {
          editorRef.current.DomComponents.clear(); // Ensure clean slate
          const navBlock = editorRef.current.BlockManager.get('section-business-nav');
          if (navBlock) {
            const comps = editorRef.current.addComponents(navBlock.get('content'));
            if (comps && comps[0]) {
              comps[0].set({ removable: false, copyable: false });
            }
          }
          isProjectLoaded.current = true;
        }
        return;
      }

      try {
        const data = await api.get(`/projects/${projectId}`);
        // Ensure first page is named Home if it's empty/untitled
        // Ensure first page has a display name if missing (Home)
        if (data.pages && data.pages.length > 0) {
          const firstPage = data.pages[0];
          if (!firstPage.name && !firstPage.title) {
            firstPage.name = 'Home';
            firstPage.title = 'Home';
          } else if (!firstPage.name) {
            firstPage.name = firstPage.title;
          } else if (!firstPage.title) {
            firstPage.title = firstPage.name;
          }
        }
        
        setProjectData(data);
        projectDataRef.current = data; 

        // Find pageId from slug
        let targetPage = data.pages.find((p: any, idx: number) => {
          const slug = idx === 0 ? 'home' : (p.title || p.name || 'page').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          return slug === pageSlug;
        });

        if (!targetPage) targetPage = data.pages[0];
        const activePageId = targetPage.id;
        setPageId(activePageId);
        pageIdRef.current = activePageId;

        if (editorRef.current) {
          isSyncingRef.current = true; // Block autosaves during hydration
          const currentPage = targetPage;

          // Force sync nav links on load
          setTimeout(syncNavLinks, 500);

          if (currentPage && currentPage.layout && Object.keys(currentPage.layout).length > 0) {
            editorRef.current.loadProjectData(currentPage.layout);
            
            // Ensure any navbar in existing layout is also non-removable
            const wrapper = editorRef.current.DomComponents.getWrapper();
            const existingNav = wrapper.find('[data-gjs-name="Navbar"]')[0];
            if (existingNav) {
              existingNav.set({ removable: false, copyable: false });
            }

            // Step 2: Immediately re-inject the Tailwind @theme block.
            // loadProjectData rebuilds the canvas frame, clearing the <head>.
            // Without this, brand colors like bg-background-dark are unknown to Tailwind.
            if (injectTailwindThemeRef.current) injectTailwindThemeRef.current();

            // Step 3: Apply theme to body immediately (before Tailwind rescans)
            const bodyEl = editorRef.current.Canvas.getBody();
            if (bodyEl) {
              if (themeMode === 'dark') {
                bodyEl.classList.add('dark');
                bodyEl.style.backgroundColor = '#0c233c';
              } else {
                bodyEl.classList.remove('dark');
                bodyEl.style.backgroundColor = '#ffffff';
              }
            }

            // Step 4: Double-RAF: first frame = GJS finishes DOM render, second = browser paints.
            // Then purge empty GJS rules and force Tailwind to rescan the new DOM.
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                try {
                  const cssRules = editorRef.current.Css.getAll();
                  const emptyRules = cssRules.filter((rule: any) => {
                    const style = rule.getStyle();
                    return !style || Object.keys(style).length === 0;
                  });
                  if (emptyRules.length > 0) editorRef.current.Css.remove(emptyRules);
                } catch (_) { /* non-critical */ }

                if (forceReScanRef.current) forceReScanRef.current();
                isSyncingRef.current = false;
              });
            });
          } else {
            // New or empty page - start with JUST the navbar
            editorRef.current.DomComponents.clear();
            editorRef.current.Css.clear();
            const navBlock = editorRef.current.BlockManager.get('section-business-nav');
            if (navBlock) {
              const comps = editorRef.current.addComponents(navBlock.get('content'));
              if (comps && comps[0]) {
                comps[0].set({ removable: false, copyable: false });
              }
            }
            if (injectTailwindThemeRef.current) injectTailwindThemeRef.current();
            isSyncingRef.current = false;
          }
          isProjectLoaded.current = true;

          // Push update to preview window if it's open
          if (previewWindowRef.current && !previewWindowRef.current.closed) {
            setTimeout(() => {
              if (editorRef.current) {
                previewWindowRef.current?.postMessage({
                  type: 'UPDATE_PREVIEW_CONTENT',
                  html: editorRef.current.getHtml(),
                  css: editorRef.current.getCss()
                }, '*');
              }
            }, 1000);
          }
        }
      } catch (err) {
        console.error('Failed to load project', err);
      }
    };
    loadData();
  }, [pageSlug, projectId]);

  // Dynamic Navbar Update Logic
  useEffect(() => {
    if (!editorRef.current || !projectData) return;
    const editor = editorRef.current;
    
    const updateNavLinks = () => {
      const navContainers = editor.DomComponents.getWrapper().find('[data-gjs-type="dynamic-nav-links"]');
      navContainers.forEach((nav: any) => {
        // Clear existing links
        nav.components().reset();
        
        // Add project pages
        projectData.pages.forEach((p: any) => {
          const isActive = p.id === pageId;
          nav.append({
            tagName: 'a',
            type: 'link',
            classes: [isActive ? 'text-[#1e49e2]' : 'text-gray-600', 'hover:text-[var(--color-secondary)]', 'font-semibold', 'transition-colors'],
            attributes: { href: `/builder/${projectId}/${p.id}` },
            content: p.name,
          });
        });

        // Ensure "Contact Us" or other static links remain if they were part of the design
        // Actually, the user might want a separate component for that, but let's stick to page links for now
      });
    };

    updateNavLinks();

    // Listen for new components being added
    const handleComponentAdd = (model: any) => {
      if (model.get('type') === 'dynamic-nav-links') {
        setTimeout(updateNavLinks, 10);
      }
      
      // Protect the Navbar from deletion if added manually
      if (model.get('attributes') && model.get('attributes')['data-gjs-name'] === 'Navbar') {
        model.set({ removable: false, copyable: false });
      } else if (model.get('data-gjs-name') === 'Navbar') {
        model.set({ removable: false, copyable: false });
      }
    };

    editor.on('component:add', handleComponentAdd);
    return () => editor.off('component:add', handleComponentAdd);
  }, [editorRef.current, projectData, pageId, projectId]);

  const setDeviceMode = (mode: string) => {
    setDevice(mode);
    editorRef.current?.setDevice(mode);
  };

  const handleUndo = () => editorRef.current?.UndoManager.undo();
  const handleRedo = () => editorRef.current?.UndoManager.redo();
  const handleDelete = () => {
    const selected = editorRef.current?.getSelected();
    if (selected) {
      selected.remove();
      setHasSelection(false);
      setBreadcrumb([]);
    }
  };

  const handleSave = async () => {
    if (projectId === 'guest') return;
    if (!projectId) {
      toast.error('Project ID is missing from URL');
      return;
    }

    const pData = projectDataRef.current;
    const activeId = pageIdRef.current;
    
    if (!editorRef.current || !pData || !activeId) {
      console.warn('Save skipped: missing editor, project data, or page ID', { pData, activeId });
      return;
    }
    
    try {
      // Purge empty CSS rules before saving to prevent style corruption on reload
      try {
        const cssRules = editorRef.current.Css.getAll();
        const emptyRules = cssRules.filter((rule: any) => {
          const style = rule.getStyle();
          return !style || Object.keys(style).length === 0;
        });
        if (emptyRules.length > 0) {
          emptyRules.forEach((rule: any) => editorRef.current.Css.remove(rule));
        }
      } catch (_) { /* ignore */ }

      const editorData = editorRef.current.getProjectData();
      const updatedProject = {
        ...pData,
        lastEdited: new Date().toISOString(),
        pages: pData.pages.map((p: any) =>
          p.id === activeId ? { ...p, layout: editorData } : p
        )
      };
      
      await api.put(`/projects/${projectId}`, updatedProject);
      
      // Update both ref and state
      projectDataRef.current = updatedProject;
      setProjectData(updatedProject);

      const savedTitle = pData.title || 'Project';
      toast.success(`"${savedTitle}" saved successfully`, { position: 'bottom-right', autoClose: 2000 });
      console.log('Project saved successfully');
    } catch (err: any) {
      console.error('Failed to save', err);
      toast.error(`Failed to save: ${err.message || 'Unknown error'}`);
    }
  };

  const handlePreviewNewTab = () => {
    if (!editorRef.current) return;
    toast.info('Generating preview...', { position: 'bottom-right', autoClose: 2000 });
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    const themePresets: any = {
      default: { primary: '#00338d', secondary: '#1e49e2', accent: '#00b8f5' },
      purple: { primary: '#4c1d95', secondary: '#7c3aed', accent: '#a78bfa' },
      dark: { primary: '#0f172a', secondary: '#334155', accent: '#38bdf8' },
      pink: { primary: '#be185d', secondary: '#db2777', accent: '#f472b6' }
    };
    const colors = themePresets[themeColor];

    const previewHtml = [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>Preview</title>',
      '<base href="' + window.location.origin + '/">',
      '<style type="text/tailwindcss">',
      '  @custom-variant dark (&:where(.dark, .dark *));',
      '  @theme {',
      `    --color-primary: ${colors.primary}; --color-secondary: ${colors.secondary}; --color-accent: ${colors.accent};`,
      '    --color-dark: #0c233c; --color-light-accent: #aceaff; --color-cta: #00b8f5;',
      '    --color-purple: #7213ea; --color-pink: #fd349c; --color-success: #00b894;',
      '    --color-background-dark: #071728;',
      '    --font-sans: "Open Sans", sans-serif;',
      '    --font-display: "Open Sans Condensed", sans-serif;',
      '  }',
      '  body { font-family: "Open Sans", sans-serif !important; }',
      '  h1, h2, h3, h4, h5, h6 { font-family: "Open Sans Condensed", sans-serif !important; }',
      '</style>',
      '<style id="gjs-css">' + css + '</style>',
      '<script src="https://unpkg.com/@tailwindcss/browser@4"></scr' + 'ipt>',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></scr' + 'ipt>',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></scr' + 'ipt>',
      '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Open+Sans+Condensed:wght@300;400;600;700;800&display=swap" rel="stylesheet">',
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />',
      '</head>',
      '<body class="' + (themeMode === 'dark' ? 'dark bg-[#0c233c]' : 'bg-white') + '">',
      '<div id="preview-content">' + html + '</div>',
      '<script>',
      'document.addEventListener("DOMContentLoaded", function() {',
      '  function initAnimations() {',
      '    if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"){',
      '      gsap.registerPlugin(ScrollTrigger);',
      '      document.querySelectorAll("[data-animation]").forEach(function(el){',
      '        var animType = el.getAttribute("data-animation");',
      '        if(!animType) return;',
      '        var vars = { scrollTrigger: { trigger: el, start: "top 85%" }, duration: 0.8, ease: "power2.out", opacity: 0, clearProps: "all" };',
      '        if(animType === "fade-in"){ gsap.from(el, vars); }',
      '        else if(animType === "slide-up"){ vars.y = 50; gsap.from(el, vars); }',
      '        else if(animType === "zoom-in"){ vars.scale = 0.8; gsap.from(el, vars); }',
      '      });',
      '    }',
      '  }',
      '  initAnimations();',
      '  ',
      '  // Handle page switching in preview',
      '  document.addEventListener("click", function(e) {',
      '    const link = e.target.closest("a");',
      '    if (link && link.getAttribute("data-page-id")) {',
      '      e.preventDefault();',
      '      const pageId = link.getAttribute("data-page-id");',
      '      if (window.opener) {',
      '        window.opener.postMessage({ type: "NAVIGATE_PAGE", pageId: pageId }, "*");',
      '      }',
      '    }',
      '  });',
      '  ',
      '  window.addEventListener("message", function(event) {',
      '    if (event.data.type === "UPDATE_PREVIEW_CONTENT") {',
      '      document.getElementById("preview-content").innerHTML = event.data.html;',
      '      document.getElementById("gjs-css").textContent = event.data.css;',
      '      // Re-init animations and scroll to top',
      '      window.scrollTo(0, 0);',
      '      setTimeout(initAnimations, 100);',
      '      if (window.__tailwindBrowser) window.__tailwindBrowser.rebuild();',
      '    } else if (event.data.type === "UPDATE_THEME") {',
      '      if (event.data.themeMode === "dark") {',
      '        document.body.classList.add("dark");',
      '        document.body.style.backgroundColor = "#0c233c";',
      '      } else {',
      '        document.body.classList.remove("dark");',
      '        document.body.style.backgroundColor = "#ffffff";',
      '      }',
      '    }',
      '  });',
      '});',
      '</scr' + 'ipt>',
      '</body>',
      '</html>'
    ].join('\n');
    const blob = new Blob([previewHtml], { type: 'text/html' });
    previewWindowRef.current = window.open(URL.createObjectURL(blob), '_blank');
  };

  const addBlockToCanvas = (block: any) => {
    if (!editorRef.current) return;
    const content = block.get('content');
    toast.success(`Added ${block.get('label')} to canvas`, { position: 'bottom-right', autoClose: 2000 });

    if (insertAfterCid) {
      // Find the component by cid and add INSIDE it
      const wrapper = editorRef.current.getWrapper();
      const findByCid = (comp: any): any => {
        if (comp.cid === insertAfterCid) return comp;
        const ch = comp.components?.() || [];
        for (const c of ch) {
          const found = findByCid(c);
          if (found) return found;
        }
        return null;
      };
      const target = findByCid(wrapper);
      if (target) {
        // Add content inside the target component
        target.components().add(content);
      } else {
        editorRef.current.addComponents(content);
      }
      setInsertAfterCid(null);
    } else {
      editorRef.current.addComponents(content);
    }
    setIsLibraryOpen(false);
  };

  const handleExportZip = () => {
    if (!editorRef.current || !projectData) return;
    setIsExporting(true);
    
    // Yield to browser rendering engine so the overlay can actually paint
    // before the heavy synchronous DOM manipulations block the main thread
    setTimeout(async () => {
      try {
        await exportStaticWebsite(editorRef.current, projectData, { mode: themeMode, color: themeColor });
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  const handleCustomCode = () => {
    let selected = editorRef.current?.getSelected();

    // Create new block if not selecting a custom code block
    if (!selected || selected.get('type') !== 'custom-code-block') {
      const target = selected || editorRef.current?.getWrapper();
      const newBlock = target.append({
        type: 'custom-code-block'
      })[0];
      editorRef.current?.select(newBlock);
      selected = newBlock;
    }

    setActiveCodeBlock(selected);
    setCustomHtml(selected.get('customHtml') || '');
    setCustomCss(selected.get('customCss') || '');
    setCustomJs(selected.get('customJs') || '');
    setIsCustomCodeModalOpen(true);
  };

  const saveCustomCode = () => {
    if (activeCodeBlock) {
      activeCodeBlock.set({
        customHtml,
        customCss,
        customJs
      });
    }
    setIsCustomCodeModalOpen(false);
    setActiveCodeBlock(null);
  };

  const handleBreadcrumbClick = (cid: string) => {
    if (!editorRef.current) return;
    const wrapper = editorRef.current.getWrapper();
    const findByCid = (comp: any): any => {
      if (comp.cid === cid) return comp;
      const children = comp.components?.() || [];
      for (const child of children) {
        const found = findByCid(child);
        if (found) return found;
      }
      return null;
    };
    const target = findByCid(wrapper);
    if (target) {
      editorRef.current.select(target);
    }
  };

  // NOTE: Do NOT wrap the sidebar in useMemo. GrapesJS manages #gjs-traits-container
  // and #gjs-styles-container DOM nodes directly. useMemo can recreate the React element
  // tree when deps change, which destroys those DOM nodes and breaks GrapesJS.

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">

      {/* Top Toolbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-10 shadow-sm relative">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (projectId === 'guest') navigate('/login');
              else navigate(`/project/${projectId}`);
            }}
            className="flex items-center text-gray-500 hover:text-[#1e49e2] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium text-sm hidden sm:inline">Back</span>
          </button>

          <div className="h-5 w-px bg-gray-200"></div>

          {/* Page Switcher */}
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center h-8 px-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group">
              <Layers className="w-3.5 h-3.5 mr-2 text-gray-400 group-hover:text-[#1e49e2]" />
              <select
                value={pageSlug}
                onChange={(e) => {
                  const targetSlug = e.target.value;
                  const pData = projectDataRef.current;
                  
                  // Force save current page layout before leaving
                  if (editorRef.current && pData && pageId) {
                    const currentLayout = editorRef.current.getProjectData();
                    const updatedPages = pData.pages.map((p: any) => 
                      p.id === pageId ? { ...p, layout: currentLayout } : p
                    );
                    const updatedProject = { ...pData, pages: updatedPages };
                    projectDataRef.current = updatedProject;
                    
                    // Don't wait for it, just fire and forget so UI is snappy
                    if (projectId !== 'guest') {
                      api.put(`/projects/${projectId}`, updatedProject).catch(console.error);
                    }
                  }

                  if (targetSlug === 'add-new') {
                    setIsAddPageModalOpen(true);
                    return;
                  }
                  navigate(`/builder/${projectId}/${targetSlug}`);
                }}
                className="bg-transparent text-[11px] font-bold text-gray-700 outline-none cursor-pointer pr-4 appearance-none"
              >
                {projectData?.pages.map((p: any, idx: number) => {
                  const slug = idx === 0 ? 'home' : (p.title || p.name || 'page').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  return <option key={p.id} value={slug}>{p.title || p.name || 'Untitled Page'}</option>;
                })}
                <option value="add-new" className="text-[#1e49e2] font-bold">+ Add New Page</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2 text-gray-400 pointer-events-none" />
            </div>

            {/* Delete Page Button */}
            {projectData?.pages.length > 1 && (() => {
              const currentPage = projectData.pages.find((p: any) => p.id === pageId);
              return currentPage?.name !== 'Home' && currentPage?.title !== 'Home';
            })() && (
              <button
                onClick={handleDeletePage}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                title="Delete Current Page"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Center Section: Responsive & Actions */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4">
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            <button onClick={() => setDeviceMode('desktop')} className={`p-1.5 rounded-md ${device === 'desktop' ? 'bg-white shadow-sm text-[#1e49e2]' : 'text-gray-500 hover:text-gray-900'}`}>
              <Monitor className="w-4 h-4" />
            </button>
            <button onClick={() => setDeviceMode('tablet')} className={`p-1.5 rounded-md ${device === 'tablet' ? 'bg-white shadow-sm text-[#1e49e2]' : 'text-gray-500 hover:text-gray-900'}`}>
              <Tablet className="w-4 h-4" />
            </button>
            <button onClick={() => setDeviceMode('mobile')} className={`p-1.5 rounded-md ${device === 'mobile' ? 'bg-white shadow-sm text-[#1e49e2]' : 'text-gray-500 hover:text-gray-900'}`}>
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="h-5 w-px bg-gray-200"></div>

          <div className="flex space-x-1">
            <button onClick={handleUndo} className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors" title="Undo">
              <Undo className="w-4 h-4" />
            </button>
            <button onClick={handleRedo} className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors" title="Redo">
              <Redo className="w-4 h-4" />
            </button>
            <div className="h-5 w-px bg-gray-200 self-center mx-1"></div>
            <button
              onClick={handleDelete}
              disabled={!hasSelection}
              className={`p-1.5 rounded transition-colors ${hasSelection ? 'text-gray-500 hover:bg-red-50 hover:text-red-500' : 'text-gray-300 cursor-not-allowed'}`}
              title="Delete Selected"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Auto Save is now handled in the background to reduce UI clutter */}


          <button onClick={() => {
            const ed = editorRef.current;
            if (!ed) return;
            if (ed.Commands.isActive('sw-visibility')) {
              ed.Commands.stop('sw-visibility');
              setIsBordersActive(false);
            } else {
              ed.Commands.run('sw-visibility');
              setIsBordersActive(true);
            }
          }} className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors border border-transparent hover:border-blue-100 ${isBordersActive ? 'text-[#1e49e2] bg-blue-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`} title="View Components">
            <SquareDashed className="w-4 h-4" />
          </button>

          <button onClick={handlePreviewNewTab} className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors border border-transparent hover:border-blue-100 text-gray-500 hover:text-gray-800 hover:bg-gray-50`} title="Preview HTML Model (New Tab)">
            <Play className="w-4 h-4" />
          </button>

          <button onClick={() => {
            const ed = editorRef.current;
            if (!ed) return;
            if (ed.Commands.isActive('core:fullscreen')) {
              ed.Commands.stop('core:fullscreen');
              setIsFullscreenActive(false);
            } else {
              ed.Commands.run('core:fullscreen');
              setIsFullscreenActive(true);
            }
          }} className={`flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-blue-100`} title="Toggle Fullscreen">
            {isFullscreenActive ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <div className="relative flex items-center justify-center w-8 h-8 text-gray-500 hover:text-[#1e49e2] hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Theme Color">
            <Palette className="w-4 h-4" />
            <select
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Theme Color"
            >
              <option value="default">KPMG Blue</option>
              <option value="purple">Cosmic Purple</option>
              <option value="pink">Neon Pink</option>
              <option value="dark">Slate Dark</option>
            </select>
          </div>

          <button onClick={handleCustomCode} className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-[#1e49e2] hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Custom Code">
            <Code className="w-4 h-4" />
          </button>

          <button onClick={handleExportZip} className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-[#1e49e2] hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Export Website ZIP">
            <Download className="w-4 h-4" />
          </button>

          {projectId !== 'guest' && (
            <button id="save-btn" onClick={handleSave} className="flex items-center justify-center w-8 h-8 bg-[#1e49e2] hover:bg-[#1a3fc0] text-white rounded-lg transition-colors shadow-sm ml-2" title="Save Project">
              <Save className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* GrapesJS overrides using approved palette:
           #00338d (dark navy), #1e49e2 (bright blue), #00b894 (green),
           #fd349c (pink), #0c233c (darkest navy) */}
      <style>{`
        /* GrapesJS base background classes */
        .gjs-one-bg {
          background-color: #ffffff !important;
        }
        .gjs-two-color {
          color: #0c233c !important;
        }
        .gjs-three-bg {
          background-color: #1e49e2 !important;
        }
        .gjs-four-color,
        .gjs-four-color-h:hover {
          color: #1e49e2 !important;
        }

        .gjs-cv-canvas {
          width: 100% !important;
          height: 100% !important;
          right: 0 !important;
          left: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
        }
        .gjs-frame-wrapper {
          height: 100% !important;
        }

        /* Style Manager sector titles */
        .gjs-sm-sector .gjs-sm-sector-title {
          background: #00338d !important;
          color: #ffffff !important;
          border-color: #00338d !important;
          font-weight: 700 !important;
          font-size: 12px !important;
        }
        .gjs-sm-sector .gjs-sm-sector-title:hover {
          background: #1e49e2 !important;
        }

        /* Fields */
        .gjs-field {
          background: #ffffff !important;
          border: 1px solid #00338d !important;
          border-radius: 4px !important;
        }
        .gjs-field:focus-within {
          border-color: #1e49e2 !important;
          box-shadow: 0 0 0 2px rgba(30,73,226,0.2) !important;
        }

        /* Labels - MUST be visible */
        .gjs-sm-label,
        .gjs-sm-property .gjs-sm-label,
        .gjs-sm-property label {
          color: #0c233c !important;
          font-weight: 600 !important;
          font-size: 11px !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Radio buttons */
        .gjs-radio-item input:checked + .gjs-radio-item-label {
          background: #1e49e2 !important;
          color: white !important;
        }
        .gjs-radio-item-label {
          color: #0c233c !important;
          border-color: #00338d !important;
        }

        /* Primary buttons */
        .gjs-btn-prim {
          background: #1e49e2 !important;
          color: white !important;
          border-radius: 6px !important;
        }
        .gjs-btn-prim:hover {
          background: #00338d !important;
        }

        /* Class manager tags */
        .gjs-clm-tags .gjs-clm-tag {
          background: #00338d !important;
          color: #ffffff !important;
        }
        .gjs-sm-composite .gjs-sm-property {
          border-color: #00338d !important;
        }

        /* Stack 'Add' button fix (for shadows + icon) */
        .gjs-sm-add-dp, .gjs-sm-add {
          color: #1e49e2 !important;
          font-weight: bold !important;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #eef2ff !important;
          border-radius: 4px !important;
          margin-top: 4px !important;
          padding: 2px !important;
          min-height: 24px !important;
        }
        .gjs-sm-add::after {
          content: '+ Add Shadow';
          font-size: 12px;
          margin-left: 4px;
        }
        .gjs-sm-add-dp:hover, .gjs-sm-add:hover {
          background: #c7d2fe !important;
        }

        /* Trait Manager (Settings & Animations) */
        .gjs-trt-traits {
          padding: 8px !important;
          background: #ffffff !important;
          display: block !important;
        }
        .gjs-trt-trait {
          padding: 8px 12px !important;
          margin-bottom: 8px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 6px !important;
        }
        .gjs-trt-trait .gjs-label {
          color: #1e49e2 !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          text-transform: none !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 4px !important;
        }
        .gjs-trt-trait .gjs-field {
          border-color: #cbd5e1 !important;
          background: #ffffff !important;
        }

        /* Scrollbars */
        #gjs-styles-container::-webkit-scrollbar,
        #gjs-traits-container::-webkit-scrollbar {
          width: 4px;
        }
        #gjs-styles-container::-webkit-scrollbar-thumb,
        #gjs-traits-container::-webkit-scrollbar-thumb {
          background: #1e49e2;
          border-radius: 4px;
        }

        /* Range sliders */
        .gjs-sm-property .gjs-field input[type="range"],
        .gjs-field input[type="range"] {
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 100% !important;
          height: 6px !important;
          background: #00338d !important;
          border-radius: 3px !important;
          outline: none !important;
          border: none !important;
          cursor: pointer !important;
          opacity: 0.3 !important;
        }
        .gjs-sm-property .gjs-field input[type="range"]::-webkit-slider-thumb,
        .gjs-field input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 16px !important;
          height: 16px !important;
          border-radius: 50% !important;
          background: #1e49e2 !important;
          cursor: pointer !important;
          border: 2px solid white !important;
          box-shadow: 0 1px 4px rgba(0,51,141,0.3) !important;
        }
        .gjs-sm-property .gjs-field input[type="range"]::-moz-range-thumb,
        .gjs-field input[type="range"]::-moz-range-thumb {
          width: 14px !important;
          height: 14px !important;
          border-radius: 50% !important;
          background: #1e49e2 !important;
          cursor: pointer !important;
          border: 2px solid white !important;
        }
        .gjs-sm-property .gjs-field input[type="range"]::-moz-range-track,
        .gjs-field input[type="range"]::-moz-range-track {
          background: #00338d !important;
          height: 6px !important;
          border-radius: 3px !important;
          opacity: 0.3 !important;
        }

        /* Number inputs */
        .gjs-sm-property .gjs-field input[type="number"],
        .gjs-field input[type="number"],
        .gjs-sm-property .gjs-field input[type="text"],
        .gjs-field input[type="text"] {
          background: #ffffff !important;
          border: 1px solid #00338d !important;
          border-radius: 4px !important;
          padding: 4px 8px !important;
          color: #0c233c !important;
          font-weight: 500 !important;
          font-size: 12px !important;
        }
        .gjs-sm-property .gjs-field input:focus,
        .gjs-field input:focus {
          border-color: #1e49e2 !important;
          box-shadow: 0 0 0 2px rgba(30,73,226,0.15) !important;
          outline: none !important;
        }

        /* Select dropdowns */
        .gjs-sm-property .gjs-field select,
        .gjs-field select {
          background: #ffffff !important;
          border: 1px solid #00338d !important;
          border-radius: 4px !important;
          padding: 4px 8px !important;
          color: #0c233c !important;
          font-weight: 500 !important;
          font-size: 12px !important;
        }




        /* --- UNIFIED STRUCTURAL WIREFRAME (Vertical Priority) --- */
        .gjs-layers-container {
          padding: 12px 10px !important;
          background: #fdfefe !important;
          overflow-x: hidden !important;
        }

        /* DEFAULT: Rigid Vertical Page Flow */
        .gjs-layer-children {
          display: block !important; /* Block ensures siblings stack vertically by default */
          padding: 8px 4px 12px 14px !important;
          margin-left: 10px !important;
          border-left: 1px dashed #e2e8f0 !important;
          width: calc(100% - 10px) !important;
        }

        /* Generic Layer (Vertical Block) */
        .gjs-layer {
          display: flex !important;
          align-items: center !important;
          position: relative !important;
          padding: 8px 12px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          background: #ffffff !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;
          margin-bottom: 6px !important;
          width: 100% !important; /* Full width vertical stacking */
          min-height: 40px !important;
          transition: all 0.2s ease !important;
        }

        /* HORIZONTAL LAYOUT: Only for Rows/Grids/Action-Groups */
        /* Target by component type */
        .gjs-layer[data-gjs-type="responsive-grid"] + .gjs-layer-children,
        .gjs-layer[data-gjs-type="row"] + .gjs-layer-children,
        .gjs-layer[data-gjs-type="grid"] + .gjs-layer-children,
        .gjs-layer[data-gjs-type="button-group"] + .gjs-layer-children {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 6px !important;
        }

        /* Items inside a horizontal container */
        .gjs-layer-children[style*="flex-direction: row"] > .gjs-layer,
        .gjs-layer-children[class*="flex"] > .gjs-layer,
        .gjs-layer[data-gjs-type="card"],
        .gjs-layer[data-gjs-type="button"],
        .gjs-layer[data-gjs-type="link"] {
          width: auto !important;
          flex: 1 1 auto !important;
          min-width: 70px !important;
          max-width: fit-content !important;
          margin-bottom: 0 !important;
        }

        /* Section Header Styling */
        .gjs-layer[data-gjs-type="section"] {
           background: #f8fafc !important;
           border-color: #cbd5e1 !important;
           padding: 10px 14px !important;
           border-radius: 10px !important;
           margin-top: 14px !important;
           margin-bottom: 6px !important;
           border-left-width: 4px !important;
           border-left-color: #1e49e2 !important;
        }
        .gjs-layer[data-gjs-type="section"] .gjs-layer-name {
           font-weight: 800 !important;
           color: #0c233c !important;
           font-size: 11px !important;
           text-transform: uppercase !important;
           letter-spacing: 0.05em !important;
        }

        /* Component Names & Type Icons */
        .gjs-layer-name {
          font-weight: 600 !important;
          color: #475569 !important;
          font-size: 10px !important;
          margin-left: 24px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }

        .gjs-layer-icon {
          position: absolute !important;
          left: 10px !important;
          width: 20px !important;
          height: 20px !important;
          background: #f1f5f9 !important;
          border-radius: 4px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        /* TT Indicator for Text */
        .gjs-layer[data-gjs-type="text"] .gjs-layer-icon::before {
          content: "TT" !important;
          font-size: 8px !important;
          font-weight: 900 !important;
          color: #1e49e2 !important;
        }

        /* Clipping: Hide children of Cards/Grid Items */
        .gjs-layer[data-gjs-type="card"] + .gjs-layer-children,
        .gjs-layer[data-gjs-type="grid-item"] + .gjs-layer-children {
          display: none !important;
        }

        /* Drag & Hover States */
        .gjs-layer:hover {
          border-color: #1e49e2 !important;
          background: #ffffff !important;
          box-shadow: 0 4px 12px rgba(30, 73, 226, 0.08) !important;
          z-index: 5 !important;
        }
        .gjs-layer.gjs-active {
          border-color: #1e49e2 !important;
          background: #eef2ff !important;
          box-shadow: 0 0 0 2px rgba(30, 73, 226, 0.1) !important;
        }

        /* Right Actions */
        .gjs-layer-vis {
          margin-left: auto !important;
          opacity: 0.4 !important;
        }
        .gjs-layer:hover .gjs-layer-vis {
          opacity: 1 !important;
          color: #1e49e2 !important;
        }

        /* Drag Handle subtle indication */
        .gjs-layer::after {
          content: "⠿" !important;
          position: absolute !important;
          right: 24px !important;
          font-size: 12px !important;
          color: #cbd5e1 !important;
          cursor: grab !important;
          opacity: 0;
        }
        .gjs-layer:hover::after {
          opacity: 1 !important;
        }

        /* Identification of Sections (Top Level) */
        /* We can't easily select based on depth, but we can style all items as "layout blocks" */
        .gjs-layer-title {
          font-family: 'Inter', sans-serif !important;
        }

        /* Force Background properties to be on separate rows */
        .gjs-sm-property__background-color,
        .gjs-sm-property__background,
        .gjs-sm-property__background-image {
          flex-basis: 100% !important;
          width: 100% !important;
          margin-bottom: 8px !important;
        }

        /* Color input */
        .gjs-sm-property .gjs-field-color .gjs-field-colorp {
          border-radius: 4px !important;
          border: 2px solid #00338d !important;
        }

        /* Element Toolbar - white bg + blue border, horizontal */
        .gjs-toolbar {
          background: white !important;
          border: 1.5px solid #1e49e2 !important;
          border-radius: 8px !important;
          padding: 4px 6px !important;
          gap: 4px !important;
          box-shadow: 0 4px 15px rgba(0,51,141,0.2) !important;
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          min-width: max-content !important;
        }
        .gjs-toolbar-item {
          width: 26px !important;
          height: 26px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 5px !important;
          color: #1e49e2 !important;
          font-size: 12px !important;
          cursor: pointer !important;
          transition: all 0.15s !important;
          border: 1px solid transparent !important;
        }
        .gjs-toolbar-item:hover {
          background: #00338d !important;
          color: white !important;
        }

        /* Selection highlight */
        .gjs-selected {
          outline: 2px solid #1e49e2 !important;
          outline-offset: -2px !important;
        }
        .gjs-hovered {
          outline: 1px dashed #00b894 !important;
        }

        /* GrapesJS panel backgrounds */
        .gjs-pn-panel {
          background: #ffffff !important;
        }
        .gjs-pn-btn {
          color: #00338d !important;
        }
        .gjs-pn-btn.gjs-pn-active {
          color: #1e49e2 !important;
          box-shadow: 0 -2px 0 0 #1e49e2 inset !important;
        }

        /* Restricted Color Picker theme */
        .gjs-color-picker {
          color: #0c233c !important;
        }
        .sp-replacer {
          border-color: #00338d !important;
        }
        
        /* Hide color text input to enforce swatch selection */
        .gjs-field-color input[type="text"] {
          display: none !important;
        }
        .gjs-field-color .gjs-field-colorp {
          width: 100% !important;
          height: 28px !important;
        }

        /* Hide the manual color spectrum area */
        .gjs-color-picker .sp-picker-container,
        .gjs-color-picker .sp-initial {
          display: none !important;
        }
        .gjs-color-picker .sp-palette-container {
          width: 100% !important;
          border-right: none !important;
          padding-bottom: 8px !important;
        }
        
        /* Style the swatches */
        .sp-palette .sp-thumb-el {
          width: 28px !important;
          height: 28px !important;
          border-radius: 4px !important;
          border: 1px solid #c7d2fe !important;
          margin: 4px !important;
          transition: transform 0.1s !important;
        }
        .sp-palette .sp-thumb-el:hover {
          transform: scale(1.1) !important;
          border-color: #1e49e2 !important;
          box-shadow: 0 2px 5px rgba(0,51,141,0.2) !important;
        }
        .sp-palette-row {
          display: flex !important;
          justify-content: space-evenly !important;
          margin-bottom: 5px !important;
        }
        /* UNIFY GRAPESJS INTERNAL STYLES */
    .gjs-sm-sector {
      border-bottom: 1px solid #f3f4f6 !important; /* border-gray-100 */
    }
    .gjs-sm-sector-title {
      position: relative !important;
      background-color: #1e49e2 !important; /* Brand Blue */
      padding: 10px 16px 10px 34px !important; /* Left padding for unified arrow */
      color: #ffffff !important; /* Solid White Text */
      text-transform: none !important; /* Force Title Case */
      transition: none !important;
      border: none !important;
      cursor: pointer !important;
    }
    .gjs-sm-sector-title:hover {
      background-color: #1e49e2 !important;
      color: #ffffff !important;
    }
    /* Hide built-in GrapesJS carets */
    .gjs-sm-caret, .gjs-sm-sector-caret, .gjs-sm-title i {
      display: none !important;
    }
    /* Unified Absolute Arrow using pure CSS/SVG - UPDATED TO WHITE */
    .gjs-sm-sector-title::before {
      content: '';
      position: absolute;
      left: 14px;
      top: 50%;
      width: 12px;
      height: 12px;
      transform: translateY(-50%) rotate(-90deg);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      transition: transform 0.2s ease;
      opacity: 1; /* Full visibility on blue */
    }
    /* Rotate arrow when sector is open */
    .gjs-sm-sector.gjs-sm-open .gjs-sm-sector-title::before,
    .custom-sector-open .gjs-sm-sector-title::before {
       transform: translateY(-50%) rotate(0deg);
    }
    .gjs-sm-sector-title .gjs-sm-title {
      font-size: 11px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.1em !important;
    }
    .gjs-sm-property {
      padding: 12px 16px !important;
    }
    .gjs-sm-label {
      font-size: 10px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #9ca3af !important; /* gray-400 */
      margin-bottom: 6px !important;
    }
    .gjs-sm-field input, .gjs-sm-field select {
      background-color: #f9fafb !important; /* gray-50 */
      border: 1px solid #e5e7eb !important; /* gray-200 */
      border-radius: 8px !important;
      padding: 6px 10px !important;
      font-size: 11px !important;
      font-family: inherit !important;
      color: #374151 !important;
      transition: all 0.2s ease !important;
    }
    .gjs-sm-field input:focus, .gjs-sm-field select:focus {
      border-color: #1e49e2 !important;
      box-shadow: 0 0 0 2px rgba(30, 73, 226, 0.1) !important;
      outline: none !important;
    }
    /* OPACITY SLIDER / COLOR PICKER FIX */
    .gjs-sm-color-field {
       border-radius: 8px !important;
       overflow: hidden !important;
    }
    .gjs-field-range-input {
      accent-color: #1e49e2 !important;
    }
    .gjs-sm-field-select::after {
      top: 50% !important;
      transform: translateY(-50%) !important;
    }
    /* LAYERS MANAGER UNIFICATION */
    .gjs-layer-title {
      font-size: 11px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #4b5563 !important;
    }
    .gjs-layer-name {
      font-size: 11px !important;
      color: #374151 !important;
    }
    .gjs-layer.gjs-layer-selected {
      background-color: #f0f7ff !important;
      color: #1e49e2 !important;
    }
  `}</style>

      {/* Main Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Unified Left Sidebar — rendered inline (NOT memoized) to preserve GrapesJS DOM containers */}
        <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 overflow-hidden">

          {/* Add Section Button (Sticky Top) */}
          <div className="p-4 border-b border-gray-100 bg-white/90 backdrop-blur-md z-30 shadow-sm">
            <button
              onClick={() => { setLibraryMode('layouts'); setSelectedCategory('Layout'); setInsertAfterCid(null); setIsLibraryOpen(true); }}
              className="w-full bg-[#1e49e2] text-white py-3 rounded-none shadow-md flex items-center justify-center font-semibold text-sm tracking-wide transition-colors"
            >
              <Plus className="w-4 h-4 mr-2 stroke-[2.5px]" /> Add New Section
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50/50 p-1 shrink-0">
            <button
              onClick={() => setActiveTab('elements')}
              className={`flex-1 py-2.5 flex flex-col items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg transition-all ${activeTab === 'elements' ? 'bg-white text-[#1e49e2] shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Plus className="w-3.5 h-3.5" />
              Elements
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-2.5 flex flex-col items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg transition-all ${activeTab === 'layers' ? 'bg-white text-[#1e49e2] shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              Layers
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-2.5 flex flex-col items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg transition-all ${activeTab === 'media' ? 'bg-white text-[#1e49e2] shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Image className="w-3.5 h-3.5" />
              Media
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2.5 flex flex-col items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg transition-all ${activeTab === 'settings' ? 'bg-white text-[#1e49e2] shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Cog className="w-3.5 h-3.5" />
              Settings
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`flex-1 py-2.5 flex flex-col items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.1em] rounded-lg transition-all ${activeTab === 'style' ? 'bg-white text-[#1e49e2] shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              Style
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">

            {/* Tab 0: Elements (Accordion of Layouts & basic/advanced elements) — always in DOM, toggled via CSS hidden */}
            <div className={`p-3 animate-tab-content ${activeTab === 'elements' ? '' : 'hidden'}`}>
              <div className="space-y-3">
                {/* Search bar inside Elements tab */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search elements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1e49e2] focus:border-transparent bg-gray-50/50 hover:bg-white focus:bg-white transition-all shadow-inner"
                  />
                </div>

                {/* Accordion container */}
                <div className="divide-y divide-gray-100 border border-gray-100 bg-white rounded-xl shadow-sm overflow-hidden">
                  {categories.map((cat) => {
                    const isOpen = !!expandedCategories[cat];
                    const blocksInCat = blocks.filter(b => {
                      const catId = b.get('category').id || b.get('category');
                      if (catId !== cat) return false;
                      if (searchQuery) {
                        return b.get('label').toLowerCase().includes(searchQuery.toLowerCase());
                      }
                      return true;
                    });

                    // Hide empty categories in search
                    if (blocksInCat.length === 0) return null;

                    return (
                      <div key={cat} className="flex flex-col border-b border-gray-100 last:border-b-0">
                        {/* Accordion Header */}
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="w-full px-4 py-3 bg-gray-50/50 hover:bg-[#1e49e2]/5 text-left flex items-center justify-between transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-[#0c233c] tracking-wider group-hover:text-[#1e49e2] transition-colors">
                              {cat}
                            </span>
                            <span className="bg-gray-200/60 text-gray-500 rounded-full px-2 py-0.5 text-[9px] font-black">
                              {blocksInCat.length}
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#1e49e2]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                          )}
                        </button>

                        {/* Accordion Content */}
                        {isOpen && (
                          <div className="p-3 bg-white grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[300px] overflow-y-auto no-scrollbar border-t border-gray-50 shadow-inner">
                            {blocksInCat.map((block, idx) => (
                              <div
                                key={idx}
                                draggable
                                onDragStart={(e) => {
                                  if (editorRef.current) {
                                    // Required for Firefox
                                    e.dataTransfer.setData('text/plain', block.get('label'));
                                    editorRef.current.BlockManager.startDrag(block, e.nativeEvent);
                                  }
                                }}
                                onDragEnd={(e) => {
                                  if (editorRef.current) {
                                    editorRef.current.BlockManager.endDrag(e.nativeEvent);
                                  }
                                }}
                                onDoubleClick={() => {
                                  if (editorRef.current) {
                                    const content = block.get('content');
                                    editorRef.current.addComponents(content);
                                    toast.success(`"${block.get('label')}" block added to canvas`);
                                  }
                                }}
                                className="group p-2.5 border border-gray-100 rounded-xl hover:border-[#1e49e2] hover:bg-[#1e49e2]/5 cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center bg-gray-50/20 hover:scale-[1.02] hover:shadow-md relative select-none"
                                title={`Double-click or Drag to add ${block.get('label')}`}
                              >
                                {/* Media Thumbnail */}
                                <div className="h-16 w-full bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden relative mb-2 shadow-sm group-hover:border-[#1e49e2]/20 transition-colors">
                                  {block.get('media') ? (
                                    <div
                                      className="w-full h-full opacity-80 group-hover:opacity-100 flex items-center justify-center select-none pointer-events-none scale-[0.6] transition-all"
                                      dangerouslySetInnerHTML={{ __html: block.get('media') }}
                                    />
                                  ) : (
                                    <SquareDashed className="w-5 h-5 text-gray-300 group-hover:text-[#1e49e2]/40 transition-colors" />
                                  )}
                                </div>
                                <span className="text-[9px] font-black text-gray-600 group-hover:text-[#0c233c] truncate w-full text-center px-1">
                                  {block.get('label')}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tab 1: Layers — always in DOM, toggled via CSS hidden */}
            <div className={`p-2 animate-tab-content ${activeTab === 'layers' ? '' : 'hidden'}`}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-1 max-h-[70vh] overflow-y-auto no-scrollbar">
                  {editorRef.current && (
                    <StructuralMap
                      editor={editorRef.current}
                      onOpenLibrary={() => {
                        setLibraryMode('layouts');
                        setSelectedCategory('Layout');
                        setInsertAfterCid(null);
                        setIsLibraryOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Tab: Media Settings — always in DOM, toggled via CSS hidden */}
            <div className={`p-3 animate-tab-content ${activeTab === 'media' ? '' : 'hidden'}`}>
              {editorRef.current && <MediaUI editor={editorRef.current} />}
              {!hasSelection && (
                <div className="py-20 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Image className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-10">Select an element to edit media settings</p>
                </div>
              )}
            </div>

            {/* Tab 2: Settings (Trait Manager) — always in DOM */}
            <div className={`p-4 animate-tab-content ${activeTab === 'settings' ? '' : 'hidden'}`}>
              <div className={!hasSelection ? '' : 'hidden'}>
                <div className="py-20 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Cog className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-10">Select an element to edit its settings</p>
                </div>
              </div>

              <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${hasSelection ? '' : 'hidden'}`}>
                <div className="px-4 py-3 bg-gray-50 flex items-center border-b border-gray-100 shrink-0">
                  <span className="text-[10px] font-black text-[#1e49e2] tracking-[0.15em] uppercase">Element Traits</span>
                </div>
                <div className="p-4">
                  {/* GrapesJS injects trait UI here — this div MUST stay in DOM permanently */}
                  <div id="gjs-traits-container"></div>
                </div>
              </div>
            </div>

            {/* Tab 3: Style Manager — always in DOM */}
            <div className={`p-3 animate-tab-content ${activeTab === 'style' ? '' : 'hidden'}`}>
              <div className={!hasSelection ? '' : 'hidden'}>
                <div className="py-20 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Paintbrush className="w-6 h-6" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-10">Select an element to customize style</p>
                </div>
              </div>

              <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${hasSelection ? '' : 'hidden'}`}>
                <div className="relative">
                  {editorRef.current && (
                    <>
                      {/* State Selector (Hover/Normal) */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                          <button
                            onClick={() => {
                              editorRef.current.SelectorManager.setState('');
                              editorRef.current.trigger('styleManager:state', '');
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${!state || state === '' ? 'bg-[#0c233c] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            Normal
                          </button>
                          <button
                            onClick={() => {
                              editorRef.current.SelectorManager.setState('hover');
                              editorRef.current.trigger('styleManager:state', 'hover');
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${state === 'hover' ? 'bg-[#7213ea] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            Hover
                          </button>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <BoxModelUI editor={editorRef.current} />
                        <BorderUI editor={editorRef.current} />
                      </div>
                    </>
                  )}
                  {/* GrapesJS injects style UI here — this div MUST stay in DOM permanently */}
                  <div id="gjs-styles-container" className="gjs-sm-custom"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Canvas - Takes up remaining width completely */}
        <main className="flex-1 relative bg-[#f5f5f7] flex flex-col overflow-hidden w-full h-full shadow-inner ring-1 ring-gray-900/5">
          {editorRef.current && (
            <>
              <TypographyUI editor={editorRef.current} />
            </>
          )}
          <div className="w-full h-full relative" id="gjs">
            <div className="text-center text-gray-400 p-10 flex flex-col items-center justify-center h-full space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e49e2]"></div>
              <span className="font-medium">Initializing Workspace...</span>
            </div>
          </div>
        </main>
      </div>

      {/* Section Library Popup Overlay */}
      {isLibraryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex bg-gray-200 p-1 rounded-lg">
                  <button
                    onClick={() => { setLibraryMode('layouts'); setSelectedCategory('Layout'); }}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${libraryMode === 'layouts' ? 'bg-white text-[#1e49e2] shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Layouts
                  </button>
                  <button
                    onClick={() => { setLibraryMode('elements'); setSelectedCategory('Basic'); }}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${libraryMode === 'elements' ? 'bg-white text-[#1e49e2] shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Elements
                  </button>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <h2 className="text-xl font-bold text-gray-900 hidden md:block">
                  {libraryMode === 'layouts' ? 'Section Layouts' : 'UI Elements'}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#1e49e2] focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={() => { setIsLibraryOpen(false); setInsertAfterCid(null); setSearchQuery(''); }}
                  className="p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Category Sidebar */}
              <div className="w-64 border-r border-gray-100 bg-gray-50 flex flex-col py-4 overflow-y-auto shrink-0">
                {categories.filter(cat => {
                  const layouts = ['Layout', 'Services', 'Navbar', 'Header', 'Introduction', 'Footer', 'Call to actions', 'Contacts', 'Full Page Templates'];
                  return libraryMode === 'layouts' ? layouts.includes(cat) : !layouts.includes(cat);
                }).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-6 py-3 text-sm font-medium transition-colors ${selectedCategory === cat
                      ? 'bg-white text-[#1e49e2] border-r-2 border-[#1e49e2]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Blocks Grid & Icons Gallery */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                <div className={selectedCategory === 'Icons' ? "flex flex-wrap gap-3" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
                  {blocks.filter(b => {
                    const catId = b.get('category').id || b.get('category');
                    if (catId !== selectedCategory) return false;
                    if (searchQuery) {
                      return b.get('label').toLowerCase().includes(searchQuery.toLowerCase());
                    }
                    return true;
                  }).map((block, idx) => selectedCategory === 'Icons' ? (
                    <div
                      key={idx}
                      onClick={() => addBlockToCanvas(block)}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg hover:border-[#1e49e2] hover:bg-blue-50 cursor-pointer text-[#1e49e2] transition-colors shadow-sm bg-white"
                      title={block.get('label')}
                    >
                      <div dangerouslySetInnerHTML={{ __html: block.get('media') }} className="scale-75 pointer-events-none flex items-center justify-center" />
                    </div>
                  ) : (
                    <div
                      key={idx}
                      onClick={() => addBlockToCanvas(block)}
                      className="group border border-gray-200 rounded-none hover:border-[#1e49e2] hover:shadow-md cursor-pointer transition-all flex flex-col bg-gray-50 hover:bg-white overflow-hidden"
                    >
                      <div className="h-40 bg-slate-50 border-b border-gray-100 mb-0 flex flex-col items-center justify-center group-hover:border-[#1e49e2]/80 group-hover:scale-[1.02] shadow-sm transition-all overflow-hidden relative">
                        {block.get('media') ? (
                          <div className="w-full h-full opacity-80 group-hover:opacity-100 flex flex-col items-center justify-center" dangerouslySetInnerHTML={{ __html: block.get('media') }} />
                        ) : (
                          <div className="text-5xl font-light opacity-20 group-hover:opacity-40 mb-2">+</div>
                        )}
                        <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 font-semibold text-xs text-gray-800 py-1.5 px-3 text-center truncate z-10 shadow-sm">{block.get('label')}</div>
                      </div>
                    </div>
                  ))}

                  {blocks.filter(b => {
                    const catId = b.get('category').id || b.get('category');
                    if (catId !== selectedCategory) return false;
                    if (searchQuery) {
                      return b.get('label').toLowerCase().includes(searchQuery.toLowerCase());
                    }
                    return true;
                  }).length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-medium">No components found matching "{searchQuery}"</p>
                        <button onClick={() => setSearchQuery('')} className="mt-2 text-[#1e49e2] hover:underline text-sm">Clear Search</button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Code Widget Modal */}
      {isCustomCodeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#1e1e1e] rounded-none shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden border border-gray-700 animate-in fade-in zoom-in-95 duration-200">

            <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center bg-[#252526]">
              <div className="flex space-x-1">
                <span className="text-gray-300 font-semibold text-sm mr-4 flex items-center">Custom Code Editor</span>
              </div>
              <button
                onClick={() => setIsCustomCodeModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded transition-colors"
                title="Discard Changes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#1e1e1e]">
              <div className="flex-1 border-r border-gray-700 flex flex-col">
                <div className="bg-[#2d2d2d] text-xs text-gray-400 px-3 py-1 font-mono uppercase tracking-wider border-b border-gray-700">HTML</div>
                <textarea
                  className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm outline-none resize-none"
                  value={customHtml}
                  onChange={(e) => setCustomHtml(e.target.value)}
                  spellCheck="false"
                />
              </div>
              <div className="flex-1 border-r border-gray-700 flex flex-col">
                <div className="bg-[#2d2d2d] text-xs text-gray-400 px-3 py-1 font-mono uppercase tracking-wider border-b border-gray-700">CSS</div>
                <textarea
                  className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm outline-none resize-none"
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  spellCheck="false"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="bg-[#2d2d2d] text-xs text-gray-400 px-3 py-1 font-mono uppercase tracking-wider border-b border-gray-700">JavaScript</div>
                <textarea
                  className="flex-1 w-full bg-[#1e1e1e] text-[#ce9178] p-4 font-mono text-sm outline-none resize-none"
                  value={customJs}
                  onChange={(e) => setCustomJs(e.target.value)}
                  spellCheck="false"
                  placeholder="// Runs only in preview & export"
                />
              </div>
            </div>

            <div className="px-4 py-3 border-t border-gray-700 bg-[#252526] flex justify-end">
              <button
                onClick={saveCustomCode}
                className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-5 py-1.5 rounded font-medium text-sm transition-colors shadow-sm"
              >
                Apply Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Page Modal */}
      {isAddPageModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Plus className="w-5 h-5 mr-2 text-[#1e49e2]" />
                Create New Page
              </h3>
              <button 
                onClick={() => setIsAddPageModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Page Name
                </label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g., About Us, Services, Contact"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1e49e2] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddPage();
                    if (e.key === 'Escape') setIsAddPageModalOpen(false);
                  }}
                />
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Cog className="w-3 h-3 mr-1" />
                  URL slug will be generated automatically based on the name.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsAddPageModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPage}
                  className="flex-[2] bg-gradient-to-r from-[#00338d] to-[#1e49e2] text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Create Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && pageToDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-red-50/30 dark:bg-red-900/10">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center">
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Page
              </h3>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Are you sure?</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  You are about to delete <span className="font-bold text-gray-900 dark:text-white">"{pageToDelete.title || pageToDelete.name}"</span>. 
                  This action cannot be undone and all content on this page will be permanently removed.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Delete Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden container for GrapesJS blocks */}
      <div id="gjs-blocks" className="hidden"></div>
      <ToastContainer />
    </div>
  );
}
