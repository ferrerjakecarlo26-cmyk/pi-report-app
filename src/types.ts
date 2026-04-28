
export interface HealthCheckData {
  siteInfo: {
    customerName: string;
    siteNumber: string;
    poNumber: string;
    poDate: string;
    serviceType: string;
    officeAddress: string;
    servicePeriod: string;
    projectNumber: string;
    preparedBy: string;
    contactPerson: string;
    datePrepared: string;
    serviceDate?: string;
    logoImage?: string;
  };
  hardware: HardwareItem[];
  software: SoftwareMachine[];
  ipAddresses: IPAddressItem[];
  parameters: ParameterGroup[];
  remarks: PostCheckRemark[];
  resources: ResourcePerson[];
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface HardwareItem {
  id: string;
  qty: number;
  unit: string;
  item: string;
  specifications: string;
  remarks: string;
}

export interface SoftwareMachine {
  id: string;
  machineName: string;
  items: SoftwareItem[];
}

export interface SoftwareItem {
  id: string;
  item: string;
  preUpgrade: string;
  postUpgrade: string;
  remarks: string;
}

export interface IPAddressItem {
  id: string;
  server: string;
  nic: string;
  ipAddress: string;
  remarks: string;
}

export interface ParameterGroup {
  id: string;
  groupTitle: string;
  items: ParameterItem[];
}

export interface ParameterItem {
  id: string;
  component: string;
  task: string;
  tools: string;
  automationMethod: string;
  completionCriteria: string;
  status: string;
  image?: string;
}

export interface PostCheckRemark {
  id: string;
  finding: string;
  recommendation: string;
}

export interface ResourcePerson {
  id: string;
  name: string;
  role: string;
  company: string;
  signature?: string; // Base64 image
}
