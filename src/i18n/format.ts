import type { Units } from '../lib/store'
import { HOUR, MINUTE, dayDiff } from '../lib/time'
import type { Locale } from './types'

export const KG_PER_LB = 0.45359237
export const CM_PER_IN = 2.54

/** Locale-aware formatting helpers for dates, durations, numbers and weights. */
export function createFormatter({ intl, ui }: Locale) {
  const timeFmt = new Intl.DateTimeFormat(intl, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  const dayFmt = new Intl.DateTimeFormat(intl, { weekday: 'short', day: 'numeric', month: 'short' })
  const shortDateFmt = new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'short' })
  const weekdayFmt = new Intl.DateTimeFormat(intl, { weekday: 'narrow' })

  const number = (n: number, maxDigits = 1, minDigits = 0) =>
    n.toLocaleString(intl, { maximumFractionDigits: maxDigits, minimumFractionDigits: minDigits })

  /** "today", "yesterday", "tomorrow" or "Fri 9 Oct". */
  const day = (t: number, now = Date.now()) => {
    const diff = dayDiff(t, now)
    if (diff === 0) return ui.common.today
    if (diff === -1) return ui.common.yesterday
    if (diff === 1) return ui.common.tomorrow
    return dayFmt.format(t)
  }

  const time = (t: number) => timeFmt.format(t)

  const weight = (kg: number, units: Units, digits = 1) =>
    units === 'imperial' ? `${number(kg / KG_PER_LB, digits)} lb` : `${number(kg, digits)} kg`

  return {
    number,
    day,
    time,
    /** "today 20:15" */
    when: (t: number) => `${day(t)} ${time(t)}`,
    shortDate: (d: Date | number) => shortDateFmt.format(d),
    weekday: (d: Date | number) => weekdayFmt.format(d),

    /** "16 h 4 min" */
    duration(ms: number) {
      const total = Math.max(0, Math.round(ms / MINUTE))
      const h = Math.floor(total / 60)
      const m = total % 60
      const H = ui.common.hoursShort
      const M = ui.common.minutesShort
      if (h === 0) return `${m} ${M}`
      return m === 0 ? `${h} ${H}` : `${h} ${H} ${m} ${M}`
    },

    /** "16.5 h" */
    hours: (ms: number, digits = 1) => `${number(ms / HOUR, digits)} ${ui.common.hoursShort}`,

    /** Rounded to the nearest 10 – estimates shouldn't look more precise than they are. */
    kcal: (n: number) => `${number(Math.round(n / 10) * 10, 0)} kcal`,

    weight,

    /** Small weights: grams/ounces below 1 kg/lb. */
    smallWeight(kg: number, units: Units) {
      if (units === 'imperial') {
        const lb = kg / KG_PER_LB
        return lb < 1 ? `${number(lb * 16, 1)} oz` : `${number(lb, 1)} lb`
      }
      return kg < 1 ? `${number(Math.round(kg * 200) * 5, 0)} g` : `${number(kg, 1)} kg`
    },

    weightRange(minKg: number, maxKg: number, units: Units) {
      const f = units === 'imperial' ? 1 / KG_PER_LB : 1
      const unit = units === 'imperial' ? 'lb' : 'kg'
      return `${number(minKg * f, 1)}–${number(maxKg * f, 1)} ${unit}`
    },
  }
}

export type Formatter = ReturnType<typeof createFormatter>
