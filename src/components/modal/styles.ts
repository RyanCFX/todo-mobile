import { StyleSheet } from "react-native";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";

import { COLOR } from "@/constants";

export default StyleSheet.create({
  modal: {
    flex: 1,
  },
  closeBackground: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    top: 0,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WINDOW_WIDTH - 40,
    padding: 20,
    // backgroundColor: getColor("light"),
    borderRadius: 15,
    backgroundColor: COLOR.light,
  },
  title: {
    marginBottom: 0,
    textAlign: "center",
    width: "100%",
    color: COLOR.dark,
  },
  divider: {
    backgroundColor: COLOR.text,
    marginVertical: 15,
  },
});
