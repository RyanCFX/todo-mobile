import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import HStack from "@/src/components/hstack";
import { TaskProps } from "@/src/types";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "@/constants";
import { format, ModalOpener$ } from "@/src/utils/helpers";
import RenderIf from "@/src/components/renderIf";
import { Status } from "@/src/types/Status";
import VStack from "@/src/components/vstack";
import Divider from "@/src/components/divider";

interface TaskCardAtrr {
  task: TaskProps;
  remove: (taskId: string) => void;
  handleOptions: (task: TaskProps) => void;
  style?: StyleProp<ViewStyle>;
}

export default function TaskCard({
  task,
  style,
  remove,
  handleOptions,
}: TaskCardAtrr) {
  function handleRemove() {
    ModalOpener$.next({
      name: "ALERT",
      extra: {
        type: "QUESTION",
        title: "Eliminar tarea",
        description: "Está acción no se puede deshacer.",
        onOk: () => remove(task?.taskId),
      },
    });
  }

  return (
    <Pressable style={[styles.card, style]} onPress={() => handleOptions(task)}>
      <VStack space={20}>
        <HStack style={styles.header}>
          <Text numberOfLines={2} style={styles.title}>
            {task?.title}
          </Text>
          <HStack space={5}>
            <View
              style={[
                styles.statusContainer,
                { backgroundColor: task?.status?.color },
              ]}
            >
              <Text style={styles.status}>{task?.status?.description}</Text>
            </View>
            <TouchableOpacity onPress={handleRemove}>
              <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
          </HStack>
          {/* </HStack> */}
        </HStack>
        <Text style={styles.description}>{task?.description}</Text>
      </VStack>
      <Divider />
      <Text style={[styles.description, { marginTop: 5 }]}>
        Creado por: {`${task?.createdBy?.name} ${task?.createdBy?.lastname}`}
      </Text>
      <Text style={[styles.description, { marginTop: 5 }]}>
        Fecha de creación: {format.date(new Date(task?.createdAt))}
      </Text>
    </Pressable>
  );
}
