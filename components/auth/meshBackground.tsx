import React from "react";
import { Canvas, Circle, RadialGradient, vec } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function MeshBackground() {
  return (
    <Canvas style={{ position: "absolute", width, height }}>
      {/* Large soft white circle */}
      <Circle c={vec(width * 0.3, height * 0.4)} r={200}>
        <RadialGradient
          c={vec(width * 0.3, height * 0.4)}
          r={200}
          colors={["rgba(255,255,255,0.25)", "transparent"]}
        />
      </Circle>

      {/* Grey gradient blob */}
      <Circle c={vec(width * 0.7, height * 0.3)} r={180}>
        <RadialGradient
          c={vec(width * 0.7, height * 0.3)}
          r={180}
          colors={["rgba(200,200,200,0.2)", "transparent"]}
        />
      </Circle>

      {/* Black fade blob */}
      <Circle c={vec(width * 0.5, height * 0.75)} r={250}>
        <RadialGradient
          c={vec(width * 0.5, height * 0.75)}
          r={250}
          colors={["rgba(0,0,0,0.3)", "transparent"]}
        />
      </Circle>
    </Canvas>
  );
}
