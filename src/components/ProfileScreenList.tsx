import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import CustomText from "../utils/CustomText";
import { Day, PlanData, ProfileScreenListProps } from "../types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import WeeklyPlanForm from "./forms/WeeklyPlanForm";
import { router } from "expo-router";
import DayExerciseForm from "./forms/DayExerciseForm";

const ProfileScreenList = ({ title, dataList }: ProfileScreenListProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dayFormVisible, setDayFormVisible] = useState(false);

  const handlePressOnCreatePlan = () => {
    setModalVisible(true);
  };

  const handlePlanBoxPress = (planId: string) => {
    router.push(`/(main)/planDetatils/${planId}`);
  };
  
  const sortedDataList = dataList?.sort(
    (a, b) =>
      new Date(String(b.createdAt)).getTime() -
      new Date(String(a.createdAt)).getTime()
  ).slice(0, 5);

  const renderItem = ({ item }: { item: PlanData | Day }) => {
    const creationDate = new Date(String(item.createdAt));
    const formattedDate = `${creationDate.getDate()}/${
      creationDate.getMonth() + 1
    }/${creationDate.getFullYear()}`;

    return (
      <Pressable
        key={item._id}
        onPress={() => {
            if ("days" in item) {
                router.push(`/(main)/planDetatils/${item._id}`)
            } else {
                router.push(`/(main)/ExerciseDetails/${item._id}`)
            }
        }}
        className="bg-[#d1d1d1] w-72 h-48 px-3 rounded-lg justify-center items-center relative"
      >
        <View className="absolute top-3 left-3 flex-row justify-between w-full items-center">
          <Text
            className={`p-1 rounded-md font-medium text-sm ${
              item.isPublic ? "bg-green-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {item.isPublic ? "Public" : "Private"}
          </Text>
          <Text className="text-sm font-medium">{formattedDate}</Text>
        </View>
        <CustomText
          style={{
            fontFamily: "Montserrat-Bold",
            fontSize: 18,
            textTransform: "capitalize",
          }}
        >
          {item.name}
        </CustomText>
      </Pressable>
    );
  };
  
  return (
    <>
      <CustomText
        style={{ fontFamily: "Montserrat-Bold", fontSize: 18, marginLeft: 12 }}
      >
        {title}
      </CustomText>

      {!dataList?.length ? (
        <View
          className="w-full h-40 rounded-lg mt-2 justify-center items-center"
        >
          <Text className="text-xl font-semibold text-gray-500">You have no Exercises</Text>
        </View>
      ) : (
        <>
          <FlatList
          data={sortedDataList}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, paddingHorizontal: 12, gap: 10 }}
          renderItem={renderItem}
        />
        </>
      )}
    </>
  );
};

export default ProfileScreenList;
