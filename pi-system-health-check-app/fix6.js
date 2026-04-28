import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf-8');

const reportStart = app.indexOf('id="report-container"');
const reportEnd = app.indexOf('</main>', reportStart);

if (reportStart !== -1 && reportEnd !== -1) {
  let reportStr = app.substring(reportStart, reportEnd);
  
  // Clean up all sizes to match 10, 12, 14
  reportStr = reportStr
    .replace(/text-3xl/g, 'text-[14px]')
    .replace(/text-2xl/g, 'text-[14px]')
    .replace(/text-xl/g, 'text-[14px]')
    .replace(/text-lg/g, 'text-[14px]')
    .replace(/text-base/g, 'text-[14px]')
    .replace(/text-sm/g, 'text-[12px]')
    .replace(/text-xs/g, 'text-[10px]') 
    .replace(/text-\[11px\]/g, 'text-[12px]')
    .replace(/text-\[10px\]/g, 'text-[10px]')
    .replace(/text-\[9px\]/g, 'text-[10px]')
    .replace(/text-\[8px\]/g, 'text-[10px]');
    
  app = app.substring(0, reportStart) + reportStr + app.substring(reportEnd);
  
  // also fix injected CSS inside App.tsx
  app = app.replace(/font-size: 16px !important;/g, "font-size: 14px !important;");
  
  fs.writeFileSync('src/App.tsx', app);
  console.log('Fixed font sizes in report container');
} else {
  console.log('Could not find bounds');
}
