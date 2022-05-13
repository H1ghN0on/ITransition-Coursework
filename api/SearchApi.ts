import { AxiosInstance } from "axios";

const SearchApi = (instance: AxiosInstance) => {
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

    searchByTag: async (query: string) => {
      try {
        const { data } = await instance.get(`/search-by-tag/${query}`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    countTags: async () => {
      try {
        const { data } = await instance.get(`/count-tags`);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export default SearchApi;
