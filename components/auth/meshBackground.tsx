import React from "react";
import {
  Canvas,
  Circle,
  RadialGradient,
  vec,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { COLORS } from "@/utils/styles";

const { width, height } = Dimensions.get("window");

export default function MeshBackground() {
  return (
    <Canvas style={{ position: "absolute", width, height }}>
      <Circle c={vec(width * 0.25, height * 0.38)} r={220}>
        <RadialGradient
          c={vec(width * 0.25, height * 0.38)}
          r={220}
          colors={[`${COLORS.white}55`, COLORS.transparent]}
        />
      </Circle>

      <Circle c={vec(width * 0.7, height * 0.22)} r={170}>
        <RadialGradient
          c={vec(width * 0.7, height * 0.22)}
          r={170}
          colors={[`${COLORS.accent}44`, COLORS.transparent]}
        />
      </Circle>

      <Circle c={vec(width * 0.8, height * 0.7)} r={140}>
        <RadialGradient
          c={vec(width * 0.8, height * 0.7)}
          r={140}
          colors={[`${COLORS.success}33`, COLORS.transparent]}
        />
      </Circle>

      <Circle c={vec(width * 0.18, height * 0.8)} r={120}>
        <RadialGradient
          c={vec(width * 0.18, height * 0.8)}
          r={120}
          colors={[`${COLORS.warning}33`, COLORS.transparent]}
        />
      </Circle>

      <Circle c={vec(width * 0.6, height * 0.5)} r={200}>
        <RadialGradient
          c={vec(width * 0.6, height * 0.5)}
          r={200}
          colors={[`${COLORS.inactive}22`, COLORS.transparent]}
        />
      </Circle>

      <Circle c={vec(width * 0.5, height * 0.85)} r={260}>
        <RadialGradient
          c={vec(width * 0.5, height * 0.85)}
          r={260}
          colors={[`${COLORS.black}10`, COLORS.transparent]}
        />
      </Circle>
    </Canvas>
  );
}
