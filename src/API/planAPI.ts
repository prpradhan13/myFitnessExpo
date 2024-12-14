import axios from 'axios';

const api = axios.create({
    baseURL:`${process.env.EXPO_PUBLIC_API_URL}/api/v1`
});

export const getPlans = async () => {
    try {
        const res = await api.get('/plans')

        // console.log(res.data?.planData);
        
        return res.data || [];
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export const getPlanById = async (planId: string) => {
    try {
        const res = await api.get(`/plans/${planId}`);

        return res.data?.planData || {};
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
};