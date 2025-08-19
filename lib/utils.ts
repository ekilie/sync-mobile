import {jwtDecode} from "jwt-decode";
import { Vibration } from "react-native";

type JwtPayload = {
  exp: number; // expiration time in seconds
  [key: string]: any;
};

type HapticFeedbackType = "light" | "medium" | "heavy";

/**
 * Check if the jwt token is expired
 * @param token string
 * @returns True if the token has expired
 */
export function isJwtExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) return true; // if no exp, i assume expired

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
  } catch (_e) {
    return true; // if decoding fails, i treat it as expired
  }
}

export function HapticFeedback(type: HapticFeedbackType = "light") {
   switch (type) {
     case "light":
       Vibration.vibrate(5);
       break;
     case "medium":
       Vibration.vibrate(30);
       break;
     case "heavy":
       Vibration.vibrate(40);
       break;
   }
}