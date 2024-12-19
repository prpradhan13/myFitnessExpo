import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useUserDayExercises, useUserPlansQuery, useUserQuery } from "@/src/utils/userQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/utils/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import WeeklyPlanForm from "@/src/components/forms/WeeklyPlanForm";
import { useUserData } from "@/src/context/UserProvider";

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useUserData();

  const { planData } = useUserPlansQuery(userData?._id!);
  const { dayExerciseData } = useUserDayExercises(userData?._id);

  const { signOut } = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitialLetter = (fullName: any) => {
    if (!fullName) return "";
    // const nameParts = fullname[0];
    // return nameParts // If incase change of mind and i want to show the fullname's 1st letter
    const nameParts = fullName.split(" ");
    return nameParts.length === 1
      ? fullName.slice(0, 2).toUpperCase()
      : nameParts
          .map((name: any) => name[0])
          .join("")
          .toUpperCase();
  };

  const userNameInitials = useMemo(
    () => getInitialLetter(user?.fullName),
    [user?.fullName]
  );

  const handlePlanBoxPress = (planId: string) => {
    router.push(`/(main)/planDetatils/${planId}`);
  };

  const handlePressOnCreatePlan = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundColor pt-8 px-3">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="">
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
          className={`${
            !planData || planData.length === 0 ? "hidden" : "block"
          } mt-4 flex-row gap-3`}
        >
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-[#d1d1d1] p-2 flex-row justify-center gap-2 items-center rounded-md"
          >
            <AntDesign name="plus" size={16} color="black" />
            <Text className="text-base font-medium">Weekly Plan</Text>
          </Pressable>
          <Pressable className="bg-[#d1d1d1] p-2 flex-row gap-2 justify-center items-center rounded-md">
            <AntDesign name="plus" size={16} color="black" />
            <Text className="text-base font-medium">Single Day Plan</Text>
          </Pressable>
        </View>

        {/* Weekly plan details */}
        <View className="mt-7">
          <CustomText
            style={{ fontFamily: "Montserrat-Bold", fontSize: 16 }}
            className=""
          >
            Your Weekly Plans
          </CustomText>
          {!planData || planData.length === 0 ? (
            <Pressable
              onPress={handlePressOnCreatePlan}
              className="bg-[#d1d1d1] w-72 h-48 rounded-lg mt-2 justify-center items-center"
            >
              <AntDesign name="plus" size={24} color="black" />
              <Text className="text-lg">Create One</Text>
            </Pressable>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
            >
              {planData
                ?.sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime())
                .slice(0, 4)
                .map((plans) => {
                  const PlanCreationDate = new Date(String(plans.createdAt)).getDate();
                  const PlanCreationMonth = new Date(String(plans.createdAt)).getMonth();
                  const PlanCreationYear = new Date(String(plans.createdAt)).getFullYear();

                  return (
                    <Pressable
                      key={plans._id}
                      onPress={() => handlePlanBoxPress(plans._id)}
                      className="bg-[#d1d1d1] w-72 h-48 px-3 mr-5 rounded-lg justify-center items-center relative"
                    >
                      <View className="absolute top-3 left-3 flex-row justify-between w-full items-center">
                        {plans.isPublic ? (
                          <Text className="bg-green-500 p-1 rounded-md font-medium text-white text-sm">
                            Public
                          </Text>
                        ) : (
                          <Text className="bg-blue-500 p-1 rounded-md font-medium text-white text-sm">
                            Private
                          </Text>
                        )}
                        <Text className="text-sm font-medium">
                          {`${PlanCreationDate}/${PlanCreationMonth}/${PlanCreationYear}`}
                        </Text>
                      </View>
                      <CustomText
                        style={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: 18,
                          textTransform: "capitalize",
                        }}
                      >
                        {plans.name}
                      </CustomText>
                    </Pressable>
                  );
                })}
            </ScrollView>
          )}
        </View>

        {/* Single day plan details */}
        <View className="mt-7">
          <CustomText
            style={{ fontFamily: "Montserrat-Bold", fontSize: 16 }}
            className=""
          >
            Your Single Day Plans
          </CustomText>
          {!dayExerciseData || dayExerciseData.length === 0 ? (
            <Pressable
              onPress={handlePressOnCreatePlan}
              className="bg-[#d1d1d1] w-72 h-48 rounded-lg mt-2 justify-center items-center"
            >
              <AntDesign name="plus" size={24} color="black" />
              <Text className="text-lg">Create One</Text>
            </Pressable>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
            >
              {dayExerciseData
                ?.sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime())
                .slice(0, 4)
                .map((dayExercise) => {
                  const creationDate = new Date(String(dayExercise.createdAt)).getDate();
                  const creationMonth = new Date(String(dayExercise.createdAt)).getMonth();
                  const creationYear = new Date(String(dayExercise.createdAt)).getFullYear();

                  return (
                    <Pressable
                      key={dayExercise._id}
                      onPress={() => handlePlanBoxPress(dayExercise._id)}
                      className="bg-[#d1d1d1] w-72 h-48 px-3 mr-5 rounded-lg justify-center items-center relative"
                    >
                      <View className="absolute top-3 left-3 flex-row justify-between w-full items-center">
                        {dayExercise.isPublic ? (
                          <Text className="bg-green-500 p-1 rounded-md font-medium text-white text-sm">
                            Public
                          </Text>
                        ) : (
                          <Text className="bg-blue-500 p-1 rounded-md font-medium text-white text-sm">
                            Private
                          </Text>
                        )}
                        <Text className="text-sm font-medium">
                          {`${creationDate}/${creationMonth}/${creationYear}`}
                        </Text>
                      </View>
                      <CustomText
                        style={{
                          fontFamily: "Montserrat-Bold",
                          fontSize: 18,
                          textTransform: "capitalize",
                        }}
                      >
                        {dayExercise.name}
                      </CustomText>
                    </Pressable>
                  );
                })}
            </ScrollView>
          )}
        </View>

        <Pressable
          onPress={handleLogout}
          className="bg-red-500 p-2 rounded-md w-32 flex justify-center items-center mt-8"
        >
          <Text className="text-white text-lg font-semibold">Log out</Text>
        </Pressable>
      </ScrollView>

      {modalVisible && (
        <WeeklyPlanForm
          userId={userData?._id}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
    </SafeAreaView>
  );
};

export default profile;
