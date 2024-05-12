import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import webAppReducer from "./reducers";

const webAppPersistConfig = {
  key: "webAppReducer",
  storage: storageSession,
  whitelist: ["theme", "openOrders", "tradeHistory"],
};

const rootReducer = combineReducers({
  webAppReducer: persistReducer(webAppPersistConfig, webAppReducer), // Use it with the correct key
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
