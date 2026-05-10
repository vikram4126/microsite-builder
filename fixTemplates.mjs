import fs from 'fs';
import path from 'path';

// 1. Use the attached rasterized logo image over Wikimedia for precision matching
const kpmgLogoCode = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/KPMG_logo.svg/1024px-KPMG_logo.svg.png" alt="KPMG Logo" class="h-8 w-auto inline-block" />';

const businessTemplateCode = `
<!-- Navbar with Brand Colors (Fix for B&W preview) -->
<div id="business-nav" data-gjs-type="default" class="w-full bg-white dark:bg-slate-900 border-b-[3px] border-accent sticky top-0 z-50 shadow-sm" layout-mode="container">
  <div class="container mx-auto">
    <div class="flex flex-wrap items-center justify-between p-4 lg:py-4 lg:px-6">
      <a href="#" class="block">${kpmgLogoCode}</a>
      <input type="checkbox" id="bus-nav-toggle" class="hidden peer" />
      <label for="bus-nav-toggle" class="md:hidden cursor-pointer p-2 text-slate-600 dark:text-slate-300">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" class="fill-none"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </label>
      <nav class="hidden peer-checked:flex flex-col w-full md:w-auto md:flex md:flex-row items-center gap-6 mt-4 md:mt-0 font-medium text-sm">
        <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Home</a>
        <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Services</a>
        <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">Features</a>
        <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-accent transition-colors">About</a>
        <a href="#" class="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-lg shadow transition-all">Get Started</a>
      </nav>
    </div>
  </div>
</div>

<!-- Hero Section with subtle colored gradient background (Fix for B&W preview) -->
<div id="business-hero" data-gjs-type="default" class="w-full bg-gradient-to-b from-accent/10 to-transparent dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32 relative overflow-hidden" layout-mode="container">
  <div class="container mx-auto">
    <!-- Wrap interior in standard flex layout -->
    <div class="flex flex-col md:flex-row gap-12 items-center px-4 sm:px-0">
      <div class="flex-1 flex flex-col gap-8 z-10 w-full object-cover">
        <div>
          <span class="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent mb-6 border border-accent/20 shadow-sm">New: Enterprise Cloud 2.0</span>
          <h1 class="text-primary dark:text-white text-5xl lg:text-7xl font-black leading-tight tracking-tight">
            Transform Your Business with <span class="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Modern Solutions</span>
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

<!-- Features (Using responsive-grid trait method) -->
<div id="business-features" data-gjs-type="default" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-primary dark:text-white text-4xl font-black mb-4 tracking-tight">Our Core Capabilities</h2>
      <p class="text-slate-600 dark:text-slate-400 text-lg">Robust infrastructure designed to solve complex challenges seamlessly and efficiently.</p>
    </div>
    <!-- Replaced raw tailwind grid with native GrapesJS responsive-grid component -->
    <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-3 gap-8">
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

<!-- Services Grid -->
<div id="business-services" data-gjs-type="default" class="w-full py-24 bg-slate-50 dark:bg-slate-800/50" layout-mode="container">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div class="max-w-xl">
        <h2 class="text-4xl font-black text-primary dark:text-white mb-4 tracking-tight">Professional Services</h2>
        <p class="text-slate-600 dark:text-slate-400 text-lg">Tailored expertise to help your business navigate digital transformation.</p>
      </div>
      <a href="#" class="text-accent font-bold hover:underline inline-flex items-center gap-2">View All Services &rarr;</a>
    </div>
    <!-- Responsive grid component trait -->
    <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-3 gap-8">
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

<!-- CTA Block (Refactored to native Tailwind gradient instead of blurred absolute shapes) -->
<div id="business-cta" data-gjs-type="default" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
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

<!-- KPMG Footer -->
<div id="business-footer" data-gjs-type="default" class="w-full bg-slate-50 py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Responsive grid component trait -->
    <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-4 gap-12 mb-16">
      
      <!-- Brand & Social Column -->
      <div class="flex flex-col gap-6 w-full">
        ${kpmgLogoCode}
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
    <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium w-full">
      <p>&copy; 2026 KPMG International Cooperative. All rights reserved.</p>
      <div class="flex flex-wrap gap-6 items-center">
        <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-primary dark:hover:text-white transition-colors">Cookies Settings</a>
      </div>
    </div>
  </div>
</div>
`;

const templatesTsCode = "export const registerTemplates = (editor: any) => {\n" +
  "  const bm = editor.BlockManager;\n" +
  "\n" +
  "  bm.add('template-business', {\n" +
  "    label: '<div class=\"flex flex-col items-center gap-2 py-2\"><i class=\"fa fa-briefcase text-2xl\"></i><span class=\"text-xs text-center\">Business Landing Page</span></div>',\n" +
  "    category: 'Full Page Templates',\n" +
  "    content: `" + businessTemplateCode + "`\n" +
  "  });\n" +
  "};\n";

fs.writeFileSync(path.join(process.cwd(), 'src/components/builder/Templates.ts'), templatesTsCode);
console.log('Successfully updated Templates.ts with proper block architecture.');
