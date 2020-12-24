import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import SimpleAnimationScreen from "./src/screens/SimpleAnimationScreen";
import EventAnimationScreen from "./src/screens/EventAnimationScreen";
import ScrollAnimationScreen from "./src/screens/ScrollAnimationScreen";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import SliderAnimationScreen from "./src/screens/SliderAnimationScreen";
import AnimatedSimpleScreen from "./src/screens/AnimatedSimpleScreen";
import AnimatableSimpleScreen from "./src/screens/AnimatableSimpleScreen";
import { SvgAnimation } from "./src/screens/SvgAnimation";
import { enableScreens } from "react-native-screens";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import SharedElementScreen from "./src/screens/SharedElementScreen";
import SharedElementDetailsScreen from "./src/screens/SharedElementDetailsScreen";

enableScreens();

const data = [
  {
    type: "📱 Animated API",
  },
  {
    type: "🕹 Animatable API",
  },
  {
    type: "⏳ Shared Element",
  },
  {
    type: "🔥 Simple animation",
  },
  {
    type: "🌲 Event animation",
  },
  {
    type: "📜 Scrool animation",
  },
  {
    type: "🧨 Slider animation",
  },
  {
    type: "🎊 SVG Animation",
  },
];

export default function App() {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Animation examples 👀"} component={MainScreen} />
        <Stack.Screen
          name={"📱 Animated API"}
          component={AnimatedSimpleScreen}
        />
        <Stack.Screen
          name={"🕹 Animatable API"}
          component={AnimatableSimpleScreen}
        />
        <Stack.Screen
          name={"⏳ Shared Element"}
          component={SharedElementScreen}
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: "image" }];
          }}
          options={{
            animationEnabled: true,
            gestureEnabled: Platform.OS === "android",
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 250,
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 250,
                },
              },
            },
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name={"🔥 Simple animation"}
          component={SimpleAnimationScreen}
        />
        <Stack.Screen
          name={"🌲 Event animation"}
          component={EventAnimationScreen}
        />
        <Stack.Screen
          name={"📜 Scrool animation"}
          component={ScrollAnimationScreen}
        />
        <Stack.Screen
          name={"🧨 Slider animation"}
          component={SliderAnimationScreen}
        />
        <Stack.Screen name={"🎊 SVG Animation"} component={SvgAnimation} />
        <Stack.Screen name={"Details"} component={SharedElementDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

interface MainScreenProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

function MainScreen({ navigation }: MainScreenProps) {
  const _keyExtractor = (_item: object, index: number) => index.toString();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.item}
            key={index}
            onPress={() => navigation.navigate(item.type)}
          >
            <Text>{item.type}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  } as ViewStyle,
  separator: {
    height: 1,
    backgroundColor: "gray",
  } as ViewStyle,
});
