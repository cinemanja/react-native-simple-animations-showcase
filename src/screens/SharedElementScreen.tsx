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
  Button,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export default function SharedElementScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <SharedElement id="image">
        <Image
          source={require("./vega.png")}
          style={{ width: 200, height: 200 }}
        />
      </SharedElement>
      <Button
        title={"Check the details"}
        onPress={() => navigation.navigate("Details")}
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
  text: {
    fontSize: 40,
    fontWeight: "500",
  } as TextStyle,
});
