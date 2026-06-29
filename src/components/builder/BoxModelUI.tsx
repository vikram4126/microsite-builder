import { useEffect, useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronRight, Square } from 'lucide-react';

export const BoxModelUI = ({ editor }: { editor: any }) => {
  const [margin, setMargin] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  const [size, setSize] = useState({ width: '', height: '', wUnit: 'px', hUnit: 'px' });
  
  const [isOpen, setIsOpen] = useState(true);

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

      setPadding(p => ({
        top: parseFloat(style['padding-top']) || 0,
        right: parseFloat(style['padding-right']) || 0,
        bottom: parseFloat(style['padding-bottom']) || 0,
        left: parseFloat(style['padding-left']) || 0,
        unit: parseUnit(style['padding-top'], p.unit),
        locked: p.locked
      }));

      setSize(s => ({
        width: style['width'] ? String(parseFloat(style['width'])) : '',
        height: style['height'] ? String(parseFloat(style['height'])) : '',
        wUnit: parseUnit(style['width'], s.wUnit),
        hUnit: parseUnit(style['height'], s.hUnit)
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

  const handleUpdate = (type: 'margin' | 'padding', side: 'top' | 'right' | 'bottom' | 'left', val: number) => {
    const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
    if (!selectedElements.length) return;

    let currentObj = type === 'margin' ? margin : padding;
    const isLocked = currentObj.locked;
    const unit = currentObj.unit;

    const newStyle: any = {};
    if (isLocked) {
        newStyle[`${type}-top`] = `${val}${unit}`;
        newStyle[`${type}-right`] = `${val}${unit}`;
        newStyle[`${type}-bottom`] = `${val}${unit}`;
        newStyle[`${type}-left`] = `${val}${unit}`;
        const newObj = { top: val, right: val, bottom: val, left: val, unit, locked: true };
        if (type === 'margin') setMargin(newObj); else setPadding(newObj);
    } else {
        newStyle[`${type}-${side}`] = `${val}${unit}`;
        if (type === 'margin') setMargin(prev => ({ ...prev, [side]: val }));
        else setPadding(prev => ({ ...prev, [side]: val }));
    }

    selectedElements.forEach((el: any) => el.addStyle(newStyle));
  };
  
  const changeUnit = (type: 'margin' | 'padding', newUnit: string) => {
      const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
      if (!selectedElements.length) return;

      let currentObj = type === 'margin' ? margin : padding;
      const newStyle: any = {
        [`${type}-top`]: `${currentObj.top}${newUnit}`,
        [`${type}-right`]: `${currentObj.right}${newUnit}`,
        [`${type}-bottom`]: `${currentObj.bottom}${newUnit}`,
        [`${type}-left`]: `${currentObj.left}${newUnit}`
      };

      if (type === 'margin') setMargin(m => ({...m, unit: newUnit}));
      else setPadding(p => ({...p, unit: newUnit}));

      selectedElements.forEach((el: any) => el.addStyle(newStyle));
  }

  const handleSizeUpdate = (prop: 'width' | 'height', val: string) => {
      const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
      if (!selectedElements.length) return;

      const unit = prop === 'width' ? size.wUnit : size.hUnit;
      setSize(prev => ({ ...prev, [prop]: val }));
      
      const finalVal = val === '' ? '' : `${val}${unit}`;
      selectedElements.forEach((el: any) => el.addStyle({ [prop]: finalVal }));
  };

  const handleSizeUnitUpdate = (prop: 'wUnit' | 'hUnit', newUnit: string) => {
      const selectedElements = editor.getSelectedAll ? editor.getSelectedAll() : [editor.getSelected()].filter(Boolean);
      if (!selectedElements.length) return;

      setSize(prev => ({ ...prev, [prop]: newUnit }));
      const val = prop === 'wUnit' ? size.width : size.height;
      if (val !== '') {
         const styleProp = prop === 'wUnit' ? 'width' : 'height';
         selectedElements.forEach((el: any) => el.addStyle({ [styleProp]: `${val}${newUnit}` }));
      }
  };

  return (
    <div className={`gjs-sm-sector border-b border-gray-100 ${isOpen ? 'custom-sector-open' : ''}`}>
      <div 
        className="gjs-sm-sector-title flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center tracking-[0.05em] font-bold text-[11px] text-white">
          Size & Spacing
        </span>
      </div>

      {isOpen && (
        <div className="p-4 bg-white text-xs font-sans text-gray-500 flex flex-col items-center relative overflow-hidden">
          
          {/* Size (Width / Height) */}
          <div className="w-full flex items-center justify-between space-x-4 mb-6">
             <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                   <span>Width</span>
                   <select value={size.wUnit} onChange={(e) => handleSizeUnitUpdate('wUnit', e.target.value)} className="bg-transparent text-[9px] text-gray-400 focus:outline-none cursor-pointer">
                      <option value="px">px</option>
                      <option value="%">%</option>
                      <option value="vw">vw</option>
                      <option value="auto">auto</option>
                   </select>
                </label>
                <div className="flex bg-[#F5F7FA] border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                   <input 
                      type="text" 
                      placeholder="auto"
                      value={size.width} 
                      onChange={(e) => handleSizeUpdate('width', e.target.value)} 
                      className="w-full bg-transparent px-3 py-1.5 text-sm text-gray-700 outline-none font-medium"
                   />
                </div>
             </div>
             
             <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                   <span>Height</span>
                   <select value={size.hUnit} onChange={(e) => handleSizeUnitUpdate('hUnit', e.target.value)} className="bg-transparent text-[9px] text-gray-400 focus:outline-none cursor-pointer">
                      <option value="px">px</option>
                      <option value="%">%</option>
                      <option value="vh">vh</option>
                      <option value="auto">auto</option>
                   </select>
                </label>
                <div className="flex bg-[#F5F7FA] border border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                   <input 
                      type="text" 
                      placeholder="auto"
                      value={size.height} 
                      onChange={(e) => handleSizeUpdate('height', e.target.value)} 
                      className="w-full bg-transparent px-3 py-1.5 text-sm text-gray-700 outline-none font-medium"
                   />
                </div>
             </div>
          </div>

          {/* 2-Layer Box Model: Margin (Outer) -> Padding (Inner) */}
          <div className="relative w-full aspect-video max-w-[300px] border border-gray-300 border-dashed bg-gray-50 flex items-center justify-center p-12 mt-2 group/margin">
            {/* Margin Label & Controls */}
            <div className="absolute top-1.5 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] text-gray-400 lowercase font-bold tracking-tight">margin</span>
                <div className="flex items-center space-x-1 bg-white/60 px-1 border border-gray-100 pointer-events-auto">
                    <select value={margin.unit} onChange={(e) => changeUnit('margin', e.target.value)} className="bg-transparent text-[8px] focus:outline-none cursor-pointer">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                    <button onClick={() => setMargin(m => ({...m, locked: !m.locked}))} className={`transition-colors cursor-pointer ${margin.locked ? 'text-blue-600' : 'text-gray-300'}`}>
                        {margin.locked ? <Lock size={8} /> : <Unlock size={8} />}
                    </button>
                </div>
            </div>

            {/* PADDING Layer (Inner) */}
            <div className="relative w-full h-full border border-indigo-200 border-dashed bg-indigo-50/20 flex items-center justify-center p-12 group/padding pointer-events-none">
                <div className="absolute top-1.5 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] text-indigo-400 lowercase font-bold tracking-tight">padding</span>
                    <div className="flex items-center space-x-1 bg-white/80 px-1 border border-indigo-50 opacity-0 group-hover/padding:opacity-100 transition-opacity pointer-events-auto">
                        <select value={padding.unit} onChange={(e) => changeUnit('padding', e.target.value)} className="bg-transparent text-[8px] text-indigo-500 focus:outline-none cursor-pointer">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                        <button onClick={() => setPadding(p => ({...p, locked: !p.locked}))} className={`transition-colors cursor-pointer ${padding.locked ? 'text-indigo-600' : 'text-gray-300'}`}>
                            {padding.locked ? <Lock size={8} /> : <Unlock size={8} />}
                        </button>
                    </div>
                </div>

                {/* Content Box */}
                <div className="w-20 h-10 border border-indigo-200 border-solid bg-white flex items-center justify-center shadow-sm pointer-events-none">
                    <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Content</span>
                </div>

                {/* Padding Inputs - Positioned in the middle of the inner gap */}
                <input type="number" value={padding.top} onChange={(e) => handleUpdate('padding', 'top', Number(e.target.value))} className="absolute top-3 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 text-[10px] font-bold pointer-events-auto z-10 transition-all" />
                <input type="number" value={padding.bottom} onChange={(e) => handleUpdate('padding', 'bottom', Number(e.target.value))} className="absolute bottom-3 left-1/2 -translate-x-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 text-[10px] font-bold pointer-events-auto z-10 transition-all" />
                <input type="number" value={padding.left} onChange={(e) => handleUpdate('padding', 'left', Number(e.target.value))} className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 text-[10px] font-bold pointer-events-auto z-10 transition-all" />
                <input type="number" value={padding.right} onChange={(e) => handleUpdate('padding', 'right', Number(e.target.value))} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded text-indigo-600 text-[10px] font-bold pointer-events-auto z-10 transition-all" />
            </div>

            {/* Margin Inputs - Moved to last position and given z-10 for clickability */}
            <input type="number" value={margin.top} onChange={(e) => handleUpdate('margin', 'top', Number(e.target.value))} className="absolute top-3 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded font-bold text-[10px] z-10 transition-all" />
            <input type="number" value={margin.bottom} onChange={(e) => handleUpdate('margin', 'bottom', Number(e.target.value))} className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded font-bold text-[10px] z-10 transition-all" />
            <input type="number" value={margin.left} onChange={(e) => handleUpdate('margin', 'left', Number(e.target.value))} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded font-bold text-[10px] z-10 transition-all" />
            <input type="number" value={margin.right} onChange={(e) => handleUpdate('margin', 'right', Number(e.target.value))} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500/20 rounded font-bold text-[10px] z-10 transition-all" />
          </div>
        </div>
      )}
    </div>
  );
};
