import firebase from 'firebase';
import { convert } from './common';
import { Adapter } from './adapter';

export class FirebaseAdapter implements Adapter {
  constructor(config) {
    if (!config) {
      throw new Error('Config is missing');
    }

    firebase.initializeApp(config);
  }

  get(key) {
    let ref = firebase.database().ref(key);

    // if (orderKey) {
    //   ref = ref.orderByChild(orderKey);
    //   if (filterValue !== undefined) {
    //     ref = ref.equalTo(convert(filterValue, valueType));
    //   }
    // }

    // return ref
    //   .once('value')
    //   .then(snapshot => {
    //     if (!orderKey) {
    //       return snapshot.val();
    //     }

    //     const data = [];
    //     snapshot.forEach(item => {
    //       if (item.val()) {
    //         data.push(item.val());
    //       }
    //     });
    //     return data;
    //   });
  }

  post(key, data) {
    return firebase
      .database()
      .ref(key)
      .set(data)
  }

  put(key, data) {
    return firebase
      .database()
      .ref()
      .update({
        [key]: data,
      })
  }

  delete(key) {
    return firebase
      .database()
      .ref(key)
      .remove()
  }

  patch(key, value) {}
}
