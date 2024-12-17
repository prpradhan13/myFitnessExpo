import { Pressable, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useUserPlansQuery, useUserQuery } from '@/src/utils/userQuery';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@/src/utils/CustomText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import WeeklyPlanForm from '@/src/components/forms/WeeklyPlanForm';

const profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userId } = useAuth();

  const { data } = useUserQuery(userId!);

  const { planData } = useUserPlansQuery(data?._id!);

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
    router.push(`/(main)/planDetatils/${planId}`)
  }

  const handlePressOnCreatePlan = () => {
    setModalVisible(true);
  }
  
  return (
    <SafeAreaView className='flex-1 bg-backgroundColor pt-8 px-3'>
      <View className=''>
        <CustomText style={{ fontFamily: "Montserrat-Bold", fontSize: 28 }} className='capitalize w-1/2'>Hello 👋</CustomText>
        <CustomText style={{ fontFamily: "Montserrat-Bold", fontSize: 32 }} className='capitalize w-1/2'>
          {data?.first_name}
          User
        </CustomText>
      </View>

      <View className={`${(!planData || planData.length === 0) ? 'hidden' : 'block'} mt-4 flex-row gap-3`}>
        <Pressable onPress={() => setModalVisible(true)} className='bg-[#d1d1d1] w-36 p-2 justify-center items-center rounded-md'>
          <Text className='text-base font-medium'>
            Weekly Plan
          </Text>
        </Pressable>
        <Pressable className='bg-[#d1d1d1] w-36 p-2 justify-center items-center rounded-md'>
          <Text className='text-base font-medium'>
            Single Day Plan
          </Text>
        </Pressable>
      </View>

      <View className='mt-7'>
        <CustomText style={{ fontFamily: "Montserrat-Bold", fontSize: 16 }} className=''>Your Weekly Plans</CustomText>
        {(!planData || planData.length === 0) ? (
          <Pressable 
          onPress={handlePressOnCreatePlan}
            className='bg-[#d1d1d1] w-72 h-48 rounded-lg mt-2 justify-center items-center'
          >
            <AntDesign name="plus" size={24} color="black" />
            <Text className='text-lg'>Create One</Text>
          </Pressable>
        ): (
          <>
            {planData?.map((plans) => (
              <Pressable key={plans._id} onPress={() => handlePlanBoxPress(plans._id)} className='bg-[#d1d1d1] w-72 h-48 px-3 rounded-lg mt-2 justify-center items-center'>
                <CustomText style={{ fontFamily: "Montserrat-Bold", fontSize: 18, textTransform: "capitalize" }}>{plans.name}</CustomText>
              </Pressable>
            ))}
          </>
        )}
      </View>
      
      <Pressable onPress={handleLogout} className='bg-red-500 p-2 rounded-md w-32 flex justify-center items-center mt-8'>
        <Text className='text-white text-lg font-semibold'>Log out</Text>
      </Pressable>

      {modalVisible && (
        <WeeklyPlanForm userId={data?._id} setModalVisible={setModalVisible} modalVisible={modalVisible} />
      )}
    </SafeAreaView>
  )
}

export default profile;