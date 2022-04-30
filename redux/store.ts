import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tableSlice } from "@redux/reducers";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  tableSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
