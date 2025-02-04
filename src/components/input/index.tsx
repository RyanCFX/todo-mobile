// MODULOS DE REACT
import React, { useMemo, useState } from "react";
import {
  DimensionValue,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// MODULOS DE TERCEROS
import { View as Animatable } from "react-native-animatable";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

// MODULOS LOCALES
import { getInputWidth } from "./helpers";
import { InputAtrr } from "@/src/types";
import RenderIf from "@/src/components/renderIf";
import HStack from "../hstack";

// CONSTANTES Y ESTILOS
import styles from "./styles";
import { COLOR } from "@/constants";
import Icon from "@/constants/icons";

export default function Input({ type, preffix, suffix, ...props }: InputAtrr) {
  const [focus, setFocus] = useState(false);

  // OCULTAR CONTRASEÑA O NO
  const [locked, setLocked] = useState(true);

  // ANCHO DE INPUT
  const inputWidth = useMemo<DimensionValue>(
    () =>
      getInputWidth(!!preffix, !!suffix, !!props?.error, props?.suffixWidth),
    [suffix, preffix]
  );

  if (type === "SEARCH") {
    return (
      <Input
        placeholder={props?.placeholder}
        inputStyle={props?.onPressFilter && { width: "72%", marginLeft: 10 }}
        suffix={
          props?.onPressFilter && (
            <TouchableOpacity
              onPress={() => !props?.disabled && props?.onPressFilter?.()}
            >
              <HStack space={7}>
                <View>
                  <FontAwesome5 name="filter" size={16} color={COLOR.light} />
                </View>
                <Text style={styles.filterText}>Filtrar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }
        // placeholder="Contraseña"
        preffix={<Icon name="search" size={20} color={COLOR.light} />}
        {...props}
      />
    );
  }

  if (type === "PASSWORD") {
    return (
      <Input
        secureTextEntry={locked}
        placeholder="Contraseña"
        suffix={
          suffix || (
            <TouchableOpacity
              onPress={() =>
                !props?.disabled && !props?.lockDisabled && setLocked(!locked)
              }
            >
              <FontAwesome5
                name={locked ? "eye-slash" : "eye"}
                size={18}
                color={COLOR.dark}
              />
            </TouchableOpacity>
          )
        }
        // placeholder="Contraseña"
        preffix={<Icon name="locked" size={18} color={COLOR.dark} />}
        {...props}
      />
    );
  }

  if (type === "TEXTAREA") {
    return (
      <Input
        multiline
        inputStyle={{ height: 200 }}
        inputContainerStyle={{ height: 200 }}
        {...props}
      />
    );
  }
  return (
    <Animatable {...props?.animatable} style={[props?.containerStyle]}>
      <RenderIf condition={!!props?.label}>
        <Text style={styles.label}>{props?.label}</Text>
      </RenderIf>
      <TouchableOpacity
        disabled={!props?.onPress}
        onPress={props?.onPress}
        style={[
          styles.input,
          focus && {
            borderColor: COLOR.primary,
          },
          props?.disabled && styles.disabled,
          !!props?.error && styles.error,
          props?.inputContainerStyle,
        ]}
      >
        <RenderIf condition={!!preffix}>
          <View style={{ width: props?.preffixWidth || 20 }}>{preffix}</View>
        </RenderIf>

        <TextInput
          placeholderTextColor={COLOR.placeholder}
          editable={!props?.disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...props}
          style={[styles.textInput, { width: inputWidth }, props?.inputStyle]}
        />

        <RenderIf condition={!!suffix}>{suffix}</RenderIf>
        <RenderIf condition={!suffix && !!props?.error}>
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
