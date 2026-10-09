import { MOODS } from '../content/moods'
import { useI18n } from '../i18n'

interface Props {
  value?: number
  onChange: (value?: number) => void
}

/** 1–5 mood selector. Tapping the selected mood clears it. */
export function MoodPicker({ value, onChange }: Props) {
  const { ui } = useI18n()
  return (
    <div className="moods" role="group" aria-label={ui.moods.label}>
      {MOODS.map((emoji, i) => (
        <button key={emoji} aria-pressed={value === i + 1} onClick={() => onChange(value === i + 1 ? undefined : i + 1)}>
          {emoji}
        </button>
      ))}
    </div>
  )
}
