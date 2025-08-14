import useAuth from "@/utils/use-auth";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <Toast />
    </>
  );
}
