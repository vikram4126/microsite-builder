import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { exportStaticWebsite } from '../utils/exportWebsite';
import { registerBlocks } from '../components/builder/Blocks';
import { registerTemplates } from '../components/builder/Templates';
import { registerStyles } from '../components/builder/Styles';
import { 
  Monitor, Smartphone, Tablet, Save, Undo, Redo, Play, ChevronLeft, Trash2, Plus, X, Download, Code, Paintbrush, ChevronRight, Maximize, Minimize, SquareDashed, Search, Cog, Moon, Sun, Palette, Layers
} from 'lucide-react';
import { api } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BoxModelUI } from '../components/builder/BoxModelUI';
import { TypographyUI } from '../components/builder/TypographyUI';
import { BorderRadiusUI } from '../components/builder/BorderRadiusUI';

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
  const { projectId, pageId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  
  const [device, setDevice] = useState('desktop');
  const [autoSave, setAutoSave] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [insertAfterCid, setInsertAfterCid] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Layout');
  const [hasSelection, setHasSelection] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [themeColor, setThemeColor] = useState<string>('default');
  const [projectData, setProjectData] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<{ name: string; cid: string }[]>([]);
  const [isBordersActive, setIsBordersActive] = useState(true);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  
  // Library State
  const [libraryMode, setLibraryMode] = useState<'layouts' | 'elements'>('layouts');
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for auto-save closures
  const autoSaveRef = useRef(autoSave);
  const projectDataRef = useRef(projectData);
  
  useEffect(() => {
    autoSaveRef.current = autoSave;
  }, [autoSave]);

  useEffect(() => {
    projectDataRef.current = projectData;
  }, [projectData]);

  // Sync Theme Settings to Canvas
  useEffect(() => {
    if (!editorRef.current) return;
    
    const applyTheme = () => {
      const body = editorRef.current.Canvas.getBody();
      if (!body) return;

      // Dark Mode
      if (themeMode === 'dark') body.classList.add('dark');
      else body.classList.remove('dark');

      // Colors
      const themePresets: any = {
        default: { primary: '#00338d', secondary: '#1e49e2', accent: '#00b8f5' },
        purple: { primary: '#4c1d95', secondary: '#7c3aed', accent: '#a78bfa' },
        dark: { primary: '#0f172a', secondary: '#334155', accent: '#38bdf8' },
        pink: { primary: '#be185d', secondary: '#db2777', accent: '#f472b6' }
      };
      
      const colors = themePresets[themeColor];
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
    // Also apply whenever the canvas loads
    editorRef.current.on('canvas:load', applyTheme);
    
    return () => {
      if (editorRef.current) {
        editorRef.current.off('canvas:load', applyTheme);
      }
    };
  }, [themeMode, themeColor]);

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
        plugins: [],
        blockManager: { appendTo: '#gjs-blocks' },
        styleManager: { appendTo: '#gjs-styles-container' },
        traitManager: { appendTo: '#gjs-traits-container' },
        selectorManager: { componentFirst: true },
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
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
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
            <div class="flex items-center gap-2 mt-2 w-full text-xs">
              <div class="flex items-center flex-1 bg-gray-50 p-1 rounded border border-gray-200" title="Desktop Columns">
                <i class="fa fa-desktop text-gray-400 mr-2 ml-1"></i>
                <select class="w-full bg-transparent border-none outline-none text-gray-800" data-bp="desktop">
                  ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => `<option value="${n}">${n}</option>`).join('')}
                </select>
              </div>
              <div class="flex items-center flex-1 bg-gray-50 p-1 rounded border border-gray-200" title="Tablet Columns">
                <i class="fa fa-tablet text-gray-400 mr-2 ml-1"></i>
                <select class="w-full bg-transparent border-none outline-none text-gray-800" data-bp="tablet">
                  ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => `<option value="${n}">${n}</option>`).join('')}
                </select>
              </div>
              <div class="flex items-center flex-1 bg-gray-50 p-1 rounded border border-gray-200" title="Mobile Columns">
                <i class="fa fa-mobile text-gray-400 mr-2 ml-1"></i>
                <select class="w-full bg-transparent border-none outline-none text-gray-800" data-bp="mobile">
                  ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => `<option value="${n}">${n}</option>`).join('')}
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
           
           if(dSel) dSel.value = desktop;
           if(tSel) tSel.value = tablet;
           if(mSel) mSel.value = mobile;
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
                label: 'Animation',
                options: [
                  { id: '', name: 'None' },
                  { id: 'fade-in', name: 'Fade In' },
                  { id: 'slide-up', name: 'Slide Up' },
                  { id: 'zoom-in', name: 'Zoom In' }
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
                label: 'Animation',
                options: [
                  { id: '', name: 'None' },
                  { id: 'fade-in', name: 'Fade In' },
                  { id: 'slide-up', name: 'Slide Up' },
                  { id: 'zoom-in', name: 'Zoom In' }
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
        if (!doc || doc.getElementById('tw-canvas-theme')) return;
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
          }
        `;
        doc.head.appendChild(tailwindStyle);
      };

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
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
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
             min-height: 50px;
             background-color: #f8fafc;
             border: 1px dashed #cbd5e1;
             display: flex;
             align-items: center;
             justify-content: center;
          }
          [data-gjs-type="default"]:empty::before, [data-gjs-type="responsive-grid"]:empty::before {
             content: 'Empty Block';
             min-height: 50px;
             color: #94a3b8;
             font-size: 12px;
             font-family: ui-sans-serif, system-ui, sans-serif;
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
        setCategories(cats);
        if (cats.length > 0) setSelectedCategory(cats[0]);

        // Auto Save Listener
        editor.on('update', () => {
          if (projectId === 'guest') return;
          
          if (autoSaveRef.current && projectDataRef.current) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(async () => {
              try {
                const editorData = editor.getProjectData();
                const pData = projectDataRef.current;
                const updatedProject = {
                  ...pData,
                  lastEdited: new Date().toISOString(),
                  pages: pData.pages.map((p: any) => 
                    p.id === pageId ? { ...p, layout: editorData } : p
                  )
                };
                await api.put(`/projects/${projectId}`, updatedProject);
                setProjectData(updatedProject);
                console.log('Autosaved project');
              } catch (err) {
                console.error('Autosave failed', err);
              }
            }, 1000); // Debounce 1s
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
      editor.on('component:selected', (model: any) => {
        setHasSelection(true);
        setBreadcrumb(getBreadcrumb(model));
        
        // Ensure ALL components get the Animation trait dynamically
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

        const type = model.get('type');
        if (type === 'text' || type === 'header' || type === 'heading') {
          const typographySector = editor.StyleManager.getSector('typography');
          if (typographySector) {
            typographySector.set('open', true);
          }
        }

        // Set toolbar on the selected component
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

      // Redirect LI selection to the parent UL/OL so the entire list interacts as one cohesive group
      editor.on('component:selected', (model: any) => {
         if (model && model.get('tagName')?.toLowerCase() === 'li') {
             const parent = model.parent();
             if (parent && (parent.get('tagName')?.toLowerCase() === 'ul' || parent.get('tagName')?.toLowerCase() === 'ol')) {
                 // Defer selection slightly to override default behavior cleanly
                 setTimeout(() => {
                     editor.select(parent);
                 }, 10);
             }
         }
      });

      // Note: Automatic Text Contrast logic is now securely embedded inside 
      // the custom Style Manager property types (in Styles.ts) to guarantee
      // execution whenever a user modifies a background via the UI.

    // Persist tailwind styling on preview mode toggles and screen resizing iframe reloads
    editor.on('canvas:canvas:load', injectTailwindTheme);
    editor.on('canvas:refresh', injectTailwindTheme);

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
      if (projectId === 'guest') {
        const dummyProject = {
          id: 'guest',
          name: 'Guest Project',
          pages: [{ id: 'new', layout: {} }]
        };
        setProjectData(dummyProject);
        projectDataRef.current = dummyProject;
        return;
      }

      try {
        const data = await api.get(`/projects/${projectId}`);
        setProjectData(data);
        projectDataRef.current = data; // Immeidately hydrate ref for autosave
        
        if (editorRef.current) {
          const currentPage = data.pages.find((p: any) => p.id === pageId);
          if (currentPage && currentPage.layout && Object.keys(currentPage.layout).length > 0) {
            editorRef.current.loadProjectData(currentPage.layout);
          }
        }
      } catch (err) {
        console.error('Error loading project', err);
      }
    };
    loadData();
  }, [projectId, pageId]);

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
    if (!editorRef.current || !projectData) return;
    try {
      const editorData = editorRef.current.getProjectData();
      const updatedProject = {
        ...projectData,
        lastEdited: new Date().toISOString(),
        pages: projectData.pages.map((p: any) => 
          p.id === pageId ? { ...p, layout: editorData } : p
        )
      };
      await api.put(`/projects/${projectId}`, updatedProject);
      setProjectData(updatedProject);
      projectDataRef.current = updatedProject;
      
      toast.success('Project saved successfully', { position: 'bottom-right', autoClose: 2000 });
      console.log('Project saved successfully');
    } catch (err) {
      console.error('Failed to save', err);
    }
  };

  const handlePreviewNewTab = () => {
    if (!editorRef.current) return;
    toast.info('Generating preview...', { position: 'bottom-right', autoClose: 2000 });
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    const previewHtml = [
      '<!doctype html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>Preview</title>',
      '<style type="text/tailwindcss">',
      '  @theme {',
      '    --color-primary: #00338d; --color-secondary: #1e49e2; --color-accent: #1e49e2;',
      '    --color-dark: #0c233c; --color-light-accent: #aceaff; --color-cta: #00b8f5;',
      '    --color-purple: #7213ea; --color-pink: #fd349c; --color-success: #00b894;',
      '    --color-background-dark: #071728;',
      '  }',
      '</style>',
      '<style>' + css + '</style>',
      '<script src="https://unpkg.com/@tailwindcss/browser@4"></scr' + 'ipt>',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></scr' + 'ipt>',
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></scr' + 'ipt>',
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">',
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />',
      '</head>',
      '<body>',
      html,
      '<script>',
      'document.addEventListener("DOMContentLoaded", function() {',
      '  if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"){',
      '    gsap.registerPlugin(ScrollTrigger);',
      '    document.querySelectorAll("[data-animation]").forEach(function(el){',
      '      var animType = el.getAttribute("data-animation");',
      '      if(!animType) return;',
      '      var vars = { scrollTrigger: { trigger: el, start: "top 85%" }, duration: 0.8, ease: "power2.out", opacity: 0, clearProps: "all" };',
      '      if(animType === "fade-in"){ gsap.from(el, vars); }',
      '      else if(animType === "slide-up"){ vars.y = 50; gsap.from(el, vars); }',
      '      else if(animType === "zoom-in"){ vars.scale = 0.8; gsap.from(el, vars); }',
      '    });',
      '  }',
      '});',
      '</scr' + 'ipt>',
      '</body>',
      '</html>'
    ].join('\n');
    const blob = new Blob([previewHtml], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
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

  const handleExportZip = async () => {
    if (!editorRef.current) return;
    const name = projectData?.name || 'microsite';
    await exportStaticWebsite(editorRef.current, name);
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
          {projectId !== 'guest' && (
            <label className="flex items-center space-x-2 cursor-pointer mr-2">
              <input 
                type="checkbox" 
                checked={autoSave} 
                onChange={(e) => setAutoSave(e.target.checked)} 
                className="rounded border-gray-300 text-[#1e49e2] focus:ring-[#1e49e2]"
              />
              <span className="text-xs font-semibold text-gray-600 select-none uppercase tracking-wider">Auto Save</span>
            </label>
          )}

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

          <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-[#1e49e2] hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Toggle Theme Mode">
            {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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
          text-transform: uppercase !important;
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

        /* Enlarge Layer Manager and make items look like structural page blocks */
        .gjs-layer {
          padding: 8px 10px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 6px !important;
          margin-bottom: 6px !important;
          background: #ffffff !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02) !important;
          transition: all 0.15s !important;
        }
        .gjs-layer-name {
          font-weight: 600 !important;
          color: #0c233c !important;
          font-size: 12px !important;
        }
        .gjs-layer:hover {
          background: #f8fafc !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 3px 6px rgba(0,0,0,0.04) !important;
        }
        .gjs-layer.gjs-active {
          background: #eef2ff !important;
          border-color: #1e49e2 !important;
          box-shadow: 0 0 0 1px rgba(30, 73, 226, 0.2) !important;
        }
        .gjs-layer-icon {
          color: #1e49e2 !important;
          opacity: 0.8 !important;
          margin-right: 8px !important;
        }
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
      `}</style>

      {/* Main Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Unified Left Sidebar - Premium Apple-Like Layout */}
        <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 overflow-hidden">
          
          {/* Add Section Button (Sticky Top) */}
          <div className="p-4 border-b border-gray-100 bg-white/90 backdrop-blur-md z-30 shadow-sm">
            <button 
              onClick={() => { setLibraryMode('layouts'); setSelectedCategory('Layout'); setInsertAfterCid(null); setIsLibraryOpen(true); }}
              className="w-full bg-[#1e49e2] hover:bg-[#00338d] text-white py-3 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 font-semibold text-sm tracking-wide"
            >
              <Plus className="w-4 h-4 mr-2 stroke-[2.5px]" /> Add New Section
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-3 space-y-4">
            


            {/* Breadcrumb Layer Navigation */}
            {breadcrumb.length > 0 && (
              <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm flex items-center overflow-x-auto whitespace-nowrap no-scrollbar">
                {breadcrumb.map((crumb, i) => (
                  <span key={crumb.cid} className="flex items-center shrink-0">
                    <button
                      onClick={() => handleBreadcrumbClick(crumb.cid)}
                      className={`text-[11px] font-semibold px-2 py-1 rounded-md transition-colors ${
                        i === breadcrumb.length - 1
                          ? 'text-[#1e49e2] bg-blue-50/50'
                          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {crumb.name}
                    </button>
                    {i < breadcrumb.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-gray-300 mx-0.5 shrink-0" />
                    )}
                  </span>
                ))}
              </div>
            )}



            {/* Style Manager */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-[#eef2ff]/50 flex items-center border-b border-gray-100 shrink-0">
                <Paintbrush className="w-4 h-4 mr-2 text-[#1e49e2]" />
                <span className="text-[11px] font-bold text-[#1e49e2] uppercase tracking-widest">Style Manager</span>
              </div>
              <div className="relative">
                {editorRef.current && (
                  <>
                    <BorderRadiusUI editor={editorRef.current} />
                    <BoxModelUI editor={editorRef.current} />
                  </>
                )}
                <div id="gjs-styles-container"></div>
              </div>
            </div>

          </div>
        </aside>

        {/* Center Canvas - Takes up remaining width completely */}
        <main className="flex-1 relative bg-[#f5f5f7] flex flex-col overflow-hidden w-full h-full shadow-inner ring-1 ring-gray-900/5">
           {editorRef.current && <TypographyUI editor={editorRef.current} />}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
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
                   const layouts = ['Layout', 'Sections', 'Navbar', 'Header', 'Introduction', 'Full Page Templates'];
                   return libraryMode === 'layouts' ? layouts.includes(cat) : !layouts.includes(cat);
                }).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-6 py-3 text-sm font-medium transition-colors ${
                      selectedCategory === cat 
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
                      className="group border border-gray-200 rounded-xl hover:border-[#1e49e2] hover:shadow-md cursor-pointer transition-all flex flex-col bg-gray-50 hover:bg-white overflow-hidden"
                    >
                      <div className="h-40 bg-slate-50 border-b border-gray-100 mb-0 flex flex-col items-center justify-center group-hover:border-[#1e49e2]/80 group-hover:scale-[1.02] shadow-sm transition-all overflow-hidden relative">
                         {block.get('media') ? (
                           <div className="w-full h-full opacity-80 group-hover:opacity-100 flex flex-col items-center justify-center p-2" dangerouslySetInnerHTML={{ __html: block.get('media') }} />
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
          <div className="bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden border border-gray-700 animate-in fade-in zoom-in-95 duration-200">
            
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

      {/* Hidden container for GrapesJS blocks */}
      <div id="gjs-blocks" className="hidden"></div>
      <ToastContainer />
    </div>
  );
}
