import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Day, PlanData } from "../types/types";
import dayjs from "dayjs";
import { router } from "expo-router";

const ExercisePlanCard = ({ itemList }: { itemList: PlanData | Day }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if ("days" in itemList) {
          router.push(`/(main)/planDetatils/${itemList._id}`);
        } else {
          router.push(`/(main)/ExerciseDetails/${itemList._id}`);
        }
      }}
      className="p-3 rounded-lg w-full bg-[#c3c3c3]"
    >
      <Text className="text-sm">
        {dayjs(itemList?.createdAt).format("DD/MM/YYYY")}
      </Text>
      <Text className="capitalize text-lg font-semibold">{itemList.name}</Text>
    </TouchableOpacity>
  );
};

export default ExercisePlanCard;
