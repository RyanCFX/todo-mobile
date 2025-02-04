import { StyleSheet } from "react-native";

import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { COLOR } from "@/constants";

export default StyleSheet.create({
  description: {
    fontSize: 16,
    fontFamily: "regular",
    textAlign: "center",
    color: COLOR.dark,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    marginBottom: 0,
    fontSize: 22,
    textAlign: "center",
    color: COLOR.dark,
    fontFamily: "bold",
  },
  lottieContainer: {
    width: WINDOW_WIDTH / 3.5,
    height: WINDOW_WIDTH / 3.5,
    borderRadius: WINDOW_WIDTH,
    alignSelf: "center",
    marginTop: -WINDOW_WIDTH / 5.5,
    marginBottom: 20,
  },
  asset: {
    alignSelf: "center",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: COLOR.dark,
  },
  button: {
    width: "50%",
    padding: 10,
    alignItems: "center",
  },
  firstButton: {
    borderRightColor: COLOR.dark,
    borderRightWidth: 1,
  },
  nopadding: {
    padding: 0,
  },
  question: {
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "semibold",
    color: COLOR.dark,
  },
});
