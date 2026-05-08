import { sectionsLibrary } from './Sections';

export const registerTemplates = (editor: any) => {
  const bm = editor.BlockManager;

  // Construct the template by combining only sections from 'Full Page Templates' category
  const content = `
<div data-gjs-type="default" data-gjs-droppable="true" data-gjs-custom-name="Page Block" class="template-wrapper w-full flex flex-col min-h-screen">
  ${sectionsLibrary
    .filter(section => section.category === 'Full Page Templates' && section.id !== 'section-business-nav')
    .map(section => section.html)
    .join('\n')}
</div>
`;

  bm.add('template-business', {
    label: 'Business Landing Page',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#1e49e2]"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content
  });

  const template2Content = `
<div data-gjs-type="default" data-gjs-droppable="true" data-gjs-custom-name="Template 2" class="template-wrapper w-full flex flex-col min-h-screen">
  
  <!-- 2. Header Hero -->
  <div id="header-hero" data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gray-900 py-24" layout-mode="container">
    <div class="container mx-auto text-white text-center">
      <div class="mx-auto flex flex-col items-center w-full">
        <h1 class="text-5xl font-extrabold mb-6">Welcome to Our Platform</h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl">Discover how we can help you grow your business effortlessly with our powerful tools.</p>
        <button class="bg-[var(--color-secondary)] px-8 py-3 rounded-xl font-bold hover:bg-[#3b82f6] transition-colors">Get Started Now</button>
      </div>
    </div>
  </div>

  <!-- 3. Introduction -->
  <div id="introduction-section" data-gjs-type="section" data-gjs-name="Intro Section" class="w-full py-20 bg-white" layout-mode="container">
    <div class="container mx-auto px-4">
      <div class="mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
        <div class="flex-1">
           <h2 class="text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
           <p class="text-gray-600 leading-relaxed mb-6">We are a passionate team dedicated to delivering excellence. Our solutions simplify workflows and maximize productivity for teams around the globe.</p>
           <a href="#" class="font-semibold text-[var(--color-secondary)] hover:underline">Learn more about our mission &rarr;</a>
        </div>
        <div class="flex-1">
           <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" class="rounded-2xl shadow-xl w-full" />
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Features Grid -->
  <div id="features-grid" data-gjs-type="section" data-gjs-name="Features Grid" class="w-full bg-slate-50 py-20" layout-mode="container">
    <div class="container mx-auto px-4">
      <div class="mx-auto flex flex-col w-full">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
          <p class="text-gray-500">All the features your team requires to succeed.</p>
        </div>
        <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white w-full">
            <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🚀</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p class="text-gray-500 text-sm">Optimized for speed to ensure your conversion rate stays high on all devices.</p>
          </div>
          <div class="p-6 border border-[var(--color-secondary)] rounded-xl shadow-md bg-white relative w-full">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
            <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">📊</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
            <p class="text-gray-500 text-sm">Track every click and view with built-in real-time tracking dashboard.</p>
          </div>
          <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white w-full">
            <div class="w-12 h-12 bg-[#e0e7ff] text-[var(--color-secondary)] rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🔗</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Seamless Integrations</h3>
            <p class="text-gray-500 text-sm">Connect with your favorite tools natively and securely via APIs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Cards Grid -->
  <div id="cards-grid" data-gjs-type="section" data-gjs-name="Cards Grid" class="w-full py-16 bg-white dark:bg-slate-900" layout-mode="container">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#1e49e2] transition-all hover:shadow-xl hover:-translate-y-1 w-full group">
           <div class="w-12 h-12 mb-6 bg-blue-50 dark:bg-[#1e49e2]/10 text-[#1e49e2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <i class="fa-solid fa-palette text-xl"></i>
           </div>
           <h3 class="text-xl font-bold mb-3 dark:text-white">Design Tools</h3>
           <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Create beautiful interfaces with ease using our premium drag-and-drop components and curated design system.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#1e49e2] transition-all hover:shadow-xl hover:-translate-y-1 w-full group">
           <div class="w-12 h-12 mb-6 bg-blue-50 dark:bg-[#1e49e2]/10 text-[#1e49e2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <i class="fa-solid fa-chart-line text-xl"></i>
           </div>
           <h3 class="text-xl font-bold mb-3 dark:text-white">Analytics Insights</h3>
           <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Track user behavior and optimize your funnel with real-time data metrics and intelligent performance tracking.</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#1e49e2] transition-all hover:shadow-xl hover:-translate-y-1 w-full group">
           <div class="w-12 h-12 mb-6 bg-blue-50 dark:bg-[#1e49e2]/10 text-[#1e49e2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <i class="fa-solid fa-server text-xl"></i>
           </div>
           <h3 class="text-xl font-bold mb-3 dark:text-white">Cloud Storage</h3>
           <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Keep all your digital assets secure and accessible anywhere in the world with our enterprise-grade infrastructure.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Corporate Footer -->
  <div id="business-footer" data-gjs-type="section" data-gjs-name="Footer" class="w-full bg-slate-50 py-16 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Company</h4>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">About Us</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Careers</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Engineering Blog</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Press & Media</a>
        </div>
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Products</h4>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Cloud Platform</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Analytics Engine</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">AI Assistant</a>
          <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent font-medium transition-colors">Integrations API</a>
        </div>
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-bold text-lg mb-2">Subscribe</h4>
          <p class="text-slate-600 dark:text-slate-400 font-medium mb-2 w-full max-w-sm">Get the latest business insights and updates delivered weekly.</p>
          <div class="flex flex-col gap-3 w-full max-w-sm">
            <input type="email" placeholder="Your work email" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-accent shadow-sm" />
            <button class="w-full bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-accent transition-colors shadow-sm">Subscribe Now</button>
          </div>
        </div>
      </div>
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
</div>
`;

  bm.add('template-2', {
    label: 'Template-2',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#1e49e2]"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content: template2Content
  });
};
