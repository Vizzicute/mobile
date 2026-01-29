import { useState } from "react";
import { Alert } from "react-native";
import { signIn } from "../lib/auth-client"; // adjust the path

type Strategy = "oauth_google" | "oauth_apple";

function useAuthSocial() {
  const [loadingStrategy, setLoadingStrategy] = useState<Strategy | null>(null);

  const handleSocialAuth = async (strategy: Strategy) => {
    if (loadingStrategy) return;
    setLoadingStrategy(strategy);

    const provider = strategy === "oauth_google" ? "google" : "apple";

    try {
      // ✅ Use the correct method
      await signIn.social({ provider });

      // Session is automatically updated by better-auth
      Alert.alert("Success", `Signed in with ${provider}!`);
    } catch (error: any) {
      console.log("💥 Social auth error:", error);
      const providerName = provider === "google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to sign in with ${providerName}.`);
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
}

export default useAuthSocial;
