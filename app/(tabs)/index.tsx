import MapComponent from "@/components/index/map-component";
import SigningSection from "@/components/index/signing-section";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <MapComponent />
      <SigningSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
