import { AxiosInstance } from "axios";

const UserApi = (instance: AxiosInstance) => {
  return {
    search: async (query: string) => {
      try {
        const { data } = await instance.get(`/search/${query}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default UserApi;
