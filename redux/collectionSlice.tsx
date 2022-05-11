import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionType } from "@types";
import { HYDRATE } from "next-redux-wrapper";

interface CollectionState {
  collection: CollectionType | null;
}

const initialState = {
  collection: null,
} as CollectionState;

const collectionSlice = createSlice({
  name: "collectionSlice",
  initialState,
  reducers: {
    setCollection(state, action: PayloadAction<any>) {
      state.collection = action.payload;
    },
    setItemsNumber(state, action: PayloadAction<"inc" | "dec">) {
      if (action.payload === "inc") {
        state.collection!.items++;
      }
      if (action.payload === "dec") {
        state.collection!.items--;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.collectionSlice,
      };
    },
  },
});

export const { setCollection, setItemsNumber } = collectionSlice.actions;
export default collectionSlice.reducer;
