// MÓDULOS LOCALES
import Input from "@/src/components/input";
import ScreenContainer from "@/src/components/screenContainer";
import VStack from "@/src/components/vstack";
import Button from "@/src/components/button";
import { ModalOpener$ } from "@/src/utils/helpers";
import { usePost } from "@/src/hooks/useHook";

// MÓDULOS EXTERNOS
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

// TIPOS
import { RootStackScreenProps } from "@/src/types/ScreenTypes";

// ESTILOS
import styles from "./styles";

export interface AddTaskProps {
  title: string;
  description?: string;
}

export default function AddTask({
  route,
  navigation,
}: RootStackScreenProps<"AddTask">) {
  const { group } = route.params;

  const [addTask, loading, error] = usePost({
    endpoint: "task",
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

  function handleSubmit(values: AddTaskProps) {
    addTask({ ...values, groupId: group?.groupId }, () => {
      ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "SUCCESS",
          title: "Realizado",
          description: "Tarea agregada con éxito.",
        },
      });
      navigation.goBack();
    });
  }

  return (
    <ScreenContainer padding>
      <View style={{ height: "95%" }}>
        {/* <View style={styles.illustration} />
      <View style={[styles.illustration, styles.bottom]} /> */}
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <VStack space={15} style={styles.form}>
              <Text style={styles.title}>Nuevo Tarea</Text>
              <Input
                value={values.title}
                onChangeText={handleChange("title")}
                error={errors.title}
                label="Título"
                placeholder="Escribir..."
                autoCapitalize="words"
              />
              <Input
                value={values.description}
                onChangeText={handleChange("description")}
                error={errors.description}
                label="Descripción (opcional)"
                type="TEXTAREA"
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
