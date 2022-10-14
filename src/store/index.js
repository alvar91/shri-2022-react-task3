import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
//import storage from "redux-persist/lib/storage";

import listReducer from "./listSlice";
import filterReducer from "./filterSlice";
import taskReducer from "./taskSlice";

const rootReducer = combineReducers({
  lists: listReducer,
  filters: filterReducer,
  task: taskReducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

//const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),

  reducer: rootReducer
});

//export const persistor = persistStore(store);
export default store;
