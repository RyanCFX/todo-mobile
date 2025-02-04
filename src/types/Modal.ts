import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type ModalName =
  | "ALERT"
  | "WARNING"
  | "ERROR"
  | "SUCCESS"
  | "JOIN_GROUP"
  | "SELECT"
  | "DROPDOWN";

export interface ModalAtrr {
  visible: boolean;
  onClose?: (visible: false) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  title?: string;
  description?: string;
}
