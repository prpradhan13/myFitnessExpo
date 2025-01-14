import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/src/context/UserProvider";

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="cardDetatils/[name]" 
          options={{
            headerBackVisible: true,
            title: "",
            headerStyle: {
              backgroundColor: "#F7F6F2"
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="ExerciseDetails/[dayId]" 
          options={{
            headerBackVisible: true,
            title: "",
            headerStyle: {
              backgroundColor: "#F7F6F2"
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="planDetatils/[id]"
          options={{
            headerBackVisible: true,
            title: "",
            headerStyle: {
              backgroundColor: "#F7F6F2"
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
};

export default function MainScreenLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout />
      </UserProvider>
    </QueryClientProvider>
  )
};


