import { COLOR } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  vertical: {
    width: 1,
    height: "100%",
    backgroundColor: COLOR.light,
  },
  horizontal: { width: "100%", height: 1, backgroundColor: COLOR.border },
});
