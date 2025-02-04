// MÓDULOS LOCALES
import HStack from "@/src/components/hstack";
import { copyToClipboard, ModalOpener$ } from "@/src/utils/helpers";

// MÓDULOS EXTERNOS
import React, { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

// TIPOS
import { GroupProps } from "@/src/types";

// ESTILOS
import { styles } from "./styles";

// CONSTANTES
import { COLOR } from "@/constants";

interface GroupCardAtrr {
  group: GroupProps;
  remove: (groupId: string) => void;
  onPress: () => void;
}

export default function GroupCard({ group, onPress, remove }: GroupCardAtrr) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  async function copyCode() {
    setCopied(true);
    await copyToClipboard(group?.groupCode);
  }

  function handleRemove() {
    if (!group?.canRemove) {
      return ModalOpener$.next({
        name: "ALERT",
        extra: {
          type: "ERROR",
          title: "Oops...",
          description:
            "No puedes eliminar grupos sin ser administrador del mismo",
        },
      });
    }
    ModalOpener$.next({
      name: "ALERT",
      extra: {
        type: "QUESTION",
        title: "Eliminar grupo",
        description: "Está acción no se puede deshacer.",
        onOk: () => remove(group?.groupId),
      },
    });
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <HStack style={styles.header}>
        <TouchableOpacity onPress={copyCode}>
          <HStack
            space={10}
            style={[styles.left, copied && { backgroundColor: COLOR.opacity }]}
          >
            <Text style={styles.groupCode}>{group?.groupCode}</Text>
            <Feather name="copy" size={24} color="black" />
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRemove}
          style={[!group?.canRemove && { opacity: 0.5 }]}
        >
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
      </HStack>
      <Text style={styles.name}>{group?.name}</Text>
    </Pressable>
  );
}
