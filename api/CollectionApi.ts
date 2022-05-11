import { AxiosInstance } from "axios";

const CollectionApi = (instance: AxiosInstance) => {
  return {
    getUserCollections: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-collections/${id}`);
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
        return null;
      }
    },

    editCollection: async (id: number, obj: FormData) => {
      try {
        const { data } = await instance.post(`/edit-collection/${id}`, obj);
        return data.collection;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    deleteCollection: async (id: number) => {
      try {
        const { data } = await instance.delete(`/delete-collection/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getTopCollections: async () => {
      try {
        const { data } = await instance.get(`/get-top-collections`);
        return data.collections;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getCollectionById: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-collection/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default CollectionApi;
