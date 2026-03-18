import { useEffect, useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronRight } from 'lucide-react';

export const BoxModelUI = ({ editor }: { editor: any }) => {
  const [margin, setMargin] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0, unit: 'px', locked: false });
  const [isOpen, setIsOpen] = useState(true);

  // Load selected element styles
  useEffect(() => {
    const parseUnit = (val: any, fallback: string) => {
      if (val === undefined || val === null || val === '') return fallback;
      const u = String(val).replace(/[0-9.-]/g, '').trim();
      // If the browser computed 0 to 0px, respect the user's fallback unit
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
    };

    editor.on('component:selected', updateStyles);
    editor.on('component:styleUpdate', updateStyles);
    return () => {
      editor.off('component:selected', updateStyles);
      editor.off('component:styleUpdate', updateStyles);
    };
  }, [editor, margin.locked, padding.locked]);

  const handleUpdate = (type: 'margin' | 'padding', side: 'top' | 'right' | 'bottom' | 'left', val: number) => {
    const selected = editor.getSelected();
    if (!selected) return;

    const currentObj = type === 'margin' ? margin : padding;
    const isLocked = currentObj.locked;
    const unit = currentObj.unit;

    const newStyle: any = {};
    if (isLocked) {
        newStyle[`${type}-top`] = `${val}${unit}`;
        newStyle[`${type}-right`] = `${val}${unit}`;
        newStyle[`${type}-bottom`] = `${val}${unit}`;
        newStyle[`${type}-left`] = `${val}${unit}`;
    } else {
        newStyle[`${type}-${side}`] = `${val}${unit}`;
    }

    selected.addStyle(newStyle);
  };
  
  const toggleLock = (type: 'margin' | 'padding') => {
      if(type === 'margin') setMargin(m => ({...m, locked: !m.locked}));
      if(type === 'padding') setPadding(p => ({...p, locked: !p.locked}));
  };

  const changeUnit = (type: 'margin' | 'padding', unit: string) => {
      const selected = editor.getSelected();
      if (!selected) return;

      const currentObj = type === 'margin' ? margin : padding;
      const newStyle: any = {};
      newStyle[`${type}-top`] = `${currentObj.top}${unit}`;
      newStyle[`${type}-right`] = `${currentObj.right}${unit}`;
      newStyle[`${type}-bottom`] = `${currentObj.bottom}${unit}`;
      newStyle[`${type}-left`] = `${currentObj.left}${unit}`;

      if(type === 'margin') setMargin(m => ({...m, unit}));
      if(type === 'padding') setPadding(p => ({...p, unit}));

      selected.addStyle(newStyle);
  }

  return (
    <div className="gjs-sm-sector border-b border-gray-200">
      <div 
        className="gjs-sm-sector-title flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          {isOpen ? <ChevronDown size={14} className="mr-1 opacity-70" /> : <ChevronRight size={14} className="mr-1 opacity-70" />}
          Margin &amp; Padding
        </span>
      </div>

      {isOpen && (
        <div className="p-4 bg-white text-xs font-sans text-gray-500 flex flex-col justify-center items-center relative">
          <div className="absolute top-2 left-2 font-bold uppercase tracking-wider text-[10px] text-indigo-400">Margin</div>
          
          {/* Margin Locks & Units */}
          <div className="absolute top-2 right-2 flex space-x-1">
              <select value={margin.unit} onChange={(e) => changeUnit('margin', e.target.value)} className="bg-gray-50 border border-gray-200 rounded text-[10px] px-1 focus:outline-none">
                  <option value="px">px</option>
                  <option value="%">%</option>
                  <option value="em">em</option>
                  <option value="rem">rem</option>
              </select>
              <button onClick={() => toggleLock('margin')} className={`p-1 rounded ${margin.locked ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  {margin.locked ? <Lock size={12} /> : <Unlock size={12} />}
              </button>
          </div>

          <div className="relative w-64 h-48 mt-4 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center rounded group">
              
            {/* Margin Inputs */}
            <input type="number" value={margin.top} onChange={(e) => handleUpdate('margin', 'top', Number(e.target.value))} className="absolute top-1 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded text-gray-700" />
            <input type="number" value={margin.bottom} onChange={(e) => handleUpdate('margin', 'bottom', Number(e.target.value))} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded text-gray-700" />
            <input type="number" value={margin.left} onChange={(e) => handleUpdate('margin', 'left', Number(e.target.value))} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded text-gray-700" />
            <input type="number" value={margin.right} onChange={(e) => handleUpdate('margin', 'right', Number(e.target.value))} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-white focus:ring-1 ring-blue-500 rounded text-gray-700" />

            {/* Padding Box */}
            <div className="relative w-40 h-28 border border-solid border-indigo-200 bg-white shadow-sm flex items-center justify-center rounded">
                <div className="absolute -top-4 left-1 font-bold uppercase tracking-wider text-[9px] text-teal-500">Padding</div>
                <div className="absolute top-1 right-1 flex space-x-1">
                    <button onClick={() => toggleLock('padding')} className={`p-0.5 rounded ${padding.locked ? 'text-indigo-600' : 'text-gray-300'}`}>
                        {padding.locked ? <Lock size={10} /> : <Unlock size={10} />}
                    </button>
                </div>
                
                {/* Padding Inputs */}
                <input type="number" value={padding.top} onChange={(e) => handleUpdate('padding', 'top', Number(e.target.value))} className="absolute top-1 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-gray-100 focus:ring-1 ring-blue-500 rounded text-gray-700" />
                <input type="number" value={padding.bottom} onChange={(e) => handleUpdate('padding', 'bottom', Number(e.target.value))} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-gray-100 focus:ring-1 ring-blue-500 rounded text-gray-700" />
                <input type="number" value={padding.left} onChange={(e) => handleUpdate('padding', 'left', Number(e.target.value))} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-gray-100 focus:ring-1 ring-blue-500 rounded text-gray-700" />
                <input type="number" value={padding.right} onChange={(e) => handleUpdate('padding', 'right', Number(e.target.value))} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 bg-transparent text-center focus:outline-none focus:bg-gray-100 focus:ring-1 ring-blue-500 rounded text-gray-700" />

                {/* Center Box */}
                <div className="w-16 h-8 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[9px] font-bold text-gray-400">
                    SIZE
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
