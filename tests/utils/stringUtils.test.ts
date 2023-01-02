import { getRandomString } from '@utils/stringUtils';

describe('Get a random string', () => {
  test('Checking size string', () => {
    const defaultSize = 16;
    expect(getRandomString().length).toBeLessThan(defaultSize);
  });

  test('Checking alphanumeric', () => {
    expect(getRandomString()).toMatch(/^[a-z0-9]+$/i);
  });
});
