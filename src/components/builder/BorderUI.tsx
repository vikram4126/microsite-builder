import { useEffect, useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronRight, Palette, Square } from 'lucide-react';

export const BorderUI = ({ editor }: { editor: any }) => {
  const [borderWidth, setBorderWidth] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: true });
  const [borderStyle, setBorderStyle] = useState('none');
  const [borderColor, setBorderColor] = useState('#000000');
  const [radii, setRadii] = useState({ tl: 0, tr: 0, br: 0, bl: 0, unit: 'px', locked: false });
  const [boxShadow, setBoxShadow] = useState('none');
  
  const [isOpen, setIsOpen] = useState(true);

  const brandColors = [
    '#00338D', '#1E49E2', '#0C233C', '#00B8F5', '#7213EA', '#FD349C', '#ACEAFF', '#FFFFFF'
  ];

  const shadowPresets = [
    { value: 'none', name: 'None' },
    { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', name: 'Small' },
    { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', name: 'Medium' },
    { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', name: 'Large' },
    { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)', name: 'Extra Large' },
  ];

  useEffect(() => {
    const parseUnit = (val: any, fallback: string) => {
      if (val === undefined || val === null || val === '') return fallback;
      const u = String(val).replace(/[0-9.-]/g, '').trim();
      if (!u || (u === 'px' && String(val) === '0px')) return fallback; 
      if (['px', '%', 'em', 'rem'].includes(u)) return u;
      return fallback;
    };

    const updateStyles = () => {
      const selected = editor.getSelected();
      if (!selected) return;
      const style = selected.getStyle();
      
      setBorderWidth(b => ({
        top: parseFloat(style['border-top-width']) || 0,
        right: parseFloat(style['border-right-width']) || 0,
        bottom: parseFloat(style['border-bottom-width']) || 0,
        left: parseFloat(style['border-left-width']) || 0,
        unit: parseUnit(style['border-top-width'], b.unit),
        locked: b.locked
      }));

      setBorderStyle(style['border-style'] || 'none');
      setBorderColor(style['border-color'] || '#000000');
      setBoxShadow(style['box-shadow'] || 'none');

      setRadii(r => ({
        tl: parseFloat(style['border-top-left-radius']) || 0,
        tr: parseFloat(style['border-top-right-radius']) || 0,
        bl: parseFloat(style['border-bottom-left-radius']) || 0,
        br: parseFloat(style['border-bottom-right-radius']) || 0,
        unit: parseUnit(style['border-top-left-radius'], r.unit),
        locked: r.locked
      }));
    };

    editor.on('component:selected', updateStyles);
    editor.on('component:styleUpdate', updateStyles);
    editor.on('styleManager:state', updateStyles);
    return () => {
      editor.off('component:selected', updateStyles);
      editor.off('component:styleUpdate', updateStyles);
      editor.off('styleManager:state', updateStyles);
    };
  }, [editor]);

  const handleBorderWidthUpdate = (side: 'top' | 'right' | 'bottom' | 'left', val: number) => {
    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
    if (!selectedElements.length) return;

    const newStyle: any = {};
    const unit = borderWidth.unit;
    if (borderWidth.locked) {
        newStyle['border-top-width'] = `${val}${unit}`;
        newStyle['border-right-width'] = `${val}${unit}`;
        newStyle['border-bottom-width'] = `${val}${unit}`;
        newStyle['border-left-width'] = `${val}${unit}`;
        setBorderWidth(prev => ({ ...prev, top: val, right: val, bottom: val, left: val }));
        if (borderStyle === 'none' && val > 0) {
            newStyle['border-style'] = 'solid';
            setBorderStyle('solid');
        }
    } else {
        newStyle[`border-${side}-width`] = `${val}${unit}`;
        setBorderWidth(prev => ({ ...prev, [side]: val }));
        if (borderStyle === 'none' && val > 0) {
            newStyle['border-style'] = 'solid';
            setBorderStyle('solid');
        }
    }
    selectedElements.forEach((el: any) => el.addStyle(newStyle));
  };

  const handleRadiusUpdate = (corner: 'tl' | 'tr' | 'bl' | 'br', val: number) => {
    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
    if (!selectedElements.length) return;

    const newStyle: any = {};
    const unit = radii.unit;
    if (radii.locked) {
        newStyle['border-top-left-radius'] = `${val}${unit}`;
        newStyle['border-top-right-radius'] = `${val}${unit}`;
        newStyle['border-bottom-left-radius'] = `${val}${unit}`;
        newStyle['border-bottom-right-radius'] = `${val}${unit}`;
        setRadii(prev => ({ ...prev, tl: val, tr: val, bl: val, br: val }));
    } else {
        const fullMap: any = { 'tl': 'border-top-left-radius', 'tr': 'border-top-right-radius', 'bl': 'border-bottom-left-radius', 'br': 'border-bottom-right-radius' };
        newStyle[fullMap[corner]] = `${val}${unit}`;
        setRadii(prev => ({ ...prev, [corner]: val }));
    }
    selectedElements.forEach((el: any) => el.addStyle(newStyle));
  };

  const handleShadowUpdate = (val: string) => {
      const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
      if (!selectedElements.length) return;
      selectedElements.forEach((el: any) => el.addStyle({ 'box-shadow': val }));
      setBoxShadow(val);
  };

  const changeUnit = (type: 'border' | 'radius', unit: string) => {
    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
    if (!selectedElements.length) return;

    if (type === 'border') {
      setBorderWidth(b => ({ ...b, unit }));
      selectedElements.forEach((el: any) => el.addStyle({
        'border-top-width': `${borderWidth.top}${unit}`,
        'border-right-width': `${borderWidth.right}${unit}`,
        'border-bottom-width': `${borderWidth.bottom}${unit}`,
        'border-left-width': `${borderWidth.left}${unit}`
      }));
    } else {
      setRadii(r => ({ ...r, unit }));
      selectedElements.forEach((el: any) => el.addStyle({
        'border-top-left-radius': `${radii.tl}${unit}`,
        'border-top-right-radius': `${radii.tr}${unit}`,
        'border-bottom-left-radius': `${radii.bl}${unit}`,
        'border-bottom-right-radius': `${radii.br}${unit}`
      }));
    }
  };

  return (
    <div className={`gjs-sm-sector border-b border-gray-100 ${isOpen ? 'custom-sector-open' : ''}`}>
      <div 
        className="gjs-sm-sector-title flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center tracking-[0.05em] font-bold text-[11px] text-white">
          Border & Radius
        </span>
      </div>

      {isOpen && (
        <div className="p-4 bg-white text-xs font-sans text-gray-500 flex flex-col space-y-6 overflow-hidden">
          
          <div className="flex flex-col items-center space-y-2">
            
            {/* Diagram Header Controls */}
            <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">Width</span>
                    <select value={borderWidth.unit} onChange={(e) => changeUnit('border', e.target.value)} className="bg-transparent text-[8px] focus:outline-none cursor-pointer">
                        <option value="px">px</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                    <button onClick={() => setBorderWidth(b => ({...b, locked: !b.locked}))} className={`transition-colors cursor-pointer ${borderWidth.locked ? 'text-blue-600' : 'text-gray-300'}`}>
                        {borderWidth.locked ? <Lock size={10} /> : <Unlock size={10} />}
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setRadii(r => ({...r, locked: !r.locked}))} className={`transition-colors cursor-pointer ${radii.locked ? 'text-indigo-600' : 'text-gray-300'}`}>
                        {radii.locked ? <Lock size={10} /> : <Unlock size={10} />}
                    </button>
                    <select value={radii.unit} onChange={(e) => changeUnit('radius', e.target.value)} className="bg-transparent text-[8px] focus:outline-none cursor-pointer">
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">Radius</span>
                </div>
            </div>

            {/* The Box Diagram */}
            <div className="relative w-full aspect-video max-w-[300px] border border-gray-300 border-dashed bg-gray-50 flex items-center justify-center p-12 mt-2 group pointer-events-none">
                
                {/* Decorative Center Element (Enlarged and showing Live Shadow) */}
                <div 
                    className="w-32 h-16 border border-gray-200 border-solid bg-white flex items-center justify-center transition-shadow duration-300 pointer-events-none"
                    style={{ boxShadow: boxShadow }}
                >
                    <Square size={20} className="text-gray-100" />
                </div>

                {/* BORDER WIDTH INPUTS - Edge Centers (Styled like Spacing UI) */}
                <input type="number" value={borderWidth.top} onChange={(e) => handleBorderWidthUpdate('top', Number(e.target.value))} 
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-blue-600 font-bold text-[10px] pointer-events-auto z-10 transition-all" 
                    title="Border Top Width" />
                
                <input type="number" value={borderWidth.bottom} onChange={(e) => handleBorderWidthUpdate('bottom', Number(e.target.value))} 
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-blue-600 font-bold text-[10px] pointer-events-auto z-10 transition-all" 
                    title="Border Bottom Width" />
                
                <input type="number" value={borderWidth.left} onChange={(e) => handleBorderWidthUpdate('left', Number(e.target.value))} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-blue-600 font-bold text-[10px] pointer-events-auto z-10 transition-all" 
                    title="Border Left Width" />
                
                <input type="number" value={borderWidth.right} onChange={(e) => handleBorderWidthUpdate('right', Number(e.target.value))} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-blue-600 font-bold text-[10px] pointer-events-auto z-10 transition-all" 
                    title="Border Right Width" />

                {/* BORDER RADIUS INPUTS - Corners (Styled like Spacing UI) */}
                <input type="number" value={radii.tl} onChange={(e) => handleRadiusUpdate('tl', Number(e.target.value))}
                    className="absolute top-1 left-2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 font-bold text-[10px] pointer-events-auto z-10 transition-all"
                    title="Top Left Radius" />

                <input type="number" value={radii.tr} onChange={(e) => handleRadiusUpdate('tr', Number(e.target.value))}
                    className="absolute top-1 right-2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 font-bold text-[10px] pointer-events-auto z-10 transition-all"
                    title="Top Right Radius" />

                <input type="number" value={radii.bl} onChange={(e) => handleRadiusUpdate('bl', Number(e.target.value))}
                    className="absolute bottom-1 left-2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 font-bold text-[10px] pointer-events-auto z-10 transition-all"
                    title="Bottom Left Radius" />

                <input type="number" value={radii.br} onChange={(e) => handleRadiusUpdate('br', Number(e.target.value))}
                    className="absolute bottom-1 right-2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 font-bold text-[10px] pointer-events-auto z-10 transition-all"
                    title="Bottom Right Radius" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
             {/* Border Style */}
             <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Style</label>
                <div className="relative">
                  <select value={borderStyle} onChange={(e) => { 
                    const s = e.target.value; 
                    setBorderStyle(s); 
                    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
                    selectedElements.forEach((el: any) => el.addStyle({'border-style': s})); 
                  }}
                    className="w-full appearance-none bg-[#F5F7FA] border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-700 outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                    <option value="double">Double</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>

             {/* Border Color */}
             <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Color</label>
                <div className="flex items-center space-x-2 bg-[#F5F7FA] border border-gray-200 rounded-lg px-2 py-1.5 h-[32px] focus-within:ring-1 focus-within:ring-blue-500/20 focus-within:border-[#1E49E2] transition-all">
                    <div className="w-3.5 h-3.5 border border-gray-300 shadow-sm shrink-0 rounded-sm" style={{ backgroundColor: borderColor }} />
                    <input type="text" value={borderColor} onChange={(e) => { 
                        const c = e.target.value; 
                        setBorderColor(c); 
                        const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
                        selectedElements.forEach((el: any) => el.addStyle({'border-color': c})); 
                    }}
                        className="w-full bg-transparent border-none outline-none text-[9px] uppercase font-mono font-bold text-gray-700"
                    />
                    <div className="relative w-4 h-4 flex items-center justify-center cursor-pointer shrink-0">
                        <Palette size={12} className="text-gray-400 hover:text-black" />
                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" value={borderColor} onChange={(e) => { 
                            const c = e.target.value; 
                            setBorderColor(c); 
                            const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
                            selectedElements.forEach((el: any) => el.addStyle({'border-color': c})); 
                        }} />
                    </div>
                </div>
             </div>
          </div>

          {/* Color Presets */}
          <div className="flex flex-wrap gap-2 justify-center">
            {brandColors.map(c => (
                <button key={c} onClick={() => { 
                    setBorderColor(c); 
                    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
                    selectedElements.forEach((el: any) => el.addStyle({'border-color': c})); 
                }}
                className={`w-5 h-5 border border-gray-200 transition-all hover:scale-110 active:scale-95 ${borderColor.toLowerCase() === c.toLowerCase() ? 'ring-1 ring-black ring-offset-1 scale-110' : ''}`}
                style={{ backgroundColor: c }} title={c}
                />
            ))}
          </div>

          {/* BOX SHADOW EFFECTS */}
          <div className="space-y-1 pt-4 border-t border-gray-100">
             <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Effects (Shadows)</label>
             <div className="relative">
                <select value={boxShadow} onChange={(e) => handleShadowUpdate(e.target.value)}
                    className="w-full appearance-none bg-[#F5F7FA] border border-gray-200 rounded-lg px-2 py-2 text-[11px] font-medium text-gray-700 outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all cursor-pointer"
                >
                    {shadowPresets.map(s => (
                        <option key={s.name} value={s.value}>{s.name}</option>
                    ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
          </div>

        </div>
      )}
    </div>
  );
};
