import axios from "axios";
import Cookies from "nookies";
import cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";
import { CollectionApi, CommentApi, ItemApi, LikeApi, UserApi } from "./apis";
import SearchApi from "./SearchApi";

export const Api = (ctx?: GetServerSidePropsContext) => {
  let token;

  if (ctx) {
    const cookies = Cookies.get(ctx);
    token = cookies.token;
  } else {
    token = cookies.get("token");
  }

  const instance = axios.create({
    baseURL: process.env.AXIOS_BASE_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    ...UserApi(instance),
    ...CollectionApi(instance),
    ...ItemApi(instance),
    ...CommentApi(instance),
    ...LikeApi(instance),
    ...SearchApi(instance),
  };
};
