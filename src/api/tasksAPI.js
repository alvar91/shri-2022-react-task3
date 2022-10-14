import StorageRequests from "./storageRequests";

import { data } from "../store/data";

const storageRequests = new StorageRequests();
const STORAGE_NAME = "STORAGE_NAME";

export class TasksAPI {
  //   async createTicket({ title, description }) {
  //     const tasks = await this.requestAllTasks();
  //     await this.updateTasks([...tasks, { title, description, id: uuidv4() }]);
  //   }

  async requestTasksWithFilters({ isTags }) {
    const tasks = await this.requestAllTasks();

    if (!tasks.length) {
      return [];
    }

    return tasks.filter(/* делаем логику с isTags */);
  }

  static async requestAllTasks() {
    try {
      let dataStorage = await storageRequests.getItem(STORAGE_NAME);

      if (!dataStorage)
        await storageRequests.setItem(STORAGE_NAME, JSON.stringify(data));

      dataStorage = await storageRequests.getItem(STORAGE_NAME);

      // return storageRequests.getItem(STORAGE_NAME) || [];
      return dataStorage;
    } catch (e) {
      console.error(e.message);
    }
  }

  updateTasks(items) {
    return storageRequests.setItem(STORAGE_NAME, items);
  }
}
