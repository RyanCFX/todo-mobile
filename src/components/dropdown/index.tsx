// MODULOS DE REACT
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, Modal, Pressable } from "react-native";

// MODULOS DE TERCEROS
import { View } from "react-native-animatable";
import BottomSheet, { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

// MODULOS LOCALES
import { useModalVisible } from "@/src/hooks/useModal";
import { COLOR } from "@/constants";

// STYLES
import styles from "./styles";

interface ModalProps {
  items: Array<{ label: string; onPress: () => void }>;
}

export default function Dropdown() {
  const [visible, close, extra] = useModalVisible<ModalProps>("DROPDOWN");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState<string | null>(null);

  const sheetHeight = useMemo(() => {
    const height = (extra?.items?.length || 1) * 10 + 50;

    if (height > WINDOW_HEIGHT - 100) {
      return WINDOW_HEIGHT - 100;
    }

    return (extra?.items?.length || 1) * 20 + 100;
  }, [extra]);

  useEffect(() => {
    if (visible) {
      setIndex(1);
      // bottomSheetRef?.current?.snapToIndex(1);
    }
  }, [visible]);

  function onClose() {
    bottomSheetRef.current?.snapToIndex(0);
    close?.();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable onPress={onClose} style={styles.modalCloseButton} />
      <BottomSheet
        backgroundStyle={{ backgroundColor: COLOR.light }}
        ref={bottomSheetRef}
        snapPoints={[0.05, sheetHeight]}
        index={index}
        onClose={onClose}
        onChange={(index: number) => {
          if (index === 0) {
            onClose();
          }
        }}
      >
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              animation={
                search !== null
                  ? !search?.length
                    ? "fadeInDown"
                    : "fadeOutUp"
                  : undefined
              }
            >
              {extra?.items?.map((data) => (
                <TouchableOpacity
                  onPress={() => {
                    data?.onPress?.();
                    onClose();
                  }}
                  style={styles.selectButton}
                >
                  <Text style={[styles.modalLabel]}>{data?.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={{ height: 150 }} /> */}
          </ScrollView>
        </View>
      </BottomSheet>
    </Modal>
  );
}
