import {
  Modal,
  Pressable,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ModalVisibleProps } from "@/src/types/types";
import CustomText from "@/src/utils/CustomText";
import TextField from "../inputs/TextField";
import { useUserData } from "@/src/context/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDayExercises } from "@/src/API/userAPI";
import AntDesign from "@expo/vector-icons/AntDesign";

const DayExerciseForm: React.FC<ModalVisibleProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [steps, setSteps] = useState(1);

  const [dayName, setDayName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [exercises, setExercises] = useState<any[]>([]);

  const [exerciseName, setExerciseName] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [equipmentRequired, setEquipmentRequired] = useState("");
  const [instruction, setInstruction] = useState("");
  const [sets, setSets] = useState<{ repetitions: string; rest: string }[]>([
    { repetitions: "", rest: "" },
  ]);

  const userData = useUserData();
  const userId = userData?._id;
  const queryClient = useQueryClient();

  const addExerciseToDay = () => {
    if (!exerciseName || !targetMuscle) {
        // Optionally add validation
        return;
      }

    const newExercise = {
      details: {
        name: exerciseName,
        targetMuscle,
        equipmentRequired,
        instruction: "",
        sets: sets.map((set) => ({
          repetitions: set.repetitions,
          rest: parseInt(set.rest, 10),
        })),
      },
    };

    setExercises((prev) => [...prev, newExercise]);

    // Reset exercise fields
    setExerciseName("");
    setTargetMuscle("");
    setEquipmentRequired("");
    setInstruction("");
    setSets([{ repetitions: "", rest: "" }]);
  };

  const addSet = () => {
    setSets([...sets, { repetitions: "", rest: "" }]);
  };

  const removeSet = (index: number) => {
    const updatedSets = sets.filter((_, idx) => idx !== index);
    setSets(updatedSets);
  };

  const handleSetChange = (
    index: number,
    field: "repetitions" | "rest",
    value: string
  ) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const planData = {
    name: dayName,
    isPublic,
    createdBy: userId,
    exercises,
  };

  const createMutation = useMutation({
    mutationFn: () => createDayExercises({ userId, planData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`userDayExercises_${userId}`],
      });
    },
  });

  const handleSubmitDay = () => {
    createMutation.mutate();
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View className="flex-1 p-3">
        <Pressable onPress={() => setModalVisible(false)}>
          <Text className="text-red-500 font-semibold">Close</Text>
        </Pressable>

        {steps === 1 && (
          <View className="">
            <CustomText
              style={{
                fontFamily: "Montserrat-Bold",
                fontSize: 22,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Create your Day Exercise 💪
            </CustomText>

            {/* Input fields */}
            <View className="mt-10">
              <View className="flex-row items-center gap-4">
                <Text className="mb-2 text-2xl">Public Plan?</Text>
                <Switch value={isPublic} onValueChange={setIsPublic} />
              </View>

              <TextField
                label="What is the Day Exercise?"
                placeholder="e.g. cardio day"
                value={dayName}
                onChangeText={setDayName}
              />
            </View>

            {/* Buttons */}
            <TouchableOpacity
              onPress={() => setSteps(2)}
              className="p-2 rounded-lg bg-blue-500 mt-5"
            >
              <Text className="font-semibold text-lg text-white text-center">
                Add Exercises
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {steps === 2 && (
          <View className="relative flex-1">
            <CustomText
              style={{
                fontFamily: "Montserrat-Bold",
                fontSize: 22,
                marginTop: 10,
              }}
            >
              Fill out your Exercise Details
            </CustomText>

            {/* Input fields */}
            <View className="">
              <TextField
                label="Exercise Name"
                placeholder="e.g. bench press"
                value={exerciseName}
                onChangeText={setExerciseName}
              />
              <TextField
                label="Trained muscle"
                placeholder="e.g. Mid-chest"
                value={targetMuscle}
                onChangeText={setTargetMuscle}
              />
              <TextField
                label="Which equipment?"
                placeholder="e.g. bench and barbell"
                value={equipmentRequired}
                onChangeText={setEquipmentRequired}
              />

              {sets.map((set, setIndex) => (
                <View
                  key={setIndex}
                  className="flex flex-row items-center gap-4"
                >
                  <View className="flex-row items-center">
                    <Text className="text-secondaryText font-medium">
                      Set {setIndex + 1}:
                    </Text>
                    <TextInput
                      placeholder="Repetitions"
                      placeholderTextColor="grey"
                      value={set.repetitions}
                      onChangeText={(value) =>
                        handleSetChange(setIndex, "repetitions", value)
                      }
                      className="bg-cardBackground tracking-widest rounded-lg p-2 w-[50px] text-primaryTextColor"
                    />
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-secondaryText font-medium">
                      Rest:
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Rest"
                      placeholderTextColor="grey"
                      value={set.rest}
                      onChangeText={(value) =>
                        handleSetChange(setIndex, "rest", value)
                      }
                      className="bg-cardBackground rounded-lg p-2 w-[50px] text-primaryTextColor"
                    />
                  </View>
                  {sets.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeSet(setIndex)}
                      className="bg-cardBackground p-2 rounded-lg flex justify-center items-center"
                    >
                      <AntDesign name="close" size={16} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                  {setIndex === sets.length - 1 && (
                    <TouchableOpacity
                      onPress={() => addSet()}
                      className="bg-cardBackground rounded-lg p-2"
                    >
                      <AntDesign name="plus" size={16} color="#22c55e" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <Pressable
                onPress={addExerciseToDay}
                className="bg-green-500 p-3 rounded mb-3"
              >
                <Text className="text-white text-center">Add Exercise</Text>
              </Pressable>
            </View>

            {/* Buttons */}
            <View className="absolute bottom-0 flex-row gap-3">
              <TouchableOpacity
                onPress={() => setSteps(1)}
                className="p-2 rounded-lg bg-blue-500 w-1/2"
              >
                <Text className="font-semibold text-lg text-center text-white">
                  Go Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitDay}
                className="p-2 rounded-lg bg-blue-500 flex-1"
              >
                <Text className="font-semibold text-lg text-center text-white">
                  Save Exercises
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default DayExerciseForm;
