/**
 * App state, persisted to localStorage. A tiny external store consumed through
 * `useStore()` (React's useSyncExternalStore) – no library needed.
 */
import { useSyncExternalStore } from 'react'
import { DEFAULT_PROFILE, type Profile } from './energy'

export interface Fast {
  id: string
  start: number
  end?: number
  goalHours: number
  planId: string
  /** 1–5, how the fast felt. */
  mood?: number
  note?: string
}

export interface WeightEntry {
  date: string // YYYY-MM-DD
  kg: number
}

export type Theme = 'system' | 'dark' | 'light'
export type LanguageSetting = 'auto' | 'en' | 'sv'
export type Units = 'metric' | 'imperial'

export interface Settings {
  planId: string
  customHours: number
  theme: Theme
  language: LanguageSetting
  units: Units
  notify: boolean
  acceptedDisclaimer: boolean
  waterGoal: number
  profile: Profile
}

export interface State {
  version: 1
  active: Fast | null
  history: Fast[]
  settings: Settings
  weights: WeightEntry[]
  /** Glasses of water per day, keyed by YYYY-MM-DD. */
  water: Record<string, number>
}

export const STORAGE_KEY = 'open-fast:v1'

export const DEFAULT_SETTINGS: Settings = {
  planId: '16:8',
  customHours: 16,
  theme: 'system',
  language: 'auto',
  units: 'metric',
  notify: false,
  acceptedDisclaimer: false,
  waterGoal: 8,
  profile: DEFAULT_PROFILE,
}

export const DEFAULT_STATE: State = {
  version: 1,
  active: null,
  history: [],
  settings: DEFAULT_SETTINGS,
  weights: [],
  water: {},
}

const isFast = (f: unknown): f is Fast =>
  !!f && typeof (f as Fast).start === 'number' && typeof (f as Fast).goalHours === 'number'

/** Validates stored or imported data and fills in defaults for missing fields. */
export function normalize(data: unknown): State {
  const d = (data ?? {}) as Partial<State>
  const settings = (d.settings ?? {}) as Partial<Settings>
  return {
    version: 1,
    active: isFast(d.active) ? d.active : null,
    history: Array.isArray(d.history) ? d.history.filter(isFast).filter((f) => typeof f.end === 'number') : [],
    settings: {
      ...DEFAULT_SETTINGS,
      ...settings,
      profile: { ...DEFAULT_PROFILE, ...(settings.profile ?? {}) },
    },
    weights: Array.isArray(d.weights) ? d.weights.filter((w) => typeof w?.kg === 'number' && typeof w?.date === 'string') : [],
    water: d.water && typeof d.water === 'object' ? d.water : {},
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? normalize(JSON.parse(raw)) : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

let state: State = typeof localStorage === 'undefined' ? DEFAULT_STATE : load()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function set(next: State) {
  state = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Private mode or full storage – keep working in memory for this session.
  }
  emit()
}

// Keep several open tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = load()
      emit()
    }
  })
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useStore(): State {
  return useSyncExternalStore(subscribe, () => state)
}

export const getState = () => state

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
const byStartDesc = (a: Fast, b: Fast) => b.start - a.start

export const actions = {
  startFast(start: number, goalHours: number, planId: string) {
    set({ ...state, active: { id: uid(), start, goalHours, planId } })
  },
  updateActive(patch: Partial<Fast>) {
    if (!state.active) return
    set({ ...state, active: { ...state.active, ...patch } })
  },
  endFast(end: number, mood?: number, note?: string) {
    if (!state.active) return
    const done: Fast = { ...state.active, end, mood, note: note?.trim() || undefined }
    set({ ...state, active: null, history: [done, ...state.history].sort(byStartDesc) })
  },
  cancelFast() {
    set({ ...state, active: null })
  },
  addFast(fast: Omit<Fast, 'id'>) {
    set({ ...state, history: [{ ...fast, id: uid() }, ...state.history].sort(byStartDesc) })
  },
  updateFast(id: string, patch: Partial<Fast>) {
    set({ ...state, history: state.history.map((f) => (f.id === id ? { ...f, ...patch } : f)).sort(byStartDesc) })
  },
  deleteFast(id: string) {
    set({ ...state, history: state.history.filter((f) => f.id !== id) })
  },
  restoreFast(fast: Fast) {
    set({ ...state, history: [fast, ...state.history].sort(byStartDesc) })
  },
  setSettings(patch: Partial<Settings>) {
    set({ ...state, settings: { ...state.settings, ...patch } })
  },
  setProfile(patch: Partial<Profile>) {
    set({ ...state, settings: { ...state.settings, profile: { ...state.settings.profile, ...patch } } })
  },
  addWeight(date: string, kg: number) {
    const weights = state.weights.filter((w) => w.date !== date)
    weights.push({ date, kg })
    weights.sort((a, b) => a.date.localeCompare(b.date))
    set({ ...state, weights })
  },
  deleteWeight(date: string) {
    set({ ...state, weights: state.weights.filter((w) => w.date !== date) })
  },
  addWater(date: string, delta: number) {
    const current = state.water[date] ?? 0
    set({ ...state, water: { ...state.water, [date]: Math.max(0, current + delta) } })
  },
  importData(json: string) {
    set(normalize(JSON.parse(json)))
  },
  exportData(): string {
    return JSON.stringify(state, null, 2)
  },
  resetAll() {
    set({
      ...DEFAULT_STATE,
      settings: { ...state.settings, ...DEFAULT_SETTINGS, acceptedDisclaimer: true, language: state.settings.language },
    })
  },
}
