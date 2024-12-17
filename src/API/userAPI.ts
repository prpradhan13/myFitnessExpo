import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
});

export const getUser = async (userId: string) => {
  try {
    const res = await api.get(`/users/${userId}`);
    
    return res.data || {};
  } catch (error: any) {
    console.log(error.message);
    return {}
  }
};

export const getUserPlans = async (userId: string) => {
  try {
    const res = await api.get(`/userplans/${userId}`);
    return res.data || [];
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export const createPlanByUser = async ({userId, planData}) => {
  console.log("userId", userId);
  console.log("payload", planData);
  
  try {
    const res = await api.post(
      `/userplans/${userId}`, 
      planData
    )

    return res.data || {};
  } catch (error: any) {
    console.log(error.message);
    return {};
  }
}
