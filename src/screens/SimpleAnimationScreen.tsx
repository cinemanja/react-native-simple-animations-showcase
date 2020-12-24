import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SimpleAnimationScreen() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button
        onPress={() => {
          offset.value = withSpring(Math.random());
        }}
        title="Move"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "blue",
  } as ViewStyle,
});
