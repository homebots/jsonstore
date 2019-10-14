export interface Adapter {
  get(path: string);
  post(path: string, value: any);
  put(path: string, value: any);
  patch(path: string, value: any);
  delete(path: string, value: any);
}
