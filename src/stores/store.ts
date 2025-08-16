import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import usersReducer from "./slices/usersSlice";

const rootReducers = combineReducers({
  loaderStore: loaderReducer,
  userStore: usersReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Wrapper for useDispatch hook from react-redux
// export const useAppDispatch = () => useDispatch<AppDispatch>();
