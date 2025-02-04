// REACT MODULES
import React, { useEffect } from "react";
import { Text, View } from "react-native";

// LOCAL MODULES
import { useModalVisible } from "@/src/hooks/useModal";

// STYLES
import styles from "./styles";
import { COLOR } from "@/constants";
import Modal from "@/src/components/modal";
import RenderIf from "@/src/components/renderIf";
import { Formik } from "formik";
import VStack from "@/src/components/vstack";
import Input from "@/src/components/input";
import Icon from "@/constants/icons";
import Button from "@/src/components/button";
import { usePost } from "@/src/hooks/useHook";
import { ModalOpener$ } from "@/src/utils/helpers";

export interface JoinGroupProps {
  groupCode: string;
  password?: string;
}

export default function AddGroup() {
  const [visible, close, extra] = useModalVisible("JOIN_GROUP");

  const [joinToGroup, loading, error] = usePost({
    endpoint: "group/join",
  });

  useEffect(() => {
    if (error) {
      ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "ERROR",
          title: "Oops...",
          description: error?.message,
        },
      });
      close();
      return;
    }
  }, [error]);

  function handleSubmit(values: JoinGroupProps) {
    joinToGroup(values, () => {
      extra?.succes?.();
    });
  }

  return (
    <Modal
      onClose={() => {
        extra?.onCancel?.();
        close();
      }}
      visible={visible}
      // style={[extra?.type === "QUESTION" && styles.nopadding]}
    >
      <View style={styles.question}>
        {/* <AntDesign
            name="questioncircleo"
            size={38}
            color={COLOR.dark}
            style={styles.asset}
          /> */}
        {/* <FontAwesome
            name="question-circle"
            size={90}
            color={COLOR.border}
            style={styles.asset}
          /> */}
        <Text style={[styles.title, extra?.titleStyle]}>Unirme</Text>
        <Formik
          initialValues={{ groupCode: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
            <VStack space={15}>
              <Input
                value={values.groupCode}
                onChangeText={(value) =>
                  setFieldValue("groupCode", value.toUpperCase())
                }
                error={errors.groupCode}
                label="Código"
                preffix={<Icon name="user" color={COLOR.dark} />}
                placeholder="Escribir..."
                autoCapitalize="words"
                maxLength={6}
              />
              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                error={errors.password}
                label="Contraseña"
                type="PASSWORD"
                placeholder="Escribir..."
              />

              <Button
                onPress={handleSubmit}
                loading={loading}
                type="DARK"
                style={{ marginTop: 15 }}
              >
                Aceptar
              </Button>
            </VStack>
          )}
        </Formik>
        {/* <Text style={styles.description}>{extra?.description}</Text> */}
      </View>
    </Modal>
  );
}
