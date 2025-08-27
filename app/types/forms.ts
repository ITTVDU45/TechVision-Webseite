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
