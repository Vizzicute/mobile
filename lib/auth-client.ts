// lib/auth-client.ts or similar
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/auth`, // Your Express backend auth base URL
  plugins: [
    expoClient({
      scheme: "tell", // Define this scheme in your app.json
      storage: SecureStore,
    }),
  ],
});

// Export individual methods for convenience
export const { signIn, signUp, useSession, signOut } = authClient;
