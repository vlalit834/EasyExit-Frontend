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
  width?: string | number;
}

