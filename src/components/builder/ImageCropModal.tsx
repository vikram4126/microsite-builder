import { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import { X, RotateCcw, RotateCw, ZoomIn, ZoomOut, Check, Crop } from 'lucide-react';

interface ImageCropModalProps {
  src: string;
  onApply: (croppedDataUrl: string) => void;
  onClose: () => void;
}

const ASPECT_RATIOS = [
  { label: 'Free', value: NaN },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:4', value: 3 / 4 },
  { label: '9:16', value: 9 / 16 },
];

// Inject cropperjs styles once
let cropperStyleInjected = false;
function ensureCropperStyles() {
  if (cropperStyleInjected) return;
  cropperStyleInjected = true;
  const s = document.createElement('style');
  s.id = 'cropper-inline-css';
  s.textContent = `.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;user-select:none}.cropper-container img{display:block;height:100%;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-wrap-box,.cropper-canvas,.cropper-drag-box,.cropper-crop-box,.cropper-modal{bottom:0;left:0;position:absolute;right:0;top:0}.cropper-wrap-box,.cropper-canvas{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.33333%;left:0;top:33.33333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.33333%;top:0;width:33.33333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center::before,.cropper-center::after{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center::before{height:1px;left:-3px;top:0;width:7px}.cropper-center::after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}.cropper-invisible{opacity:0}.cropper-bg{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAADklEQVQI12P4z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==")}.cropper-hide{display:block;height:1px;position:absolute;width:1px}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}`;
  document.head.appendChild(s);
}

export function ImageCropModal({ src, onApply, onClose }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [activeRatio, setActiveRatio] = useState<number>(NaN);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ensureCropperStyles();
    if (!imgRef.current) return;

    const image = imgRef.current;

    const initCropper = () => {
      if (cropperRef.current) {
        (cropperRef.current as any).destroy();
      }
      cropperRef.current = new (Cropper as any)(image, {
        aspectRatio: NaN,
        viewMode: 1,
        autoCropArea: 0.85,
        responsive: true,
        background: true,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        ready() {
          setIsLoading(false);
        },
      });
    };

    if (image.complete) {
      initCropper();
    } else {
      image.onload = initCropper;
    }

    return () => {
      cropperRef.current?.destroy();
    };
  }, [src]);

  const setRatio = (ratio: number) => {
    setActiveRatio(ratio);
    (cropperRef.current as any)?.setAspectRatio(ratio);
  };

  const rotate = (deg: number) => (cropperRef.current as any)?.rotate(deg);
  const zoom = (val: number) => (cropperRef.current as any)?.zoom(val);

  const handleApply = () => {
    const canvas = (cropperRef.current as any)?.getCroppedCanvas({
      maxWidth: 4096,
      maxHeight: 4096,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    });
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onApply(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0c233c] rounded-2xl shadow-2xl flex flex-col w-[92vw] max-w-4xl max-h-[92vh] overflow-hidden border border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <Crop size={18} className="text-[#00b8f5]" />
            <span className="font-bold text-sm tracking-wide">Crop Image</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="relative flex-1 min-h-0 bg-[#071728] flex items-center justify-center overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#071728]">
              <div className="w-8 h-8 border-2 border-[#00b8f5] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            ref={imgRef}
            src={src}
            alt="Crop preview"
            style={{ display: 'block', maxWidth: '100%', maxHeight: '55vh' }}
            crossOrigin="anonymous"
          />
        </div>

        {/* Controls */}
        <div className="px-5 py-3 border-t border-white/10 flex flex-col gap-3 bg-[#0c233c]">

          {/* Aspect ratios */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white/50 text-xs font-medium mr-1">Ratio:</span>
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r.label}
                onClick={() => setRatio(r.value)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                  (isNaN(activeRatio) && isNaN(r.value)) || activeRatio === r.value
                    ? 'bg-[#00b8f5] text-white border-[#00b8f5]'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Tools + Actions */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Tool buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => rotate(-90)}
                title="Rotate Left"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => rotate(90)}
                title="Rotate Right"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
              >
                <RotateCw size={14} />
              </button>
              <button
                onClick={() => zoom(0.1)}
                title="Zoom In"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => zoom(-0.1)}
                title="Zoom Out"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 transition-colors"
              >
                <ZoomOut size={14} />
              </button>
            </div>

            {/* Apply / Cancel */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-[#1e49e2] hover:bg-[#00b8f5] text-white transition-all shadow-lg"
              >
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
