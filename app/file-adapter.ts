import * as fs from 'fs';
import * as Path from 'path';
import { Adapter } from './adapter';
import { InMemoryAdapter } from './in-memory-adapter';

export class FileAdapter implements Adapter {
  storage: object = {};

  constructor(private dataFolder: string) {}

  writeContent(hash, storage) {
    fs.writeFile(Path.join(this.dataFolder, hash), JSON.stringify(storage), () => {});
  }

  private splitHashAndPath(key) {
    const hash = key.slice(1, 65);
    const path = key.slice(66);

    return { hash, path };
  }

  private createInMemoryBuffer(hash) {
    const filePath = Path.join(this.dataFolder, hash);
    let content = {};

    if (fs.existsSync(filePath)) {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    console.log('path', filePath, content);

    return new InMemoryAdapter(content);
  }

  get(key: string) {
    const { hash, path } = this.splitHashAndPath(key);
    const buffer = this.createInMemoryBuffer(hash);

    return buffer.get(path);
  }

  patch(key, data) {
    const { hash, path } = this.splitHashAndPath(key);
    const buffer = this.createInMemoryBuffer(hash);

    const output = buffer.patch(path, data);
    this.writeContent(hash, buffer.content);
    return output;
  }

  post(key, data) {
    const { hash, path } = this.splitHashAndPath(key);
    const buffer = this.createInMemoryBuffer(hash);

    const output = buffer.post(path, data);
    this.writeContent(hash, buffer.content);
    return output;
  }

  put(key, data) {
    const { hash, path } = this.splitHashAndPath(key);
    const buffer = this.createInMemoryBuffer(hash);

    const output = buffer.put(path, data);
    this.writeContent(hash, buffer.content);
    return output;
  }

  delete(key) {
    const { hash, path } = this.splitHashAndPath(key);
    const buffer = this.createInMemoryBuffer(hash);

    const output = buffer.delete(path);
    this.writeContent(hash, buffer.content);
    return output;
  }
};
