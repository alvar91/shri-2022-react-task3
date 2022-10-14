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
  const { source, destination } = action.payload;
  if (source.droppableId === destination.droppableId) {
    const list = state.lists[source.droppableId];
    const copiedTasks = [...list.tasks];
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);

    state.lists = {
      ...state.lists,
      [source.droppableId]: {
        ...list,
        tasks: copiedTasks,
      },
    };
  } else {
    const sourceList = state.lists[source.droppableId];
    const destinationList = state.lists[destination.droppableId];
    const sourceTasks = [...sourceList.tasks];
    const destinationTasks = [...destinationList.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removed);

    state.lists = {
      ...state.lists,
      [source.droppableId]: {
        ...sourceList,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destinationList,
        tasks: destinationTasks,
      },
    };
  }
}

export function removeTaskReducer(state, action) {
  state.lists = action.payload;
}
