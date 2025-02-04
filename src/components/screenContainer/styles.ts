import { StyleSheet } from "react-native";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";

import { COLOR } from "@/constants";

export default StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    minWidth: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    backgroundColor: COLOR.light,
  },
  contentContainer: {
    width: "100%",
    justifyContent: "center",
    padding: "8%",
    flexDirection: "row",
  },
  content: {
    minWidth: "100%",
    padding: 20,
    backgroundColor: COLOR.light,
    borderRadius: 20,
    marginTop: "10%",
    maxHeight: WINDOW_HEIGHT - 200,
  },
});
