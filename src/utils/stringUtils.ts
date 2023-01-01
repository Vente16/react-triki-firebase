const sizeRandomString = 16;
export const getRandomString = () => Math.random().toString(sizeRandomString).slice(2);
