import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '<label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Criteria</label>',
  '<label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Result</label>'
);

const reportTarget = `                          <td className="text-left align-top">
                            <strong>{item.task}</strong>
                            <br/>
                            <span className="italic">{item.completionCriteria}</span>
                          </td>
                          <td className="text-center align-top">{item.automationMethod}<br/>{item.tools}</td>
                          <td className="text-center align-middle">
                            {item.status !== 'Pending' && <div className="font-bold whitespace-pre-wrap">{item.status}</div>}
                            {item.image && (
                              <img src={item.image} alt="Result" className="mt-2 text-center mx-auto object-contain block" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            )}
                          </td>`;

const reportReplacement = `                          <td className="text-left align-top">
                            <strong>{item.task}</strong>
                          </td>
                          <td className="text-center align-top">{item.automationMethod}<br/>{item.tools}</td>
                          <td className="text-center align-middle">
                            {item.status !== 'Pending' && <div className="font-bold whitespace-pre-wrap">{item.status}</div>}
                            {item.image && (
                              <img src={item.image} alt="Result" className="text-center mx-auto object-contain block my-2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            )}
                            {item.completionCriteria && <div className="mt-2 max-w-full break-words whitespace-pre-wrap text-[10px] font-normal leading-tight text-left">{item.completionCriteria}</div>}
                          </td>`;

code = code.replace(reportTarget, reportReplacement);

fs.writeFileSync('src/App.tsx', code);
