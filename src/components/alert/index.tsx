// REACT MODULES
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// EXPO MODULES
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// LOCAL MODULES
import Modal from "../modal";
import RenderIf from "../renderIf";
import { useModalVisible } from "@/src/hooks/useModal";

// STYLES
import styles from "./styles";
import { COLOR } from "@/constants";

export default function Alert() {
  const [visible, close, extra] = useModalVisible("ALERT");

  return (
    <Modal
      onClose={() => {
        extra?.onCancel?.();
        close();
      }}
      visible={visible}
      style={[extra?.type === "QUESTION" && styles.nopadding]}
    >
      <RenderIf condition={extra?.type === "QUESTION"}>
        <View style={styles.question}>
          <AntDesign
            name="questioncircleo"
            size={38}
            color={COLOR.dark}
            style={styles.asset}
          />
          {/* <FontAwesome
            name="question-circle"
            size={90}
            color={COLOR.border}
            style={styles.asset}
          /> */}
          <Text style={[styles.title, extra?.titleStyle]}>{extra?.title}</Text>
          <Text style={styles.description}>{extra?.description}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              close();
              extra?.onCancel?.();
            }}
            style={[styles.button, styles.firstButton]}
          >
            <Text style={styles.buttonText}>
              {extra?.cancelText || "Cancelar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              close();
              extra?.onOk?.();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{extra?.okText || "Aceptar"}</Text>
          </TouchableOpacity>
        </View>
      </RenderIf>

      <RenderIf condition={extra?.type === "ERROR"}>
        {/* <AntDesign
          name="closecircle"
          color={COLOR.secondary}
          size={90}
          
        /> */}
        <MaterialIcons
          name="error-outline"
          size={40}
          color={COLOR.error}
          style={styles.asset}
        />
        <Text style={[styles.title, { color: COLOR.light }, extra?.titleStyle]}>
          {extra?.title}
        </Text>
        <Text style={styles.description}>{extra?.description}</Text>
      </RenderIf>

      <RenderIf condition={extra?.type === "SUCCESS"}>
        <FontAwesome5
          name="check-circle"
          size={42}
          color={COLOR.primary}
          style={styles.asset}
        />
        {/* <Ionicons
          name="checkmark-done-circle"
          color={COLOR.primary}
          size={95}
          style={styles.asset}
        /> */}
        <Text style={[styles.title, extra?.titleStyle]}>{extra?.title}</Text>
        <Text style={styles.description}>{extra?.description}</Text>
      </RenderIf>
    </Modal>
  );
}
