import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export { Axios };
