import JSZip from 'jszip';

/**
 * Export the GrapesJS editor content as a fully functional static website ZIP.
 */
export async function exportStaticWebsite(editor: any, projectName: string) {
  // 1. Extract content from the editor
  const htmlBody: string = editor.getHtml() || '';
  const css: string = editor.getCss() || '';
  let js = '';
  try { js = editor.getJs?.() || ''; } catch (_e) { /* no JS */ }

  const parser = new DOMParser();
  const baseDoc = parser.parseFromString(htmlBody, 'text/html');
  
  // Process section-level custom code (Level 2)
  const advancedEls = baseDoc.querySelectorAll('[data-custom-code]');
  advancedEls.forEach(el => {
    const rawCode = el.getAttribute('data-custom-code');
    if (rawCode) {
      // Inject the raw code at the end of the element
      el.insertAdjacentHTML('beforeend', rawCode);
      el.removeAttribute('data-custom-code');
    }
  });

  let processedHtml = baseDoc.body.innerHTML;

  // 2. Scan for base64 images and extract them
  const imageMap = new Map<string, string>();

  const base64Regex = /src="(data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,([^"]+))"/gi;
  let match: RegExpExecArray | null;
  let imgCounter = 0;
  while ((match = base64Regex.exec(htmlBody)) !== null) {
    const fullDataUri = match[1];
    const ext = match[2].replace('+xml', '').replace('jpeg', 'jpg');
    imgCounter++;
    const localPath = 'images/image-' + imgCounter + '.' + ext;
    imageMap.set(fullDataUri, localPath);
    processedHtml = processedHtml.split(fullDataUri).join(localPath);
  }

  // 3. Widget scripts for interactive elements
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
    '});',
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
    '})();',
  ].join('\n');

  let customExtractedJs = '';
  try {
    const wrapper = editor.getWrapper();
    const extractCustomJs = (model: any) => {
      if (model.get('type') === 'custom-code-block') {
        const bJs = model.get('customJs');
        if (bJs) {
          customExtractedJs += `\n/* Custom Block Code */\n${bJs}\n`;
        }
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

  // 4. Build index.html
  // Use a variable for the tag name to prevent Vite from parsing it
  const sc = 'script';
  const indexParts: string[] = [];
  indexParts.push('<!DOCTYPE html>');
  indexParts.push('<html lang="en">');
  indexParts.push('<head>');
  indexParts.push('  <meta charset="UTF-8">');
  indexParts.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  indexParts.push('  <title>' + (projectName || 'My Website') + '</title>');
  indexParts.push('  <link rel="stylesheet" href="css/style.css">');
  indexParts.push('  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">');
  indexParts.push('  <' + sc + ' src="https://cdn.tailwindcss.com?plugins=forms"></' + sc + '>');
  indexParts.push('  <' + sc + ' src="canvas-tailwind-config.js"></' + sc + '>');
  indexParts.push('  <' + sc + ' src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></' + sc + '>');
  indexParts.push('  <' + sc + ' src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></' + sc + '>');
  indexParts.push('</head>');
  const bodyEl = editor.Canvas?.getBody?.();
  const themeStyles = bodyEl ? bodyEl.style.cssText : '';
  const bodyClasses = bodyEl ? bodyEl.className : '';
  
  indexParts.push(`<body class="${bodyClasses}" style="${themeStyles}">`);
  indexParts.push(processedHtml);
  indexParts.push('  <' + sc + ' src="js/script.js"></' + sc + '>');
  indexParts.push('</body>');
  indexParts.push('</html>');
  const indexHtml = indexParts.join('\n');

  // 5. Build ZIP archive
  const zip = new JSZip();
  zip.file('index.html', indexHtml);
  zip.folder('css')!.file('style.css', css || '');
  zip.folder('js')!.file('script.js', finalJs);
  
  // Embed tailwind configuration
  const tailwindConfigStr = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "var(--theme-primary, #00338d)",
        "accent": "var(--theme-accent, #00b8f5)",
        "secondary": "var(--theme-secondary, #1e49e2)",
        "background-light": "var(--theme-bg-light, #f5f6f8)",
        "background-dark": "var(--theme-bg-dark, #0c233c)",
        "brand-navy": "var(--theme-navy, #0c233c)",
        "purple-accent": "var(--theme-purple, #7213ea)",
        "pink-accent": "var(--theme-pink, #fd349c)"
      },
      fontFamily: {
        "display": ["Public Sans", "Inter", "sans-serif"]
      }
    }
  }
};`;
  zip.file('canvas-tailwind-config.js', tailwindConfigStr);

  if (imageMap.size > 0) {
    const imgFolder = zip.folder('images')!;
    for (const [dataUri, localPath] of imageMap.entries()) {
      const fileName = localPath.replace('images/', '');
      const base64Data = dataUri.split(',')[1];
      if (base64Data) {
        imgFolder.file(fileName, base64Data, { base64: true });
      }
    }
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
