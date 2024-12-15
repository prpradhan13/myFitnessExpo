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

  const { data, isLoading, isError, error } =
    useGetDayExercisesByDayId(singleId);
  // console.log(data?.exercises);

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
      <CustomText
        style={{
          fontSize: 26,
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
        renderItem={({ item }) => <WorkoutDetailsBox exercises={item} />}
      />
    </SafeAreaView>
  );
};

export default DayExerciseDetails;

const styles = StyleSheet.create({});
