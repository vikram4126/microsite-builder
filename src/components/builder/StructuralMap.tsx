import React, { useEffect, useState, useCallback } from 'react';
import { Trash2, Copy, Folder, FileText, Image as ImageIcon, Layout as LayoutIcon, Plus, Eye, EyeOff } from 'lucide-react';

interface StructuralMapProps {
  editor: any;
  onOpenLibrary: () => void;
  onAddSectionBetween?: (cid: string) => void;
}

export const StructuralMap: React.FC<StructuralMapProps> = ({ editor, onOpenLibrary, onAddSectionBetween }) => {
  const [components, setComponents] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [draggedCid, setDraggedCid] = useState<string | null>(null);

  const refreshTree = useCallback(() => {
    if (!editor) return;
    const wrapper = editor.getWrapper();
    if (wrapper) {
      // Use spread operator to ensure React detects a new array reference
      setComponents([...wrapper.get('components').models]);
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    const handleSync = () => refreshTree();
    const handleSelect = (model: any) => setSelected(model?.cid || null);
    
    editor.on('component:add component:remove canvas:drop component:drag:end', handleSync);
    editor.on('component:toggled', handleSelect);
    
    refreshTree();
    return () => {
      editor.off('component:add component:remove component:update canvas:drop component:drag:end', handleSync);
      editor.off('component:toggled', handleSelect);
    };
  }, [editor, refreshTree]);

  // --- COMPONENT LOOKUP HELPER (The Fix) ---
  const findModelByCid = (cid: string) => {
    if (!editor || !cid) return null;
    // Search the entire wrapper for the component with matching CID
    return editor.getWrapper().find('*').find((c: any) => c.cid === cid) || null;
  };

  const handleDragStart = (cid: string) => {
    setDraggedCid(cid);
  };

  const handleDragEnd = () => {
    setDraggedCid(null);
  };

  const handleDrop = (targetCid: string, position: 'before' | 'after' | 'inside') => {
    if (!draggedCid || draggedCid === targetCid) {
      setDraggedCid(null);
      return;
    }

    const draggedModel = findModelByCid(draggedCid);
    const targetModel = findModelByCid(targetCid);

    if (!draggedModel || !targetModel) {
      console.warn('D&D: Models not found', { draggedCid, targetCid });
      setDraggedCid(null);
      return;
    }

    try {
      let parent, index;
      
      if (position === 'inside') {
        parent = targetModel;
        index = targetModel.get('components').length;
      } else {
        parent = targetModel.parent();
        const targetIndex = targetModel.index();
        index = position === 'after' ? targetIndex + 1 : targetIndex;
      }

      if (parent && draggedModel) {
        // --- DEEP NATIVE MOVE ---
        // This is the most reliable way to move a component in GrapesJS.
        // It handles DOM movement, internal collection sync, and events.
        draggedModel.move(parent, { at: index });
        
        editor.select(draggedModel);
        editor.Canvas.scrollToComponent(draggedModel, { force: true });
        
        // Force a UI refresh
        editor.refresh();
        refreshTree();
      }
    } catch (err) {
      console.error('Unified D&D failed:', err);
    }

    setDraggedCid(null);
  };

  const handleClone = (cid: string) => {
    const model = findModelByCid(cid);
    if (!model) {
      console.warn('Clone: Model not found', cid);
      return;
    }

    try {
      const parent = model.parent();
      if (parent) {
        const cloned = model.clone();
        const index = parent.components().indexOf(model);
        parent.components().add(cloned, { at: index + 1 });
        
        editor.select(cloned);
        editor.Canvas.scrollToComponent(cloned, { force: true });
        
        // Force a UI refresh
        editor.refresh();
        refreshTree();
      }
    } catch (err) {
      console.error('Unified Clone failed:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 h-full overflow-y-auto bg-white no-scrollbar">
      {components.map((comp) => (
        <React.Fragment key={comp.cid}>
          <MapNode 
            node={comp} 
            editor={editor} 
            selectedCid={selected} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onClone={handleClone}
            draggedCid={draggedCid}
          />
          {onAddSectionBetween && (
            <div 
              className="w-full h-3 my-0.5 group flex items-center justify-center relative cursor-pointer opacity-0 hover:opacity-100 transition-opacity" 
              onClick={() => onAddSectionBetween(comp.cid)}
              title="Add section here"
            >
              <div className="absolute inset-x-0 h-px bg-[#1e49e2] z-0" />
              <div className="w-5 h-5 rounded-full bg-white border border-[#1e49e2] flex items-center justify-center relative z-10 shadow-sm">
                <Plus className="w-3 h-3 text-[#1e49e2]" strokeWidth={3} />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      <button 
        onClick={onOpenLibrary}
        className="mt-2 p-2 border-2 border-dashed border-gray-100 rounded-none flex items-center justify-center gap-2 text-gray-400 hover:border-[#1e49e2] hover:text-[#1e49e2] transition-all font-bold text-[9px] bg-gray-50/20"
      >
        <span>+</span> Add Section
      </button>
    </div>
  );
};

// --- COMPONENT CLASSIFICATION & ABSTRACTION ---
const getSmartColumnName = (node: any) => {
  let hasText = false;
  let hasMedia = false;
  let hasMenu = false;
  let hasLogo = false;

  const walk = (n: any) => {
    if (!n) return;
    const tagName = (n.get('tagName') || '').toLowerCase();
    const classes = n.getClasses?.() || [];
    
    if (tagName === 'img' || tagName === 'svg' || tagName === 'video' || n.get('type') === 'image') hasMedia = true;
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(tagName)) hasText = true;
    if (tagName === 'ul' || tagName === 'nav' || classes.includes('menu')) hasMenu = true;
    if (classes.includes('logo') || (tagName === 'img' && classes.join('').includes('logo'))) hasLogo = true;
    
    const children = n.get('components')?.models || [];
    children.forEach(walk);
  };
  
  walk(node);

  if (hasLogo) return { name: "Logo", icon: "media" };
  if (hasMenu) return { name: "Menu", icon: "folder" };
  if (hasMedia && !hasText) return { name: "Media", icon: "media" };
  if (hasText && !hasMedia) return { name: "Text Content", icon: "text" };
  if (hasText && hasMedia) return { name: "Content Card", icon: "layout" };
  
  return { name: "Block", icon: "layout" };
};

const getComponentMeta = (node: any) => {
  const type = (node.get('type') || '').toLowerCase();
  const tagName = (node.get('tagName') || '').toLowerCase();
  const classes = node.getClasses?.() || [];

  if (type === 'section' || tagName === 'header' || tagName === 'footer' || tagName === 'nav') {
    return { name: 'Section', skip: false, icon: 'folder', terminal: false };
  }
  
  const isLayout = ['responsive-grid', 'row', 'grid-row'].includes(type) || classes.includes('grid') || classes.includes('flex-row') || classes.includes('flex');
  if (isLayout) {
    return { name: 'Layout Row', skip: false, isRow: true, icon: 'layout', terminal: false };
  }

  const isText = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'text'].includes(type) || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(tagName);
  if (isText) return { name: 'Text', skip: false, icon: 'text', terminal: true };
  
  if (type === 'image' || type === 'media' || tagName === 'img' || tagName === 'svg') return { name: 'Media', skip: false, icon: 'media', terminal: true };
  
  if (type === 'link' || type === 'button' || tagName === 'a' || tagName === 'button') return { name: 'Button/Link', skip: false, icon: 'file', terminal: true };

  // Treat all other structural wrappers as skipped so we flatten the tree
  return { name: 'Block', skip: true, terminal: false, icon: 'file' };
};

const getMeaningfulChildren = (node: any, isParentRow: boolean = false): any[] => {
  const children = node.get('components').models;
  const result: any[] = [];
  children.forEach((child: any) => {
    const meta = getComponentMeta(child);
    
    // If the parent was a Layout Row, then THIS child is a Column!
    // Columns are NOT skipped, and they ARE terminal (they hide their children)
    if (isParentRow) {
       // We attach a dynamic flag to let the MapNode know it's a semantic column
       child.__isSemanticColumn = true;
       result.push(child);
    } else if (meta.skip) {
      result.push(...getMeaningfulChildren(child, false));
    } else {
      result.push(child);
    }
  });
  return result;
};

const MapNode: React.FC<{ 
  node: any; 
  editor: any; 
  selectedCid: string | null; 
  onDragStart: (cid: string) => void;
  onDragEnd: () => void;
  onDrop: (targetCid: string, position: 'before' | 'after' | 'inside') => void;
  onClone: (cid: string) => void;
  draggedCid: string | null;
}> = ({ 
  node, editor, selectedCid, onDragStart, onDragEnd, onDrop, onClone, draggedCid
}) => {
  const [dropIndicator, setDropIndicator] = useState<'before' | 'after' | 'inside' | null>(null);
  const meta = getComponentMeta(node);
  const isSemanticColumn = !!node.__isSemanticColumn;
  const isSelected = selectedCid === node.cid;
  const isSection = meta.name === 'Section';
  const isLayoutRow = meta.isRow;
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const style = node.getStyle() || {};
    setIsHidden(style.display === 'none');
    
    const handleStyleChange = () => {
      const currentStyle = node.getStyle() || {};
      setIsHidden(currentStyle.display === 'none');
    };
    
    node.on('change:style', handleStyleChange);
    return () => {
      node.off('change:style', handleStyleChange);
    };
  }, [node]);

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStyle = node.getStyle() || {};
    if (isHidden) {
      const newStyle = { ...currentStyle };
      delete newStyle.display;
      node.setStyle(newStyle);
      
      if (isSelected) {
        const toolbar = node.get('toolbar') || [];
        const updated = toolbar.map((t: any) =>
          t.command === 'custom:hide'
            ? { ...t, attributes: { ...t.attributes, class: 'fa fa-eye', title: 'Hide Element' } }
            : t
        );
        node.set('toolbar', updated);
      }
    } else {
      node.setStyle({ ...currentStyle, display: 'none' });
      
      if (isSelected) {
        const toolbar = node.get('toolbar') || [];
        const updated = toolbar.map((t: any) =>
          t.command === 'custom:hide'
            ? { ...t, attributes: { ...t.attributes, class: 'fa fa-eye-slash', title: 'Show Element' } }
            : t
        );
        node.set('toolbar', updated);
      }
    }
  };

  const isTerminal = meta.terminal || isSemanticColumn;
  const children = !isTerminal ? getMeaningfulChildren(node, isLayoutRow) : [];

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    editor.select(node);
    editor.Canvas.scrollToComponent(node, { force: true });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    node.remove();
  };

  let iconType = meta.icon;
  let defaultName = meta.name;
  
  if (isSemanticColumn) {
     const smart = getSmartColumnName(node);
     iconType = smart.icon;
     defaultName = smart.name;
  }

  const getIcon = () => {
    const iconClass = "w-2 h-2";
    if (iconType === 'text') return <span className="text-[7.5px] font-black">TT</span>;
    if (iconType === 'media') return <ImageIcon className={iconClass} />;
    if (iconType === 'folder') return <Folder className={iconClass} />;
    if (iconType === 'layout') return <LayoutIcon className={iconClass} />;
    return <FileText className={iconClass} />;
  };

  const isDragging = draggedCid === node.cid;

  // Robust name detection logic
  const customName = node.get('custom-name');
  const nameProp = node.get('name');
  const attrName = node.getAttributes?.()?.['data-gjs-name'];
  
  let displayName = customName || nameProp || attrName || defaultName;
  
  if (meta.name === 'Text' && !customName && !nameProp && !attrName) {
    const rawContent = node.get('content') || "";
    const cleanContent = rawContent.replace(/<[^>]*>?/gm, '').trim();
    if (cleanContent) {
      displayName = cleanContent.length > 20 ? `${cleanContent.substring(0, 20)}...` : cleanContent;
    }
  }

  return (
    <div 
      className={`relative ${isSemanticColumn ? 'flex-1 min-w-[20px]' : 'w-full'} ${isDragging ? 'opacity-30' : ''} transition-all`}
      onDragOver={(e) => {
        e.preventDefault(); e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const y = e.clientY - rect.top;
        if (isSection) {
           if (y < rect.height * 0.2) setDropIndicator('before');
           else if (y > rect.height * 0.8) setDropIndicator('after');
           else setDropIndicator('inside');
        } else {
           if (y < rect.height / 2) setDropIndicator('before');
           else setDropIndicator('after');
        }
      }}
      onDragLeave={(e) => {
        // Only clear if we're truly leaving this node (not entering a child)
        const related = e.relatedTarget as HTMLElement | null;
        if (!e.currentTarget.contains(related)) {
          setDropIndicator(null);
        }
      }}
      onDrop={(e) => {
        e.preventDefault(); e.stopPropagation();
        if (dropIndicator) onDrop(node.cid, dropIndicator);
        setDropIndicator(null);
      }}
    >
      {!isSemanticColumn && dropIndicator === 'before' && <div className="h-0.5 bg-[#1e49e2] rounded-none mb-0.5 animate-pulse" />}

      <div 
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', node.cid);
          }
          onDragStart(node.cid);
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          onDragEnd();
        }}
        onClick={handleSelect}
        className={`
          group relative flex flex-col transition-all cursor-pointer
          ${isSection ? 'bg-[#f3f4f6] rounded-none border border-gray-200 p-2' : 'bg-white rounded-none border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-1.5 mt-1'}
          ${isSelected ? 'ring-1 ring-[#1e49e2] border-[#1e49e2] bg-blue-50/20' : 'hover:border-[#1e49e2]/30'}
          ${dropIndicator === 'inside' ? 'bg-blue-50' : ''}
          ${isSemanticColumn ? 'mt-0 mx-0.5' : ''}
        `}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className={`flex-shrink-0 w-4 h-4 rounded-none flex items-center justify-center border ${isSection ? 'bg-slate-200 text-slate-600 border-slate-300' : 'bg-gray-50 text-slate-400 border-gray-100'}`}>
            {getIcon()}
          </div>
          <span className={`text-[8px] tracking-wider truncate ${isSection ? 'font-black text-slate-800' : 'font-bold text-slate-500'} ${isHidden ? 'opacity-50' : ''}`}>
            {displayName}
          </span>
          {!isSemanticColumn && (
            <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100">
               <button onClick={handleToggleVisibility} title={isHidden ? "Show" : "Hide"} className={`p-0.5 transition-all ${isHidden ? 'text-gray-400 hover:text-[#1e49e2]' : 'hover:text-[#1e49e2]'}`}>
                {isHidden ? <EyeOff className="w-2 h-2" /> : <Eye className="w-2 h-2" />}
               </button>
               <button onClick={(e) => { e.stopPropagation(); onClone(node.cid); }} title="Clone" className="p-0.5 hover:text-[#1e49e2] transition-all">
                <Copy className="w-2 h-2" />
               </button>
               <button onClick={handleDelete} title="Delete" className="p-0.5 hover:text-red-500 transition-all">
                <Trash2 className="w-2 h-2" />
               </button>
            </div>
          )}
        </div>

        {children.length > 0 && (
          <div className={`mt-1 ${isLayoutRow ? 'flex flex-row gap-0.5 w-full mt-1.5' : 'flex flex-col mt-1'}`}>
            {children.map((child: any) => (
              <MapNode 
                key={child.cid} 
                node={child} 
                editor={editor} 
                selectedCid={selectedCid} 
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
                onClone={onClone}
                draggedCid={draggedCid}
              />
            ))}
          </div>
        )}
      </div>

      {!isSemanticColumn && dropIndicator === 'after' && <div className="h-0.5 bg-[#1e49e2] rounded-none mt-0.5 animate-pulse" />}
    </div>
  );
};
