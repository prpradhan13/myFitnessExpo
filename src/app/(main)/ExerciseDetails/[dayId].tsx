import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetDayExercisesByDayId } from "@/src/utils/planQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";
import WorkoutDetailsBox from "@/src/components/WorkoutDetailsBox";

const DayExerciseDetails = () => {
  const { dayId } = useLocalSearchParams();
  const singleId = Array.isArray(dayId) ? dayId[0] : dayId;

  const { data, isLoading, isError, error } = useGetDayExercisesByDayId(singleId);

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
    <View className="flex-1 bg-backgroundColor px-4">
      <CustomText
        style={{
          fontSize: 16,
          fontFamily: "Montserrat-SemiBold",
          textTransform: "capitalize",
        }}
      >
        {data?.name}
      </CustomText>

      <FlatList 
        data={data?.exercises}
        keyExtractor={elem => elem._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          gap: 10,
        }}
        renderItem={({ item }) => <WorkoutDetailsBox exercises={item} />}
      />
    </View>
  );
};

export default DayExerciseDetails;
