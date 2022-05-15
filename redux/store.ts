import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  tableSlice,
  userSlice,
  collectionsSlice,
  collectionSlice,
  itemSlice,
} from "@redux/reducers";
import { useDispatch } from "react-redux";
import { Context, createWrapper } from "next-redux-wrapper";
import { nextReduxCookieMiddleware } from "next-redux-cookie-wrapper";

const rootReducer = combineReducers({
  tableSlice,
  userSlice,
  collectionsSlice,
  collectionSlice,
  itemSlice,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        subtrees: ["my.subtree"],
      })
    ),
});

const makeStore = (context: Context) => store;
export const wrapper = createWrapper(makeStore);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
