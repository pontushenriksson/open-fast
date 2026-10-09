import type { Food, FoodImpact, Impact } from '../../content/foods'
import { useI18n } from '../../i18n'
import { Sheet } from '../Sheet'

const IMPACT_COLOR: Record<Impact, string> = { 0: 'var(--ok)', 1: 'var(--gray)', 2: 'var(--bad)' }
const DIMENSIONS: (keyof FoodImpact)[] = ['insulin', 'ketosis', 'autophagy']
const CALLOUT = { ok: 'ok', gray: '', breaks: 'bad' } as const
const ICON = { ok: '✓', gray: '~', breaks: '!' } as const

/** Details for one "does it break my fast?" item. */
export function FoodSheet({ food, onClose }: { food: Food | null; onClose: () => void }) {
  const { ui, foods } = useI18n()
  const impactLabel: Record<Impact, string> = { 0: ui.food.none, 1: ui.food.small, 2: ui.food.clear }

  return (
    <Sheet open={!!food} onClose={onClose}>
      {food && (
        <>
          <div className="verdict-hero">
            <div className="big-emoji">{food.emoji}</div>
            <h2>{foods[food.id].name}</h2>
            <div className={`verdict-text ${food.verdict}`}>{ui.verdict[food.verdict]}</div>
            <p className="small muted mt-2">
              {foods[food.id].amount} · {foods[food.id].kcal}
            </p>
          </div>

          <div className="section-label">{ui.food.impact}</div>
          <div className="card impact">
            {DIMENSIONS.map((dim) => {
              const value = food.impact[dim]
              return (
                <div className="impact-row" key={dim}>
                  <span>{ui.food[dim]}</span>
                  <span className="small strong" style={{ color: IMPACT_COLOR[value] }}>
                    {impactLabel[value]}
                  </span>
                  <div className="impact-bar">
                    <span style={{ width: `${8 + value * 46}%`, background: IMPACT_COLOR[value] }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="section-label">{ui.food.whatHappens}</div>
          <p>{foods[food.id].what}</p>

          <div className="section-label">{ui.food.whatToDo}</div>
          <div className={`callout ${CALLOUT[food.verdict]}`}>
            <span className="callout-icon">{ICON[food.verdict]}</span>
            <span>{foods[food.id].advice}</span>
          </div>

          <p className="tiny muted mt-5">{ui.food.footnote}</p>
        </>
      )}
    </Sheet>
  )
}
