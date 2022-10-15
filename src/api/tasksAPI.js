import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

import StorageRequests from "./storageRequests";

import { data } from "../store/data";

const storageRequests = new StorageRequests();
const STORAGE_NAME = "STORAGE_NAME";

const storageNotExistMessage = `Хранилище ${STORAGE_NAME} не существует`;
const storageInitMessage = `Хранилище ${STORAGE_NAME} успешно инициализировано`;

function updateList(newLists, key, list, tasks) {
  newLists[key] = { ...list, tasks };
}
export class TasksAPI {
  static async getDataStorage() {
    return await storageRequests.getItem(STORAGE_NAME);
  }

  static async getAllTasks() {
    try {
      let dataStorage = await TasksAPI.getDataStorage();

      if (!dataStorage) {
        await storageRequests.setItem(STORAGE_NAME, data);
        toast.success(storageInitMessage);
        return;
      }

      return dataStorage;
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }

  static async addTask({ listId, task }) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage) throw new Error(storageNotExistMessage);

      const newTask = {
        id: uuid(),
        comments: [],
        tags: [],
        ...task,
      };

      dataStorage[listId].tasks.push(newTask);

      await storageRequests.setItem(STORAGE_NAME, dataStorage);

      return { listId, newTask };
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }

  static async removeTask({ id }) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage) throw new Error(storageNotExistMessage);

      let newLists = {};

      const listsEntries = Object.entries(dataStorage);

      for (let [key, list] of listsEntries) {
        let tasks = list.tasks.filter((task) => task.id !== id);

        updateList(newLists, key, list, tasks);
      }

      await storageRequests.setItem(STORAGE_NAME, newLists);

      return newLists;
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }

  static async editTask(data) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage) throw new Error(storageNotExistMessage);

      let newLists = {};

      const listsEntries = Object.entries(dataStorage);

      for (const [key, list] of listsEntries) {
        const tasks = list.tasks.map((task) => {
          if (task.id === data.id) {
            return data;
          } else {
            return { ...task };
          }
        });

        updateList(newLists, key, list, tasks);
      }

      await storageRequests.setItem(STORAGE_NAME, newLists);

      return newLists;
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }

  static async moveTask({ source, destination }) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage) throw new Error(storageNotExistMessage);

      if (source.droppableId === destination.droppableId) {
        const list = dataStorage[source.droppableId];
        const copiedTasks = [...list.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);

        const newLists = {
          ...dataStorage,
          [source.droppableId]: {
            ...list,
            tasks: copiedTasks,
          },
        };

        await storageRequests.setItem(STORAGE_NAME, newLists);

        return newLists;
      } else {
        const sourceList = dataStorage[source.droppableId];
        const destinationList = dataStorage[destination.droppableId];
        const sourceTasks = [...sourceList.tasks];
        const destinationTasks = [...destinationList.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, removed);

        const newLists = {
          ...dataStorage,
          [source.droppableId]: {
            ...sourceList,
            tasks: sourceTasks,
          },
          [destination.droppableId]: {
            ...destinationList,
            tasks: destinationTasks,
          },
        };

        await storageRequests.setItem(STORAGE_NAME, newLists);

        return newLists;
      }
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }

  static async getTask(taskId) {
    try {
      let dataStorage = await TasksAPI.getDataStorage();

      if (!dataStorage) {
        await storageRequests.setItem(STORAGE_NAME, data);
        toast.success(storageInitMessage);
        return;
      }

      const currentTask = Object.values(dataStorage)
        .map(({ tasks }) => tasks)
        .flat()
        .find(({ id }) => id === taskId);

      if (currentTask === undefined) {
        throw new Error(`Задача ${taskId} не существует`);
      }

      return currentTask;
    } catch (e) {
      toast.error(`${e.message}`);
      console.error(e.message);
    }
  }
}
