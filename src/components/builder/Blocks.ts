import { sectionsLibrary } from './Sections';

export const registerBlocks = (editor: any) => {
  const bm = editor.BlockManager;

  const svgs = {
    navbar: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="20" fill="#f8fafc"/><rect x="5" y="8" width="15" height="4" rx="2" fill="var(--color-primary)"/><rect x="45" y="8" width="8" height="3" rx="1.5" fill="#94a3b8"/><rect x="58" y="8" width="8" height="3" rx="1.5" fill="#94a3b8"/><rect x="71" y="8" width="8" height="3" rx="1.5" fill="#94a3b8"/><rect x="85" y="6" width="10" height="7" rx="2" fill="var(--color-secondary)"/></svg>',
    header: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#0c233c"/><rect x="25" y="20" width="50" height="5" rx="2" fill="#ffffff"/><rect x="35" y="30" width="30" height="3" rx="1.5" fill="#94a3b8"/><rect x="40" y="40" width="20" height="6" rx="3" fill="var(--color-secondary)"/></svg>',
    intro: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="20" width="35" height="4" rx="2" fill="var(--color-primary)"/><rect x="10" y="28" width="40" height="2" rx="1" fill="#94a3b8"/><rect x="10" y="32" width="35" height="2" rx="1" fill="#94a3b8"/><rect x="55" y="10" width="35" height="40" rx="4" fill="#eef2ff"/><rect x="65" y="20" width="15" height="20" rx="2" fill="var(--color-secondary)" opacity="0.5"/></svg>',
    section: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="20" y="20" width="60" height="4" rx="2" fill="var(--color-primary)"/><rect x="30" y="28" width="40" height="2" rx="1" fill="#94a3b8"/><rect x="38" y="36" width="24" height="6" rx="3" fill="var(--color-secondary)"/></svg>',
    columns: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="10" width="35" height="40" rx="2" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/><rect x="55" y="10" width="35" height="40" rx="2" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/></svg>',
    heading: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="20" y="25" width="60" height="10" rx="3" fill="#0c233c"/></svg>',
    text: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="20" width="80" height="4" rx="1" fill="#64748b"/><rect x="10" y="28" width="70" height="4" rx="1" fill="#64748b"/><rect x="10" y="36" width="50" height="4" rx="1" fill="#64748b"/></svg>',
    button: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="30" y="20" width="40" height="20" rx="6" fill="var(--color-secondary)"/></svg>',
    image: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f1f5f9"/><rect x="25" y="10" width="50" height="40" rx="4" fill="#e2e8f0"/><circle cx="45" cy="25" r="5" fill="#cbd5e1"/><path d="M25 45 Q 40 30 50 40 T 75 25 V 50 H 25 Z" fill="#94a3b8" opacity="0.5"/></svg>',
    divider: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><line x1="10" y1="30" x2="90" y2="30" stroke="#cbd5e1" stroke-width="2"/></svg>',
    spacer: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="15" width="80" height="30" fill="#f8fafc" stroke="#cbd5e1" stroke-dasharray="4 4" stroke-width="2"/></svg>',
    card: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="30" y="5" width="40" height="50" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/><rect x="30" y="5" width="40" height="20" fill="#e2e8f0" rx="3"/><rect x="35" y="30" width="20" height="3" rx="1.5" fill="var(--color-primary)"/><rect x="35" y="38" width="30" height="2" rx="1" fill="#94a3b8"/><rect x="35" y="47" width="10" height="2" rx="1" fill="var(--color-secondary)"/></svg>',
    accordion: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="20" y="10" width="60" height="10" rx="2" fill="#f8fafc" stroke="#cbd5e1"/><rect x="20" y="25" width="60" height="20" rx="2" fill="#f8fafc" stroke="#cbd5e1"/><rect x="25" y="31" width="30" height="2" fill="#0c233c"/><rect x="25" y="38" width="45" height="1.5" fill="#64748b"/><rect x="80" y="20" width="0" height="0"/></svg>',
    tabs: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="20" y="10" width="60" height="40" rx="3" fill="#ffffff" stroke="#cbd5e1"/><rect x="20" y="10" width="60" height="12" fill="#f8fafc"/><rect x="25" y="14" width="15" height="8" rx="1" fill="#ffffff"/><rect x="45" y="15" width="10" height="4" rx="1" fill="#cbd5e1"/><rect x="60" y="15" width="10" height="4" rx="1" fill="#cbd5e1"/></svg>',
    testimonial: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="20" y="10" width="60" height="40" rx="4" fill="#f8fafc" stroke="#e2e8f0"/><rect x="25" y="20" width="50" height="2" fill="#94a3b8"/><rect x="25" y="25" width="40" height="2" fill="#94a3b8"/><circle cx="35" cy="40" r="5" fill="#cbd5e1"/><rect x="45" y="38" width="20" height="2" fill="var(--color-primary)"/></svg>',
    cards: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="10" width="22" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1"/><rect x="15" y="15" width="12" height="8" rx="1" fill="#e2e8f0"/><rect x="15" y="30" width="12" height="2" fill="var(--color-secondary)"/><rect x="39" y="10" width="22" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1"/><rect x="44" y="15" width="12" height="8" rx="1" fill="#e2e8f0"/><rect x="44" y="30" width="12" height="2" fill="var(--color-secondary)"/><rect x="68" y="10" width="22" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1"/><rect x="73" y="15" width="12" height="8" rx="1" fill="#e2e8f0"/><rect x="73" y="30" width="12" height="2" fill="var(--color-secondary)"/></svg>',
    icons: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><circle cx="50" cy="30" r="15" fill="var(--color-secondary)" opacity="0.2"/><path d="M50 20 L 53 27 L 60 27 L 55 32 L 57 39 L 50 35 L 43 39 L 45 32 L 40 27 L 47 27 Z" fill="var(--color-secondary)"/></svg>',
    list: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><circle cx="25" cy="20" r="2" fill="var(--color-secondary)"/><rect x="35" y="19" width="40" height="2" rx="1" fill="#64748b"/><circle cx="25" cy="30" r="2" fill="var(--color-secondary)"/><rect x="35" y="29" width="30" height="2" rx="1" fill="#64748b"/><circle cx="25" cy="40" r="2" fill="var(--color-secondary)"/><rect x="35" y="39" width="35" height="2" rx="1" fill="#64748b"/></svg>',
    footer: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="15" width="15" height="4" fill="var(--color-primary)"/><rect x="10" y="25" width="20" height="2" fill="#94a3b8"/><rect x="40" y="15" width="10" height="3" fill="#0c233c"/><rect x="40" y="22" width="12" height="2" fill="#94a3b8"/><rect x="55" y="15" width="10" height="3" fill="#0c233c"/><rect x="55" y="22" width="12" height="2" fill="#94a3b8"/><rect x="70" y="15" width="10" height="3" fill="#0c233c"/><rect x="70" y="22" width="20" height="8" rx="2" fill="#e2e8f0"/></svg>'
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

  // 1. NAVBAR
  bm.add('navbar-basic', {
    label: 'Simple Navbar',
    category: 'Navbar',
    media: svgs.navbar,
    content: `
      <div id="navbar-basic" data-gjs-type="section" data-gjs-name="Navbar" class="w-full bg-white border-b border-gray-100" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center justify-between p-4 lg:py-5 lg:px-0 gap-4">
          <a href="#" class="block"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAgCAYAAACBxi9RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ3NjYsIDIwMjEvMDIvMTktMjM6MTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0Y2RTdFMzIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0Y2RTdFNDIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3RjZFN0UxMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3RjZFN0UyMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FtnFTAAABj9JREFUeNrsWmls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" alt="Brand Logo" class="h-8 w-auto inline-block" /></a>
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-medium text-sm w-full md:w-auto">
            <a href="#" class="text-gray-600 hover:text-[var(--color-secondary)]">Home</a>
            <a href="#" class="text-gray-600 hover:text-[var(--color-secondary)]">About</a>
            <a href="#" class="text-gray-600 hover:text-[var(--color-secondary)]">Services</a>
            <a href="#" class="bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-lg font-medium inline-flex hover:shadow-md transition-all text-center">Contact Us</a>
          </div>
        </div>
      </div>
    `
  });

  // 1.5 FOOTER
  bm.add('footer-business', {
    label: 'Corporate Footer',
    category: 'Footer',
    media: svgs.footer,
    content: `
      <div id="business-footer" data-gjs-type="section" data-gjs-name="Footer" class="w-full bg-slate-50 py-16 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0 text-left">
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <!-- Brand & Social Column -->
            <div class="flex flex-col gap-6 w-full items-start">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAgCAYAAACBxi9RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ3NjYsIDIwMjEvMDIvMTktMjM6MTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0Y2RTdFMzIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0Y2RTdFNDIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3RjZFN0UxMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3RjZFN0UyMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FtnFTAAABj9JREFUeNrsWmls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" alt="Brand Logo" class="h-8 w-auto inline-block" />
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Leading the future of digital business with specialized industry insights and strategic technology partnerships.
              </p>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              </div>
            </div>
      
            <!-- Links Column 1 -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Company</h4>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">About Us</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Careers</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Engineering Blog</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Press & Media</a>
            </div>
      
            <!-- Links Column 2 -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Products</h4>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Cloud Platform</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Analytics Engine</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">AI Assistant</a>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Integrations API</a>
            </div>
      
            <!-- Subscribe Column -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Subscribe</h4>
              <p class="text-slate-600 dark:text-slate-400 font-medium mb-2 w-full max-w-sm">Get the latest business insights and updates delivered weekly.</p>
              <div class="flex flex-col gap-3 w-full max-w-sm">
                <input type="email" placeholder="Your work email" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-accent shadow-sm" />
                <button class="w-full bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-accent transition-colors shadow-sm">Subscribe Now</button>
              </div>
            </div>
            
          </div>
      
          <!-- Bottom Row -->
          <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 text-sm text-slate-500 font-medium w-full">
            <p>&copy; 2026 KPMG International Cooperative. All rights reserved.</p>
            <div class="flex flex-wrap justify-center gap-6 items-center">
              <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Cookies Settings</a>
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 2. HEADER
  bm.add('header-hero', {
    label: 'Header Hero',
    category: 'Header',
    media: '<img src="/thumbs/header-hero.jpg" class="object-cover" />',
    content: `
      <div id="header-hero" data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gray-900 py-10 md:py-[60px] lg:py-24" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 text-white text-center">
          <div class="mx-auto flex flex-col items-center w-full">
            <h1 class="text-5xl font-extrabold mb-6">Welcome to Our Platform</h1>
            <p class="text-xl text-gray-400 mb-8 max-w-2xl">Discover how we can help you grow your business effortlessly with our powerful tools.</p>
            <button class="bg-[var(--color-secondary)] px-8 py-3 rounded-xl font-bold hover:bg-[#3b82f6] transition-colors">Get Started Now</button>
          </div>
        </div>
      </div>
    `
  });

  // 3. INTRODUCTION
  bm.add('introduction', {
    label: 'Introduction',
    category: 'Introduction',
    media: svgs.intro,
    content: `
      <div id="introduction-section" data-gjs-type="section" data-gjs-name="Intro Section" class="w-full py-20" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
            <div class="flex-1">
               <h2 class="text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
               <p class="text-gray-600 leading-relaxed mb-6">We are a passionate team dedicated to delivering excellence. Our solutions simplify workflows and maximize productivity for teams around the globe.</p>
               <a href="#" class="font-semibold text-[var(--color-secondary)] hover:underline">Learn more about our mission &rarr;</a>
            </div>
            <div class="flex-1">
               <img src="/images/image-5.png" alt="Team" class="rounded-2xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </div>
    `
  });

  // 4. SECTIONS
  bm.add('hero-section', {
    label: 'Center White',
    category: 'Header',
    media: '<img src="/thumbs/center-white.jpg" class="object-cover" />',
    content: `
      <div id="hero-section" data-gjs-type="section" class="w-full bg-[#f8fafc] py-10 md:py-[60px] lg:py-24" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 text-center">
          <div class="mx-auto flex flex-col items-center justify-center w-full">
            <h1 class="text-5xl font-extrabold text-[var(--color-dark)] mb-6 tracking-tight">Build Your Brand Today</h1>
            <p class="text-lg text-gray-600 mb-10 max-w-2xl">The ultimate microsite builder for high-converting marketing campaigns. Drag, drop, and launch in minutes.</p>
            <div class="flex space-x-4">
              <a href="#" class="bg-[var(--color-secondary)] text-white px-8 py-3 rounded-lg font-medium shadow hover:bg-[var(--color-primary)]">Get Started Free</a>
              <a href="#" class="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium border border-gray-200 shadow-sm hover:bg-gray-50">Book a Demo</a>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  bm.add('features-grid', {
    label: 'Features Grid',
    category: 'Services',
    media: svgs.cards,
    content: `
      <div id="features-grid" data-gjs-type="section" class="w-full bg-white py-20" layout-mode="container">
        <div class="container mx-auto">
          <div class="mx-auto flex flex-col w-full">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
              <p class="text-gray-500">All the features your team requires to succeed.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
                <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🚀</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p class="text-gray-500 text-sm">Optimized for speed to ensure your conversion rate stays high on all devices.</p>
              </div>
              <div class="p-6 border border-[var(--color-secondary)] rounded-xl shadow-md bg-white relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">📊</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
                <p class="text-gray-500 text-sm">Track every click and view with built-in real-time tracking dashboard.</p>
              </div>
              <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white">
                <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🔗</div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Seamless Integrations</h3>
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
    label: 'Heading',
    category: 'Basic',
    media: svgs.heading,
    content: '<h2 data-gjs-type="text" class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Insert Heading Here</h2>',
  });

  bm.add('text', {
    label: 'Text Box',
    category: 'Basic',
    media: svgs.text,
    content: '<p data-gjs-type="text" class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  });

  bm.add('button', {
    label: 'Button',
    category: 'Basic',
    media: svgs.button,
    content: '<a href="#" data-gjs-type="link" class="inline-block bg-[var(--color-secondary)] dark:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-[var(--color-primary)] dark:hover:bg-blue-700 transition-colors">Click Here</a>',
  });

  bm.add('image', {
    label: 'Image',
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
    label: 'Card Block',
    category: 'Advanced',
    media: svgs.card,
    content: `
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden max-w-sm">
        <img src="/images/image-6.jpg" alt="Card" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h3 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">Premium Quality</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">Designed with precision to meet the highest standards of modern aesthetics.</p>
          <a href="#" class="text-[var(--color-secondary)] font-semibold hover:underline">Read more &rarr;</a>
        </div>
      </div>
    `
  });

  bm.add('accordion', {
    label: 'Accordion',
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
    label: 'Tabs',
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
    label: 'Testimonial',
    category: 'Testimonials',
    media: svgs.testimonial,
    content: `
      <div class="bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto relative overflow-hidden">
        <div class="text-6xl text-gray-200 dark:text-slate-700 absolute -top-2 left-4 font-serif">"</div>
        <p class="text-gray-700 dark:text-gray-300 italic mb-6 relative z-10 leading-relaxed text-lg">"This platform transformed how our entire agency builds landing pages. It's incredibly fast and easy to use. Highly recommended!"</p>
        <div class="flex items-center">
          <img src="/team-member/member-1jpg" class="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 class="font-bold text-gray-900 dark:text-white">Sarah Jenkins</h4>
            <span class="text-gray-500 dark:text-gray-400 text-sm">Marketing Director</span>
          </div>
        </div>
      </div>
    `
  });

  bm.add('cards-grid', {
    label: 'Cards Grid',
    category: 'Cards',
    media: svgs.cards,
    content: `
      <section class="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[var(--color-secondary)] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2 dark:text-white">Design Tools</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm">Create beautiful interfaces with ease using our drag-and-drop components.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[var(--color-secondary)] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2 dark:text-white">Analytics Insights</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm">Track user behavior and optimize your funnel with real-time data metrics.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[var(--color-secondary)] transition-colors shadow-sm">
           <div class="w-10 h-10 mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
           <h3 class="text-xl font-bold mb-2 dark:text-white">Cloud Storage</h3>
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
