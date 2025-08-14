import React, { useRef, useEffect } from "react";
import { Text, StyleSheet, Animated, Easing } from "react-native";
import useAuth from "@/utils/use-auth";
import Button from "@/components/auth/button";
import { COLORS } from "@/utils/styles";
import { User } from "@/types/interface";
import { QuickActionsCard } from "@/components/settings";

const SigningSection: React.FC = () => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { user } = useAuth() as { user?: User };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleVerify = () => {
    console.log("Verifying location and signing attendance");
    //TODO: Add actual verification logic here
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.welcomeText}>
        Welcome, <Text style={styles.userName}>{user?.name || "User"}</Text>
      </Text>

      <Button
        title="Verify & Sign"
        onPress={handleVerify}
        // style={styles.button}
      />

      <QuickActionsCard />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 20,
    alignItems: "center",
    gap: 24,
  },
  welcomeText: {
    fontSize: 24,
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
    maxWidth: 300,
  },
});

export default SigningSection;
