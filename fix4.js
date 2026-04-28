import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/font-mono/g, 'font-sans');
fs.writeFileSync('src/App.tsx', code);
console.log('Removed font-mono.');
