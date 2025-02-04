import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface VStackAtrr {
  children: ReactNode[];
  space?: number;
  style?: StyleProp<ViewStyle>;
}
