import { TokenStatus } from "./TokenStatus";

export interface CustomCardManagerProps {
  number?: number;
  title: string;
  text: string;
  onPress?: () => void;
}

export interface OutPassCardManagerProps {
  heading: string;
  name: string;
  startTime: Date;
  endTime: Date;
  email: string;
  onPressCard: ()=>void;
  profileImg?: string;
  value:string;
  status?:TokenStatus;
  phoneNumber:number;
  data?:Out
}