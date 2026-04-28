import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf-8');

const oncloneStart = app.indexOf('onclone: (clonedDoc) => {');
const jsPDFStart = app.indexOf('jsPDF: { unit', oncloneStart);

if (oncloneStart !== -1 && jsPDFStart !== -1) {
  const newOnclone = `onclone: (clonedDoc) => {
              try {
                const report = clonedDoc.getElementById('report-container');
                if (report) {
                  report.style.padding = '0';
                  report.style.width = '210mm';
                  report.style.maxWidth = 'none';
                  report.style.backgroundColor = '#ffffff';
                  // Remove the inline style injection we had, since it overrides the new design
                }
              } catch (e) {
                console.error('PDF refinement failed:', e);
              }
            }
          },
          `;
          
  app = app.substring(0, oncloneStart) + newOnclone + app.substring(jsPDFStart);
  fs.writeFileSync('src/App.tsx', app);
  console.log('Successfully simplified onclone.');
} else {
  console.log('onclone block not found.');
}
