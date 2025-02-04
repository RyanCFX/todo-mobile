// MÓDULOS EXTERNOS
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

// MÓDULOS LOCALES
import Input from "@/src/components/input";
import ScreenContainer from "@/src/components/screenContainer";
import VStack from "@/src/components/vstack";
import Button from "@/src/components/button";
import { ModalOpener$ } from "@/src/utils/helpers";
import { usePost } from "@/src/hooks/useHook";
import { RootStackScreenProps } from "@/src/types/ScreenTypes";

// ESTILOS
import styles from "./styles";

// CONSTANTES
import Icon from "@/constants/icons";
import { COLOR } from "@/constants";

export interface AddGroupProps {
  name: string;
  password?: string;
}

export default function AddGroup({
  navigation,
}: RootStackScreenProps<"AddGroup">) {
  const [addGroup, loading, error] = usePost({
    endpoint: "group",
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
      return;
    }
  }, [error]);

  function handleSubmit(values: AddGroupProps) {
    addGroup(values, () => {
      ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "SUCCESS",
          title: "Realizado",
          description: "Grupo creado con éxito.",
        },
      });
      navigation.goBack();
    });
  }

  return (
    <ScreenContainer padding>
      <View style={{ height: "95%" }}>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <VStack space={15} style={styles.form}>
              <Text style={styles.title}>Nuevo Grupo</Text>
              <Input
                value={values.name}
                onChangeText={handleChange("name")}
                error={errors.name}
                label="Nombre"
                preffix={<Icon name="user" color={COLOR.dark} />}
                placeholder="Escribir..."
                autoCapitalize="words"
              />
              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                error={errors.password}
                label="Contraseña (opcional)"
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
      </View>
    </ScreenContainer>
  );
}
