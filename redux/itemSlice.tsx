import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionItemType } from "@types";
import { HYDRATE } from "next-redux-wrapper";

interface ItemState {
  item: CollectionItemType | null;
}

const initialState = {
  item: null,
} as ItemState;

const itemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<CollectionItemType | null>) {
      state.item = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.itemSlice,
      };
    },
  },
});

export const { setItem } = itemSlice.actions;
export default itemSlice.reducer;
