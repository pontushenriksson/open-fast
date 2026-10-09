import { useEffect } from 'react'
import { useStore } from '../lib/store'
import { HOUR } from '../lib/time'
import { useNow } from './useNow'

const IDLE_GLOW = 0.12

/** Drives the CSS --glow variable: the background "dawn" brightens as the fast progresses. */
export function useDawnGlow() {
  const { active } = useStore()
  const now = useNow(30_000)
  useEffect(() => {
    const progress = active ? Math.min((now - active.start) / (active.goalHours * HOUR), 1) : 0
    document.documentElement.style.setProperty('--glow', String(IDLE_GLOW + progress * (1 - IDLE_GLOW)))
  }, [active, now])
}
