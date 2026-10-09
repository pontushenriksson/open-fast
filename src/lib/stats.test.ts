import { describe, expect, it } from 'vitest'
import { hoursPerDay, reachedGoal, streaks, summarize } from './stats'
import type { Fast } from './store'

const at = (day: number, hour: number) => new Date(2026, 9, day, hour).getTime()
const fast = (id: string, start: number, end: number, goalHours = 16): Fast => ({ id, start, end, goalHours, planId: '16:8' })
const NOW = at(10, 18)

describe('reachedGoal', () => {
  it('is true when the fast lasted at least the goal', () => {
    expect(reachedGoal(fast('a', at(9, 20), at(10, 12)), NOW)).toBe(true)
    expect(reachedGoal(fast('b', at(9, 20), at(10, 11)), NOW)).toBe(false)
  })
})

describe('hoursPerDay', () => {
  it('splits a fast across midnight', () => {
    const days = hoursPerDay([fast('a', at(9, 20), at(10, 12))], 2, NOW)
    expect(days.map((d) => d.hours)).toEqual([4, 12])
  })
  it('includes a running fast up to now', () => {
    const running: Fast = { id: 'r', start: at(10, 8), goalHours: 16, planId: '16:8' }
    expect(hoursPerDay([running], 1, NOW)[0].hours).toBe(10)
  })
})

describe('streaks', () => {
  it('counts consecutive days with a completed fast', () => {
    const history = [fast('a', at(7, 20), at(8, 12)), fast('b', at(8, 20), at(9, 12)), fast('c', at(9, 20), at(10, 12))]
    expect(streaks(history, NOW)).toEqual({ current: 3, best: 3 })
  })
  it('keeps the current streak alive until today ends', () => {
    const history = [fast('a', at(8, 20), at(9, 12))]
    expect(streaks(history, NOW).current).toBe(1)
  })
  it('ignores fasts that missed the goal', () => {
    const history = [fast('a', at(9, 20), at(10, 6))]
    expect(streaks(history, NOW)).toEqual({ current: 0, best: 0 })
  })
})

describe('summarize', () => {
  it('computes averages and completion rate', () => {
    const history = [fast('a', at(8, 20), at(9, 12)), fast('b', at(9, 20), at(10, 8))]
    const s = summarize(history, NOW)
    expect(s.count).toBe(2)
    expect(s.totalHours).toBe(28)
    expect(s.avgHours).toBe(14)
    expect(s.longestHours).toBe(16)
    expect(s.completionRate).toBe(0.5)
  })
  it('handles an empty history', () => {
    expect(summarize([], NOW)).toMatchObject({ count: 0, avgHours: 0, completionRate: 0 })
  })
})
