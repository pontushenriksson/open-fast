import { describe, expect, it } from 'vitest'
import { HOUR, MINUTE, clock, dateKey, dayDiff, fromLocalInput, toLocalInput } from './time'

describe('clock', () => {
  it('formats hours, minutes and seconds', () => {
    expect(clock(16 * HOUR + 4 * MINUTE + 9000)).toBe('16:04:09')
  })
  it('handles durations over 24 hours', () => {
    expect(clock(36 * HOUR)).toBe('36:00:00')
  })
  it('clamps negative values to zero', () => {
    expect(clock(-5000)).toBe('00:00:00')
  })
})

describe('local input conversion', () => {
  it('round-trips to minute precision', () => {
    const t = new Date(2026, 9, 9, 20, 15).getTime()
    expect(toLocalInput(t)).toBe('2026-10-09T20:15')
    expect(fromLocalInput(toLocalInput(t))).toBe(t)
  })
  it('returns null for invalid input', () => {
    expect(fromLocalInput('not a date')).toBeNull()
  })
})

describe('dates', () => {
  it('builds local date keys', () => {
    expect(dateKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05')
  })
  it('counts calendar days, not 24-hour periods', () => {
    const lateEvening = new Date(2026, 9, 9, 23, 30).getTime()
    const earlyMorning = new Date(2026, 9, 10, 0, 30).getTime()
    expect(dayDiff(earlyMorning, lateEvening)).toBe(1)
  })
})
