import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TasksAPI } from "../api/tasksAPI";

import { setTaskReducer } from "./taskReducers";

const initialState = {
  task: null,
  loading: false,
};

// const initialState = {
//   task: {
//     id: "98c17558-367c-4b83-bb31-fb5ce83b3666",
//     title: "Сверстать лендинг по готовому шаблону",
//     tags: ["blue", "warmGreen", "darkBlue", "yellow"],
//     comments: [],
//     description: "",
//   },
// };

// Requests
export const getTaskRequest = createAsyncThunk(
  "task/getTaskRequest",
  TasksAPI.getTask
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => setTaskReducer(state, action),
  },
  extraReducers: {
    [getTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [getTaskRequest.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.loading = false;
      setTaskReducer(state, action);
    },
    [getTaskRequest.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setTask } = taskSlice.actions;
export default taskSlice.reducer;
