const setItem = ([key, data]) => window.localStorage.setItem(key, JSON.stringify(data));

const getItem = (key) => JSON.parse(window.localStorage.getItem(key));

class StorageRequest {
  setItem(...args) {
    return this.__makeRequest(setItem, args);
  }

  getItem(key) {
    return this.__makeRequest(getItem, key);
  }

  __makeRequest(handler, ...args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = handler(...args);
        resolve(response);
      }, 100);
    });
  }
}

export default StorageRequest;
