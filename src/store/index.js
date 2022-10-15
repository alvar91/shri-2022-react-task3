import { configureStore, combineReducers } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import filterReducer from "./filterSlice";
import taskReducer from "./taskSlice";

const rootReducer = combineReducers({
  lists: listReducer,
  filters: filterReducer,
  task: taskReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
