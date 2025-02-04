// REACT
import React, { useEffect, useState } from "react";
import { Pressable, Modal as RNModal, Text, View } from "react-native";

// MÓDULOS EXTERNOS
import { View as Animatable } from "react-native-animatable";

// MÓDULOS LOCALES
import { ModalAtrr } from "@/src/types/Modal";
import RenderIf from "../renderIf";

// ESTILOS
import styles from "./styles";

export default function Modal({
  visible,
  style,
  children,
  onClose,
  ...props
}: ModalAtrr) {
  const [animation, setAnimation] = useState("bounceIn");

  useEffect(() => {
    if (visible) {
      setAnimation("fadeIn");
    }
  }, [visible]);

  const close = () => {
    setAnimation("fadeOut");

    setTimeout(() => {
      onClose?.(false);
    }, 500);
  };

  return (
    <RNModal
      animationType="fade"
      visible={visible}
      transparent
      style={styles.modal}
    >
      <View style={styles.container}>
        <Pressable onPress={close} style={styles.closeBackground} />
        <Animatable animation={animation} delay={100} duration={500}>
          <View style={{ borderRadius: 20, overflow: "hidden" }}>
            <View style={[styles.content, style]}>
              <RenderIf condition={!!props?.title}>
                <Text style={styles.title}>{props?.title}</Text>
              </RenderIf>
              <RenderIf condition={!!props?.description}>
                <Text>{props?.description}</Text>
              </RenderIf>
              {children}
            </View>
          </View>
        </Animatable>
      </View>
    </RNModal>
  );
}
