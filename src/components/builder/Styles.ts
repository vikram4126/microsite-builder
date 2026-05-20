export const registerStyles = (editor: any) => {
  const sm = editor.StyleManager;
  sm.getSectors().reset(); // Eradicate default margin/padding from GrapesJS core

  const brandColors = [
    { value: 'transparent', label: 'Transparent' },
    { value: '#00338d', label: 'Navy' },
    { value: '#1e49e2', label: 'Blue' },
    { value: '#00b894', label: 'Green' },
    { value: '#fd349c', label: 'Pink' },
    { value: '#0c233c', label: 'Dark' },
    { value: '#e5e5e5', label: 'Light Gray' },
    { value: '#000000', label: 'Black' },
    { value: '#ffffff', label: 'White' }
  ];

  const applyTextContrast = () => {
      const model = editor.getSelected();
      if (!model) return;
      
      setTimeout(() => {
          const style = model.getStyle();
          if (!style) return;
          
          const bgColor = (style['background-color'] || style['backgroundColor'] || '').toLowerCase().replace(/\s+/g, '');
          const bgImg   = (style['background-image'] || style['backgroundImage'] || '').toLowerCase().replace(/\s+/g, '');
          const bg      = (style['background'] || '').toLowerCase().replace(/\s+/g, '');
          
          if (!bgColor && !bgImg && !bg) return;
          
          const darkValues = [
            '#00338d', 'rgb(0,51,141)', 'rgba(0,51,141,1)',
            '#1e49e2', 'rgb(30,73,226)', 'rgba(30,73,226,1)',
            '#0c233c', 'rgb(12,35,60)', 'rgba(12,35,60,1)',
            '#00b894', 'rgb(0,184,148)', 'rgba(0,184,148,1)',
            '#fd349c', 'rgb(253,52,156)', 'rgba(253,52,156,1)',
            '#000000', 'rgb(0,0,0)', 'rgba(0,0,0,1)'
          ];
          const lightValues = [
            '#ffffff', 'rgb(255,255,255)', 'rgba(255,255,255,1)',
            '#f8fafc', 'rgb(248,250,252)', 'rgba(248,250,252,1)',
            'transparent', 'none', 'inherit', 'initial',
            '#e5e5e5', 'rgb(229,229,229)', 'rgba(229,229,229,1)'
          ];
          
          let targetColor: string | null = null;
          
          const hasDarkColor = darkValues.some(dv => bgColor === dv || bgColor.includes(dv));
          const hasDarkGradient = darkValues.some(dv => bg.includes(dv) || bgImg.includes(dv));
          const hasBgImage = bgImg.includes('url(') || bg.includes('url(');

          if (hasDarkColor || hasDarkGradient || hasBgImage) {
            targetColor = '#ffffff';
          } else if (lightValues.some(lv => bgColor === lv || bgColor.includes(lv)) && !hasBgImage && !hasDarkGradient) {
            targetColor = '#0c233c'; // Revert to standard dark if returning to light background
          }

          if (targetColor) {
            const applyColor = (comp: any) => {
              const currentStyle = (typeof comp.getStyle === 'function') ? comp.getStyle() : {};
              
              let hasOwnBg = false;
              if (comp !== model) {
                  const compBg = currentStyle['background-color'];
                  const compBgImg = currentStyle['background-image'];
                  const compBgGrad = currentStyle['background'];
                  
                  if ((compBg && compBg !== 'transparent' && compBg !== 'none' && compBg !== 'inherit' && compBg !== '') || 
                      (compBgImg && compBgImg !== 'none' && compBgImg !== '') ||
                      (compBgGrad && compBgGrad !== 'none' && compBgGrad !== '')) {
                      hasOwnBg = true;
                  }
                  
                  if (!hasOwnBg && typeof comp.getClasses === 'function') {
                      const classes = comp.getClasses();
                      hasOwnBg = classes.some((c: string) => {
                          if (c === 'bg-transparent' || c === 'bg-inherit' || c === 'bg-current') return false;
                          if (c === 'bg-white' || c === 'bg-black' || c === 'bg-primary' || c === 'bg-secondary' || c === 'bg-accent') return true;
                          if (c.match(/^bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+$/)) return true;
                          return false;
                      });
                  }
              }

              // Strict boundary: Do not push parent text color overrides into children that have their own defined backgrounds
              if (hasOwnBg) return;
              
              if (currentStyle.color !== targetColor) {
                 comp.addStyle({ color: targetColor });
              }
              
              if (typeof comp.getClasses === 'function') {
                  const classes = comp.getClasses();
                  const toRemove = classes.filter((c: string) => 
                     !!c.match(/^text-(gray|slate|black|white|blue|red|green|amber|yellow|indigo|purple|pink|rose|emerald)-\d+$/) ||
                     c === 'text-black' || c === 'text-white'
                  );
                  if (toRemove.length > 0) comp.removeClass(toRemove);
              }

              if (typeof comp.get === 'function' && typeof comp.set === 'function') {
                  if (comp.is('text') || comp.get('type') === 'text' || comp.get('type') === 'textnode') {
                     let content = comp.get('content');
                     if (content && typeof content === 'string') {
                        const regex = /text-(gray|slate|black|white|blue|red|green|amber|yellow|indigo|purple|pink|rose|emerald)-\d+/g;
                        const newContent = content.replace(regex, '').replace(/text-(black|white)/g, '');
                        if (content !== newContent) comp.set('content', newContent);
                     }
                  }
              }

              const children = (typeof comp.components === 'function') ? comp.components().models || [] : [];
              children.forEach((c: any) => applyColor(c));
            };
            
            applyColor(model);
          }
      }, 50);
  };

  // Register Custom Property Type for Brand Colors
  sm.addType('brand-color-picker', {
    create({ property }: any) {
      const el = document.createElement('div');
      el.className = 'flex items-center flex-wrap gap-1.5 pt-2 pb-2 w-full';

      const updateActiveState = (val: string) => {
        const btns = el.querySelectorAll('button');
        btns.forEach((btn: any) => {
          const colorVal = btn.getAttribute('data-color');
          if (colorVal?.toLowerCase() === val?.toLowerCase()) {
             btn.className = 'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 shadow-sm ring-2 ring-offset-1 ring-[#1e49e2] border-white/40';
          } else {
             btn.className = 'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 shadow-sm border-transparent';
          }
        });
      };

      // Generate swatches
      brandColors.forEach(c => {
        const btn = document.createElement('button');
        btn.title = c.label;
        btn.setAttribute('data-color', c.value);
        
        if (c.value === 'transparent') {
           btn.style.background = 'linear-gradient(to top right, #f8fafc calc(50% - 1px), #ef4444 calc(50% - 1px), #ef4444 calc(50% + 1px), #f8fafc calc(50% + 1px))';
        } else {
           btn.style.backgroundColor = c.value;
        }

        btn.onclick = () => {
          property.upValue(c.value);
          updateActiveState(c.value);
          
          const model = editor.getSelected();
          if (model && typeof model.getClasses === 'function') {
             const classes = model.getClasses();
             const toRemove = classes.filter((cls: string) => cls.startsWith('bg-') || cls.startsWith('dark:bg-'));
             if (toRemove.length > 0) model.removeClass(toRemove);
          }
          
          applyTextContrast();
        };
        el.appendChild(btn);
      });

      // Custom generic + popup color picker
      const customWrapper = document.createElement('div');
      customWrapper.className = 'relative w-6 h-6 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden hover:bg-gray-100 cursor-pointer ml-1 shadow-sm';
      customWrapper.innerHTML = '<span class="text-gray-400 text-sm font-bold leading-none mb-0.5 pointer-events-none">+</span>';
      
      const customInput = document.createElement('input');
      customInput.type = 'color';
      customInput.className = 'absolute inset-0 opacity-0 cursor-pointer';
      customInput.oninput = (e: any) => {
        property.upValue(e.target.value);
        updateActiveState(e.target.value);
        
        const model = editor.getSelected();
        if (model && typeof model.getClasses === 'function') {
           const classes = model.getClasses();
           const toRemove = classes.filter((cls: string) => cls.startsWith('bg-') || cls.startsWith('dark:bg-'));
           if (toRemove.length > 0) model.removeClass(toRemove);
        }
        
        applyTextContrast();
      };
      
      customWrapper.appendChild(customInput);
      el.appendChild(customWrapper);

      // Initial active state rendering
      setTimeout(() => updateActiveState(property.getValue() || 'transparent'), 50);

      return el;
    },
    update({ property, el }: any) {
      // Re-trigger visual highlight changes when GrapesJS selection changes underneath
      const val = property.getValue() || 'transparent';
      const btns = el.querySelectorAll('button');
      btns.forEach((btn: any) => {
          const colorVal = btn.getAttribute('data-color');
          if (colorVal?.toLowerCase() === val?.toLowerCase()) {
             btn.className = 'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 shadow-sm ring-2 ring-offset-1 ring-[#1e49e2] border-white/40';
          } else {
             btn.className = 'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 shadow-sm border-transparent';
          }
      });
    }
  });

  editor.StyleManager.addType('brand-gradient', {
    create({ property }: any) {
      const w = document.createElement('div');
      w.className = 'w-full flex w-full flex-col gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm';
      
      const presetLabel = document.createElement('div');
      presetLabel.className = 'text-xs font-bold text-gray-700 mb-1';
      presetLabel.innerText = 'Brand Preset Gradients';
      w.appendChild(presetLabel);
      
      const presetSelect = document.createElement('select');
      presetSelect.className = 'w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none';
      const presets = [
         { label: 'None', val: 'none' },
         { label: 'Primary & Accent', val: 'linear-gradient(135deg, #00338d, #1e49e2)' },
         { label: 'Accent & Dark', val: 'linear-gradient(to right, #1e49e2, #0c233c)' },
         { label: 'Vibrant Mix', val: 'linear-gradient(45deg, #00b8f5, #7213ea)' },
         { label: 'Soft Light', val: 'linear-gradient(to bottom, #ffffff, #e2e8f0)' }
      ];
      presets.forEach(p => {
         const opt = document.createElement('option');
         opt.value = p.val;
         opt.innerText = p.label;
         presetSelect.appendChild(opt);
      });
      presetSelect.onchange = (e: any) => {
         if (e.target.value !== 'none') {
             property.upValue(e.target.value);
         } else {
             property.upValue('');
         }
         
         const model = editor.getSelected();
         if (model && typeof model.getClasses === 'function') {
            const classes = model.getClasses();
            const toRemove = classes.filter((cls: string) => cls.startsWith('bg-') || cls.startsWith('dark:bg-'));
            if (toRemove.length > 0) model.removeClass(toRemove);
         }
         
         applyTextContrast();
      };
      w.appendChild(presetSelect);
      
      const customLabel = document.createElement('div');
      customLabel.className = 'text-xs font-bold text-gray-700 mt-2 border-t pt-3';
      customLabel.innerText = 'Or Build Custom Gradient';
      w.appendChild(customLabel);
      
      const colors = [
        { v: '#00338d', hex: '#00338d' },
        { v: '#1e49e2', hex: '#1e49e2' },
        { v: '#0c233c', hex: '#0c233c' },
        { v: '#00b8f5', hex: '#00b8f5' },
        { v: '#7213ea', hex: '#7213ea' },
        { v: '#fd349c', hex: '#fd349c' },
        { v: '#ffffff', hex: '#ffffff' },
        { v: 'transparent', hex: '#e2e8f0', label: 'X' }
      ];
      
      const createSwatchRow = (label: string, defIndex: number) => {
          const row = document.createElement('div');
          row.className = 'flex flex-col gap-1 mb-2';
          const rL = document.createElement('span');
          rL.className = 'text-[10px] text-gray-500 uppercase font-bold';
          rL.innerText = label;
          row.appendChild(rL);
          
          const sContainer = document.createElement('div');
          sContainer.className = 'flex flex-wrap gap-1.5';
          
          let activeBtn: any = null;
          let selectedVal = colors[defIndex].v;
          
          colors.forEach((c, idx) => {
             const btn = document.createElement('button');
             btn.className = 'w-5 h-5 rounded-full border border-gray-300 shadow-sm transition hover:scale-110 text-[8px] flex items-center justify-center font-bold text-gray-600';
             btn.style.backgroundColor = c.hex;
             if (c.label) btn.innerText = c.label;
             if (idx === defIndex) {
                 btn.classList.add('ring-2', 'ring-offset-1', 'ring-blue-500');
                 activeBtn = btn;
             }
             btn.onclick = () => {
                if(activeBtn) activeBtn.classList.remove('ring-2', 'ring-offset-1', 'ring-blue-500');
                btn.classList.add('ring-2', 'ring-offset-1', 'ring-blue-500');
                activeBtn = btn;
                selectedVal = c.v;
             };
             sContainer.appendChild(btn);
          });
          
          row.appendChild(sContainer);
          return { row, getVal: () => selectedVal };
      };
      
      const c1 = createSwatchRow('Color 1', 0);
      const c2 = createSwatchRow('Color 2', 1);
      
      w.appendChild(c1.row);
      w.appendChild(c2.row);
      
      const angleRow = document.createElement('div');
      angleRow.className = 'flex gap-2 items-center mt-2 justify-between';
      const angleL = document.createElement('span');
      angleL.className = 'text-[10px] text-gray-500 uppercase font-bold';
      angleL.innerText = 'ANGLE Direction';
      const angleInp = document.createElement('select');
      angleInp.className = 'text-xs p-1.5 border rounded flex-1 ml-2 outline-none';
      ['to right', 'to bottom', 'to bottom right', 'to top right', '135deg', '45deg', '180deg'].forEach(a => {
         const o = document.createElement('option');
         o.value = a; o.innerText = a;
         angleInp.appendChild(o);
      });
      angleRow.appendChild(angleL);
      angleRow.appendChild(angleInp);
      w.appendChild(angleRow);
      
      const applyBtn = document.createElement('button');
      applyBtn.className = 'w-full mt-3 bg-blue-600 text-white text-xs py-2 rounded font-bold hover:bg-blue-700 transition shadow-sm';
      applyBtn.innerText = 'Apply Custom Mix';
      applyBtn.onclick = () => {
         const v = `linear-gradient(${angleInp.value}, ${c1.getVal()}, ${c2.getVal()})`;
         property.upValue(v);
         presetSelect.value = 'none'; // reset
         
         const model = editor.getSelected();
         if (model && typeof model.getClasses === 'function') {
            const classes = model.getClasses();
            const toRemove = classes.filter((cls: string) => cls.startsWith('bg-') || cls.startsWith('dark:bg-'));
            if (toRemove.length > 0) model.removeClass(toRemove);
         }
         
         applyTextContrast();
      };
      
      w.appendChild(applyBtn);
      
      return w;
    },
    update() {
    }
  });

  editor.StyleManager.addType('bg-image-file', {
    create({ property }: any) {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-col gap-1 w-full mt-1 mb-2 bg-white';

      const previewDiv = document.createElement('div');
      previewDiv.className = 'w-full h-20 rounded border border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer relative group transition hover:border-blue-400 shadow-sm';
      
      const updatePreview = () => {
         try {
           const model = editor.getSelected();
           const val = property.getValue();
           
           if (!model) {
               previewDiv.style.backgroundImage = 'none';
               previewDiv.innerHTML = '<i class="fa fa-image text-gray-400 text-xl mb-1"></i><span class="text-[10px] text-gray-500 font-bold uppercase">Click to Choose</span>';
               return;
           }
           
           // Support for both background-image and <img> src
           if (model.is && model.is('image')) {
              const src = model.get('src');
              if (src) {
                  previewDiv.style.backgroundImage = `url('${src}')`;
                  previewDiv.style.backgroundSize = 'cover';
                  previewDiv.style.backgroundPosition = 'center';
                  previewDiv.innerHTML = '<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-[10px] font-bold uppercase tracking-wider">Change Image</div>';
              } else {
                  previewDiv.style.backgroundImage = 'none';
                  previewDiv.innerHTML = '<i class="fa fa-image text-gray-400 text-xl mb-1"></i><span class="text-[10px] text-gray-500 font-bold uppercase">Click to Choose</span>';
              }
           } else if (val && val.includes('url(')) {
               previewDiv.style.backgroundImage = val;
               previewDiv.style.backgroundSize = 'cover';
               previewDiv.style.backgroundPosition = 'center';
               previewDiv.innerHTML = '<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-[10px] font-bold uppercase tracking-wider">Change Background</div>';
           } else {
               previewDiv.style.backgroundImage = 'none';
               previewDiv.innerHTML = '<i class="fa fa-image text-gray-400 text-xl mb-1"></i><span class="text-[10px] text-gray-500 font-bold uppercase">Click to Choose</span>';
           }
         } catch (e) {
           console.warn('Background preview update failed gracefully', e);
         }
      };

      previewDiv.onclick = () => {
        editor.runCommand('open-assets', {
          target: editor.getSelected(),
          onSelect(asset: any) {
            const src = typeof asset.getSrc === 'function' ? asset.getSrc() : asset.src;
            const model = editor.getSelected();
            
            if (model && model.is('image')) {
                model.set('src', src);
            } else {
                property.upValue(`url('${src}')`);
            }
            
            updatePreview();
            
            if (model && typeof model.getClasses === 'function') {
               const classes = model.getClasses();
               const toRemove = classes.filter((cls: string) => cls.startsWith('bg-') || cls.startsWith('dark:bg-'));
               if (toRemove.length > 0) model.removeClass(toRemove);
            }
            
            applyTextContrast();
            editor.Modal.close();
          }
        });
      };
      
      const clearBtn = document.createElement('button');
      clearBtn.className = 'text-[10px] font-bold text-red-500 hover:text-red-700 self-end uppercase mt-1 px-1';
      clearBtn.innerText = 'Remove';
      clearBtn.onclick = () => {
         const model = editor.getSelected();
         if (model && model.is('image')) {
            model.set('src', '');
         } else {
            property.upValue('');
         }
         updatePreview();
         applyTextContrast();
      };

      wrapper.appendChild(previewDiv);
      wrapper.appendChild(clearBtn);

      // Listen for selection changes to update preview correctly
      editor.on('component:selected', updatePreview);
      setTimeout(updatePreview, 100);

      return wrapper;
    },
    update() {
      // noop
    }
  });

  // NEW SECTOR: Media & Backgrounds (TOP PRIORITY)
  sm.addSector('media', {
    name: 'Media & Backgrounds',
    open: true,
    properties: [
      {
        property: 'background-color',
        type: 'brand-color-picker',
        defaults: 'transparent'
      },
      {
        property: 'background-image',
        type: 'bg-image-file',
        name: 'Background Image'
      },
      {
        property: 'background-size',
        type: 'select',
        defaults: 'cover',
        options: [
          { value: 'auto', name: 'Auto' },
          { value: 'cover', name: 'Cover' },
          { value: 'contain', name: 'Contain' },
          { value: '100% 100%', name: 'Stretch' }
        ]
      },
      {
        property: 'background-position',
        type: 'select',
        defaults: 'center center',
        options: [
          { value: 'left top', name: 'Top Left' },
          { value: 'center top', name: 'Top Center' },
          { value: 'right top', name: 'Top Right' },
          { value: 'center center', name: 'Center' },
          { value: 'left center', name: 'Center Left' },
          { value: 'right center', name: 'Center Right' },
          { value: 'center bottom', name: 'Bottom Center' }
        ]
      },
      {
        property: 'background-repeat',
        type: 'select',
        defaults: 'no-repeat',
        options: [
          { value: 'repeat', name: 'Repeat' },
          { value: 'no-repeat', name: 'No Repeat' },
          { value: 'repeat-x', name: 'Repeat X' },
          { value: 'repeat-y', name: 'Repeat Y' }
        ]
      },
      {
        property: 'background-attachment',
        type: 'select',
        defaults: 'scroll',
        options: [
          { value: 'scroll', name: 'Scroll' },
          { value: 'fixed', name: 'Fixed (Parallax)' },
          { value: 'local', name: 'Local' }
        ]
      }
    ]
  });

  sm.addSector('typography', {
    name: 'Typography',
    open: true,
    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-transform', 'text-shadow']
  });

  sm.addSector('layout', {
    name: 'Layout & Dimensions',
    open: false,
    buildProps: ['display', 'position', 'top', 'right', 'bottom', 'left', 'flex-direction', 'justify-content', 'align-items', 'width', 'height', 'max-width', 'min-height', 'z-index']
  });
  sm.addSector('decorations', {
    name: 'Decorations & Effects',
    open: false,
    buildProps: ['opacity', 'cursor', 'overflow'],
    properties: [
      {
        property: 'background',
        name: 'Brand Gradient Mix',
        type: 'brand-gradient'
      }
    ]
  });



};
