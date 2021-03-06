export enum EStorageKey {
  HistorySearch = 'HistorySearch',
  IsRememberMe = 'IsRememberMe',
  LastUserPhone = 'LastUserPhone',
  Authorization = 'Authorization'
};

export const local = {

  save: (value: string | number | boolean | Array<String>, key: EStorageKey) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: EStorageKey) => {
    const meta = localStorage.getItem(key);
    return meta
      ? JSON.parse(meta)
      : meta;
  }

}