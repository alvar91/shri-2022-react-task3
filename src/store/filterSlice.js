import { createSlice } from "@reduxjs/toolkit";
import { FILTER_TITLES } from "../constants";

const initialState = {
  filters: [
    { id: 1, text: FILTER_TITLES.comment, selected: false },
    { id: 2, text: FILTER_TITLES.description, selected: false },
    { id: 3, text: FILTER_TITLES.tag, selected: false },
  ],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.forEach((filter) => {
        if (filter.id === action.payload.filterId) {
          filter.selected = !filter.selected;
        } else {
          filter.selected = false;
        }
      });
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
