import JSZip from 'jszip';

/**
 * Export the GrapesJS editor content as a fully functional static website ZIP.
 * Handles: multi-page, base64 images, local /public/ images, background images.
 */
export async function exportStaticWebsite(editor: any, projectData: any, themeSettings?: { mode: string; color: string }) {
  const projectName = projectData.name || projectData.title || 'My Website';
  const pages = projectData.pages || [];
  const zip = new JSZip();
  const imageMap = new Map<string, string>(); // dataUri/url -> local zip path
  const fetchedImages = new Map<string, ArrayBuffer>(); // url -> fetched data
  let imgCounter = 0;
  
  // Save current editor state to restore later
  const originalData = editor.getProjectData();

  // Save canvas body state so we can restore it exactly after export
  const canvasBody = editor.Canvas.getBody();
  const savedBodyClass = canvasBody ? canvasBody.className : '';
  const savedBodyStyle = canvasBody ? canvasBody.getAttribute('style') || '' : '';

  // Hide the iframe visually during export to mask the DOM flickering
  const iframe = editor.Canvas.getFrameEl();
  if (iframe) {
    iframe.style.opacity = '0';
  }

  // Helper to normalize page names to filenames
  const getFilename = (nameOrTitle: string, index: number) => {
    if (index === 0) return 'index.html';
    const name = nameOrTitle || 'page';
    return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.html';
  };

  // Helper to detect local/public image paths (starts with / but not // or http)
  const isLocalPath = (src: string) => {
    if (!src) return false;
    // Paths like /images/..., ./images/..., /background/...
    return (src.startsWith('/') || src.startsWith('./')) && !src.startsWith('//') && !src.startsWith('/http');
  };

  // Helper to get extension from a file path
  const getExtFromPath = (filePath: string) => {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'png';
  };

  // Helper to build the local ZIP path for a public asset
  const getLocalImagePath = (src: string) => {
    let cleanSrc = src;
    if (cleanSrc.startsWith('./')) cleanSrc = cleanSrc.substring(2);
    else if (cleanSrc.startsWith('/')) cleanSrc = cleanSrc.substring(1);
    return 'assets/' + cleanSrc.replace(/\//g, '-'); // flatten to single folder
  };

  // Helper to convert base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64.split(',')[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Fetch a local image and cache it
  const fetchLocalImage = async (src: string): Promise<string> => {
    // Already mapped?
    if (imageMap.has(src)) return imageMap.get(src)!;

    const localPath = getLocalImagePath(src);
    imageMap.set(src, localPath);

    let fetched = false;

    try {
      // Vite build replaces /images/ with ./images/ but they are hosted at the root
      let cleanSrc = src;
      if (cleanSrc.startsWith('./')) cleanSrc = cleanSrc.substring(1); // convert ./ to /
      if (!cleanSrc.startsWith('/')) cleanSrc = '/' + cleanSrc;
      
      const url = window.location.origin + cleanSrc;
      const resp = await fetch(url);
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        fetchedImages.set(localPath, buf);
        fetched = true;
      }
    } catch (e) {
      console.warn('[Export] Fetch failed, attempting canvas fallback for:', src);
    }

    // Fallback: If fetch failed (e.g., due to file:// protocol CORS), try reading via canvas
    if (!fetched) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          fetchedImages.set(localPath, base64ToArrayBuffer(dataUrl));
          fetched = true;
        }
      } catch (fallbackErr) {
        console.warn('[Export] Canvas fallback also failed for:', src, fallbackErr);
      }
    }

    return localPath;
  };

  // 1. Process each page
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const filename = getFilename(page.title || page.name, i);
    
    // Load page into editor (for HTML/CSS extraction only)
    editor.loadProjectData(page.layout || {});
    
    // Give Tailwind CDN time to process the DOM and apply styles cleanly
    await new Promise(resolve => setTimeout(resolve, 150));

    // Update dynamic nav links to point to .html files for export
    const navLinks = editor.DomComponents.getWrapper().find('[data-nav-type="dynamic"]');
    navLinks.forEach((nav: any) => {
      nav.components().reset();
      pages.forEach((p: any, idx: number) => {
        const pFilename = getFilename(p.title || p.name, idx);
        nav.append({
          tagName: 'a',
          type: 'link',
          classes: ['text-slate-600', 'dark:text-slate-300', 'hover:text-accent', 'transition-colors', 'w-full', 'md:w-auto', 'text-center', 'py-2', 'md:py-0', 'border-b', 'border-gray-100', 'md:border-none'],
          attributes: { href: pFilename },
          content: p.title || p.name,
        });
      });
      // Add a standard CTA button at the end
      nav.append({
        tagName: 'a',
        type: 'link',
        classes: ['bg-primary', 'text-white', 'hover:bg-accent', 'px-5', 'py-2.5', 'rounded-lg', 'shadow', 'transition-all', 'w-full', 'md:w-auto', 'text-center', 'mt-2', 'md:mt-0'],
        attributes: { href: '#' },
        content: 'Get Started',
      });
    });

    // Extract content
    const htmlBody: string = editor.getHtml() || '';
    let css: string = editor.getCss() || '';
    
    // NOTE: CSS url() processing happens later (line ~383) with correct ../assets/ prefix for css/ subfolder
    let js = '';
    try { js = editor.getJs?.() || ''; } catch (_e) { /* no JS */ }

    const parser = new DOMParser();
    const baseDoc = parser.parseFromString(htmlBody, 'text/html');
    
    // Process section-level custom code
    const advancedEls = baseDoc.querySelectorAll('[data-custom-code]');
    advancedEls.forEach(el => {
      const rawCode = el.getAttribute('data-custom-code');
      if (rawCode) {
        el.insertAdjacentHTML('beforeend', rawCode);
        el.removeAttribute('data-custom-code');
      }
    });

    // 2a. Process <img> tags
    const imgEls = baseDoc.querySelectorAll('img');
    for (const img of Array.from(imgEls)) {
      const src = img.getAttribute('src') || '';
      
      // Base64 images
      if (src.startsWith('data:image/')) {
        const match = src.match(/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/);
        if (match) {
          if (imageMap.has(src)) {
            img.setAttribute('src', imageMap.get(src)!);
          } else {
            const ext = match[1].replace('+xml', '').replace('jpeg', 'jpg');
            imgCounter++;
            const localPath = `assets/image-${imgCounter}.${ext}`;
            imageMap.set(src, localPath);
            img.setAttribute('src', localPath);
          }
        }
      }
      // Local /public/ paths
      else if (isLocalPath(src)) {
        const localPath = await fetchLocalImage(src);
        img.setAttribute('src', localPath);
      }
    }

    // 2a-2. Process <video> tags
    const videoEls = baseDoc.querySelectorAll('video');
    for (const vid of Array.from(videoEls)) {
      const src = vid.getAttribute('src') || '';
      if (isLocalPath(src)) {
        const localPath = await fetchLocalImage(src);
        vid.setAttribute('src', localPath);
      }
    }

    // 2b. Process background-image in style attributes (inline CSS)
    const allEls = baseDoc.querySelectorAll('*');
    for (const el of Array.from(allEls)) {
      const style = el.getAttribute('style') || '';
      if (!style.includes('url(')) continue;

      let newStyle = style;

      // Match base64 background images
      const bgBase64Match = style.match(/url\(["']?(data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,[^"']+)["']?\)/i);
      if (bgBase64Match) {
        const fullDataUri = bgBase64Match[1];
        if (imageMap.has(fullDataUri)) {
          newStyle = newStyle.replace(fullDataUri, imageMap.get(fullDataUri)!);
        } else {
          const ext = bgBase64Match[2].replace('+xml', '').replace('jpeg', 'jpg');
          imgCounter++;
          const localPath = `assets/image-${imgCounter}.${ext}`;
          imageMap.set(fullDataUri, localPath);
          newStyle = newStyle.replace(fullDataUri, localPath);
        }
      }

      // Match local path background images: url('/images/...')  url(./background/...)
      const bgLocalMatches = style.matchAll(/url\(["']?((?:\/|\.\/)[^"')]+)["']?\)/gi);
      for (const m of bgLocalMatches) {
        const rawPath = m[1];
        if (isLocalPath(rawPath) && !rawPath.startsWith('/http')) {
          const localPath = await fetchLocalImage(rawPath);
          newStyle = newStyle.replace(rawPath, localPath);
        }
      }

      if (newStyle !== style) {
        el.setAttribute('style', newStyle);
      }

      // Process Tailwind class attributes for bg-[url(...)] and dark mode forcing
      const className = el.getAttribute('class') || '';
      if (className) {
        let newClassName = className;

        // Fix paths in arbitrary URL classes like bg-[url('/images/photo.jpg')]
        const classUrlMatches = newClassName.matchAll(/\[url\(["']?((?:\/|\.\/)[^"')\]]+)["']?\)\]/gi);
        for (const m of classUrlMatches) {
          const fullMatch = m[0]; // e.g. [url('/images/bg.jpg')]
          const rawPath = m[1];   // e.g. /images/bg.jpg
          if (isLocalPath(rawPath) && !rawPath.startsWith('/http')) {
            const localPath = await fetchLocalImage(rawPath);
            // Replace fullMatch with the correct path
            newClassName = newClassName.replace(fullMatch, fullMatch.replace(rawPath, localPath));
          }
        }

        // Force Light/Dark mode by stripping classes if necessary
        // This guarantees the OS preference won't override the user's chosen theme
        if (themeSettings?.mode === 'light') {
           newClassName = newClassName.split(' ').filter(c => !c.startsWith('dark:')).join(' ');
        }

        if (newClassName !== className) {
          el.setAttribute('class', newClassName);
        }
      }
    }

    // 2c. Process SVG <image> tags with href/xlink:href
    const svgImages = baseDoc.querySelectorAll('image[href], image[xlink\\:href]');
    for (const svgImg of Array.from(svgImages)) {
      for (const attr of ['href', 'xlink:href']) {
        const src = svgImg.getAttribute(attr) || '';
        if (isLocalPath(src)) {
          const localPath = await fetchLocalImage(src);
          svgImg.setAttribute(attr, localPath);
        }
      }
    }

    // 2d. Process background-image in <style> tags
    const styleTags = baseDoc.querySelectorAll('style');
    for (const styleTag of Array.from(styleTags)) {
      let cssContent = styleTag.textContent || '';
      if (!cssContent.includes('url(')) continue;

      const bgMatches = cssContent.matchAll(/url\(["']?((?:\/|\.\/)[^"')]+)["']?\)/gi);
      for (const m of bgMatches) {
        const rawPath = m[1];
        if (isLocalPath(rawPath)) {
          const localPath = await fetchLocalImage(rawPath);
          cssContent = cssContent.replace(new RegExp(rawPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localPath);
        }
      }
      styleTag.textContent = cssContent;
    }

    const processedHtml = baseDoc.body.innerHTML;

    // 3. Widget scripts
    const widgetScripts = [
      '(function(){',
      '  function measureNavbarHeight() {',
      '    var navEl = document.querySelector(\'[data-gjs-name="Navbar"]\') || document.querySelector(\'[class*="sticky"]\') || document.querySelector("header") || document.querySelector("nav");',
      '    var h = navEl ? navEl.getBoundingClientRect().height : 0;',
      '    document.documentElement.style.setProperty("--navbar-h", h + "px");',
      '  }',
      '  measureNavbarHeight();',
      '  window.addEventListener("resize", measureNavbarHeight);',
      'document.querySelectorAll(".accordion-header").forEach(function(h){',
      '  h.addEventListener("click",function(){',
      '    var c=this.nextElementSibling;',
      '    if(c)c.style.display=c.style.display==="none"?"block":"none";',
      '  });',
      '});',
      '})();',
      'if(typeof gsap!=="undefined"&&typeof ScrollTrigger!=="undefined"){',
      '  gsap.registerPlugin(ScrollTrigger);',
      '  document.querySelectorAll("[data-animation]").forEach(function(el){',
      '    var animType=el.getAttribute("data-animation");',
      '    if(!animType)return;',
      '    var vars={scrollTrigger:{trigger:el,start:"top 85%"},duration:0.8,ease:"power2.out",opacity:0,clearProps:"all"};',
      '    if(animType==="fade-in"){ gsap.from(el,vars); }',
      '    else if(animType==="slide-up"){ vars.y=50; gsap.from(el,vars); }',
      '    else if(animType==="slide-left"){ vars.x=-50; gsap.from(el,vars); }',
      '    else if(animType==="slide-right"){ vars.x=50; gsap.from(el,vars); }',
      '    else if(animType==="zoom-in"){ vars.scale=0.8; gsap.from(el,vars); }',
      '  });',
      '}',
    ].join('\n');

    let customExtractedJs = '';
    try {
      const wrapper = editor.getWrapper();
      const extractCustomJs = (model: any) => {
        if (model.get('type') === 'custom-code-block') {
          const bJs = model.get('customJs');
          if (bJs) customExtractedJs += `\n/* Custom Block Code */\n${bJs}\n`;
        }
        const children = model.components();
        if (children && typeof children.forEach === 'function') {
          children.forEach((comp: any) => extractCustomJs(comp));
        }
      };
      if (wrapper) extractCustomJs(wrapper);
    } catch (e) {
      console.error('Failed to extract custom JS', e);
    }

    const allJs = js ? widgetScripts + '\n\n' + js : widgetScripts;
    const finalJs = allJs + '\n\n' + customExtractedJs;

    // 4. Build page HTML
    const themePresets: any = {
      default: { primary: '#00338d', secondary: '#1e49e2', accent: '#00b8f5' },
      purple: { primary: '#4c1d95', secondary: '#7c3aed', accent: '#a78bfa' },
      dark: { primary: '#0f172a', secondary: '#334155', accent: '#38bdf8' },
      pink: { primary: '#be185d', secondary: '#db2777', accent: '#f472b6' }
    };
    const colors = themePresets[themeSettings?.color || 'default'];

    const pageHtml = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>' + (page.name || 'Untitled Page') + ' | ' + projectName + '</title>',
      '  <link rel="stylesheet" href="css/style.css">',
      '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />',
      '  <link rel="preconnect" href="https://fonts.googleapis.com">',
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Open+Sans+Condensed:wght@300;400;600;700;800&display=swap" rel="stylesheet">',
      '  <style type="text/tailwindcss">',
      '    @custom-variant dark (&:where(.dark, .dark *));',
      '    @theme {',
      `      --color-primary: ${colors.primary};`,
      `      --color-secondary: ${colors.secondary};`,
      `      --color-accent: ${colors.accent};`,
      '      --color-dark: #0c233c;',
      '      --color-light-accent: #aceaff;',
      '      --color-cta: #00b8f5;',
      '      --color-purple: #7213ea;',
      '      --color-pink: #fd349c;',
      '      --color-success: #00b894;',
      '      --color-background-dark: #071728;',
      '      --font-sans: "Open Sans", sans-serif;',
      '      --font-display: "Open Sans Condensed", sans-serif;',
      '    }',
      '    @layer components {',
      '      .container { max-width: 1280px !important; margin-left: auto; margin-right: auto; }',
      '    }',
      '    body { font-family: "Open Sans", sans-serif; }',
      '    h1, h2, h3, h4, h5, h6 { font-family: "Open Sans Condensed", sans-serif; }',
      '  </style>',
      '  <style>',
      '    :root { --navbar-h: 0px; }',
      '    [data-full-height="true"] { min-height: calc(100vh - var(--navbar-h, 0px)) !important; }',
      '    [data-vertical-center="true"] { display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; }',
      '  </style>',
      '  <scr' + 'ipt src="https://unpkg.com/@tailwindcss/browser@4"></scr' + 'ipt>',
      '  <scr' + 'ipt src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></scr' + 'ipt>',
      '  <scr' + 'ipt src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></scr' + 'ipt>',
      '</head>',
      `<body class="${editor.Canvas?.getBody?.().className || ''}" style="${editor.Canvas?.getBody?.().style.cssText || ''}">`,
      processedHtml,
      '  <scr' + 'ipt src="js/script.js"></scr' + 'ipt>',
      '</body>',
      '</html>'
    ].join('\n');

    zip.file(filename, pageHtml);
    
    // Take CSS/JS from the first page (shared across pages)
    if (i === 0) {
      // Process CSS for local image urls (background-image in CSS rules)
      // Since style.css is inside css/ folder, assets/ must be referenced as ../assets/
      let processedCss = css;
      const cssUrlMatches = processedCss.matchAll(/url\(["']?(\/[^"')]+)["']?\)/gi);
      const cssPathsToReplace: Array<{ rawPath: string; localPath: string }> = [];
      for (const m of cssUrlMatches) {
        const rawPath = m[1];
        if (isLocalPath(rawPath)) {
          const localPath = await fetchLocalImage(rawPath);
          cssPathsToReplace.push({ rawPath, localPath });
        }
      }
      // Apply replacements - use ../ prefix since CSS is in css/ subfolder
      for (const { rawPath, localPath } of cssPathsToReplace) {
        processedCss = processedCss.replace(
          new RegExp(rawPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          '../' + localPath
        );
      }
      zip.folder('css')!.file('style.css', processedCss || '');
      zip.folder('js')!.file('script.js', finalJs);
    }
  }

  // Restore editor state
  editor.loadProjectData(originalData);

  // Give GrapesJS and Tailwind ample time to rebuild the DOM and process mutations
  await new Promise(resolve => setTimeout(resolve, 300));

  // Restore the canvas body to exactly what it was before export started
  try {
    const body = editor.Canvas.getBody();
    if (body) {
      body.className = savedBodyClass;
      if (savedBodyStyle) {
        body.setAttribute('style', savedBodyStyle);
      } else {
        body.removeAttribute('style');
      }
    }
  } catch (e) {
    console.warn('[Export] Failed to restore body state:', e);
  }

  // Trigger stabilization to fix live preview styles after data swap
  try {
    const doc = editor.Canvas.getDocument();
    const body = editor.Canvas.getBody();
    const win = editor.Canvas.getWindow() as any;
    if (doc && body) {
      // 1. Re-inject Tailwind theme variables
      const old = doc.getElementById('tw-canvas-theme');
      if (old) old.remove();
      const tailwindStyle = doc.createElement('style');
      tailwindStyle.id = 'tw-canvas-theme';
      tailwindStyle.setAttribute('type', 'text/tailwindcss');
      tailwindStyle.innerHTML = `
        @custom-variant dark (&:where(.dark, .dark *));
        @theme {
          --color-primary: var(--theme-primary, #00338d);
          --color-secondary: var(--theme-secondary, #1e49e2);
          --color-accent: var(--theme-accent, #1e49e2);
          --color-dark: var(--theme-dark, #0c233c);
          --color-light-accent: var(--theme-light-accent, #aceaff);
          --color-cta: var(--theme-cta, #00b8f5);
          --color-purple: var(--theme-purple, #7213ea);
          --color-pink: var(--theme-pink, #fd349c);
          --color-success: var(--theme-success, #00b894);
          --color-background-dark: var(--theme-background-dark, #071728);
          --font-sans: "Open Sans", sans-serif;
          --font-display: "Open Sans Condensed", sans-serif;
        }
        @layer components {
          .container { max-width: 1280px !important; margin-left: auto; margin-right: auto; }
        }
      `;
      doc.head.appendChild(tailwindStyle);

      // 2. Purge empty GJS rules that might conflict
      try {
        const cssRules = editor.Css.getAll();
        const emptyRules = cssRules.filter((rule: any) => {
          const style = rule.getStyle();
          return !style || Object.keys(style).length === 0;
        });
        if (emptyRules.length > 0) editor.Css.remove(emptyRules);
      } catch (_) {}
    }
  } catch (e) {
    console.warn('[Export] Failed to stabilize editor after restore:', e);
  }
  
  // 5. Write all collected images to ZIP
  const imgFolder = zip.folder('assets')!;
  
  // Base64 images
  for (const [dataUri, localPath] of imageMap.entries()) {
    if (!dataUri.startsWith('data:image/')) continue; // only base64
    const fileName = localPath.replace('assets/', '');
    const base64Data = dataUri.split(',')[1];
    if (base64Data) {
      imgFolder.file(fileName, base64Data, { base64: true });
    }
  }

  // Fetched local images (from /public/)
  for (const [localPath, buffer] of fetchedImages.entries()) {
    const fileName = localPath.replace('assets/', '');
    imgFolder.file(fileName, buffer);
  }

  // 6. Generate ZIP blob and download
  const safeName = (projectName || 'microsite')
    .replace(/[^a-zA-Z0-9-_ ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'website';

  try {
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, safeName + '.zip');
  } catch (err) {
    console.error('ZIP generation failed:', err);
    alert('Export failed. Please try again.');
  }

  // Restore iframe visibility
  if (iframe) {
    iframe.style.opacity = '1';
  }
}

/**
 * Trigger a file download from a Blob.
 * Implements the File System API to let users pick where they save the file.
 */
async function downloadBlob(blob: Blob, fileName: string) {
  // Use modern File System Access API if available (Chrome/Edge/Opera)
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'ZIP Archive',
          accept: {'application/zip': ['.zip']},
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return; // Successfully saved
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Save file picker failed:', err);
      } else {
        // User just clicked cancel, do nothing.
        return;
      }
    }
  }

  // Fallback for older browsers / Firefox / Safari (legacy MS Edge)
  const nav = window.navigator as any;
  if (nav.msSaveOrOpenBlob) {
    nav.msSaveOrOpenBlob(blob, fileName);
    return;
  }

  // Fallback temporary <a> click
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);

  // Dispatch a real mouse click event
  const clickEvt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  a.dispatchEvent(clickEvt);

  // Clean up
  window.setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 40000);
}
