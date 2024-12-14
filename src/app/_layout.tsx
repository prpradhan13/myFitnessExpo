import "../global.css";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require('@/src/assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-Bold": require('@/src/assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-SemiBold": require('@/src/assets/fonts/Montserrat-SemiBold.ttf'),
    "Montserrat-ExtraBold": require('@/src/assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading indicator while fonts load
  }

  return (
    <>
      <StatusBar
        style={'dark'}
        translucent={true} // Ensures content flows behind the status bar
        backgroundColor="transparent" // Removes solid background
      />
      <Stack screenOptions={{ headerShown: false }} />

      {/* CHange this in future after adding authentication */}
      <Redirect href="/(main)" />
    </>
  );
}
