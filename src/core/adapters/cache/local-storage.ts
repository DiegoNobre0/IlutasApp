// import { MMKV } from "react-native-mmkv";
import * as storage from 'expo-secure-store';

type GetStorageInput = {
  key: string;
};

type SetStorageInput = {
  key: string;
  value: any;
};

type RemoveStorageInput = {
  key: string;
};

// const storage = {
//   getString: (key: string) => undefined,
//   set: (key: string, value: string) => undefined,
//   delete: (key: string) => undefined,
// }

export const get = ({ key }: GetStorageInput) => {
  const value = storage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};

export const set = ({ key, value }: SetStorageInput) => {
  storage.setItem(key, JSON.stringify(value));
};

export const remove = ({ key }: RemoveStorageInput) => {
  storage.deleteItemAsync(key);
};
