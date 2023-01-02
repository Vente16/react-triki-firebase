const randomStringRange = 16;
export const getRandomString = () => Math.random().toString(randomStringRange).slice(2);
