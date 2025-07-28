import { View, Text, StyleSheet } from "react-native";
import useAuth from "@/utils/use-auth";
import Button from "@/components/auth/button";

const SigningSection = () => {
  const handleVerify = () => {
    console.log("location verified");
  };

  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
      <Button title="Verify & Sign" onPress={handleVerify} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    gap: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
});

export default SigningSection;
