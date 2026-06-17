const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src', 'components', 'builder', 'Blocks.ts'),
  path.join(__dirname, 'src', 'components', 'builder', 'Sections.ts')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Exact string replacement
  content = content.split('bg-[#1e49e2]').join('bg-[var(--color-secondary)]');
  content = content.split('text-[#1e49e2]').join('text-[var(--color-secondary)]');
  content = content.split('border-[#1e49e2]').join('border-[var(--color-secondary)]');
  content = content.split('hover:bg-[#1e49e2]').join('hover:bg-[var(--color-secondary)]');
  content = content.split('hover:text-[#1e49e2]').join('hover:text-[var(--color-secondary)]');
  content = content.split('hover:border-[#1e49e2]').join('hover:border-[var(--color-secondary)]');

  content = content.split('bg-[#00338d]').join('bg-[var(--color-primary)]');
  content = content.split('text-[#00338d]').join('text-[var(--color-primary)]');
  content = content.split('border-[#00338d]').join('border-[var(--color-primary)]');
  content = content.split('hover:bg-[#00338d]').join('hover:bg-[var(--color-primary)]');
  content = content.split('hover:text-[#00338d]').join('hover:text-[var(--color-primary)]');
  content = content.split('fill="#00338d"').join('fill="var(--color-primary)"'); // SVGs!
  content = content.split('fill="#1e49e2"').join('fill="var(--color-secondary)"'); // SVGs!

  content = content.split('bg-[#0c233c]').join('bg-[var(--color-dark)]');
  content = content.split('text-[#0c233c]').join('text-[var(--color-dark)]');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
