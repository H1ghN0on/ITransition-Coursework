import { AxiosInstance } from "axios";

const UserApi = (instance: AxiosInstance) => {
  return {
    // getLikes: async (id: number) => {
    //   try {
    //     const { data } = await instance.get(`/get-likes/${id}`);
    //     return data.data;
    //   } catch (error) {
    //     console.log(error);
    //     return null;
    //   }
    // },
    setLike: async (obj: { item_id: number; user_id: number }) => {
      try {
        const { data } = await instance.post("/set-like", obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default UserApi;
