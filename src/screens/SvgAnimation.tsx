import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function SvgAnimation() {
  const radius = useSharedValue(50);

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `
    M 100, 100
    m -${radius.value}, 0
    a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
    a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
    `;
    return {
      d: path,
    };
  });

  // attach animated props to an SVG path using animatedProps
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Svg>
        <AnimatedPath animatedProps={animatedProps} fill="black" />
      </Svg>
      <View style={{ position: "absolute" }}>
        <Button
          title={"Increase"}
          onPress={() =>
            (radius.value = withTiming(80, {
              duration: 1000,
              easing: Easing.linear,
            }))
          }
        />
      </View>
    </View>
  );
}
