export interface SectionDef {
  id: string;
  category: string;
  label: string;
  html: string;
  svg: string;
}

export const sectionsLibrary: SectionDef[] = [
  {
    id: 'section-header-center-bg',
    category: 'Header',
    label: 'Header Center Image',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#00338d" opacity="0.8"/><circle cx="50" cy="30" r="15" fill="white" opacity="0.2"/><rect x="35" y="25" width="30" height="2" fill="white"/><rect x="40" y="32" width="20" height="4" fill="var(--color-secondary)"/></svg>',
    html: `
      <style>
        #header-1-center {
          background-image: url('${window.location.origin}/background/background-1.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-1-center" data-gjs-type="section" data-gjs-name="Header Center Image" class="w-full relative overflow-hidden py-[100px] bg-cover bg-center bg-no-repeat bg-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col items-center text-center max-w-4xl mx-auto mix-blend-difference drop-shadow-md">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white mb-4 tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30">
              OVERLINE
            </span>
            <h1 class="text-white text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Inspire trust and deliver impact
            </h1>
            <p class="text-white text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-header-left-blue-bg',
    category: 'Header',
    label: 'Header Left Blue Gradient',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="url(#grad2)"/><rect x="10" y="25" width="40" height="2" fill="white"/><rect x="10" y="32" width="25" height="4" fill="var(--color-secondary)"/><defs><linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#00338d"/><stop offset="100%" stop-color="#00338d" stop-opacity="0"/></linearGradient></defs></svg>',
    html: `
      <style>
        #header-2-left-blue {
          background-image: url('${window.location.origin}/background/background-5.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-2-left-blue" data-gjs-type="section" data-gjs-name="Header Left Blue Gradient" class="w-full relative overflow-hidden py-[100px] bg-cover bg-right bg-no-repeat bg-[#00338d]" layout-mode="container">
        <div class="absolute inset-0 z-0 pointer-events-none" style="background: linear-gradient(90deg, rgba(0, 51, 141, 1) 0%, rgba(255, 255, 255, 0) 100%);" data-gjs-hoverable="false" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-removable="false"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white mb-4 tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30">
              OVERLINE
            </span>
            <h1 class="text-white text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              What we stand for
            </h1>
            <p class="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Duis aute irure dolor.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-header-left-white-bg',
    category: 'Header',
    label: 'Header Left White Gradient',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="url(#grad3)"/><rect x="10" y="25" width="40" height="2" fill="#00338d"/><rect x="10" y="32" width="25" height="4" fill="var(--color-secondary)"/><defs><linearGradient id="grad3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs></svg>',
    html: `
      <style>
        #header-3-left-white {
          background-image: url('${window.location.origin}/background/background-3.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-3-left-white" data-gjs-type="section" data-gjs-name="Header Left White Gradient" class="w-full relative overflow-hidden py-[100px] bg-cover bg-right bg-no-repeat bg-white" layout-mode="container">
        <div class="absolute inset-0 z-0 pointer-events-none" style="background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);" data-gjs-hoverable="false" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-removable="false"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              OVERLINE
            </span>
            <h1 class="text-[var(--color-primary)] text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Inspire trust and deliver impact
            </h1>
            <p class="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-header-left-solid',
    category: 'Header',
    label: 'Header Left Solid White',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#ffffff"/><rect x="10" y="25" width="40" height="2" fill="#00338d"/><rect x="10" y="32" width="25" height="4" fill="var(--color-secondary)"/></svg>',
    html: `
      <div id="header-4-left-solid" data-gjs-type="section" data-gjs-name="Header Left Solid White" class="w-full relative overflow-hidden py-[100px] bg-white" layout-mode="container">
        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-[var(--color-secondary)] mb-4 tracking-widest uppercase bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20">
              OVERLINE
            </span>
            <h1 class="text-[var(--color-primary)] text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              What we stand for
            </h1>
            <p class="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Duis aute irure dolor.
            </p>
          </div>
        </div>
      </div>
    `
  },


  {
    id: 'section-business-nav',
    category: 'Full Page Templates',
    label: 'Business Navbar',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="20" fill="#f8fafc"/><rect x="5" y="8" width="15" height="4" rx="2" fill="var(--color-primary)"/><rect x="85" y="6" width="10" height="7" rx="2" fill="var(--color-secondary)"/></svg>',
    html: `
      <!-- Navbar with Brand Colors (Fix for B&W preview) -->
      <div id="business-nav" data-gjs-type="section" data-gjs-name="Navbar" class="w-full bg-white dark:bg-dark border-b-[3px] border-accent shadow-sm transition-colors" layout-mode="container">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center justify-between p-4 lg:py-4 lg:px-6">
            <a href="#" class="block">
              <svg class="text-primary dark:text-white transition-colors" width="82" height="32" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m59.4297.0894165v14.8992835l-.1935.157-.1935.157-.1855.1649-.1773.1648-.1693.1649-.1693.1727-.1613.1727-.1612.1727v-16.2259835h-16.9549v13.5647835h-1.4028v-13.5647835h-16.9549v13.5883835h-1.4028v-13.5883835h-16.95487v15.4880835l-4.329426 14.0436h3.805376l1.91075-6.2172h.54823l3.16039 6.2172h4.59545l-3.0636-6.2172h6.9496l-1.9269 6.2172h4.1521l1.9027-6.2015h.9191v-.0157h1.306.1049 7.8445l-1.8382 6.2015h4.1924l1.7817-6.2015h1.8866l.0483 6.2015h3.5152l4.0391-6.2015h2.6444l-1.3705 6.2015h4.1278l1.3464-6.2015h2.3864l-.0161.3533.0086.3611.0161.3453.0322.3455.0242.1648.0241.1649.0322.1648.0323.1649.0402.1648.0403.157.0484.157.0483.157.0565.157.0565.1492.0644.1491.0646.1413.0726.1492.0725.1413.0807.1334.0807.1413.0887.1335.0967.1256.0968.1334.1048.1178.1048.1256.1048.1177.1209.1178.121.1099.1531.1256.1532.1256.1613.1177.1693.1099.1693.1099.1693.1021.1774.0863.1854.0942.1774.0785.1854.0784.1854.0707.1935.0707.1935.0628.1935.055.1935.0549.1935.0471.387.0863.395.0629.387.0549.387.0471.3789.0314.3709.0157.3628.0158h.3466l.4677-.0075.4676-.0074.4756-.0236.4757-.0236.4757-.0392.4757-.0393.4756-.0471.4757-.055.4837-.0628.4838-.0707.4837-.0785.4837-.0785.4838-.0863.4837-.0942.4837-.0942.4918-.1099 1.4351-5.6284h4.7084v-23.3145573h-16.9549zm-53.50905 22.7335835.02417-.0863.05649.0863zm14.77005-8.3524-.2419.7929-2.2574 7.3005-.0887.259h-7.4173l-.5724-1.1932 7.9897-7.952h-5.1357l-6.2482 6.5547 2.02361-6.5547h-3.78924v-12.999627h15.73743v13.792427zm4.3777 6.1701-.1209.0075-.1129.0074-.1209.0075h-.129-.1693-.1451l-.1371.0074h-.129l-1.0077-.0074.4676-1.6799.2176-.8321.5322-1.9547h.1693.1773l.1693-.0074h.1613.782l.4757.0074.4353.0158.1935.0074.1855.0157.1773.0236.1613.0236.1451.0235.1371.0393.129.0393.1128.0471.0968.0471.0887.0629.0806.0628.0645.0785.0403.0629.0322.0628.0322.0707.0242.0785.0161.0863.0085.0863v.0942.102l-.0085.1099-.0076.1099-.0242.1256-.0241.1256-.0726.2669-.0887.2983-.0887.2512-.0968.2434-.1048.2276-.1129.212-.0565.0942-.0564.0942-.0646.0942-.0726.0863-.0726.0863-.0726.0785-.0806.0785-.0807.0706-.0887.0629-.0887.0707-.0967.0549-.1049.0628-.1048.055-.1128.0471-.1129.0471-.1209.0393-.129.0471-.1371.0314-.1451.0314-.1451.0313-.1613.0236-.1612.0236-.1693.0157-.1774.0157zm11.4645 2.1823 1.6528-5.7305.0645 5.7305h-1.7172zm2.5155-9.1688h-3.9344l-2.7089 9.1688h-4.1763l.1935-.0784.1935-.0785.1855-.0785.1854-.0863.1774-.0864.1693-.102.1693-.0942.1612-.1021.1613-.1099.1531-.1099.1452-.1098.1451-.1257.137-.1177.129-.1335.129-.1256.121-.1413.1209-.1334.1129-.1492.1048-.1413.1048-.157.0967-.157.0887-.1569.0888-.1649.0806-.1727.0807-.1727.0726-.1727.0644-.1806.0645-.1884.0484-.1884.0565-.1884.0402-.2041.0403-.1962.0565-.314.0483-.2983.0323-.2826.0241-.2669.0086-.2669-.0086-.2434-.0075-.2433-.0323-.2277-.0322-.2119-.0565-.212-.0565-.1962-.0806-.1884-.0887-.1806-.0968-.1805-.1128-.1649-.129-.157-.1049-.1099-.1048-.1099-.1128-.0942-.121-.0863-.129-.0863-.129-.0785-.137-.0706-.1371-.0629-.1451-.0628-.1451-.0471-.1532-.0472-.1532-.0471-.1612-.0393-.1613-.0313-.1612-.0314-.1693-.0236-.3467-.0471-.3467-.0235-.3547-.0236-.3628-.0074h-.7256-.7175-.2258-.4031-.4999-.5563-.5401-.4596-.3225-.1209v-12.976108h15.7375v12.976108zm9.5617 9.1688h-2.3622l3.5796-5.495zm8.7959-8.9097-.0085 3.1792-.2015.2748-.1855.2826-.1854.2826-.1693.2826-.1613.2826-.1612.2904-.1371.2826-.137.2826-.129.2748-.1129.2826-.1129.2747-.0967.2669-.0887.2669-.0807.2591-.0726.2512-.0645.2512-.0403.1648-.0403.1727-.0402.1649-.0323.1727-.0322.1648-.0242.1649-.0241.1648-.0161.1727h-2.3139l1.9753-9.1452-6.6594-.0075-5.958 9.1531h-.4354v-22.144827h15.7455v13.235127zm9.0781 12.6542-.3305.0549-.3387.0471-.3386.0471-.3305.0393-.3306.0314-.3305.0236-.3225.0157h-.3225-.2096l-.2096-.0074-.2016-.0158-.2015-.0235-.1935-.0314-.1855-.0314-.1854-.0393-.1774-.0471-.1693-.0549-.1693-.055-.1612-.0706-.1532-.0707-.1532-.0863-.1451-.0863-.1371-.0942-.129-.0942-.129-.1099-.1128-.1178-.1129-.1177-.1048-.1335-.0968-.1334-.0887-.1492-.0806-.1491-.0807-.157-.0645-.1649-.0565-.1805-.0483-.1806-.0484-.1884-.0322-.1962-.0242-.2041-.0161-.212-.0085-.2198h7.3366l-.8062 3.1636zm9.3038-3.7445h-3.9666l.653-2.5591h-7.9493l-.6531 2.5591h-3.8456v-.5259l.0483-.2198.0403-.2198.0483-.2355.0483-.2355.0726-.2591.0726-.259.0807-.2591.0887-.2512.0967-.2512.1049-.2512.1128-.2433.1129-.2434.129-.2433.129-.2277.1371-.2355.1531-.2198.1532-.2198.1532-.2119.1693-.2041.1774-.1963.1854-.1884.1854-.1727.2016-.1727.2015-.1648.2097-.1492.2257-.1413.2258-.1256.2338-.1177.2418-.1099.2499-.0942.258-.0785.2661-.0629.2741-.0549.2822-.0393.2902-.0235.2983-.0075.2338.0075.2338.0157.2338.0314.2258.0471.1129.0314.1048.0313.1048.0314.0967.0471.0968.0393.0967.055.0887.0549.0887.0549.0807.0707.0806.0707.0726.0706.0726.0863.0646.0785.0565.0942.0483.1021.0483.102.0403.1099.0322.1178.0242.1177.0242.1335.0085.1334v.1413.1492l-.0161.157h4.7406l.0726-.3219.0645-.3689.0322-.1963.0162-.2119.0161-.212v-.2198l-.0076-.2276-.0242-.2355-.0241-.1099-.0162-.1178-.0322-.1177-.0322-.1178-.0403-.1256-.0403-.1177-.0483-.1178-.0565-.1177-.0565-.1178-.0726-.1177-.0726-.1178-.0806-.1177-.0968-.1256-.1048-.1178-.1048-.1177-.1129-.1099-.1209-.1099-.129-.1021-.129-.0942-.137-.0942-.1452-.0942-.1451-.0785-.1532-.0784-.1612-.0785-.1612-.0707-.1694-.0707-.1773-.0628-.1774-.0629-.1774-.0549-.1935-.0471-.1854-.0471-.2015-.0471-.2016-.0393-.2016-.0393-.2096-.0314-.2177-.0236-.4434-.0471-.4515-.0393-.4756-.0157-.4838-.0074-.3628.0074-.3789.0075-.395.0235-.4112.0314-.4273.0471-.4354.0549-.4434.0707-.4515.0942-.2257.0471-.2338.0549-.2258.0629-.2338.0628-.2338.0707-.2338.0785-.2338.0785-.2257.0863-.2338.0942-.2338.102-.2258.1021-.2338.1099-.2257.1177-.2258.1256-.2257.1256-.2258.1413v-13.894463h15.7617v22.144863z" fill="currentColor"/>
              </svg>
            </a>
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
      <div id="business-hero" data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gradient-to-b from-accent/10 to-transparent dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32 relative overflow-hidden" layout-mode="container">
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
      <div id="business-features" data-gjs-type="section" data-gjs-name="Features List" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
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
      <div id="business-services" data-gjs-type="section" data-gjs-name="Services Grid" class="w-full py-24 bg-slate-50 dark:bg-slate-800/50" layout-mode="container">
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
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" class="h-56 w-full object-cover" alt="Security" />
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
      <div id="business-cta" data-gjs-type="section" data-gjs-name="Call to Action" class="w-full py-24 bg-white dark:bg-background-dark" layout-mode="container">
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
      <div id="business-footer" data-gjs-type="section" data-gjs-name="Page Footer" class="w-full bg-slate-50 py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <!-- Brand & Social Column -->
            <div class="flex flex-col gap-6 w-full items-start">
              <svg class="text-primary dark:text-white transition-colors" width="82" height="32" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m59.4297.0894165v14.8992835l-.1935.157-.1935.157-.1855.1649-.1773.1648-.1693.1649-.1693.1727-.1613.1727-.1612.1727v-16.2259835h-16.9549v13.5647835h-1.4028v-13.5647835h-16.9549v13.5883835h-1.4028v-13.5883835h-16.95487v15.4880835l-4.329426 14.0436h3.805376l1.91075-6.2172h.54823l3.16039 6.2172h4.59545l-3.0636-6.2172h6.9496l-1.9269 6.2172h4.1521l1.9027-6.2015h.9191v-.0157h1.306.1049 7.8445l-1.8382 6.2015h4.1924l1.7817-6.2015h1.8866l.0483 6.2015h3.5152l4.0391-6.2015h2.6444l-1.3705 6.2015h4.1278l1.3464-6.2015h2.3864l-.0161.3533.0086.3611.0161.3453.0322.3455.0242.1648.0241.1649.0322.1648.0323.1649.0402.1648.0403.157.0484.157.0483.157.0565.157.0565.1492.0644.1491.0646.1413.0726.1492.0725.1413.0807.1334.0807.1413.0887.1335.0967.1256.0968.1334.1048.1178.1048.1256.1048.1177.1209.1178.121.1099.1531.1256.1532.1256.1613.1177.1693.1099.1693.1099.1693.1021.1774.0863.1854.0942.1774.0785.1854.0784.1854.0707.1935.0707.1935.0628.1935.055.1935.0549.1935.0471.387.0863.395.0629.387.0549.387.0471.3789.0314.3709.0157.3628.0158h.3466l.4677-.0075.4676-.0074.4756-.0236.4757-.0236.4757-.0392.4757-.0393.4756-.0471.4757-.055.4837-.0628.4838-.0707.4837-.0785.4837-.0785.4838-.0863.4837-.0942.4837-.0942.4918-.1099 1.4351-5.6284h4.7084v-23.3145573h-16.9549zm-53.50905 22.7335835.02417-.0863.05649.0863zm14.77005-8.3524-.2419.7929-2.2574 7.3005-.0887.259h-7.4173l-.5724-1.1932 7.9897-7.952h-5.1357l-6.2482 6.5547 2.02361-6.5547h-3.78924v-12.999627h15.73743v13.792427zm4.3777 6.1701-.1209.0075-.1129.0074-.1209.0075h-.129-.1693-.1451l-.1371.0074h-.129l-1.0077-.0074.4676-1.6799.2176-.8321.5322-1.9547h.1693.1773l.1693-.0074h.1613.782l.4757.0074.4353.0158.1935.0074.1855.0157.1773.0236.1613.0236.1451.0235.1371.0393.129.0393.1128.0471.0968.0471.0887.0629.0806.0628.0645.0785.0403.0629.0322.0628.0322.0707.0242.0785.0161.0863.0085.0863v.0942.102l-.0085.1099-.0076.1099-.0242.1256-.0241.1256-.0726.2669-.0887.2983-.0887.2512-.0968.2434-.1048.2276-.1129.212-.0565.0942-.0564.0942-.0646.0942-.0726.0863-.0726.0863-.0726.0785-.0806.0785-.0807.0706-.0887.0629-.0887.0707-.0967.0549-.1049.0628-.1048.055-.1128.0471-.1129.0471-.1209.0393-.129.0471-.1371.0314-.1451.0314-.1451.0313-.1613.0236-.1612.0236-.1693.0157-.1774.0157zm11.4645 2.1823 1.6528-5.7305.0645 5.7305h-1.7172zm2.5155-9.1688h-3.9344l-2.7089 9.1688h-4.1763l.1935-.0784.1935-.0785.1855-.0785.1854-.0863.1774-.0864.1693-.102.1693-.0942.1612-.1021.1613-.1099.1531-.1099.1452-.1098.1451-.1257.137-.1177.129-.1335.129-.1256.121-.1413.1209-.1334.1129-.1492.1048-.1413.1048-.157.0967-.157.0887-.1569.0888-.1649.0806-.1727.0807-.1727.0726-.1727.0644-.1806.0645-.1884.0484-.1884.0565-.1884.0402-.2041.0403-.1962.0565-.314.0483-.2983.0323-.2826.0241-.2669.0086-.2669-.0086-.2434-.0075-.2433-.0323-.2277-.0322-.2119-.0565-.212-.0565-.1962-.0806-.1884-.0887-.1806-.0968-.1805-.1128-.1649-.129-.157-.1049-.1099-.1048-.1099-.1128-.0942-.121-.0863-.129-.0863-.129-.0785-.137-.0706-.1371-.0629-.1451-.0628-.1451-.0471-.1532-.0472-.1532-.0471-.1612-.0393-.1613-.0313-.1612-.0314-.1693-.0236-.3467-.0471-.3467-.0235-.3547-.0236-.3628-.0074h-.7256-.7175-.2258-.4031-.4999-.5563-.5401-.4596-.3225-.1209v-12.976108h15.7375v12.976108zm9.5617 9.1688h-2.3622l3.5796-5.495zm8.7959-8.9097-.0085 3.1792-.2015.2748-.1855.2826-.1854.2826-.1693.2826-.1613.2826-.1612.2904-.1371.2826-.137.2826-.129.2748-.1129.2826-.1129.2747-.0967.2669-.0887.2669-.0807.2591-.0726.2512-.0645.2512-.0403.1648-.0403.1727-.0402.1649-.0323.1727-.0322.1648-.0242.1649-.0241.1648-.0161.1727h-2.3139l1.9753-9.1452-6.6594-.0075-5.958 9.1531h-.4354v-22.144827h15.7443v13.235127zm9.0781 12.6542-.3305.0549-.3387.0471-.3386.0471-.3305.0393-.3306.0314-.3305.0236-.3225.0157h-.3225-.2096l-.2096-.0074-.2016-.0158-.2015-.0235-.1935-.0314-.1855-.0314-.1854-.0393-.1774-.0471-.1693-.0549-.1693-.055-.1612-.0706-.1532-.0707-.1532-.0863-.1451-.0863-.1371-.0942-.129-.0942-.129-.1099-.1128-.1178-.1129-.1177-.1048-.1335-.0968-.1334-.0887-.1492-.0806-.1491-.0807-.157-.0645-.1649-.0565-.1805-.0483-.1806-.0484-.1884-.0322-.1962-.0242-.2041-.0161-.212-.0085-.2198h7.3366l-.8062 3.1636zm9.3038-3.7445h-3.9666l.653-2.5591h-7.9493l-.6531 2.5591h-3.8456v-.5259l.0483-.2198.0403-.2198.0483-.2355.0483-.2355.0726-.2591.0726-.259.0807-.2591.0887-.2512.0967-.2512.1049-.2512.1128-.2433.1129-.2434.129-.2433.129-.2277.1371-.2355.1531-.2198.1532-.2198.1532-.2119.1693-.2041.1774-.1963.1854-.1884.1854-.1727.2016-.1727.2015-.1648.2097-.1492.2257-.1413.2258-.1256.2338-.1177.2418-.1099.2499-.0942.258-.0785.2661-.0629.2741-.0549.2822-.0393.2902-.0235.2983-.0075.2338.0075.2338.0157.2338.0314.2258.0471.1129.0314.1048.0313.1048.0314.0967.0471.0968.0393.0967.055.0887.0549.0887.0549.0807.0707.0806.0707.0726.0706.0726.0863.0646.0785.0565.0942.0483.1021.0483.102.0403.1099.0322.1178.0242.1177.0242.1335.0085.1334v.1413.1492l-.0161.157h4.7406l.0726-.3219.0645-.3689.0322-.1963.0162-.2119.0161-.212v-.2198l-.0076-.2276-.0242-.2355-.0241-.1099-.0162-.1178-.0322-.1177-.0322-.1178-.0403-.1256-.0403-.1177-.0483-.1178-.0565-.1177-.0565-.1178-.0726-.1177-.0726-.1178-.0806-.1177-.0968-.1256-.1048-.1178-.1048-.1177-.1129-.1099-.1209-.1099-.129-.1021-.129-.0942-.137-.0942-.1452-.0942-.1451-.0785-.1532-.0784-.1612-.0785-.1612-.0707-.1694-.0707-.1773-.0628-.1774-.0629-.1774-.0549-.1935-.0471-.1854-.0471-.2015-.0471-.2016-.0393-.2016-.0393-.2096-.0314-.2177-.0236-.4434-.0471-.4515-.0393-.4756-.0157-.4838-.0074-.3628.0074-.3789.0075-.395.0235-.4112.0314-.4273.0471-.4354.0549-.4434.0707-.4515.0942-.2257.0471-.2338.0549-.2258.0629-.2338.0628-.2338.0707-.2338.0785-.2338.0785-.2257.0863-.2338.0942-.2338.102-.2258.1021-.2338.1099-.2257.1177-.2258.1256-.2257.1256-.2258.1413v-13.894463h15.7617v22.144863z" fill="currentColor"/>
              </svg>
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
      <div id="dual-cta-pdf" data-gjs-type="section" data-gjs-name="Split CTA Card" class="w-full bg-[var(--color-secondary)] py-20" layout-mode="container">
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
      <div id="trust-impact-hero" data-gjs-type="section" data-gjs-name="Trust Hero" class="w-full py-20 lg:py-32 bg-white" layout-mode="container">
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
      <div id="expert-profiles" data-gjs-type="section" data-gjs-name="Expert Profiles" class="w-full py-24 bg-[#F5F7FA]" layout-mode="container">
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
      <div id="functional-team" data-gjs-type="section" data-gjs-name="Team Grid" class="w-full py-24 bg-white" layout-mode="container">
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
