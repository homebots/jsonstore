import { Adapter } from "./adapter";
import { get, set, merge } from 'lodash';

const notFound = new Error('NOT_FOUND');
const pathReplace = (path) => path.replace(/\//g, '.').replace(/^\.|\.$/g, '');

export class InMemoryAdapter implements Adapter {
  protected storage = {};

  get(path) {
    const content = get(this.storage, pathReplace(path));

    return content !== undefined ?
      Promise.resolve(content) :
      Promise.reject(notFound);
  }

  post(path, data) {
    set(this.storage, pathReplace(path), data);
    return Promise.resolve('');
  }

  put(path, data) {
    set(this.storage, pathReplace(path), data);
    return Promise.resolve('');
  }

  patch(path, data) {
    const value = get(this.storage, pathReplace(path), data);

    if (value && typeof value === 'object') {
      set(this.storage, pathReplace(path), merge(value, data));
    } else {
      set(this.storage, pathReplace(path), data);
    }

    return Promise.resolve('');
  }

  delete(path, data) {
    set(this.storage, pathReplace(path), undefined);
    return Promise.resolve('');
  }
};
