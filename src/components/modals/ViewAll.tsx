import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useUserPlansQuery } from "@/src/utils/userQuery";
import { useUserData } from "@/src/context/UserProvider";
import ExercisePlanCard from "../ExercisePlanCard";
import { Day, PlanData } from "@/src/types/types";

interface ViewAllProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  dataList: any;
}

const ViewAll = ({ modalVisible, setModalVisible, dataList }: ViewAllProps) => {
    const userData = useUserData();

  return (
    <Modal transparent visible={modalVisible}>
      <View className="flex-1 bg-backgroundColor p-4">
        <View>
          <AntDesign
            onPress={() => setModalVisible(false)}
            name="arrowleft"
            size={24}
            color="black"
          />
        </View>

        <FlatList
            data={dataList}
            keyExtractor={item => item._id}
            contentContainerStyle={{
                paddingTop: 16,
                gap: 16,
                paddingBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ExercisePlanCard itemList={item} />}
        />
      </View>
    </Modal>
  );
};

export default ViewAll;
