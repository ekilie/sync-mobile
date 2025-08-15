// components/MeshBackground.tsx
import React from "react";
import { Canvas, Circle, RadialGradient, vec } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { COLORS } from "@/utils/styles";

const { width, height } = Dimensions.get("window");

export default function MeshBackground() {
  return (
    <Canvas style={{ position: "absolute", width, height }}>
      {/* Soft white blob */}
      <Circle c={vec(width * 0.3, height * 0.4)} r={220}>
        <RadialGradient
          c={vec(width * 0.3, height * 0.4)}
          r={220}
          colors={[`${COLORS.white}33`, COLORS.transparent]}
        />
      </Circle>

      {/* Light grey blob */}
      <Circle c={vec(width * 0.75, height * 0.3)} r={200}>
        <RadialGradient
          c={vec(width * 0.75, height * 0.3)}
          r={200}
          colors={[`${COLORS.inactive}33`, COLORS.transparent]}
        />
      </Circle>

      {/* Soft black blob */}
      <Circle c={vec(width * 0.5, height * 0.75)} r={260}>
        <RadialGradient
          c={vec(width * 0.5, height * 0.75)}
          r={260}
          colors={[`${COLORS.black}33`, COLORS.transparent]} // 20% opacity black
        />
      </Circle>
    </Canvas>
  );
}
