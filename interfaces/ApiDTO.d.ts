export interface LoginData {
  email: string;
  password: string;
  role: Role;
}

export interface StudentRegisterData {
  name: string;
  email: string;
  password: string;
  organizationId: string;
  profileImg?: string;
}

export interface AdminRegisterData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  organizationLogo?: string;
  profileImg?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface generateOutPassData {
  reason: string;
  startTime: Date;
  endTime: Date;
  heading: string;
}

export interface addSupervisorData {
  checkerEmails: string[];
  managerEmails: string[];
}
