import { useEffect, useRef, useState, useCallback } from 'react';
import { X, RotateCcw, RotateCw, ZoomIn, ZoomOut, Check, Crop, Move } from 'lucide-react';

interface ImageCropModalProps {
  src: string;
  component?: any;
  onApply: (croppedDataUrl: string) => void;
  onClose: () => void;
}

const ASPECT_RATIOS = [
  { label: 'Free',  value: -1 },
  { label: '1:1',   value: 1 },
  { label: '4:3',   value: 4 / 3 },
  { label: '16:9',  value: 16 / 9 },
  { label: '3:4',   value: 3 / 4 },
  { label: '9:16',  value: 9 / 16 },
];

interface CropBox { x: number; y: number; w: number; h: number }

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function ImageCropModal({ src, onApply, onClose }: ImageCropModalProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imgRef      = useRef<HTMLImageElement | null>(null);
  const isDragging  = useRef<false | 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'>(false);
  const dragStart   = useRef({ mx: 0, my: 0, box: { x: 0, y: 0, w: 0, h: 0 } });

  const [activeRatio, setActiveRatio]   = useState<number>(-1);
  const [cropBox, setCropBox]           = useState<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const [scale, setScale]               = useState(1);
  const [imgLoaded, setImgLoaded]       = useState(false);
  const [imgDims, setImgDims]           = useState<{ w: number; h: number } | null>(null);
  const [rotation, setRotation]         = useState(0);

  // canvas layout state
  const layoutRef = useRef({ offX: 0, offY: 0, dispW: 0, dispH: 0 });

  // ── Load image ────────────────────────────────────────────────────────────
  useEffect(() => {
    setImgLoaded(false);
    setImgDims(null);

    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      setImgDims({ w: img.naturalWidth, h: img.naturalHeight });
      setImgLoaded(true);
      setScale(1);
      setRotation(0);
    };
    img.onerror = () => {
      // Try without crossOrigin
      const img2 = new window.Image();
      img2.onload = () => {
        imgRef.current = img2;
        setImgDims({ w: img2.naturalWidth, h: img2.naturalHeight });
        setImgLoaded(true);
        setScale(1);
        setRotation(0);
      };
      img2.src = src;
    };
    img.crossOrigin = 'anonymous';
    img.src = src;
  }, [src]);

  // ── Draw on canvas whenever state changes ─────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d')!;
    const CW = canvas.width;
    const CH = canvas.height;
    ctx.clearRect(0, 0, CW, CH);

    // Fit image in canvas with scale
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    const fitScale = Math.min(CW / naturalW, CH / naturalH) * scale;
    const dispW = naturalW * fitScale;
    const dispH = naturalH * fitScale;
    const offX = (CW - dispW) / 2;
    const offY = (CH - dispH) / 2;

    layoutRef.current = { offX, offY, dispW, dispH };

    // Draw image
    ctx.save();
    ctx.translate(offX + dispW / 2, offY + dispH / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, -dispW / 2, -dispH / 2, dispW, dispH);
    ctx.restore();

    // Dark overlay outside crop
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    const cb = cropBox;
    // top
    ctx.fillRect(0, 0, CW, cb.y);
    // bottom
    ctx.fillRect(0, cb.y + cb.h, CW, CH - cb.y - cb.h);
    // left
    ctx.fillRect(0, cb.y, cb.x, cb.h);
    // right
    ctx.fillRect(cb.x + cb.w, cb.y, CW - cb.x - cb.w, cb.h);

    // Crop border
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cb.x, cb.y, cb.w, cb.h);

    // Grid lines (rule of thirds)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.75;
    for (let i = 1; i <= 2; i++) {
      const gx = cb.x + (cb.w * i) / 3;
      const gy = cb.y + (cb.h * i) / 3;
      ctx.beginPath(); ctx.moveTo(gx, cb.y); ctx.lineTo(gx, cb.y + cb.h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cb.x, gy); ctx.lineTo(cb.x + cb.w, gy); ctx.stroke();
    }

    // Corner handles
    const hs = 8;
    ctx.fillStyle = '#fff';
    [[cb.x, cb.y], [cb.x + cb.w, cb.y], [cb.x, cb.y + cb.h], [cb.x + cb.w, cb.y + cb.h]].forEach(([hx, hy]) => {
      ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
    });
  }, [cropBox, scale, rotation]);

  // Reset crop box when image loads or ratio changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img || !imgLoaded) return;

    const CW = canvas.width;
    const CH = canvas.height;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    const fitScale = Math.min(CW / naturalW, CH / naturalH);
    const dispW = naturalW * fitScale;
    const dispH = naturalH * fitScale;
    const offX = (CW - dispW) / 2;
    const offY = (CH - dispH) / 2;

    let cw = dispW;
    let ch = dispH;
    if (activeRatio !== -1) {
      if (cw / ch > activeRatio) { cw = ch * activeRatio; }
      else { ch = cw / activeRatio; }
    }
    const cx = offX + (dispW - cw) / 2;
    const cy = offY + (dispH - ch) / 2;
    setCropBox({ x: cx, y: cy, w: cw, h: ch });
    layoutRef.current = { offX, offY, dispW, dispH };
  }, [imgLoaded, activeRatio, scale]);

  // Redraw on changes
  useEffect(() => { draw(); }, [draw]);

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const resize = () => {
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [draw]);

  // ── Mouse interaction ─────────────────────────────────────────────────────
  const getHandle = (mx: number, my: number, cb: CropBox): typeof isDragging.current => {
    const t = 12;
    const midX = cb.x + cb.w / 2;
    const midY = cb.y + cb.h / 2;
    if (Math.abs(mx - cb.x) < t && Math.abs(my - cb.y) < t) return 'nw';
    if (Math.abs(mx - cb.x - cb.w) < t && Math.abs(my - cb.y) < t) return 'ne';
    if (Math.abs(mx - cb.x) < t && Math.abs(my - cb.y - cb.h) < t) return 'sw';
    if (Math.abs(mx - cb.x - cb.w) < t && Math.abs(my - cb.y - cb.h) < t) return 'se';
    if (Math.abs(mx - midX) < t && Math.abs(my - cb.y) < t) return 'n';
    if (Math.abs(mx - midX) < t && Math.abs(my - cb.y - cb.h) < t) return 's';
    if (Math.abs(mx - cb.x) < t && Math.abs(my - midY) < t) return 'w';
    if (Math.abs(mx - cb.x - cb.w) < t && Math.abs(my - midY) < t) return 'e';
    if (mx > cb.x && mx < cb.x + cb.w && my > cb.y && my < cb.y + cb.h) return 'move';
    return false;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const handle = getHandle(mx, my, cropBox);
    isDragging.current = handle;
    dragStart.current = { mx, my, box: { ...cropBox } };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const handle = isDragging.current;
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Update cursor
    const hov = getHandle(mx, my, cropBox);
    const cursors: Record<string, string> = { nw: 'nw-resize', ne: 'ne-resize', sw: 'sw-resize', se: 'se-resize', n: 'n-resize', s: 's-resize', e: 'e-resize', w: 'w-resize', move: 'move' };
    canvas.style.cursor = hov ? cursors[hov as string] || 'default' : 'default';

    if (!handle) return;
    const dx = mx - dragStart.current.mx;
    const dy = my - dragStart.current.my;
    const ob = dragStart.current.box;
    const { offX, offY, dispW, dispH } = layoutRef.current;
    const MIN = 30;

    let { x, y, w, h } = ob;

    if (handle === 'move') {
      x = clamp(ob.x + dx, offX, offX + dispW - ob.w);
      y = clamp(ob.y + dy, offY, offY + dispH - ob.h);
    } else {
      // Resize handles
      if (handle === 'se' || handle === 'e') { w = clamp(ob.w + dx, MIN, offX + dispW - ob.x); }
      if (handle === 'sw' || handle === 'w') { const nw = clamp(ob.w - dx, MIN, ob.x + ob.w - offX); x = ob.x + ob.w - nw; w = nw; }
      if (handle === 'se' || handle === 's') { h = clamp(ob.h + dy, MIN, offY + dispH - ob.y); }
      if (handle === 'ne' || handle === 'n') { const nh = clamp(ob.h - dy, MIN, ob.y + ob.h - offY); y = ob.y + ob.h - nh; h = nh; }
      if (handle === 'sw' || handle === 's') { h = clamp(ob.h + dy, MIN, offY + dispH - ob.y); }
      if (handle === 'nw') {
        const nw = clamp(ob.w - dx, MIN, ob.x + ob.w - offX); x = ob.x + ob.w - nw; w = nw;
        const nh = clamp(ob.h - dy, MIN, ob.y + ob.h - offY); y = ob.y + ob.h - nh; h = nh;
      }

      // Enforce aspect ratio
      if (activeRatio !== -1) {
        if (['e', 'w', 'se', 'sw', 'ne', 'nw'].includes(handle as string)) {
          h = w / activeRatio;
        } else {
          w = h * activeRatio;
        }
      }
    }

    setCropBox({ x, y, w, h });
  };

  const onMouseUp = () => { isDragging.current = false; };

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleRotate = (deg: number) => setRotation(r => r + deg);

  const handleZoom = (delta: number) =>
    setScale(s => clamp(s + delta, 0.2, 5));

  const changeRatio = (val: number) => {
    setActiveRatio(val);
  };

  const handleApply = () => {
    const img = imgRef.current;
    if (!img || !canvasRef.current) return;
    const { offX, offY, dispW, dispH } = layoutRef.current;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    const scaleX = natW / dispW;
    const scaleY = natH / dispH;

    const srcX = (cropBox.x - offX) * scaleX;
    const srcY = (cropBox.y - offY) * scaleY;
    const srcW = cropBox.w * scaleX;
    const srcH = cropBox.h * scaleY;

    const out = document.createElement('canvas');
    out.width  = Math.round(srcW);
    out.height = Math.round(srcH);
    const ctx = out.getContext('2d')!;
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, out.width, out.height);
    onApply(out.toDataURL('image/jpeg', 0.92));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
        style={{ width: 'min(95vw, 1200px)', height: 'min(92vh, 900px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <Crop size={17} className="text-[#1e49e2]" />
            <span className="font-black text-sm tracking-[0.1em] uppercase text-gray-800">Crop Image</span>
            {imgDims && (
              <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">
                {imgDims.w} × {imgDims.h}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Canvas area */}
        <div className="relative flex-1 overflow-hidden bg-[#2b2b2b]" style={{ minHeight: 0 }}>
          {!imgLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
              <div className="w-10 h-10 border-[3px] border-[#1e49e2] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Loading…</span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
        </div>

        {/* Controls */}
        <div className="shrink-0 px-5 py-3 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Ratio pills */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mr-1">Ratio:</span>
                {ASPECT_RATIOS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => changeRatio(r.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      activeRatio === r.value
                        ? 'bg-[#1e49e2] text-white border-[#1e49e2] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-gray-200" />

              {/* Transform */}
              <div className="flex items-center gap-1.5">
                {[
                  { icon: <RotateCcw size={15} />, action: () => handleRotate(-90), title: 'Rotate Left' },
                  { icon: <RotateCw  size={15} />, action: () => handleRotate(90),  title: 'Rotate Right' },
                  { icon: <ZoomIn    size={15} />, action: () => handleZoom(0.15),  title: 'Zoom In' },
                  { icon: <ZoomOut   size={15} />, action: () => handleZoom(-0.15), title: 'Zoom Out' },
                ].map((btn) => (
                  <button
                    key={btn.title}
                    onClick={btn.action}
                    title={btn.title}
                    className="w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 transition-all uppercase tracking-wider">
                Cancel
              </button>
              <button onClick={handleApply} disabled={!imgLoaded} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1e49e2] hover:bg-[#00338d] disabled:opacity-50 text-white transition-all shadow-md uppercase tracking-wider active:scale-95">
                <Check size={15} />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
