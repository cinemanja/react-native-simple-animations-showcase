import { StatusBar } from "expo-status-bar";
import React from "react";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Text,
  TextStyle,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export default function SharedElementDetailsScreen() {
  return (
    <View style={styles.container}>
      <SharedElement id="image">
        <Image
          source={require("./vega.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </SharedElement>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E24B1B",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
});
