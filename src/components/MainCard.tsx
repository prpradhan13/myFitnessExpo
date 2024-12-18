import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MainCardProps } from "../types/types";
import CustomText from "../utils/CustomText";
import { usePlanQuery } from "../utils/planQuery";
import MainCardLoader from "./loader/MainCardLoader";
import { router } from "expo-router";

const MainCard = ({ cardTitle }: MainCardProps) => {
  const {data, isLoading} = usePlanQuery();

  const handleOnPress = (planId: string) => {
    router.push(`/(main)/planDetatils/${planId}`)
  }
  
  return (
    <>
      <CustomText style={{ fontSize: 20, fontFamily: "Montserrat-Bold" }}>
        {cardTitle}
      </CustomText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      >
        {isLoading && (
          <MainCardLoader />
        )}

        {data?.planData?.map((plan) => (
          <Pressable
            onPress={() => handleOnPress(plan?._id)}
            key={plan?._id} 
            className="bg-highlightColor h-48 w-80 rounded-lg mr-5 justify-center items-center p-3"
          >
            {/* <Text>
              {plan.createdBy}
            </Text> */}
            <CustomText
              style={{ fontSize: 19, fontFamily: "Montserrat-Bold", textAlign: "center", textTransform: "capitalize" }}
            >
              {plan?.name}
            </CustomText>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default MainCard;
