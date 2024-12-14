import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetPlanByIdQuery } from "@/src/utils/planQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";

const PlanDetails = () => {
  const { id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError, error } = useGetPlanByIdQuery(singleId);

  const handleOnPress = (dayId: string) => {}

  if (isLoading) {
    return (
      <View className="flex-1 bg-backgroundColor justify-center items-center">
        <ActivityIndicator size={"large"} color={"#2A2A2A"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-backgroundColor justify-center items-center">
        <Text className="text-black">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-backgroundColor p-3">
      <View>
        {/* Plan name */}
        <CustomText
          style={{
            fontSize: 22,
            fontFamily: "Montserrat-Bold",
            textTransform: "capitalize",
          }}
        >
          {data?.name}
        </CustomText>

        {/* Difficulty Level */}
        <View className="bg-extrasColor rounded-md w-32 mt-2 py-2 justify-center items-center flex">
          <CustomText
            style={{
              fontSize: 12,
              textTransform: "capitalize",
              fontFamily: "Montserrat-SemiBold"
            }}
            numberOfLines={1}
          >
            {data?.difficultyLevel}
          </CustomText>
        </View>

        {/* Description */}
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="mt-4 leading-4">
          {data?.description}
        </Text>
      </View>

      {/* Workout Details */}
      <View className="mt-8">
        {data?.days.map((day) => (
          <Pressable
            onPress={() => handleOnPress(day._id)}
            key={day._id} 
            className="bg-primaryAccentColor rounded-md p-5"
          >
            <Text 
              style={{ fontFamily: "Montserrat-Bold" }} 
              className="capitalize text-xl"
            >
              {day.dayName}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({});
