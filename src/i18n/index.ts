import { useStore, type LanguageSetting } from '../lib/store'
import { createFormatter, type Formatter } from './format'
import { en } from './locales/en'
import { sv } from './locales/sv'
import type { Lang, Locale } from './types'

export type { Lang, Locale, Messages } from './types'

export const LOCALES: Record<Lang, Locale> = { en, sv }

/** Languages offered in Settings, labelled in their own language. */
export const LANGUAGES: { id: Lang; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'sv', label: 'Svenska' },
]

/** The user's most preferred language that the app supports, falling back to English. */
export function detectLang(languages: readonly string[] = typeof navigator === 'undefined' ? [] : navigator.languages): Lang {
  for (const tag of languages) {
    const base = tag.toLowerCase().split('-')[0]
    if (Object.hasOwn(LOCALES, base)) return base as Lang
  }
  return 'en'
}

export function resolveLang(setting: LanguageSetting): Lang {
  return setting === 'auto' ? detectLang() : setting
}

export interface I18n extends Locale {
  /** Formatting helpers bound to this locale. */
  f: Formatter
}

const cache = new Map<Lang, I18n>()

export function getI18n(lang: Lang): I18n {
  let value = cache.get(lang)
  if (!value) {
    const locale = LOCALES[lang]
    value = { ...locale, f: createFormatter(locale) }
    cache.set(lang, value)
  }
  return value
}

/** The active locale (texts + formatters), following the language setting. */
export function useI18n(): I18n {
  const { settings } = useStore()
  return getI18n(resolveLang(settings.language))
}
