import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionType } from "@types";
import { HYDRATE } from "next-redux-wrapper";

interface CollectionsState {
  collections: CollectionType[];
  isForEdit: CollectionType | null;
  isModalActive: boolean;
}

const initialState = {
  collections: [],
  isForEdit: null,
  isModalActive: false,
} as CollectionsState;

const collectionsSlice = createSlice({
  name: "collectionsSlice",
  initialState,
  reducers: {
    setCollections(state, action: PayloadAction<CollectionType[]>) {
      state.collections = action.payload;
    },

    clearCollectios(state) {
      state.collections = [];
    },

    addCollection(state, action: PayloadAction<CollectionType>) {
      state.collections.push(action.payload);
    },

    setForEdit(state, action: PayloadAction<number | null>) {
      if (action.payload) {
        state.isForEdit = state.collections.find(
          (obj) => obj.id == action.payload
        )!;
      } else {
        state.isForEdit = null;
      }
    },

    setModal(state, action: PayloadAction<boolean>) {
      state.isModalActive = action.payload;
    },

    editCollection(state, action: PayloadAction<CollectionType>) {
      state.collections = state.collections.map((obj) => {
        if (obj.id === action.payload.id) {
          obj = action.payload;
        }
        return obj;
      });
      state.isForEdit = null;
    },

    removeCollection(state, action: PayloadAction<number>) {
      state.collections = state.collections.filter(
        (obj) => obj.id != action.payload
      );
    },
  },
});

export const {
  setCollections,
  clearCollectios,
  addCollection,
  removeCollection,
  editCollection,
  setForEdit,
  setModal,
} = collectionsSlice.actions;
export default collectionsSlice.reducer;
