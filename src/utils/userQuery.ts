import { useQuery } from "@tanstack/react-query";
import { getDayExercisesByUserId, getUser, getUserPlans } from "../API/userAPI";
import { Day, PlanDataResponse, UserDataResponse } from "../types/types";

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