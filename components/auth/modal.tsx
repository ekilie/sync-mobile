import { COLORS } from "@/utils/styles";
import useAuth from "@/utils/use-auth";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal = ({ visible, onClose }: AuthModalProps) => {
  const [userID, setUserID] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState<"userid" | "otp">("userid");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserIDSubmit = async () => {
    if (!userID.trim()) return;
    setIsLoading(true);
    // TODO:Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("otp");
    }, 1000);
  };

  const handleOTPSubmit = async () => {
    if (!otp.trim()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      useAuth.getState().login({
        id: "john-doe",
        email: "john.doe@example.com",
        name: "John Doe",
      });

      setIsLoading(false);
      onClose();
      // No manual navigation; layout will handle redirect based on auth state
    }, 1000);
  };

  const handleBack = () => {
    setCurrentStep("userid");
    setOtp("");
  };

  const resetAndClose = () => {
    setCurrentStep("userid");
    setUserID("");
    setOtp("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={resetAndClose}
      style={{
        margin: 0,
        height: "100%",
        justifyContent: "flex-end",
      }}
      
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={resetAndClose}
            >
              <EvilIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Login</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              {currentStep === "userid" ? (
                <>
                  {/* User ID Step */}
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="person-circle-outline"
                      size={80}
                      color="#000000ff"
                    />
                  </View>

                  <Text style={styles.title}>Enter Your User ID</Text>
                  <Text style={styles.subtitle}>
                    you will recieve a verification code to authenticate your
                    request
                  </Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>User ID</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your user ID"
                      value={userID}
                      onChangeText={setUserID}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      onSubmitEditing={handleUserIDSubmit}
                      editable={!isLoading}
                    />
                  </View>
                </>
              ) : (
                <>
                  {/* OTP Step */}
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={80}
                      color="#000000ff"
                    />
                  </View>

                  <Text style={styles.title}>Verify Your Identity</Text>
                  <Text style={styles.subtitle}>
                    Enter the verification code sent to your registered device
                  </Text>

                  <View style={styles.userIdDisplay}>
                    <Text style={styles.userIdLabel}>User ID:</Text>
                    <Text style={styles.userIdValue}>{userID}</Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Verification Code</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                      returnKeyType="send"
                      onSubmitEditing={handleOTPSubmit}
                      maxLength={6}
                      editable={!isLoading}
                    />
                  </View>

                  <TouchableOpacity style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                      Didn&apos;t receive the code?
                      <Text style={styles.resendLink}>Resend</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>

          {/* Bottom Actions */}
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              {currentStep === "otp" && (
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={handleBack}
                  disabled={isLoading}
                >
                  <Ionicons name="chevron-back" size={20} color="#000000ff" />
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  currentStep === "otp" && styles.fullWidthButton,
                  (isLoading ||
                    (currentStep === "userid" && !userID.trim()) ||
                    (currentStep === "otp" && !otp.trim())) &&
                    styles.disabledButton,
                ]}
                onPress={
                  currentStep === "userid"
                    ? handleUserIDSubmit
                    : handleOTPSubmit
                }
                disabled={
                  isLoading ||
                  (currentStep === "userid" && !userID.trim()) ||
                  (currentStep === "otp" && !otp.trim())
                }
              >
                {isLoading ? (
                  <Text style={styles.primaryButtonText}>Loading...</Text>
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>
                      {currentStep === "userid" ? "Continue" : "Verify & Login"}
                    </Text>
                    <Ionicons
                      name={
                        currentStep === "userid"
                          ? "chevron-forward"
                          : "checkmark"
                      }
                      size={20}
                      color="#fff"
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 2,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  userIdDisplay: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userIdLabel: {
    fontSize: 16,
    color: "#6b7280",
    marginRight: 8,
  },
  userIdValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderColor: "#d1d5db",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#1a1a1a",
  },
  resendContainer: {
    marginTop: 16,
  },
  resendText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  resendLink: {
    color: "#000000ff",
    fontWeight: "600",
  },
  bottomContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: "#000000ff",
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#000000ff",
  },
  fullWidthButton: {
    flex: 2,
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#000000ff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default AuthModal;
