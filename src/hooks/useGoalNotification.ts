import { useEffect } from 'react'
import { useI18n } from '../i18n'
import { cancelGoalNotification, scheduleGoalNotification } from '../lib/notifications'
import { useStore } from '../lib/store'
import { HOUR } from '../lib/time'

/** Keeps the "goal reached" notification in sync with the running fast and settings. */
export function useGoalNotification() {
  const { ui } = useI18n()
  const { active, settings } = useStore()
  const start = active?.start
  const goalHours = active?.goalHours

  useEffect(() => {
    if (!settings.notify || start == null || goalHours == null) {
      void cancelGoalNotification()
      return
    }
    void scheduleGoalNotification(start + goalHours * HOUR, ui.notifications.goalTitle(goalHours), ui.notifications.goalBody)
  }, [start, goalHours, settings.notify, ui])
}
