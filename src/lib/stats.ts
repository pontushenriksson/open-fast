import type { Fast } from './store'
import { HOUR, dateKey, fromDateKey, startOfDay } from './time'

export const fastEnd = (f: Fast, now: number) => f.end ?? now
export const fastLength = (f: Fast, now: number) => fastEnd(f, now) - f.start
export const reachedGoal = (f: Fast, now: number) => fastLength(f, now) >= f.goalHours * HOUR

export interface DayHours {
  date: Date
  hours: number
}

/** Fasting hours per calendar day for the last `days` days. Fasts spanning midnight are split. */
export function hoursPerDay(fasts: Fast[], days: number, now: number): DayHours[] {
  const today = startOfDay(now)
  const out: DayHours[] = []
  for (let i = days - 1; i >= 0; i--) {
    const from = new Date(today)
    from.setDate(from.getDate() - i)
    const to = new Date(from)
    to.setDate(to.getDate() + 1)
    let ms = 0
    for (const f of fasts) {
      const a = Math.max(f.start, from.getTime())
      const b = Math.min(fastEnd(f, now), to.getTime())
      if (b > a) ms += b - a
    }
    out.push({ date: from, hours: ms / HOUR })
  }
  return out
}

/** Days (YYYY-MM-DD) on which a fast that reached its goal ended. */
function completedDays(fasts: Fast[], now: number): Set<string> {
  const days = new Set<string>()
  for (const f of fasts) if (f.end && reachedGoal(f, now)) days.add(dateKey(f.end))
  return days
}

/**
 * Current and best streak of consecutive days with a completed fast.
 * The current streak still counts if today's fast isn't finished yet.
 */
export function streaks(fasts: Fast[], now: number): { current: number; best: number } {
  const days = completedDays(fasts, now)
  if (days.size === 0) return { current: 0, best: 0 }

  let current = 0
  const cursor = startOfDay(now)
  if (!days.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (days.has(dateKey(cursor))) {
    current++
    cursor.setDate(cursor.getDate() - 1)
  }

  const sorted = [...days].sort()
  let best = 1
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    const gap = Math.round((fromDateKey(sorted[i]).getTime() - fromDateKey(sorted[i - 1]).getTime()) / (24 * HOUR))
    run = gap === 1 ? run + 1 : 1
    best = Math.max(best, run)
  }
  return { current, best: Math.max(best, current) }
}

export interface Summary {
  count: number
  totalHours: number
  avgHours: number
  longestHours: number
  completionRate: number
  currentStreak: number
  bestStreak: number
  last7Hours: number
}

export function summarize(history: Fast[], now: number): Summary {
  const lengths = history.map((f) => fastLength(f, now) / HOUR)
  const total = lengths.reduce((a, b) => a + b, 0)
  const completed = history.filter((f) => reachedGoal(f, now)).length
  const { current, best } = streaks(history, now)
  return {
    count: history.length,
    totalHours: total,
    avgHours: history.length ? total / history.length : 0,
    longestHours: lengths.length ? Math.max(...lengths) : 0,
    completionRate: history.length ? completed / history.length : 0,
    currentStreak: current,
    bestStreak: best,
    last7Hours: hoursPerDay(history, 7, now).reduce((a, d) => a + d.hours, 0),
  }
}
