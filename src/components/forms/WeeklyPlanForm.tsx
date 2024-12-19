import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { createPlanByUser } from "@/src/API/userAPI";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomText from "@/src/utils/CustomText";
import TextField from "../inputs/TextField";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { useUserData } from "@/src/context/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

interface WeeklyPlanFormProps {
  userId: string | undefined;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const WeeklyPlanForm: React.FC<WeeklyPlanFormProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  // const [planType, setPlanType] = useState('weekly');
  const [isPublic, setIsPublic] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [description, setDescription] = useState("");

  // Step 2: Add Days
  const [days, setDays] = useState<any[]>([]);

  // Step 3: Add Exercises for a Day
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const [exerciseName, setExerciseName] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [equipmentRequired, setEquipmentRequired] = useState("");
  const [sets, setSets] = useState<{ repetitions: string; rest: string }[]>([
    { repetitions: "", rest: "" },
  ]);
  // const [isSubmiting, setIsSubmiting] = useState();

  const userData = useUserData();
  const userId = userData?._id;

  // Navigate Steps
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  // Add Day Logic
  const addDay = () => {
    setDays([...days, { name: "", exercises: [] }]);
  };

  const handleDayChange = (index: number, value: string) => {
    const updatedDays = [...days];
    updatedDays[index].name = value;
    setDays(updatedDays);
  };

  const addExerciseToDay = () => {
    if (currentDayIndex === null) return;

    const newExercise = {
      details: {
        name: exerciseName,
        targetMuscle,
        difficultyLevel, // Add difficultyLevel here if required.
        equipmentRequired,
        instruction: "", // Add an empty instruction field if required.
        sets: sets.map((set) => ({
          repetitions: set.repetitions,
          rest: parseInt(set.rest, 10), // Ensure rest is sent as a number
        })),
      },
    };

    const updatedDays = [...days];
    updatedDays[currentDayIndex].exercises.push(newExercise);
    setDays(updatedDays);

    // Reset exercise fields
    setExerciseName("");
    setTargetMuscle("");
    setEquipmentRequired("");
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

  const queryClient = useQueryClient();
  const planData = {
    name,
    isPublic,
    difficultyLevel,
    description,
    days,
  };
  const createMutation = useMutation({
    mutationFn: () => createPlanByUser({ userId, planData }),
    onSuccess: () => {
      // Invalidating queries for userPlan and userDayExercises
      queryClient.invalidateQueries({ queryKey: [`userPlan_${userId}`] });
      queryClient.invalidateQueries({
        queryKey: [`userDayExercises_${userId}`],
      });
    },
  });

  const handleSubmitPlan = () => {
    createMutation.mutate();
    // setIsSubmiting(submitMutation.isPending);
    // if (!isSubmiting) {
    setModalVisible(false);
    // }
  };

  return (
    <Modal animationType="slide" visible={modalVisible} className="">
      <ScrollView className="p-4 flex-1 bg-backgroundColor">
        <Pressable onPress={() => setModalVisible(false)}>
          <Text className="text-red-500">Close</Text>
        </Pressable>
        {/* Step Navigation */}
        <CustomText style={{ fontFamily: "Montserrat-Bold" }} className="mt-4">
          Let's Create a Weekly Plan
        </CustomText>
        <Text className="text-gray-500 mb-3">Step {step} of 4</Text>

        {/* Step 1: Plan Details */}
        {step === 1 && (
          <View className="gap-8">
            <TextField
              label="What is your plan name?"
              placeholder="Plan Name"
              value={name}
              onChangeText={setName}
            />

            <View className="flex-row items-center gap-4">
              <Text className="mb-2 text-2xl">Public Plan?</Text>
              <View>
                <Switch value={isPublic} onValueChange={setIsPublic} />
              </View>
            </View>

            <TextField
              label="Difficulty Level ?"
              placeholder="(e.g., Intermediate)"
              value={difficultyLevel}
              onChangeText={setDifficultyLevel}
            />

            <TextField
              label="Any Notes?"
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              // multiline
            />

            <Pressable
              onPress={handleNextStep}
              className="bg-blue-500 p-3 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                Next: Add Days
              </Text>
            </Pressable>
          </View>
        )}

        {/* Step 2: Add Days */}
        {step === 2 && (
          <View className="min-h-[90%]">
            <Pressable
              onPress={addDay}
              className="bg-green-500 p-3 rounded-lg my-3"
            >
              <Text className="text-white text-center font-semibold">
                Add New Day
              </Text>
            </Pressable>

            {days.map((day, index) => (
              <View key={index} className="mb-4 h-[80%]">
                <TextField
                  label="What is your Workout?"
                  placeholder={`Day ${index + 1} Name`}
                  value={day.name}
                  onChangeText={(value) => handleDayChange(index, value)}
                />
                <Pressable
                  onPress={() => {
                    setCurrentDayIndex(index);
                    setStep(3);
                  }}
                  className="bg-blue-400 p-2 mt-3 rounded-lg w-[150px]"
                >
                  <Text className="text-white text-center font-semibold">
                    Add Exercises
                  </Text>
                </Pressable>
              </View>
            ))}

            {days.length > 0 && (
              <Pressable
                onPress={() => setStep(4)}
                className="bg-blue-500 p-3 rounded-lg mt-4"
              >
                <Text className="text-white text-center font-semibold">
                  Review & Submit
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Step 3: Add Exercises */}
        {step === 3 && currentDayIndex !== null && (
          <View>
            <Text className="mb-2 font-bold">
              Adding Exercises for Day: {days[currentDayIndex]?.name}
            </Text>

            <TextInput
              placeholder="Exercise Name"
              value={exerciseName}
              onChangeText={setExerciseName}
              className="border p-2 mb-3 rounded"
            />

            <TextInput
              placeholder="Target Muscle"
              value={targetMuscle}
              onChangeText={setTargetMuscle}
              className="border p-2 mb-3 rounded"
            />

            <TextInput
              placeholder="Equipment Required"
              value={equipmentRequired}
              onChangeText={setEquipmentRequired}
              className="border p-2 mb-3 rounded"
            />

            {sets.map((set, setIndex) => (
              <View key={setIndex} className="flex flex-row items-center gap-4">
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
                  <Text className="text-secondaryText font-medium">Rest:</Text>
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
              <Text className="text-white text-center">Save Exercise</Text>
            </Pressable>

            <Pressable
              onPress={() => setStep(2)}
              className="bg-gray-400 p-3 rounded"
            >
              <Text className="text-white text-center">
                Back to Days And Submit
              </Text>
            </Pressable>
          </View>
        )}

        {/* Final Step: Review & Submit */}
        {step === 4 && (
          <View>
            <Text className="font-bold mb-3">Review Your Plan</Text>
            <Text>
              {JSON.stringify(
                { name, isPublic, difficultyLevel, description, days },
                null,
                2
              )}
            </Text>

            <Pressable
              onPress={handleSubmitPlan}
              className="bg-blue-500 p-3 rounded mt-4"
            >
              <Text className="text-white text-center">Submit Plan</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </Modal>
  );
};

export default WeeklyPlanForm;
