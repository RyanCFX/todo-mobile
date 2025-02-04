import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

export const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    fontFamily: "semibold",
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "medium",
    textAlign: "center",
  },
  header: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    textAlign: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
