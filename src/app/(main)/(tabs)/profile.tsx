import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import {
  useUserDayExercises,
  useUserPlansQuery,
} from "@/src/utils/userQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
import WeeklyPlanForm from "@/src/components/forms/WeeklyPlanForm";
import { useUserData } from "@/src/context/UserProvider";
import DayExerciseForm from "@/src/components/forms/DayExerciseForm";
import ProfileScreenList from "@/src/components/ProfileScreenList";

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dayFormVisible, setDayFormVisible] = useState(false);
  const userData = useUserData();

  const { planData } = useUserPlansQuery(userData?._id!);
  const { dayExerciseData } = useUserDayExercises(userData?._id);

  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundColor pt-8">
  
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="pl-3">
          <CustomText
            style={{ fontFamily: "Montserrat-Bold", fontSize: 28 }}
            className="capitalize w-1/2"
          >
            Hello 👋
          </CustomText>
          <CustomText
            style={{ fontFamily: "Montserrat-Bold", fontSize: 32 }}
            className="capitalize w-1/2"
          >
            {userData?.first_name}
          </CustomText>
        </View>

        {/* Create Buttons */}
        <View
          className='mt-4 flex-row gap-3 pl-3'
        >
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-[#d1d1d1] p-2 flex-row justify-center gap-2 items-center rounded-md"
          >
            <AntDesign name="plus" size={16} color="black" />
            <Text className="text-base font-medium">Weekly Plan</Text>
          </Pressable>
          <Pressable
            onPress={() => setDayFormVisible(true)}
            className="bg-[#d1d1d1] p-2 flex-row gap-2 justify-center items-center rounded-md"
          >
            <AntDesign name="plus" size={16} color="black" />
            <Text className="text-base font-medium">Single Day Plan</Text>
          </Pressable>
        </View>

        {/* Weekly plan details */}
        <View className="mt-7">
          <ProfileScreenList 
            title="Your Weekly Plans" 
            dataList={planData ?? []}
          />
        </View>

        {/* Single day plan details */}
        <View className="mt-7">
          <ProfileScreenList 
            title="Your Single Workout Plan" 
            dataList={dayExerciseData ?? []}
          />
        </View>

        <Pressable
          onPress={handleLogout}
          className="bg-red-500 ml-3 p-2 rounded-md w-32 flex justify-center items-center mt-8"
        >
          <Text className="text-white text-lg font-semibold">Log out</Text>
        </Pressable>
      </ScrollView>

      {modalVisible && (
        <WeeklyPlanForm
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}

      {dayFormVisible && (
        <DayExerciseForm
          modalVisible={dayFormVisible}
          setModalVisible={setDayFormVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default profile;
