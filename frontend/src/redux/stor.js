import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persietedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persietedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
