import { StyleSheet } from "react-native";

import { normalizeFontSize } from "@/src/utils/helpers";
import { COLOR } from "@/constants";

export default StyleSheet.create({
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
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
    color: COLOR.dark,
  },
});
