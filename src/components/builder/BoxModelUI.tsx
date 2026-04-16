import { useEffect, useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronRight, Square, Palette } from 'lucide-react';

export const BoxModelUI = ({ editor }: { editor: any }) => {
  const [margin, setMargin] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  const [borderWidth, setBorderWidth] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: true });
  const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  
  const [borderStyle, setBorderStyle] = useState('none');
  const [borderColor, setBorderColor] = useState('#000000');
  
  const [isOpen, setIsOpen] = useState(true);

  const brandColors = [
    '#00338D', '#1E49E2', '#0C233C', '#00B8F5', '#7213EA', '#FD349C', '#ACEAFF', '#FFFFFF'
  ];

  // Load selected element styles
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
      
      setMargin(m => ({
        top: parseFloat(style['margin-top']) || 0,
        right: parseFloat(style['margin-right']) || 0,
        bottom: parseFloat(style['margin-bottom']) || 0,
        left: parseFloat(style['margin-left']) || 0,
        unit: parseUnit(style['margin-top'], m.unit),
        locked: m.locked
      }));

      setBorderWidth(b => ({
        top: parseFloat(style['border-top-width']) || 0,
        right: parseFloat(style['border-right-width']) || 0,
        bottom: parseFloat(style['border-bottom-width']) || 0,
        left: parseFloat(style['border-left-width']) || 0,
        unit: parseUnit(style['border-top-width'], b.unit),
        locked: b.locked
      }));

      setPadding(p => ({
        top: parseFloat(style['padding-top']) || 0,
        right: parseFloat(style['padding-right']) || 0,
        bottom: parseFloat(style['padding-bottom']) || 0,
        left: parseFloat(style['padding-left']) || 0,
        unit: parseUnit(style['padding-top'], p.unit),
        locked: p.locked
      }));

      setBorderStyle(style['border-style'] || 'none');
      setBorderColor(style['border-color'] || '#000000');
    };

    editor.on('component:selected', updateStyles);
    editor.on('component:styleUpdate', updateStyles);
    return () => {
      editor.off('component:selected', updateStyles);
      editor.off('component:styleUpdate', updateStyles);
    };
  }, [editor]);

  const handleUpdate = (type: 'margin' | 'padding' | 'border', side: 'top' | 'right' | 'bottom' | 'left', val: number) => {
    const selected = editor.getSelected();
    if (!selected) return;

    let currentObj;
    let propPrefix;
    let propSuffix = '';

    if (type === 'margin') {
        currentObj = margin;
        propPrefix = 'margin';
    } else if (type === 'padding') {
        currentObj = padding;
        propPrefix = 'padding';
    } else {
        currentObj = borderWidth;
        propPrefix = 'border';
        propSuffix = '-width';
    }

    const isLocked = currentObj.locked;
    const unit = currentObj.unit;

    const newStyle: any = {};
    if (isLocked) {
        newStyle[`${propPrefix}-top${propSuffix}`] = `${val}${unit}`;
        newStyle[`${propPrefix}-right${propSuffix}`] = `${val}${unit}`;
        newStyle[`${propPrefix}-bottom${propSuffix}`] = `${val}${unit}`;
        newStyle[`${propPrefix}-left${propSuffix}`] = `${val}${unit}`;
        
        if (type === 'border' && borderStyle === 'none' && val > 0) {
            newStyle['border-style'] = 'solid';
            setBorderStyle('solid');
        }
    } else {
        newStyle[`${propPrefix}-${side}${propSuffix}`] = `${val}${unit}`;
        if (type === 'border' && borderStyle === 'none' && val > 0) {
            newStyle['border-style'] = 'solid';
            setBorderStyle('solid');
        }
    }

    selected.addStyle(newStyle);
  };
  
  const toggleLock = (type: 'margin' | 'padding' | 'border') => {
      if(type === 'margin') setMargin(m => ({...m, locked: !m.locked}));
      if(type === 'padding') setPadding(p => ({...p, locked: !p.locked}));
      if(type === 'border') setBorderWidth(b => ({...b, locked: !b.locked}));
  };

  const changeUnit = (type: 'margin' | 'padding' | 'border', newUnit: string) => {
      const selected = editor.getSelected();
      if (!selected) return;

      let currentObj;
      let propPrefix;
      let propSuffix = '';

      if (type === 'margin') {
          currentObj = margin;
          propPrefix = 'margin';
          setMargin(m => ({...m, unit: newUnit}));
      } else if (type === 'padding') {
          currentObj = padding;
          propPrefix = 'padding';
          setPadding(p => ({...p, unit: newUnit}));
      } else {
          currentObj = borderWidth;
          propPrefix = 'border';
          propSuffix = '-width';
          setBorderWidth(b => ({...b, unit: newUnit}));
      }

      const newStyle: any = {};
      newStyle[`${propPrefix}-top${propSuffix}`] = `${currentObj.top}${newUnit}`;
      newStyle[`${propPrefix}-right${propSuffix}`] = `${currentObj.right}${newUnit}`;
      newStyle[`${propPrefix}-bottom${propSuffix}`] = `${currentObj.bottom}${newUnit}`;
      newStyle[`${propPrefix}-left${propSuffix}`] = `${currentObj.left}${newUnit}`;

      selected.addStyle(newStyle);
  }

  const handleStyleUpdate = (style: string) => {
    const selected = editor.getSelected();
    if (!selected) return;
    selected.addStyle({ 'border-style': style });
    setBorderStyle(style);
  };

  const handleColorUpdate = (color: string) => {
    const selected = editor.getSelected();
    if (!selected) return;
    selected.addStyle({ 'border-color': color });
    setBorderColor(color);
  };

  return (
    <div className="gjs-sm-sector border-b border-gray-200">
      <div 
        className="gjs-sm-sector-title flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center uppercase tracking-widest font-bold text-[10px]">
          {isOpen ? <ChevronDown size={14} className="mr-1 opacity-70" /> : <ChevronRight size={14} className="mr-1 opacity-70" />}
          Box Model
        </span>
      </div>

      {isOpen && (
        <div className="p-4 bg-white text-xs font-sans text-gray-500 flex flex-col items-center relative overflow-hidden">
          
          <div className="relative w-full aspect-[4/3] max-w-[280px] border border-gray-300 border-dashed bg-gray-50 flex items-center justify-center py-6 px-10 mt-2">
            {/* Margin Header */}
            <div className="absolute top-1 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] text-gray-400 lowercase font-bold tracking-tight">margin</span>
                <div className="flex items-center space-x-1 bg-white/60 px-1 border border-gray-100 pointer-events-auto">
                    <select value={margin.unit} onChange={(e) => changeUnit('margin', e.target.value)} className="bg-transparent text-[8px] focus:outline-none cursor-pointer">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                    <button onClick={() => toggleLock('margin')} className={`transition-colors cursor-pointer ${margin.locked ? 'text-blue-600' : 'text-gray-300'}`}>
                        {margin.locked ? <Lock size={8} /> : <Unlock size={8} />}
                    </button>
                </div>
            </div>

            {/* Margin Inputs */}
            <input type="number" value={margin.top} onChange={(e) => handleUpdate('margin', 'top', Number(e.target.value))} className="absolute top-2 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded-none text-gray-700 font-bold text-[10px]" />
            <input type="number" value={margin.bottom} onChange={(e) => handleUpdate('margin', 'bottom', Number(e.target.value))} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded-none text-gray-700 font-bold text-[10px]" />
            <input type="number" value={margin.left} onChange={(e) => handleUpdate('margin', 'left', Number(e.target.value))} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded-none text-gray-700 font-bold text-[10px]" />
            <input type="number" value={margin.right} onChange={(e) => handleUpdate('margin', 'right', Number(e.target.value))} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded-none text-gray-700 font-bold text-[10px]" />

            {/* BORDER Layer (Middle) */}
            <div className="relative w-full h-full border border-blue-200 border-solid bg-blue-50/20 flex items-center justify-center p-10 group/border">
                <div className="absolute top-1 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] text-blue-400 lowercase font-bold tracking-tight">border</span>
                    <div className="flex items-center space-x-1 bg-white/80 px-1 border border-blue-50 opacity-0 group-hover/border:opacity-100 transition-opacity pointer-events-auto">
                        <select value={borderWidth.unit} onChange={(e) => changeUnit('border', e.target.value)} className="bg-transparent text-[8px] text-blue-500 focus:outline-none cursor-pointer">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                        <button onClick={() => toggleLock('border')} className={`transition-colors cursor-pointer ${borderWidth.locked ? 'text-blue-600' : 'text-gray-300'}`}>
                            {borderWidth.locked ? <Lock size={8} /> : <Unlock size={8} />}
                        </button>
                    </div>
                </div>

                {/* Border Width Inputs */}
                <input type="number" value={borderWidth.top} onChange={(e) => handleUpdate('border', 'top', Number(e.target.value))} className="absolute top-2 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-blue-50 rounded-none text-blue-600 text-[10px] font-bold" />
                <input type="number" value={borderWidth.bottom} onChange={(e) => handleUpdate('border', 'bottom', Number(e.target.value))} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-blue-50 rounded-none text-blue-600 text-[10px] font-bold" />
                <input type="number" value={borderWidth.left} onChange={(e) => handleUpdate('border', 'left', Number(e.target.value))} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-blue-50 rounded-none text-blue-600 text-[10px] font-bold" />
                <input type="number" value={borderWidth.right} onChange={(e) => handleUpdate('border', 'right', Number(e.target.value))} className="absolute right-1 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-blue-50 rounded-none text-blue-600 text-[10px] font-bold" />

                {/* PADDING Layer (Inner) */}
                <div className="relative w-full h-full border border-indigo-200 border-dashed bg-indigo-50/20 flex items-center justify-center p-10 group/padding">
                    <div className="absolute top-1 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <span className="text-[9px] text-indigo-400 lowercase font-bold tracking-tight">padding</span>
                        <div className="flex items-center space-x-1 bg-white/80 px-1 border border-indigo-50 opacity-0 group-hover/padding:opacity-100 transition-opacity pointer-events-auto">
                            <select value={padding.unit} onChange={(e) => changeUnit('padding', e.target.value)} className="bg-transparent text-[8px] text-indigo-500 focus:outline-none cursor-pointer">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                            <button onClick={() => toggleLock('padding')} className={`transition-colors cursor-pointer ${padding.locked ? 'text-indigo-600' : 'text-gray-300'}`}>
                                {padding.locked ? <Lock size={8} /> : <Unlock size={8} />}
                            </button>
                        </div>
                    </div>

                    {/* Padding Inputs - Positioned relative to the new padding spacing */}
                    <input type="number" value={padding.top} onChange={(e) => handleUpdate('padding', 'top', Number(e.target.value))} className="absolute top-2 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white rounded-none text-indigo-600 text-[10px] font-bold" />
                    <input type="number" value={padding.bottom} onChange={(e) => handleUpdate('padding', 'bottom', Number(e.target.value))} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white rounded-none text-indigo-600 text-[10px] font-bold" />
                    <input type="number" value={padding.left} onChange={(e) => handleUpdate('padding', 'left', Number(e.target.value))} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white rounded-none text-indigo-600 text-[10px] font-bold" />
                    <input type="number" value={padding.right} onChange={(e) => handleUpdate('padding', 'right', Number(e.target.value))} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white rounded-none text-indigo-600 text-[10px] font-bold" />

                    {/* Content Box */}
                    <div className="w-16 h-10 border border-indigo-200 border-solid bg-white flex items-center justify-center shadow-sm">
                        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Content</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Border Details Style & Color */}
          <div className="w-full mt-4 space-y-3 pt-3 border-t border-gray-100">
             <div className="flex gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Style</label>
                  <div className="relative">
                    <select value={borderStyle} onChange={(e) => handleStyleUpdate(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-[11px] font-medium text-gray-700 outline-none focus:ring-1 focus:ring-black transition-all cursor-pointer"
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
                <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Color</label>
                    <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 h-[30px]">
                        <div className="w-3.5 h-3.5 border border-gray-300 shadow-sm shrink-0" style={{ backgroundColor: borderColor }} />
                        <input type="text" value={borderColor} onChange={(e) => handleColorUpdate(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-[9px] uppercase font-mono font-bold text-gray-700"
                        />
                        <div className="relative w-4 h-4 flex items-center justify-center cursor-pointer shrink-0">
                            <Palette size={12} className="text-gray-400 hover:text-black" />
                            <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" value={borderColor} onChange={(e) => handleColorUpdate(e.target.value)} />
                        </div>
                    </div>
                </div>
             </div>
             <div className="flex flex-wrap gap-2 justify-center">
                {brandColors.map(c => (
                    <button key={c} onClick={() => handleColorUpdate(c)}
                    className={`w-5 h-5 border border-gray-200 transition-all hover:scale-110 active:scale-95 ${borderColor.toLowerCase() === c.toLowerCase() ? 'ring-1 ring-black ring-offset-1 scale-110' : ''}`}
                    style={{ backgroundColor: c }} title={c}
                    />
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
