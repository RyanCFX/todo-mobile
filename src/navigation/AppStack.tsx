// MÓDULOS EXTERNOS
import React, { Ref } from "react";
import {
  NavigationContainerRef,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// MÓDULOS LOCALES
import { RootStackParamList } from "@/src/types/ScreenTypes";
import * as Screens from "@/src/screens";
import useSessionStore from "../zustand/session";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface NavigationProps {
  navRef: Ref<NavigationContainerRef<RootStackParamList>>;
}

export default function AppStack({ navRef }: NavigationProps) {
  const session = useSessionStore(({ session }) => session);

  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!session && (
          <Stack.Group>
            <Stack.Screen name="Signin" component={Screens.Signin} />
            <Stack.Screen name="Signup" component={Screens.Signup} />
          </Stack.Group>
        )}
        {!!session && (
          <Stack.Group>
            <Stack.Screen name="Home" component={Screens.Home} />
            <Stack.Screen name="AddGroup" component={Screens.AddGroup} />
            <Stack.Screen name="Tasks" component={Screens.Tasks} />
            <Stack.Screen name="AddTask" component={Screens.AddTask} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
