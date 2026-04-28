/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  LayoutDashboard, 
  FileText, 
  Settings,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  ImageIcon,
  Upload,
  X,
  Loader2,
  ShieldCheck,
  Activity,
  Check,
  Info,
  Globe,
  Cpu,
  Users,
  CheckSquare,
  FileCheck,
  ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { 
  HealthCheckData, 
  HardwareItem, 
  SoftwareItem, 
  IPAddressItem, 
  ParameterItem, 
  PerformanceMetric 
} from './types';

const INITIAL_DATA: HealthCheckData = {
  siteInfo: {
    customerName: 'Therma South Inc.',
    siteNumber: '5045506',
    poNumber: '220001910',
    poDate: '07-Feb-2024',
    serviceType: 'Critical Maintenance Audit',
    servicePeriod: 'Q1 2024 - Annual Review',
    projectNumber: 'C8-2024-TSI-001',
    preparedBy: 'John-John B. Arcaina',
    contactPerson: 'Engr. Michael Reyes',
    datePrepared: 'April 2024',
    officeAddress: 'Unit 3004 Antel Global Corporate Center, 3 Julia Vargas Avenue, Pasig City 160'
  },
  hardware: [
    { 
      id: '1', 
      qty: 1, 
      unit: 'PowerEdge R740', 
      item: 'PI Server Host Machine', 
      specifications: 'Intel® Xeon® Silver 4110 CPU @ 2.10GHz (16 CPUs), ~2.1GHz\n65536GB RAM\nWindows Server 2016 Standard', 
      remarks: 'Primary Host Server for PI System Components' 
    },
    { 
      id: '2', 
      qty: 1, 
      unit: 'Virtual Machine', 
      item: 'PI Web Server', 
      specifications: 'Intel® Xeon® Silver 4110 CPU @ 2.10GHz (2 CPUs), ~2.1GHz\n16384GB RAM\nWindows Server 2016 Standard', 
      remarks: 'Web Server hosting PI Vision and Web API' 
    }
  ],
  software: [
    { 
      id: 'machine-1', 
      machineName: 'PI Server Host Machine', 
      items: [
        { id: 's1', item: 'PI Server Host Machine OS', preUpgrade: 'Windows Server 2016', postUpgrade: 'Windows Server 2016', remarks: 'Not Part of the Upgrade' },
        { id: 's2', item: 'PI Data Archive', preUpgrade: '2018 ver. 3.4.420.1182', postUpgrade: '2018 ver. 3.4.440.447', remarks: 'PI Server 2018 SP3, Patch 3' },
        { id: 's3', item: 'PI Asset Framework', preUpgrade: '2018 ver. 2.10.0.8628', postUpgrade: '2018 ver. 2.10.9.593', remarks: 'PI Server 2018 SP3, Patch 3' },
        { id: 's6', item: 'PI Datalink', preUpgrade: 'N/A', postUpgrade: 'N/A', remarks: '' },
        { id: 's7', item: 'Downloaders', preUpgrade: 'N/A', postUpgrade: 'N/A', remarks: '' }
      ]
    },
    { 
      id: 'machine-2', 
      machineName: 'Interface Nodes', 
      items: [
        { id: 's4', item: 'PI Interface Node U1', preUpgrade: 'v. 2.6.15.3', postUpgrade: 'v. 2.6.15.3', remarks: '' },
        { id: 's5', item: 'PI Interface Node U2', preUpgrade: 'v. 2.6.18.2', postUpgrade: 'v. 2.6.18.2', remarks: '' }
      ]
    }
  ],
  ipAddresses: [
    { id: '1', server: 'PI Server Host Machine', nic: '-', ipAddress: '192.168.157.125', remarks: 'N/A' },
    { id: '2', server: 'VM1: PI Server', nic: '-', ipAddress: '192.168.157.121', remarks: 'N/A' }
  ],
  parameters: [],
  remarks: [
    { id: '1', finding: 'PI System Health in PI Servers are Healthy. Unable to connect to OPC Interface but it shows in PI Data Archive server that the data are updated and flows smoothly.', recommendation: 'I recommend resolving connection between PI Data Archive server and PI Interface GW Node.\n• If the credentials are incorrect, then provide correct credentials to gain access.\n• Check remote desktop connection settings on both sides of the servers to establish rdp access via PI Data Archive server' },
    { id: '2', finding: 'PI System Health check is conducted manually', recommendation: 'Install PI Interface for Performance Monitor to all PI Server and create a monitoring display via PI Vision to monitor the PI Health of all servers' },
    { id: '3', finding: 'PI System Health check', recommendation: 'Regularly check PI System health to quickly resolve any issue that will arise' },
    { id: '4', finding: 'Windows Security Update', recommendation: 'Windows security updates be monitored, checked, and recommended to be installed monthly as releases are in monthly basis and make sure that it is tested and approved by OSIsoft' }
  ],
  resources: [
    { id: '1', name: 'John-John B. Arcaina', role: 'Technical Lead', company: 'Calibr8 Systems, Inc.' },
    { id: '2', name: 'Rene Dimaliwat', role: 'Support Lead', company: 'Calibr8 Systems, Inc.' },
    { id: '3', name: '', role: 'IT / OT Assistance', company: 'Customer Premise' }
  ]
};

const C8Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center select-none ${className}`}>
    <svg viewBox="0 0 120 80" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="60" className="font-sans font-black" fontSize="72" fill="#000000">C</text>
      <text x="55" y="60" className="font-sans font-black" fontSize="72" fill="#ff6b00">8</text>
    </svg>
  </div>
);

const Calibr8Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center select-none ${className}`}>
    <svg viewBox="0 0 280 60" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="45" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="42" fill="#000000" letterSpacing="-1">C</text>
      <path d="M 50 45 L 65 10 L 80 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="85" y="45" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="42" fill="#000000" letterSpacing="2">LIBR</text>
      <text x="195" y="45" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="48" fill="#ff6b00">8</text>
    </svg>
  </div>
);

