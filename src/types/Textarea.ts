import {TextInputProps} from 'react-native';

export interface TextareaAtrr extends TextInputProps {
  disabled?: boolean;
  label?: string;
  error?: boolean;
}
