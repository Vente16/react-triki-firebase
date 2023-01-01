import { NullableString, GenericObject } from '../interfaces/globalInterfaces';

export const setItemLocalStorage = (key: string, value: GenericObject | string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocalStorage = (key: string) => {
  const data: NullableString = localStorage.getItem(key);
  return data ? JSON.parse(data) : data;
};
