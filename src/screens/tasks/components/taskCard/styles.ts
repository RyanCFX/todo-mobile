import { StyleSheet } from "react-native";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { COLOR } from "@/constants";

export const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    fontFamily: "regular",
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    width: "100%",
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
  statusContainer: {
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  status: {
    color: COLOR.light,
    fontSize: 13,
    fontFamily: "medium",
  },
});
