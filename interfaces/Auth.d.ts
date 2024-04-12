import { KeyboardTypeOptions } from 'react-native';

export interface TextInputProps {
  value: string;
  id?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  editable?: boolean;
  error?: boolean;
}

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

