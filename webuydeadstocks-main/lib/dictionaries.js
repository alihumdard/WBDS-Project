import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (typeof dictionaries[locale] !== 'function') {
    return dictionaries.en();
  }
  return await dictionaries[locale]();
};
