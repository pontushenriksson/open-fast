import { useEffect, useState } from 'react'
import { IconBook, IconChart, IconCheck, IconSettings, IconTimer, Mark } from './components/Icons'
import { Onboarding } from './components/Onboarding'
import { FoodSheet } from './components/sheets/FoodSheet'
import { SettingsSheet } from './components/sheets/SettingsSheet'
import { Toast } from './components/Toast'
import type { Food } from './content/foods'
import { useDawnGlow } from './hooks/useDawnGlow'
import { useGoalNotification } from './hooks/useGoalNotification'
import { useHashRoute } from './hooks/useHashRoute'
import { useTheme } from './hooks/useTheme'
import { useToast } from './hooks/useToast'
import { useI18n } from './i18n'
import { useStore } from './lib/store'
import type { Tab } from './navigation'
import { CheckScreen } from './screens/CheckScreen'
import { LearnScreen } from './screens/learn/LearnScreen'
import { ProgressScreen } from './screens/ProgressScreen'
import { TimerScreen } from './screens/TimerScreen'

const TAB_ICONS: Record<Tab, typeof IconTimer> = {
  timer: IconTimer,
  progress: IconChart,
  check: IconCheck,
  learn: IconBook,
}

export default function App() {
  const { ui, lang } = useI18n()
  const { settings } = useStore()
  const [{ tab, section }, navigate] = useHashRoute()
  const [food, setFood] = useState<Food | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toast, showToast, hideToast] = useToast()
  const openSettings = () => setSettingsOpen(true)

  useTheme(settings.theme)
  useDawnGlow()
  useGoalNotification()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <Mark className="brand-mark" />
          {ui.appName}
        </div>
        <button className="icon-btn" onClick={openSettings} aria-label={ui.nav.settings}>
          <IconSettings />
        </button>
      </header>

      <main key={tab}>
        {tab === 'timer' && <TimerScreen onFood={setFood} navigate={navigate} openSettings={openSettings} />}
        {tab === 'progress' && <ProgressScreen toast={showToast} />}
        {tab === 'check' && <CheckScreen onFood={setFood} />}
        {tab === 'learn' && <LearnScreen section={section} onSection={(s) => navigate('learn', s)} openSettings={openSettings} />}
      </main>

      <nav className="tabbar" aria-label={ui.nav.label}>
        {(Object.keys(TAB_ICONS) as Tab[]).map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button key={id} className="tab" aria-current={tab === id ? 'page' : undefined} onClick={() => navigate(id)}>
              <Icon />
              {ui.nav[id]}
            </button>
          )
        })}
      </nav>

      <FoodSheet food={food} onClose={() => setFood(null)} />
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} toast={showToast} />
      {!settings.acceptedDisclaimer && <Onboarding />}
      <Toast toast={toast} onHide={hideToast} />
    </div>
  )
}
