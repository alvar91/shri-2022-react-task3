import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask(state, action) {
      state.task = action.payload;
    },
  },
});

export const { setTask } = taskSlice.actions;
export default taskSlice.reducer;
