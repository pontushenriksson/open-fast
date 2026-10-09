import { describe, expect, it } from 'vitest'
import { FOOD_IDS } from '../content/foods'
import { PHASE_IDS } from '../content/phases'
import { PLAN_IDS } from '../content/plans'
import { RESEARCH_IDS } from '../content/research'
import { detectLang, getI18n, LOCALES } from '.'
import { en } from './locales/en'

/** Collects every leaf path of an object, e.g. "timer.startNow". Functions and strings are leaves. */
function leaves(value: unknown, prefix = ''): string[] {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

describe('translations', () => {
  const locales = Object.values(LOCALES)

  it.each(locales)('$lang has exactly the same UI keys as English', (locale) => {
    expect(leaves(locale.ui).sort()).toEqual(leaves(en.ui).sort())
  })

  it.each(locales)('$lang has no empty strings (except optional link fields)', (locale) => {
    const empty = leaves(locale.ui).filter((path) => {
      const v = path.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], locale.ui)
      return v === ''
    })
    expect(empty.every((p) => p.startsWith('safety.edLink'))).toBe(true)
  })

  it.each(locales)('$lang translates every plan, phase, food and research item', (locale) => {
    expect(Object.keys(locale.plans).sort()).toEqual([...PLAN_IDS].sort())
    expect(Object.keys(locale.phases).sort()).toEqual([...PHASE_IDS].sort())
    expect(Object.keys(locale.foods).sort()).toEqual([...FOOD_IDS].sort())
    expect(Object.keys(locale.research).sort()).toEqual([...RESEARCH_IDS].sort())
  })

  it.each(locales)('$lang phases have full "read more" content', (locale) => {
    for (const id of PHASE_IDS) {
      const p = locale.phases[id]
      expect(p.title && p.short && p.body && p.fuel && p.feel).toBeTruthy()
      expect(p.tips.length).toBeGreaterThan(0)
    }
  })

  it.each(locales)('$lang guide lists match English in length', (locale) => {
    expect(locale.guide.notFor).toHaveLength(en.guide.notFor.length)
    expect(locale.guide.stopSigns).toHaveLength(en.guide.stopSigns.length)
    expect(locale.guide.faq).toHaveLength(en.guide.faq.length)
    expect(locale.guide.tipGroups.map((g) => g.items.length)).toEqual(en.guide.tipGroups.map((g) => g.items.length))
  })
})

describe('language detection', () => {
  it('picks the most preferred supported language', () => {
    expect(detectLang(['sv-SE', 'en'])).toBe('sv')
    expect(detectLang(['en-GB', 'en-SE', 'sv-SE'])).toBe('en')
    expect(detectLang(['de-DE', 'sv'])).toBe('sv')
  })
  it('falls back to English', () => {
    expect(detectLang(['de-DE'])).toBe('en')
    expect(detectLang([])).toBe('en')
  })
})

describe('formatting', () => {
  it('formats durations and weights per locale', () => {
    expect(getI18n('en').f.duration(16 * 3_600_000 + 4 * 60_000)).toBe('16 h 4 min')
    expect(getI18n('sv').f.weight(82.5, 'metric')).toBe('82,5 kg')
    expect(getI18n('en').f.weight(82.5, 'metric')).toBe('82.5 kg')
    expect(getI18n('en').f.weight(1, 'imperial')).toBe('2.2 lb')
    expect(getI18n('en').f.smallWeight(0.173, 'metric')).toBe('175 g')
  })
})
