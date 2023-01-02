/**
 * @jest-environment node || jsdom
 */
import '@testing-library/jest-dom';
import 'mutationobserver-shim';

const resources: any = {
  en: {},
  es: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Page404: { title: 'Heloo' }
  }
};
const DEFAULT_LOCALE = 'es';

jest.mock('react-i18next', () => ({
  initReactI18next: {
    type: '3rdParty',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init: () => {}
  },
  useTranslation: () => ({
    t: (str: string) => resources[DEFAULT_LOCALE][str] || str,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'es'
    }
  })
}));

jest.mock('i18next', () => ({
  addResources: (lang: 'es' | 'en', ns: string, translations: { [x: string]: any }) =>
    Object.keys(translations).forEach((t: string) => {
      resources[lang][`${ns}:${t}`] = translations[t];
    }),
  use: () => ({ init: jest.fn() })
}));
