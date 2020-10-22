export enum EStorageKey {
  HistorySearch = 'HistorySearch'
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