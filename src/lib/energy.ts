/**
 * Energy and weight estimates for a fast.
 *
 * - Daily energy expenditure: Mifflin–St Jeor resting energy × activity factor.
 * - Fat equivalent: ~7 700 kcal per kg of body fat (a rule of thumb; see Hall 2008).
 * - Scale change: during a fast the scale also drops because glycogen is stored
 *   with water (~3 g per g glycogen) and the gut empties. Most of that returns
 *   after eating. The ranges below are rough, typical values, not predictions.
 */

export type Sex = 'female' | 'male' | 'unspecified'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very'

export interface Profile {
  sex: Sex
  age?: number
  heightCm?: number
  weightKg?: number
  activity: Activity
}

export const ACTIVITIES: Activity[] = ['sedentary', 'light', 'moderate', 'active', 'very']

export const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very: 1.9,
}

export const KCAL_PER_KG_FAT = 7700

/** Used when the profile is incomplete. */
export const DEFAULT_KCAL_PER_DAY = 2000

export const DEFAULT_PROFILE: Profile = { sex: 'unspecified', activity: 'light' }

/** Plausible adult ranges – outside these the equation isn't meaningful. */
const RANGES = { age: [15, 100], heightCm: [100, 250], weightKg: [30, 300] } as const
const within = (v: number | undefined, [min, max]: readonly [number, number]): v is number => v != null && v >= min && v <= max

/** Resting energy expenditure in kcal/day (Mifflin–St Jeor), or null if data is missing or implausible. */
export function restingEnergy(p: Profile, weightKg = p.weightKg): number | null {
  if (!within(p.age, RANGES.age) || !within(p.heightCm, RANGES.heightCm) || !within(weightKg, RANGES.weightKg)) return null
  const sexTerm = p.sex === 'male' ? 5 : p.sex === 'female' ? -161 : -78
  return 10 * weightKg + 6.25 * p.heightCm - 5 * p.age + sexTerm
}

export interface DailyEnergy {
  kcalPerDay: number
  /** True when based on the user's own profile rather than the default. */
  personalized: boolean
}

export function dailyEnergy(p: Profile, fallbackWeightKg?: number): DailyEnergy {
  const rest = restingEnergy(p, p.weightKg ?? fallbackWeightKg)
  if (rest == null) return { kcalPerDay: DEFAULT_KCAL_PER_DAY, personalized: false }
  return { kcalPerDay: Math.round(rest * ACTIVITY_FACTOR[p.activity]), personalized: true }
}

/** Typical extra scale drop (water, glycogen, gut content) in kg by fasting hours. */
const SCALE_TABLE: [hours: number, min: number, max: number][] = [
  [0, 0, 0],
  [12, 0.2, 0.5],
  [16, 0.3, 0.7],
  [24, 0.5, 1.2],
  [36, 0.8, 1.6],
  [48, 1.0, 2.0],
  [72, 1.5, 3.0],
]

function scaleRange(hours: number): [number, number] {
  const h = Math.max(0, hours)
  for (let i = 1; i < SCALE_TABLE.length; i++) {
    const [h1, a1, b1] = SCALE_TABLE[i]
    if (h <= h1) {
      const [h0, a0, b0] = SCALE_TABLE[i - 1]
      const t = (h - h0) / (h1 - h0)
      return [a0 + (a1 - a0) * t, b0 + (b1 - b0) * t]
    }
  }
  const [, a, b] = SCALE_TABLE[SCALE_TABLE.length - 1]
  return [a, b]
}

export interface FastEstimate {
  /** Energy used during the fasting hours. */
  kcal: number
  /** Body fat that energy corresponds to, if the meals after the fast don't make up for it. */
  fatKg: number
  /** Typical range of what the scale may show, mostly water and glycogen. */
  scaleKg: [number, number]
}

export function estimateFast(hours: number, kcalPerDay: number): FastEstimate {
  const kcal = (kcalPerDay * Math.max(0, hours)) / 24
  return { kcal, fatKg: kcal / KCAL_PER_KG_FAT, scaleKg: scaleRange(hours) }
}

/** Durations shown in the estimate table. */
export const ESTIMATE_HOURS = [12, 14, 16, 18, 20, 24, 36, 48, 72]
