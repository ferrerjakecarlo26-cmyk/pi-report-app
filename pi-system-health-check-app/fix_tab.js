import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const replacements = [
  {
    target: `<div className="section-header border-t border-b border-black">A. HARDWARE</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2">
                <thead>
                  <tr>
                    <th colSpan={5} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>A. HARDWARE</th>
                  </tr>
                  <tr>`
  },
  {
    target: `<div className="section-header border-t border-b border-black">B. SOFTWARE</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>B. SOFTWARE</th>
                  </tr>
                  <tr>`
  },
  {
    target: `<div className="section-header border-t border-b border-black">C. IP ADDRESSES</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>C. IP ADDRESSES</th>
                  </tr>
                  <tr>`
  },
  {
    target: `<div className="section-header border-t border-b border-black page-break-before">D. SYSTEM VALIDATION CHECKLIST</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2 page-break-before">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>D. SYSTEM VALIDATION CHECKLIST</th>
                  </tr>
                  <tr>`
  },
  {
    target: `<div className="section-header border-t border-b border-black">E. FINDINGS AND RECOMMENDATIONS</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2">
                <thead>
                  <tr>
                    <th colSpan={2} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>E. FINDINGS AND RECOMMENDATIONS</th>
                  </tr>
                  <tr>`
  },
  {
    target: `<div className="section-header border-t border-b border-black">F. RESOURCE TEAM</div>
              <table className="w-full">
                <thead>
                  <tr>`,
    replacement: `<table className="w-full mt-2">
                <thead>
                  <tr>
                    <th colSpan={3} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '4px 8px', fontSize: '12px' }}>F. RESOURCE TEAM</th>
                  </tr>
                  <tr>`
  }
];

let changed = false;
for (const {target, replacement} of replacements) {
    if (code.includes(target)) {
        code = code.replace(target, replacement);
        changed = true;
    } else {
        console.log("Could not find:", target);
    }
}

if (changed) {
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed tables');
}
