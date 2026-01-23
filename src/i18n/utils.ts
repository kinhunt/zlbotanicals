import { defaultLang, type Language } from './config';
import en from './translations/en.json';
import zh from './translations/zh.json';

const translations = { en, zh } as const;

type NestedKeyOf<T, K extends string = ''> = T extends object
  ? {
      [P in keyof T & string]: T[P] extends object
        ? NestedKeyOf<T[P], K extends '' ? P : `${K}.${P}`>
        : K extends ''
        ? P
        : `${K}.${P}`;
    }[keyof T & string]
  : never;

type TranslationKey = NestedKeyOf<typeof en>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    const translation = translations[lang] ?? translations[defaultLang];
    return getNestedValue(translation as Record<string, unknown>, key);
  };
}

export function getStaticPathsForLanguages() {
  return [{ params: { lang: undefined } }, { params: { lang: 'zh' } }];
}
