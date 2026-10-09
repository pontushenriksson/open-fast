const R = 16
const CIRCUMFERENCE = 2 * Math.PI * R

/** Small ring for history rows; green with a check mark when the goal was reached. */
export function ProgressRing({ progress, done }: { progress: number; done: boolean }) {
  const p = Math.max(0, Math.min(progress, 1))
  return (
    <svg className="history-ring" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r={R} fill="none" stroke="var(--line)" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r={R}
        fill="none"
        stroke={done ? 'var(--ok)' : 'var(--dawn)'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${CIRCUMFERENCE * p} ${CIRCUMFERENCE}`}
        transform="rotate(-90 20 20)"
      />
      {done && (
        <path
          d="M14 20.5l4 4 8-9"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
