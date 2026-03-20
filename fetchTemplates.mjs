import fs from 'fs';

const templates = [
  {
    id: 'template-fintech',
    label: 'Fintech Landing Page',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzEyZDJjYTIwMzU1ZDQ4ODVhNTg5ZTE0YzZlMDk3MzU1EgsSBxDroKu_jQ8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MzM2ODYyMzYwNjg1NjgyNzU4&filename=&opi=96797242'
  },
  {
    id: 'template-corporate',
    label: 'Corporate Home',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M0MzY5MTA5MjIyOTQwMDRhNmM1ODQ4OGRhODQ4MGJmEgsSBxDroKu_jQ8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MzM2ODYyMzYwNjg1NjgyNzU4&filename=&opi=96797242'
  },
  {
    id: 'template-gaming',
    label: 'Gaming Platform',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzIwM2E0MjA2NmQ1NDQ4ODg5YmVlYTkwZTQxMjBjMDBjEgsSBxDroKu_jQ8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MzM2ODYyMzYwNjg1NjgyNzU4&filename=&opi=96797242'
  },
  {
    id: 'template-analytics',
    label: 'Reports & Analytics',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y4ODJhZjQzMTQ0ZTRkNTc5ZDc4N2NmMjRmYjA2NjY2EgsSBxDroKu_jQ8YAZIBIwoKcHJvamVjdF9pZBIVQhM5MzM2ODYyMzYwNjg1NjgyNzU4&filename=&opi=96797242'
  }
];

async function generate() {
  let output = `import { Editor } from 'grapesjs';\n\nexport const registerTemplates = (editor: Editor) => {\n  const bm = editor.BlockManager;\n\n`;

  for (const t of templates) {
    console.log('Fetching', t.label);
    const res = await fetch(t.url);
    const html = await res.text();
    // Extract body content
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (match) {
      let content = match[1];
      // remove scripts if any
      content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      // escape backticks and ${}
      content = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      
      output += `  bm.add('${t.id}', {\n`;
      output += `    label: '<div class="flex flex-col items-center gap-2 py-2"><i class="fa fa-file-code text-2xl"></i><span class="text-xs text-center">${t.label}</span></div>',\n`;
      output += `    category: 'Full Page Templates',\n`;
      output += `    content: \`${content}\`,\n`;
      output += `  });\n\n`;
    }
  }

  output += `};\n`;
  fs.writeFileSync('./src/components/builder/Templates.ts', output);
  console.log('Templates.ts generated successfully.');
}

generate();
