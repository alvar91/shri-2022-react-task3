import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getAllTasksReducer,
  addTaskReducer,
  editTaskReducer,
  moveTaskReducer,
  removeTaskReducer,
} from "./listReducers";

import { TasksAPI } from "../api/tasksAPI";

const initialState = {
  // lists: data,
  lists: null,
  loading: false,
};

// Requests
export const getAllTasksRequest = createAsyncThunk(
  "lists/getAllTasksRequest",
  TasksAPI.getAllTasks
);

export const addTaskRequest = createAsyncThunk(
  "lists/addTaskRequest",

  TasksAPI.addTask
);

export const removeTaskRequest = createAsyncThunk(
  "lists/removeTaskRequest",

  TasksAPI.removeTask
);

export const editTaskRequest = createAsyncThunk(
  "lists/editTaskRequest",

  TasksAPI.editTask
);

export const moveTaskRequest = createAsyncThunk(
  "lists/moveTaskRequest",

  TasksAPI.moveTask
);

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
      getAllTasksReducer(state, action);
      toast.success("Данные успешно загружены");
    },
    [getAllTasksRequest.rejected]: (state) => {
      state.loading = false;
      toast.error("Ошибка обращения к серверу");
    },

    // Add task to list
    [addTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [addTaskRequest.fulfilled]: (state, action) => {
      state.loading = false;
      addTaskReducer(state, action);
      toast.success("Задача успешно добавлена");
    },
    [addTaskRequest.rejected]: (state) => {
      state.loading = false;
      toast.error("Ошибка обращения к серверу");
    },

    // Remove task from list
    [removeTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [removeTaskRequest.fulfilled]: (state, action) => {
      state.loading = false;
      removeTaskReducer(state, action);
      toast.success("Задача успешно удалена");
    },
    [removeTaskRequest.rejected]: (state) => {
      state.loading = false;
      toast.error("Ошибка обращения к серверу");
    },

    // Edit task in list
    [editTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [editTaskRequest.fulfilled]: (state, action) => {
      state.loading = false;
      editTaskReducer(state, action);
      toast.success("Данные успешно обновлены");
    },
    [editTaskRequest.rejected]: (state) => {
      state.loading = false;
      toast.error("Ошибка обращения к серверу");
    },

    // Move task between two lists
    [moveTaskRequest.pending]: (state) => {
      state.loading = true;
    },
    [moveTaskRequest.fulfilled]: (state, action) => {
      state.loading = false;
      moveTaskReducer(state, action);
      toast.success("Задача успешно перемещена");
    },
    [moveTaskRequest.rejected]: (state) => {
      state.loading = false;
      toast.error("Ошибка обращения к серверу");
    },
  },
});

export const { addTask, editTask, moveTask, removeTask } = listSlice.actions;
export default listSlice.reducer;
