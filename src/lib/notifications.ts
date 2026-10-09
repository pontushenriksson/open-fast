/**
 * Goal notifications.
 *
 * - Native (Capacitor iOS/Android): a real scheduled local notification that fires
 *   even when the app is closed.
 * - Web/PWA: a timer that shows a notification while the page is alive
 *   (open or in the background). Browsers can't schedule notifications offline.
 */
import { Capacitor } from '@capacitor/core'

const GOAL_ID = 1
let webTimer: ReturnType<typeof setTimeout> | undefined

export const isNative = () => Capacitor.isNativePlatform()

async function localNotifications() {
  const { LocalNotifications } = await import('@capacitor/local-notifications')
  return LocalNotifications
}

export function notificationsSupported(): boolean {
  return isNative() || typeof Notification !== 'undefined'
}

/** Asks for permission. Returns true when notifications may be shown. */
export async function requestNotificationPermission(): Promise<boolean> {
  if (isNative()) {
    const ln = await localNotifications()
    const { display } = await ln.requestPermissions()
    return display === 'granted'
  }
  if (typeof Notification === 'undefined') return false
  return (await Notification.requestPermission()) === 'granted'
}

export async function cancelGoalNotification(): Promise<void> {
  clearTimeout(webTimer)
  webTimer = undefined
  if (isNative()) {
    const ln = await localNotifications()
    await ln.cancel({ notifications: [{ id: GOAL_ID }] })
  }
}

/** Schedules (or reschedules) the "goal reached" notification. */
export async function scheduleGoalNotification(at: number, title: string, body: string): Promise<void> {
  await cancelGoalNotification()
  if (at <= Date.now()) return

  if (isNative()) {
    const ln = await localNotifications()
    await ln.schedule({ notifications: [{ id: GOAL_ID, title, body, schedule: { at: new Date(at), allowWhileIdle: true } }] })
    return
  }

  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return
  const delay = at - Date.now()
  if (delay > 2 ** 31 - 1) return // beyond setTimeout's range
  webTimer = setTimeout(async () => {
    const options = { body, icon: `${import.meta.env.BASE_URL}icon-192.png`, tag: 'goal' }
    try {
      const registration = await navigator.serviceWorker?.getRegistration()
      if (registration) await registration.showNotification(title, options)
      else new Notification(title, options)
    } catch {
      // Notifications are best effort.
    }
  }, delay)
}
