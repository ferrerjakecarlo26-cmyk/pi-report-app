import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Tighten cell padding in stylesheet
code = code.replace(
  /padding: 4px 8px;/g,
  'padding: 2px 4px;'
);
code = code.replace(
  /padding: 2px 8px;/g,
  'padding: 2px 4px;'
);

// Clear remarks fields (regex needs to match EXACTLY, let's use a simpler match)
code = code.replace(
  /<td className="text-center">{item\.remarks \|\| 'N\/A'}<\/td>/g,
  '<td className="text-center"></td>'
);
// Software: 
code = code.replace(
  /<td className="text-center">{comp\.remarks \|\| 'Not Part of the Upgrade'}<\/td>/g,
  '<td className="text-center"></td>'
);
// IP: 
code = code.replace(
  /<td className="text-center">{ip\.remarks \|\| 'N\/A'}<\/td>/g,
  '<td className="text-center"></td>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Polished report layout and cleared remarks');
