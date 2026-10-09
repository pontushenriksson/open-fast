/** Triggers a download of in-memory content. */
export function downloadFile(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

const icsStamp = (t: number) =>
  new Date(t)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
const icsEscape = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')

/** Builds an iCalendar event with an alert at `at`. */
export function buildReminder(at: number, title: string, description: string): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Open Fast//EN',
    'BEGIN:VEVENT',
    `UID:${at}-${Math.random().toString(36).slice(2)}@open-fast`,
    `DTSTAMP:${icsStamp(Date.now())}`,
    `DTSTART:${icsStamp(at)}`,
    `DTEND:${icsStamp(at + 15 * 60_000)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    'BEGIN:VALARM',
    'TRIGGER:PT0M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsEscape(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Downloads a calendar reminder – the most reliable notification on iPhone without the native app. */
export function downloadReminder(at: number, title: string, description: string) {
  downloadFile(buildReminder(at, title, description), 'open-fast-reminder.ics', 'text/calendar')
}
