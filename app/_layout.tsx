import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0D0D0F" },
          }}
        >
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(tab)" options={{ animation: "fade" }} />
          <Stack.Screen
            name="new-chat"
            options={{
              animation: "slide_from_bottom",
              presentation: "modal",
              gestureEnabled: true,
            }}
        />
        </Stack>
        </>
  );
}
