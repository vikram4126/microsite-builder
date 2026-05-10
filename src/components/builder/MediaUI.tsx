import React, { useEffect, useState, useRef } from 'react';
import { Image, X, Maximize, Move, Repeat, Anchor, Trash2 } from 'lucide-react';

export const MediaUI = ({ editor }: { editor: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Dragging State
  const [position, setPosition] = useState({ x: typeof window !== 'undefined' ? window.innerWidth - 380 : 800, y: 450 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const [mediaState, setMediaState] = useState({
    src: '',
    bgSize: 'cover',
    bgPosition: 'center center',
    bgRepeat: 'no-repeat',
    bgAttachment: 'scroll',
    isImageTag: false
  });

  useEffect(() => {
    const updateUI = () => {
      const selected = editor.getSelected();
      if (!selected) {
        setIsVisible(false);
        return;
      }

      const tagName = (selected.get('tagName') || (selected.getEl && selected.getEl()?.tagName) || '').toLowerCase();
      const isImage = selected.is('image') || tagName === 'img';
      const style = selected.getStyle() || {};
      const hasBgImage = style['background-image'] && style['background-image'] !== 'none';

      // Show panel if it's an image tag OR a section/div (usually sections/divs are for backgrounds)
      // We'll show it for any component that has a background image OR is an <img>
      if (isImage || hasBgImage || selected.get('type') === 'section' || tagName === 'div') {
        setIsVisible(true);
        
        let currentSrc = '';
        if (isImage) {
            currentSrc = selected.get('src') || '';
        } else if (hasBgImage) {
            const match = style['background-image'].match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match) currentSrc = match[1];
        }

        setMediaState({
          src: currentSrc,
          bgSize: style['background-size'] || 'cover',
          bgPosition: style['background-position'] || 'center center',
          bgRepeat: style['background-repeat'] || 'no-repeat',
          bgAttachment: style['background-attachment'] || 'scroll',
          isImageTag: isImage
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

  const updateMedia = (key: string, value: string) => {
    const selected = editor.getSelected();
    if (!selected) return;

    setMediaState(prev => ({ ...prev, [key]: value }));

    if (key === 'src') {
        if (mediaState.isImageTag) {
            selected.set('src', value);
        } else {
            selected.addStyle({ 'background-image': value ? `url('${value}')` : 'none' });
        }
    } else if (key === 'bgSize') {
        selected.addStyle({ 'background-size': value });
    } else if (key === 'bgPosition') {
        selected.addStyle({ 'background-position': value });
    } else if (key === 'bgRepeat') {
        selected.addStyle({ 'background-repeat': value });
    } else if (key === 'bgAttachment') {
        selected.addStyle({ 'background-attachment': value });
    }
  };

  const openAssetManager = () => {
    editor.AssetManager.open({
      select(asset: any, complete: boolean) {
        const src = typeof asset.getSrc === 'function' ? asset.getSrc() : asset.src;
        updateMedia('src', src);
        if (complete) editor.AssetManager.close();
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] font-sans"
      style={{ left: position.x, top: position.y }}
    >
        {/* Header */}
        <div 
          onMouseDown={handleMouseDown}
          className="bg-[#0c233c] text-white p-3 flex items-center justify-between cursor-move select-none active:cursor-grabbing"
        >
            <div className="flex items-center space-x-2">
                <Image size={16} className="text-[#00b8f5]" />
                <span className="font-bold tracking-widest text-[11px] pointer-events-none uppercase">Media & Background</span>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
            >
                <X size={14} />
            </button>
        </div>

        <div className="p-4 space-y-5">
            
            {/* Image Preview / Selector */}
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                   {mediaState.isImageTag ? 'Image Source' : 'Background Image'}
                </label>
                <div 
                    onClick={openAssetManager}
                    className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer group hover:border-[#1e49e2] transition-all relative shadow-inner"
                >
                    {mediaState.src ? (
                        <>
                            <img src={mediaState.src} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">Change Image</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Image size={24} className="text-gray-300 mb-2" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Click to Upload</span>
                        </>
                    )}
                </div>
                {mediaState.src && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); updateMedia('src', ''); }}
                        className="w-full mt-2 flex items-center justify-center space-x-1.5 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    >
                        <Trash2 size={12} />
                        <span>REMOVE IMAGE</span>
                    </button>
                )}
            </div>

            {/* Background Controls (Only if not just an <img> tag) */}
            {!mediaState.isImageTag && (
                <div className="grid grid-cols-2 gap-4">
                    {/* Size */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                            <Maximize size={12} className="mr-1.5" /> Size
                        </label>
                        <select 
                            value={mediaState.bgSize}
                            onChange={(e) => updateMedia('bgSize', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-[#F5F7FA] shadow-sm focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all"
                        >
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                            <option value="auto">Auto</option>
                            <option value="100% 100%">Stretch</option>
                        </select>
                    </div>

                    {/* Position */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                            <Move size={12} className="mr-1.5" /> Position
                        </label>
                        <select 
                            value={mediaState.bgPosition}
                            onChange={(e) => updateMedia('bgPosition', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-[#F5F7FA] shadow-sm focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all"
                        >
                            <option value="center center">Center</option>
                            <option value="left top">Top Left</option>
                            <option value="center top">Top Center</option>
                            <option value="right top">Top Right</option>
                            <option value="left center">Left</option>
                            <option value="right center">Right</option>
                            <option value="center bottom">Bottom</option>
                        </select>
                    </div>

                    {/* Repeat */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                            <Repeat size={12} className="mr-1.5" /> Repeat
                        </label>
                        <select 
                            value={mediaState.bgRepeat}
                            onChange={(e) => updateMedia('bgRepeat', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-[#F5F7FA] shadow-sm focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all"
                        >
                            <option value="no-repeat">No Repeat</option>
                            <option value="repeat">Repeat All</option>
                            <option value="repeat-x">Repeat X</option>
                            <option value="repeat-y">Repeat Y</option>
                        </select>
                    </div>

                    {/* Attachment */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                            <Anchor size={12} className="mr-1.5" /> Mode
                        </label>
                        <select 
                            value={mediaState.bgAttachment}
                            onChange={(e) => updateMedia('bgAttachment', e.target.value)}
                            className="w-full appearance-none outline-none border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-[#F5F7FA] shadow-sm focus:ring-1 focus:ring-blue-500/20 focus:border-[#1E49E2] transition-all"
                        >
                            <option value="scroll">Scroll</option>
                            <option value="fixed">Fixed</option>
                            <option value="local">Local</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Tip */}
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                <p className="text-[9px] text-blue-600 leading-relaxed font-medium">
                    <span className="font-bold">PRO TIP:</span> Use 'Fixed' attachment for a smooth parallax effect on section backgrounds.
                </p>
            </div>

        </div>

    </div>
  );
};
