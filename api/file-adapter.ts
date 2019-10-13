import * as fs from 'fs';
import { Adapter } from './adapter';
import { InMemoryAdapter } from './in-memory-adapter';

export class FileAdapter extends InMemoryAdapter implements Adapter {
  storage: object = {};

  constructor(private filePath: string) {
    super();
    this.readContent();
  }

  readContent() {
    if (fs.existsSync(this.filePath)) {
      this.storage = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }
  }

  writeContent() {
    fs.writeFile(this.filePath, JSON.stringify(this.storage), () => {});
  }

  patch(key, data) {
    const output = super.patch(key, data);
    this.writeContent();
    return output;
  }

  post(key, data) {
    const output = super.post(key, data);
    this.writeContent();
    return output;
  }

  put(key, data) {
    const output = super.put(key, data);
    this.writeContent();
    return output;
  }

  delete(key, data) {
    const output = super.delete(key, data);
    this.writeContent();
    return output;
  }
};
