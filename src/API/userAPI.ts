import axios from "axios";

export type GetToken = () => Promise<any>;

export type GetUser = {
  userId: string;
  getToken : () => Promise<any>;
}

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
});

export const createUser = async (getToken: GetToken) => {
  try {
    const token = await getToken();

    if (!token) {
      console.error("No token available");
      return;
    }

    // Send a POST request to sync or create the user
    const response = await api.post(
      "/users",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("User synced successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getUser = async ({ userId, getToken }: GetUser) => {
  try {
    const token = await getToken();

    const res = await api.get(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    return res.data || {};
  } catch (error: any) {
    console.log(error.message);
    return {}
  }
};
