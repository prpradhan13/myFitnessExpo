import { useQuery } from "@tanstack/react-query";
import { getPlanById, getPlans } from "../API/planAPI";
import { PlanData, PlanDataResponse } from "../types/types";

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
}
    