import ScreenContainer from "@/src/components/screenContainer";
// import BottomSheet, { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import VStack from "../vstack";
import styles from "./styles";
import {
  ScrollView,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Input from "../input";
import { View } from "react-native-animatable";
import { useModalVisible } from "@/src/hooks/useModal";
import { ItemProps } from ".";
import RenderIf from "../renderIf";
import { COLOR } from "@/constants";
import Icon from "@/constants/icons";
import BottomSheet, { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

interface ModalProps {
  items: ItemProps[];
  value: string;
  search?: boolean;
  onSelect?: (value: string) => void;
}

export default function Select() {
  const [visible, close, extra] = useModalVisible<ModalProps>("SELECT");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState<string | null>(null);

  const sheetHeight = useMemo(() => {
    const height = (extra?.items?.length || 1) * 10 + 50;

    if (height > WINDOW_HEIGHT - 100) {
      return WINDOW_HEIGHT - 100;
    }

    return (extra?.items?.length || 1) * 10 + 100;
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

  function onSelect(value: string) {
    extra?.onSelect?.(value);
    onClose();
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
        <VStack space={20} style={styles.content}>
          {/* <RenderIf condition={!!extra?.search}>
            <Input
              // preffixWidth={25}
              // suffixWidth={20}
              preffix={<Icon name="search" size={20} color={COLOR.light} />}
              placeholder="Buscar..."
              onChangeText={(value) => setSearch(value)}
            />
          </RenderIf> */}
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
                  onPress={() => onSelect?.(data?.value)}
                  style={[
                    styles.selectButton,
                    extra?.value === data?.value && styles.selected,
                  ]}
                >
                  <Text style={[styles.modalLabel]}>{data?.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={{ height: 150 }} /> */}
          </ScrollView>
        </VStack>
      </BottomSheet>
    </Modal>
  );
}
