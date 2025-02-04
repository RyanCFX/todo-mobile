import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";

import { styles } from "./styles";

interface CenterAtrr extends ViewProps {
  children: ReactNode;
}

export default function Center({ children, ...props }: CenterAtrr) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
}
