// MODULOS DE REACT
import React from "react";
import { View } from "react-native";

// MODULOS LOCALES
import RenderIf from "../renderIf";
import { VStackAtrr } from "@/src/types/VStack";

// ESTILOS
import styles from "./styles";

export default function HStack({ children, space, ...props }: VStackAtrr) {
  return (
    <View {...props} style={[styles.container, props?.style]}>
      {children?.length > 1
        ? children?.map((component, index) => (
            <>
              <View>{component}</View>
              <RenderIf condition={index !== children?.length - 1}>
                <View style={{ width: space || 0, height: 1 }} />
              </RenderIf>
            </>
          ))
        : children}
    </View>
  );
}
