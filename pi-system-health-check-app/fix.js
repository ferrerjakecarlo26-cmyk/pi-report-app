import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const reportStart = code.indexOf('id="report-container"');
const reportEnd = code.indexOf('</main>', reportStart);

if (reportStart !== -1 && reportEnd !== -1) {
  let reportStr = code.substring(reportStart, reportEnd);
  
  // Clean up gray backgrounds and borders
  reportStr = reportStr
    .replace(/bg-slate-50\/50/g, 'bg-white')
    .replace(/bg-slate-50/g, 'bg-white')
    .replace(/text-slate-400/g, 'text-slate-600') // darken text
    .replace(/text-slate-500/g, 'text-slate-900') // darken text
    .replace(/shadow-2xl/g, 'shadow-none border border-slate-200')
    .replace(/border-b-4 border-slate-900/g, 'border-b-2 border-brand-orange')
    .replace(/bg-brand-orange\/5/g, 'bg-white')
    .replace(/border-brand-orange\/10/g, 'border-brand-orange')
    .replace(/border-l border-slate-200/g, 'border-l-2 border-brand-orange');

  code = code.substring(0, reportStart) + reportStr + code.substring(reportEnd);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed report UI colors successfully.');
} else {
  console.log('Could not find report container bounds.');
}
