import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface UserState {
  id: number;
  username: string;
  avatarURL: string;
  status: "user" | "admin" | "";
}

const initialState = {
  username: "",
  avatarURL: "",
  id: -1,
  status: "",
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.userSlice,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
