import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { Day, Exercise } from "../types/types";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type WorkoutDetailsBoxProps = {
  exercises?: Exercise;
};

const WorkoutDetailsBox = ({ exercises }: WorkoutDetailsBoxProps) => {
  return (
    <View className="bg-[#000] rounded-lg p-3">
      <CustomText
        style={{
          fontSize: 16,
          fontFamily: "Montserrat-SemiBold",
          textTransform: "capitalize",
          color: "#fff"
        }}
      >
        {exercises?.name}
      </CustomText>
      <View className="flex-row gap-2">
        <FontAwesome6 name="dumbbell" size={16} color="#fff" />
        <CustomText
          style={{
            fontSize: 12,
            textTransform: "capitalize",
            color: "#fff"
          }}
        >
          {exercises?.equipmentRequired}
        </CustomText>
      </View>
      <View className="mt-3">
        {exercises?.sets.map((set, i) => (
          <View
            key={i}
            className="flex-row items-center justify-between rounded-md"
          >
            <View className="flex-row items-center">
              <Text className="w-14 font-semibold text-[#fff]">Set {i + 1}:</Text>
              <Text className="w-[70%] text-[#fff] font-semibold">
                {set.repetitions}
              </Text>
            </View>
            <Text className="text-[#fff]">{set.rest}s Rest</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WorkoutDetailsBox;
