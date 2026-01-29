import {
  View,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { AnimatedOrb } from "@/components/animated-orbs";
import useAuthSocial from "@/hooks/useSocialAuth";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
    const { handleSocialAuth, loadingStrategy } = useAuthSocial();

    const isLoading = loadingStrategy !== null;

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <AnimatedOrb
          colors={["#0E7490", "#CFFAFE"]}
          size={180}
          initialX={-50}
          initialY={height * 0.75}
          duration={4500}
        />
        <AnimatedOrb
          colors={["#CFFAFE", "#67E8F9"]}
          size={200}
          initialX={width * 0.3}
          initialY={height * 0.6}
          duration={3500}
        />
        <AnimatedOrb
          colors={["#0E7490", "#06B6D4"]}
          size={250}
          initialX={width - 100}
          initialY={height * 0.3}
          duration={5000}
        />
        <AnimatedOrb
          colors={["#06B6D4", "#67E8F9"]}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />

        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={70}
          tint="dark"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </View>

      <SafeAreaView className="flex-1">
        {/* Top Section - Branding */}
        <View className="items-center pt-10">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 250, height: 250, marginVertical: -40 }}
            contentFit="contain"
          />
        </View>

        {/* CENTER SECTION - HERO IMG */}
        <View className="flex-1 justify-start items-center px-6">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{
              width,
              height: height * 0.3,
            }}
            contentFit="contain"
          />

          {/* Headline */}
          <View className="mt-4 items-center">
            <Text className="text-5xl font-bold text-foreground text-center font-sans">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary font-mono">
              Seamlessly
            </Text>
          </View>

          {/* AUTH BUTTONS */}
          <View className="flex-row gap-4 mt-10">
            {/* GOOGLE BTN */}
            {(Platform.OS === "android" || Platform.OS === "web") && (
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Continue with Google"
                  onPress={() => !isLoading && handleSocialAuth("oauth_google")}
              >
                {loadingStrategy === "oauth_google" ? (
                  <ActivityIndicator size="small" color="#1a1a1a" />
                ) : (
                  <>
                    <Image
                      source={require("../../assets/images/google.png")}
                      style={{ width: 20, height: 20 }}
                      contentFit="contain"
                    />
                    <Text className="text-gray-900 font-semibold text-sm">
                      Google
                    </Text>
                  </>
                )}
              </Pressable>
            )}

            {/* APPLE BTN */}
            {Platform.OS === "ios" && (
              <Pressable
                className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Continue with Apple"
                onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
              >
                {loadingStrategy === "oauth_apple" ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                    <Text className="text-foreground font-semibold text-sm">
                      Apple
                    </Text>
                  </>
                )}
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
