export const registerBlocks = (editor: any) => {
  const bm = editor.BlockManager;

  // LAYOUT & COLUMNS combinations (1,2,3,4,5,6, 2/8, 3/7, 8/2, 7/3)
  const columnCombos = [
    { id: 'col-1', label: '1 Column', class: 'grid-cols-1' },
    { id: 'col-2', label: '2 Columns', class: 'grid-cols-2' },
    { id: 'col-3', label: '3 Columns', class: 'grid-cols-3' },
    { id: 'col-4', label: '4 Columns', class: 'grid-cols-4' },
    { id: 'col-5', label: '5 Columns', class: 'grid-cols-5' },
    { id: 'col-6', label: '6 Columns', class: 'grid-cols-6' },
  ];

  columnCombos.forEach(combo => {
    bm.add(combo.id, {
      label: combo.label,
      category: 'Layout',
      content: `
        <div data-gjs-type="default" class="w-full min-h-[100px] py-8" layout-mode="container">
          <div data-gjs-type="responsive-grid" class="container-custom container mx-auto grid ${combo.class} gap-4">
            ${Array.from({ length: parseInt(combo.label.split(' ')[0]) }).map(() => '<div class="flex-1 min-h-[50px]"></div>').join('')}
          </div>
        </div>
      `,
    });
  });

  const customSpans = [
    { id: 'col-2-8', label: '2/8 Columns', left: 2, right: 8 },
    { id: 'col-3-7', label: '3/7 Columns', left: 3, right: 7 },
    { id: 'col-8-2', label: '8/2 Columns', left: 8, right: 2 },
    { id: 'col-7-3', label: '7/3 Columns', left: 7, right: 3 },
  ];

  customSpans.forEach(combo => {
    bm.add(combo.id, {
      label: combo.label,
      category: 'Layout',
      content: `
        <div data-gjs-type="default" class="w-full min-h-[100px] py-8" layout-mode="container">
          <div class="container-custom container mx-auto flex flex-col md:flex-row gap-4">
            <div class="min-h-[50px]" style="flex: ${combo.left}"></div>
            <div class="min-h-[50px]" style="flex: ${combo.right}"></div>
          </div>
        </div>
      `,
    });
  });

  // BASIC WIDGETS
  bm.add('heading', {
    label: 'Heading',
    category: 'Basic',
    content: '<h2 data-gjs-type="text" class="text-3xl font-bold text-gray-900 mb-4">Insert Heading Here</h2>',
  });

  bm.add('text', {
    label: 'Text Box',
    category: 'Basic',
    content: '<p data-gjs-type="text" class="text-gray-600 mb-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  });

  bm.add('button', {
    label: 'Button',
    category: 'Basic',
    content: '<a href="#" data-gjs-type="link" class="inline-block bg-[#1e49e2] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#00338d] transition-colors">Click Here</a>',
  });

  bm.add('image', {
    label: 'Image',
    category: 'Basic',
    content: { type: 'image', classes: ['w-full', 'h-auto', 'rounded-lg', 'shadow-sm'] },
  });

  bm.add('divider', {
    label: 'Divider',
    category: 'Basic',
    content: '<hr class="my-8 border-t border-gray-200" />',
  });

  bm.add('spacer', {
    label: 'Spacer',
    category: 'Basic',
    content: '<div class="py-8 w-full"></div>',
  });

  // PRE-BUILT SECTIONS
  bm.add('hero-section', {
    label: 'Hero Section',
    category: 'Sections',
    content: `
      <div data-gjs-type="default" class="w-full bg-[#f8fafc] py-20" layout-mode="container">
        <div class="container-custom container mx-auto text-center flex flex-col items-center justify-center">
          <h1 class="text-5xl font-extrabold text-[#0c233c] mb-6 tracking-tight">Build Your Brand Today</h1>
          <p class="text-lg text-gray-600 mb-10 max-w-2xl">The ultimate microsite builder for high-converting marketing campaigns. Drag, drop, and launch in minutes.</p>
          <div class="flex space-x-4">
            <a href="#" class="bg-[#1e49e2] text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-[#00338d]">Get Started Free</a>
            <a href="#" class="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-200 shadow-sm hover:bg-gray-50">Book a Demo</a>
          </div>
        </div>
      </div>
    `,
  });

  bm.add('features-grid', {
    label: 'Features Grid',
    category: 'Sections',
    content: `
      <div data-gjs-type="default" class="w-full bg-white py-20" layout-mode="container">
        <div class="container-custom container mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p class="text-gray-500">All the features your team requires to succeed.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
              <div class="w-12 h-12 bg-[#e0e7ff] text-[#1e49e2] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🚀</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p class="text-gray-500 text-sm">Optimized for speed to ensure your conversion rate stays high on all devices.</p>
            </div>
            <div class="p-6 border border-[#1e49e2] rounded-xl shadow-md bg-white relative">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1e49e2] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <div class="w-12 h-12 bg-[#e0e7ff] text-[#1e49e2] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">📊</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
              <p class="text-gray-500 text-sm">Track every click and view with built-in real-time tracking dashboard.</p>
            </div>
            <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
              <div class="w-12 h-12 bg-[#e0e7ff] text-[#1e49e2] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🔗</div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Seamless Integrations</h3>
              <p class="text-gray-500 text-sm">Connect with your favorite tools natively and securely via APIs.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  // ADVANCED WIDGETS
  bm.add('card', {
    label: 'Card Block',
    category: 'Advanced',
    content: `
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-sm">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Card" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2 text-gray-900">Premium Quality</h3>
          <p class="text-gray-600 mb-4 text-sm">Designed with precision to meet the highest standards of modern aesthetics.</p>
          <a href="#" class="text-[#1e49e2] font-semibold hover:underline">Read more &rarr;</a>
        </div>
      </div>
    `
  });

  bm.add('accordion', {
    label: 'Accordion',
    category: 'Advanced',
    content: {
      components: `
        <div class="w-full border border-gray-200 rounded-lg bg-white overflow-hidden max-w-2xl mx-auto my-4 relative">
          <div class="accordion-header p-4 bg-gray-50 border-b cursor-pointer font-bold text-gray-800 flex justify-between items-center">
            <span>How does the builder work?</span>
            <span class="pointer-events-none">&darr;</span>
          </div>
          <div class="accordion-content p-4 text-gray-600 hidden bg-white">
            It uses a drag-and-drop interface powered by modern web technologies, allowing you to design visually without writing code.
          </div>
        </div>
      `,
      script: function(this: any) {
        const header = this.querySelector('.accordion-header');
        const content = this.querySelector('.accordion-content');
        if (header && content) {
          header.addEventListener('click', function() {
            if (content.classList.contains('hidden')) {
              content.classList.remove('hidden');
            } else {
              content.classList.add('hidden');
            }
          });
        }
      }
    }
  });

  bm.add('tabs', {
    label: 'Tabs',
    category: 'Advanced',
    content: {
      components: `
        <div class="w-full max-w-2xl mx-auto my-8 border border-gray-200 rounded-lg overflow-hidden bg-white">
          <div class="flex border-b border-gray-200 bg-gray-50">
            <button class="tab-btn flex-1 py-3 px-4 font-bold text-[#1e49e2] border-b-2 border-[#1e49e2] bg-white" data-target="tab1">Tab 1</button>
            <button class="tab-btn flex-1 py-3 px-4 font-medium text-gray-500 hover:text-gray-700 bg-transparent border-b-2 border-transparent" data-target="tab2">Tab 2</button>
            <button class="tab-btn flex-1 py-3 px-4 font-medium text-gray-500 hover:text-gray-700 bg-transparent border-b-2 border-transparent" data-target="tab3">Tab 3</button>
          </div>
          <div class="p-6 text-gray-600 bg-white min-h-[100px]">
            <div id="tab1" class="tab-content block">This is the content for Tab 1. You can add text, images, or even form elements inside this container to build complex UI patterns.</div>
            <div id="tab2" class="tab-content hidden">This is the content for Tab 2. It switches instantly without reloading.</div>
            <div id="tab3" class="tab-content hidden">And here is Tab 3 content.</div>
          </div>
        </div>
      `,
      script: function(this: any) {
        const btns = this.querySelectorAll('.tab-btn');
        const contents = this.querySelectorAll('.tab-content');
        
        btns.forEach((btn: any) => {
          btn.addEventListener('click', () => {
             // Reset all
             btns.forEach((b: any) => {
               b.className = "tab-btn flex-1 py-3 px-4 font-medium text-gray-500 hover:text-gray-700 bg-transparent border-b-2 border-transparent";
             });
             contents.forEach((c: any) => c.classList.add('hidden'));
             
             // Active current
             btn.className = "tab-btn flex-1 py-3 px-4 font-bold text-[#1e49e2] border-b-2 border-[#1e49e2] bg-white";
             const targetId = btn.getAttribute('data-target');
             const targetContent = this.querySelector('#' + targetId);
             if (targetContent) targetContent.classList.remove('hidden');
          });
        });
      }
    }
  });
  // NEW REQUESTED CATEGORIES
  
  bm.add('navbar-basic', {
    label: 'Simple Navbar',
    category: 'Navbar',
    content: `
      <nav class="w-full bg-white border-b border-gray-100 flex items-center justify-between p-6">
        <div class="text-xl font-bold text-gray-900">Brand</div>
        <div class="space-x-6 hidden md:flex">
          <a href="#" class="text-gray-600 hover:text-[#1e49e2]">Home</a>
          <a href="#" class="text-gray-600 hover:text-[#1e49e2]">About</a>
          <a href="#" class="text-gray-600 hover:text-[#1e49e2]">Services</a>
        </div>
        <a href="#" class="bg-[#1e49e2] text-white px-5 py-2 rounded-lg font-medium">Contact Us</a>
      </nav>
    `
  });

  bm.add('header-hero', {
    label: 'Header Hero',
    category: 'Header',
    content: `
      <header class="w-full bg-gray-900 text-white py-24 px-8 text-center flex flex-col items-center">
        <h1 class="text-5xl font-extrabold mb-6">Welcome to Our Platform</h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl">Discover how we can help you grow your business effortlessly with our powerful tools.</p>
        <button class="bg-[#1e49e2] px-8 py-3 rounded-xl font-bold hover:bg-[#3b82f6] transition-colors">Get Started Now</button>
      </header>
    `
  });

  bm.add('introduction', {
    label: 'Introduction',
    category: 'Introduction',
    content: `
      <section class="py-20 px-8 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1">
           <h2 class="text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
           <p class="text-gray-600 leading-relaxed mb-6">We are a passionate team dedicated to delivering excellence. Our solutions simplify workflows and maximize productivity for teams around the globe.</p>
           <a href="#" class="font-semibold text-[#1e49e2] hover:underline">Learn more about our mission &rarr;</a>
        </div>
        <div class="flex-1">
           <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" class="rounded-2xl shadow-xl w-full" />
        </div>
      </section>
    `
  });

  bm.add('testimonial-card', {
    label: 'Testimonial',
    category: 'Testimonials',
    content: `
      <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 max-w-md mx-auto relative overflow-hidden">
        <div class="text-6xl text-gray-200 absolute -top-2 left-4 font-serif">"</div>
        <p class="text-gray-700 italic mb-6 relative z-10 leading-relaxed text-lg">"This platform transformed how our entire agency builds landing pages. It's incredibly fast and easy to use. Highly recommended!"</p>
        <div class="flex items-center">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026" class="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 class="font-bold text-gray-900">Sarah Jenkins</h4>
            <span class="text-gray-500 text-sm">Marketing Director</span>
          </div>
        </div>
      </div>
    `
  });

  bm.add('cards-grid', {
    label: 'Cards Grid',
    category: 'Cards',
    content: `
      <section class="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1e49e2] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2">Design Tools</h3>
           <p class="text-gray-600 text-sm">Create beautiful interfaces with ease using our drag-and-drop components.</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1e49e2] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2">Analytics Insights</h3>
           <p class="text-gray-600 text-sm">Track user behavior and optimize your funnel with real-time data metrics.</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#1e49e2] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2">Cloud Storage</h3>
           <p class="text-gray-600 text-sm">Keep all your assets secure and accessible anywhere in the world.</p>
        </div>
      </section>
    `
  });

  // ICONS GALLERY
  const icons = [
    { id: 'icon-star', label: 'Star Icon', class: 'fa-star' },
    { id: 'icon-heart', label: 'Heart Icon', class: 'fa-heart' },
    { id: 'icon-check', label: 'Check Icon', class: 'fa-check-circle' },
    { id: 'icon-user', label: 'User Icon', class: 'fa-user' },
    { id: 'icon-envelope', label: 'Mail Icon', class: 'fa-envelope' },
    { id: 'icon-phone', label: 'Phone Icon', class: 'fa-phone' },
    { id: 'icon-globe', label: 'Globe Icon', class: 'fa-globe' },
    { id: 'icon-camera', label: 'Camera Icon', class: 'fa-camera' },
    { id: 'icon-rocket', label: 'Rocket Icon', class: 'fa-rocket' },
    { id: 'icon-chart', label: 'Chart Icon', class: 'fa-chart-bar' },
    { id: 'icon-shield', label: 'Security Icon', class: 'fa-shield-halved' },
    { id: 'icon-bolt', label: 'Lightning Icon', class: 'fa-bolt' },
    { id: 'icon-location', label: 'Location Icon', class: 'fa-map-marker-alt' },
    { id: 'icon-play', label: 'Play Icon', class: 'fa-play-circle' },
    { id: 'icon-cog', label: 'Settings Icon', class: 'fa-cog' }
  ];

  icons.forEach(icon => {
    bm.add(icon.id, {
      label: icon.label,
      category: 'Icons',
      content: `<i data-gjs-type="text" class="fa ${icon.class} text-4xl text-[#1e49e2] inline-block m-2"></i>`,
    });
  });
};
