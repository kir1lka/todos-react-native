import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import categoriesReducer from "./categoriesSlice";
import iconsReducer from "./iconsSlice";
import colorsReducer from "./colorsSlice";
import tasksReducer from "./tasksSlice";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  icons: iconsReducer,
  colors: colorsReducer,
  categories: categoriesReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
