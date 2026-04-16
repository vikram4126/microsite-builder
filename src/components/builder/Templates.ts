import { sectionsLibrary } from './Sections';

export const registerTemplates = (editor: any) => {
  const bm = editor.BlockManager;

  // Construct the template by combining only sections from 'Full Page Templates' category
  const content = `
<div data-gjs-type="default" data-gjs-droppable="true" data-gjs-custom-name="Page Block" class="template-wrapper w-full flex flex-col min-h-screen">
  ${sectionsLibrary
    .filter(section => section.category === 'Full Page Templates')
    .map(section => section.html)
    .join('\n')}
</div>
`;

  bm.add('template-business', {
    label: 'Business Landing Page',
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#1e49e2]"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
    category: 'Full Page Templates',
    content
  });
};
