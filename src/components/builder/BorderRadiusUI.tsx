import { useEffect, useState } from 'react';
import { Lock, Unlock, ChevronDown, ChevronRight } from 'lucide-react';

export const BorderRadiusUI = ({ editor }: { editor: any }) => {
  const [radii, setRadii] = useState({
    tl: 0, tr: 0, br: 0, bl: 0, unit: 'px', locked: false
  });
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
      
      setRadii(r => ({
        tl: parseFloat(style['border-top-left-radius']) || 0,
        tr: parseFloat(style['border-top-right-radius']) || 0,
        bl: parseFloat(style['border-bottom-left-radius']) || 0,
        br: parseFloat(style['border-bottom-right-radius']) || 0,
        unit: parseUnit(style['border-radius'] || style['border-top-left-radius'], r.unit),
        locked: r.locked
      }));
    };

    editor.on('component:selected', updateStyles);
    editor.on('component:styleUpdate', updateStyles);
    
    return () => {
      editor.off('component:selected', updateStyles);
      editor.off('component:styleUpdate', updateStyles);
    };
  }, [editor, radii.locked]);

  const handleUpdate = (corner: 'tl' | 'tr' | 'bl' | 'br', val: number) => {
    const selected = editor.getSelected();
    if (!selected) return;

    const newStyle: any = {};
    if (radii.locked) {
        newStyle['border-top-left-radius'] = `${val}${radii.unit}`;
        newStyle['border-top-right-radius'] = `${val}${radii.unit}`;
        newStyle['border-bottom-left-radius'] = `${val}${radii.unit}`;
        newStyle['border-bottom-right-radius'] = `${val}${radii.unit}`;
        newStyle['border-radius'] = `${val}${radii.unit}`; // fallback shorthand
        setRadii(r => ({ ...r, tl: val, tr: val, bl: val, br: val }));
    } else {
        const fullMap: any = {
            'tl': 'border-top-left-radius',
            'tr': 'border-top-right-radius',
            'bl': 'border-bottom-left-radius',
            'br': 'border-bottom-right-radius'
        };
        newStyle[fullMap[corner]] = `${val}${radii.unit}`;
        setRadii(r => ({ ...r, [corner]: val }));
    }

    selected.addStyle(newStyle);
  };

  const toggleLock = () => {
      setRadii(r => ({ ...r, locked: !r.locked }));
  };

  const changeUnit = (unit: string) => {
      const selected = editor.getSelected();
      if (!selected) return;

      const newStyle: any = {
        'border-top-left-radius': `${radii.tl}${unit}`,
        'border-top-right-radius': `${radii.tr}${unit}`,
        'border-bottom-left-radius': `${radii.bl}${unit}`,
        'border-bottom-right-radius': `${radii.br}${unit}`
      };

      setRadii(r => ({ ...r, unit }));
      selected.addStyle(newStyle);
  }

  return (
    <div className="gjs-sm-sector border-b border-gray-200">
      {/* Collapsible Header - matching BoxModelUI style */}
      <div
        className="gjs-sm-sector-title flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          {isOpen ? <ChevronDown size={14} className="mr-1 opacity-70" /> : <ChevronRight size={14} className="mr-1 opacity-70" />}
          Border Radius
        </span>
      </div>

      {isOpen && (
        <div className="p-4 bg-white text-xs font-sans text-gray-500 flex flex-col justify-center items-center gap-6 relative">
          
          {/* Unit Selector & Lock - positioned top right like BoxModelUI */}
          <div className="absolute top-2 right-2 flex space-x-1">
            <select
              value={radii.unit}
              onChange={(e) => { e.stopPropagation(); changeUnit(e.target.value); }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-50 border border-gray-200 rounded text-[10px] px-1 focus:outline-none cursor-pointer"
            >
              <option value="px">px</option>
              <option value="%">%</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </select>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleLock(); }}
              className={`p-1 rounded transition-colors ${radii.locked ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
              title={radii.locked ? 'Unlock Corners' : 'Lock All Corners'}
            >
              {radii.locked ? <Lock size={12} strokeWidth={2.5} /> : <Unlock size={12} strokeWidth={2.5} />}
            </button>
          </div>

          {/* Visual Radius Builder */}
          <div className="relative w-48 h-16 mt-6 mb-2 bg-[#e8edff] border border-[#d0d9ff] flex items-center justify-center rounded-2xl">

            {/* Top-Left Corner Input */}
            <div className="absolute -top-3 -left-3 z-10">
                <input type="number" value={radii.tl} onChange={(e) => handleUpdate('tl', Number(e.target.value))}
                    className="w-6 h-6 bg-white text-center text-[9px] font-bold text-gray-700 border border-[#819afc] rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                    title="Top Left" />
            </div>

            {/* Top-Right Corner Input */}
            <div className="absolute -top-3 -right-3 z-10">
                <input type="number" value={radii.tr} onChange={(e) => handleUpdate('tr', Number(e.target.value))}
                    className="w-6 h-6 bg-white text-center text-[9px] font-bold text-gray-700 border border-[#819afc] rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                    title="Top Right" />
            </div>

            {/* Bottom-Left Corner Input */}
            <div className="absolute -bottom-3 -left-3 z-10">
                <input type="number" value={radii.bl} onChange={(e) => handleUpdate('bl', Number(e.target.value))}
                    className="w-6 h-6 bg-white text-center text-[9px] font-bold text-gray-700 border border-[#819afc] rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                    title="Bottom Left" />
            </div>

            {/* Bottom-Right Corner Input */}
            <div className="absolute -bottom-3 -right-3 z-10">
                <input type="number" value={radii.br} onChange={(e) => handleUpdate('br', Number(e.target.value))}
                    className="w-6 h-6 bg-white text-center text-[9px] font-bold text-gray-700 border border-[#819afc] rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                    title="Bottom Right" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
