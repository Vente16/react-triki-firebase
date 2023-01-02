/* eslint-disable import/no-unresolved */
import '@mocks/localStorage';
import { getItemLocalStorage, setItemLocalStorage } from '@utils/localStorageUtils';

describe('localStorage items: ', () => {
  afterAll(() => {
    window.localStorage.clear();
  });

  const value = 'John';
  test('Setting item to localStorage', () => {
    setItemLocalStorage('test', value);
    const { localStorage } = window;
    const result = JSON.parse(localStorage.getItem('test') || '');
    expect(result).toBe(value);
  });
  test('Getting item from localStorage', () => {
    const result = getItemLocalStorage('test');
    expect(result).toBe(value);
  });
});
