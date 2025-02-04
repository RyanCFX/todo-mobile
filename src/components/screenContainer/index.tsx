// MÓDULOS DE REACT
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";

// MÓDULOS EXTERNOS
import { View as Animatable } from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// MÓDULOS LOCALES
import { COLOR, STYLE } from "@/constants";
import { ScreenContainerAtrr } from "@/src/types";

// ESTILOS
import styles from "./styles";

export default function ScreenContainer({
  children,
  safeArea,
  content,
  scroll,
  ...props
}: ScreenContainerAtrr) {
  const showHeader = () => {
    return (
      !!props?.onPressBack ||
      !!props?.title ||
      !!props?.subtitle ||
      !!props?.suffix
    );
  };

  if (!!safeArea) {
    return (
      <>
        <SafeAreaView
          style={[
            {
              flex: 0,
              zIndex: 1,
              backgroundColor: props?.statusBarColor || COLOR.light,
            },
            Platform.OS === "android" &&
              props?.headerType !== "PRIMARY" && {
                paddingTop: StatusBar.currentHeight,
              },
          ]}
        />
        <SafeAreaView
          style={[styles.keyboardAvoidingView, props?.containerStyle]}
        >
          <ScreenContainer scroll={scroll} content={content} {...props}>
            {children}
          </ScreenContainer>
        </SafeAreaView>
      </>
    );
  }

  if (content && !scroll) {
    return (
      <ScreenContainer {...props}>
        <View style={styles.contentContainer}>
          <Animatable
            useNativeDriver
            animation="slideInUp"
            delay={100}
            duration={1000}
          >
            <KeyboardAvoidingView
              style={[STYLE.boxShadow, styles.content, props?.bodyStyle]}
            >
              {children}
            </KeyboardAvoidingView>
          </Animatable>
        </View>
      </ScreenContainer>
    );
  }

  if (content) {
    return (
      <ScreenContainer {...props}>
        <View style={styles.contentContainer}>
          <Animatable
            useNativeDriver
            animation="slideInUp"
            delay={100}
            duration={1000}
          >
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={!!scroll}
              style={[STYLE.boxShadow, styles.content, props?.bodyStyle]}
              refreshControl={props?.refreshControl}
            >
              {children}
            </KeyboardAwareScrollView>
          </Animatable>
        </View>
      </ScreenContainer>
    );
  }

  if (scroll && !content) {
    return (
      <ScreenContainer {...props}>
        <KeyboardAwareScrollView
          style={[styles.keyboardAvoidingView, props?.bodyStyle]}
          showsVerticalScrollIndicator={false}
          refreshControl={props?.refreshControl}
        >
          {children}
        </KeyboardAwareScrollView>
      </ScreenContainer>
    );
  }

  return (
    <View
      {...props}
      style={[styles.keyboardAvoidingView, props?.containerStyle]}
    >
      <StatusBar
        translucent
        barStyle={props?.barStyle || "dark-content"}
        backgroundColor={props?.statusBarColor || COLOR.primary}
        {...props?.statusBar}
      />
      {/* <RenderIf condition={!props?.hideHeader && showHeader()}>
        <Header title={props?.title} />
      </RenderIf> */}

      <View
        style={[
          props?.bodyStyle,
          !!props?.padding && { paddingHorizontal: 20 },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
