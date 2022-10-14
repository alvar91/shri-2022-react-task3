import { v4 as uuid } from "uuid";

import StorageRequests from "./storageRequests";

import { data } from "../store/data";

const storageRequests = new StorageRequests();
const STORAGE_NAME = "STORAGE_NAME";

export class TasksAPI {
  static async addTask({ listId, task }) {
    try {
      let dataStorage = await storageRequests.getItem(STORAGE_NAME);
      if (!dataStorage)
        throw new Error(`Storage ${STORAGE_NAME} does not exist`);

      const newTask = {
        id: uuid(),
        ...task,
        comments: [],
      };

      dataStorage[listId].tasks.push(newTask);

      await storageRequests.setItem(STORAGE_NAME, dataStorage);

      return {listId, newTask};
    } catch (e) {
      console.error(e.message);
    }
  }

  //   async requestTasksWithFilters({ isTags }) {
  //     const tasks = await this.requestAllTasks();

  //     if (!tasks.length) {
  //       return [];
  //     }

  //     return tasks.filter(/* делаем логику с isTags */);
  //   }

  static async requestAllTasks() {
    try {
      let dataStorage = await storageRequests.getItem(STORAGE_NAME);

      if (!dataStorage) {
        await storageRequests.setItem(STORAGE_NAME, data);
        dataStorage = await storageRequests.getItem(STORAGE_NAME);
      }

      // return storageRequests.getItem(STORAGE_NAME) || [];
      return dataStorage;
    } catch (e) {
      console.error(e.message);
    }
  }

  static updateTasks(items) {
    return storageRequests.setItem(STORAGE_NAME, items);
  }
}
