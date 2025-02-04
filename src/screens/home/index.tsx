// MÓDULOS LOCALES
import Divider from "@/src/components/divider";
import HStack from "@/src/components/hstack";
import { ModalOpener$ } from "@/src/utils/helpers";
import ScreenContainer from "@/src/components/screenContainer";
import GroupCard from "./components/groupCard";
import AddGroup from "./components/addGroup";
import RenderIf from "@/src/components/renderIf";
import Skeleton from "@/src/components/skeleton";
import VStack from "@/src/components/vstack";
import { useDelete, useGet, usePost } from "@/src/hooks/useHook";
import useSessionStore from "@/src/zustand/session";

// MÓDULOS EXTERNOS
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

// TIPOS
import { RootStackScreenProps } from "@/src/types/ScreenTypes";
import { GroupProps } from "@/src/types";

// ESTILOS
import { styles } from "./styles";

// CONSTANTES
import Icon from "@/constants/icons";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

export default function Home({ navigation }: RootStackScreenProps<"Home">) {
  const { session, setSession } = useSessionStore(
    ({ session, setSession }) => ({ session, setSession })
  );

  const [groups, gLoading, error, gReload] = useGet<GroupProps[]>({
    endpoint: "group",
    initialState: [],
  });

  const [removeGroup, rLoading, rError] = useDelete({
    endpoint: "group",
  });

  const [signout, sLoading, sError] = usePost({
    endpoint: "auth/signout",
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

  useFocusEffect(
    useCallback(() => {
      gReload();
    }, [])
  );

  function handleSignout() {
    signout(undefined, () => {
      setSession(null);
    });
  }

  function handleAddGroup() {
    ModalOpener$.next({
      name: "DROPDOWN",
      extra: {
        items: [
          {
            label: "Unirme",
            onPress: () =>
              ModalOpener$.next({
                name: "JOIN_GROUP",
                extra: {
                  success: () => {},
                },
              }),
          },
          { label: "Crear", onPress: () => navigation.navigate("AddGroup") },
        ],
      },
    });
  }

  function handleRemoveGroup(groupId: string) {
    removeGroup({ groupId }, () => gReload());
  }

  return (
    <ScreenContainer safeArea>
      <AddGroup />
      <HStack style={styles.header}>
        <View>
          <RenderIf condition={!sLoading}>
            <TouchableOpacity onPress={handleSignout}>
              <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </RenderIf>
          <RenderIf condition={sLoading}>
            <ActivityIndicator />
          </RenderIf>
        </View>
        <VStack>
          <Text style={styles.welcome}>Bienvenido</Text>
          <Text
            style={styles.name}
          >{`${session?.name} ${session?.lastname}`}</Text>
        </VStack>
        <View style={{ width: 24 }} />
      </HStack>
      <HStack style={styles.top}>
        <Text style={styles.title}>Grupos</Text>
        <TouchableOpacity onPress={handleAddGroup} style={styles.addButton}>
          <Icon name="add" size={22} />
        </TouchableOpacity>
      </HStack>
      <View style={{ paddingHorizontal: 20 }}>
        <Divider />
      </View>
      <RenderIf condition={gLoading}>
        <VStack space={15} style={{ paddingHorizontal: 20 }}>
          {Array.from({ length: 3 }).map(() => (
            <Skeleton
              width={WINDOW_WIDTH - 40}
              height={140}
              borderRadius={30}
            />
          ))}
        </VStack>
      </RenderIf>
      <RenderIf condition={!gLoading}>
        <ScrollView style={{ padding: 20, height: "100%" }}>
          {groups?.map((group) => (
            <GroupCard
              onPress={() => navigation.navigate("Tasks", { group })}
              remove={handleRemoveGroup}
              group={group}
            />
          ))}
          <View style={{ height: 250 }} />
        </ScrollView>
      </RenderIf>
    </ScreenContainer>
  );
}
