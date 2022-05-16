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

    getUser: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-user/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    setStatus: async (id: number, status: string) => {
      try {
        const { data } = await instance.get(`/set-user-status/${id}/${status}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getAllUsers: async () => {
      try {
        const { data } = await instance.get("/get-users");
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    login: async (obj: any) => {
      try {
        const { data } = await instance.post("/login", obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default UserApi;
