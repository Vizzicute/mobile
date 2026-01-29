// import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
    //   const { isSignedIn, isLoaded } = useAuth();
    const isSignedIn = false;
    const isLoaded = true;

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href="../(tab)/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
