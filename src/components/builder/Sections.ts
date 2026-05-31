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
    label: 'Full-Width Hero Image',
    svg: '<img src="/thumbs/background-image-thumb.jpg" class="object-cover" />',
    html: `
      <style>
        #header-1-center {
          background-image: url('/background/background-1.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-1-center" data-gjs-type="section" data-gjs-name="Background Image" class="w-full relative overflow-hidden py-10 md:py-[60px] lg:py-24 bg-cover bg-center bg-no-repeat bg-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 relative z-10">
          <div class="flex flex-col items-center text-center max-w-4xl mx-auto mix-blend-difference drop-shadow-md">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white mb-4 tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30">
              OVERLINE
            </span>
            <h1 class="text-white text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
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
    label: 'Hero Image with Blue Overlay',
    svg: '<img src="/thumbs/background-blue-gradient-thumb.jpg" class="object-cover" />',
    html: `
      <style>
        #header-2-left-blue {
          background-image: url('/background/background-5.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-2-left-blue" data-gjs-type="section" data-gjs-name="Header Left Blue Gradient" class="w-full relative overflow-hidden py-10 md:py-[60px] lg:py-24 bg-cover bg-right bg-no-repeat bg-primary" layout-mode="container">
        <div class="absolute inset-0 z-0 pointer-events-none" style="background: linear-gradient(90deg, rgba(0, 51, 141, 1) 0%, rgba(255, 255, 255, 0) 100%);" data-gjs-hoverable="false" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-removable="false"></div>
        <div class="container mx-auto px-4 lg:px-0 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white mb-4 tracking-widest uppercase bg-white/20 backdrop-blur-sm border border-white/30">
              OVERLINE
            </span>
            <h1 class="text-white text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
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
    label: 'Hero Image with White Overlay',
    svg: '<img src="/thumbs/background-white-gradient-thumb.jpg" class="object-cover" />',
    html: `
      <style>
        #header-3-left-white {
          background-image: url('/background/background-3.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>
      <div id="header-3-left-white" data-gjs-type="section" data-gjs-name="Backgound + White Gradient" class="w-full relative overflow-hidden py-10 md:py-[60px] lg:py-24 bg-cover bg-right bg-no-repeat bg-white" layout-mode="container">
        <div class="absolute inset-0 z-0 pointer-events-none" style="background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);" data-gjs-hoverable="false" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-removable="false"></div>
        <div class="container mx-auto px-4 lg:px-0 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-[var(--color-primary)] mb-4 tracking-widest uppercase bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              OVERLINE
            </span>
            <h1 class="text-[var(--color-primary)] text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
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
    label: 'Left-Aligned Hero (White Background)',
    svg: '<img src="/thumbs/header-left-solid-white-thumb.jpg" class="object-cover" />',
    html: `
      <div data-gjs-type="section" data-gjs-name="Header Left Solid White" class="w-full relative overflow-hidden py-10 md:py-[60px] lg:py-24 bg-white" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 relative z-10">
          <div class="flex flex-col items-start text-left max-w-3xl">
            <span class="inline-block rounded-full px-4 py-1.5 text-xs font-bold text-[var(--color-secondary)] mb-4 tracking-widest uppercase bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20">
              OVERLINE
            </span>
            <h1 class="text-[var(--color-primary)] text-5xl lg:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
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
    category: 'Navbar',
    label: 'Sticky Navigation Bar',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="20" fill="#f8fafc"/><rect x="5" y="8" width="15" height="4" rx="2" fill="var(--color-primary)"/><rect x="85" y="6" width="10" height="7" rx="2" fill="var(--color-secondary)"/></svg>',
    html: `
      <!-- Navbar with CSS-Only Responsive Mobile Menu -->
      <div data-gjs-type="section" data-gjs-name="Navbar" data-gjs-removable="false" data-gjs-copyable="false" class="w-full bg-white dark:bg-dark border-b-[3px] border-accent shadow-sm transition-all duration-300 sticky top-0 z-[100]" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-wrap items-center justify-between p-4 lg:py-4 lg:px-0 relative">
            <a href="#" class="block">
              <svg class="text-primary dark:text-white transition-colors" width="82" height="32" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m59.4297.0894165v14.8992835l-.1935.157-.1935.157-.1855.1649-.1773.1648-.1693.1649-.1693.1727-.1613.1727-.1612.1727v-16.2259835h-16.9549v13.5647835h-1.4028v-13.5647835h-16.9549v13.5883835h-1.4028v-13.5883835h-16.95487v15.4880835l-4.329426 14.0436h3.805376l1.91075-6.2172h.54823l3.16039 6.2172h4.59545l-3.0636-6.2172h6.9496l-1.9269 6.2172h4.1521l1.9027-6.2015h.9191v-.0157h1.306.1049 7.8445l-1.8382 6.2015h4.1924l1.7817-6.2015h1.8866l.0483 6.2015h3.5152l4.0391-6.2015h2.6444l-1.3705 6.2015h4.1278l1.3464-6.2015h2.3864l-.0161.3533.0086.3611.0161.3453.0322.3455.0242.1648.0241.1649.0322.1648.0323.1649.0402.1648.0403.157.0484.157.0483.157.0565.157.0565.1492.0644.1491.0646.1413.0726.1492.0725.1413.0807.1334.0807.1413.0887.1335.0967.1256.0968.1334.1048.1178.1048.1256.1048.1177.1209.1178.121.1099.1531.1256.1532.1256.1613.1177.1693.1099.1693.1099.1693.1021.1774.0863.1854.0942.1774.0785.1854.0784.1854.0707.1935.0707.1935.0628.1935.055.1935.0549.1935.0471.387.0863.395.0629.387.0549.387.0471.3789.0314.3709.0157.3628.0158h.3466l.4677-.0075.4676-.0074.4756-.0236.4757-.0236.4757-.0392.4757-.0393.4756-.0471.4757-.055.4837-.0628.4838-.0707.4837-.0785.4837-.0785.4838-.0863.4837-.0942.4837-.0942.4918-.1099 1.4351-5.6284h4.7084v-23.3145573h-16.9549zm-53.50905 22.7335835.02417-.0863.05649.0863zm14.77005-8.3524-.2419.7929-2.2574 7.3005-.0887.259h-7.4173l-.5724-1.1932 7.9897-7.952h-5.1357l-6.2482 6.5547 2.02361-6.5547h-3.78924v-12.999627h15.73743v13.792427zm4.3777 6.1701-.1209.0075-.1129.0074-.1209.0075h-.129-.1693-.1451l-.1371.0074h-.129l-1.0077-.0074.4676-1.6799.2176-.8321.5322-1.9547h.1693.1773l.1693-.0074h.1613.782l.4757.0074.4353.0158.1935.0074.1855.0157.1773.0236.1613.0236.1451.0235.1371.0393.129.0393.1128.0471.0968.0471.0887.0629.0806.0628.0645.0785.0403.0629.0322.0628.0322.0707.0242.0785.0161.0863.0085.0863v.0942.102l-.0085.1099-.0076.1099-.0242.1256-.0241.1256-.0726.2669-.0887.2983-.0887.2512-.0968.2434-.1048.2276-.1129.212-.0565.0942-.0564.0942-.0646.0942-.0726.0863-.0726.0863-.0726.0785-.0806.0785-.0807.0706-.0887.0629-.0887.0707-.0967.0549-.1049.0628-.1048.055-.1128.0471-.1129.0471-.1209.0393-.129.0471-.1371.0314-.1451.0314-.1451.0313-.1613.0236-.1612.0236-.1693.0157-.1774.0157zm11.4645 2.1823 1.6528-5.7305.0645 5.7305h-1.7172zm2.5155-9.1688h-3.9344l-2.7089 9.1688h-4.1763l.1935-.0784.1935-.0785.1855-.0785.1854-.0863.1774-.0864.1693-.102.1693-.0942.1612-.1021.1613-.1099.1531-.1099.1452-.1098.1451-.1257.137-.1177.129-.1335.129-.1256.121-.1413.1209-.1334.1129-.1492.1048-.1413.1048-.157.0967-.157.0887-.1569.0888-.1649.0806-.1727.0807-.1727.0726-.1727.0644-.1806.0645-.1884.0484-.1884.0565-.1884.0402-.2041.0403-.1962.0565-.314.0483-.2983.0323-.2826.0241-.2669.0086-.2669-.0086-.2434-.0075-.2433-.0323-.2277-.0322-.2119-.0565-.212-.0565-.1962-.0806-.1884-.0887-.1806-.0968-.1805-.1128-.1649-.129-.157-.1049-.1099-.1048-.1099-.1128-.0942-.121-.0863-.129-.0863-.129-.0785-.137-.0706-.1371-.0629-.1451-.0628-.1451-.0471-.1532-.0472-.1532-.0471-.1612-.0393-.1613-.0313-.1612-.0314-.1693-.0236-.3467-.0471-.3467-.0235-.3547-.0236-.3628-.0074h-.7256-.7175-.2258-.4031-.4999-.5563-.5401-.4596-.3225-.1209v-12.976108h15.7375v12.976108zm9.5617 9.1688h-2.3622l3.5796-5.495zm8.7959-8.9097-.0085 3.1792-.2015.2748-.1855.2826-.1854.2826-.1693.2826-.1613.2826-.1612.2904-.1371.2826-.137.2826-.129.2748-.1129.2826-.1129.2747-.0967.2669-.0887.2669-.0807.2591-.0726.2512-.0645.2512-.0403.1648-.0403.1727-.0402.1649-.0323.1727-.0322.1648-.0242.1649-.0241.1648-.0161.1727h-2.3139l1.9753-9.1452-6.6594-.0075-5.958 9.1531h-.4354v-22.144827h15.7455v13.235127zm9.0781 12.6542-.3305.0549-.3387.0471-.3386.0471-.3305.0393-.3306.0314-.3305.0236-.3225.0157h-.3225-.2096l-.2096-.0074-.2016-.0158-.2015-.0235-.1935-.0314-.1855-.0314-.1854-.0393-.1774-.0471-.1693-.0549-.1693-.055-.1612-.0706-.1532-.0707-.1532-.0863-.1451-.0863-.1371-.0942-.129-.0942-.129-.1099-.1128-.1178-.1129-.1177-.1048-.1335-.0968-.1334-.0887-.1492-.0806-.1491-.0807-.157-.0645-.1649-.0565-.1805-.0483-.1806-.0484-.1884-.0322-.1962-.0242-.2041-.0161-.212-.0085-.2198h7.3366l-.8062 3.1636zm9.3038-3.7445h-3.9666l.653-2.5591h-7.9493l-.6531 2.5591h-3.8456v-.5259l.0483-.2198.0403-.2198.0483-.2355.0483-.2355.0726-.2591.0726-.259.0807-.2591.0887-.2512.0967-.2512.1049-.2512.1128-.2433.1129-.2434.129-.2433.129-.2277.1371-.2355.1531-.2198.1532-.2198.1532-.2119.1693-.2041.1774-.1963.1854-.1884.1854-.1727.2016-.1727.2015-.1648.2097-.1492.2257-.1413.2258-.1256.2338-.1177.2418-.1099.2499-.0942.258-.0785.2661-.0629.2741-.0549.2822-.0393.2902-.0235.2983-.0075.2338.0075.2338.0157.2338.0314.2258.0471.1129.0314.1048.0313.1048.0314.0967.0471.0968.0393.0967.055.0887.0549.0887.0549.0807.0707.0806.0707.0726.0706.0726.0863.0646.0785.0565.0942.0483.1021.0483.102.0403.1099.0322.1178.0242.1177.0242.1335.0085.1334v.1413.1492l-.0161.157h4.7406l.0726-.3219.0645-.3689.0322-.1963.0162-.2119.0161-.212v-.2198l-.0076-.2276-.0242-.2355-.0241-.1099-.0162-.1178-.0322-.1177-.0322-.1178-.0403-.1256-.0403-.1177-.0483-.1178-.0565-.1177-.0565-.1178-.0726-.1177-.0726-.1178-.0806-.1177-.0968-.1256-.1048-.1178-.1048-.1177-.1129-.1099-.1209-.1099-.129-.1021-.129-.0942-.137-.0942-.1452-.0942-.1451-.0785-.1532-.0784-.1612-.0785-.1612-.0707-.1694-.0707-.1773-.0628-.1774-.0629-.1774-.0549-.1935-.0471-.1854-.0471-.2015-.0471-.2016-.0393-.2016-.0393-.2096-.0314-.2177-.0236-.4434-.0471-.4515-.0393-.4756-.0157-.4838-.0074-.3628.0074-.3789.0075-.395.0235-.4112.0314-.4273.0471-.4354.0549-.4434.0707-.4515.0942-.2257.0471-.2338.0549-.2258.0629-.2338.0628-.2338.0707-.2338.0785-.2338.0785-.2257.0863-.2338.0942-.2338.102-.2258.1021-.2338.1099-.2257.1177-.2258.1256-.2257.1256-.2258.1413v-13.894463h15.7617v22.144863z" fill="currentColor"/>
              </svg>
            </a>
            
            <!-- CSS Checkbox Hack for Mobile Menu -->
            <input type="checkbox" id="mobile-menu-toggle" class="hidden peer">
            
            <label for="mobile-menu-toggle" class="md:hidden p-2 text-slate-600 dark:text-white hover:text-accent cursor-pointer transition-colors" aria-label="Toggle Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </label>

            <!-- Navigation Links -->
            <nav data-nav-type="dynamic" class="hidden peer-checked:flex md:flex flex-col w-full md:w-auto md:flex-row items-center gap-6 mt-4 md:mt-0 font-medium text-sm transition-all duration-300 ease-in-out">
              <a href="#" class="text-slate-600 dark:text-white hover:text-accent transition-colors w-full md:w-auto text-center py-2 md:py-0 border-b border-gray-100 md:border-none">Home</a>
              <a href="#" class="text-slate-600 dark:text-white hover:text-accent transition-colors w-full md:w-auto text-center py-2 md:py-0 border-b border-gray-100 md:border-none">Services</a>
              <a href="#" class="text-slate-600 dark:text-white hover:text-accent transition-colors w-full md:w-auto text-center py-2 md:py-0 border-b border-gray-100 md:border-none">Features</a>
              <a href="#" class="text-slate-600 dark:text-white hover:text-accent transition-colors w-full md:w-auto text-center py-2 md:py-0 border-b border-gray-100 md:border-none">About</a>
              <a href="#" class="bg-primary text-white hover:bg-accent px-5 py-2.5 rounded-lg shadow transition-all w-full md:w-auto text-center mt-2 md:mt-0">Get Started</a>
            </nav>
          </div>
        </div>
        <script>
          (function() {
            const nav = document.currentScript.parentElement;
            window.addEventListener('scroll', () => {
              if (window.scrollY > 10) {
                nav.classList.add('shadow-md');
              } else {
                nav.classList.remove('shadow-md');
              }
            });
          })();
        </script>
      </div>
    `
  },
  {
    id: 'section-business-hero',
    category: 'Header',
    label: 'Split Banner (Right Image + Left CTA)',
    svg: '<img src="/thumbs/left-image-thumb.jpg" class="object-cover" />',
    html: `
      <!-- Hero Section with subtle colored gradient background (Fix for B&W preview) -->
      <div data-gjs-type="section" data-gjs-name="Hero Header" class="w-full bg-gradient-to-b from-accent/10 to-transparent dark:from-slate-800 dark:to-slate-900 py-10 md:py-[60px] lg:py-24 relative overflow-hidden" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <!-- Wrap interior in standard flex layout -->
          <div class="flex flex-col md:flex-row gap-12 items-center px-4 sm:px-0">
            <div class="flex-1 flex flex-col gap-8 z-10 w-full object-cover">
              <div>
                <span class="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent mb-6 border border-accent/20 shadow-sm">New: Enterprise Cloud 2.0</span>
                <h1 class="text-primary dark:text-white text-4xl lg:text-5xl font-display font-black leading-tight tracking-tight">
                  Transform Your Business with <br/><span class="text-accent">Modern Solutions</span>
                </h1>
              </div>
              <p class="text-slate-700 dark:text-white text-lg lg:text-xl leading-relaxed max-w-xl">
                Empowering teams with the tools they need to scale faster and work smarter in a digital-first world. Built for modern enterprises.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="#" class="h-14 flex items-center justify-center px-8 rounded-xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/30 hover:-translate-y-1 hover:bg-primary transition-all">Get Started Today</a>
                <a href="#" class="h-14 flex items-center justify-center px-8 rounded-xl border-2 border-primary/20 dark:border-slate-700 text-primary dark:text-slate-200 font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">View Demo</a>
              </div>
            </div>
            <div class="flex-1 relative z-10 hidden md:block w-full">
              <img src="/images/image-1.png" class="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" alt="Office" />
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-features',
    category: 'Services',
    label: 'Core Capabilities Grid (3 Cards)',
    svg: '<img src="/thumbs/services-thumb-2.png" class="object-cover w-full h-full" />',
    html: `
      <!-- Features (Using responsive-grid trait method) -->
      <div data-gjs-type="section" data-gjs-name="Features List" class="w-full py-10 md:py-[60px] lg:py-24 bg-white dark:bg-background-dark" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-primary dark:text-white text-4xl font-display font-black mb-4 tracking-tight">Our Core Capabilities</h2>
            <p class="text-slate-600 dark:text-white text-lg">Robust infrastructure designed to solve complex challenges seamlessly and efficiently.</p>
          </div>
          <!-- Replaced raw tailwind grid with native GrapesJS responsive-grid component -->
          <div data-gjs-type="responsive-grid" class="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-accent/50 transition-colors h-full w-full">
              <div class="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <h3 class="text-xl font-display font-bold text-primary dark:text-white mb-3">Cloud Integration</h3>
              <p class="text-slate-600 dark:text-white leading-relaxed">Connect your legacy systems to modern cloud infrastructure with zero downtime.</p>
            </div>
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 border-b-4 border-b-accent relative shadow-xl shadow-accent/5 h-full w-full">
              <div class="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <div class="w-14 h-14 bg-accent text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
              </div>
              <h3 class="text-xl font-display font-bold text-primary dark:text-white mb-3">Data Analytics</h3>
              <p class="text-slate-600 dark:text-white leading-relaxed">Turn raw numbers into actionable business insights with our real-time processing engine.</p>
            </div>
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-accent/50 transition-colors h-full w-full">
              <div class="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" class="fill-none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 class="text-xl font-display font-bold text-primary dark:text-white mb-3">AI Automation</h3>
              <p class="text-slate-600 dark:text-white leading-relaxed">Reduce manual workloads by 40% using intelligent workflows and custom machine learning.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-services',
    category: 'Services',
    label: 'Professional Services Grid (3 Images)',
    svg: '<img src="/thumbs/services-thumb-3.png" class="object-cover w-full h-full" />',
    html: `
      <!-- Services Grid -->
      <div data-gjs-type="section" data-gjs-name="Services Grid" class="w-full py-10 md:py-[60px] lg:py-24 bg-slate-50 dark:bg-slate-800/50" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0">
          <div class="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
            <h2 class="text-4xl font-display font-black text-primary dark:text-white mb-4 tracking-tight">Professional Services</h2>
            <p class="text-slate-600 dark:text-white text-lg mb-4">Tailored expertise to help your business navigate digital transformation.</p>
            <a href="#" class="text-accent font-bold hover:underline inline-flex items-center gap-2">View All Services &rarr;</a>
          </div>
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="/images/image-2.png" class="h-56 w-full object-cover" alt="Consulting" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Consulting</div>
                <h4 class="text-2xl font-display font-bold text-primary dark:text-white mb-3">Strategic Planning</h4>
                <p class="text-slate-600 dark:text-white mb-6">Expert guidance to scale your infrastructure and refine operations effectively.</p>
                <a href="#" class="bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-center rounded-lg py-3 block font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Read More</a>
              </div>
            </div>
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="/images/image-3.png" class="h-56 w-full object-cover" alt="Engineering" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Engineering</div>
                <h4 class="text-2xl font-display font-bold text-primary dark:text-white mb-3">Custom Software</h4>
                <p class="text-slate-600 dark:text-white mb-6">Bespoke web and mobile applications engineered to exactly fit your workflows.</p>
                <a href="#" class="bg-slate-100 dark:bg-slate-800 text-primary dark:text-white text-center rounded-lg py-3 block font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Read More</a>
              </div>
            </div>
            <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full">
              <img src="/images/image-4.png" class="h-56 w-full object-cover" alt="Security" />
              <div class="p-8">
                <div class="text-accent font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-accent"></div>Security</div>
                <h4 class="text-2xl font-display font-bold text-primary dark:text-white mb-3">Cyber Protection</h4>
                <p class="text-slate-600 dark:text-white mb-6">Advanced threat detection and comprehensive compliance auditing solutions.</p>
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
    category: 'Introduction',
    label: 'Vibrant Call-to-Action Block',
    svg: '<img src="/thumbs/Call-to-Action-thumb.png" class="object-cover w-full h-full" />',
    html: `
      <!-- CTA Block (Refactored to native Tailwind gradient instead of blurred absolute shapes) -->
      <div data-gjs-type="section" data-gjs-name="Call to Action" class="w-full py-10 md:py-[60px] lg:py-24 bg-white dark:bg-background-dark" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0">
          <div class="bg-gradient-to-br from-primary via-primary to-accent dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-12 lg:p-24 text-center shadow-2xl relative overflow-hidden text-white border border-primary/20">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-white text-4xl lg:text-5xl font-display font-black mb-6 tracking-tight">Ready to elevate your business?</h2>
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
    category: 'Footer',
    label: 'Corporate India',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="15" width="15" height="4" fill="var(--color-primary)"/></svg>',
    html: `
      <!-- KPMG Footer -->
      <div data-gjs-type="section" data-gjs-name="Page Footer" class="w-full bg-slate-50 py-10 md:py-16 lg:py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0">
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <!-- Brand & Social Column -->
            <div class="flex flex-col gap-6 w-full items-start">
              <svg class="text-primary dark:text-white transition-colors" width="82" height="32" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m59.4297.0894165v14.8992835l-.1935.157-.1935.157-.1855.1649-.1773.1648-.1693.1649-.1693.1727-.1613.1727-.1612.1727v-16.2259835h-16.9549v13.5647835h-1.4028v-13.5647835h-16.9549v13.5883835h-1.4028v-13.5883835h-16.95487v15.4880835l-4.329426 14.0436h3.805376l1.91075-6.2172h.54823l3.16039 6.2172h4.59545l-3.0636-6.2172h6.9496l-1.9269 6.2172h4.1521l1.9027-6.2015h.9191v-.0157h1.306.1049 7.8445l-1.8382 6.2015h4.1924l1.7817-6.2015h1.8866l.0483 6.2015h3.5152l4.0391-6.2015h2.6444l-1.3705 6.2015h4.1278l1.3464-6.2015h2.3864l-.0161.3533.0086.3611.0161.3453.0322.3455.0242.1648.0241.1649.0322.1648.0323.1649.0402.1648.0403.157.0484.157.0483.157.0565.157.0565.1492.0644.1491.0646.1413.0726.1492.0725.1413.0807.1334.0807.1413.0887.1335.0967.1256.0968.1334.1048.1178.1048.1256.1048.1177.1209.1178.121.1099.1531.1256.1532.1256.1613.1177.1693.1099.1693.1099.1693.1021.1774.0863.1854.0942.1774.0785.1854.0784.1854.0707.1935.0707.1935.0628.1935.055.1935.0549.1935.0471.387.0863.395.0629.387.0549.387.0471.3789.0314.3709.0157.3628.0158h.3466l.4677-.0075.4676-.0074.4756-.0236.4757-.0236.4757-.0392.4757-.0393.4756-.0471.4757-.055.4837-.0628.4838-.0707.4837-.0785.4837-.0785.4838-.0863.4837-.0942.4837-.0942.4918-.1099 1.4351-5.6284h4.7084v-23.3145573h-16.9549zm-53.50905 22.7335835.02417-.0863.05649.0863zm14.77005-8.3524-.2419.7929-2.2574 7.3005-.0887.259h-7.4173l-.5724-1.1932 7.9897-7.952h-5.1357l-6.2482 6.5547 2.02361-6.5547h-3.78924v-12.999627h15.73743v13.792427zm4.3777 6.1701-.1209.0075-.1129.0074-.1209.0075h-.129-.1693-.1451l-.1371.0074h-.129l-1.0077-.0074.4676-1.6799.2176-.8321.5322-1.9547h.1693.1773l.1693-.0074h.1613.782l.4757.0074.4353.0158.1935.0074.1855.0157.1773.0236.1613.0236.1451.0235.1371.0393.129.0393.1128.0471.0968.0471.0887.0629.0806.0628.0645.0785.0403.0629.0322.0628.0322.0707.0242.0785.0161.0863.0085.0863v.0942.102l-.0085.1099-.0076.1099-.0242.1256-.0241.1256-.0726.2669-.0887.2983-.0887.2512-.0968.2434-.1048.2276-.1129.212-.0565.0942-.0564.0942-.0646.0942-.0726.0863-.0726.0863-.0726.0785-.0806.0785-.0807.0706-.0887.0629-.0887.0707-.0967.0549-.1049.0628-.1048.055-.1128.0471-.1129.0471-.1209.0393-.129.0471-.1371.0314-.1451.0314-.1451.0313-.1613.0236-.1612.0236-.1693.0157-.1774.0157zm11.4645 2.1823 1.6528-5.7305.0645 5.7305h-1.7172zm2.5155-9.1688h-3.9344l-2.7089 9.1688h-4.1763l.1935-.0784.1935-.0785.1855-.0785.1854-.0863.1774-.0864.1693-.102.1693-.0942.1612-.1021.1613-.1099.1531-.1099.1452-.1098.1451-.1257.137-.1177.129-.1335.129-.1256.121-.1413.1209-.1334.1129-.1492.1048-.1413.1048-.157.0967-.157.0887-.1569.0888-.1649.0806-.1727.0807-.1727.0726-.1727.0644-.1806.0645-.1884.0484-.1884.0565-.1884.0402-.2041.0403-.1962.0565-.314.0483-.2983.0323-.2826.0241-.2669.0086-.2669-.0086-.2434-.0075-.2433-.0323-.2277-.0322-.2119-.0565-.212-.0565-.1962-.0806-.1884-.0887-.1806-.0968-.1805-.1128-.1649-.129-.157-.1049-.1099-.1048-.1099-.1128-.0942-.121-.0863-.129-.0863-.129-.0785-.137-.0706-.1371-.0629-.1451-.0628-.1451-.0471-.1532-.0472-.1532-.0471-.1612-.0393-.1613-.0313-.1612-.0314-.1693-.0236-.3467-.0471-.3467-.0235-.3547-.0236-.3628-.0074h-.7256-.7175-.2258-.4031-.4999-.5563-.5401-.4596-.3225-.1209v-12.976108h15.7375v12.976108zm9.5617 9.1688h-2.3622l3.5796-5.495zm8.7959-8.9097-.0085 3.1792-.2015.2748-.1855.2826-.1854.2826-.1693.2826-.1613.2826-.1612.2904-.1371.2826-.137.2826-.129.2748-.1129.2826-.1129.2747-.0967.2669-.0887.2669-.0807.2591-.0726.2512-.0645.2512-.0403.1648-.0403.1727-.0402.1649-.0323.1727-.0322.1648-.0242.1649-.0241.1648-.0161.1727h-2.3139l1.9753-9.1452-6.6594-.0075-5.958 9.1531h-.4354v-22.144827h15.7443v13.235127zm9.0781 12.6542-.3305.0549-.3387.0471-.3386.0471-.3305.0393-.3306.0314-.3305.0236-.3225.0157h-.3225-.2096l-.2096-.0074-.2016-.0158-.2015-.0235-.1935-.0314-.1855-.0314-.1854-.0393-.1774-.0471-.1693-.0549-.1693-.055-.1612-.0706-.1532-.0707-.1532-.0863-.1451-.0863-.1371-.0942-.129-.0942-.129-.1099-.1128-.1178-.1129-.1177-.1048-.1335-.0968-.1334-.0887-.1492-.0806-.1491-.0807-.157-.0645-.1649-.0565-.1805-.0483-.1806-.0484-.1884-.0322-.1962-.0242-.2041-.0161-.212-.0085-.2198h7.3366l-.8062 3.1636zm9.3038-3.7445h-3.9666l.653-2.5591h-7.9493l-.6531 2.5591h-3.8456v-.5259l.0483-.2198.0403-.2198.0483-.2355.0483-.2355.0726-.2591.0726-.259.0807-.2591.0887-.2512.0967-.2512.1049-.2512.1128-.2433.1129-.2434.129-.2433.129-.2277.1371-.2355.1531-.2198.1532-.2198.1532-.2119.1693-.2041.1774-.1963.1854-.1884.1854-.1727.2016-.1727.2015-.1648.2097-.1492.2257-.1413.2258-.1256.2338-.1177.2418-.1099.2499-.0942.258-.0785.2661-.0629.2741-.0549.2822-.0393.2902-.0235.2983-.0075.2338.0075.2338.0157.2338.0314.2258.0471.1129.0314.1048.0313.1048.0314.0967.0471.0968.0393.0967.055.0887.0549.0887.0549.0807.0707.0806.0707.0726.0706.0726.0863.0646.0785.0565.0942.0483.1021.0483.102.0403.1099.0322.1178.0242.1177.0242.1335.0085.1334v.1413.1492l-.0161.157h4.7406l.0726-.3219.0645-.3689.0322-.1963.0162-.2119.0161-.212v-.2198l-.0076-.2276-.0242-.2355-.0241-.1099-.0162-.1178-.0322-.1177-.0322-.1178-.0403-.1256-.0403-.1177-.0483-.1178-.0565-.1177-.0565-.1178-.0726-.1177-.0726-.1178-.0806-.1177-.0968-.1256-.1048-.1178-.1048-.1177-.1129-.1099-.1209-.1099-.129-.1021-.129-.0942-.137-.0942-.1452-.0942-.1451-.0785-.1532-.0784-.1612-.0785-.1612-.0707-.1694-.0707-.1773-.0628-.1774-.0629-.1774-.0549-.1935-.0471-.1854-.0471-.2015-.0471-.2016-.0393-.2016-.0393-.2096-.0314-.2177-.0236-.4434-.0471-.4515-.0393-.4756-.0157-.4838-.0074-.3628.0074-.3789.0075-.395.0235-.4112.0314-.4273.0471-.4354.0549-.4434.0707-.4515.0942-.2257.0471-.2338.0549-.2258.0629-.2338.0628-.2338.0707-.2338.0785-.2338.0785-.2257.0863-.2338.0942-.2338.102-.2258.1021-.2338.1099-.2257.1177-.2258.1256-.2257.1256-.2258.1413v-13.894463h15.7617v22.144863z" fill="currentColor"/>
              </svg>
              <p class="text-slate-600 dark:text-white leading-relaxed font-medium">
                Leading the future of digital business with specialized industry insights and strategic technology partnerships.
              </p>
              <div class="flex gap-4">
                <a href="https://www.linkedin.com/company/kpmgindia" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="https://x.com/kpmgindia" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="https://www.youtube.com/user/kpmgindia" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="https://www.facebook.com/KPMGIndia" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary dark:text-white hover:text-accent transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
              </div>
            </div>
      
            <!-- Connect Column -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">Connect</h4>
              <a href="https://kpmg.com/in/en/misc/generic-contact-page.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Contact Us</a>
              <a href="https://kpmg.com/in/en/misc/request-for-proposal.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Submit RFP</a>
            </div>
      
            <!-- Media & Insights Column -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">Media & Insights</h4>
              <a href="https://kpmg.com/in/en/media/press-releases.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Press Releases</a>
              <a href="https://kpmg.com/in/en/events.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Events</a>
            </div>
      
            <!-- KPMG Network Column -->
            <div class="flex flex-col gap-4 w-full">
              <h4 class="text-primary dark:text-white font-display font-bold text-lg mb-2">KPMG Network</h4>
              <a href="https://kpmg.com/xx/en/about/kpmg-international-hotline.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">KPMG International hotline</a>
              <a href="https://kpmg.com/in/en/careers.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">Careers</a>
              <a href="https://kpmg.com/in/en/about.html" class="text-slate-600 dark:text-white hover:text-accent font-medium transition-colors">About Us</a>
            </div>
            
          </div>
      
          <!-- Bottom Row -->
          <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-6 text-sm text-slate-500 font-medium w-full">
            <div class="flex flex-wrap justify-center gap-6 items-center">
              <a href="https://kpmg.com/in/en/misc/legal.html" class="hover:text-primary dark:hover:text-white transition-colors">Legal</a>
              <a href="https://kpmg.com/in/en/misc/privacy.html" class="hover:text-primary dark:hover:text-white transition-colors">Privacy</a>
              <a href="https://kpmg.com/in/en/misc/accessibility.html" class="hover:text-primary dark:hover:text-white transition-colors">Accessibility</a>
              <a href="https://kpmg.com/in/en/misc/help.html" class="hover:text-primary dark:hover:text-white transition-colors">Help</a>
            </div>
            <div class="space-y-2 max-w-4xl mx-auto">
              <p>&copy; ${new Date().getFullYear()} KPMG Assurance and Consulting Services LLP, an Indian Limited Liability Partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.</p>
              <p>For more detail about the structure of the KPMG global organization please visit <a href="https://kpmg.com/governance" target="_blank" class="text-primary dark:text-white hover:underline">https://kpmg.com/governance</a> opens in a new tab.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-business-footer-uk',
    category: 'Footer',
    label: 'Corporate UK',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="15" width="15" height="4" fill="var(--color-primary)"/></svg>',
    html: `
      <!-- KPMG UK Footer -->
      <div data-gjs-type="section" data-gjs-name="Page Footer UK" class="w-full bg-slate-50 py-10 md:py-16 lg:py-20 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 sm:px-6 lg:px-0">
          <!-- Responsive grid component trait -->
          <div data-gjs-type="responsive-grid" class="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
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
    `
  },
  {
    id: 'section-simple-footer',
    category: 'Footer',
    label: 'India',
    svg: '<svg viewBox="0 0 100 30" class="w-full h-full" fill="none"><rect width="100" height="30" fill="#f8fafc"/><rect x="10" y="13" width="50" height="4" fill="var(--color-primary)"/><rect x="70" y="13" width="20" height="4" fill="var(--color-primary)"/></svg>',
    html: `
      <div data-gjs-type="section" data-gjs-name="Simple Footer" class="w-full bg-slate-50 py-6 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="w-full md:w-[70%] text-sm text-slate-500 font-medium text-center md:text-left space-y-2">
              <p>&copy; ${new Date().getFullYear()} KPMG Assurance and Consulting Services LLP, an Indian Limited Liability Partnership and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.</p>
              <p>For more detail about the structure of the KPMG global organization please visit <a href="https://kpmg.com/governance" target="_blank" class="text-primary dark:text-white hover:underline">https://kpmg.com/governance</a>.</p>
            </div>
            <div class="w-full md:w-[30%] flex justify-center md:justify-end gap-4">
              <a href="https://www.linkedin.com/company/kpmgindia" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="https://x.com/kpmgindia" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="https://www.youtube.com/user/kpmgindia" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="YouTube"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="https://www.facebook.com/KPMGIndia" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-simple-footer-uk',
    category: 'Footer',
    label: 'UK',
    svg: '<svg viewBox="0 0 100 30" class="w-full h-full" fill="none"><rect width="100" height="30" fill="#f8fafc"/><rect x="10" y="13" width="50" height="4" fill="var(--color-primary)"/><rect x="70" y="13" width="20" height="4" fill="var(--color-primary)"/></svg>',
    html: `
      <div data-gjs-type="section" data-gjs-name="Simple Footer UK" class="w-full bg-slate-50 py-6 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="w-full md:w-[70%] text-sm text-slate-500 font-medium text-center md:text-left space-y-2">
              <p>&copy; ${new Date().getFullYear()} KPMG LLP a UK limited liability partnership and a member firm of the KPMG global organisation of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.</p>
              <p>For more detail about the structure of the KPMG global organisation please visit <a href="https://kpmg.com/governance" target="_blank" class="text-primary dark:text-white hover:underline">https://kpmg.com/governance</a>.</p>
            </div>
            <div class="w-full md:w-[30%] flex justify-center md:justify-end gap-4">
              <a href="https://www.linkedin.com/company/kpmg-uk/" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="https://x.com/kpmguk" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="https://www.youtube.com/user/KPMGUK" target="_blank" class="text-slate-400 hover:text-primary dark:hover:text-white transition-colors" title="YouTube"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-dual-cta-pdf',
    category: 'Call to actions',
    label: 'Split Card Banner with Download PDF',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="var(--color-secondary)"/><rect x="15" y="15" width="35" height="30" fill="#ffffff" opacity="0.5"/><rect x="50" y="15" width="35" height="30" fill="#ffffff"/></svg>',
    html: `
      <div data-gjs-type="section" data-gjs-name="Split CTA Card" class="w-full bg-secondary py-10 md:py-16 lg:py-20" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div class="flex-1 min-h-[400px]">
              <img src="/background/background-1.jpg" class="w-full h-full object-cover" alt="Handshake" />
            </div>
            <div class="flex-1 flex flex-col items-center justify-center p-12 lg:p-16 text-center">
              <h2 class="text-4xl font-display font-black text-gray-900 mb-8 tracking-tight">Lorem ipsum</h2>
              <a href="#" data-gjs-type="link" class="inline-block bg-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all">Download PDF</a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-trust-impact',
    category: 'Introduction',
    label: 'Trust & Impact Banner (Text + Large Image)',
    svg: '<img src="/thumbs/trust-and-impact-thumb.png" class="object-cover w-full h-full" />',
    html: `
      <div id="trust-impact-hero" data-gjs-type="section" data-gjs-name="Trust Hero" class="w-full py-20 lg:py-32 bg-white" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-[1.2] flex flex-col items-start text-left">
            <span class="text-xs font-bold uppercase tracking-widest text-secondary mb-4">OVERLINE</span>
            <h1 class="text-4xl lg:text-5xl font-display font-black text-[#0c233c] mb-6 leading-tight tracking-tight">Inspire trust and deliver <br/>impact for your brand</h1>
            <p class="text-lg text-gray-600 leading-relaxed max-w-xl">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
          </div>
          <div class="flex-1 relative w-full">
            <div class="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-auto md:h-[450px]">
              <img src="/background/background-2.jpg" class="w-full h-full object-cover" alt="Team impact" />
              <div class="absolute inset-0 bg-gradient-to-tr from-[#0c233c]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-intro-letter',
    category: 'Introduction',
    label: 'CEO Welcome Letter with Signature',
    svg: '<img src="/thumbs/welcome-letter-thumb.png" class="object-cover w-full h-full" />',
    html: `
      <div id="intro-letter" data-gjs-type="section" data-gjs-name="Introduction Letter" class="w-full py-16 md:py-24 bg-white dark:bg-background-dark border-y border-gray-100 dark:border-slate-800" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="flex flex-col md:flex-row gap-8 lg:gap-16">
            <!-- 30% Left Side -->
            <div class="w-full md:w-[30%]">
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Dear Sir or Madame,</h2>
            </div>
            
            <!-- 70% Right Side -->
            <div class="w-full md:w-[70%]">
              <p class="text-gray-600 dark:text-white leading-relaxed mb-6 font-medium">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              <p class="text-gray-600 dark:text-white leading-relaxed mb-8 font-medium">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              
              <div class="mb-8">
                <p class="text-gray-600 dark:text-white mb-2">Kind regards,</p>
                <img src="/images/signature-image.png" alt="Signature" style="max-width: 150px;" class="h-16 w-auto object-contain mix-blend-multiply dark:mix-blend-screen opacity-80" />
              </div>
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img src="/team-member/member-1.jpg" alt="John Doe" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-col">
                  <span class="text-primary dark:text-white font-bold text-lg leading-tight">John Doe</span>
                  <span class="text-gray-500 text-sm">Head of Pursuit</span>
                </div>
                <a href="mailto:johndoe@example.com" class="ml-2 w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-primary dark:text-white hover:bg-primary hover:text-white transition-colors group">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-expert-profiles',
    category: 'Services',
    label: 'Expert Team Profiles (3 Members)',
    svg: '<img src="/thumbs/services-thumb-4.png" class="object-cover w-full h-full" />',
    html: `
      <div id="expert-profiles" data-gjs-type="section" data-gjs-name="Expert Profiles" class="w-full py-24 bg-[#F5F7FA]" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
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
    `
  },
  {
    id: 'section-functional-team',
    category: 'Contacts',
    label: 'Functional Team Directory (10 Avatars)',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><circle cx="20" cy="20" r="5" fill="#cbd5e1"/><circle cx="40" cy="20" r="5" fill="#cbd5e1"/><circle cx="60" cy="20" r="5" fill="#cbd5e1"/><circle cx="80" cy="20" r="5" fill="#cbd5e1"/><circle cx="20" cy="40" r="5" fill="#cbd5e1"/><circle cx="40" cy="40" r="5" fill="#cbd5e1"/><circle cx="60" cy="40" r="5" fill="#cbd5e1"/><circle cx="80" cy="40" r="5" fill="#cbd5e1"/></svg>',
    html: `
      <div id="functional-team" data-gjs-type="section" data-gjs-name="Team Grid" class="w-full py-24 bg-white" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <h2 class="text-4xl font-display font-extrabold text-center text-[#0c233c] mb-20 tracking-tight">Our core functional team</h2>
          <div data-gjs-type="responsive-grid" data-cols-desktop="5" data-cols-tablet="3" data-cols-mobile="2" class="container mx-auto px-4 lg:px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-16 gap-x-8">
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-4.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-display font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-5.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-display font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-6.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-7.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-8.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-9.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-10.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-11.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-12.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">Jane Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
            <div class="flex flex-col items-center text-center group">
              <div class="relative mb-6">
                <div class="w-24 h-24 rounded-full shadow-lg overflow-hidden border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src="/team-member/member-13.jpg" class="w-full h-full object-cover aspect-square" alt="Team member" />
                </div>
                <div class="absolute inset-0 rounded-full border-4 border-secondary opacity-0 group-hover:opacity-100 transition-all scale-110 duration-500 pointer-events-none"></div>
              </div>
              <h4 class="text-lg font-black text-[#0c233c]">John Doe</h4>
              <p class="text-gray-500 font-medium text-sm">Job Title</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-data-visualization-stats',
    category: 'Data Visualization',
    label: 'Circle Statistics Row',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><circle cx="20" cy="30" r="8" fill="var(--color-secondary)"/><circle cx="38" cy="30" r="10" fill="var(--color-primary)"/><circle cx="58" cy="30" r="12" fill="var(--color-purple)"/><circle cx="76" cy="30" r="7" fill="var(--color-accent)"/><circle cx="90" cy="30" r="5" fill="var(--color-light-accent)"/></svg>',
    html: `
      <div id="data-visualization-stats" data-gjs-type="section" data-gjs-name="Stats Section" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="max-w-3xl mx-auto text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-display font-black text-[#00338d] dark:text-white mb-4 tracking-tight">Stats</h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac turpis in eros pharetra tincidunt. Nullam vestibulum at sapien et sagittis. In accumsan erat ex.
            </p>
          </div>
          
          <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 w-full">
            <!-- 25% Circle -->
            <div class="flex flex-col items-center gap-4">
              <div class="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#1e49e2] shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <span class="text-white text-3xl md:text-4xl font-display font-bold">25%</span>
              </div>
              <span class="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base">Lorem Ipsum</span>
            </div>

            <!-- 45% Circle -->
            <div class="flex flex-col items-center gap-4">
              <div class="w-36 h-36 md:w-40 md:h-40 rounded-full bg-[#00338d] shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <span class="text-white text-3xl md:text-4xl font-display font-bold">45%</span>
              </div>
              <span class="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base">Lorem Ipsum</span>
            </div>

            <!-- 50% Circle -->
            <div class="flex flex-col items-center gap-4">
              <div class="w-40 h-40 md:w-44 md:h-44 rounded-full bg-[#7213ea] shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <span class="text-white text-3xl md:text-4xl font-display font-bold">50%</span>
              </div>
              <span class="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base">Lorem Ipsum</span>
            </div>

            <!-- 20% Circle -->
            <div class="flex flex-col items-center gap-4">
              <div class="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#00b8f5] shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <span class="text-white text-2xl md:text-3xl font-display font-bold">20%</span>
              </div>
              <span class="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base">Lorem Ipsum</span>
            </div>

            <!-- 15% Circle -->
            <div class="flex flex-col items-center gap-4">
              <div class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#aceaff] shadow-lg flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <span class="text-[#0c233c] text-xl md:text-2xl font-display font-bold">15%</span>
              </div>
              <span class="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base">Lorem Ipsum</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-data-visualization-number-cards',
    category: 'Data Visualization',
    label: 'Number Stat Cards',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="5" y="15" width="20" height="30" rx="1" fill="#e2e8f0"/><line x1="5" y1="15" x2="5" y2="45" stroke="#7213ea" stroke-width="2"/><rect x="28" y="15" width="20" height="30" rx="1" fill="#e2e8f0"/><line x1="28" y1="15" x2="28" y2="45" stroke="#7213ea" stroke-width="2"/><rect x="51" y="15" width="20" height="30" rx="1" fill="#e2e8f0"/><line x1="51" y1="15" x2="51" y2="45" stroke="#7213ea" stroke-width="2"/><rect x="74" y="15" width="20" height="30" rx="1" fill="#e2e8f0"/><line x1="74" y1="15" x2="74" y2="45" stroke="#7213ea" stroke-width="2"/></svg>',
    html: `
      <div id="data-visualization-number-cards" data-gjs-type="section" data-gjs-name="Number Cards Section" class="w-full py-16 md:py-24 bg-white dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div data-gjs-type="responsive-grid" class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            <!-- Card 1 -->
            <div class="bg-slate-100 dark:bg-slate-800 border-l-4 border-[#7213ea] p-6 md:p-8 flex flex-col justify-center items-center h-full w-full shadow-sm hover:shadow-md transition-shadow">
              <span class="text-3xl md:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">5,900+</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Place for a subtitle</span>
            </div>

            <!-- Card 2 -->
            <div class="bg-slate-100 dark:bg-slate-800 border-l-4 border-[#7213ea] p-6 md:p-8 flex flex-col justify-center items-center h-full w-full shadow-sm hover:shadow-md transition-shadow">
              <span class="text-3xl md:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">30+</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Place for a subtitle</span>
            </div>

            <!-- Card 3 -->
            <div class="bg-slate-100 dark:bg-slate-800 border-l-4 border-[#7213ea] p-6 md:p-8 flex flex-col justify-center items-center h-full w-full shadow-sm hover:shadow-md transition-shadow">
              <span class="text-3xl md:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">3,000+</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Place for a subtitle</span>
            </div>

            <!-- Card 4 -->
            <div class="bg-slate-100 dark:bg-slate-800 border-l-4 border-[#7213ea] p-6 md:p-8 flex flex-col justify-center items-center h-full w-full shadow-sm hover:shadow-md transition-shadow">
              <span class="text-3xl md:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">6,500+</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Place for a subtitle</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-data-visualization-divided-stats',
    category: 'Data Visualization',
    label: 'Divided Stats Row',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="5" y="15" width="90" height="30" rx="2" fill="white" stroke="#e2e8f0"/><line x1="23" y1="15" x2="23" y2="45" stroke="#e2e8f0"/><line x1="41" y1="15" x2="41" y2="45" stroke="#e2e8f0"/><line x1="59" y1="15" x2="59" y2="45" stroke="#e2e8f0"/><line x1="77" y1="15" x2="77" y2="45" stroke="#e2e8f0"/></svg>',
    html: `
      <div id="data-visualization-divided-stats" data-gjs-type="section" data-gjs-name="Divided Stats Section" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="grid grid-cols-1 md:grid-cols-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700 shadow-sm">
            <!-- Column 1 -->
            <div class="flex flex-col justify-center items-center text-center p-6 min-h-[160px]">
              <span class="text-3xl lg:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">265,000 +</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Employees</span>
            </div>

            <!-- Column 2 -->
            <div class="flex flex-col justify-center items-center text-center p-6 min-h-[160px]">
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Supporting clients</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 mb-2">across</span>
              <span class="text-3xl lg:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">143</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">countries</span>
            </div>

            <!-- Column 3 -->
            <div class="flex flex-col justify-center items-center text-center p-6 min-h-[160px]">
              <span class="text-2xl lg:text-3xl font-display font-bold text-[#00338d] dark:text-white mb-2">$34bn/ $15bn</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Total firm/total</span>
              <span class="text-xs text-slate-400 dark:text-slate-500">revenue for FY 2022</span>
            </div>

            <!-- Column 4 -->
            <div class="flex flex-col justify-center items-center text-center p-6 min-h-[160px]">
              <span class="text-3xl lg:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">50,000 +</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium font-semibold leading-snug">Technology and<br/>transformation<br/>specialists</span>
            </div>

            <!-- Column 5 -->
            <div class="flex flex-col justify-center items-center text-center p-6 min-h-[160px]">
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Providing advisory</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 mb-2">services to</span>
              <span class="text-3xl lg:text-4xl font-display font-black text-[#00338d] dark:text-white mb-2">48%</span>
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">of Forbes Global 1000</span>
              <span class="text-xs text-slate-400 dark:text-slate-500">companies</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-case-studies-numbered-questions',
    category: 'Case Studies',
    label: 'Numbered Questions List',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="5" y="8" width="42" height="44" rx="1" fill="white" stroke="#e2e8f0"/><rect x="53" y="8" width="42" height="44" rx="1" fill="white" stroke="#e2e8f0"/><line x1="5" y1="20" x2="47" y2="20" stroke="#e2e8f0"/><line x1="5" y1="30" x2="47" y2="30" stroke="#e2e8f0"/><line x1="5" y1="40" x2="47" y2="40" stroke="#e2e8f0"/><line x1="53" y1="20" x2="95" y2="20" stroke="#e2e8f0"/><line x1="53" y1="30" x2="95" y2="30" stroke="#e2e8f0"/><line x1="53" y1="40" x2="95" y2="40" stroke="#e2e8f0"/><text x="8" y="17" font-size="4" fill="var(--color-secondary)" font-weight="bold">01</text><text x="8" y="27" font-size="4" fill="var(--color-secondary)" font-weight="bold">02</text><text x="8" y="37" font-size="4" fill="var(--color-secondary)" font-weight="bold">03</text><text x="56" y="17" font-size="4" fill="var(--color-secondary)" font-weight="bold">06</text><text x="56" y="27" font-size="4" fill="var(--color-secondary)" font-weight="bold">07</text><text x="56" y="37" font-size="4" fill="var(--color-secondary)" font-weight="bold">08</text></svg>',
    html: `
      <div id="section-case-studies-numbered-questions" data-gjs-type="section" data-gjs-name="Numbered Questions" class="w-full py-16 md:py-24 bg-white dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">

          <!-- Centered heading block -->
          <div class="max-w-3xl mx-auto text-center mb-14">
            <h2 class="text-3xl md:text-4xl font-display font-black text-[#0c233c] dark:text-white mb-6 tracking-tight">Ten questions for yourself</h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo eget magna fermentum iaculis eu. Morbi enim nunc faucibus a pellentesque sit. Lacus luctus accumsan tortor posuere ac ut.
            </p>
          </div>

          <!-- Two-column questions grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

            <!-- Left Column -->
            <div class="border border-slate-200 dark:border-slate-700 flex flex-col divide-y divide-slate-200 dark:divide-slate-700">
              <!-- Q01 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">01</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">What is the company's strategy?</p>
              </div>
              <!-- Q02 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">02</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Where are the skills gaps in relation to strategy?</p>
              </div>
              <!-- Q03 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">03</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Does the board have the right combination of skills, backgrounds, experiences, and perspectives to probe management's strategic assumptions?</p>
              </div>
              <!-- Q04 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">04</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Has sufficient attention been given to recruiting directors with backgrounds in academia, government, civil society, as well as entrepreneurs and those from family businesses?</p>
              </div>
              <!-- Q05 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">05</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Is the 20th century paradigm of filling boards with directors with 'big company' experience still relevant?</p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="border border-slate-200 dark:border-slate-700 flex flex-col divide-y divide-slate-200 dark:divide-slate-700">
              <!-- Q06 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">06</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Is there a robust board evaluation process that focuses not only on what the board does, but how it does it, and how it can improve?</p>
              </div>
              <!-- Q07 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">07</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">How robust is your formal succession plan to achieve the 'right board composition'?</p>
              </div>
              <!-- Q08 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">08</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Are your underperforming directors being removed in an efficient and effective manner?</p>
              </div>
              <!-- Q09 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">09</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">Are matrices identifying any missing knowledge, skills and expertise being applied without fear or favour when recruiting new board members?</p>
              </div>
              <!-- Q10 -->
              <div class="flex items-start gap-4 p-5">
                <span class="text-2xl font-display font-black text-[#1e49e2] flex-shrink-0 leading-none mt-0.5">10</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">What is the leadership style of your board chair?</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-case-study-details',
    category: 'Case Studies',
    label: 'Case Study Details',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><text x="5" y="10" font-size="3" fill="#7213ea">CASE STUDY</text><text x="5" y="15" font-size="5" fill="#0c233c" font-weight="bold">Case study name</text><rect x="5" y="20" width="90" height="10" fill="#0c233c"/><rect x="5" y="35" width="50" height="20" fill="#e2e8f0"/><rect x="60" y="35" width="35" height="20" fill="white" stroke="#e2e8f0"/></svg>',
    html: `
      <div id="section-case-study-details" data-gjs-type="section" data-gjs-name="Case Study Details" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          
          <!-- Top Section -->
          <div class="mb-10">
            <p class="text-sm font-bold text-[#7213ea] uppercase tracking-wider mb-2">CASE STUDY</p>
            <h2 class="text-3xl md:text-5xl font-display font-black text-[#00338d] dark:text-white max-w-3xl leading-tight">
              Case study name should be placed here
            </h2>
          </div>

          <!-- Banner without border radius -->
          <div class="w-full bg-[#0c233c] text-white flex flex-col md:flex-row mb-16">
            <div class="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/20">
              <h3 class="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">CLIENT</h3>
              <p class="text-sm font-medium">A global payments and financial services technology provider</p>
            </div>
            <div class="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/20">
              <h3 class="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">SECTOR</h3>
              <p class="text-sm font-medium">A global payments and financial services technology provider</p>
            </div>
            <div class="flex-1 p-6 md:p-8">
              <h3 class="text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">PROJECT</h3>
              <p class="text-sm font-medium">A global payments and financial services technology provider</p>
            </div>
          </div>

          <!-- Bottom Section -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left Column -->
            <div class="lg:col-span-7">
              <h3 class="text-2xl font-bold text-[#00338d] dark:text-white mb-6">Project at a glance</h3>
              <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              </p>
              <!-- Image without border radius -->
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" alt="Abstract visualization" class="w-full h-64 object-cover">
            </div>

            <!-- Right Column -->
            <div class="lg:col-span-5 bg-white dark:bg-slate-800 p-8 border border-slate-200 dark:border-slate-700">
              
              <!-- Challenge Item -->
              <div class="mb-10">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-[#7213ea]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <span class="text-sm font-bold text-[#7213ea] uppercase tracking-wider">THE CHALLENGE</span>
                </div>
                <div class="relative">
                  <h4 class="text-xl font-bold text-[#0c233c] dark:text-white mb-4 pl-4 border-l-[3px] border-[#00b8f5]">Title should be placed here</h4>
                  <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                  </p>
                </div>
              </div>

              <!-- Opportunity Item -->
              <div>
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-[#7213ea]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  </div>
                  <span class="text-sm font-bold text-[#7213ea] uppercase tracking-wider">THE OPPORTUNITY</span>
                </div>
                <div class="relative">
                  <h4 class="text-xl font-bold text-[#0c233c] dark:text-white mb-4 pl-4 border-l-[3px] border-[#00b8f5]">Title should be placed here</h4>
                  <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-case-studies-discover',
    category: 'Case Studies',
    label: 'Discover Grid',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="20" width="18" height="35" fill="#e2e8f0"/><rect x="30" y="20" width="18" height="15" fill="#1e49e2"/><rect x="50" y="20" width="38" height="15" fill="#e2e8f0"/><rect x="30" y="37" width="18" height="18" fill="#cbd5e1"/><rect x="10" y="57" width="38" height="2" fill="#94a3b8"/><rect x="50" y="37" width="18" height="20" fill="#94a3b8"/><rect x="70" y="37" width="18" height="20" fill="#64748b"/></svg>',
    html: `
      <div id="section-case-studies-discover" data-gjs-type="section" data-gjs-name="Discover Case Studies" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          
          <!-- Heading -->
          <div class="max-w-3xl mx-auto text-center mb-14">
            <h2 class="text-3xl md:text-4xl font-display font-black text-[#0c233c] dark:text-white mb-6 tracking-tight">Discover our Case Studies</h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <!-- Complex Grid -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[200px] lg:auto-rows-[240px]">
            
            <!-- Code editor (tall) -->
            <div class="md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2 relative h-72 md:h-auto">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Code" class="w-full h-full object-cover">
            </div>
            
            <!-- Blue Box -->
            <div class="md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-1 bg-[#1e49e2] text-white p-6 flex flex-col justify-center relative h-60 md:h-auto">
              <h3 class="font-bold text-2xl mb-4 leading-snug">Case Study number<br>two title</h3>
              <p class="text-sm border-t border-white/30 pt-4 mt-auto">Company | Category</p>
              <a href="#" class="text-sm font-bold mt-2 flex items-center gap-2 group hover:text-white/80 transition-colors">
                View case study 
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>

            <!-- Plasma Globe (wide) -->
            <div class="md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-1 relative h-48 md:h-auto">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" alt="Plasma Globe" class="w-full h-full object-cover">
            </div>

            <!-- Purple Blur -->
            <div class="md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 relative h-48 md:h-auto">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Abstract Blur" class="w-full h-full object-cover">
            </div>

            <!-- Woman (large) -->
            <div class="md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-2 relative h-80 md:h-auto">
              <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80" alt="Tech Woman" class="w-full h-full object-cover">
            </div>

            <!-- Laptop -->
            <div class="md:col-start-3 md:row-start-3 md:col-span-1 md:row-span-1 relative h-60 md:h-auto">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="Laptop" class="w-full h-full object-cover">
            </div>

            <!-- Phone (tall) -->
            <div class="md:col-start-4 md:row-start-3 md:col-span-1 md:row-span-2 relative h-80 md:h-auto">
              <img src="https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=600&q=80" alt="Phone" class="w-full h-full object-cover">
            </div>

          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-case-studies-cards-quote',
    category: 'Case Studies',
    label: 'Cards with Quote',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#00338d"/><rect x="30" y="8" width="40" height="4" fill="white"/><rect x="20" y="14" width="60" height="2" fill="#cbd5e1"/><rect x="5" y="22" width="28" height="30" fill="white"/><rect x="36" y="22" width="28" height="30" fill="white"/><rect x="67" y="22" width="28" height="30" fill="transparent" stroke="white"/></svg>',
    html: `
      <div id="section-case-studies-cards-quote" data-gjs-type="section" data-gjs-name="Cards with Quote" class="w-full py-16 md:py-24 bg-[#00338d]" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          
          <!-- Heading -->
          <div class="max-w-3xl mx-auto text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-black text-white mb-6 tracking-tight">Discover our Case Studies</h2>
            <p class="text-slate-200 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac turpis in eros pharetra tincidunt. Nullam vestibulum at sapien et sagittis. In accumsan erat ex.
            </p>
          </div>

          <!-- 3-Column Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            <!-- Card 1 -->
            <div class="bg-slate-50 flex flex-col">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Code" class="w-full h-full object-cover">
              </div>
              <div class="p-6 md:p-8 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-400 mb-5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span class="text-xs uppercase tracking-wider font-semibold">Case Study</span>
                </div>
                <h3 class="text-xl font-bold text-[#0c233c] mb-4 pl-3 border-l-[3px] border-[#00b8f5]">Implementing X at company</h3>
                <p class="text-slate-500 text-sm leading-relaxed mb-8">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <a href="#" class="mt-auto text-sm font-bold text-[#1e49e2] flex items-center gap-2 group hover:text-[#00338d] transition-colors">
                  View case study 
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-slate-50 flex flex-col">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt="Laptop" class="w-full h-full object-cover">
              </div>
              <div class="p-6 md:p-8 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-400 mb-5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <span class="text-xs uppercase tracking-wider font-semibold">Case Study</span>
                </div>
                <h3 class="text-xl font-bold text-[#0c233c] mb-4 pl-3 border-l-[3px] border-[#00b8f5]">Implementing X in company X</h3>
                <p class="text-slate-500 text-sm leading-relaxed mb-8">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </p>
                <a href="#" class="mt-auto text-sm font-bold text-[#1e49e2] flex items-center gap-2 group hover:text-[#00338d] transition-colors">
                  View case study 
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            </div>

            <!-- Quote Block -->
            <div class="border border-white/20 p-8 flex flex-col">
              <svg class="w-12 h-12 text-[#7213ea] mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <h3 class="text-xl font-bold text-white mb-8 leading-snug">
                This is a quote text placeholder to include quote text. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </h3>
              <div class="flex items-center gap-3 mt-auto">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="John Doe" class="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 rounded-full border-2 border-[#00b8f5] object-cover flex-shrink-0">
                <span class="text-white text-sm"><strong class="font-bold">John Doe</strong> | Head of Pursuit</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-documents-grid-sidebar',
    category: 'Documents',
    label: 'Documents Grid with Sidebar',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><text x="5" y="10" font-size="4" fill="#0c233c" font-weight="bold">Documents</text><rect x="5" y="15" width="25" height="18" fill="#1e49e2"/><rect x="32" y="15" width="25" height="18" fill="#1e49e2"/><rect x="5" y="35" width="25" height="18" fill="#1e49e2"/><rect x="32" y="35" width="25" height="18" fill="#1e49e2"/><text x="62" y="15" font-size="3" fill="#7213ea">DOCUMENTS</text><text x="62" y="22" font-size="4" fill="#0c233c" font-weight="bold">Lorem ipsum</text><rect x="62" y="28" width="30" height="2" fill="#cbd5e1"/><rect x="62" y="32" width="30" height="2" fill="#cbd5e1"/><rect x="62" y="36" width="30" height="2" fill="#cbd5e1"/></svg>',
    html: `
      <div id="section-documents-grid-sidebar" data-gjs-type="section" data-gjs-name="Documents Grid with Sidebar" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <!-- Left Side: Document Cards -->
            <div class="lg:col-span-7 xl:col-span-8 flex flex-col">
              <h2 class="text-3xl md:text-4xl font-display font-black text-[#0c233c] dark:text-white mb-8 tracking-tight">Documents</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-grow">
                <!-- Card 1 -->
                <div class="bg-[#1e49e2] text-white p-6 md:p-8 flex flex-col h-full">
                  <svg class="w-10 h-10 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <h3 class="font-bold text-xl mb-3 leading-snug">Lorem Ipsum dolor</h3>
                  <p class="text-white/80 text-sm leading-relaxed mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                  </p>
                  <div class="mt-auto flex justify-end">
                    <button class="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-full text-sm font-semibold hover:bg-white hover:text-[#1e49e2] transition-colors group">
                      <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download
                    </button>
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="bg-[#1e49e2] text-white p-6 md:p-8 flex flex-col h-full">
                  <svg class="w-10 h-10 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <h3 class="font-bold text-xl mb-3 leading-snug">Lorem Ipsum dolor</h3>
                  <p class="text-white/80 text-sm leading-relaxed mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                  </p>
                  <div class="mt-auto flex justify-end">
                    <button class="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-full text-sm font-semibold hover:bg-white hover:text-[#1e49e2] transition-colors group">
                      <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download
                    </button>
                  </div>
                </div>

                <!-- Card 3 -->
                <div class="bg-[#1e49e2] text-white p-6 md:p-8 flex flex-col h-full">
                  <svg class="w-10 h-10 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <h3 class="font-bold text-xl mb-3 leading-snug">Lorem Ipsum dolor</h3>
                  <p class="text-white/80 text-sm leading-relaxed mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                  </p>
                  <div class="mt-auto flex justify-end">
                    <button class="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-full text-sm font-semibold hover:bg-white hover:text-[#1e49e2] transition-colors group">
                      <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download
                    </button>
                  </div>
                </div>

                <!-- Card 4 -->
                <div class="bg-[#1e49e2] text-white p-6 md:p-8 flex flex-col h-full">
                  <svg class="w-10 h-10 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <h3 class="font-bold text-xl mb-3 leading-snug">Lorem Ipsum dolor</h3>
                  <p class="text-white/80 text-sm leading-relaxed mb-8">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                  </p>
                  <div class="mt-auto flex justify-end">
                    <button class="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-full text-sm font-semibold hover:bg-white hover:text-[#1e49e2] transition-colors group">
                      <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- Right Side: Text Sidebar -->
            <div class="lg:col-span-5 xl:col-span-4 flex flex-col lg:pt-14">
              <span class="text-xs font-bold text-[#7213ea] uppercase tracking-wider mb-3">DOCUMENTS</span>
              <h3 class="text-3xl md:text-4xl font-display font-black text-[#0c233c] dark:text-white mb-6 leading-tight">Lorem ipsum dolor sit</h3>
              
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit
              </p>
            </div>

          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-documents-grid-4-col',
    category: 'Documents',
    label: '4-Column Document Grid',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><text x="5" y="10" font-size="4" fill="#0c233c" font-weight="bold">Documents</text><rect x="5" y="12" width="60" height="2" fill="#cbd5e1"/><rect x="5" y="18" width="20" height="35" fill="white" stroke="#e2e8f0"/><rect x="5" y="18" width="20" height="20" fill="#cbd5e1"/><rect x="28" y="18" width="20" height="35" fill="white" stroke="#e2e8f0"/><rect x="28" y="18" width="20" height="20" fill="#cbd5e1"/><rect x="51" y="18" width="20" height="35" fill="white" stroke="#e2e8f0"/><rect x="51" y="18" width="20" height="20" fill="#cbd5e1"/><rect x="74" y="18" width="20" height="35" fill="white" stroke="#e2e8f0"/><rect x="74" y="18" width="20" height="20" fill="#cbd5e1"/></svg>',
    html: `
      <div id="section-documents-grid-4-col" data-gjs-type="section" data-gjs-name="4-Column Documents" class="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          
          <!-- Header -->
          <div class="max-w-3xl mb-12">
            <h2 class="text-3xl md:text-4xl font-display font-black text-[#0c233c] dark:text-white mb-6 tracking-tight">Documents</h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
          
          <!-- 4-Column Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Card 1 -->
            <div class="bg-white dark:bg-slate-800 flex flex-col border border-slate-200 dark:border-slate-700">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Meeting" class="w-full h-full object-cover">
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span class="text-xs font-semibold">10 May 2023</span>
                </div>
                <div class="flex items-start justify-between mt-1 gap-2 mt-auto">
                  <h3 class="font-bold text-[#0c233c] dark:text-white text-lg leading-snug">Lorem Ipsum dolor</h3>
                  <a href="#" class="w-10 h-10 shrink-0 bg-[#1e49e2] text-white rounded-full flex items-center justify-center hover:bg-[#00338d] transition-colors mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white dark:bg-slate-800 flex flex-col border border-slate-200 dark:border-slate-700">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Meeting" class="w-full h-full object-cover">
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span class="text-xs font-semibold">10 May 2023</span>
                </div>
                <div class="flex items-start justify-between mt-1 gap-2 mt-auto">
                  <h3 class="font-bold text-[#0c233c] dark:text-white text-lg leading-snug">Lorem Ipsum dolor</h3>
                  <a href="#" class="w-10 h-10 shrink-0 bg-[#1e49e2] text-white rounded-full flex items-center justify-center hover:bg-[#00338d] transition-colors mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white dark:bg-slate-800 flex flex-col border border-slate-200 dark:border-slate-700">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Meeting" class="w-full h-full object-cover">
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span class="text-xs font-semibold">10 May 2023</span>
                </div>
                <div class="flex items-start justify-between mt-1 gap-2 mt-auto">
                  <h3 class="font-bold text-[#0c233c] dark:text-white text-lg leading-snug">Lorem Ipsum dolor</h3>
                  <a href="#" class="w-10 h-10 shrink-0 bg-[#1e49e2] text-white rounded-full flex items-center justify-center hover:bg-[#00338d] transition-colors mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white dark:bg-slate-800 flex flex-col border border-slate-200 dark:border-slate-700">
              <div class="h-48 w-full shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Meeting" class="w-full h-full object-cover">
              </div>
              <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span class="text-xs font-semibold">10 May 2023</span>
                </div>
                <div class="flex items-start justify-between mt-1 gap-2 mt-auto">
                  <h3 class="font-bold text-[#0c233c] dark:text-white text-lg leading-snug">Lorem Ipsum dolor</h3>
                  <a href="#" class="w-10 h-10 shrink-0 bg-[#1e49e2] text-white rounded-full flex items-center justify-center hover:bg-[#00338d] transition-colors mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  },
  {
    id: 'section-documents-text-content',
    category: 'Documents',
    label: 'Text Content Document',
    svg: '<svg viewBox="0 0 100 60" class="w-full h-full" fill="none"><rect width="100" height="60" fill="#f8fafc"/><rect x="10" y="10" width="80" height="4" fill="#0c233c"/><rect x="10" y="18" width="50" height="3" fill="#0c233c"/><rect x="10" y="24" width="80" height="2" fill="#94a3b8"/><rect x="10" y="28" width="75" height="2" fill="#94a3b8"/><rect x="10" y="34" width="50" height="3" fill="#0c233c"/><rect x="10" y="40" width="80" height="2" fill="#94a3b8"/><rect x="10" y="44" width="75" height="2" fill="#94a3b8"/></svg>',
    html: `
      <div id="section-documents-text-content" data-gjs-type="section" data-gjs-name="Text Content Document" class="w-full py-16 md:py-24 bg-white dark:bg-slate-900" layout-mode="container">
        <div class="container mx-auto px-4 lg:px-0">
          <div class="max-w-4xl">
            <h2 class="text-4xl md:text-5xl font-display font-black text-[#0c233c] dark:text-white mb-10 tracking-tight">Lorem ipsum dolor sit</h2>
            
            <div class="mb-10">
              <h3 class="text-xl md:text-2xl font-bold text-[#0c233c] dark:text-white mb-4">Sed ut perspiciatis unde omnis iste natus</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>

            <div class="mb-10">
              <h3 class="text-xl md:text-2xl font-bold text-[#0c233c] dark:text-white mb-4">Sed ut perspiciatis unde omnis iste natus</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>

            <div class="mb-10">
              <h3 class="text-xl md:text-2xl font-bold text-[#0c233c] dark:text-white mb-4">Sed ut perspiciatis unde omnis iste natus</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>

          </div>
        </div>
      </div>
    `
  }
];
