let mockStorage = {} as { [key: string]: any };

// eslint-disable-next-line no-multi-assign
export const window = {
  localStorage: {
    setItem: (key: string, val: any) => Object.assign(mockStorage, { [key]: val }),
    getItem: (key: string) => mockStorage[key],
    clear: () => (mockStorage = {})
  }
};
