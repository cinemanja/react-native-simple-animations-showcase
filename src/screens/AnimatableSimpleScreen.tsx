import { StatusBar } from "expo-status-bar";
import React from "react";
import * as Animatable from "react-native-animatable";
import { StyleSheet, View, ViewStyle } from "react-native";

export default function AnimatableSimpleScreen() {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"flipInX"}
        style={[styles.box, { backgroundColor: "blue" }]}
        delay={500}
      />
      <Animatable.View
        animation={"fadeInRight"}
        style={[styles.box, { backgroundColor: "red" }]}
        delay={500}
      />
      <Animatable.View
        animation={"bounceInLeft"}
        style={[styles.box, { backgroundColor: "orange" }]}
        delay={500}
      />
      <Animatable.View
        animation={"zoomInUp"}
        style={[styles.box, { backgroundColor: "green" }]}
        delay={500}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "blue",
  } as ViewStyle,
});
