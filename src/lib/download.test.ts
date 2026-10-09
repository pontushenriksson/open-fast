import { describe, expect, it } from 'vitest'
import { buildReminder } from './download'

describe('buildReminder', () => {
  it('creates a calendar event with an alarm at the given time', () => {
    const ics = buildReminder(Date.UTC(2026, 9, 9, 18, 30), 'Fast done; eat', 'Line one')
    expect(ics).toContain('DTSTART:20261009T183000Z')
    expect(ics).toContain(String.raw`SUMMARY:Fast done\; eat`)
    expect(ics).toContain('BEGIN:VALARM')
    expect(ics.split('\r\n')[0]).toBe('BEGIN:VCALENDAR')
  })
})
