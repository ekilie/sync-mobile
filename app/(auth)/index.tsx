import Button from "@/components/auth/button";
import AuthModal from "@/components/auth/modal";
import { COLORS } from "@/utils/styles";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, []);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          <Ionicons
            name="sync"
            size={48}
            color={COLORS.icon}
            style={styles.icon}
          />
        </Animated.View>

        <View style={styles.buttonContainer}>
          <View style={styles.bottomTitleContainer}>
            <Text style={styles.title}>Login to Sync</Text>
            <AuthModal visible={isModalVisible} onClose={handleCloseModal} />
          </View>
          <TouchableOpacity onPress={handleOpenModal} style={styles.button}>
            <Text style={styles.buttonText}>{">>"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    display: "flex",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 48,
    marginTop: 24,
  },
  icon: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: Platform.select({ ios: 28, android: 26 }),
    fontWeight: "700",
    color: COLORS.primaryText,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "85%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  bottomTitleContainer: {
    flex: 2,
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
