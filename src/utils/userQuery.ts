import { useMutation, useQuery } from "@tanstack/react-query";
import { createPlanByUser, getUser, getUserPlans } from "../API/userAPI";
import { PlanDataResponse, UserDataResponse } from "../types/types";

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

export const useCreatePlanByUser = ({userId, planData}) => {
    return useMutation({
        mutationFn: () => createPlanByUser({userId, planData})
    })
};