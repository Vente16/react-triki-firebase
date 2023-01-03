import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItemLocalStorage, setItemLocalStorage } from '@utils/localStorageUtils';

type Language = 'es' | 'en';
interface LanguageState {
  language: Language;
}

const getLanguage = getItemLocalStorage('language');
const initLanguage: Language = getLanguage ? getLanguage : 'en';
const initialState: LanguageState = {
  language: initLanguage
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      const { payload } = action;
      state.language = payload;
      setItemLocalStorage('language', payload);
    }
  }
});

export default languageSlice.reducer;
