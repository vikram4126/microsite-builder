export interface SectionDef {
  id: string;
  category: string;
  label: string;
  html: string;
  svg: string;
}

export const sectionsLibrary: SectionDef[] = [
  {
    id: 'section-business-nav',
    category: 'Full Page Templates',
    label: 'Business Navbar',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="20" fill="#f8fafc"/><rect x="5" y="8" width="15" height="4" rx="2" fill="var(--color-primary)"/><rect x="85" y="6" width="10" height="7" rx="2" fill="var(--color-secondary)"/></svg>',
    html: `
      <!-- Navbar with Brand Colors (Fix for B&W preview) -->
      <div id="business-nav" data-gjs-type="section" class="w-full bg-white dark:bg-slate-900 border-b-[3px] border-accent shadow-sm" layout-mode="container">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center justify-between p-4 lg:py-4 lg:px-6">
            <a href="#" class="block"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAgCAYAAACBxi9RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ3NjYsIDIwMjEvMDIvMTktMjM6MTA6MDcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozN0Y2RTdFMzIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozN0Y2RTdFNDIzOTIxMUYxQjEzMEU2OTE3NkNDNkU4NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3RjZFN0UxMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3RjZFN0UyMjM5MjExRjFCMTMwRTY5MTc2Q0M2RTg1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FtnFTAAABj9JREFUeNrsWmls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" alt="Brand Logo" class="h-8 w-auto inline-block" /></a>
            <nav class="flex flex-col w-full md:w-auto md:flex md:flex-row items-center gap-6 mt-4 md:mt-0 font-medium text-sm">
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Home</a>
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Services</a>
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Features</a>
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">About</a>
              <a href="#" class="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-lg shadow transition-all">Get Started</a>
            </nav>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-hero',
    category: 'Full Page Templates',
    label: 'Business Hero',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#0c233c"/><rect x="25" y="20" width="50" height="5" rx="2" fill="#ffffff"/><rect x="40" y="40" width="20" height="6" rx="3" fill="var(--color-secondary)"/></svg>',
    html: `
      <!-- Hero Section with subtle colored gradient background (Fix for B&W preview) -->
      <div id="business-hero" data-gjs-type="section" class="w-full bg-gradient-to-b from-accent/10 to-transparent dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32 relative overflow-hidden" layout-mode="container">
        <div class="container mx-auto">
          <!-- Wrap interior in standard flex layout -->
          <div class="flex flex-col md:flex-row gap-12 items-center px-4 sm:px-6 lg:px-8">
            <div class="flex-1 flex flex-col gap-8 z-10 w-full object-cover">
              <div>
                <span class="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent mb-6 border border-accent/20 shadow-sm">New: Enterprise Cloud 2.0</span>
                <h1 class="text-primary dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  Transform Your Business with <br/><span class="text-accent">Modern Solutions</span>
                </h1>
              </div>
              <p class="text-slate-700 dark:text-slate-300 text-lg lg:text-xl leading-relaxed max-w-xl">
                Empowering teams with the tools they need to scale faster and work smarter in a digital-first world. Built for modern enterprises.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="#" class="h-14 flex items-center justify-center px-8 rounded-xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/30 hover:-translate-y-1 hover:bg-primary transition-all">Get Started Today</a>
                <a href="#" class="h-14 flex items-center justify-center px-8 rounded-xl border-2 border-primary/20 dark:border-slate-700 text-primary dark:text-slate-200 font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">View Demo</a>
              </div>
            </div>
            <div class="flex-1 relative z-10 hidden md:block w-full">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop" class="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" alt="Office" />
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-features',
    category: 'Full Page Templates',
    label: 'Business Features',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="10" width="22" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1"/></svg>',
    html: `
      <!-- Features (Using responsive-grid trait method) -->
      <div id="business-features" data-gjs-type="section" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-primary dark:text-white text-4xl font-black mb-4 tracking-tight">Our Core Capabilities</h2>
            <p class="text-slate-600 dark:text-slate-400 text-lg">Robust infrastructure designed to solve complex challenges seamlessly and efficiently.</p>
          </div>
          <!-- Replaced raw tailwind grid with native GrapesJS responsive-grid component -->
          <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-accent/50 transition-colors h-full w-full">
              <div class="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <h3 class="text-xl font-bold text-primary dark:text-white mb-3">Cloud Integration</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Connect your legacy systems to modern cloud infrastructure with zero downtime.</p>
            </div>
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 border-b-4 border-b-accent relative shadow-xl shadow-accent/5 h-full w-full">
              <div class="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <div class="w-14 h-14 bg-accent text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
              </div>
              <h3 class="text-xl font-bold text-primary dark:text-white mb-3">Data Analytics</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Turn raw numbers into actionable business insights with our real-time processing engine.</p>
            </div>
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-accent/50 transition-colors h-full w-full">
              <div class="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 class="text-xl font-bold text-primary dark:text-white mb-3">AI Automation</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Reduce manual workloads by 40% using intelligent workflows and custom machine learning.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-services',
    category: 'Full Page Templates',
    label: 'Business Services',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="10" width="22" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1"/></svg>',
    html: `
      <!-- Services Grid -->
      <div id="business-services" data-gjs-type="section" class="w-full py-24 bg-slate-50 dark:bg-slate-800/50" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div class="max-w-xl">
              <h2 class="text-4xl font-black text-primary dark:text-white mb-4 tracking-tight">Professional Services</h2>
              <p class="text-slate-600 dark:text-slate-400 text-lg">Tailored expertise to help your business navigate digital transformation.</p>
            </div>
            <a href="#" class="text-accent font-bold hover:underline inline-flex items-center gap-2">View All Services &rarr;</a>
          </div>
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" class="h-56 w-full object-cover" alt="Consulting" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Consulting</div>
                <h4 class="text-2xl font-bold text-primary dark:text-white mb-3">Strategic Planning</h4>
                <p class="text-slate-600 dark:text-slate-400 mb-6">Expert guidance to scale your infrastructure and refine operations effectively.</p>
                <a href="#" class="bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-center rounded-lg py-3 block font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Read More</a>
              </div>
            </div>
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" class="h-56 w-full object-cover" alt="Engineering" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Engineering</div>
                <h4 class="text-2xl font-bold text-primary dark:text-white mb-3">Custom Software</h4>
                <p class="text-slate-600 dark:text-slate-400 mb-6">Bespoke web and mobile applications engineered to exactly fit your workflows.</p>
                <a href="#" class="bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-center rounded-lg py-3 block font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Read More</a>
              </div>
            </div>
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="https://images.unsplash.com/photo-1563986768494-4d8dd9e469c0?q=80&w=1000&auto=format&fit=crop" class="h-56 w-full object-cover" alt="Security" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Security</div>
                <h4 class="text-2xl font-bold text-primary dark:text-white mb-3">Cyber Protection</h4>
                <p class="text-slate-600 dark:text-slate-400 mb-6">Advanced threat detection and comprehensive compliance auditing solutions.</p>
                <a href="#" class="bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-center rounded-lg py-3 block font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-cta',
    category: 'Full Page Templates',
    label: 'Business CTA',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="20" y="25" width="60" height="10" rx="3" fill="#0c233c"/></svg>',
    html: `
      <!-- CTA Block (Refactored to native Tailwind gradient instead of blurred absolute shapes) -->
      <div id="business-cta" data-gjs-type="section" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-br from-primary via-primary to-accent dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-12 lg:p-24 text-center shadow-2xl relative overflow-hidden text-white border border-primary/20">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-white text-4xl lg:text-5xl font-black mb-6 tracking-tight">Ready to elevate your business?</h2>
              <p class="text-white/80 text-xl lg:text-2xl mb-12">Join thousands of companies already using our platform to scale their operations securely.</p>
              <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="#" class="w-full sm:w-auto px-10 py-5 rounded-xl bg-white text-primary font-black text-lg hover:shadow-xl transition-all shadow-md">Try It Free Today</a>
                <a href="#" class="w-full sm:w-auto px-10 py-5 rounded-xl border border-white/40 text-white font-bold text-lg backdrop-blur hover:bg-white/10 transition-all">Contact Sales Team</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-footer',
    category: 'Full Page Templates',
    label: 'Business Footer',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="15" width="15" height="4" fill="var(--color-primary)"/></svg>',
    html: `
      <!-- KPMG Footer -->
      <div id="business-footer" data-gjs-type="section" class="w-full bg-slate-50 py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
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
  },
  {
    id: 'section-dual-cta-pdf',
    category: 'Template Sections',
    label: 'Split CTA Card',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="var(--color-secondary)"/><rect x="15" y="15" width="35" height="30" fill="#ffffff" opacity="0.5"/><rect x="50" y="15" width="35" height="30" fill="#ffffff"/></svg>',
    html: `
      <div id="dual-cta-pdf" data-gjs-type="section" class="w-full bg-[var(--color-secondary)] py-20" layout-mode="container">
        <div class="container mx-auto px-4">
          <div class="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div class="flex-1 min-h-[400px]">
              <img src="/src/assets/background/campaign-creators-gMsnXqILjp4-unsplash.jpg" class="w-full h-full object-cover" alt="Handshake" />
            </div>
            <div class="flex-1 flex flex-col items-center justify-center p-12 lg:p-16 text-center">
              <h2 class="text-4xl font-black text-gray-900 mb-8 tracking-tight">Lorem ipsum</h2>
              <a href="#" data-gjs-type="link" class="bg-[var(--color-secondary)] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all">Download PDF</a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-trust-impact',
    category: 'Template Sections',
    label: 'Trust & Impact Hero',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#F5F7FA"/><rect x="10" y="20" width="40" height="4" fill="var(--color-primary)"/><rect x="60" y="10" width="30" height="40" fill="#cbd5e1" opacity="0.5"/></svg>',
    html: `
      <div id="trust-impact-hero" data-gjs-type="section" class="w-full py-20 lg:py-32 bg-white" layout-mode="container">
        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-[1.2] flex flex-col items-start text-left">
            <span class="text-xs font-bold uppercase tracking-widest text-[#1e49e2] mb-4">OVERLINE</span>
            <h1 class="text-4xl lg:text-5xl font-black text-[#0c233c] mb-6 leading-tight tracking-tight">Inspire trust and deliver <br/>impact for your brand</h1>
            <p class="text-lg text-gray-600 leading-relaxed max-w-xl">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          </div>
          <div class="flex-1 relative w-full">
            <div class="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-auto md:h-[450px]">
              <img src="/src/assets/background/dylan-gillis-KdeqA3aTnBY-unsplash.jpg" class="w-full h-full object-cover" alt="Team impact" />
              <div class="absolute inset-0 bg-gradient-to-tr from-[#0c233c]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-expert-profiles',
    category: 'Template Sections',
    label: 'Expert Profiles',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#F5F7FA"/><rect x="10" y="20" width="25" height="30" fill="white" stroke="#e2e8f0"/><rect x="40" y="20" width="25" height="30" fill="white" stroke="#e2e8f0"/><rect x="70" y="20" width="25" height="30" fill="white" stroke="#e2e8f0"/></svg>',
    html: `
      <div id="expert-profiles" data-gjs-type="section" class="w-full py-24 bg-[#F5F7FA]" layout-mode="container">
        <div class="container mx-auto px-4">
          <div class="text-center mb-20 max-w-3xl mx-auto">
            <p class="text-gray-600 text-lg leading-relaxed font-medium">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
              <div class="p-8 pb-0 flex items-center gap-6 mb-6">
                <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
                  <img src="/src/assets/team/team-member (1).jpg" class="w-full h-full object-cover" alt="Expert" />
                </div>
                <div>
                  <h3 class="text-2xl font-black text-[#00338d]">John Doe</h3>
                  <p class="text-[#1e49e2] font-bold text-sm">Head of Pursuit, Partner</p>
                </div>
              </div>
              <div class="p-8 pt-0 flex flex-col gap-6">
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Area of Expertise</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Background</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
              <div class="p-8 pb-0 flex items-center gap-6 mb-6">
                <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
                  <img src="/src/assets/team/team-member (2).jpg" class="w-full h-full object-cover" alt="Expert" />
                </div>
                <div>
                  <h3 class="text-2xl font-black text-[#00338d]">Jane Doe</h3>
                  <p class="text-[#1e49e2] font-bold text-sm">Director, Strategy</p>
                </div>
              </div>
              <div class="p-8 pt-0 flex flex-col gap-6">
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Area of Expertise</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Background</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
              <div class="p-8 pb-0 flex items-center gap-6 mb-6">
                <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
                  <img src="/src/assets/team/team-member (3).jpg" class="w-full h-full object-cover" alt="Expert" />
                </div>
                <div>
                  <h3 class="text-2xl font-black text-[#00338d]">Michael Smith</h3>
                  <p class="text-[#1e49e2] font-bold text-sm">Chief Technology Officer</p>
                </div>
              </div>
              <div class="p-8 pt-0 flex flex-col gap-6">
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Area of Expertise</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <div>
                  <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-[#00b8f5] pl-3">Background</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-functional-team',
    category: 'Template Sections',
    label: 'Functional Team Grid',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><circle cx="20" cy="20" r="5" fill="#cbd5e1"/><circle cx="40" cy="20" r="5" fill="#cbd5e1"/><circle cx="60" cy="20" r="5" fill="#cbd5e1"/><circle cx="80" cy="20" r="5" fill="#cbd5e1"/><circle cx="20" cy="40" r="5" fill="#cbd5e1"/><circle cx="40" cy="40" r="5" fill="#cbd5e1"/><circle cx="60" cy="40" r="5" fill="#cbd5e1"/><circle cx="80" cy="40" r="5" fill="#cbd5e1"/></svg>',
    html: `
      <div id="functional-team" data-gjs-type="section" class="w-full py-24 bg-white" layout-mode="container">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-extrabold text-center text-[#0c233c] mb-20 tracking-tight">Our core functional team</h2>
          <div data-gjs-type="responsive-grid" data-cols-desktop="5" data-cols-tablet="3" data-cols-mobile="2" class="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-16 gap-x-8">
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (4).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (5).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (6).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (7).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (8).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (9).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (10).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (11).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (12).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/src/assets/team/team-member (13).jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-[#1e49e2] opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
];
