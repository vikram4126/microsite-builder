import { sectionsLibrary } from './Sections';

export const registerTemplates = (editor: any) => {
  const bm = editor.BlockManager;

  // Explicitly define sections for the Business Landing Page template
  const businessLandingPageSections = [
    'section-business-hero',
    'section-business-features',
    'section-business-services',
    'section-business-cta',
    'section-business-footer'
  ];

  const content = `
  ${businessLandingPageSections
    .map(id => sectionsLibrary.find(s => s.id === id)?.html || '')
    .filter(html => html !== '')
    .join('\n')}
`;

  bm.add('template-business', {
    label: 'Business Landing Page',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-secondary"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content
  });

  const template2Content = `
  <!-- 2. Header Hero -->
  <div id="header-hero" data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gray-900 py-20" layout-mode="container">
    <div class="container mx-auto text-white text-center">
      <div class="mx-auto flex flex-col items-center w-full">
        <h1 class="text-5xl font-display font-extrabold mb-6">Welcome to Our Platform</h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl">Discover how we can help you grow your business effortlessly with our powerful tools.</p>
        <a href="#" class="inline-block bg-secondary px-8 py-3 rounded-xl font-bold hover:bg-[#3b82f6] transition-colors">Get Started Now</a>
      </div>
    </div>
  </div>

  <!-- 3. Introduction -->
  <div id="introduction-section" data-gjs-type="section" data-gjs-name="Introduction" class="w-full py-20 bg-white" layout-mode="container">
    <div class="container mx-auto">
      <div class="mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
        <div class="flex-1">
           <h2 class="text-3xl font-display font-bold mb-4 text-gray-900">Who We Are</h2>
           <p class="text-gray-600 leading-relaxed mb-6">We are a passionate team dedicated to delivering excellence. Our solutions simplify workflows and maximize productivity for teams around the globe.</p>
           <a href="#" class="font-semibold text-secondary hover:underline">Learn more about our mission &rarr;</a>
        </div>
        <div class="flex-1">
           <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" class="rounded-2xl shadow-xl w-full" />
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Features Grid -->
  <div id="features-grid" data-gjs-type="section" data-gjs-name="Service Cards (Icons)" class="w-full bg-slate-50 py-20" layout-mode="container">
    <div class="container mx-auto">
      <div class="mx-auto flex flex-col w-full">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-display font-bold text-gray-900 mb-4">Everything you need</h2>
          <p class="text-gray-500">All the features your team requires to succeed.</p>
        </div>
        <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white w-full">
            <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🚀</div>
            <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p class="text-gray-500 text-sm">Optimized for speed to ensure your conversion rate stays high on all devices.</p>
          </div>
          <div class="p-6 border border-secondary rounded-xl shadow-md bg-white relative w-full">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
            <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">📊</div>
            <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Smart Analytics</h3>
            <p class="text-gray-500 text-sm">Track every click and view with built-in real-time tracking dashboard.</p>
          </div>
          <div class="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white w-full">
            <div class="w-12 h-12 bg-[#e0e7ff] text-secondary rounded-lg flex items-center justify-center mb-6 font-bold text-xl">🔗</div>
            <h3 class="text-xl font-display font-bold text-gray-900 mb-3">Seamless Integrations</h3>
            <p class="text-gray-500 text-sm">Connect with your favorite tools natively and securely via APIs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Team Profiles Grid -->
  <div id="expert-profiles" data-gjs-type="section" data-gjs-name="Team Profiles Grid" class="w-full py-20 bg-[#F5F7FA]" layout-mode="container">
    <div class="container mx-auto">
      <div class="text-center mb-20 max-w-3xl mx-auto">
        <p class="text-gray-600 text-lg leading-relaxed font-medium">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="p-8 pb-0 flex items-center gap-6 mb-6">
            <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
              <img src="/team-member/member-1.jpg" class="w-full h-full object-cover" alt="Expert" />
            </div>
            <div>
              <h3 class="text-2xl font-display font-black text-primary">John Doe</h3>
              <p class="text-secondary font-bold text-sm">Head of Pursuit, Partner</p>
            </div>
          </div>
          <div class="p-8 pt-0 flex flex-col gap-6">
            <div>
              <h4 class="text-xs font-display font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Area of Expertise</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div>
              <h4 class="text-xs font-display font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Background</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="p-8 pb-0 flex items-center gap-6 mb-6">
            <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
              <img src="/team-member/member-2.jpg" class="w-full h-full object-cover" alt="Expert" />
            </div>
            <div>
              <h3 class="text-2xl font-display font-black text-primary">Jane Doe</h3>
              <p class="text-secondary font-bold text-sm">Director, Strategy</p>
            </div>
          </div>
          <div class="p-8 pt-0 flex flex-col gap-6">
            <div>
              <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Area of Expertise</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div>
              <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Background</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="p-8 pb-0 flex items-center gap-6 mb-6">
            <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[#aceaff]/30">
              <img src="/team-member/member-3.jpg" class="w-full h-full object-cover" alt="Expert" />
            </div>
            <div>
              <h3 class="text-2xl font-display font-black text-primary">Michael Smith</h3>
              <p class="text-secondary font-bold text-sm">Chief Technology Officer</p>
            </div>
          </div>
          <div class="p-8 pt-0 flex flex-col gap-6">
            <div>
              <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Area of Expertise</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div>
              <h4 class="text-xs font-black text-[#0c233c] mb-3 uppercase tracking-widest border-l-4 border-accent pl-3">Background</h4>
              <p class="text-gray-500 text-sm leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- KPMG UK Footer -->
  <div data-gjs-type="section" data-gjs-name="Page Footer UK" class="w-full bg-slate-50 py-10 md:py-20 lg:py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
    <div class="container mx-auto">
      <!-- Responsive grid component trait -->
      <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand & Social Column -->
        <div class="flex flex-col gap-6 w-full items-start">
          <svg class="text-primary dark:text-white transition-colors" width="82" height="32" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m59.4297.0894165v14.8992835l-.1935.157-.1935.157-.1855.1649-.1773.1648-.1693.1649-.1693.1727-.1613.1727-.1612.1727v-16.2259835h-16.9549v13.5647835h-1.4028v-13.5647835h-16.9549v13.5883835h-1.4028v-13.5883835h-16.95487v15.4880835l-4.329426 14.0436h3.805376l1.91075-6.2172h.54823l3.16039 6.2172h4.59545l-3.0636-6.2172h6.9496l-1.9269 6.2172h4.1521l1.9027-6.2015h.9191v-.0157h1.306.1049 7.8445l-1.8382 6.2015h4.1924l1.7817-6.2015h1.8866l.0483 6.2015h3.5152l4.0391-6.2015h2.6444l-1.3705 6.2015h4.1278l1.3464-6.2015h2.3864l-.0161.3533.0086.3611.0161.3453.0322.3455.0242.1648.0241.1649.0322.1648.0323.1649.0402.1648.0403.157.0484.157.0483.157.0565.157.0565.1492.0644.1491.0646.1413.0726.1492.0725.1413.0807.1334.0807.1413.0887.1335.0967.1256.0968.1334.1048.1178.1048.1256.1048.1177.1209.1178.121.1099.1531.1256.1532.1256.1613.1177.1693.1099.1693.1099.1693.1021.1774.0863.1854.0942.1774.0785.1854.0784.1854.0707.1935.0707.1935.0628.1935.055.1935.0549.1935.0471.387.0863.395.0629.387.0549.387.0471.3789.0314.3709.0157.3628.0158h.3466l.4677-.0075.4676-.0074.4756-.0236.4757-.0236.4757-.0392.4757-.0393.4756-.0471.4757-.055.4837-.0628.4838-.0707.4837-.0785.4837-.0785.4838-.0863.4837-.0942.4837-.0942.4918-.1099 1.4351-5.6284h4.7084v-23.3145573h-16.9549zm-53.50905 22.7335835.02417-.0863.05649.0863zm14.77005-8.3524-.2419.7929-2.2574 7.3005-.0887.259h-7.4173l-.5724-1.1932 7.9897-7.952h-5.1357l-6.2482 6.5547 2.02361-6.5547h-3.78924v-12.999627h15.73743v13.792427zm4.3777 6.1701-.1209.0075-.1129.0074-.1209.0075h-.129-.1693-.1451l-.1371.0074h-.129l-1.0077-.0074.4676-1.6799.2176-.8321.5322-1.9547h.1693.1773l.1693-.0074h.1613.782l.4757.0074.4353.0158.1935.0074.1855.0157.1773.0236.1613.0236.1451.0235.1371.0393.129.0393.1128.0471.0968.0471.0887.0629.0806.0628.0645.0785.0403.0629.0322.0628.0322.0707.0242.0785.0161.0863.0085.0863v.0942.102l-.0085.1099-.0076.1099-.0242.1256-.0241.1256-.0726.2669-.0887.2983-.0887.2512-.0968.2434-.1048.2276-.1129.212-.0565.0942-.0564.0942-.0646.0942-.0726.0863-.0726.0863-.0726.0785-.0806.0785-.0807.0706-.0887.0629-.0887.0707-.0967.0549-.1049.0628-.1048.055-.1128.0471-.1129.0471-.1209.0393-.129.0471-.1371.0314-.1451.0314-.1451.0313-.1613.0236-.1612.0236-.1693.0157-.1774.0157zm11.4645 2.1823 1.6528-5.7305.0645 5.7305h-1.7172zm2.5155-9.1688h-3.9344l-2.7089 9.1688h-4.1763l.1935-.0784.1935-.0785.1855-.0785.1854-.0863.1774-.0864.1693-.102.1693-.0942.1612-.1021.1613-.1099.1531-.1099.1452-.1098.1451-.1257.137-.1177.129-.1335.129-.1256.121-.1413.1209-.1334.1129-.1492.1048-.1413.1048-.157.0967-.157.0887-.1569.0888-.1649.0806-.1727.0807-.1727.0726-.1727.0644-.1806.0645-.1884.0484-.1884.0565-.1884.0402-.2041.0403-.1962.0565-.314.0483-.2983.0323-.2826.0241-.2669.0086-.2669-.0086-.2434-.0075-.2433-.0323-.2277-.0322-.2119-.0565-.212-.0565-.1962-.0806-.1884-.0887-.1806-.0968-.1805-.1128-.1649-.129-.157-.1049-.1099-.1048-.1099-.1128-.0942-.121-.0863-.129-.0863-.129-.0785-.137-.0706-.1371-.0629-.1451-.0628-.1451-.0471-.1532-.0472-.1532-.0471-.1612-.0393-.1613-.0313-.1612-.0314-.1693-.0236-.3467-.0471-.3467-.0235-.3547-.0236-.3628-.0074h-.7256-.7175-.2258-.4031-.4999-.5563-.5401-.4596-.3225-.1209v-12.976108h15.7375v12.976108zm9.5617 9.1688h-2.3622l3.5796-5.495zm8.7959-8.9097-.0085 3.1792-.2015.2748-.1855.2826-.1854.2826-.1693.2826-.1613.2826-.1612.2904-.1371.2826-.137.2826-.129.2748-.1129.2826-.1129.2747-.0967.2669-.0887.2669-.0807.2591-.0726.2512-.0645.2512-.0403.1648-.0403.1727-.0402.1649-.0323.1727-.0322.1648-.0242.1649-.0241.1648-.0161.1727h-2.3139l1.9753-9.1452-6.6594-.0075-5.958 9.1531h-.4354v-22.144827h15.7443v13.235127zm9.0781 12.6542-.3305.0549-.3387.0471-.3386.0471-.3305.0393-.3306.0314-.3305.0236-.3225.0157h-.3225-.2096l-.2096-.0074-.2016-.0158-.2015-.0235-.1935-.0314-.1855-.0314-.1854-.0393-.1774-.0471-.1693-.0549-.1693-.055-.1612-.0706-.1532-.0707-.1532-.0863-.1451-.0863-.1371-.0942-.129-.0942-.129-.1099-.1128-.1178-.1129-.1177-.1048-.1335-.0968-.1334-.0887-.1492-.0806-.1491-.0807-.157-.0645-.1649-.0565-.1805-.0483-.1806-.0484-.1884-.0322-.1962-.0242-.2041-.0161-.212-.0085-.2198h7.3366l-.8062 3.1636zm9.3038-3.7445h-3.9666l.653-2.5591h-7.9493l-.6531 2.5591h-3.8456v-.5259l.0483-.2198.0403-.2198.0483-.2355.0483-.2355.0726-.2591.0726-.259.0807-.2591.0887-.2512.0967-.2512.1049-.2512.1128-.2433.1129-.2434.129-.2433.129-.2277.1371-.2355.1531-.2198.1532-.2198.1532-.2119.1693-.2041.1774-.1963.1854-.1884.1854-.1727.2016-.1727.2015-.1648.2097-.1492.2257-.1413.2258-.1256.2338-.1177.2418-.1099.2499-.0942.258-.0785.2661-.0629.2741-.0549.2822-.0393.2902-.0235.2983-.0075.2338.0075.2338.0157.2338.0314.2258.0471.1129.0314.1048.0313.1048.0314.0967.0471.0968.0393.0967.055.0887.0549.0887.0549.0807.0707.0806.0707.0726.0706.0726.0863.0646.0785.0565.0942.0483.1021.0483.102.0403.1099.0322.1178.0242.1177.0242.1335.0085.1334v.1413.1492l-.0161.157h4.7406l.0726-.3219.0645-.3689.0322-.1963.0162-.2119.0161-.212v-.2198l-.0076-.2276-.0242-.2355-.0241-.1099-.0162-.1178-.0322-.1177-.0322-.1178-.0403-.1256-.0403-.1177-.0483-.1178-.0565-.1177-.0565-.1178-.0726-.1177-.0726-.1178-.0806-.1177-.0968-.1256-.1048-.1178-.1048-.1177-.1129-.1099-.1209-.1099-.129-.1021-.129-.0942-.137-.0942-.1452-.0942-.1451-.0785-.1532-.0784-.1612-.0785-.1612-.0707-.1694-.0707-.1773-.0628-.1774-.0629-.1774-.0549-.1935-.0471-.1854-.0471-.2015-.0471-.2016-.0393-.2016-.0393-.2096-.0314-.2177-.0236-.4434-.0471-.4515-.0393-.4756-.0157-.4838-.0074-.3628.0074-.3789.0075-.395.0235-.4112.0314-.4273.0471-.4354.0549-.4434.0707-.4515.0942-.2257.0471-.2338.0549-.2258.0629-.2338.0628-.2338.0707-.2338.0785-.2338.0785-.2257.0863-.2338.0942-.2338.102-.2258.1021-.2338.1099-.2257.1177-.2258.1256-.2257.1256-.2258.1413v-13.894463h15.7617v22.144863z" fill="currentColor"/>
          </svg>
          <p class="text-slate-600 dark:text-white leading-relaxed font-medium">
            Leading the future of digital business with specialized industry insights and strategic technology partnerships.
          </p>
          <div class="flex gap-4">
            <a href="https://www.linkedin.com/company/kpmg-uk/" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="https://x.com/kpmguk" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="https://www.youtube.com/user/KPMGUK" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
        </div>
  
        <!-- About Us Column -->
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">About us</h4>
          <a href="https://kpmg.com/uk/en/about.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">About us</a>
          <a href="https://kpmg.com/uk/en/misc/contact-kpmg.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Contact us</a>
          <a href="https://kpmg.com/uk/en/about/offices.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Offices</a>
          <a href="https://kpmg.com/uk/en/misc/working-with-suppliers.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Suppliers</a>
        </div>
  
        <!-- Explore Column -->
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">Explore</h4>
          <a href="https://kpmg.com/uk/en/blc.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Board Leadership Centre</a>
          <a href="https://kpmg.com/uk/en/careers.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Careers</a>
          <a href="https://kpmg.com/uk/en/about/our-impact.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Our impact</a>
          <a href="https://kpmg.com/uk/en/media/press-releases.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Press releases</a>
        </div>
  
        <!-- Services Column -->
        <div class="flex flex-col gap-4 w-full">
          <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">Services</h4>
          <a href="https://kpmg.com/uk/en/services/advisory.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Advisory</a>
          <a href="https://kpmg.com/uk/en/services/audit.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Audit</a>
          <a href="https://kpmg.com/uk/en/services/legal.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Legal</a>
          <a href="https://kpmg.com/uk/en/services/tax.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Tax</a>
        </div>
        
      </div>
  
      <!-- Bottom Row -->
      <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-6 text-sm text-slate-500 font-medium w-full">
        <div class="flex flex-wrap justify-center gap-6 items-center">
          <a href="https://kpmg.com/uk/en/misc/legal.html" class="hover:text-primary dark:hover:text-white transition-colors">Legal</a>
          <a href="https://kpmg.com/uk/en/misc/privacy.html" class="hover:text-primary dark:hover:text-white transition-colors">Privacy</a>
          <a href="https://kpmg.com/uk/en/misc/cookies.html" class="hover:text-primary dark:hover:text-white transition-colors">Cookies</a>
          <a href="https://kpmg.com/uk/en/misc/help.html" class="hover:text-primary dark:hover:text-white transition-colors">Help</a>
          <a href="https://kpmg.com/uk/en/misc/accessibility.html" class="hover:text-primary dark:hover:text-white transition-colors">Accessibility</a>
          <a href="https://kpmg.com/uk/en/misc/glossary.html" class="hover:text-primary dark:hover:text-white transition-colors">Glossary</a>
          <a href="https://kpmg.com/uk/en/misc/regulatory-information.html" class="hover:text-primary dark:hover:text-white transition-colors">Modern slavery statement</a>
        </div>
        <div class="space-y-2 max-w-4xl mx-auto">
          <p>&copy; \${new Date().getFullYear()} KPMG LLP a UK limited liability partnership and a member firm of the KPMG global organisation of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.</p>
          <p>For more detail about the structure of the KPMG global organisation please visit <a href="https://kpmg.com/governance" target="_blank" class="text-primary dark:text-white hover:underline">https://kpmg.com/governance</a> opens in a new tab.</p>
        </div>
      </div>
    </div>
  </div>
`;

  bm.add('template-2', {
    label: 'Template-2',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-secondary"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content: template2Content
  });

  const customTemplateSections = [
    'section-header-left-blue-bg',
    'section-intro-letter',
    'section-data-visualization-stats',
    'section-case-study-details',
    'section-business-features',
    'section-business-cta',
    'section-business-footer'
  ];

  const template3Content = customTemplateSections
    .map(id => sectionsLibrary.find(s => s.id === id)?.html?.trim() || '')
    .filter(html => html !== '')
    .join('');

  bm.add('template-custom', {
    label: 'Custom Landing Page',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-primary"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content: template3Content
  });

  const template4Sections = [
    'section-business-hero',
    'section-intro-letter',
    'section-business-services',
    'section-case-studies-numbered-questions',
    'section-timeline-horizontal',
    'section-business-cta',
    'section-contact-meet-team',
    'section-business-footer'
  ];

  const template4Content = template4Sections
    .map(id => sectionsLibrary.find(s => s.id === id)?.html?.trim() || '')
    .filter(html => html !== '')
    .join('');

  bm.add('template-4', {
    label: 'Custom Landing Page 2',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-secondary"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content: template4Content
  });

  const template5Sections = [
    'section-header-video-banner',
    'section-intro-letter',
    'section-business-services',
    'section-case-studies-cards-quote',
    'section-timeline-horizontal',
    'section-tabs-vertical',
    'section-cta-explore-findings',
    'section-functional-team',
    'section-business-footer'
  ];

  const template5Content = template5Sections
    .map(id => sectionsLibrary.find(s => s.id === id)?.html?.trim() || '')
    .filter(html => html !== '')
    .join('');

  bm.add('template-5', {
    label: 'Custom Landing Page 3',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-purple-500"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content: template5Content
  });
};
