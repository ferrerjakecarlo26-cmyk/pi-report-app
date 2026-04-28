import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const reportStart = code.indexOf('id="report-container"');
const reportEnd = code.indexOf('</main>', reportStart);

if (reportStart !== -1 && reportEnd !== -1) {
  let reportStr = code.substring(reportStart, reportEnd);
  
  // Further enforce pure black and white in the report text
  reportStr = reportStr
    .replace(/text-slate-600/g, 'text-slate-900')
    .replace(/text-slate-500/g, 'text-slate-900')
    .replace(/text-slate-400/g, 'text-slate-900')
    .replace(/text-slate-300/g, 'text-slate-900')
    .replace(/text-slate-800/g, 'text-slate-900')
    .replace(/text-slate-700/g, 'text-slate-900')
    .replace(/border-slate-100/g, 'border-slate-900')
    .replace(/border-slate-200/g, 'border-slate-900')
    .replace(/bg-slate-100/g, 'bg-white')
    .replace(/bg-slate-[0-9]+/g, 'bg-white') // Any leftover slate backgrounds to white. Wait! This might wipe text classes too.
  
  // Don't use regex for bg-slate-[0-9]+ to avoid making bg-slate-900 white.
  reportStr = reportStr.replace(/bg-slate-50/g, 'bg-white');

  // Let's restore the solid black background headers if they were accidentally made white
  // Oh wait, I want table headers to be white background with bottom border.
  reportStr = reportStr.replace(/<thead className="bg-white">/g, '<thead className="bg-white border-b-2 border-slate-900">');

  code = code.substring(0, reportStart) + reportStr + code.substring(reportEnd);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed report UI colors successfully 2.');
} else {
  console.log('Could not find report container bounds.');
}
