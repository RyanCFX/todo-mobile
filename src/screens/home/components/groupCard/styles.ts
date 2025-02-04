import { StyleSheet } from "react-native";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { COLOR } from "@/constants";

export const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    fontFamily: "medium",
    marginTop: 15,
  },
  groupCode: {
    fontSize: 16,
    fontFamily: "regular",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
  },
  left: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: COLOR.grayOpacify,
    borderRadius: 20,
  },
  card: {
    padding: 20,
    backgroundColor: COLOR.light,
    shadowColor: "#566573",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 30,
  },
});
