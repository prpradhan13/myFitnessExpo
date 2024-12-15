import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown:false }}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="cardDetatils/[name]" />
        <Stack.Screen name="planDetatils/[id]" />
      </Stack>
    </>
  );
};

export default function MainScreenLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  )
};


