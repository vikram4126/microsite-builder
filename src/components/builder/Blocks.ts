import { sectionsLibrary } from './Sections';

export const registerBlocks = (editor: any) => {
  const bm = editor.BlockManager;

  const svgs = {
    header: '<div class="flex flex-col items-center justify-center p-2 bg-[#0c233c] text-white h-full w-full rounded"><span class="text-[10px] font-bold">HERO BANNER</span><div class="w-6 h-0.5 bg-secondary my-1"></div><span class="text-[7px] text-slate-400">Main tagline & CTA</span></div>',
    intro: '<div class="flex items-center justify-between p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="flex flex-col gap-1 w-1/2"><div class="h-2 w-3/4 bg-primary rounded"></div><div class="h-1 w-full bg-slate-300 rounded"></div></div><div class="w-8 h-8 rounded bg-slate-100 flex items-center justify-center"><svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div></div>',
    section: '<div class="flex flex-col items-center justify-center p-2 bg-[#f8fafc] border border-slate-200 h-full w-full rounded"><div class="h-2 w-3/4 bg-primary rounded mb-1"></div><div class="h-1.5 w-1/2 bg-slate-400 rounded"></div></div>',
    columns: '<div class="flex gap-2 p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="flex-1 bg-slate-50 border border-slate-200 rounded min-h-[30px]"></div><div class="flex-1 bg-slate-50 border border-slate-200 rounded min-h-[30px]"></div></div>',
    heading: '<div class="flex items-center justify-center p-2 bg-white border border-slate-200 h-full w-full rounded"><span class="text-xs font-bold text-[#0c233c] border-b-2 border-secondary pb-0.5">Heading Tag</span></div>',
    text: '<div class="flex flex-col gap-1 p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="h-1.5 w-full bg-slate-300 rounded"></div><div class="h-1.5 w-5/6 bg-slate-300 rounded"></div><div class="h-1.5 w-2/3 bg-slate-300 rounded"></div></div>',
    button: '<div class="flex items-center justify-center p-2 bg-white border border-slate-200 h-full w-full rounded"><span class="px-3 py-1 bg-secondary text-white text-[9px] font-bold rounded shadow-sm">Click Button</span></div>',
    image: '<div class="flex items-center justify-center p-2 bg-[#f1f5f9] border border-slate-200 h-full w-full rounded"><svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>',
    divider: '<div class="flex items-center justify-center p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="w-full border-t border-slate-300 border-dashed"></div></div>',
    spacer: '<div class="flex items-center justify-center p-2 bg-[#f8fafc] border border-slate-200 border-dashed h-full w-full rounded"><span class="text-[8px] text-slate-400 font-mono">Empty Spacer</span></div>',
    card: '<div class="flex flex-col bg-white border border-slate-200 h-full w-full rounded p-1.5 gap-1 justify-between"><div class="flex gap-0.5"><div class="h-2 w-7 rounded border border-[#7213ea]/40 text-[4px] scale-[0.7] origin-left text-[#7213ea]/60 flex items-center justify-center font-bold">15.07.2023</div><div class="h-2 w-8 rounded border border-[#7213ea]/40 text-[4px] scale-[0.7] origin-left text-[#7213ea]/60 flex items-center justify-center font-bold">13:00-14:00</div></div><div class="flex items-center gap-1 my-0.5"><div class="w-4 h-4 rounded-full border border-[#7213ea] bg-slate-100 flex-shrink-0"></div><div class="flex flex-col gap-0.5"><div class="h-1.5 w-8 bg-slate-800 rounded"></div><div class="h-1 w-10 bg-slate-400 rounded"></div></div></div><div class="h-1.5 w-full bg-slate-200 rounded"></div><div class="h-1 w-11/12 bg-slate-200 rounded mb-0.5"></div><div class="h-1.5 w-6 bg-secondary/80 rounded"></div></div>',
    accordion: '<div class="flex flex-col gap-1 p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="flex items-center justify-between p-1 bg-slate-50 rounded border border-slate-100"><span class="text-[8px] font-bold text-slate-700">FAQ Question</span><span class="text-[8px] text-slate-400">▼</span></div></div>',
    tabs: '<div class="flex flex-col bg-white border border-slate-200 h-full w-full rounded"><div class="flex border-b border-slate-200 bg-slate-50"><span class="flex-1 text-center py-0.5 text-[8px] font-bold text-primary border-b border-primary bg-white">Tab 1</span><span class="flex-1 text-center py-0.5 text-[8px] text-slate-400">Tab 2</span></div><div class="p-1 h-full bg-white"></div></div>',
    testimonial: '<div class="flex flex-col p-1.5 bg-slate-50 border border-slate-200 h-full w-full rounded justify-between"><span class="text-[7px] italic text-slate-600">"Excellent service!"</span><div class="flex items-center gap-1"><div class="w-3 h-3 rounded-full bg-slate-300"></div><span class="text-[7px] font-bold text-slate-800">Sarah J.</span></div></div>',
    cards: '<div class="grid grid-cols-3 gap-1 p-1 bg-white border border-slate-200 h-full w-full rounded"><div class="border border-slate-100 rounded p-0.5 bg-slate-50"><div class="h-1.5 w-3/4 bg-slate-700 rounded mb-0.5"></div><div class="h-1 w-full bg-slate-300 rounded"></div></div><div class="border border-slate-100 rounded p-0.5 bg-slate-50"><div class="h-1.5 w-3/4 bg-slate-700 rounded mb-0.5"></div><div class="h-1 w-full bg-slate-300 rounded"></div></div><div class="border border-slate-100 rounded p-0.5 bg-slate-50"><div class="h-1.5 w-3/4 bg-slate-700 rounded mb-0.5"></div><div class="h-1 w-full bg-slate-300 rounded"></div></div></div>',
    icons: '<div class="flex items-center justify-center p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center"><svg class="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div></div>',
    list: '<div class="flex flex-col gap-1 p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="flex items-center gap-1"><div class="w-1 h-1 rounded-full bg-secondary"></div><div class="h-1 w-3/4 bg-slate-500 rounded"></div></div><div class="flex items-center gap-1"><div class="w-1 h-1 rounded-full bg-secondary"></div><div class="h-1 w-2/3 bg-slate-500 rounded"></div></div></div>',
    footer: '<div class="flex flex-col justify-between p-2 bg-slate-900 border border-slate-700 h-full w-full rounded"><div class="flex justify-between items-center"><span class="text-[8px] font-bold text-white">Footer</span><div class="flex gap-1"><span class="text-[6px] text-slate-400">Terms</span></div></div><div class="border-t border-slate-800 pt-0.5 text-center"><span class="text-[5px] text-slate-500">© 2026. All rights reserved.</span></div></div>',
    partnerMessage: '<div class="flex flex-col justify-between p-2 bg-white border border-slate-200 h-full w-full rounded"><div class="h-2 w-3/4 bg-[#00338d] rounded mb-2"></div><div class="flex gap-2 h-full"><div class="flex-1 flex flex-col gap-1"><div class="h-1 w-full bg-slate-300 rounded"></div><div class="h-1 w-full bg-slate-300 rounded"></div><div class="h-1 w-5/6 bg-slate-300 rounded"></div></div><div class="w-10 flex flex-col gap-1 flex-shrink-0"><div class="h-8 w-full bg-slate-200 rounded"></div><div class="h-4 w-full bg-[#7213ea] rounded"></div></div></div></div>'
  };

  // REGISTER DYNAMIC SECTIONS LIBRARY
  sectionsLibrary.forEach(section => {
    bm.add(section.id, {
      label: section.label,
      category: section.category || 'Services', // Use section's own category
      media: section.svg || svgs.section,
      content: section.html
    });
  });

  // Register dynamic nav links component type
  editor.Components.addType('dynamic-nav-links', {
    model: {
      defaults: {
        tagName: 'div',
        draggable: false,
        droppable: false,
        removable: false,
        copyable: false,
        classes: ['flex', 'flex-col', 'md:flex-row', 'items-center', 'gap-4', 'md:gap-8', 'font-medium', 'text-sm', 'w-full', 'md:w-auto'],
      }
    }
  });


  // 2. HEADER
  bm.add('header-hero', {
    label: 'Dark Hero Banner',
    category: 'Header',
    media: '<img src="/thumbs/header-hero.jpg" class="object-cover" />',
    content: `
      <div id="header-hero" data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gray-900 py-10 md:py-[60px] lg:py-24" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 text-white text-center">
          <div class="mx-auto flex flex-col items-center w-full">
            <h1 class="text-5xl font-display font-extrabold mb-6">Welcome to Our Platform</h1>
            <p class="text-xl text-gray-400 mb-8 max-w-2xl">Discover how we can help you grow your business effortlessly with our powerful tools.</p>
            <button class="bg-secondary px-8 py-3 rounded-xl font-bold hover:bg-[#3b82f6] transition-colors">Get Started Now</button>
          </div>
        </div>
      </div>
    `
  });

  bm.add('header-video', {
    label: 'Video Hero Banner',
    category: 'Header',
    media: `
      <div class="flex flex-col items-center justify-center p-2 bg-[#0c233c] text-white h-full w-full rounded border border-gray-700/30">
        <span class="text-[9px] font-bold text-[#00b8f5]">VIDEO BANNER</span>
        <div class="w-6 h-0.5 bg-[#1e49e2] my-1"></div>
        <span class="text-[7px] text-[#aceaff]/70">Premium video background</span>
      </div>
    `,
    content: `
      <div id="video-hero-section" data-gjs-type="section" data-gjs-name="Video Hero Header" class="w-full min-h-[75vh] flex items-center justify-center relative overflow-hidden py-20 lg:py-32" layout-mode="container">
        <!-- Video Background Element -->
        <video class="video-bg-element absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline" src="/videos/video-1.mp4"></video>
        
        <!-- Dark Premium Overlay -->
        <div class="absolute inset-0 bg-[#0c233c]/75 mix-blend-multiply z-10 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0c233c] via-transparent to-transparent z-10 pointer-events-none"></div>

        <!-- Content Container -->
        <div class="container mx-auto px-4 lg:px-0 text-white text-center relative z-20">
          <div class="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e49e2]/30 border border-[#aceaff]/20 text-[#aceaff] text-xs font-bold uppercase tracking-wider animate-pulse">
              <span class="h-2 w-2 rounded-full bg-[#00b8f5]"></span> Next Generation Platform
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight tracking-tight text-white">
              Revolutionize Your <span class="bg-gradient-to-r from-[#00b8f5] to-[#aceaff] bg-clip-text text-transparent">Digital Future</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed font-medium">
              Experience the power of real-time cloud data, automated workflows, and premium intelligent insights.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mt-4 justify-center items-center">
              <a href="#" class="h-14 px-8 bg-[#00b8f5] text-[#0c233c] hover:bg-[#aceaff] rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#00b8f5]/20 hover:shadow-[#aceaff]/20 transition-all duration-300 transform hover:-translate-y-0.5">
                Get Started Free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a href="#" class="h-14 px-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    `
  });

  bm.add('header-video-split', {
    label: 'Split Banner — Video Right',
    category: 'Header',
    media: `
      <div style="display:flex;height:100%;width:100%;border-radius:4px;overflow:hidden;background:#0c233c;">
        <div style="flex:1;padding:6px;display:flex;flex-direction:column;justify-content:center;gap:3px;">
          <div style="width:70%;height:6px;background:#1e49e2;border-radius:2px;"></div>
          <div style="width:90%;height:4px;background:#aceaff40;border-radius:2px;"></div>
          <div style="width:80%;height:4px;background:#aceaff40;border-radius:2px;"></div>
          <div style="width:40%;height:8px;background:#00b8f5;border-radius:3px;margin-top:4px;"></div>
        </div>
        <div style="flex:1;background:#1e49e2;display:flex;align-items:center;justify-content:center;font-size:8px;color:#aceaff;font-weight:700;letter-spacing:1px;">▶ VIDEO</div>
      </div>
    `,
    content: `
      <div data-gjs-type="section" data-gjs-name="Split Banner Video" class="w-full bg-[#0c233c] py-10 md:py-[60px] lg:py-24 overflow-hidden" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col md:flex-row items-center gap-10 lg:gap-16">

            <!-- Left: CTA Content -->
            <div class="flex-1 flex flex-col gap-6 z-10">
              <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e49e2]/30 border border-[#aceaff]/20 text-[#aceaff] text-xs font-bold uppercase tracking-wider w-fit">
                <span class="h-2 w-2 rounded-full bg-[#00b8f5]"></span> New: Enterprise Cloud 2.0
              </span>
              <h1 class="text-white text-4xl lg:text-5xl font-display font-black leading-tight tracking-tight">
                Transform Your Business with <span class="text-[#00b8f5]">Modern Solutions</span>
              </h1>
              <p class="text-slate-300 text-lg leading-relaxed max-w-xl">
                Empowering teams with the tools they need to scale faster and work smarter in a digital-first world. Built for modern enterprises.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="#" class="h-14 px-8 bg-[#00b8f5] text-[#0c233c] hover:bg-[#aceaff] rounded-xl font-bold text-lg flex items-center justify-center shadow-lg shadow-[#00b8f5]/30 transition-all hover:-translate-y-0.5">Get Started Today</a>
                <a href="#" class="h-14 px-8 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-lg flex items-center justify-center transition-all backdrop-blur-sm">Watch Demo</a>
              </div>
            </div>

            <!-- Right: Video -->
            <div class="flex-1 relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1e49e2]/20 min-h-[300px] md:min-h-[400px] hidden md:block">
              <video data-gjs-type="video-bg" data-gjs-name="Hero Video" class="w-full h-full object-cover absolute inset-0" autoplay="autoplay" loop="loop" muted="muted" playsinline="playsinline" src="/videos/video-1.mp4"></video>
              <!-- Blue overlay on video -->
              <div class="absolute inset-0 bg-gradient-to-tr from-[#00338d]/60 via-transparent to-transparent pointer-events-none"></div>
            </div>

          </div>
        </div>
      </div>
    `
  });

  // 3. INTRODUCTION
  bm.add('introduction', {
    label: 'CEO Intro & Mission Section',
    category: 'Introduction',
    media: '<img src="/thumbs/ceo intro thumb.png" class="object-cover w-full h-full" />',
    content: `
      <div id="introduction-section" data-gjs-type="section" data-gjs-name="Intro Section" class="w-full py-20" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
            <div class="flex-1">
               <h2 class="text-3xl font-display font-bold mb-4 text-gray-900">Who We Are</h2>
               <p class="text-gray-600 leading-relaxed mb-6">We are a passionate team dedicated to delivering excellence. Our solutions simplify workflows and maximize productivity for teams around the globe.</p>
               <a href="#" class="font-semibold text-secondary hover:underline">Learn more about our mission &rarr;</a>
            </div>
            <div class="flex-1">
               <img src="/images/image-5.png" alt="Team" class="rounded-2xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </div>
    `
  });

  bm.add('partner-message', {
    label: 'Global Lead Partner Message',
    category: 'Introduction',
    media: svgs.partnerMessage,
    content: `
      <div id="partner-message-section" data-gjs-type="section" data-gjs-name="Partner Message Section" class="w-full py-16 md:py-24 bg-white dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <h2 class="text-3xl md:text-4xl font-display font-black text-[#00338d] dark:text-white mb-10 tracking-tight">A message from our Global Lead Partner</h2>
          <div class="flex flex-col lg:flex-row gap-12 w-full items-start">
            <!-- Left Column (Message text & signature) -->
            <div class="flex-1 lg:w-7/12 flex flex-col gap-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae congue eu consequat ac. Augue interdum velit euismod in pellentesque massa.</p>
              <p>Sed tempus urna et pharetra pharetra massa massa ultricies. Duis ut diam quam nulla porttitor massa id neque.</p>
              <p>Diam volutpat commodo sed egestas egestas fringilla. Aenean et tortor at risus viverra adipiscing at. Proin nibh nisl condimentum id venenatis a condimentum. Eu ultrices vitae auctor eu augue ut. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies.</p>
              <p>Condimentum lacinia quis vel eros donec ac odio.</p>
              <p>Eros in cursus turpis massa. Auctor neque vitae tempus quam pellentesque. Interdum varius sit amet mattis vulputate enim nulla.</p>
              <p>Ipsum dolor sit amet consectetur. Netus et malesuada fames ac turpis. Eu non diam phasellus vestibulum. Urna molestie at elementum eu.</p>
              
              <div class="mt-8">
                <p class="text-slate-500 dark:text-slate-400 font-medium">Sincerely,</p>
                <p class="text-xl font-display font-bold text-[#0c233c] dark:text-white mt-1">John Doe</p>
              </div>
            </div>

            <!-- Right Column (Avatar & Name Card) -->
            <div class="w-full lg:w-5/12 flex flex-col gap-6 max-w-md mx-auto lg:mx-0">
              <!-- Partner image -->
              <div class="w-full aspect-[4/3] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                <img src="/team-member/member-11.jpg" alt="John Doe" class="w-full h-full object-cover" />
              </div>
              
              <!-- Purple Name Card -->
              <div class="bg-[#7213ea] text-white p-6 shadow-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
                <div class="flex flex-col gap-1">
                  <h4 class="text-2xl font-display font-bold">John Doe</h4>
                  <p class="text-white/90 text-sm font-medium">Global Lead Partner</p>
                </div>
                <div class="flex items-center mt-6">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 4. SECTIONS
  bm.add('hero-section', {
    label: 'Light Hero Banner',
    category: 'Header',
    media: '<img src="/thumbs/center-white.jpg" class="object-cover" />',
    content: `
      <div id="hero-section" data-gjs-type="section" class="w-full bg-[#f8fafc] py-10 md:py-[60px] lg:py-24" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 text-center">
          <div class="mx-auto flex flex-col items-center justify-center w-full">
            <h1 class="text-5xl font-display font-extrabold text-[var(--color-dark)] mb-6 tracking-tight">Build Your Brand Today</h1>
            <p class="text-lg text-gray-600 mb-10 max-w-2xl">The ultimate microsite builder for high-converting marketing campaigns. Drag, drop, and launch in minutes.</p>
            <div class="flex space-x-4">
              <a href="#" class="bg-secondary text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-primary">Get Started Free</a>
              <a href="#" class="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-200 shadow-sm hover:bg-gray-50">Book a Demo</a>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  bm.add('features-grid', {
    label: 'Services Grid with Icons',
    category: 'Services',
    media: '<img src="/thumbs/services-thumb-1.png" class="object-cover w-full h-full" />',
    content: `
      <div id="features-grid" data-gjs-type="section" class="w-full bg-white py-20" layout-mode="container">
        <div class="container mx-auto">
          <div class="mx-auto flex flex-col w-full">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-display font-bold text-gray-900 mb-4">Everything you need</h2>
              <p class="text-gray-500">All the features your team requires to succeed.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
                <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🚀</div>
                <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p class="text-gray-500 text-sm">Optimized for speed to ensure your conversion rate stays high on all devices.</p>
              </div>
              <div class="p-6 border border-secondary rounded-xl shadow-md bg-white relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">📊</div>
                <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Smart Analytics</h3>
                <p class="text-gray-500 text-sm">Track every click and view with built-in real-time tracking dashboard.</p>
              </div>
              <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
                <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🔗</div>
                <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Seamless Integrations</h3>
                <p class="text-gray-500 text-sm">Connect with your favorite tools natively and securely via APIs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  // 5. LAYOUT & COLUMNS combinations
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
      media: svgs.columns,
      content: `
        <div data-gjs-type="section" class="w-full" layout-mode="container">
          <div data-gjs-type="responsive-grid" class="container mx-auto grid ${combo.class} gap-4">
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
      media: svgs.columns,
      content: `
        <div data-gjs-type="section" class="w-full" layout-mode="container">
          <div class="container mx-auto px-4 lg:px-0 flex flex-col md:flex-row gap-4">
            <div class="min-h-[50px]" style="flex: ${combo.left}"></div>
            <div class="min-h-[50px]" style="flex: ${combo.right}"></div>
          </div>
        </div>
      `,
    });
  });

  // REST OF CATEGORIES
  // BASIC WIDGETS
  bm.add('heading', {
    label: 'Heading Title',
    category: 'Basic',
    media: svgs.heading,
    content: '<h2 data-gjs-type="text" class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Insert Heading Here</h2>',
  });

  bm.add('text', {
    label: 'Rich Text Box',
    category: 'Basic',
    media: svgs.text,
    content: '<p data-gjs-type="text" class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  });

  bm.add('button', {
    label: 'CTA Button',
    category: 'Basic',
    media: svgs.button,
    content: '<a href="#" data-gjs-type="link" class="inline-block bg-secondary dark:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-primary dark:hover:bg-blue-700 transition-colors">Click Here</a>',
  });

  bm.add('image', {
    label: 'Responsive Image',
    category: 'Basic',
    media: svgs.image,
    content: { type: 'image', classes: ['w-full', 'h-auto', 'rounded-lg', 'shadow-sm'] },
  });

  bm.add('divider', {
    label: 'Divider',
    category: 'Basic',
    media: svgs.divider,
    content: '<hr class="my-8 border-t border-gray-200 dark:border-gray-700" />',
  });

  bm.add('spacer', {
    label: 'Spacer',
    category: 'Basic',
    media: svgs.spacer,
    content: '<div class="py-8 w-full"></div>',
  });

  bm.add('list', {
    label: 'List',
    category: 'Basic',
    media: svgs.list,
    content: '<ul class="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-300"><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>',
  });

  // ADVANCED WIDGETS
  bm.add('card', {
    label: 'Profile Card',
    category: 'Cards',
    media: svgs.card,
    content: `
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 w-full flex flex-col gap-5">
        <!-- Top Badges Row -->
        <div class="flex gap-2">
          <span class="inline-flex items-center rounded-lg border border-[#7213ea] px-3 py-1.5 text-xs font-semibold text-[#7213ea] bg-[#7213ea]/5 tracking-wide">
            15.07.2023
          </span>
          <span class="inline-flex items-center rounded-lg border border-[#7213ea] px-3 py-1.5 text-xs font-semibold text-[#7213ea] bg-[#7213ea]/5 tracking-wide">
            13:00-14:00
          </span>
        </div>

        <!-- Profile Row -->
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full border-2 border-[#7213ea] p-0.5 overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
            <img src="/team-member/member-1.jpg" alt="John Doe" class="w-full h-full rounded-full object-cover" />
          </div>
          <div class="flex flex-col">
            <h3 class="font-display font-bold text-xl text-[#0c233c] dark:text-white leading-tight">John Doe</h3>
            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Partner Strategy</span>
          </div>
        </div>

        <!-- Description Text -->
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac turpis in eros pharetra tincidunt. Nullam vestibulum at sapien et sagittis. In accumsan erat ex.
        </p>

        <!-- More Information Link -->
        <div class="pt-2">
          <a href="#" class="text-[#1e49e2] hover:text-[#00338d] dark:text-[#aceaff] dark:hover:text-white font-bold text-sm inline-flex items-center gap-1 group transition-colors">
            <span>More information</span>
            <span class="font-sans">&gt;</span>
          </a>
        </div>
      </div>
    `
  });

  bm.add('accordion', {
    label: 'Collapsible FAQ Accordion',
    category: 'Advanced',
    media: svgs.accordion,
    content: {
      components: `
        <div class="w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 overflow-hidden max-w-2xl mx-auto my-4 relative">
          <div class="accordion-header p-4 bg-gray-50 dark:bg-slate-700/50 border-b dark:border-gray-700 cursor-pointer font-bold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            <span>How does the builder work?</span>
            <span class="pointer-events-none">&darr;</span>
          </div>
          <div class="accordion-content p-4 text-gray-600 dark:text-gray-400 hidden bg-white dark:bg-slate-800">
            It uses a drag-and-drop interface powered by modern web technologies, allowing you to design visually without writing code.
          </div>
        </div>
      `,
      script: function (this: any) {
        const header = this.querySelector('.accordion-header');
        const content = this.querySelector('.accordion-content');
        if (header && content) {
          header.addEventListener('click', function () {
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
    label: 'Switchable Tab Content',
    category: 'Advanced',
    media: svgs.tabs,
    content: {
      components: `
        <div class="w-full max-w-2xl mx-auto my-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
          <div class="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900">
            <button class="tab-btn flex-1 py-3 px-4 font-bold text-[var(--color-secondary)] dark:text-blue-400 border-b-2 border-[var(--color-secondary)] bg-white dark:bg-slate-800" data-target="tab1">Tab 1</button>
            <button class="tab-btn flex-1 py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-transparent border-b-2 border-transparent" data-target="tab2">Tab 2</button>
            <button class="tab-btn flex-1 py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-transparent border-b-2 border-transparent" data-target="tab3">Tab 3</button>
          </div>
          <div class="p-6 text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 min-h-[100px]">
            <div id="tab1" class="tab-content block">This is the content for Tab 1. You can add text, images, or even form elements inside this container to build complex UI patterns.</div>
            <div id="tab2" class="tab-content hidden">This is the content for Tab 2. It switches instantly without reloading.</div>
            <div id="tab3" class="tab-content hidden">And here is Tab 3 content.</div>
          </div>
        </div>
      `,
      script: function (this: any) {
        const btns = this.querySelectorAll('.tab-btn');
        const contents = this.querySelectorAll('.tab-content');

        btns.forEach((btn: any) => {
          btn.addEventListener('click', () => {
            // Reset all
            btns.forEach((b: any) => {
              b.className = "tab-btn flex-1 py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-transparent border-b-2 border-transparent";
            });
            contents.forEach((c: any) => c.classList.add('hidden'));

            // Active current
            btn.className = "tab-btn flex-1 py-3 px-4 font-bold text-[var(--color-secondary)] dark:text-blue-400 border-b-2 border-[var(--color-secondary)] bg-white dark:bg-slate-800";
            const targetId = btn.getAttribute('data-target');
            const targetContent = this.querySelector('#' + targetId);
            if (targetContent) targetContent.classList.remove('hidden');
          });
        });
      }
    }
  });

  bm.add('testimonial-card', {
    label: 'Customer Testimonial',
    category: 'Testimonials',
    media: svgs.testimonial,
    content: `
      <div class="bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto relative overflow-hidden">
        <div class="text-6xl text-gray-200 dark:text-slate-700 absolute -top-2 left-4 font-serif">"</div>
        <p class="text-gray-700 dark:text-gray-300 italic mb-6 relative z-10 leading-relaxed text-lg">"This platform transformed how our entire agency builds landing pages. It's incredibly fast and easy to use. Highly recommended!"</p>
        <div class="flex items-center">
          <img src="/team-member/member-1jpg" class="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 class="font-display font-bold text-gray-900 dark:text-white">Sarah Jenkins</h4>
            <span class="text-gray-500 dark:text-gray-400 text-sm">Marketing Director</span>
          </div>
        </div>
      </div>
    `
  });

  bm.add('cards-grid', {
    label: 'Feature Cards Grid',
    category: 'Cards',
    media: svgs.cards,
    content: `
      <section class="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-display font-bold mb-2 dark:text-white">Design Tools</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm">Create beautiful interfaces with ease using our drag-and-drop components.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-display font-bold mb-2 dark:text-white">Analytics Insights</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm">Track user behavior and optimize your funnel with real-time data metrics.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-display font-bold mb-2 dark:text-white">Cloud Storage</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm">Keep all your assets secure and accessible anywhere in the world.</p>
        </div>
      </section>
    `
  });

  // ICONS GALLERY
  const iconClasses = [
    'star', 'heart', 'check', 'user', 'envelope', 'phone', 'globe', 'camera', 'rocket', 'chart-bar',
    'shield-halved', 'bolt', 'map-marker-alt', 'play-circle', 'cog', 'home', 'search', 'bell', 'plus', 'minus',
    'times', 'arrow-right', 'arrow-left', 'chevron-right', 'chevron-left', 'chevron-down', 'chevron-up', 'download',
    'upload', 'share', 'reply', 'comment', 'comments', 'folder', 'folder-open', 'file', 'file-alt', 'edit',
    'trash', 'trash-alt', 'key', 'lock', 'unlock', 'lock-open', 'eye', 'eye-slash', 'image', 'images',
    'video', 'music', 'headphones', 'microphone', 'volume-up', 'volume-down', 'volume-mute', 'volume-off', 'wifi',
    'signal', 'battery-full', 'battery-half', 'battery-empty', 'car', 'bus', 'train', 'subway', 'bicycle',
    'motorcycle', 'plane', 'ship', 'paper-plane', 'shopping-cart', 'shopping-bag', 'shopping-basket', 'credit-card',
    'money-bill-wave', 'wallet', 'coins', 'dollar-sign', 'euro-sign', 'pound-sign', 'yen-sign', 'rupee-sign',
    'info-circle', 'question-circle', 'exclamation-triangle', 'exclamation-circle', 'thumbs-up', 'thumbs-down',
    'calendar', 'calendar-alt', 'clock', 'sync', 'spinner', 'circle-notch', 'bars', 'ellipsis-h', 'ellipsis-v'
  ];

  const icons = iconClasses.map(c => ({
    id: `icon-${c}`,
    label: c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    class: `fa-solid fa-${c}`
  }));

  icons.forEach(icon => {
    bm.add(icon.id, {
      label: icon.label,
      category: 'Icons',
      media: `<i class="${icon.class} text-3xl"></i>`,
      content: `<span class="inline-block m-2 text-[var(--color-primary)] hover:text-opacity-80 transition-opacity"><i data-gjs-type="icon" class="${icon.class} text-4xl"></i></span>`,
    });
  });
};
