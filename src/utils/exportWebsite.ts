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

  // Helper to normalize page names to filenames
  const getFilename = (nameOrTitle: string, index: number) => {
    if (index === 0) return 'index.html';
    const name = nameOrTitle || 'page';
    return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.html';
  };

  // Helper to detect local/public image paths (starts with / but not // or http)
  const isLocalPath = (src: string) => {
    if (!src) return false;
    // Paths like /images/..., /background/..., /team-member/..., /thumbs/...
    return (src.startsWith('/') && !src.startsWith('//') && !src.startsWith('/http'));
  };

  // Helper to get extension from a file path
  const getExtFromPath = (filePath: string) => {
    const parts = filePath.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'png';
  };

  // Helper to build the local ZIP path for a public asset
  const getLocalImagePath = (src: string) => {
    // src is like /images/image-1.png or /team-member/member-2.jpg or /background/bg.jpg
    // We want: images/images/image-1.png -> just use the path without leading /
    // All go into the images/ folder in the zip
    const cleanSrc = src.startsWith('/') ? src.substring(1) : src;
    return 'images/' + cleanSrc.replace(/\//g, '-'); // flatten to single folder
  };

  // Fetch a local image and cache it
  const fetchLocalImage = async (src: string): Promise<string> => {
    // Already mapped?
    if (imageMap.has(src)) return imageMap.get(src)!;

    const localPath = getLocalImagePath(src);
    imageMap.set(src, localPath);

    try {
      // Fetch from dev server (images served from /public)
      const url = window.location.origin + src;
      const resp = await fetch(url);
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        fetchedImages.set(localPath, buf);
      }
    } catch (e) {
      console.warn('[Export] Failed to fetch image:', src, e);
    }

    return localPath;
  };

  // 1. Process each page
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const filename = getFilename(page.title || page.name, i);
    
    // Load page into editor
    editor.loadProjectData(page.layout || {});
    
    // Re-apply theme to body after load
    const body = editor.Canvas.getBody();
    if (themeSettings?.mode === 'dark') {
      body.classList.add('dark');
      body.style.backgroundColor = '#0c233c';
    } else {
      body.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
    }

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
    
    // Process global CSS for local images
    if (css.includes('url(')) {
      const bgMatches = css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/gi);
      for (const m of bgMatches) {
        const rawPath = m[1];
        if (isLocalPath(rawPath)) {
          const localPath = await fetchLocalImage(rawPath);
          css = css.replace(new RegExp(rawPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localPath);
        }
      }
    }
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
            const localPath = `images/image-${imgCounter}.${ext}`;
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
          const localPath = `images/image-${imgCounter}.${ext}`;
          imageMap.set(fullDataUri, localPath);
          newStyle = newStyle.replace(fullDataUri, localPath);
        }
      }

      // Match local path background images: url('/images/...')  url(/background/...)
      const bgLocalMatches = style.matchAll(/url\(["']?(\/[^"')]+)["']?\)/gi);
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

      const bgMatches = cssContent.matchAll(/url\(["']?(\/[^"')]+)["']?\)/gi);
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
      'document.querySelectorAll(".accordion-header").forEach(function(h){',
      '  h.addEventListener("click",function(){',
      '    var c=this.nextElementSibling;',
      '    if(c)c.style.display=c.style.display==="none"?"block":"none";',
      '  });',
      '});',
      'document.querySelectorAll(".tab-btn").forEach(function(btn){',
      '  btn.addEventListener("click",function(){',
      '    var p=this.parentElement;if(!p)return;',
      '    var root=p.parentElement;if(!root)return;',
      '    p.querySelectorAll(".tab-btn").forEach(function(b){b.classList.remove("active");});',
      '    this.classList.add("active");',
      '    root.querySelectorAll(".tab-content").forEach(function(c){c.style.display="none";});',
      '    var t=this.getAttribute("data-target");',
      '    if(t){var el=root.querySelector("#"+t);if(el)el.style.display="block";}',
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
    const sc = 'script';
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
      '    body { font-family: "Open Sans", sans-serif; }',
      '    h1, h2, h3, h4, h5, h6 { font-family: "Open Sans Condensed", sans-serif; }',
      '  </style>',
      '  <' + sc + ' src="https://unpkg.com/@tailwindcss/browser@4"></' + sc + '>',
      '  <' + sc + ' src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></' + sc + '>',
      '  <' + sc + ' src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></' + sc + '>',
      '</head>',
      `<body class="${editor.Canvas?.getBody?.().className || ''}" style="${editor.Canvas?.getBody?.().style.cssText || ''}">`,
      processedHtml,
      '  <' + sc + ' src="js/script.js"></' + sc + '>',
      '</body>',
      '</html>'
    ].join('\n');

    zip.file(filename, pageHtml);
    
    // Take CSS/JS from the first page (shared across pages)
    if (i === 0) {
      // Also process CSS for local image urls (background-image in CSS rules)
      let processedCss = css;
      const cssUrlMatches = css.matchAll(/url\(["']?(\/[^"')]+)["']?\)/gi);
      for (const m of cssUrlMatches) {
        const rawPath = m[1];
        if (isLocalPath(rawPath)) {
          const localPath = await fetchLocalImage(rawPath);
          processedCss = processedCss.replace(rawPath, localPath);
        }
      }
      zip.folder('css')!.file('style.css', processedCss || '');
      zip.folder('js')!.file('script.js', finalJs);
    }
  }

  // Restore editor state
  editor.loadProjectData(originalData);

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

      // 3. Force Tailwind rescan
      body.classList.add('__tw-rescan');
      setTimeout(() => {
        body.classList.remove('__tw-rescan');
        if (win && win.__tailwindBrowser?.rebuild) {
          win.__tailwindBrowser.rebuild();
        }
      }, 100);
    }
  } catch (e) {
    console.warn('[Export] Failed to stabilize editor after restore:', e);
  }
  
  // 5. Write all collected images to ZIP
  const imgFolder = zip.folder('images')!;
  
  // Base64 images
  for (const [dataUri, localPath] of imageMap.entries()) {
    if (!dataUri.startsWith('data:image/')) continue; // only base64
    const fileName = localPath.replace('images/', '');
    const base64Data = dataUri.split(',')[1];
    if (base64Data) {
      imgFolder.file(fileName, base64Data, { base64: true });
    }
  }

  // Fetched local images (from /public/)
  for (const [localPath, buffer] of fetchedImages.entries()) {
    const fileName = localPath.replace('images/', '');
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
