import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf-8');

const badPartStart = app.indexOf('</main>\\n\\n            {/* Official Footer */}');
const correctEndTemplate = app.indexOf('          </div>\\n        </div>\\n      )}\\n      </main>');

if (badPartStart !== -1 && correctEndTemplate !== -1) {
  // We want to delete from badPartStart up to correctEndTemplate
  app = app.substring(0, badPartStart) + app.substring(correctEndTemplate);
  fs.writeFileSync('src/App.tsx', app);
  console.log('Fixed syntax error');
} else {
  console.log('Could not find bounds to fix error.', {badPartStart, correctEndTemplate});
}
