import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove mt-2 from all report tables
code = code.replace(/<table className="w-full mt-2/g, '<table className="w-full mt-0');
code = code.replace(/<table className="w-full mt-2 page-break-before"/g, '<table className="w-full mt-0 page-break-before"');

// 2. Hardware filtering
code = code.replace(
  /\{data\.hardware\.map\(\(item, idx\) => \(/,
  '{data.hardware.filter(h => h.item.trim() !== "").map((item, idx) => ('
);

// 3. Software filtering
code = code.replace(
  /\{data\.software\.length > 0 \? data\.software\.map\(\(machine\) => \(/,
  '{data.software.filter(m => m.items.some(i => i.item.trim() !== "")).map((machine) => ('
);
code = code.replace(
  /machine\.items\.map\(\(comp, idx\) => \(/,
  'machine.items.filter(i => i.item.trim() !== "").map((comp, idx) => ('
);

// 4. IP Addresses filtering
code = code.replace(
  /\{data\.ipAddresses\.map\(\(ip\) => \(/,
  '{data.ipAddresses.filter(i => i.server.trim() !== "").map((ip) => ('
);

// 5. Validation Checklist filtering
code = code.replace(
  /\{data\.parameters\.length > 0 \? data\.parameters\.map\(\(group\) => \(/,
  '{data.parameters.filter(g => g.items.some(i => i.task.trim() !== "")).map((group) => ('
);
code = code.replace(
  /group\.items\.map\(\(item\) => \(/,
  'group.items.filter(i => i.task.trim() !== "").map((item) => ('
);

// 6. Findings filtering
code = code.replace(
  /\{data\.remarks\.map\(\(remark\) => \(/,
  '{data.remarks.filter(r => r.finding.trim() || r.recommendation.trim()).map((remark) => ('
);

// 7. Resource Team filtering
code = code.replace(
  /\{data\.resources\.map\(\(res\) => \(/,
  '{data.resources.filter(r => r.name.trim() !== "").map((res) => ('
);

// 8. Beautify Editor - Outfit font in labels
code = code.replace(/font-black uppercase tracking-\[0\.2em\] text-slate-400/g, 'font-bold uppercase tracking-[0.2em] text-slate-400 font-display');

// 9. Report Results section - tighter spacing and Result: label
code = code.replace(
  /\{item\.completionCriteria && <div className="mt-2 max-w-full break-words whitespace-pre-wrap text-\[10px\] font-normal leading-tight text-left">\{item\.completionCriteria\}<\/div>\}/,
  "{item.completionCriteria && <div className=\"mt-1 max-w-full break-words whitespace-pre-wrap text-[9px] font-normal leading-tight text-left text-slate-600 italic\">Result: {item.completionCriteria}</div>}"
);

// 10. Resource Role text size
code = code.replace(
  /<span className="block text-\[10px\] text-slate-500 uppercase">\{res\.role\}<\/span>/,
  '<span className="block text-[8px] text-slate-500 uppercase font-medium mt-0.5">{res.role}</span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Applied complex UI and filtering fixes');
