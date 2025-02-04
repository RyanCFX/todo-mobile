// MODULOS DE REACT
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";

// MODULOS DE TERCEROS
import { View as Animatable } from "react-native-animatable";
import { Feather } from "@expo/vector-icons";

// MODULOS LOCALES
import { ModalOpener$ } from "@/src/utils/helpers";

// STYLES
import styles from "./styles";
import RenderIf from "../renderIf";
import Icon from "@/constants/icons";
import { COLOR } from "@/constants";
import { BooleanProp } from "react-native-svg";

export interface ItemProps {
  label: string;
  value: string;
}

interface SelectAtrr {
  error?: string;
  disabled?: boolean;
  label?: string;
  animatable?: {
    animation?: string;
    duration?: number;
    delay?: number;
  };
  alertColor?: string;
  displayError?: boolean;
  suffixWidth?: number;
  preffixWidth?: number;
  alert?: string;
  placeholder?: string;
  value?: string;
  items: ItemProps[];
  onChange?: (value: string) => void;
  loading?: BooleanProp;
}

export default function Select({
  items,
  value,
  onChange,
  ...props
}: SelectAtrr) {
  const selectedItem = useMemo(
    () => items?.find((item) => item?.value === value),
    [value, items]
  );

  return (
    <Animatable {...props?.animatable}>
      <RenderIf condition={!!props?.label}>
        <Text style={styles.label}>{props?.label}</Text>
      </RenderIf>
      <TouchableOpacity
        onPress={() =>
          ModalOpener$.next({
            name: "SELECT",
            extra: {
              items,
              value,
              onSelect: (data: string) => onChange?.(data),
            },
          })
        }
        style={[
          styles.input,
          props?.disabled && styles.disabled,
          !!props?.error && styles.error,
        ]}
      >
        <Text
          style={[
            styles.text,
            !selectedItem?.label && { color: COLOR.placeholder },
          ]}
        >
          {selectedItem?.label || props?.placeholder}
        </Text>

        <RenderIf condition={!!props?.loading}>
          <ActivityIndicator color={COLOR.primary} />
        </RenderIf>
        <RenderIf condition={!props?.loading}>
          <Icon name="bottom-arrow" color={COLOR.primary} size={14} />
        </RenderIf>
        <RenderIf condition={!!props?.error}>
          <Feather name="alert-circle" size={20} color={COLOR.error} />
        </RenderIf>
      </TouchableOpacity>
      <RenderIf
        condition={
          !!props?.alert || (!!props?.error?.length && !!props?.displayError)
        }
      >
        <Text
          style={[
            styles.label,
            styles.alert,
            { color: props?.error ? COLOR.error : COLOR.text },
          ]}
        >
          {props?.error || props?.alert}
        </Text>
      </RenderIf>
    </Animatable>
  );
}
