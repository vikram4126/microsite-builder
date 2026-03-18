import React, { useEffect, useState, useRef } from 'react';
import { Type, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify, Palette, Heading1, CaseSensitive, ArrowLeftRight, Bold, Monitor, PaintBucket } from 'lucide-react';

export const TypographyUI = ({ editor }: { editor: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Dragging State
  const [position, setPosition] = useState({ x: typeof window !== 'undefined' ? window.innerWidth - 380 : 800, y: 96 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const [styles, setStyles] = useState({
    headingMode: 'Body Text',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: '0px',
    color: '#1E293B',
    backgroundColor: 'transparent',
    textAlign: 'left'
  });

  useEffect(() => {
    const updateUI = () => {
      const selected = editor.getSelected();
      // Check if selected is a text type or heading
      if (!selected) {
        setIsVisible(false);
        return;
      }
      
      const isText = selected.is('text') || selected.is('textnode') || ['h1','h2','h3','h4','h5','h6','p','span','a'].includes(selected.get('tagName')?.toLowerCase());
      
      if (isText) {
        setIsVisible(true);
        const currentStyles = selected.getStyle();
        const tagName = selected.get('tagName')?.toLowerCase();
        
        let headingMode = 'Body Text';
        if (tagName?.startsWith('h')) {
          headingMode = `Heading ${tagName.replace('h', '')}`;
        }
        
        setStyles({
          headingMode,
          fontFamily: currentStyles['font-family'] || 'Inter, sans-serif',
          fontSize: parseInt(currentStyles['font-size'] || '16'),
          fontWeight: currentStyles['font-weight'] || '400',
          letterSpacing: currentStyles['letter-spacing'] || '0px',
          color: currentStyles['color'] || '#1E293B',
          backgroundColor: currentStyles['background-color'] || 'transparent',
          textAlign: currentStyles['text-align'] || 'left'
        });
      } else {
        setIsVisible(false);
      }
    };

    editor.on('component:selected', updateUI);
    editor.on('component:styleUpdate', updateUI);
    
    return () => {
      editor.off('component:selected', updateUI);
      editor.off('component:styleUpdate', updateUI);
    };
  }, [editor]);

  // Window Drag Handlers
  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: dragRef.current.initialX + (e.clientX - dragRef.current.startX),
        y: Math.max(0, dragRef.current.initialY + (e.clientY - dragRef.current.startY))
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initialX: position.x, initialY: position.y };
  };

  const updateStyle = (key: string, value: any) => {
    const selected = editor.getSelected();
    if (!selected) return;
    
    setStyles(prev => ({ ...prev, [key]: value }));
    
    if (key === 'fontSize') {
        selected.addStyle({ 'font-size': `${value}px` });
    } else if (key === 'fontWeight') {
        selected.addStyle({ 'font-weight': value });
    } else if (key === 'fontFamily') {
        selected.addStyle({ 'font-family': value });
    } else if (key === 'letterSpacing') {
        selected.addStyle({ 'letter-spacing': value });
    } else if (key === 'color') {
        selected.addStyle({ color: value });
    } else if (key === 'backgroundColor') {
        selected.addStyle({ 'background-color': value });
    } else if (key === 'textAlign') {
        selected.addStyle({ 'text-align': value });
    }
  };

  const handleHeadingChange = (mode: string) => {
    const selected = editor.getSelected();
    if (!selected) return;
    
    setStyles(prev => ({ ...prev, headingMode: mode }));
    
    // Map modes to tags and font sizes
    const mappings: Record<string, { tag: string, size: number, weight: string }> = {
      'Heading 1': { tag: 'h1', size: 48, weight: '800' },
      'Heading 2': { tag: 'h2', size: 36, weight: '700' },
      'Heading 3': { tag: 'h3', size: 30, weight: '700' },
      'Heading 4': { tag: 'h4', size: 24, weight: '600' },
      'Heading 5': { tag: 'h5', size: 20, weight: '600' },
      'Heading 6': { tag: 'h6', size: 16, weight: '600' },
      'Body Text': { tag: 'p', size: 16, weight: '400' }
    };
    
    const config = mappings[mode];
    if (config) {
      selected.set('tagName', config.tag);
      selected.addStyle({ 
        'font-size': `${config.size}px`,
        'font-weight': config.weight
      });
      setStyles(prev => ({ ...prev, fontSize: config.size, fontWeight: config.weight }));
    }
  };

  const handleReset = () => {
    const selected = editor.getSelected();
    if (!selected) return;
    
    selected.removeStyle('font-size');
    selected.removeStyle('font-weight');
    selected.removeStyle('font-family');
    selected.removeStyle('letter-spacing');
    selected.removeStyle('color');
    selected.removeStyle('text-align');
    selected.removeStyle('background-color');
    
    // Force UI refresh by triggering update manually
    const currentStyles = selected.getStyle();
    setStyles(prev => ({
        ...prev,
        fontFamily: currentStyles['font-family'] || 'Inter, sans-serif',
        fontSize: parseInt(currentStyles['font-size'] || '16'),
        fontWeight: currentStyles['font-weight'] || '400',
        letterSpacing: currentStyles['letter-spacing'] || '0px',
        color: currentStyles['color'] || '#1E293B',
        backgroundColor: currentStyles['background-color'] || 'transparent',
        textAlign: currentStyles['text-align'] || 'left'
    }));
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100] font-sans"
      style={{ left: position.x, top: position.y }}
    >
        {/* Header */}
        <div 
          onMouseDown={handleMouseDown}
          className="bg-[#0f172a] text-white p-3 flex items-center justify-between cursor-move select-none active:cursor-grabbing"
        >
            <div className="flex items-center space-x-2">
                <Type size={16} className="text-[#3b82f6]" />
                <span className="font-bold tracking-widest text-[11px] uppercase pointer-events-none">Typography</span>
            </div>
            <span className="text-[10px] text-gray-400 pointer-events-none">settings</span>
        </div>

        <div className="p-4 space-y-5">
            
            {/* Row 1: Style & Family */}
            <div className="flex space-x-4">
                {/* Heading Style */}
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <span className="mr-1.5 text-gray-400"><Heading1 size={12} strokeWidth={2.5} /></span> STYLE
                    </label>
                    <div className="relative">
                        <select 
                            value={styles.headingMode}
                            onChange={(e) => handleHeadingChange(e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm"
                        >
                            <option>Heading 1</option>
                            <option>Heading 2</option>
                            <option>Heading 3</option>
                            <option>Heading 4</option>
                            <option>Heading 5</option>
                            <option>Heading 6</option>
                            <option>Body Text</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Font Family */}
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <span className="mr-1.5 text-gray-400"><CaseSensitive size={12} strokeWidth={2.5} /></span> FAMILY
                    </label>
                    <div className="relative">
                        <select 
                            value={styles.fontFamily}
                            onChange={(e) => updateStyle('fontFamily', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm"
                        >
                            <option value="Inter, sans-serif">Inter</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="'Open Sans', sans-serif">Open Sans</option>
                            <option value="system-ui, sans-serif">System UI</option>
                            <option value="serif">Serif</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Row 2: Spacing & Weight */}
            <div className="flex space-x-4">
                {/* Spacing */}
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <span className="mr-1.5 text-gray-400"><ArrowLeftRight size={12} strokeWidth={2.5} /></span> SPACING
                    </label>
                    <input 
                        type="text" 
                        value={styles.letterSpacing}
                        onChange={(e) => updateStyle('letterSpacing', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#6366f1] shadow-sm"
                    />
                </div>
                {/* Weight */}
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <span className="mr-1.5 text-gray-400"><Bold size={12} strokeWidth={2.5} /></span> WEIGHT
                    </label>
                    <div className="relative">
                        <select 
                            value={styles.fontWeight}
                            onChange={(e) => updateStyle('fontWeight', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white shadow-sm"
                        >
                            <option value="300">Light (300)</option>
                            <option value="400">Regular (400)</option>
                            <option value="500">Medium (500)</option>
                            <option value="600">Semi-Bold (600)</option>
                            <option value="700">Bold (700)</option>
                            <option value="800">Extra-Bold (800)</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Row 3: Size & Alignment */}
            <div className="flex space-x-4">
                {/* Size */}
                <div className="flex-1 space-y-2.5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                            <span className="mr-1.5 text-gray-400"><Monitor size={12} strokeWidth={2.5} /></span> SIZE
                        </label>
                        <span className="text-[10px] font-bold text-[#1e49e2] tracking-wider">{styles.fontSize || 16}PX</span>
                    </div>
                    <input 
                        type="range" 
                        min="8" 
                        max="120" 
                        value={styles.fontSize || 16}
                        onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1e49e2]"
                    />
                </div>
                {/* Alignment */}
                <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                        <span className="mr-1.5 text-gray-400"><AlignLeft size={12} strokeWidth={2.5} /></span> ALIGNMENT
                    </label>
                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 shadow-sm">
                        <button 
                            onClick={() => updateStyle('textAlign', 'left')}
                            className={`flex-[1] py-1 flex items-center justify-center rounded transition-colors ${styles.textAlign === 'left' ? 'bg-white shadow-sm border border-gray-200 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <AlignLeft size={14} />
                        </button>
                        <button 
                            onClick={() => updateStyle('textAlign', 'center')}
                            className={`flex-[1] py-1 flex items-center justify-center rounded transition-colors ${styles.textAlign === 'center' ? 'bg-white shadow-sm border border-gray-200 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <AlignCenter size={14} />
                        </button>
                        <button 
                            onClick={() => updateStyle('textAlign', 'right')}
                            className={`flex-[1] py-1 flex items-center justify-center rounded transition-colors ${styles.textAlign === 'right' ? 'bg-white shadow-sm border border-gray-200 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <AlignRight size={14} />
                        </button>
                        <button 
                            onClick={() => updateStyle('textAlign', 'justify')}
                            className={`flex-[1] py-1 flex items-center justify-center rounded transition-colors ${styles.textAlign === 'justify' ? 'bg-white shadow-sm border border-gray-200 text-[#1e49e2]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <AlignJustify size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Row 4: Text Color Palette */}
            <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                    <span className="mr-1.5 text-gray-400"><Palette size={12} strokeWidth={2.5} /></span> TEXT COLOR
                </label>
                <div className="flex items-center space-x-2 pt-1">
                    {[
                      { value: '#00338d', label: 'Navy' },
                      { value: '#1e49e2', label: 'Blue' },
                      { value: '#00b894', label: 'Green' },
                      { value: '#fd349c', label: 'Pink' },
                      { value: '#0c233c', label: 'Dark' },
                      { value: '#e5e5e5', label: 'Light Gray' },
                      { value: '#000000', label: 'Black' },
                      { value: '#ffffff', label: 'White' }
                    ].map((c) => (
                       <button
                         key={c.value}
                         onClick={() => updateStyle('color', c.value)}
                         title={c.label}
                         className={`w-6 h-6 shrink-0 rounded-full border-2 transition-transform hover:scale-110 ${styles.color.toLowerCase() === c.value.toLowerCase() ? 'ring-2 ring-offset-2 ring-[#1e49e2] border-white/20' : 'border-transparent shadow-sm'}`}
                         style={{ backgroundColor: c.value }}
                       />
                    ))}
                    {/* Add custom color picker plus button to match ref */}
                    <div className="relative w-7 h-7 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden hover:bg-gray-100 cursor-pointer">
                        <span className="text-gray-400 text-sm font-light leading-none mb-0.5">+</span>
                        <input 
                            type="color" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => updateStyle('color', e.target.value)}
                            title="Custom Color"
                        />
                    </div>
                </div>
            </div>

            {/* Row 5: Background Color Palette */}
            <div className="space-y-2 pt-2 pb-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center">
                    <span className="mr-1.5 text-gray-400"><PaintBucket size={12} strokeWidth={2.5} /></span> BACKGROUND COLOR
                </label>
                <div className="flex items-center space-x-2 pt-1">
                    {[
                      { value: 'transparent', label: 'Transparent' },
                      { value: '#00338d', label: 'Navy' },
                      { value: '#1e49e2', label: 'Blue' },
                      { value: '#00b894', label: 'Green' },
                      { value: '#fd349c', label: 'Pink' },
                      { value: '#0c233c', label: 'Dark' },
                      { value: '#e5e5e5', label: 'Light Gray' },
                      { value: '#000000', label: 'Black' },
                      { value: '#ffffff', label: 'White' }
                    ].map((c) => (
                       <button
                         key={c.value}
                         onClick={() => updateStyle('backgroundColor', c.value)}
                         title={c.label}
                         className={`w-6 h-6 shrink-0 rounded-full border-2 transition-transform hover:scale-110 ${styles.backgroundColor.toLowerCase() === c.value.toLowerCase() ? 'ring-2 ring-offset-2 ring-[#1e49e2] border-white/20' : 'border-transparent shadow-sm'}`}
                         style={{ 
                             background: c.value === 'transparent' 
                                ? 'linear-gradient(to top right, #f8fafc calc(50% - 1px), #ef4444 calc(50% - 1px), #ef4444 calc(50% + 1px), #f8fafc calc(50% + 1px))' 
                                : c.value 
                         }}
                       />
                    ))}
                    {/* Add custom color picker plus button */}
                    <div className="relative w-7 h-7 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden hover:bg-gray-100 cursor-pointer">
                        <span className="text-gray-400 text-sm font-light leading-none mb-0.5">+</span>
                        <input 
                            type="color" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                            title="Custom Background Color"
                        />
                    </div>
                </div>
            </div>

        </div>

        {/* Footer actions */}
        <div className="bg-gray-50/50 p-3 flex justify-between items-center border-t border-gray-100">
            <button onClick={handleReset} className="text-[11px] font-bold text-gray-400 uppercase hover:text-gray-700 tracking-wider">
                Reset
            </button>
            <div className="flex items-center space-x-2">
                {/* Apply button removed as requested */}
            </div>
        </div>

    </div>
  );
};
