/**
 * Hash-based navigation (#timer, #learn/body …) so the back button and
 * deep links work without a router dependency.
 */

export const TABS = ['timer', 'progress', 'check', 'learn'] as const
export type Tab = (typeof TABS)[number]

export const LEARN_SECTIONS = ['methods', 'body', 'estimates', 'research', 'tips', 'safety'] as const
export type LearnSection = (typeof LEARN_SECTIONS)[number]

export interface Route {
  tab: Tab
  section: LearnSection
}

export type Navigate = (tab: Tab, section?: LearnSection) => void

export function parseHash(hash: string): Route {
  const [t, s] = hash.replace(/^#/, '').split('/')
  return {
    tab: (TABS as readonly string[]).includes(t) ? (t as Tab) : 'timer',
    section: (LEARN_SECTIONS as readonly string[]).includes(s) ? (s as LearnSection) : 'methods',
  }
}

export function toHash(tab: Tab, section: LearnSection): string {
  return tab === 'learn' ? `#learn/${section}` : `#${tab}`
}
