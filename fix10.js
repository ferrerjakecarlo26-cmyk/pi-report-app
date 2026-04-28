import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/text-\[8px\]/g, 'text-[10px]');
fs.writeFileSync('src/App.tsx', code);
console.log('Fixed sizes.');
