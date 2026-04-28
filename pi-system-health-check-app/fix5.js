import fs from 'fs';

// Fix index.css
let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/@import url\('.*?'\);\n/g, '');
css = css.replace(/--font-sans:.*?;/g, '--font-sans: Arial, Helvetica, sans-serif;');
css = css.replace(/--font-serif:.*?;/g, '--font-serif: Arial, Helvetica, sans-serif;');
css = css.replace(/--font-mono:.*?;/g, '--font-mono: Arial, Helvetica, sans-serif;');
fs.writeFileSync('src/index.css', css);

// Fix App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf-8');
app = app.replace(/@import url\('.*?Playfair.*?'\);\n\s*/g, '');
app = app.replace(/font-family: 'Inter'.*?;/g, "font-family: Arial, Helvetica, sans-serif !important;");
app = app.replace(/font-family: 'Playfair Display'.*?;/g, "font-family: Arial, Helvetica, sans-serif !important;");
fs.writeFileSync('src/App.tsx', app);

console.log('Fixed fonts in CSS and App.tsx');
