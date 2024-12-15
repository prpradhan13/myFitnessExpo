import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useGetPlanByIdQuery } from "@/src/utils/planQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";

const PlanDetails = () => {
  const { id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError, error } = useGetPlanByIdQuery(singleId);

  const handleOnPress = (dayId: string) => {
    router.push(`/(main)/ExerciseDetails/${dayId}`);
  };

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
    <SafeAreaView className="flex-1 bg-backgroundColor pt-5 px-3">
      <View>
        {/* Difficulty Level */}
        <View className="bg-extrasColor rounded-md w-32 mt-2 py-1 justify-center items-center flex">
          <CustomText
            style={{
              fontSize: 12,
              textTransform: "capitalize",
              fontFamily: "Montserrat-SemiBold",
            }}
            numberOfLines={1}
          >
            {data?.difficultyLevel}
          </CustomText>
        </View>

        {/* Plan name */}
        <CustomText
          style={{
            fontSize: 24,
            fontFamily: "Montserrat-Bold",
            textTransform: "capitalize",
            marginTop: 5
          }}
        >
          {data?.name}
        </CustomText>

        {/* Description */}
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="mt-3 leading-4"
        >
          {data?.description}
        </Text>
      </View>

      {/* Workout Details */}
      <View className="mt-8">
        {data?.days?.map((day) => (
          <Pressable
            onPress={() => handleOnPress(day._id)}
            key={day._id}
            className="bg-primaryAccentColor rounded-md p-5 mb-3"
          >
            <Text
              style={{ fontFamily: "Montserrat-Bold" }}
              className="capitalize text-xl"
            >
              {day.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PlanDetails;

const styles = StyleSheet.create({});
