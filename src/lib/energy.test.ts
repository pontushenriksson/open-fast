import { describe, expect, it } from 'vitest'
import { DEFAULT_KCAL_PER_DAY, KCAL_PER_KG_FAT, dailyEnergy, estimateFast, restingEnergy } from './energy'

describe('restingEnergy (Mifflin–St Jeor)', () => {
  it('matches the published equation for men and women', () => {
    // 10×80 + 6.25×180 − 5×30 + 5 = 1780
    expect(restingEnergy({ sex: 'male', age: 30, heightCm: 180, weightKg: 80, activity: 'sedentary' })).toBe(1780)
    // 10×65 + 6.25×165 − 5×40 − 161 = 1320.25
    expect(restingEnergy({ sex: 'female', age: 40, heightCm: 165, weightKg: 65, activity: 'sedentary' })).toBeCloseTo(1320.25)
  })
  it('needs age, height and weight', () => {
    expect(restingEnergy({ sex: 'male', age: 30, activity: 'light' })).toBeNull()
  })
  it('ignores implausible values', () => {
    expect(restingEnergy({ sex: 'male', age: 3441, heightCm: 180, weightKg: 80, activity: 'light' })).toBeNull()
    expect(restingEnergy({ sex: 'male', age: 30, heightCm: 18, weightKg: 80, activity: 'light' })).toBeNull()
  })
})

describe('dailyEnergy', () => {
  it('falls back to the default without a complete profile', () => {
    expect(dailyEnergy({ sex: 'unspecified', activity: 'light' })).toEqual({
      kcalPerDay: DEFAULT_KCAL_PER_DAY,
      personalized: false,
    })
  })
  it('uses the latest logged weight when the profile has none', () => {
    const e = dailyEnergy({ sex: 'male', age: 30, heightCm: 180, activity: 'sedentary' }, 80)
    expect(e).toEqual({ kcalPerDay: Math.round(1780 * 1.2), personalized: true })
  })
})

describe('estimateFast', () => {
  it('scales energy with hours fasted', () => {
    const e = estimateFast(12, 2400)
    expect(e.kcal).toBe(1200)
    expect(e.fatKg).toBeCloseTo(1200 / KCAL_PER_KG_FAT)
  })
  it('interpolates the typical scale range', () => {
    expect(estimateFast(0, 2000).scaleKg).toEqual([0, 0])
    expect(estimateFast(16, 2000).scaleKg).toEqual([0.3, 0.7])
    const [min, max] = estimateFast(20, 2000).scaleKg
    expect(min).toBeCloseTo(0.4)
    expect(max).toBeCloseTo(0.95)
  })
  it('caps the scale range beyond the table', () => {
    expect(estimateFast(100, 2000).scaleKg).toEqual([1.5, 3.0])
  })
})
