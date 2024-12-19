import { useQuery } from "@tanstack/react-query";
import { getAllPublicDayExercises, getDayExerciseById, getPlanById, getPlans } from "../API/planAPI";
import { Day, PlanData, PlanDataResponse } from "../types/types";

export const usePlanQuery = () => {
    return useQuery<PlanDataResponse>({
        queryKey: ['publicPlan'],
        queryFn: getPlans
    })
};

export const useGetPlanByIdQuery = (planId: string) => {
    return useQuery<PlanData>({
        queryKey: [`plan_${planId}`],
        queryFn: () => getPlanById(planId)
    })
};

export const useGetDayExercisesByDayId = (dayId: string) => {
    return useQuery<Day>({
        queryKey: [`day_${dayId}`],
        queryFn: () => getDayExerciseById(dayId)
    })
}

export const useAllPublicDayExercises = () => {
    return useQuery<Day[]>({
        queryKey: ['public_day_exercises'],
        queryFn: getAllPublicDayExercises
    })
}
    