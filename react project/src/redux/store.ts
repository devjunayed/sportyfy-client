import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import registerSlice from "./features/registerSlice";
import loginSlice from "./features/loginSlice";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import dashboardSlice from "./features/dashboardSlice";
import facilitySlice from "./features/facilitiySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
const persistConfig = {
  key: 'auth',
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    register: registerSlice,
    login: loginSlice,
    dashboard: dashboardSlice,
    facility: facilitySlice,
    category: categorySlice,
    user: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)
