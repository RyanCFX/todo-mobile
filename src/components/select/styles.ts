import { StyleSheet } from "react-native";

// MODULOS LOCALES
import { normalizeFontSize } from "@/src/utils/helpers";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { COLOR } from "@/constants";

export default StyleSheet.create({
  content: {
    height: "100%",
  },
  title: {
    fontSize: normalizeFontSize(20),
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    height: "100%",
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "regular",
    color: COLOR.dark,
  },
  disabled: {
    opacity: 0.5,
  },
  error: {
    borderWidth: 1.3,
    borderColor: COLOR.error,
  },
  label: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLOR.text,
    marginBottom: 5,
  },
  alert: {
    marginTop: 5,
    marginBottom: 0,
  },
  filterText: {
    fontSize: normalizeFontSize(16),
    fontFamily: "regular",
    color: COLOR.light,
  },
  modalLabel: {
    fontSize: 16,
    fontFamily: "regular",
  },
  selected: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.border,
  },
  selectButton: { padding: 15, width: "90%" },
  modalCloseButton: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
