export interface CustomCardProps {
  value?: string;
  status?: 'approved' | 'expired' | 'rejected';
  heading?: string;
  startTime?: Date;
  endTime?: Date;
  approvedBy?: string;
  phoneNumber?: number;
  reason?: string;
}
