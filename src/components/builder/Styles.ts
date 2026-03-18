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

  sm.addSector('layout', {
    name: 'Layout & Dimensions',
    open: true,
    buildProps: ['width', 'height', 'max-width', 'min-height']
  });

  sm.addSector('decorations', {
    name: 'Decorations & Backgrounds',
    open: false,
    buildProps: ['opacity', 'background-color', 'background-image'],
    properties: [
      {
        property: 'background-color',
        type: 'brand-color-picker',
        defaults: 'transparent'
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
