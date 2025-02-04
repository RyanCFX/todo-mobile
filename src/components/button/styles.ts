import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants";

export const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
  },
  border: {
    borderWidth: 2,
    borderColor: COLOR.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  center: {
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  preffix: {
    position: "absolute",
    left: 5,
  },
  text: {
    fontFamily: "semibold",
    fontSize: 15,
  },
  suffix: {
    position: "absolute",
    right: 5,
  },
});
