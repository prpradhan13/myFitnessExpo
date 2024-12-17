import { Button, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";
import MainCard from "@/src/components/MainCard";
import DifficultyLevel from "@/src/components/DifficultyLevel";
import { useAuth, useUser } from "@clerk/clerk-expo";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-backgroundColor pt-3">
      <CustomText
        style={{
          fontSize: 40,
          fontFamily: "Montserrat-SemiBold",
          paddingLeft: 12,
        }}
      >
        Welcome.
      </CustomText>

      {/* Popular Plans Cards */}
      <View className="mt-8 pl-3">
        <MainCard cardTitle="Popular" />
      </View>

      {/* Difficulty level */}
      <View className="mt-8 px-3">
        <DifficultyLevel />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
