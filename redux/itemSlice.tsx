import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionItemType, CommentType } from "@types";
import { HYDRATE } from "next-redux-wrapper";

interface ItemState {
  item: CollectionItemType | null;
  comments: CommentType[];
}

const initialState = {
  item: null,
  comments: [],
} as ItemState;

const itemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    setItem(
      state,
      action: PayloadAction<{
        item: CollectionItemType | null;
        comments: CommentType[];
      }>
    ) {
      state.item = action.payload.item;
      state.comments = action.payload.comments;
    },
    addComment(state, action: PayloadAction<CommentType>) {
      state.comments.unshift(action.payload);
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

export const { setItem, addComment } = itemSlice.actions;
export default itemSlice.reducer;
