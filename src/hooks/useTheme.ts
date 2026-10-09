import { useEffect } from 'react'
import type { Theme } from '../lib/store'

const THEME_COLOR = { light: '#f5eee2', dark: '#0d0f1c' }

/** Applies the theme to <html data-theme> and the browser's theme-color. */
export function useTheme(theme: Theme) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const apply = () => {
      const resolved = theme === 'system' ? (media.matches ? 'light' : 'dark') : theme
      document.documentElement.dataset.theme = resolved
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[resolved])
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])
}
