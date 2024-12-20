import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { MainCardProps } from "../types/types";
import CustomText from "../utils/CustomText";
import { usePlanQuery } from "../utils/planQuery";
import MainCardLoader from "./loader/MainCardLoader";
import { router } from "expo-router";
import { useUserData } from "../context/UserProvider";
import { LightSpeedInLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const MainCard = ({ cardTitle }: MainCardProps) => {
  const { data, isLoading } = usePlanQuery();
  const userData = useUserData();

  const handleOnPress = (planId: string) => {
    router.push(`/(main)/planDetatils/${planId}`);
  };

  return (
    <>
      <CustomText style={{ fontSize: 20, fontFamily: "Montserrat-Bold" }}>
        {cardTitle}
      </CustomText>

      <FlatList
        data={data?.planData}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingEnd: 12, gap: 10, marginTop: 10 }}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => handleOnPress(item?._id)}
              key={item?._id}
              className="h-48 w-80 justify-center items-center"
            >
              <LinearGradient
                colors={["#C8D5B9", "#000000"]}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 12,
                  position: "absolute",
                }}
              />
              <Text className="text-sm absolute bottom-3 left-3 capitalize font-medium text-[#cecece]">
                {userData?.first_name} {userData?.last_name}
              </Text>
              <CustomText
                style={{
                  fontSize: 19,
                  fontFamily: "Montserrat-Bold",
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: "#F7F6F2"
                }}
              >
                {item?.name}
              </CustomText>
            </Pressable>
          );
        }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      >
        {isLoading && <MainCardLoader />}
      </ScrollView>
    </>
  );
};

export default MainCard;
