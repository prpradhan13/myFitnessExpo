import "../global.css";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { ClerkProvider, ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@/src/utils/cache";

const Layout = () => {
  const { isSignedIn, isLoaded} = useUser()

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("@/src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("@/src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("@/src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-ExtraBold": require("@/src/assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading indicator while fonts load
  }

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style={"dark"}
        translucent={true} // Ensures content flows behind the status bar
        backgroundColor="transparent" // Removes solid background
      />
      <Stack screenOptions={{ headerShown: false }} />

      {!isSignedIn ? <Redirect href="/(auth)" /> : <Redirect href="/(main)" />}
    </>
  );
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Layout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
