import React, { useEffect, useState, useRef } from 'react';
import { Image, X, Maximize, Move, Repeat, Anchor, Trash2 } from 'lucide-react';

export const MediaUI = ({ editor }: { editor: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [assets, setAssets] = useState<any[]>([]);
  const targetCompRef = useRef<any>(null);

  const [mediaState, setMediaState] = useState({
    src: '',
    bgSize: 'cover',
    bgPosition: 'center center',
    bgRepeat: 'no-repeat',
    bgAttachment: 'scroll',
    bgColor: 'transparent',
    isImageTag: false,
    isVideoTag: false,
    imgWidth: 0,
    imgHeight: 0
  });

  const videoAssets = [
    { src: '/videos/video-1.mp4', label: 'Video 1' },
    { src: '/videos/video-2.mp4', label: 'Video 2' },
    { src: '/videos/video-3.mp4', label: 'Video 3' },
    { src: '/videos/video-4.mp4', label: 'Video 4' },
    { src: '/videos/video-5.mp4', label: 'Video 5' },
    { src: '/videos/video-6.mp4', label: 'Video 6' },
    { src: '/videos/video-7.mp4', label: 'Video 7' },
    { src: '/videos/video-8.mp4', label: 'Video 8' },
    { src: '/videos/video-9.mp4', label: 'Video 9' },
    { src: '/videos/video-10.mp4', label: 'Video 10' }
  ];

  const imageAssets = [
    '/images/finance-1.jpg', '/images/finance-2.jpg', '/images/finance-3.jpg', '/images/finance-4.jpg', '/images/finance-5.jpg',
    '/images/business-1.jpg', '/images/business-2.jpg', '/images/business-3.jpg', '/images/business-4.jpg', '/images/business-5.jpg',
    '/images/audit-1.jpg', '/images/audit-2.jpg', '/images/audit-3.jpg', '/images/audit-4.jpg', '/images/audit-5.jpg',
    '/images/tax-1.jpg', '/images/tax-2.jpg', '/images/tax-3.jpg', '/images/tax-4.jpg', '/images/tax-5.jpg',
    '/images/team-1.jpg', '/images/team-2.jpg', '/images/team-3.jpg', '/images/team-4.jpg', '/images/team-5.jpg',
    '/images/banner-background-1.jpg', '/images/banner-background-2.jpg', '/images/banner-background-3.jpg', '/images/banner-background-4.jpg', '/images/banner-background-5.jpg',
    '/images/image-1.png', '/images/image-2.png', '/images/image-3.png', '/images/image-4.png', '/images/image-5.png', '/images/image-6.jpg',
    '/images/signature-image.png', '/images/signature.png'
  ];

  useEffect(() => {
    const updateUI = () => {
      const selected = editor.getSelected();
      if (!selected) {
        setIsVisible(false);
        setShowGallery(false);
        targetCompRef.current = null;
        return;
      }

      setShowGallery(false);

      let targetComponent = selected;
      const tagName = (selected.get('tagName') || (selected.getEl && selected.getEl()?.tagName) || '').toLowerCase();
      const isImage = (typeof selected.is === 'function' && selected.is('image')) || selected.get('type') === 'image' || tagName === 'img';
      
      let isVideo = (typeof selected.is === 'function' && selected.is('video')) || selected.get('type') === 'video' || selected.get('type') === 'video-bg' || tagName === 'video';

      const style = selected.getStyle() || {};
      const hasBgImage = style['background-image'] && style['background-image'] !== 'none';

      // Advanced UX: Traverse up the component hierarchy to find closest parent container that contains a video child!
      // ONLY if the currently selected item is NOT an image, NOT a video, and DOES NOT already have a background image.
      if (!isVideo && !isImage && !hasBgImage) {
        let current = selected;
        while (current) {
          if (typeof current.find === 'function') {
            const foundVideo = current.find('video')[0];
            // Only hijack if the video cannot be clicked directly (pointer-events-none)
            if (foundVideo && foundVideo.getClasses().includes('pointer-events-none')) {
              isVideo = true;
              targetComponent = foundVideo;
              break;
            }
          }
          
          // STRICT BOUNDARY: Stop traversing if we hit a section container or the root wrapper
          // This prevents finding videos from completely unrelated sections on the page!
          const type = current.get('type');
          const attrs = current.getAttributes?.() || {};
          if (type === 'wrapper' || type === 'section' || current.is?.('wrapper') || attrs['data-gjs-type'] === 'section') {
            break;
          }
          
          current = typeof current.parent === 'function' ? current.parent() : null;
        }
      }

      targetCompRef.current = targetComponent;

      const finalStyle = targetComponent.getStyle() || {};
      const finalHasBgImage = finalStyle['background-image'] && finalStyle['background-image'] !== 'none';

      // Show panel if it's an image tag, a video tag, OR a section/div (usually sections/divs are for backgrounds)
      if (isImage || isVideo || finalHasBgImage || selected.get('type') === 'section' || tagName === 'div') {
        setIsVisible(true);
        
        let currentSrc = '';
        if (isImage || isVideo) {
            currentSrc = targetComponent.get('src') || '';
        } else if (finalHasBgImage) {
            const match = finalStyle['background-image'].match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match) currentSrc = match[1];
        }

        setMediaState({
          src: currentSrc,
          bgSize: finalStyle['background-size'] || 'cover',
          bgPosition: finalStyle['background-position'] || 'center center',
          bgRepeat: finalStyle['background-repeat'] || 'no-repeat',
          bgAttachment: finalStyle['background-attachment'] || 'scroll',
          bgColor: finalStyle['background-color'] || 'transparent',
          isImageTag: isImage,
          isVideoTag: isVideo,
          imgWidth: 0,
          imgHeight: 0
        });

        if (currentSrc && !isVideo) {
            const img = new window.Image();
            img.onload = () => {
                setMediaState(prev => {
                    if (prev.src === currentSrc) {
                        return { ...prev, imgWidth: img.naturalWidth, imgHeight: img.naturalHeight };
                    }
                    return prev;
                });
            };
            img.src = currentSrc;
        }
      } else {
        setIsVisible(false);
      }
    };

    editor.on('component:selected', updateUI);
    editor.on('component:deselected', updateUI);
    editor.on('component:styleUpdate', updateUI);
    
    return () => {
      editor.off('component:selected', updateUI);
      editor.off('component:deselected', updateUI);
      editor.off('component:styleUpdate', updateUI);
    };
  }, [editor]);


  const updateMedia = (key: string, value: string) => {
    const selected = editor.getSelected();
    if (!selected) return;

    const target = targetCompRef.current || selected;
    setMediaState(prev => ({ ...prev, [key]: value }));

    if (key === 'src') {
        if (mediaState.isImageTag || mediaState.isVideoTag) {
            target.set('src', value);
            target.addAttributes({ src: value }); // Force update the DOM attribute
            
            // If it's a video tag, force trigger load & play so it updates in real time inside GrapesJS iframe
            if (mediaState.isVideoTag) {
              setTimeout(() => {
                const el = target.getEl() as HTMLVideoElement;
                if (el) {
                  el.load();
                  el.play().catch(() => {});
                }
              }, 50);
            }
        } else {
            target.addStyle({ 'background-image': value ? `url('${value}')` : 'none' });
        }
    } else if (key === 'bgSize') {
        target.addStyle({ 'background-size': value });
    } else if (key === 'bgPosition') {
        target.addStyle({ 'background-position': value });
    } else if (key === 'bgRepeat') {
        target.addStyle({ 'background-repeat': value });
    } else if (key === 'bgAttachment') {
        target.addStyle({ 'background-attachment': value });
    } else if (key === 'bgColor') {
        target.addStyle({ 'background-color': value });
    }
  };

  const toggleGallery = () => {
    if (!showGallery) {
      if (mediaState.isVideoTag) {
        setAssets(videoAssets);
      } else {
        setAssets(imageAssets);
      }
      setShowGallery(true);
    } else {
      setShowGallery(false);
    }
  };

  const selectAsset = (src: string) => {
    updateMedia('src', src);
    setShowGallery(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mb-4 font-sans">
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-100 shrink-0">
            <span className="text-[10px] font-black text-[#1e49e2] tracking-[0.15em] uppercase flex items-center">
                <Image size={12} className="mr-2 inline-block" />
                Media Settings
            </span>
        </div>

        <div className="p-4 space-y-5">
            
            {/* Background Color (New) - Hide for direct image tags */}
            {!mediaState.isImageTag && (
              <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                     Background Color
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                      {[
                          { value: 'transparent', label: 'None' },
                          { value: '#00338d', label: 'Navy' },
                          { value: '#1e49e2', label: 'Blue' },
                          { value: '#00b894', label: 'Green' },
                          { value: '#fd349c', label: 'Pink' },
                          { value: '#0c233c', label: 'Dark' },
                          { value: '#ffffff', label: 'White' }
                      ].map(c => (
                          <button
                              key={c.value}
                              title={c.label}
                              onClick={() => updateMedia('bgColor', c.value)}
                              className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 shadow-sm ${mediaState.bgColor === c.value ? 'ring-2 ring-offset-1 ring-blue-500 border-white' : 'border-transparent'}`}
                              style={{ 
                                  background: c.value === 'transparent' 
                                      ? 'linear-gradient(to top right, #fff calc(50% - 1px), #ef4444 calc(50% - 1px), #ef4444 calc(50% + 1px), #fff calc(50% + 1px))' 
                                      : c.value 
                              }}
                          />
                      ))}
                      {/* Custom Color Picker */}
                      <div className="relative w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center overflow-hidden hover:bg-gray-50 cursor-pointer shadow-sm">
                          <span className="text-gray-400 text-xs font-bold">+</span>
                          <input 
                              type="color" 
                              value={mediaState.bgColor === 'transparent' ? '#ffffff' : mediaState.bgColor} 
                              onChange={(e) => updateMedia('bgColor', e.target.value)}
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                          />
                      </div>
                  </div>
              </div>
            )}

            {/* Image/Video Preview / Selector */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center">
                       {mediaState.isVideoTag ? 'Video Source' : mediaState.isImageTag ? 'Image Source' : 'Background Image'}
                    </label>
                    <button onClick={toggleGallery} className="text-[9px] font-bold text-[#1e49e2] uppercase tracking-widest hover:underline">
                        {showGallery ? 'Close Gallery' : 'Open Gallery'}
                    </button>
                </div>
                
                {showGallery ? (
                    <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100 max-h-48 overflow-y-auto no-scrollbar shadow-inner">
                        {mediaState.isVideoTag ? (
                          videoAssets.map((video, idx) => (
                              <div 
                                  key={idx} 
                                  onClick={() => selectAsset(video.src)}
                                  className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1e49e2] cursor-pointer transition-all shadow-sm bg-black relative group"
                              >
                                  <video src={video.src} muted playsInline className="w-full h-full object-cover pointer-events-none" />
                                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[8px] font-bold text-white text-center truncate">
                                      {video.label}
                                  </div>
                              </div>
                          ))
                        ) : (
                          assets.map((asset, idx) => {
                            const src = typeof asset === 'string' ? asset : (asset.src || asset.id || '');
                            return (
                              <div 
                                  key={idx} 
                                  onClick={() => selectAsset(src)}
                                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1e49e2] cursor-pointer transition-all shadow-sm bg-white"
                              >
                                  <img src={src} className="w-full h-full object-cover" />
                              </div>
                            );
                          })
                        )}
                    </div>
                ) : (
                    <>
                        <div 
                            onClick={toggleGallery}
                            className="w-full h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer group hover:border-[#1e49e2] transition-all relative shadow-inner"
                        >
                            {mediaState.src ? (
                                <>
                                    {mediaState.isVideoTag ? (
                                        <video src={mediaState.src} muted loop autoPlay playsInline className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={mediaState.src} alt="Preview" className="w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                                            {mediaState.isVideoTag ? 'Change Video' : 'Change Image'}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Image size={24} className="text-gray-300 mb-2" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {mediaState.isVideoTag ? 'Select Video' : 'Click to Upload'}
                                    </span>
                                </>
                            )}
                        </div>
                        {mediaState.src && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); updateMedia('src', ''); }}
                                className="w-full mt-2 flex items-center justify-center space-x-1.5 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            >
                                <Trash2 size={12} />
                                <span>{mediaState.isVideoTag ? 'REMOVE VIDEO' : 'REMOVE IMAGE'}</span>
                            </button>
                        )}
                    </>
                )}

                {/* External URL Input */}
                <div className="pt-2">
                    <label className="text-[9px] font-bold text-gray-400 tracking-widest uppercase flex items-center mb-1.5">
                       {mediaState.isVideoTag ? 'Or Paste Video URL' : 'Or Paste Image URL'}
                    </label>
                    <input 
                        type="text" 
                        placeholder={mediaState.isVideoTag ? "https://example.com/video.mp4" : "https://example.com/image.jpg"}
                        value={mediaState.src}
                        onChange={(e) => updateMedia('src', e.target.value)}
                        className="w-full px-3 py-2 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e49e2] bg-white shadow-sm transition-colors"
                    />
                </div>

                {/* Dimensions and Crop Option */}
                {mediaState.src && !mediaState.isVideoTag && (
                    <div className="pt-4 border-t border-gray-100 mt-2">
                        <div className="flex justify-between items-center mb-2.5 px-1">
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-1.5">
                                <Maximize size={12} /> Original Size
                            </span>
                            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded shadow-sm border border-gray-200">
                                {mediaState.imgWidth ? `${mediaState.imgWidth} x ${mediaState.imgHeight}` : 'Loading...'}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                editor.runCommand('crop-image');
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-[#00338d] hover:bg-[#1e49e2] text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
                            Crop Image
                        </button>
                    </div>
                )}
            </div>

            {/* Background Controls (Only if not just an <img> tag and not a <video> tag) */}
            {!mediaState.isImageTag && !mediaState.isVideoTag && (
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
