import React, { useRef, useEffect } from "react";
import { Text, StyleSheet, Animated, Easing, View } from "react-native";
import { BlurView } from "expo-blur";
import useAuth from "@/utils/use-auth";
import Button from "@/components/auth/button";
import { COLORS } from "@/utils/styles";
import { User } from "@/types/interface";
import { QuickActionsCard } from "@/components/settings";
import { Feather } from "@expo/vector-icons";

const SigningSection: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth() as { user?: User };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleVerify = () => {
    console.log("Verifying location and signing attendance");
    // TODO: Add actual verification logic
  };

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <BlurView intensity={50} tint="light" style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome,{" "}
          <Text style={styles.userName}>{user?.name || "User"}</Text>
        </Text>

        <Button
          title="Verify & Sign"
          onPress={handleVerify}
          style={styles.button}
          leftIcon={<Feather name="check-circle" size={18} color="#fff" />}
          gradient={["#007AFF", "#0051A8"]}
        />

        <QuickActionsCard />
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    alignItems: "center",
    gap: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.secondaryText,
    textAlign: "center",
  },
  userName: {
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  button: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 14,
  },
});

export default SigningSection;
