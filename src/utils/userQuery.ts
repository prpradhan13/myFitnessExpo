import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlanByUser, getDayExercisesByUserId, getUser, getUserPlans } from "../API/userAPI";
import { Day, PlanDataResponse, UserDataResponse } from "../types/types";

interface UseCreatePlanByUserProps {
    userId: string | undefined;
    planData: any;
}

export const useUserQuery = (userId: string) => {
    return useQuery<UserDataResponse>({
        queryKey: [`user_${userId}`],
        queryFn: () => getUser(userId)
    })
}

export const useUserPlansQuery = (userId: string) => {
    const query = useQuery<PlanDataResponse>({
        queryKey: [`userPlan_${userId}`],
        queryFn: () => getUserPlans(userId)
    })

    return ({
        ...query,
        planData: query.data?.planData
    })
}

// export const useCreatePlanByUser = ({userId, planData}: UseCreatePlanByUserProps) => {
//     const queryClient = useQueryClient();
//     const queryKey = userId ? [`userPlan_${userId}`] : undefined;

//     const createMutation = useMutation({
//         mutationFn: () => createPlanByUser({userId, planData}),
//         onSuccess: () => {
//             if (queryKey) {
//                 queryClient.invalidateQueries(queryKey);
//             }
//         }
//     })

//     return ({createMutation});
// };

export const useUserDayExercises = (userId: string | undefined) => {
    const query = useQuery<Day[]>({
        queryKey: [`userDayExercises_${userId}`],
        queryFn: () => getDayExercisesByUserId(userId)
    })

    return ({
        ...query,
        dayExerciseData: query.data
    })
}