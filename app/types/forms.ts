export interface SoftwareDevelopmentFormState {
  projectGoal: string;
  softwareType: string;
  platform: string[];
  features: string[];
  technology: string;
  budget: string;
  timeline: string;
  teamSize: string;
  maintenance: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

export type GenericFormState = Record<string, any>;
export interface WebDevelopmentFormState {
  websiteGoal: string;
  services: string[];
  websiteType: string;
  design: string;
  features: string[];
  budget: string;
  timeline: string;
  pages: string;
  languages: string;
  maintenance: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

export interface ToolsFormState {
  openSourceTools: string[];
  aiAgents: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

export interface CyberSecurityFormState {
  securityConcept: string;
  industry: string;
  standard: string;
  training: string;
  additionalQuestions: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

export interface ITInfrastructureFormState {
  infrastructureType: string;
  currentSetup: string;
  services: string[];
  budget: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

export interface WorkflowAutomationFormState {
  automationType: string;
  currentProcess: string;
  processComplexity: string;
  integration: string[];
  features: string[];
  dataVolume: string;
  timeline: string;
  budget: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  message: string;
}

