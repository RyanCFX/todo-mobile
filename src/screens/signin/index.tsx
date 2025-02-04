// MÓDULOS LOCALES
import Input from "@/src/components/input";
import ScreenContainer from "@/src/components/screenContainer";
import VStack from "@/src/components/vstack";
import Button from "@/src/components/button";
import HStack from "@/src/components/hstack";
import { ModalOpener$ } from "@/src/utils/helpers";
import { useSignin } from "@/src/hooks/useAuth";
import { RootStackScreenProps } from "@/src/types/ScreenTypes";

// MÓDULOS EXTERNOS
import React, { useEffect } from "react";
import { Formik } from "formik";
import { Text, TouchableOpacity, View } from "react-native";

// CONSTANTES
import { COLOR } from "@/constants";
import Icon from "@/constants/icons";

// ESTILOS
import styles from "./styles";

export default function Signin({ navigation }: RootStackScreenProps<"Signin">) {
  const [signin, loading, error] = useSignin();

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

  return (
    <ScreenContainer padding>
      <View style={{ height: "95%" }}>
        {/* <View style={styles.illustration} />
      <View style={[styles.illustration, styles.bottom]} /> */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => signin(values.email, values.password)}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <VStack space={15} style={styles.form}>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <Input
                value={values.email}
                onChangeText={handleChange("email")}
                error={errors.email}
                label="Correo Electrónico"
                preffix={<Icon name="user" color={COLOR.dark} />}
                placeholder="Escribir..."
                autoCapitalize="none"
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
        {/* <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        /> */}

        <HStack space={5} style={styles.signup}>
          <Text style={[styles.forgotPassword, styles.signupText]}>
            No tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={[
                styles.forgotPassword,
                styles.signupText,
                { fontFamily: "semibold" },
              ]}
            >
              Registrate
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </ScreenContainer>
  );
}
