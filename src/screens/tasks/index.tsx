// MÓDULOS LOCALES
import ScreenContainer from "@/src/components/screenContainer";
import VStack from "@/src/components/vstack";
import Divider from "@/src/components/divider";
import HStack from "@/src/components/hstack";
import Skeleton from "@/src/components/skeleton";
import RenderIf from "@/src/components/renderIf";
import TaskCard from "./components/taskCard";
import { copyToClipboard, ModalOpener$ } from "@/src/utils/helpers";
import useSessionStore from "@/src/zustand/session";
import { useDelete, useGet, usePut } from "@/src/hooks/useHook";

// MÓDULOS EXTERNOS
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// CONSTANTES
import Icon from "@/constants/icons";
import { COLOR } from "@/constants";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

// TIPOS
import { FarmProps, GroupProps, TaskProps } from "@/src/types";
import { Status } from "@/src/types/Status";
import { RootStackScreenProps } from "@/src/types/ScreenTypes";

// SOCKET
import { socket } from "@/src/utils/taskSocket";

// ESTILOS
import { styles } from "./styles";

export default function Tasks({
  navigation,
  route,
}: RootStackScreenProps<"Tasks">) {
  const { group } = route?.params;
  const { session } = useSessionStore(({ session }) => ({ session }));

  const [copied, setCopied] = useState(false);
  const [formatedTasks, setFormatedTasks] = useState<TaskProps[]>([]);

  const [tasks, tLoading, error, tReload] = useGet<TaskProps[]>({
    endpoint: `task/${group?.groupId}`,
    initialState: [],
  });

  const [removeGroup, rLoading, rError] = useDelete({
    endpoint: "task",
  });

  const [updateTaskStatus, uLoading, uError] = usePut({
    endpoint: "task/status",
  });

  const totalCompletedTasks = useMemo(() => {
    return formatedTasks.filter(
      ({ status }) => status?.statusCode === "COMPLETED"
    )?.length;
  }, [formatedTasks]);

  useEffect(() => {
    setFormatedTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    socket.connect();

    // UNIRSE EL GRUPO
    socket.emit("joinGroup", group);

    // NUEVA TAREA
    socket.on("NEW_TASK", (data) => {
      setFormatedTasks((prev) => [data, ...prev]);
    });

    // CAMBIO DE ESTADO DE TAREA
    socket.on("NEW_TASK_STATUS", (data: TaskProps) => {
      console.log(data);
      setFormatedTasks((prev) =>
        prev?.map((task) => (task?.taskId === data?.taskId ? data : task))
      );
    });

    // TAREA ELIMINADA
    socket.on("DELETED_TASK", (data: TaskProps) => {
      setFormatedTasks((prev) =>
        prev?.filter((task) => task?.taskId !== data?.taskId)
      );
    });

    // CONECCION
    socket.on("connect", () => {
      console.log("Conectado al socket");
    });

    // DESCONECCION
    socket.on("disconnect", () => {
      console.log("Desconectado del socket");
    });

    return () => {
      socket.emit("leaveGroup", group);
      socket.disconnect();
    };
  }, [group]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

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
      tReload();
    }, [])
  );

  function handleRemoveGroup(taskId: string) {
    removeGroup({ taskId }, () => tReload());
  }

  function handleStatus(taskId: string, statusCode: string) {
    updateTaskStatus(
      {
        taskId,
        statusCode,
      },
      tReload
    );
  }

  function handleOptions(task: TaskProps) {
    const options = [
      {
        label: "Completar",
        status: [Status.NEW],
        onPress: () => handleStatus(task.taskId, "COMPLETED"),
      },
      {
        label: "Cancelar",
        status: [Status.NEW],
        onPress: () => handleStatus(task.taskId, "CANCELED"),
      },
    ];

    ModalOpener$.next({
      name: "DROPDOWN",
      extra: {
        items: options?.filter((option) =>
          option?.status?.includes(task?.status?.statusCode)
        ),
      },
    });
  }

  async function copyCode() {
    setCopied(true);
    await copyToClipboard(group?.groupCode);
  }

  return (
    <ScreenContainer safeArea>
      <VStack space={10} style={styles.header}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={copyCode}>
            <HStack
              space={10}
              style={[
                styles.left,
                copied && { backgroundColor: COLOR.opacity },
              ]}
            >
              <Text style={styles.groupCode}>{group?.groupCode}</Text>
              <Feather name="copy" size={24} color="black" />
            </HStack>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{group?.name}</Text>
        <Text
          style={styles.completed}
        >{`${totalCompletedTasks}/${formatedTasks?.length} Completadas`}</Text>
      </VStack>
      <HStack style={styles.top}>
        <Text style={styles.title}>Tareas</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask", { group })}
          style={styles.addButton}
        >
          <Icon name="add" size={22} />
        </TouchableOpacity>
      </HStack>
      <View style={{ paddingHorizontal: 20 }}>
        <Divider />
      </View>

      <RenderIf condition={tLoading}>
        <VStack space={15} style={{ paddingHorizontal: 20 }}>
          {Array.from({ length: 3 }).map(() => (
            <Skeleton
              width={WINDOW_WIDTH - 40}
              height={150}
              borderRadius={30}
            />
          ))}
        </VStack>
      </RenderIf>
      <RenderIf condition={!tLoading}>
        <ScrollView style={{ padding: 20, height: "100%" }}>
          {formatedTasks?.map((task) => (
            <TaskCard
              remove={handleRemoveGroup}
              handleOptions={handleOptions}
              task={task}
              style={{ marginBottom: 15 }}
            />
          ))}
          <View style={{ height: 300 }} />
        </ScrollView>
      </RenderIf>
    </ScreenContainer>
  );
}
