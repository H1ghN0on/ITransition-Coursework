import { AxiosInstance } from "axios";

const UserApi = (instance: AxiosInstance) => {
  return {
    createComment: async (item_id: number, text: string) => {
      try {
        const { data } = await instance.post("/create-comment", {
          item_id,
          text,
        });
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getItemComments: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-comments/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  };
};

export default UserApi;
