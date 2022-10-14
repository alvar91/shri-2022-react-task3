export function getAllTasksReducer(state, action) {
  state.lists = action.payload;
}

export function addTaskReducer(state, action) {
  state.lists[action.payload.listId].tasks.push({
    ...action.payload.newTask,
  });
}

export function editTaskReducer(state, action) {
  state.lists = action.payload;
}

export function moveTaskReducer(state, action) {
  state.lists = action.payload;
}

export function removeTaskReducer(state, action) {
  state.lists = action.payload;
}
