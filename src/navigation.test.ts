import { describe, expect, it } from 'vitest'
import { parseHash, toHash } from './navigation'

describe('navigation', () => {
  it('parses tabs and learn sections', () => {
    expect(parseHash('#learn/body')).toEqual({ tab: 'learn', section: 'body' })
    expect(parseHash('#progress')).toEqual({ tab: 'progress', section: 'methods' })
  })
  it('falls back to the timer for unknown hashes', () => {
    expect(parseHash('#nope/what')).toEqual({ tab: 'timer', section: 'methods' })
    expect(parseHash('')).toEqual({ tab: 'timer', section: 'methods' })
  })
  it('round-trips', () => {
    expect(parseHash(toHash('learn', 'estimates'))).toEqual({ tab: 'learn', section: 'estimates' })
    expect(toHash('check', 'tips')).toBe('#check')
  })
})
