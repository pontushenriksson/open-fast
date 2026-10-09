import { useState } from 'react'
import { LevelBadge } from '../../components/LevelBadge'
import { LEVEL_ORDER, PLANS, type Plan } from '../../content/plans'
import { useI18n } from '../../i18n'
import { actions, useStore } from '../../lib/store'

function MethodCard({ plan, selected }: { plan: Plan; selected: boolean }) {
  const { ui, plans } = useI18n()
  const [open, setOpen] = useState(false)
  const text = plans[plan.id]
  const { fastHours, eatHours } = plan

  return (
    <div className="card">
      <button className="method" onClick={() => setOpen(!open)} aria-expanded={open}>
        <div className="method-head">
          <h3>{text.name}</h3>
          <LevelBadge level={plan.level} />
        </div>
        <p className="muted small mt-1">{text.tagline}</p>
        {fastHours && eatHours ? (
          <>
            <div className="ratio" aria-hidden>
              <div className="f" style={{ width: `${(fastHours / 24) * 100}%` }} />
              <div className="e" style={{ width: `${(eatHours / 24) * 100}%` }} />
            </div>
            <div className="row between tiny muted">
              <span>{ui.methods.fastHours(fastHours)}</span>
              <span>{ui.methods.eatHours(eatHours)}</span>
            </div>
          </>
        ) : null}
      </button>

      {open && (
        <div className="mt-4">
          <p className="small">{text.description}</p>
          <div className="section-label tight">{ui.methods.howTo}</div>
          <ul className="bullets">
            {text.howTo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="section-label tight">{ui.methods.goodFor}</div>
          <ul className="bullets ok">
            {text.goodFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="section-label tight">{ui.methods.watchOut}</div>
          <ul className="bullets bad">
            {text.watchOut.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {text.warning && (
            <div className="callout bad mt-4">
              <span className="callout-icon">⚠</span>
              <span>{text.warning}</span>
            </div>
          )}
          {plan.timer && (
            <button
              className={`btn btn-block mt-4 ${selected ? 'btn-ghost' : 'btn-primary'}`}
              disabled={selected}
              onClick={() => actions.setSettings({ planId: plan.id })}
            >
              {selected ? ui.methods.current : ui.methods.choose(text.name)}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function Methods() {
  const { ui } = useI18n()
  const { settings } = useStore()
  const sorted = [...PLANS].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
  return (
    <>
      <div className="callout mb-4">
        <span className="callout-icon">ℹ</span>
        <span>{ui.methods.intro}</span>
      </div>
      <div className="stack">
        {sorted.map((p) => (
          <MethodCard key={p.id} plan={p} selected={settings.planId === p.id} />
        ))}
      </div>
    </>
  )
}
