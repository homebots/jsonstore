import { Adapter } from "./adapter";
import { get, merge } from 'lodash';

const notFound = new Error('NOT_FOUND');
const pathReplace = (path) => path.split('/').join('.').replace(/^\.|\.$/g, '');

export class InMemoryAdapter implements Adapter {
  constructor(public content = {}) {}

  get(path) {
    const content = get(this.content, pathReplace(path));

    return content !== undefined ?
      Promise.resolve(content) :
      Promise.reject(notFound);
  }

  post(path, data) {
    console.log(path, data);
    console.log(this.content);
    set(this.content, pathReplace(path), data);
    console.log(this.content);

    return Promise.resolve('');
  }

  put(path, data) {
    set(this.content, pathReplace(path), data);
    return Promise.resolve('');
  }

  patch(path, data) {
    const value = get(this.content, pathReplace(path), data);

    if (value && typeof value === 'object') {
      set(this.content, pathReplace(path), merge(value, data));
    } else {
      set(this.content, pathReplace(path), data);
    }

    return Promise.resolve('');
  }

  delete(path) {
    set(this.content, pathReplace(path), null);
    return Promise.resolve('');
  }
};

function set(target, path, value) {
  const segments = path.split('.');
  const property = segments.pop();

  let segment: string;

  while (segment = segments.shift()) {
    if (target[segment] === undefined) {
      target[segment] = {};
    }

    target = target[segment];
  }

  target[property] = value;
}
