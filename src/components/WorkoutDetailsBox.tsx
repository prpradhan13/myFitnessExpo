import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../utils/CustomText';
import { Day, Exercise } from '../types/types';

type WorkoutDetailsBoxProps = {
    exercises?: Exercise;
};

const WorkoutDetailsBox = ({ exercises }: WorkoutDetailsBoxProps) => {
    
  return (
          <View className="mt-3 bg-[#D4F6FF] rounded-lg p-3">
            <CustomText
              style={{
                fontSize: 22,
                fontFamily: "Montserrat-Bold",
                textTransform: "capitalize",
              }}
            >
             {exercises?.name}
            </CustomText>
            <CustomText
              style={{
                fontSize: 14,
                fontFamily: "Montserrat-SemiBold",
                textTransform: "capitalize",
              }}
            >
              {exercises?.equipmentRequired} (Equipment)
            </CustomText>
            <View className="gap-y-2 mt-3">
              {exercises?.sets.map((set, i) => (
                <View key={i} className="flex-row items-center justify-between bg-primaryAccentColor p-2 rounded-md">
                  <View className="flex-row items-center">
                    <Text className="w-14 text-lg font-semibold">Set {i + 1}:</Text>
                    <Text className="w-[70%] text-lg text-textColor font-semibold">{set.repetitions}</Text>
                  </View>
                  <Text className="">{set.rest}s Rest</Text>
                </View>
              ))}
            </View>
          </View>
  )
}

export default WorkoutDetailsBox;