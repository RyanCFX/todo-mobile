import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

export const styles = StyleSheet.create({
  welcome: {
    fontSize: 16,
    fontFamily: "semibold",
  },
  name: {
    fontSize: 26,
    fontFamily: "medium",
  },
  completed: {
    fontSize: 15,
    fontFamily: "regular",
  },
  header: {
    padding: 10,
    alignItems: "flex-start",
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
  left: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: COLOR.grayOpacify,
    borderRadius: 20,
  },
  groupCode: {
    fontSize: 16,
    fontFamily: "regular",
  },
  topHeader: {
    minWidth: "100%",
    alignItems: "center",
  },
});
