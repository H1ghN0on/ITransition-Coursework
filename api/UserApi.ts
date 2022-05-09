import { AxiosInstance } from "axios";

const UserApi = (instance: AxiosInstance) => {
  return {
    getMe: async () => {
      try {
        const { data } = await instance.get("/auth/me");
        return data.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default UserApi;
