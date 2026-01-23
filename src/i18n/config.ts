export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
