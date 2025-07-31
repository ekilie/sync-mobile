import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import SigningSection from "@/components/index/signing-section";
import { COLORS } from "@/utils/styles";
import MapComponent from "@/components/index/map-component";

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
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <SigningSection />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});