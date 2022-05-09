import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface UserState {
  id: number;
  username: string;
  avatarURL: string;
}

const initialState = {
  username: "",
  avatarURL: "",
  id: -1,
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      const { id, username, avatarURL } = action.payload;
      state.id = id;
      state.username = username;
      state.avatarURL = avatarURL;
    },

    clearUser(state) {
      state.id = -1;
      state.username = "";
      state.avatarURL = "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.userSlice,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
