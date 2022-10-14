import { v4 as uuid } from "uuid";

import StorageRequests from "./storageRequests";

import { data } from "../store/data";

const storageRequests = new StorageRequests();
const STORAGE_NAME = "STORAGE_NAME";

function updateList(newLists, key, list, tasks) {
  newLists[key] = { ...list, tasks };
}
export class TasksAPI {
  static async getDataStorage() {
    return await storageRequests.getItem(STORAGE_NAME);
  }

  static async requestAllTasks() {
    try {
      let dataStorage = await TasksAPI.getDataStorage();

      if (!dataStorage) {
        await storageRequests.setItem(STORAGE_NAME, data);
        dataStorage = await this.getDataStorage();
      }

      return dataStorage;
    } catch (e) {
      console.error(e.message);
    }
  }

  static async addTask({ listId, task }) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage)
        throw new Error(`Storage ${STORAGE_NAME} does not exist`);

      const newTask = {
        id: uuid(),
        comments: [],
        ...task,
      };

      dataStorage[listId].tasks.push(newTask);

      await storageRequests.setItem(STORAGE_NAME, dataStorage);

      return { listId, newTask };
    } catch (e) {
      console.error(e.message);
    }
  }

  static async removeTask({ id }) {
    try {
      const dataStorage = await TasksAPI.getDataStorage();
      if (!dataStorage)
        throw new Error(`Storage ${STORAGE_NAME} does not exist`);

      let newLists = {};

      const listsEntries = Object.entries(dataStorage);

      for (let [key, list] of listsEntries) {
        let tasks = list.tasks.filter((task) => task.id !== id);

        updateList(newLists, key, list, tasks);
      }

      await storageRequests.setItem(STORAGE_NAME, newLists);

      return newLists;
    } catch (e) {
      console.error(e.message);
    }
  }

  static async editTask(data) {
    try {
        const dataStorage = await TasksAPI.getDataStorage();
        if (!dataStorage)
          throw new Error(`Storage ${STORAGE_NAME} does not exist`);
  
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
        console.error(e.message);
      }
  }

//   static updateTasks(items) {
//     return storageRequests.setItem(STORAGE_NAME, items);
//   }
}
