import { createSelector } from "@reduxjs/toolkit";
import { FILTER_TITLES } from "../constants";

export const selectLists = (state) => state.lists.lists;
export const selectFirstListId = (state) => Object.entries(state.lists.lists).find(([id, {title}]) => title === "Todo")[0];

export const selectFilters = (state) => state.filters.filters;

export const selectTask = (state) => state.task.task;

export const selectListsByFilter = createSelector(
  [selectLists, selectFilters, selectFirstListId],
  (lists, filters) => {
    const activeFilter = filters.find((filter) => filter.selected);

    if (!activeFilter) {
      return lists;
    }

    const filteredLists = {};

    function updateLists(key, filteredTasks) {
      filteredLists[key] = { ...lists[key], tasks: filteredTasks };
    }

    const listsEntries = Object.entries(lists);

    if (FILTER_TITLES.comment === activeFilter.text) {
      for (const [key, { tasks }] of listsEntries) {
        const filteredTasks = tasks.filter(
          ({ comments }) => comments.length > 0
        );
        updateLists(key, filteredTasks);
      }
    }

    if (FILTER_TITLES.description === activeFilter.text) {
      for (const [key, { tasks }] of listsEntries) {
        const filteredTasks = tasks.filter(
          ({ description }) => description !== ""
        );
        updateLists(key, filteredTasks);
      }
    }

    if (FILTER_TITLES.tag === activeFilter.text) {
      for (const [key, { tasks }] of listsEntries) {
        const filteredTasks = tasks.filter(({ tags }) => tags.length > 0);
        updateLists(key, filteredTasks);
      }
    }

    return filteredLists;
  }
);