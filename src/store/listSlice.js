import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { v4 as uuid } from "uuid";

import {
  getAllTasksReducer,
  addTaskReducer,
  editTaskReducer,
  moveTaskReducer,
  removeTaskReducer,
} from "./listReducers";

import { TasksAPI } from "../api/tasksAPI";

//import { data } from "./data";

const initialState = {
  // lists: data,
  lists: {},
  loading: false,
};

// Requests

export const getAllTasksRequest = createAsyncThunk(
  "lists/getAllTasksRequest",
  TasksAPI.requestAllTasks
);

export const addTaskRequest = createAsyncThunk(
  "lists/addTaskRequest",

  TasksAPI.addTask
);

// function updateList(newLists, key, list, tasks) {
//   newLists[key] = { ...list, tasks };
// }

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addTask: (state, action) => addTaskReducer(state, action),

    editTask: (state, action) => editTaskReducer(state, action),

    moveTask: (state, action) => moveTaskReducer(state, action),

    removeTask: (state, action) => removeTaskReducer(state, action),
  },
  extraReducers: {
    // Fetch tasks
    [getAllTasksRequest.pending]: (state) => {
      state.loading = true;
    },
    [getAllTasksRequest.fulfilled]: (state, action) => {
      state.loading = false;
      // state.posts = action.payload.posts;
      getAllTasksReducer(state, action);
      //state.popularPosts = action.payload.popularPosts;
    },
    [getAllTasksRequest.rejected]: (state) => {
      state.loading = false;
    },

    // Add task to list
    [addTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [addTaskRequest.fulfilled]: (state, action) => {
      state.loading = false;
      addTaskReducer(state, action)
      //state.posts.push(action.payload);
    },
    [addTaskRequest.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { addTask, editTask, moveTask, removeTask } = listSlice.actions;
export default listSlice.reducer;
