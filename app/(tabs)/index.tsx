import MapComponent from "@/components/index/map-component";
import SigningSection from "@/components/index/signing-section";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [isMapReady, setMapReady] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isMapReady) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [isMapReady]);

  return (
    <View style={styles.container}>
      <MapComponent onMapReady={() => setMapReady(true)} />

      {isMapReady && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: 10,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <SigningSection />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
