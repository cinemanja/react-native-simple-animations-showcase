import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  Text,
  TextStyle,
  Easing,
} from "react-native";

export default function AnimatedSimpleScreen() {
  const timing = React.useRef(new Animated.Value(0)).current;
  const spring = React.useRef(new Animated.Value(0)).current;

  const animatedStyles = () => {
    const value = Math.random() * 255;
    Animated.parallel([
      Animated.timing(timing, {
        toValue: value,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.cubic,
      }),
      Animated.spring(spring, {
        toValue: value,
        useNativeDriver: true,
        bounciness: 20,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: timing }] }]}
      >
        <Text style={styles.text}>timing</Text>
      </Animated.View>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: spring }] }]}
      >
        <Text style={styles.text}>spring</Text>
      </Animated.View>
      <Button onPress={animatedStyles} title="Move" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "blue",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  text: {
    color: "white",
  } as TextStyle,
});
