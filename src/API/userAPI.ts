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
  if (userId === undefined) {
    console.log("userId is Undefined");
    return {};
  }

  try {
    const res = await api.get(`/userplans/${userId}`);
    return res.data || [];
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export const createPlanByUser = async ({userId, planData}) => {
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
