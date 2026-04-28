import fs from 'fs';

let app = fs.readFileSync('src/App.tsx', 'utf-8');

const reportStart = app.indexOf('id="report-container"');
const reportEnd = app.indexOf('</main>', reportStart);

if (reportStart !== -1 && reportEnd !== -1) {
  const newReport = `id="report-container" className="bg-white p-8 w-full max-w-[1000px] font-sans text-black mx-auto">
            <style>
              {\`
                #report-container table {
                  border-collapse: collapse;
                  width: 100%;
                }
                #report-container th, #report-container td {
                  border: 1px solid #000;
                  padding: 4px 8px;
                  font-family: Arial, Helvetica, sans-serif !important;
                }
                #report-container td {
                  font-size: 10px;
                }
                #report-container .section-header {
                  background-color: #595959;
                  color: #fff;
                  font-size: 12px;
                  font-weight: bold;
                  text-align: left;
                  padding: 2px 8px;
                  font-family: Arial, Helvetica, sans-serif !important;
                }
                #report-container .col-header {
                  background-color: #dce6f1;
                  font-weight: bold;
                  text-align: center;
                  text-transform: uppercase;
                  font-size: 10px;
                }
              \`}
            </style>

            <div className="border-[2px] border-black p-0">
              {/* Header section as a table */}
              <table className="w-full mb-0 border-none">
                <tbody>
                  <tr>
                    <td className="w-[30%] align-top border-black p-4">
                      <C8Logo className="h-10 mb-2" />
                      <p className="text-[8px] leading-tight mt-1">
                        Calibr8 Systems Inc.<br />
                        Unit 3004 Antel Global Corporate Center<br />
                        3 Julia Vargas Avenue, Pasig City 160
                      </p>
                    </td>
                    <td className="w-[40%] align-middle text-center border-black p-0">
                      <h1 className="text-[14px] font-bold mt-2">PI SYSTEM HEALTH</h1>
                      <h1 className="text-[14px] font-bold mb-2">CHECKLIST</h1>
                      <div className="bg-[#fff2cc] border-t border-black w-full py-1 text-[12px]">
                        {data.siteInfo.customerName || 'Customer Name'}
                      </div>
                    </td>
                    <td className="w-[30%] p-0 border-black align-top">
                      <table className="w-full h-full border-none m-0">
                        <tbody>
                          <tr>
                            <td className="col-header border-b border-black text-left w-[40%]">PI SITE NUMBER</td>
                            <td className="border-b border-l border-black bg-white">{data.siteInfo.siteNumber || ''}</td>
                          </tr>
                          <tr>
                            <td className="col-header border-b border-black text-left">PO NUMBER</td>
                            <td className="border-b border-l border-black bg-white">{data.siteInfo.poNumber || ''}</td>
                          </tr>
                          <tr>
                            <td className="col-header border-b border-black text-left">PO DATE</td>
                            <td className="border-b border-l border-black bg-white">{data.siteInfo.poDate || ''}</td>
                          </tr>
                          <tr>
                            <td className="col-header border-b border-black text-left">SERVICE TYPE</td>
                            <td className="border-b border-l border-black bg-white">{data.siteInfo.serviceType || ''}</td>
                          </tr>
                          <tr>
                            <td className="col-header border-black text-left">SERVICE DATE</td>
                            <td className="border-l border-black bg-white">{data.siteInfo.datePrepared || ''}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* A. HARDWARE */}
              <div className="section-header border-t border-b border-black">A. HARDWARE</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[6%]">QTY</th>
                    <th className="col-header w-[14%]">UNIT</th>
                    <th className="col-header w-[28%]">ITEM</th>
                    <th className="col-header w-[37%]">SPECIFICATIONS</th>
                    <th className="col-header w-[15%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.hardware.map((item, idx) => (
                    <tr key={item.id} className="bg-white">
                      <td className="text-center">{item.qty}</td>
                      <td className="text-center text-red-500">{item.unit}</td>
                      <td className="text-center text-red-500">{item.item}</td>
                      <td className="text-left whitespace-pre-wrap align-top">
                        <ul className="list-disc pl-4 m-0 leading-tight">
                          {item.specifications.split('\\n').map((spec, i) => spec.trim() ? <li key={i}>{spec.replace(/^[-•]\\s*/, '')}</li> : null)}
                        </ul>
                      </td>
                      <td className="text-center">{item.remarks || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* B. SOFTWARE */}
              <div className="section-header border-t border-b border-black">B. SOFTWARE</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[35%]">ITEMS</th>
                    <th className="col-header w-[22%]">PRE-UPGRADE VERSION</th>
                    <th className="col-header w-[22%]">POST-UPGRADE<br/>VERSION</th>
                    <th className="col-header w-[21%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.software.length > 0 ? data.software.map((machine) => (
                    <React.Fragment key={machine.id}>
                      {machine.items.map((comp, idx) => (
                        <tr key={comp.id} className="bg-white">
                          <td className="text-left">{comp.item}</td>
                          <td className="text-center">{comp.preUpgrade}</td>
                          <td className="text-center">{comp.postUpgrade}</td>
                          <td className="text-center">{comp.remarks || 'Not Part of the Upgrade'}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )) : (
                    <tr><td colSpan={4} className="text-center">No software data</td></tr>
                  )}
                </tbody>
              </table>

              {/* C. IP ADDRESSES */}
              <div className="section-header border-t border-b border-black">C. IP ADDRESSES</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[30%]">SERVER</th>
                    <th className="col-header w-[20%]">NIC</th>
                    <th className="col-header w-[25%]">IP ADDRESS</th>
                    <th className="col-header w-[25%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ipAddresses.map((ip) => (
                    <tr key={ip.id} className="bg-white">
                      <td className="text-left">{ip.server}</td>
                      <td className="text-center">{ip.nic}</td>
                      <td className="text-center">{ip.ipAddress}</td>
                      <td className="text-center">{ip.remarks || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* D. SYSTEM VALIDATION CHECKLIST */}
              <div className="section-header border-t border-b border-black page-break-before">D. SYSTEM VALIDATION CHECKLIST</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[20%]">COMPONENT</th>
                    <th className="col-header w-[40%]">VERIFICATION TASK</th>
                    <th className="col-header w-[20%]">METHOD/TOOLKIT</th>
                    <th className="col-header w-[20%]">RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {data.parameters.length > 0 ? data.parameters.map((group) => (
                    <React.Fragment key={group.id}>
                      <tr>
                        <td colSpan={4} className="bg-[#f2f2f2] font-bold text-center">{group.groupTitle}</td>
                      </tr>
                      {group.items.map((item) => (
                        <tr key={item.id} className="bg-white">
                          <td className="text-left align-top">{item.component}</td>
                          <td className="text-left align-top">
                            <strong>{item.task}</strong>
                            <br/>
                            <span className="italic">{item.completionCriteria}</span>
                          </td>
                          <td className="text-center align-top">{item.automationMethod}<br/>{item.tools}</td>
                          <td className="text-center align-middle font-bold">{item.status}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )) : (
                    <tr><td colSpan={4} className="text-center">No validation data</td></tr>
                  )}
                </tbody>
              </table>

              {/* E. FINDINGS AND RECOMMENDATIONS */}
              <div className="section-header border-t border-b border-black">E. FINDINGS AND RECOMMENDATIONS</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[50%]">CONSOLIDATED FINDINGS</th>
                    <th className="col-header w-[50%]">STRATEGIC RECOMMENDATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.remarks.map((remark) => (
                    <tr key={remark.id} className="bg-white">
                      <td className="text-left whitespace-pre-wrap align-top">{remark.finding}</td>
                      <td className="text-left whitespace-pre-wrap italic align-top">{remark.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* F. RESOURCE TEAM */}
              <div className="section-header border-t border-b border-black">F. RESOURCE TEAM</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="col-header w-[33%]">NAME / ROLE</th>
                    <th className="col-header w-[33%]">COMPANY</th>
                    <th className="col-header w-[34%]">SIGNATURE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.resources.map((res) => (
                    <tr key={res.id} className="bg-white">
                      <td className="text-center align-middle">
                        <strong>{res.name || 'UNSPECIFIED'}</strong><br/>
                        {res.role}
                      </td>
                      <td className="text-center align-middle">{res.company}</td>
                      <td className="text-center align-middle h-16">
                        {res.signature ? (
                          <img src={res.signature} alt="Signature" className="max-h-12 mx-auto mix-blend-multiply" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
`;

  app = app.substring(0, reportStart) + newReport + app.substring(reportEnd);
  fs.writeFileSync('src/App.tsx', app);
  console.log('Successfully updated to standard table design.');
} else {
  console.log('report-container not found.');
}