export default function App() {
  const [data, setData] = useState<HealthCheckData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const savedData = localStorage.getItem('healthCheckData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
  }, []);
  const PARAMETER_GROUP_PRESETS = [
    'Server Time Check',
    'PI Interface Nodes',
    'PI Server Host Machine',
    'PI Data Archive',
    'PI Asset Framework',
    'Client Tools'
  ];

  const COMPONENT_PRESETS: Record<string, string[]> = {
    'PI Interface Nodes': [
      'Interface logs',
      'CPU Utilization',
      'Memory Utilization',
      'Hard drive Utilization',
      'Antivirus',
      'Buffering',
      'Windows Event Logs'
    ],
    'PI Server Host Machine': [
      'Windows Event Logs',
      'CPU Utilization',
      'Memory Utilization',
      'Hard drive Utilization',
      'Antivirus'
    ],
    'PI Data Archive': [
      'PI Server Windows Event Logs',
      'PI System messages log',
      'CPU Utilization',
      'Memory Utilization',
      'Hard drive Utilization',
      'Archives',
      'Backups',
      'Snapshot data flow',
      'License limits and usage',
      'Performance counters (Windows)',
      'Tag data'
    ],
    'PI Asset Framework': [
      'Windows Event Logs',
      'CPU Utilization',
      'Memory Utilization',
      'Hard drive Utilization',
      'Antivirus'
    ],
    'Client Tools': [
      'PI Vision Connection to PI Data Archive',
      'PI Vision Connection to PI AF Server',
      'PI Vision Users',
      'PI Web Server Windows Event Logs'
    ],
    'Server Time Check': [
      'U1 OPC Interface Gateway',
      'U2 OPC Interface Gateway',
      'PI Server Host',
      'PI Data Archive & PI AF Virtual Machine',
      'PI Vision Virtual Machine'
    ]
  };

  const COMPONENT_DETAILS: Record<string, { task: string; tools: string; criteria?: string; automation?: string }> = {
    'Interface logs': {
      task: 'Check logs to see whether unusual events have occurred.',
      tools: 'PI SMT',
      criteria: 'No unusual events or errors in logs',
      automation: '• Open PI System Management Tools (PI SMT).\n• Navigate to Operation > Message Logs.\n• Select the target Interface Node server.\n• Specify the time range and search for relevant interface messages or errors.'
    },
    'CPU Utilization': {
      task: 'Monitor and analyze windows performance',
      tools: 'Task Manager / Resource Monitor',
      criteria: 'Average CPU usage below 80%',
      automation: 'Using the Task Manager\n• Press the Windows key, type task manager, and press Enter.\n• In the window that appears, click the Performance tab.\n• On the Performance tab, a list of hardware devices is displayed on the left side.'
    },
    'Memory Utilization': {
      task: 'Check RAM performance and usage',
      tools: 'Task Manager / Performance Monitor',
      criteria: 'Available memory > 15%',
      automation: 'Using the Task Manager\n• Press the Windows key, type task manager, and press Enter.\n• In the window that appears, click the Performance tab\n• On the Performance tab, select Memory to view utilization.'
    },
    'Hard drive Utilization': {
      task: 'Monitor and analyze windows performance',
      tools: 'Task Manager / Resource Monitor',
      criteria: 'Free disk space > 20%',
      automation: 'Using the Task Manager\n• Press the Windows key, type task manager, and press Enter.\n• In the window that appears, click the Performance tab\n• On the Performance tab, select Disk to view usage and status.'
    },
    'Antivirus': {
      task: 'Check status',
      tools: 'Antivirus / Windows Security',
      criteria: 'Protection is active and up to date',
      automation: '• Click Start and type "Windows Security".\n• Open the app and select "Virus & threat protection".\n• Verify that "Real-time protection" is on and there are no current threats.'
    },
    'Buffering': {
      task: 'Check buffering',
      tools: 'See OSIsoft Library / PI SDK/AF SDK',
      criteria: 'No events in buffer queue',
      automation: '• Open PI SDK Utility or PI System Management Tools.\n• Navigate to Snapshot and Archive statistics.\n• Check for any events in the buffering queue (pibufss).'
    },
    'Windows Event Logs': {
      task: 'Collect Microsoft event viewer logs',
      tools: 'Event Viewer',
      criteria: 'No critical system errors in logs',
      automation: '• Open "Event Viewer" by clicking the "Start" button.\n• Click "Control Panel" > "System and Security" > "Administrative Tools", and then double-click "Event Viewer".\n• Click to expand "Windows Logs" in the left pane, and then select "Application".'
    },
    'PI Server Windows Event Logs': {
      task: 'Collect Microsoft event viewer logs',
      tools: 'Windows Event Viewer',
      criteria: 'Windows Event Logs – Application – No Critical errors',
      automation: '• Open "Event Viewer" by clicking the "Start" button.\n• Click "Control Panel" > "System and Security" > "Administrative Tools", and then double-click "Event Viewer".\n• Click to expand "Windows Logs" in the left pane, and then select "Application".'
    },
    'PI System messages log': {
      task: 'Review the system message log and interface logs at least once a week to determine if unusual events occurred.',
      tools: 'PI SMT pigetmsg',
      criteria: 'No unusual events occurred',
      automation: '• Open PI SMT.\n• Go to Operation > Message Logs.\n• Use the search filter or run the "pigetmsg" command to retrieve server messages.'
    },
    'Archives': {
      task: 'Verify daily that the expected archives are registered and that you have prepared for the next archive shift.',
      tools: 'PI SMT piartool -al',
      criteria: 'PI Data Archive creation is set up automatically.',
      automation: '• Use PI SMT to check archive registration.\n• Run "piartool -al" to list and verify registered archives.'
    },
    'Backups': {
      task: 'Verify daily that PI System backups were run for the previous day and that you have sufficient disk space for future backups.',
      tools: 'PI SMT piartool -al',
      criteria: 'PI Backup Success. Incremental Backup is scheduled daily every 12mn',
      automation: '• Check the PI Backup log files.\n• Use "piartool -al" to verify the backup status.'
    },
    'Snapshot data flow': {
      task: 'Determine if snapshot data flow is normal.',
      tools: 'PI SMT piartool -ss',
      criteria: 'OK',
      automation: '• Open command prompt as Administrator.\n• Run "piartool -ss" to check if the snapshot rate is within normal parameters.'
    },
    'License limits and usage': {
      task: 'Perform monthly usage statistics and point count checks for your PI System to anticipate license increase needs.',
      tools: 'PI SMT piartool -lic',
      criteria: 'OK',
      automation: '• Navigate to the PI\adm directory.\n• Run "piartool -lic" to generate a license usage report.'
    },
    'Performance counters (Windows)': {
      task: 'Use key Windows performance counters to review statistics about all subsystems.',
      tools: 'Windows Performance Monitor, PI Performance Monitor (PerfMon) Interface',
      criteria: 'OK',
      automation: '• Launch "perfmon.msc".\n• Monitor PI Data Archive specific counters for throughput and resource usage.'
    },
    'Tag data': {
      task: 'Review archive data reference tags.',
      tools: 'PI SMT pisnap.bat or pisnap.sh',
      criteria: 'OK',
      automation: '• Run "pisnap.bat" to verify snapshot values.\n• Ensure data flow is consistent for critical infrastructure tags.'
    },
    'PI Vision Connection to PI Data Archive': {
      task: 'Review status of connectivity to Data Servers (PI Data Archive)',
      tools: 'PI Vision',
      criteria: 'OK',
      automation: '• Go to PI Vision administration https://webServer/PIVision/Admin'
    },
    'PI Vision Connection to PI AF Server': {
      task: 'Review status of connectivity to Asset Servers (PI AF)',
      tools: 'PI Vision',
      criteria: 'OK',
      automation: '• Go to PI Vision administration https://webServer/PIVision/Admin'
    },
    'PI Vision Users': {
      task: 'Audit PI Vision usage',
      tools: 'PI Vision',
      criteria: '110 PI Vision Users',
      automation: '• Go to PI Vision administration > Reports > specify period > view PI Vision users'
    },
    'PI Web Server Windows Event Logs': {
      task: 'Collect Microsoft event viewer logs',
      tools: 'Windows Event Viewer',
      criteria: 'Windows Event Logs – Application – No Critical errors',
      automation: '• Open "Event Viewer" by clicking the "Start" button.\n• Click "Control Panel" > "System and Security" > "Administrative Tools", and then double-click "Event Viewer".\n• Click to expand "Windows Logs" in the left pane, and then select "Application".'
    }
  };

  const [activeSection, setActiveSection] = useState<string>('siteInfo');

  const updateSiteInfo = (field: keyof HealthCheckData['siteInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      siteInfo: { ...prev.siteInfo, [field]: value }
    }));
  };

  const addItem = (section: keyof Omit<HealthCheckData, 'siteInfo'>) => {
    let newItem: any = { id: Date.now().toString() };
    
    if (section === 'hardware') {
      newItem = { ...newItem, qty: 0, unit: '', item: '', specifications: '', remarks: '' };
    } else if (section === 'ipAddresses') {
      newItem = { ...newItem, server: '', nic: '', ipAddress: '', remarks: '' };
    }
    
    setData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), newItem]
    }));
  };

  const removeItem = (section: keyof Omit<HealthCheckData, 'siteInfo'>, id: string) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const updateItem = (section: keyof Omit<HealthCheckData, 'siteInfo' | 'software' | 'parameters' | 'remarks' | 'resources'>, id: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addRemark = () => {
    const newRemark = { id: Date.now().toString(), finding: '', recommendation: '' };
    setData(prev => ({ ...prev, remarks: [...prev.remarks, newRemark] }));
  };

  const updateRemark = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      remarks: prev.remarks.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeRemark = (id: string) => {
    setData(prev => ({ ...prev, remarks: prev.remarks.filter(r => r.id !== id) }));
  };

  const addResource = () => {
    const newResource = { id: Date.now().toString(), name: '', role: '', company: '', signature: '' };
    setData(prev => ({ ...prev, resources: [...prev.resources, newResource] }));
  };

  const updateResource = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      resources: prev.resources.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeResource = (id: string) => {
    setData(prev => ({ ...prev, resources: prev.resources.filter(r => r.id !== id) }));
  };

  const addSoftwareMachine = () => {
    const newMachine = { 
      id: Date.now().toString(), 
      machineName: 'New Machine', 
      items: [] 
    };
    setData(prev => ({
      ...prev,
      software: [...prev.software, newMachine]
    }));
  };

  const removeSoftwareMachine = (id: string) => {
    setData(prev => ({
      ...prev,
      software: prev.software.filter(m => m.id !== id)
    }));
  };

  const updateSoftwareMachine = (id: string, name: string) => {
    setData(prev => ({
      ...prev,
      software: prev.software.map(m => m.id === id ? { ...m, machineName: name } : m)
    }));
  };

  const addSoftwareItem = (machineId: string) => {
    const newItem = { 
      id: Date.now().toString(), 
      item: 'New Software', 
      preUpgrade: 'N/A', 
      postUpgrade: 'N/A', 
      remarks: '' 
    };
    setData(prev => ({
      ...prev,
      software: prev.software.map(m => m.id === machineId ? { 
        ...m, 
        items: [...m.items, newItem] 
      } : m)
    }));
  };

  const updateSoftwareItem = (machineId: string, itemId: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      software: prev.software.map(m => m.id === machineId ? { 
        ...m, 
        items: m.items.map(item => item.id === itemId ? { ...item, [field]: value } : item) 
      } : m)
    }));
  };

  const removeSoftwareItem = (machineId: string, itemId: string) => {
    setData(prev => ({
      ...prev,
      software: prev.software.map(m => m.id === machineId ? { 
        ...m, 
        items: m.items.filter(item => item.id !== itemId) 
      } : m)
    }));
  };

  const addParameterGroup = () => {
    const newGroup: any = {
      id: Date.now().toString(),
      groupTitle: '',
      items: []
    };
    setData(prev => ({
      ...prev,
      parameters: [...prev.parameters, newGroup]
    }));
  };

  const removeParameterGroup = (id: string) => {
    setData(prev => ({
      ...prev,
      parameters: prev.parameters.filter(g => g.id !== id)
    }));
  };

  const updateParameterGroup = (id: string, name: string) => {
    setData(prev => ({
      ...prev,
      parameters: prev.parameters.map(g => g.id === id ? { ...g, groupTitle: name } : g)
    }));
  };

  const addParameterItem = (groupId: string) => {
    setData(prev => {
      const group = prev.parameters.find(g => g.id === groupId);
      const isTimeCheck = group?.groupTitle.toLowerCase().includes('time check');
      
      const newItem: ParameterItem = {
        id: Date.now().toString(),
        component: isTimeCheck ? 'New Server' : '',
        task: isTimeCheck ? 'Check Time and Date synchronization' : '',
        tools: isTimeCheck ? 'Date and Time settings' : '',
        automationMethod: isTimeCheck ? 'Manual Check via OS Settings' : 'N/A',
        completionCriteria: '',
        status: 'Pending'
      };

      return {
        ...prev,
        parameters: prev.parameters.map(g => g.id === groupId ? {
          ...g,
          items: [...g.items, newItem]
        } : g)
      };
    });
  };

  const updateParameterItem = (groupId: string, itemId: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      parameters: prev.parameters.map(g => g.id === groupId ? {
        ...g,
        items: g.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
      } : g)
    }));
  };

  const removeParameterItem = (groupId: string, itemId: string) => {
    setData(prev => ({
      ...prev,
      parameters: prev.parameters.map(g => g.id === groupId ? {
        ...g,
        items: g.items.filter(item => item.id !== itemId)
      } : g)
    }));
  };

  const printReport = () => {
    window.print();
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    const originalTab = activeTab;
    
    // Switch to preview if not there to ensure content is rendered
    setActiveTab('preview');
    
    // Scroll to top to help html2canvas capture coordinates correctly
    window.scrollTo(0, 0);

    // Give time for UI to switch and images to load
    setTimeout(async () => {
      try {
        const reportElement = document.getElementById('report-container');
        if (!reportElement) {
          setIsGenerating(false);
          setActiveTab(originalTab);
          return;
        }

        const fileName = `PI_Health_Check_${data.siteInfo.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        
        const heightPx = reportElement.scrollHeight;

        const opt = {
          margin: 0,
          filename: fileName,
          image: { type: 'jpeg' as const, quality: 1.0 },
          html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            width: 794,
            height: heightPx,
            scrollY: 0,
            scrollX: 0,
            onclone: (clonedDoc: Document) => {
              const report = clonedDoc.getElementById('report-container');
              if (report) {
                report.style.margin = '0';
                report.style.padding = '20px 20px 0 20px';
                report.style.width = '794px';
                report.style.minWidth = '794px';
              }
            }
          },
          jsPDF: { 
            unit: 'px' as const, 
            format: [794, heightPx] as [number, number], 
            orientation: 'portrait' as const,
            hotfixes: ['px_scaling']
          }
        };

        // Generate PDF using html2pdf
        await (html2pdf as any)().set(opt).from(reportElement).save();

      } catch (error) {
        console.error('PDF Generation failed:', error);
        alert('Failed to generate PDF: ' + (error instanceof Error ? error.message : String(error)));
      } finally {
        setIsGenerating(false);
      }
    }, 2000);
  };

  const saveData = () => {
    try {
      localStorage.setItem('healthCheckData', JSON.stringify(data));
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Failed to save data.');
    }
  };

  return (
    <div className="h-auto bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Header / Nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <img src="https://raw.githubusercontent.com/ferrerjakecarlo26-cmyk/image-hosting/main/c8%20logo.jpg" alt="C8 Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-serif font-bold text-slate-900 tracking-tight leading-none">PI System Health Check</h1>
            <p className="text-[11.5px] font-sans font-bold text-brand-orange uppercase tracking-widest mt-0.5">Calibr8 Systems, Inc.</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'edit' ? 'bg-white text-brand-red shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ShieldCheck size={14} />
            Editor
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-white text-brand-red shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <FileText size={14} />
            Preview
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={saveData}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            Save
          </button>
          <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className={`flex items-center gap-2 bg-brand-red hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-red/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
            )}
            {isGenerating ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 mb-20 print:p-0 print:m-4 print:max-w-none">
        {activeTab === 'edit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 print:hidden">
            {/* Sidebar Navigation for sections */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm sticky top-32">
                <nav className="space-y-2">
                  {[
                    { id: 'siteInfo', label: 'Client Profile', icon: Info },
                    { id: 'hardware', label: 'Hardware', icon: Cpu },
                    { id: 'software', label: 'Software', icon: Settings },
                    { id: 'ipAddresses', label: 'IP Addresses', icon: Globe },
                    { id: 'parameters', label: 'System Validation Checklist', icon: PlusCircle },
                    { id: 'remarks', label: 'Findings and Recommendations', icon: ClipboardCheck },
                    { id: 'resources', label: 'Resource Team', icon: Users },
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                        activeSection === section.id 
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/10 ring-2 ring-brand-red/10' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <section.icon size={16} className={`shrink-0 ${activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-red'}`} />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tight leading-tight">{section.label}</span>
                      </div>
                      <ChevronRight size={14} className={`shrink-0 ${activeSection === section.id ? 'text-white/50' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <section className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm min-h-[400px]"
                >
                  {/* Site Info Form */}
                  {activeSection === 'siteInfo' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-6 mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Audit Profile</h2>
                          </div>
                          <p className="text-slate-500 text-sm font-medium">Standardized identification for enterprise health checks</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Customer Entity</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.customerName}
                            onChange={(e) => updateSiteInfo('customerName', e.target.value)}
                            placeholder="e.g., Global Energy Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Project Citation ID</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-brand-red shadow-sm"
                            value={data.siteInfo.projectNumber}
                            onChange={(e) => updateSiteInfo('projectNumber', e.target.value)}
                            placeholder="C8-2024-..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Internal Site ID</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.siteNumber}
                            onChange={(e) => updateSiteInfo('siteNumber', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Auth. PO Number</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.poNumber}
                            onChange={(e) => updateSiteInfo('poNumber', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">PO Issuance Date</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.poDate}
                            onChange={(e) => updateSiteInfo('poDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Report Header Date</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.datePrepared}
                            onChange={(e) => updateSiteInfo('datePrepared', e.target.value)}
                            placeholder="e.g., April 2024"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Assessment Class</label>
                          <div className="relative group">
                            <select 
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm appearance-none cursor-pointer"
                              value={data.siteInfo.serviceType}
                              onChange={(e) => updateSiteInfo('serviceType', e.target.value)}
                            >
                              <option value="Critical Maintenance Audit">Critical Maintenance Audit</option>
                              <option value="Health Status Verification">Health Status Verification</option>
                              <option value="Annual Performance Review">Annual Performance Review</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-brand-red transition-colors" />
                          </div>
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Service Area Scope/Period</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-900 shadow-sm"
                            value={data.siteInfo.servicePeriod}
                            onChange={(e) => updateSiteInfo('servicePeriod', e.target.value)}
                            placeholder="e.g., Pasig Site - Q2 Review"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-3">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">Primary Office Address</label>
                          <textarea 
                            rows={2}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-brand-red/10 focus:border-brand-red focus:bg-white transition-all font-bold text-slate-800 shadow-sm"
                            value={data.siteInfo.officeAddress}
                            onChange={(e) => updateSiteInfo('officeAddress', e.target.value)}
                          />
                        </div>
                        

                      </div>
                    </div>
                  )}

                  {/* Hardware Table Form */}
                  {activeSection === 'hardware' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Hardware</h2>
                          <p className="text-slate-500 text-sm font-medium">List of servers and physical components</p>
                        </div>
                        <button 
                          onClick={() => addItem('hardware')}
                          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-100"
                        >
                          <Plus size={16} />
                          Add Row
                        </button>
                      </div>
                      
                      <div className="overflow-hidden bg-slate-50 rounded-3xl border border-slate-100">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100/50">
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Qty</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Unit/Model</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Item Name</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Specs</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Remarks</th>
                              <th className="px-4 py-4 text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.hardware.map((item) => (
                              <tr key={item.id} className="border-t border-slate-100 group">
                                <td className="p-2"><input type="number" className="w-16 bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold focus:ring-2 focus:ring-brand-red/10 focus:outline-none" value={item.qty ?? 0} onChange={(e) => updateItem('hardware', item.id, 'qty', parseInt(e.target.value) || 0)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold focus:ring-2 focus:ring-brand-red/10 focus:outline-none" value={item.unit ?? ''} onChange={(e) => updateItem('hardware', item.id, 'unit', e.target.value)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold focus:ring-2 focus:ring-brand-red/10 focus:outline-none text-brand-red" value={item.item ?? ''} onChange={(e) => updateItem('hardware', item.id, 'item', e.target.value)} /></td>
                                <td className="p-2"><textarea className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:ring-2 focus:ring-brand-red/10 focus:outline-none min-h-[60px]" value={item.specifications ?? ''} onChange={(e) => updateItem('hardware', item.id, 'specifications', e.target.value)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm italic text-slate-500 focus:ring-2 focus:ring-brand-red/10 focus:outline-none" value={item.remarks ?? ''} onChange={(e) => updateItem('hardware', item.id, 'remarks', e.target.value)} /></td>
                                <td className="p-2 text-right">
                                  <button onClick={() => removeItem('hardware', item.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Software Table Form */}
                  {activeSection === 'software' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Software</h2>
                          <p className="text-slate-500 text-sm font-medium">Software and OS versions check grouped by machine</p>
                        </div>
                        <button onClick={addSoftwareMachine} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <Plus size={16} />
                          Add Server Group
                        </button>
                      </div>

                      {data.software.map((machine) => (
                        <div key={machine.id} className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden">
                          <div className="p-4 bg-slate-100/50 flex justify-between items-center border-b border-slate-200">
                            <div className="flex items-center gap-2 flex-1">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Server Name:</label>
                              <input 
                                type="text" 
                                className="bg-transparent border-b border-slate-300 focus:border-brand-red outline-none px-2 font-bold text-slate-800"
                                value={machine.machineName}
                                onChange={(e) => updateSoftwareMachine(machine.id, e.target.value)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => addSoftwareItem(machine.id)}
                                className="flex items-center gap-1 bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                              >
                                <Plus size={14} /> Add Software
                              </button>
                              <button 
                                onClick={() => removeSoftwareMachine(machine.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-2 overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Software Item</th>
                                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Pre-Upgrade</th>
                                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Post-Upgrade</th>
                                  <th className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Remarks</th>
                                  <th className="px-4 py-2"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {machine.items.map((item) => (
                                  <tr key={item.id} className="border-t border-slate-200">
                                    <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold" value={item.item} onChange={(e) => updateSoftwareItem(machine.id, item.id, 'item', e.target.value)} /></td>
                                    <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-600 font-medium" value={item.preUpgrade} onChange={(e) => updateSoftwareItem(machine.id, item.id, 'preUpgrade', e.target.value)} /></td>
                                    <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-600 font-medium" value={item.postUpgrade} onChange={(e) => updateSoftwareItem(machine.id, item.id, 'postUpgrade', e.target.value)} /></td>
                                    <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium" value={item.remarks} onChange={(e) => updateSoftwareItem(machine.id, item.id, 'remarks', e.target.value)} /></td>
                                    <td className="p-2">
                                      <button onClick={() => removeSoftwareItem(machine.id, item.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-all">
                                        <Trash2 size={14} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                {machine.items.length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-400 text-sm italic">No software items added for this machine.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* IP Addresses Form */}
                  {activeSection === 'ipAddresses' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">IP Addresses</h2>
                          <p className="text-slate-500 text-sm font-medium">Server and network interface mapping</p>
                        </div>
                        <button onClick={() => addItem('ipAddresses')} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <Plus size={16} />
                          Add Row
                        </button>
                      </div>
                      <div className="overflow-hidden bg-slate-50 rounded-3xl border border-slate-100">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100/50">
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Server</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">NIC</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">IP Address</th>
                              <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Remarks</th>
                              <th className="px-4 py-4 text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.ipAddresses.map((item) => (
                              <tr key={item.id} className="border-t border-slate-100">
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold" value={item.server} onChange={(e) => updateItem('ipAddresses', item.id, 'server', e.target.value)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium" value={item.nic} onChange={(e) => updateItem('ipAddresses', item.id, 'nic', e.target.value)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-sans text-brand-red" value={item.ipAddress} onChange={(e) => updateItem('ipAddresses', item.id, 'ipAddress', e.target.value)} /></td>
                                <td className="p-2"><input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium" value={item.remarks} onChange={(e) => updateItem('ipAddresses', item.id, 'remarks', e.target.value)} /></td>
                                <td className="p-2 text-right">
                                  <button onClick={() => removeItem('ipAddresses', item.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-all">
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Parameter Checklist Form */}
                  {activeSection === 'parameters' && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">System Parameter List</h2>
                          <p className="text-slate-500 text-sm font-medium">Task-based verification checklist grouped by server</p>
                        </div>
                        <button onClick={addParameterGroup} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <Plus size={16} />
                          Add Group
                        </button>
                      </div>

                      {data.parameters.map((group) => (
                        <div key={group.id} className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden">
                          <div className="p-4 bg-slate-100/50 flex justify-between items-center border-b border-slate-200">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Group Title:</label>
                                <div className="flex gap-2">
                                  <select 
                                    className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-brand-red"
                                    value={PARAMETER_GROUP_PRESETS.includes(group.groupTitle) ? group.groupTitle : ''}
                                    onChange={(e) => {
                                      const newTitle = e.target.value;
                                      if (newTitle && newTitle !== 'manual') {
                                        setData(current => {
                                          const defaultItems = COMPONENT_PRESETS[newTitle].map(comp => {
                                            const details = COMPONENT_DETAILS[comp];
                                            return {
                                              id: Math.random().toString(36).substr(2, 9),
                                              component: comp,
                                              task: details?.task || (newTitle.toLowerCase().includes('time check') ? 'Check Time and Date synchronization' : 'Verify system health and status'),
                                              tools: details?.tools || (newTitle.toLowerCase().includes('time check') ? 'Date and Time settings' : 'Management Console / logs'),
                                              automationMethod: details?.automation || 'N/A',
                                              completionCriteria: '',
                                              status: 'Pending'
                                            };
                                          });
                                          
                                          return {
                                            ...current,
                                            parameters: current.parameters.map(g => g.id === group.id ? {
                                              ...g,
                                              groupTitle: newTitle,
                                              items: defaultItems
                                            } : g)
                                          };
                                        });
                                      } else if (newTitle === 'manual') {
                                        // Don't change title if they pick manual, but maybe they want to start fresh?
                                        // For now just keep it as is or clear if switching from preset to manual
                                        updateParameterGroup(group.id, '');
                                      } else {
                                        updateParameterGroup(group.id, '');
                                      }
                                    }}
                                  >
                                    <option value="">-- Select Section --</option>
                                    {PARAMETER_GROUP_PRESETS.map(preset => (
                                      <option key={preset} value={preset}>{preset}</option>
                                    ))}
                                    <option value="manual">Manual / Other</option>
                                  </select>
                                  <input 
                                    type="text" 
                                    className="bg-white border border-slate-300 rounded-lg px-3 py-1 font-bold text-slate-800 text-sm outline-none focus:ring-2 focus:ring-brand-red w-64"
                                    placeholder="Enter custom title..."
                                    value={group.groupTitle}
                                    onChange={(e) => updateParameterGroup(group.id, e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {COMPONENT_PRESETS[group.groupTitle] && (
                                <button 
                                  onClick={() => {
                                    setData(current => {
                                      const defaultItems = COMPONENT_PRESETS[group.groupTitle].map(comp => {
                                        const details = COMPONENT_DETAILS[comp];
                                        return {
                                          id: Math.random().toString(36).substr(2, 9),
                                          component: comp,
                                          task: details?.task || (group.groupTitle.toLowerCase().includes('time check') ? 'Check Time and Date synchronization' : 'Verify system health and status'),
                                          tools: details?.tools || (group.groupTitle.toLowerCase().includes('time check') ? 'Date and Time settings' : 'Management Console / logs'),
                                          automationMethod: details?.automation || 'N/A',
                                          completionCriteria: '',
                                          status: 'Pending'
                                        };
                                      });
                                      
                                      return {
                                        ...current,
                                        parameters: current.parameters.map(g => g.id === group.id ? {
                                          ...g,
                                          items: [...g.items, ...defaultItems]
                                        } : g)
                                      };
                                    });
                                  }}
                                  className="flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                                >
                                  <Plus size={14} /> Add All Defaults
                                </button>
                              )}
                              <button 
                                onClick={() => addParameterItem(group.id)}
                                className="flex items-center gap-1 bg-brand-red text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                              >
                                <Plus size={14} /> Add Task
                              </button>
                              <button 
                                onClick={() => removeParameterGroup(group.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-4 space-y-4">
                            {group.items.filter(i => i.task.trim() !== "").map((item) => (
                              <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
                                <button 
                                  onClick={() => removeParameterItem(group.id, item.id)}
                                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Component</label>
                                    <div className="flex gap-2">
                                      {COMPONENT_PRESETS[group.groupTitle] && (
                                        <select 
                                          className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 outline-none w-32"
                                          value={COMPONENT_PRESETS[group.groupTitle].includes(item.component) ? item.component : 'manual'}
                                          onChange={(e) => {
                                            if (e.target.value !== 'manual') {
                                              const details = COMPONENT_DETAILS[e.target.value];
                                              updateParameterItem(group.id, item.id, 'component', e.target.value);
                                              if (details) {
                                                updateParameterItem(group.id, item.id, 'task', details.task);
                                                updateParameterItem(group.id, item.id, 'tools', details.tools);
                                                if (details.automation) {
                                                  updateParameterItem(group.id, item.id, 'automationMethod', details.automation);
                                                }
                                                updateParameterItem(group.id, item.id, 'completionCriteria', '');
                                              }
                                            }
                                          }}
                                        >
                                          <option value="manual">Manual</option>
                                          {COMPONENT_PRESETS[group.groupTitle].map(preset => (
                                            <option key={preset} value={preset}>{preset}</option>
                                          ))}
                                        </select>
                                      )}
                                      <input 
                                        type="text" 
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold" 
                                        placeholder="Enter component name..."
                                        value={item.component} 
                                        onChange={(e) => updateParameterItem(group.id, item.id, 'component', e.target.value)} 
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-4">
                                    <div className="flex-1 space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Automation Method</label>
                                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold" value={item.automationMethod} onChange={(e) => updateParameterItem(group.id, item.id, 'automationMethod', e.target.value)} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                                      <textarea
                                        rows={2}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold resize-y min-h-[40px]"
                                        value={item.status}
                                        placeholder="e.g. Pass, Fail, or custom text"
                                        onChange={(e) => updateParameterItem(group.id, item.id, 'status', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task</label>
                                    <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium" value={item.task} onChange={(e) => updateParameterItem(group.id, item.id, 'task', e.target.value)} />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tool</label>
                                    <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium" value={item.tools} onChange={(e) => updateParameterItem(group.id, item.id, 'tools', e.target.value)} />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Result</label>
                                    <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium" value={item.completionCriteria} onChange={(e) => updateParameterItem(group.id, item.id, 'completionCriteria', e.target.value)} />
                                  </div>
                                </div>
                                
                                {/* Image Upload Component */}
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Evidence / Screenshot</label>
                                    {!item.image ? (
                                      <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-900 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors text-xs font-bold ring-1 ring-slate-200 shadow-sm">
                                        <Upload size={14} />
                                        <span>Upload Picture</span>
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          className="hidden" 
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onloadend = () => {
                                                updateParameterItem(group.id, item.id, 'image', reader.result as string);
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                        />
                                      </label>
                                    ) : (
                                      <button 
                                        onClick={() => updateParameterItem(group.id, item.id, 'image', undefined)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-bold ring-1 ring-red-200 shadow-sm"
                                      >
                                        <X size={14} />
                                        <span>Remove Picture</span>
                                      </button>
                                    )}
                                  </div>
                                  
                                  {item.image && (
                                    <div className="relative group max-w-lg mx-auto">
                                      <img 
                                        src={item.image} 
                                        alt="Evidence" 
                                        className="w-full h-auto rounded-xl border border-slate-200 shadow-lg object-contain bg-slate-50 max-h-96"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                        <ImageIcon className="text-white" size={32} />
                                      </div>
                                    </div>
                                  )}
                                  
                                  {!item.image && (
                                    <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 gap-1 hover:bg-slate-100/50 transition-colors group cursor-pointer relative">
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              updateParameterItem(group.id, item.id, 'image', reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                      <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-bold uppercase tracking-widest">No picture attached</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            {group.items.length === 0 && (
                              <div className="py-8 text-center text-slate-400 text-sm italic">No tasks added for this server.</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'remarks' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Findings and Recommendations</h2>
                          <p className="text-slate-500 text-sm font-medium">Findings and recommendations from the health check</p>
                        </div>
                        <button onClick={addRemark} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <Plus size={16} />
                          Add Remark
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {data.remarks.filter(r => r.finding.trim() || r.recommendation.trim()).map((remark) => (
                          <div key={remark.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group">
                            <button 
                              onClick={() => removeRemark(remark.id)}
                              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 gap-6">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Findings</label>
                                <textarea 
                                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold min-h-[80px]" 
                                  value={remark.finding} 
                                  onChange={(e) => updateRemark(remark.id, 'finding', e.target.value)} 
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recommendations</label>
                                <textarea 
                                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold min-h-[80px]" 
                                  value={remark.recommendation} 
                                  onChange={(e) => updateRemark(remark.id, 'recommendation', e.target.value)} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'resources' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Resource Team</h2>
                          <p className="text-slate-500 text-sm font-medium">Project personnel and signatures</p>
                        </div>
                        <button onClick={addResource} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                          <Plus size={16} />
                          Add Resource
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.resources.map((resource) => (
                          <div key={resource.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group">
                            <button 
                              onClick={() => removeResource(resource.id)}
                              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold" value={resource.name} onChange={(e) => updateResource(resource.id, 'name', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Position / Role</label>
                                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold" value={resource.role} onChange={(e) => updateResource(resource.id, 'role', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</label>
                                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold" value={resource.company} onChange={(e) => updateResource(resource.id, 'company', e.target.value)} />
                                </div>
                              </div>
                              <div className="space-y-1 pt-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Signature Image</label>
                                <div className="flex items-center gap-4">
                                  {resource.signature ? (
                                    <div className="relative group">
                                      <img src={resource.signature} alt="Signature Preview" className="h-16 w-auto border border-slate-200 rounded-lg bg-white p-1" />
                                      <button 
                                        onClick={() => updateResource(resource.id, 'signature', '')}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-slate-200 rounded-xl bg-white hover:bg-slate-50 cursor-pointer transition-all">
                                      <div className="flex items-center gap-2 text-slate-400">
                                        <Upload size={14} />
                                        <span className="text-[10px] font-bold uppercase">Upload Signature</span>
                                      </div>
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              updateResource(resource.id, 'signature', reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        ) : (
          <div className="w-full bg-slate-50 py-8">
            <style>
              {`
                #report-container {
                  font-family: Arial, Helvetica, sans-serif !important;
                  padding: 20px 20px 0 20px !important;
                  background-color: white;
                  width: 794px !important;
                  min-width: 794px !important;
                  margin: 0 auto !important;
                  box-sizing: border-box !important;
                }
                #report-container table {
                  border-collapse: collapse !important;
                  width: 100% !important;
                  margin: 0 !important;
                  table-layout: fixed !important;
                  break-inside: auto !important;
                  page-break-inside: auto !important;
                  border-spacing: 0 !important;
                }
                #report-container tr {
                  break-inside: auto !important;
                  page-break-inside: auto !important;
                }
                #report-container th, #report-container td {
                  border: 1px solid #000 !important;
                  padding: 6px 8px !important;
                  font-size: 10px !important;
                  line-height: 1.25;
                  word-wrap: break-word;
                  vertical-align: middle;
                  text-align: center;
                  box-sizing: border-box !important;
                }
                #report-container .section-header {
                  background-color: #595959 !important;
                  color: #ffffff !important;
                  font-size: 11px !important;
                  font-weight: bold;
                  padding: 5px 12px !important;
                  text-transform: uppercase;
                  text-align: left !important;
                  box-sizing: border-box !important;
                  page-break-after: avoid !important;
                }

                #report-container .col-header {
                  background-color: #dce6f1 !important;
                  color: #000 !important;
                  font-weight: bold;
                  text-align: center;
                  text-transform: uppercase;
                  font-size: 9.5px !important;
                  border: 1px solid #000 !important;
                  padding: 5px 6px !important;
                  box-sizing: border-box !important;
                }
                #report-container .title-content {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                }
                #report-container .logo-container {
                  display: flex !important;
                  flex-direction: column !important;
                  align-items: center !important;
                  justify-content: center !important;
                  width: 100% !important;
                }
                #report-container .yellow-bar {
                  color: #ef4444 !important;
                  font-size: 14px !important;
                  font-weight: bold !important;
                  text-align: center !important;
                  line-height: normal !important;
                }
                #report-container img {
                  max-width: 100%;
                }
                @media print {
                  #report-container {
                    margin: 0 !important;
                    box-shadow: none !important;
                    border: none !important;
                  }
                }
              `}
            </style>
             {/* Report Preview */}
          <div id="report-container" className="bg-white mx-auto shadow-2xl print:shadow-none overflow-hidden" style={{ width: '794px', minWidth: '794px', padding: '20px 20px 0 20px' }}>

            <div className="border border-black p-0 bg-white">
              {/* Header section as a table */}
              <table className="w-full mb-0 border-collapse">
                <tbody>
                  <tr>
                    <td className="w-[30%] align-middle text-center p-4 border-r border-black">
                      {data.siteInfo.logoImage ? (
                        <div className="flex flex-col items-center justify-center w-full">
                          <img src={data.siteInfo.logoImage} alt="Setup Logo" className="h-[45px] mb-2 object-contain" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full">
                          <img src="https://raw.githubusercontent.com/ferrerjakecarlo26-cmyk/image-hosting/main/calibr8-removebg-preview.png" alt="Calibr8 Logo" className="h-[35px] mb-2 object-contain" />
                        </div>
                      )}
                      <p className="text-[10px] leading-tight text-slate-800 mt-2">
                        Calibr8 Systems Inc.<br />
                        Unit 3004 Antel Global Corporate Center<br />
                        3 Julia Vargas Avenue, Pasig City 160
                      </p>
                    </td>
                    <td className="w-[40%] align-middle text-center p-2 border-r border-black">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <h1 className="text-[18px] font-bold text-black uppercase leading-tight tracking-tight">PI SYSTEM HEALTH</h1>
                        <h1 className="text-[18px] font-bold text-black uppercase leading-tight tracking-tight mb-3">CHECKLIST</h1>
                        <div className="text-[15px] font-black text-[#ef4444] uppercase tracking-wider">
                          LNGPH
                        </div>
                      </div>
                    </td>
                    <td className="w-[30%] p-1 align-middle">
                      <table className="w-full m-0 border border-black border-collapse" style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                        <tbody>
                          <tr className="border-b border-black">
                            <td className="col-header border-none p-1 text-[8.5px] font-bold uppercase text-center w-[45%]">PI SITE NUMBER</td>
                            <td className="bg-white border-l border-black p-1 text-[9.5px] text-center font-medium leading-none">{data.siteInfo.siteNumber || ''}</td>
                          </tr>
                          <tr className="border-b border-black">
                            <td className="col-header border-none p-1 text-[8.5px] font-bold uppercase text-center">PO NUMBER</td>
                            <td className="bg-white border-l border-black p-1 text-[9.5px] text-center font-medium leading-none">{data.siteInfo.poNumber || ''}</td>
                          </tr>
                          <tr className="border-b border-black">
                            <td className="col-header border-none p-1 text-[8.5px] font-bold uppercase text-center">PO DATE</td>
                            <td className="bg-white border-l border-black p-1 text-[9.5px] text-center font-medium leading-none">{data.siteInfo.poDate || ''}</td>
                          </tr>
                          <tr className="border-b border-black">
                            <td className="col-header border-none p-1 text-[8.5px] font-bold uppercase text-center">SERVICE TYPE</td>
                            <td className="bg-white border-l border-black p-1 text-[9.5px] text-center font-medium leading-none">{data.siteInfo.serviceType || ''}</td>
                          </tr>
                          <tr>
                            <td className="col-header border-none p-1 text-[8.5px] font-bold uppercase text-center">SERVICE DATE</td>
                            <td className="bg-white border-l border-black p-1 text-[9.5px] text-center font-medium leading-none">{data.siteInfo.datePrepared || ''}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* A. HARDWARE */}
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={5} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>A. HARDWARE</th>
                  </tr>
                  <tr>
                    <th className="col-header w-[5%]">QTY</th>
                    <th className="col-header w-[10%]">UNIT</th>
                    <th className="col-header w-[20%]">ITEM</th>
                    <th className="col-header w-[50%]">SPECIFICATIONS</th>
                    <th className="col-header w-[15%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.hardware.filter(h => h.item.trim() !== "").map((item, idx) => (
                    <tr key={item.id} className="bg-white">
                      <td className="text-center">{item.qty}</td>
                      <td className="text-center text-black">{item.unit}</td>
                      <td className="text-center text-black">{item.item}</td>
                      <td className="text-left whitespace-pre-wrap align-top">
                        <div className="leading-tight text-[9.5px] py-1 px-2">
                          {item.specifications}
                        </div>
                      </td>
                      <td className="text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* B. SOFTWARE */}
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>B. SOFTWARE</th>
                  </tr>
                  <tr>
                    <th className="col-header w-[30%]">ITEMS</th>
                    <th className="col-header w-[20%]">PRE-UPGRADE VERSION</th>
                    <th className="col-header w-[20%]">POST-UPGRADE<br/>VERSION</th>
                    <th className="col-header w-[30%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.software.filter(m => m.items.some(i => i.item.trim() !== "")).map((machine) => (
                    <React.Fragment key={machine.id}>
                      {machine.items.filter(i => i.item.trim() !== "").map((comp, idx) => (
                        <tr key={comp.id} className="bg-white">
                          <td className="text-left">{comp.item}</td>
                          <td className="text-center">{comp.preUpgrade}</td>
                          <td className="text-center">{comp.postUpgrade}</td>
                          <td className="text-center"></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {/* C. IP ADDRESSES */}
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>C. IP ADDRESSES</th>
                  </tr>
                  <tr>
                    <th className="col-header w-[30%]">SERVER</th>
                    <th className="col-header w-[20%]">NIC</th>
                    <th className="col-header w-[25%]">IP ADDRESS</th>
                    <th className="col-header w-[25%]">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ipAddresses.filter(i => i.server.trim() !== "").map((ip) => (
                    <tr key={ip.id} className="bg-white">
                      <td className="text-left">{ip.server}</td>
                      <td className="text-center">{ip.nic}</td>
                      <td className="text-center">{ip.ipAddress}</td>
                      <td className="text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* D. SYSTEM VALIDATION CHECKLIST */}
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={4} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>D. SYSTEM VALIDATION CHECKLIST</th>
                  </tr>
                  <tr>
                    <th className="col-header w-[20%]">COMPONENT</th>
                    <th className="col-header w-[40%]">VERIFICATION TASK</th>
                    <th className="col-header w-[20%]">METHOD/TOOLKIT</th>
                    <th className="col-header w-[20%]">RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {data.parameters.filter(g => g.items.some(i => i.task.trim() !== "")).map((group) => (
                    <React.Fragment key={group.id}>
                      <tr>
                        <td colSpan={4} className="bg-[#f2f2f2] font-bold text-center">{group.groupTitle}</td>
                      </tr>
                      {group.items.filter(i => i.task.trim() !== "").map((item) => (
                        <tr key={item.id} className="bg-white">
                          <td className="text-left align-top">{item.component}</td>
                          <td className="text-left align-top">
                            {item.task}
                          </td>
                          <td className="text-center align-top">{item.automationMethod}<br/>{item.tools}</td>
                          <td className="text-center align-middle">
                            {item.status !== 'Pending' && <div className="font-bold whitespace-pre-wrap">{item.status}</div>}
                            {item.image && (
                              <img src={item.image} alt="Result" className="text-center mx-auto object-contain block my-2" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            )}
                            {item.completionCriteria && <div className="mt-1 max-w-full break-words whitespace-pre-wrap text-[10.5px] font-normal leading-tight text-left text-slate-600 italic">Result: {item.completionCriteria}</div>}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {/* E. FINDINGS AND RECOMMENDATIONS */}
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={2} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>E. FINDINGS AND RECOMMENDATIONS</th>
                  </tr>
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
              <table className="w-full mt-0">
                <thead>
                  <tr>
                    <th colSpan={3} className="section-header text-left border-black text-[#ffffff]" style={{ backgroundColor: '#595959', padding: '5px 12px', fontSize: '11px' }}>F. RESOURCE TEAM</th>
                  </tr>
                  <tr>
                    <th className="col-header w-[33%]">NAME / ROLE</th>
                    <th className="col-header w-[33%]">COMPANY</th>
                    <th className="col-header w-[34%]">SIGNATURE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.resources.filter(r => r.name.trim() !== "").map((res) => (
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
        </div>
      )}
      </main>

      {/* Global CSS for printing */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 0;
          }
          body {
            background-color: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0 !important;
            padding: 0 !important;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
            max-width: none !important;
          }
          nav, .print\\:hidden {
            display: none !important;
          }
           #report-container {
            width: 794px !important;
            margin: 0 auto !important;
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
}
