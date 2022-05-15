import { LOCALES } from "@locales/locales";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { diff } from "jsondiffpatch";
import { HYDRATE } from "next-redux-wrapper";

interface UserState {
  id: number;
  username: string;
  avatarURL: string;
  status: "user" | "admin" | "" | "block";
  locale: any;
}

const initialState = {
  username: "",
  avatarURL: "",
  id: -1,
  status: "",
  locale: LOCALES.ENGLISH,
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      const { id, username, avatarURL, status } = action.payload;
      state.id = id;
      state.username = username;
      state.avatarURL = avatarURL;
      state.status = status;
    },

    clearUser(state) {
      state.id = -1;
      state.username = "";
      state.avatarURL = "";
      state.status = "";
    },
    setStatus(state, action: PayloadAction<"admin" | "user" | "block">) {
      state.status = action.payload;
    },
    setLocale(state, action: PayloadAction<any>) {
      state.locale = action.payload;
    },
  },
});

export const { setUser, clearUser, setStatus, setLocale } = userSlice.actions;
export default userSlice.reducer;
