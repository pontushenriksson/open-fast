import type { FoodId } from '../content/foods'
import type { PhaseId } from '../content/phases'
import type { PlanId } from '../content/plans'
import type { ResearchId } from '../content/research'
import type { ui } from './locales/en/ui'

export type Lang = 'en' | 'sv'

/** The UI dictionary. English is the reference – every other locale must match its shape. */
export type Messages = typeof ui

export interface PlanText {
  name: string
  tagline: string
  description: string
  howTo: string[]
  goodFor: string[]
  watchOut: string[]
  /** Shown in red – needs extra caution. */
  warning?: string
}

export interface PhaseText {
  title: string
  short: string
  body: string
  /** What the body runs on during this phase. */
  fuel: string
  /** How it commonly feels. */
  feel: string
  tips: string[]
}

export interface FoodText {
  name: string
  amount: string
  kcal: string
  what: string
  advice: string
  /** Extra search words (brands, synonyms). */
  aliases?: string[]
}

export interface ResearchText {
  big: string
  title: string
  body: string
  design: string
}

export interface Tip {
  title: string
  body: string
}

export interface GuideText {
  tipGroups: { title: string; items: Tip[] }[]
  breakingFast: Tip[]
  dos: string[]
  donts: string[]
  notFor: string[]
  stopSigns: string[]
  faq: Tip[]
  researchCaveats: string[]
}

export interface Locale {
  lang: Lang
  /** BCP 47 tag used for dates and numbers. */
  intl: string
  ui: Messages
  plans: Record<PlanId, PlanText>
  phases: Record<PhaseId, PhaseText>
  foods: Record<FoodId, FoodText>
  research: Record<ResearchId, ResearchText>
  guide: GuideText
}
