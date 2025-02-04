import { StyleSheet } from "react-native";

import { normalizeFontSize } from "@/src/utils/helpers";
import { COLOR } from "@/constants";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";

export default StyleSheet.create({
  title: {
    fontSize: 38,
    fontFamily: "bold",
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: "regular",
    textAlign: "right",
  },
  signup: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    // height: "90%",
    position: "relative",
    paddingTop: "10%",
  },
  signupText: {
    textAlign: "center",
  },
  illustration: {
    position: "absolute",
    width: WINDOW_WIDTH / 1.5,
    height: WINDOW_WIDTH / 1.5,
    borderWidth: 55,
    borderRadius: WINDOW_WIDTH,
    top: (WINDOW_WIDTH / 3) * -1,
    right: (WINDOW_WIDTH / 4) * -1,
    opacity: 0.1,
    borderColor: COLOR.primary,
  },
  bottom: {
    top: "auto",
    right: "auto",
    bottom: (WINDOW_WIDTH / 30) * -1,
    left: (WINDOW_WIDTH / 4) * -1,
  },
  logo: {
    width: 150,
    height: 60,
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    // resizeMode: "contain",
    // marginLeft: -25,
  },
});
