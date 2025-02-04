// MÓDULOS DE REACT
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

// MÓDULOS EXTERNOS
import { LinearGradient } from "expo-linear-gradient";

// MÓDULOS LOCALES
import { COLOR } from "@/constants";

interface SkeletonAtrr {
  width: number;
  height: number;
  borderRadius: number;
}

export default function Skeleton({
  width,
  height,
  borderRadius,
}: SkeletonAtrr) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación infinita de izquierda a derecha
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  // Interpolación para mover el gradiente de izquierda a derecha
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          // colors={["#e0e0e0", "#c0c0c0", "#e0e0e0"]}
          colors={[COLOR.border, "#b2babb", COLOR.border]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.border,
    overflow: "hidden",
  },
});
