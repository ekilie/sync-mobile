import {jwtDecode} from "jwt-decode";

type JwtPayload = {
  exp: number; // expiration time in seconds
  [key: string]: any;
};


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