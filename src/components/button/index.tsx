// MODULOS DE REACT
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

// MODULOS LOCALES
import RenderIf from "../renderIf";
import Center from "../center";
import { COLOR } from "../../../constants";
import { styles } from "./styles";

interface ButtonAtrr extends TouchableOpacityProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  preffix?: ReactNode;
  suffix?: ReactNode;
  type?: "ERROR" | "SUCCESS" | "WARNING" | "BORDER" | "DARK" | "LIGHT";
  onPressDisabled?: () => void;
  onPress?: () => void;
  loading?: any;
}

/**
 * BOTÓN GENÉRICO EN TODA LA APLICACIÓN
 * @returns JSX.Element
 */
export default function Button({
  children,
  textStyle,
  preffix,
  suffix,
  type,
  ...props
}: ButtonAtrr) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        {
          backgroundColor:
            type === "ERROR"
              ? COLOR.error
              : type === "SUCCESS"
              ? COLOR.success
              : type === "WARNING"
              ? COLOR.warning
              : type === "BORDER"
              ? "transparent"
              : type === "DARK"
              ? COLOR.dark
              : type === "LIGHT"
              ? COLOR.light
              : COLOR.primary,
        },
        type === "BORDER" && styles.border,
        props?.disabled && styles.disabled,
        props?.style,
      ]}
      onPress={() =>
        props?.disabled ? props?.onPressDisabled?.() : props?.onPress?.()
      }
      disabled={props?.disabled}
    >
      <Center style={styles.center}>
        <RenderIf condition={!!preffix}>
          <View style={styles.preffix}>{preffix}</View>
        </RenderIf>
        <RenderIf condition={!props?.loading}>
          <Text
            style={[
              styles.text,
              {
                color:
                  type === "BORDER"
                    ? COLOR.primary
                    : type === "LIGHT"
                    ? COLOR.dark
                    : COLOR.light,
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </RenderIf>
        <RenderIf condition={props?.loading}>
          <ActivityIndicator color={COLOR.light} />
        </RenderIf>
        <RenderIf condition={!!suffix}>
          <View style={styles.suffix}>{suffix}</View>
        </RenderIf>
      </Center>
    </TouchableOpacity>
  );
}
