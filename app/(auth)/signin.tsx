import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "@/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import MeshBackground from "@/components/auth/meshBackground";

export default function SignInScreen({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, [step, fadeAnim, translateYAnim]);

  const handleEmailSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 900);
  };

  const handleOtpSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 900);
  };

  return (
    <View style={styles.container}>
      <MeshBackground />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <SafeAreaView style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardWrapper}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }],
              },
            ]}
          >
            {step === "email" ? (
              <>
                <Text style={styles.title}>Sign in</Text>
                <Text style={styles.subtitle}>
                  Enter your email to get started
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.secondaryText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    !(email && !loading) && styles.buttonDisabled,
                  ]}
                  onPress={handleEmailSubmit}
                  disabled={loading || !email}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Sending..." : "Continue"}
                  </Text>
                  <AntDesign
                    name="arrowright"
                    size={22}
                    color={COLORS.accent}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>
                  We sent a 6-digit code to{"\n"}
                  <Text style={styles.highlight}>{email}</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••"
                  placeholderTextColor={COLORS.secondaryText}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    otp.length < 6 && styles.buttonDisabled,
                  ]}
                  onPress={handleOtpSubmit}
                  disabled={loading || otp.length < 6}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Verifying..." : "Verify"}
                  </Text>
                  <AntDesign name="check" size={22} color={COLORS.accent} />
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    position: "relative",
    top: "20%",
    alignItems: "center",
  },
  keyboardWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.primaryText,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  highlight: {
    fontWeight: "600",
    color: COLORS.primaryText,
  },
  input: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.primaryText,
    marginBottom: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 6,
    alignSelf: "stretch",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.accent,
    fontSize: 17,
    fontWeight: "600",
    marginRight: 8,
    letterSpacing: 0.2,
  },
  error: {
    color: COLORS.error,
    marginBottom: 8,
    textAlign: "center",
    fontSize: 14,
  },
});
