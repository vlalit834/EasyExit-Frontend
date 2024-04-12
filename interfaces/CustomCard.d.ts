import { TokenStatus } from './TokenStatus';

export interface CustomCardProps {
  value?: string;
  status?: TokenStatus;
  heading?: string;
  startTime?: Date;
  endTime?: Date;
  acceptedBy?: string;
  phoneNumber?: number;
  reason?: string;
}
