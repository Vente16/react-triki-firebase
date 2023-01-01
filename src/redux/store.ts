import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user';
import languageReducer from './reducers/language';

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
