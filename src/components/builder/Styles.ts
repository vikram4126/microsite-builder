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
      };
      
      w.appendChild(applyBtn);
      
      return w;
    },
    update() {
    }
  });

  sm.addSector('layout', {
    name: 'Layout & Dimensions',
    open: true,
    buildProps: ['width', 'height', 'max-width', 'min-height']
  });

  sm.addSector('decorations', {
    name: 'Decorations & Backgrounds',
    open: false,
    buildProps: ['opacity'],
    properties: [
      {
        property: 'background-color',
        type: 'brand-color-picker',
        defaults: 'transparent'
      },
      {
        property: 'background-image',
        name: 'Brand Gradient Mix',
        type: 'brand-gradient'
      }
    ]
  });

  sm.addSector('shadows', {
    name: 'Shadows & Effects',
    open: false,
    buildProps: ['box-shadow'],
    properties: [
      {
        property: 'box-shadow',
        name: 'Box Shadow',
        type: 'select',
        defaults: 'none',
        options: [
          { value: 'none', name: 'None' },
          { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', name: 'Small' },
          { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', name: 'Medium' },
          { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', name: 'Large' },
          { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)', name: 'Extra Large' },
        ]
      }
    ]
  });

  sm.addSector('animations', {
    name: 'Hover Effects (Select state:hover)',
    open: false,
    buildProps: ['transition', 'transform'],
    properties: [
      {
        property: 'transition',
        name: 'Transition Speed',
        type: 'select',
        defaults: 'none',
        options: [
          { value: 'none', name: 'None' },
          { value: 'all 0.15s ease', name: 'Fast' },
          { value: 'all 0.3s ease', name: 'Normal' },
          { value: 'all 0.5s ease', name: 'Slow' },
        ]
      },
      {
        property: 'transform',
        name: 'Transform',
        type: 'select',
        defaults: 'none',
        options: [
          { value: 'none', name: 'None' },
          { value: 'translateY(-5px)', name: 'Lift Up' },
          { value: 'scale(1.05)', name: 'Scale Up' },
          { value: 'scale(0.95)', name: 'Scale Down' },
        ]
      }
    ]
  });
};
