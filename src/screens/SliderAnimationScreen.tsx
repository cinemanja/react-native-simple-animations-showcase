import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  PerpectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  StyleSheet,
  TextInput,
  TextStyle,
  TransformsStyle,
  TranslateXTransform,
  TranslateYTransform,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { withAnchorPoint } from "react-native-anchor-point";
// @ts-ignore
const AnimatedText = ({ text }) => {
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      animatedProps={animatedProps}
    />
  );
};

export default function SliderAnimationScreen() {
  const positiveWidth = useSharedValue(150);
  const textValue = useSharedValue("150");
  const testText = useDerivedValue(() => {
    const step = Math.round(positiveWidth.value / 10).toString();

    return String(step);
  });
  const stepText = useDerivedValue(() => {
    const step = Math.round(positiveWidth.value / 10).toString();

    return String(step);
  });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const angle = useSharedValue(0);

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: positiveWidth.value,
    };
  });

  const props = useAnimatedProps(() => {
    return {
      text: `${stepText.value}`,
    };
  });

  const topWidthStyle = useAnimatedStyle(() => {
    return {
      width: positiveWidth.value,
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // @ts-ignore
      context.positiveWidth = positiveWidth.value;
    },
    onActive: (event, context) => {
      // @ts-ignore
      const checkSum = context.positiveWidth + event.translationX;
      if (
        (checkSum <= 200 && checkSum >= 0) ||
        (event.x < 0 && checkSum >= 0)
      ) {
        positiveWidth.value = checkSum;
        textValue.value = Math.round(positiveWidth.value / 10).toString();
        angle.value = withSpring(
          interpolate(
            event.velocityX,
            [-100, 0, 100],
            [70, 0, -70],
            Extrapolate.CLAMP
          )
        );
      }
    },
    onEnd: (event, context) => {
      angle.value = withSpring(0, { velocity: event.velocityX });
    },
  });

  // Rotate around bottom side of the element/baloon x = 0.5, y = 1;
  const transformObject = useAnimatedStyle(() => {
    const x = 0.5;
    const y = 1;
    const width = 30; // width of the baloon container
    const height = 60; // height of the baloon container

    let transform: TransformsStyle = {
      transform: [{ rotate: angle.value.toString().concat("deg") }],
    };
    let injectedTransform = transform.transform;
    if (!injectedTransform) {
      return transform;
    }

    if (x !== 0.5 && width) {
      const shiftTranslateX: (
        | PerpectiveTransform
        | RotateTransform
        | RotateXTransform
        | RotateYTransform
        | RotateZTransform
        | ScaleTransform
        | ScaleXTransform
        | ScaleYTransform
        | TranslateXTransform
        | TranslateYTransform
        | SkewXTransform
        | SkewYTransform
      )[] = [];

      // shift before rotation
      shiftTranslateX.push({
        translateX: width * (x - 0.5),
      });
      // @ts-ignore
      injectedTransform = shiftTranslateX.concat(injectedTransform);
      // shift after rotation
      injectedTransform.push({
        translateX: width * (0.5 - x),
      });
    }

    if (!Array.isArray(injectedTransform)) {
      return { transform: injectedTransform };
    }
    // @ts-ignore
    if (y !== 0.5 && height) {
      let shiftTranslateY: (
        | PerpectiveTransform
        | RotateTransform
        | RotateXTransform
        | RotateYTransform
        | RotateZTransform
        | ScaleTransform
        | ScaleXTransform
        | ScaleYTransform
        | TranslateXTransform
        | TranslateYTransform
        | SkewXTransform
        | SkewYTransform
      )[] = [];
      // shift before rotation
      shiftTranslateY.push({
        translateY: height * (y - 0.5),
      }); // @ts-ignore
      injectedTransform = shiftTranslateY.concat(injectedTransform);
      // // shift after rotation
      injectedTransform.push({
        translateY: height * (0.5 - y),
      });
    }

    return { transform: injectedTransform };
  });

  const tranformStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: angle.value.toString().concat("deg") }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.topPart}>
          <Animated.View style={[topWidthStyle]} />
          <Animated.View style={[styles.baloonContainer, transformObject]}>
            <View style={styles.baloon}>
              <AnimatedTextInput
                style={styles.text}
                defaultValue={stepText.value}
                editable={false}
                animatedProps={props}
                underlineColorAndroid={"transparent"}
              />
            </View>
            <View style={styles.baloonEnd} />
          </Animated.View>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.negativeSlider} />
          <Animated.View style={[styles.positiveSlider, widthStyle]} />
          <PanGestureHandler
            onGestureEvent={eventHandler}
            hitSlop={{ left: 30, right: 30, top: 30, bottom: 30 }}
          >
            <Animated.View style={styles.circle} />
          </PanGestureHandler>
        </View>
      </View>
      <AnimatedText text={stepText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  center: {
    width: 200,
  } as ViewStyle,
  topPart: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  bottomPart: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  positiveSlider: {
    backgroundColor: "blue",
    height: 4,
  } as ViewStyle,
  negativeSlider: {
    width: 200,
    position: "absolute",
    height: 4,
    backgroundColor: "yellow",
  } as ViewStyle,
  circle: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "blue",
    marginLeft: -10,
  } as ViewStyle,
  baloonContainer: {
    marginLeft: -15,
    marginBottom: 5,
    alignItems: "center",
  } as ViewStyle,
  text: {
    color: "white",
  } as TextStyle,
  baloonEnd: {
    height: 10,
    width: 4,
    backgroundColor: "blue",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  } as ViewStyle,
  baloon: {
    backgroundColor: "blue",
    width: 30,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});
