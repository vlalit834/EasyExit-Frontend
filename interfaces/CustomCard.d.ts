import { TokenStatus } from '../constants/TokenStatus';

export interface CustomCardProps {
  value?: string;
  status?: TokenStatus;
  heading?: string;
  startTime?: Date;
  endTime?: Date;
  acceptedBy?: string;
  phoneNumber?: number;
  reason?: string;
  email?:string;
  requestedBy?:string;
}
