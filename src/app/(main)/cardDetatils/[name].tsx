import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";

const CardDetatils = () => {
  const { name } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-backgroundColor px-4">
      <CustomText
        style={{
          fontSize: 26,
          fontFamily: "Montserrat-Regular",
          textTransform: "capitalize",
        }}
      >
        {name}
      </CustomText>

      <View className="h-20 bg-secondaryAccentColor rounded-lg mt-5 px-3 justify-center">
        <CustomText
          style={{
            fontSize: 16,
            fontFamily: "Montserrat-SemiBold",
            textTransform: "capitalize",
          }}
        >
          Chest Day
        </CustomText>
      </View>
    </View>
  );
};

export default CardDetatils;
