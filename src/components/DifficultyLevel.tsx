import { Pressable, Text, View, FlatList } from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const DifficultyLevel = () => {
  const difficultyLevelData = ["begginers", "intermidiate", "Advanced"];
  const handleOnPress = (item: any) => {
    router.push(`/(main)/cardDetatils/${item}`);
  };

  return (
    <>
      <View className="flex-row">
        <FlatList
          data={difficultyLevelData}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 32, paddingHorizontal: 12 }}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => handleOnPress(item)} className="w-[220] h-[220] justify-center items-center gap-2">
                <LinearGradient
                  colors={["#4a4a4a", "#000000"]}
                  style={{
                    height: 190,
                    width: 190,
                    borderRadius: 100,
                    position: "absolute",
                  }}
                />
                <CustomText
                  style={{
                    fontSize: 18,
                    fontFamily: "Montserrat-Bold",
                    textTransform: "capitalize",
                    color: "#F7F6F2"
                  }}
                >
                  {item}
                </CustomText>
              </Pressable>
            );
          }}
        />
      </View>
    </>
  );
};

export default DifficultyLevel;
