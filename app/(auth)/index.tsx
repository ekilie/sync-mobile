import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/auth/button";
import AuthModal from "@/components/auth/modal";
import { COLORS } from "@/utils/styles";


export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleOpenModal} />
          <AuthModal visible={isModalVisible} onClose={handleCloseModal} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <StatusBar barStyle="dark-content" />
      <Ionicons name="sync" size={48} color={COLORS.icon} />
      <Text style={styles.title}>Login to Sync</Text>
      <Text style={styles.subtitle}>
        Sign your attendance with ease with Sync App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: Platform.select({ ios: 28, android: 26 }),
    fontWeight: "600",
    color: COLORS.primaryText,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
});
