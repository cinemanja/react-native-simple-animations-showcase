import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function EventAnimationScreen() {
  const start = 0;
  const pressed = useSharedValue(false);
  const x = useSharedValue(start);
  const y = useSharedValue(start);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      pressed.value = true;
    },
    onActive: (event, context) => {
      x.value = withSpring(event.translationX);
      y.value = withSpring(event.translationY);
    },
    onEnd: (event, context) => {
      pressed.value = false;
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "#FEEF86" : "#001972",
      transform: [
        { translateX: x.value },
        {
          translateY: y.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.box, uas]} />
      </PanGestureHandler>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "blue",
  } as ViewStyle,
});
