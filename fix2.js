import fs from 'fs';
let code = fs.readFileSync('src/index.css', 'utf-8');

code = code.replace(
  /\.section-header \{[\s\S]*?\}/,
  `.section-header {
  @apply text-slate-900 border-b-2 border-brand-orange pb-2 text-sm font-serif font-bold uppercase tracking-[0.1em] mb-6 rounded-none shadow-none bg-transparent px-0;
  break-after: avoid;
  page-break-after: avoid;
}`
);

fs.writeFileSync('src/index.css', code);
console.log('Fixed CSS.');
