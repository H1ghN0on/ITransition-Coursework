import { AxiosInstance } from "axios";

const CollectionApi = (instance: AxiosInstance) => {
  return {
    getUserCollections: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-collections/${id}`);
        console.log(data);
        return data.collections;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    createCollection: async (obj: FormData) => {
      try {
        const { data } = await instance.post("/create-collection", obj);
        return data.collection;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  };
};

export default CollectionApi;