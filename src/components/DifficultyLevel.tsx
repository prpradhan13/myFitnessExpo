import { Pressable, Text, View } from "react-native";
import React from "react";
import CustomText from "../utils/CustomText";
import { router } from "expo-router";

const DifficultyLevel = () => {

    const handleOnPress = (item: any) => {
        router.push(`/(main)/cardDetatils/${item}`)
    };

  return (
    <>
      <CustomText style={{ fontSize: 20, fontFamily: "Montserrat-Bold" }}>
        Level
      </CustomText>

      <View className="mt-2">
        {["begginers", "intermidiate", "Advanced"].map((item, i) => (
          <Pressable
            onPress={() => handleOnPress(item)}
            key={i}
            className="h-20 w-full items-center justify-center bg-primaryAccentColor rounded-lg mb-3"
          >
            <CustomText
              style={{
                fontSize: 18,
                fontFamily: "Montserrat-Bold",
                textTransform: "capitalize",
              }}
            >
              {item}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default DifficultyLevel;
