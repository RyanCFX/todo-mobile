import { ReactNode } from "react";
import {
  StyleProp,
  ViewStyle,
  StatusBar,
  StatusBarProps,
  RefreshControlProps,
  StatusBarStyle,
} from "react-native";

export interface ScreenContainerAtrr {
  children: ReactNode;
  preffix?: ReactNode;
  suffix?: ReactNode;
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  scroll?: boolean;
  navigation?: any;
  preffixStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  safeArea?: boolean;
  notification?: boolean;
  loading?: boolean;
  hasNotification?: boolean;
  onPressBack?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  statusBar?: StatusBarProps;
  statusBarColor?: string;
  content?: boolean;
  headerType?: "PRIMARY" | "SECONDARY";
  hideHeader?: boolean;
  avoinding?: boolean;
  father?: boolean;
  padding?: boolean;
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
  barStyle?: StatusBarStyle;
}
