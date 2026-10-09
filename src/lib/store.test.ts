import { describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, normalize } from './store'

describe('normalize', () => {
  it('returns defaults for empty input', () => {
    const s = normalize(undefined)
    expect(s.history).toEqual([])
    expect(s.active).toBeNull()
    expect(s.settings).toEqual(DEFAULT_SETTINGS)
  })
  it('drops malformed fasts and unfinished history entries', () => {
    const s = normalize({
      history: [
        { id: 'a', start: 1, end: 2, goalHours: 16, planId: '16:8' },
        { id: 'b', start: 1, goalHours: 16 },
        { nope: true },
      ],
    })
    expect(s.history.map((f) => f.id)).toEqual(['a'])
  })
  it('fills in settings added in later versions', () => {
    const s = normalize({ settings: { planId: '18:6', theme: 'dark' } })
    expect(s.settings.planId).toBe('18:6')
    expect(s.settings.language).toBe('auto')
    expect(s.settings.profile.activity).toBe('light')
  })
})
