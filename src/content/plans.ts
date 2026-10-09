/**
 * Fasting methods. This file holds the language-neutral facts (hours, level);
 * the texts live in `src/i18n/locales/<lang>/plans.ts`.
 */

export const PLAN_IDS = [
  '12:12',
  '14:10',
  '16:8',
  '18:6',
  '20:4',
  'omad',
  '5:2',
  'eat-stop-eat',
  'adf',
  '36h',
  '48h',
  '72h',
] as const

export type PlanId = (typeof PLAN_IDS)[number]

/** Id used when the user picks their own number of hours. */
export const CUSTOM_PLAN_ID = 'custom'

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface Plan {
  id: PlanId
  /** Hours per fast. Missing for weekly patterns such as 5:2. */
  fastHours?: number
  eatHours?: number
  level: Level
  /** Can be selected as a goal in the timer. */
  timer: boolean
}

export const PLANS: Plan[] = [
  { id: '12:12', fastHours: 12, eatHours: 12, level: 'beginner', timer: true },
  { id: '14:10', fastHours: 14, eatHours: 10, level: 'beginner', timer: true },
  { id: '16:8', fastHours: 16, eatHours: 8, level: 'intermediate', timer: true },
  { id: '18:6', fastHours: 18, eatHours: 6, level: 'intermediate', timer: true },
  { id: '20:4', fastHours: 20, eatHours: 4, level: 'advanced', timer: true },
  { id: 'omad', fastHours: 23, eatHours: 1, level: 'advanced', timer: true },
  { id: '5:2', level: 'intermediate', timer: false },
  { id: 'eat-stop-eat', fastHours: 24, level: 'advanced', timer: true },
  { id: 'adf', level: 'advanced', timer: false },
  { id: '36h', fastHours: 36, level: 'expert', timer: true },
  { id: '48h', fastHours: 48, level: 'expert', timer: true },
  { id: '72h', fastHours: 72, level: 'expert', timer: true },
]

export const TIMER_PLANS = PLANS.filter((p) => p.timer)

export const LEVEL_ORDER: Record<Level, number> = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 }

/** Suggested starting plans shown during onboarding. */
export const STARTER_PLAN_IDS: PlanId[] = ['12:12', '14:10', '16:8', '18:6']

export function findPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

/** Goal in hours for a plan id, falling back to the custom number of hours. */
export function goalHoursFor(planId: string, customHours: number): number {
  return TIMER_PLANS.find((p) => p.id === planId)?.fastHours ?? customHours
}
