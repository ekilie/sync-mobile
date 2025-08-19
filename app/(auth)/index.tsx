import MeshBackground from "@/components/auth/meshBackground";
import AuthModal from "@/components/auth/modal";
import SignInScreen from "./signin";
import { COLORS } from "@/utils/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from 'expo-haptics';
import { HapticFeedback } from "@/lib/utils";



// App flow: onboarding -> sign in -> tabs
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
  }, [fadeAnim, translateYAnim]);


  // Onboarding screen
  return (
    <View style={styles.container}>
      <MeshBackground />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.content}>
        {/* Top icon animation */}
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

        {/* Bottom row */}
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTitleContainer}>
            <Text style={styles.title}>
              Effortless{"\n"}Attendance{"\n"}Anywhere
            </Text>
            <AuthModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              HapticFeedback();
              router.push("/(auth)/signin");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <AntDesign name="doubleright" size={28} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const BUTTON_SIZE = 72;

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
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  bottomTitleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: Platform.select({ ios: 36, android: 34 }),
    fontWeight: "400",
    color: COLORS.primaryText,
    lineHeight: 40,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.black || "black",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});
