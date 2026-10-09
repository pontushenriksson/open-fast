import type { Level } from '../content/plans'
import { useI18n } from '../i18n'

const LEVEL_CLASS: Record<Level, string> = {
  beginner: 'ok',
  intermediate: '',
  advanced: 'gray',
  expert: 'bad',
}

export function LevelBadge({ level }: { level: Level }) {
  const { ui } = useI18n()
  return <span className={`badge ${LEVEL_CLASS[level]}`}>{ui.levels[level]}</span>
}
