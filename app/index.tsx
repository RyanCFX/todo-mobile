// MODULOS DE REACT
import React, { useCallback, useRef } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";

// MODULOS DE TERCEROS
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";

// MODULOS LOCALES
import AppStack from "@/src/navigation/AppStack";
import { useLoadSession } from "@/src/hooks/useAuth";
import Alert from "@/src/components/alert";
import Select from "@/src/components/select/Modal";
import Dropdown from "@/src/components/dropdown";

enableScreens();

export default function App() {
  const navRef = useRef<any>(null);
  const [_session, loading] = useLoadSession();

  const [fontsLoaded] = useFonts({
    regular: require("@/assets/fonts/regular.ttf"),
    medium: require("@/assets/fonts/medium.ttf"),
    semibold: require("@/assets/fonts/semibold.ttf"),
    extrabold: require("@/assets/fonts/extrabold.ttf"),
    bold: require("@/assets/fonts/bold.ttf"),
    light: require("@/assets/fonts/light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        }}
      >
        {/* <Image
          source={require("@/assets/images/splash.png")}
          style={{ width: "100%", height: "100%" }}
        /> */}
      </View>
    );
  }

  return (
    // <ScreenContainer>
    //   <Screen>
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <AppStack navRef={navRef} />
        {/* <Signin /> */}
        <Select />
        <Dropdown />
        <Alert />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
    //   </Screen>
    // </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});
