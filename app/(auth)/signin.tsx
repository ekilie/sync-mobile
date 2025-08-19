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
// import AuthModal from "@/components/auth/modal";
import MeshBackground from "@/components/auth/meshBackground";

export default function SignInScreen({ onSuccess }: { onSuccess: () => void }) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
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
          style={{ flex: 1 }}
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
                <Text style={styles.title}>Sign in to continue</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.secondaryText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                {/* error display removed */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleEmailSubmit}
                  disabled={loading || !email}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>{loading ? "Sending..." : "Continue"}</Text>
                  <AntDesign name="arrowright" size={24} color={COLORS.accent} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>We sent a code to {email}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  placeholderTextColor={COLORS.secondaryText}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!loading}
                />
                {/* error display removed */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleOtpSubmit}
                  disabled={loading || otp.length < 6}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>{loading ? "Verifying..." : "Verify"}</Text>
                  <AntDesign name="check" size={24} color={COLORS.accent} />
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
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.primaryText,
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.primaryText,
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
    alignSelf: "stretch",
  },
  buttonText: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
  error: {
    color: COLORS.error,
    marginBottom: 8,
    textAlign: "center",
  },
});
