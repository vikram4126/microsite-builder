const fs = require('fs');
const path = require('path');

const sectionsFile = path.join(__dirname, 'src/components/builder/Sections.ts');
let content = fs.readFileSync(sectionsFile, 'utf8');

// Replacements array [find (string or regex), replace]
const replacements = [
  // 1. CTA Blocks
  [
    /label: 'Vibrant Call-to-Action Block',/g,
    "label: 'Vibrant CTA Block',"
  ],
  [
    /data-gjs-name="Call to Action"/g,
    'data-gjs-name="Vibrant CTA Block"'
  ],
  [
    /label: 'Split Card Banner with Download PDF',/g,
    "label: 'Split Card Banner (Download)',"
  ],
  [
    /data-gjs-name="Split CTA Card"/g,
    'data-gjs-name="Split Card Banner (Download)"'
  ],
  [
    /label: 'Dark Explore Findings CTA',/g,
    "label: 'Dark CTA Block',"
  ],
  [
    /data-gjs-name="Explore CTA"/g,
    'data-gjs-name="Dark CTA Block"'
  ],

  // 2. Introduction
  [
    /label: 'Trust & Impact Banner \(Text \+ Large Image\)',/g,
    "label: 'Text & Large Image Banner',"
  ],
  [
    /data-gjs-name="Trust Hero"/g,
    'data-gjs-name="Text & Large Image Banner"'
  ],
  [
    /label: 'CEO Welcome Letter with Signature',/g,
    "label: 'Welcome Letter with Signature',"
  ],
  [
    /data-gjs-name="Introduction Letter"/g,
    'data-gjs-name="Welcome Letter with Signature"'
  ],

  // 3. Contacts
  [
    /label: 'Functional Team Directory \(10 Avatars\)',/g,
    "label: 'Team Directory (Avatars Grid)',"
  ],
  [
    /data-gjs-name="Team Grid"/g,
    'data-gjs-name="Team Directory (Avatars Grid)"'
  ],
  [
    /label: 'Meet the team Grid',/g,
    "label: 'Meet the Team Grid',"
  ],
  [
    /data-gjs-name="Meet the Team"/g,
    'data-gjs-name="Meet the Team Grid"'
  ],

  // 4. Data Visualization
  [
    /data-gjs-name="Stats Section"/g,
    'data-gjs-name="Circle Statistics Row"'
  ],
  [
    /data-gjs-name="Number Cards Section"/g,
    'data-gjs-name="Number Stat Cards"'
  ],
  [
    /data-gjs-name="Divided Stats Section"/g,
    'data-gjs-name="Divided Stats Row"'
  ],

  // 5. Case Studies
  [
    /data-gjs-name="Questions Section"/g,
    'data-gjs-name="Numbered Questions List"'
  ],
  [
    /data-gjs-name="Quote Section"/g,
    'data-gjs-name="Cards with Quote Overlay"'
  ],
  [
    /data-gjs-name="Case Study Detail"/g,
    'data-gjs-name="Detailed Case Study"'
  ],
  [
    /data-gjs-name="Features & CTA"/g,
    'data-gjs-name="Features List with Right CTA"'
  ],

  // 6. Documents
  [
    /data-gjs-name="Documents Section"/g,
    'data-gjs-name="Document Resources Grid"'
  ],
  [
    /data-gjs-name="Download Hero"/g,
    'data-gjs-name="Download Resource Hero"'
  ],
  [
    /data-gjs-name="Reports List"/g,
    'data-gjs-name="Reports List (Right Image)"'
  ],

  // 7. Timeline & Tabs
  [
    /data-gjs-name="Timeline Section"/g,
    'data-gjs-name="Horizontal Project Timeline"'
  ],
  [
    /data-gjs-name="Vertical Tabs"/g,
    'data-gjs-name="Vertical Content Tabs"'
  ]
];

replacements.forEach(([search, replace]) => {
  content = content.replace(search, replace);
});

fs.writeFileSync(sectionsFile, content, 'utf8');
console.log('Successfully updated Sections.ts');

// Also update Templates.ts where Template-2 hardcodes some data-gjs-name
const templatesFile = path.join(__dirname, 'src/components/builder/Templates.ts');
if (fs.existsSync(templatesFile)) {
  let tContent = fs.readFileSync(templatesFile, 'utf8');
  tContent = tContent.replace(/data-gjs-name="Intro Section"/g, 'data-gjs-name="Introduction"');
  tContent = tContent.replace(/data-gjs-name="Features Grid"/g, 'data-gjs-name="Service Cards (Icons)"'); // matches Sections.ts
  tContent = tContent.replace(/data-gjs-name="Cards Grid"/g, 'data-gjs-name="Feature Cards Grid"');
  fs.writeFileSync(templatesFile, tContent, 'utf8');
  console.log('Successfully updated Templates.ts');
}

// Update Blocks.ts where generic advanced widgets are
const blocksFile = path.join(__dirname, 'src/components/builder/Blocks.ts');
if (fs.existsSync(blocksFile)) {
  let bContent = fs.readFileSync(blocksFile, 'utf8');
  bContent = bContent.replace(/data-gjs-name="Intro Section"/g, 'data-gjs-name="Introduction Section"');
  bContent = bContent.replace(/data-gjs-name="Partner Message Section"/g, 'data-gjs-name="Global Lead Partner Message"');
  fs.writeFileSync(blocksFile, bContent, 'utf8');
  console.log('Successfully updated Blocks.ts');
}

