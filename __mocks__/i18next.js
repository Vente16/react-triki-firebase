const resources = {
  en: {},
  es: {}
};

const DEFAULT_LOCALE = 'es';

module.export = {
  addResources: (lang, ns, translations) =>
    Object.keys(translations).forEach(t => {
      resources[lang][`${ns}:${t}`] = translations[t];
    }),
  t: str => resources[DEFAULT_LOCALE][str] || str
};
