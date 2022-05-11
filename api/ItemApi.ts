import { CollectionItemType } from "@types";
import { AxiosInstance } from "axios";

const CollectionApi = (instance: AxiosInstance) => {
  return {
    getItemById: async (id: number) => {
      try {
        const { data } = await instance.get(`/get-collection-data/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    getCollectionData: async (collectionId: number) => {
      try {
        const { data } = await instance.get(
          `/get-collection-data/${collectionId}`
        );
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    createItem: async (obj: Omit<CollectionItemType, "createdAt">) => {
      try {
        const { data } = await instance.post("/create-item", obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    editItem: async (obj: Omit<CollectionItemType, "createdAt">) => {
      try {
        const { data } = await instance.post(`/edit-item`, obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    deleteItem: async (id: number) => {
      try {
        const { data } = await instance.delete(`/delete-item/${id}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    addColumn: async (obj: {
      name: string;
      accessor: string;
      type: string;
      collectionId: number;
      initValue: any;
    }) => {
      try {
        const { data } = await instance.post(`/create-column`, obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    deleteColumn: async (obj: {
      collectionId: number;
      accessor: string;
      type: string;
    }) => {
      try {
        const { data } = await instance.post(`/delete-column`, obj);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default CollectionApi;
