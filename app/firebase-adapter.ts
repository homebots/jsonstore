import * as firebase from 'firebase';
import { Adapter } from './adapter';

export class FirebaseAdapter implements Adapter {
  app: firebase.app.App;

  constructor(config: object) {
    if (!config) {
      throw new Error('Config is missing');
    }

    this.app = firebase.initializeApp(config);
  }

  get firebase() {
    return firebase.database(this.app);
  }

  async get(path: string) {
    const snapshot = await this.firebase.ref(path).once('value');
    return snapshot.val();
  }

  post(path: string, data: any) {
    return this.firebase.ref(path).set(data);
  }

  put(path: string, data: any) {
    return this.firebase.ref().update({
      [path]: data,
    })
  }

  delete(path: string) {
    return this.firebase.ref(path).remove()
  }

  patch() {
    return Promise.reject(null);
  }
}
