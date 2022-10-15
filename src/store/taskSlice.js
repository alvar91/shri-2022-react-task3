import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TasksAPI } from "../api/tasksAPI";

import { setTaskReducer } from "./taskReducers";

const initialState = {
  task: null,
  loading: false,
};

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
    // Fetch task by ID
    [getTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [getTaskRequest.fulfilled]: (state, action) => {
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
