// components/index/map-component.tsx
import React, { useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Animated, Easing } from "react-native";
import { COLORS } from "@/utils/styles";

interface MapComponentProps {
  onMapReady?: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapReady }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (onMapReady) onMapReady();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsCompass={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor="white"
        loadingBackgroundColor={COLORS.background}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;