import { ReactNode } from "react";
import {
  DimensionValue,
  StyleProp,
  TextInputProps,
  ViewProps,
  ViewStyle,
} from "react-native";

export interface InputAtrr extends TextInputProps {
  type?: "PASSWORD" | "SEARCH" | 'TEXTAREA';
  error?: string;
  preffix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  lockDisabled?: boolean;
  label?: string;
  alert?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  mask?: string;
  animatable?: {
    animation?: string;
    duration?: number;
    delay?: number;
  };
  alertColor?: string;
  displayError?: boolean;
  onPressFilter?: () => void;
  suffixWidth?: number;
  preffixWidth?: number;
  onPress?: () => void;
}
