import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `<td className="text-center align-middle font-bold">{item.status}</td>`;
const replacement = `<td className="text-center align-middle">
                            {item.status !== 'Pending' && <div className="font-bold whitespace-pre-wrap">{item.status}</div>}
                            {item.image && (
                              <img src={item.image} alt="Result" className="mt-2 text-center mx-auto object-contain block" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            )}
                          </td>`;

code = code.replace(target, replacement);

const selectTarget = `<select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold"
                                        value={item.status}
                                        onChange={(e) => updateParameterItem(group.id, item.id, 'status', e.target.value)}
                                      >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                        <option value="Pending">Pending</option>
                                        <option value="N/A">N/A</option>
                                      </select>`;

const selectReplacement = `<textarea
                                        rows={2}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold resize-y min-h-[40px]"
                                        value={item.status}
                                        placeholder="e.g. Pass, Fail, or custom text"
                                        onChange={(e) => updateParameterItem(group.id, item.id, 'status', e.target.value)}
                                      />`;
code = code.replace(selectTarget, selectReplacement);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed image and status in report');
