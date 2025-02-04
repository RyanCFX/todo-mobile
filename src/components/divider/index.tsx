// REACT MODULES
import React from "react";
import { View } from "react-native";

// LOCAL MODULES
import { styles } from "./styles";
import { DividerAtrr } from "@/src/types";

export default function Divider({ style, color, vertical }: DividerAtrr) {
  if (vertical) {
    return (
      <View
        style={[
          [styles.vertical, style, !!color && { backgroundColor: color }],
        ]}
      />
    );
  }

  return (
    <View
      style={[
        [styles.horizontal, style, !!color && { backgroundColor: color }],
      ]}
    />
  );
}
