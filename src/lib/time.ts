export const MINUTE = 60_000
export const HOUR = 3_600_000
export const DAY = 86_400_000

const pad = (n: number) => String(n).padStart(2, '0')

/** Formats a duration as 16:04:09. Negative values are clamped to zero. */
export function clock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}

/** Local midnight for a timestamp. */
export function startOfDay(t: number | Date): Date {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Calendar-day difference between two timestamps (DST safe). */
export function dayDiff(a: number, b: number): number {
  return Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / DAY)
}

/** Timestamp → value for `<input type="datetime-local">`. */
export function toLocalInput(t: number): string {
  const d = new Date(t)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function fromLocalInput(v: string): number | null {
  const t = new Date(v).getTime()
  return Number.isFinite(t) ? t : null
}

/** YYYY-MM-DD in local time. */
export function dateKey(t: number | Date = Date.now()): string {
  const d = new Date(t)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Parses a YYYY-MM-DD key as local noon (avoids DST/timezone edge cases). */
export function fromDateKey(key: string): Date {
  return new Date(`${key}T12:00`)
}
