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
      (state.item = action.payload.item),
        (state.comments = action.payload.comments);
    },
    addComment(state, action: PayloadAction<CommentType>) {
      state.comments.unshift(action.payload);
    },

    setLike(
      state,
      action: PayloadAction<{ user_id: number; type: "add" | "remove" }>
    ) {
      const { user_id, type } = action.payload;
      if (state.item) {
        if (type === "add") {
          state.item.likes.push({ user_id, item_id: state.item.id });
        }
        if (type === "remove") {
          state.item = {
            ...state.item,
            likes: state.item.likes.filter((like) => like.user_id !== user_id),
          };
        }
      }
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

export const { setItem, addComment, setLike } = itemSlice.actions;
export default itemSlice.reducer;
