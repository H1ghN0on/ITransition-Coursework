import { Api } from "@api";
import { clearUser, setUser } from "@redux/userSlice";
import { GetServerSidePropsContext } from "next";
import moment from "moment";

export const insert = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

export const checkUserAuth = async (
  store: any,
  ctx: GetServerSidePropsContext
) => {
  try {
    const user = await Api(ctx).getMe();
    user ? store.dispatch(setUser(user)) : store.dispatch(clearUser());
    return user;
  } catch (error) {
    console.log(error);
    store.dispatch(clearUser());
    return null;
  }
};

export const formatDate = (time: string) => {
  return `${
    moment(time).date() >= 10 ? moment(time).date() : "0" + moment(time).date()
  }.${
    moment(time).month() + 1 >= 10
      ? moment(time).month() + 1
      : "0" + (moment(time).month() + 1)
  }.${moment(time).year()}`;
};
