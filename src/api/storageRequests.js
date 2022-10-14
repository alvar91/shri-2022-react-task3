const setItem = ([key, data]) => window.localStorage.setItem(key, data);

const getItem = (key) => window.localStorage.getItem(key);

class StorageRequest {
  initiateItems() {}

  setItems() {}

  setItem(...args) {
    return this.__makeRequest(setItem, args);
  }

  getItem(key) {
    return this.__makeRequest(getItem, key);
  }

  removeItem(...args) {
    return this.__makeRequest(localStorage.removeItem, ...args);
  }

  __makeRequest(handler, ...args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = handler(...args);
        // resolve(response || { message: "ok" });
        resolve(response);
      }, 1000);
    });
  }
}

export default StorageRequest;