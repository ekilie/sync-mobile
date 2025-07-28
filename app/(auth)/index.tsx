import { useState } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/auth/button";
import AuthModal from "@/components/auth/modal";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="sync" size={48} color="#007AFF" />
          <Text style={styles.title}>Login to Sync</Text>
          <Text style={styles.subtitle}>
            sign your attendance with ease with sync app
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => setModalVisible(true)} />
          <AuthModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
});
