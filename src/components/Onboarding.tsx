import { useState } from 'react'
import { createPortal } from 'react-dom'
import { STARTER_PLAN_IDS, findPlan, type PlanId } from '../content/plans'
import { useI18n } from '../i18n'
import { actions } from '../lib/store'
import { Mark } from './Icons'

const STEPS = 3
const NOT_FOR_SHOWN = 7

/** First-run flow: welcome → safety disclaimer → choose a starting plan. */
export function Onboarding() {
  const { ui, plans, guide } = useI18n()
  const [step, setStep] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [planId, setPlanId] = useState<PlanId>('14:10')

  return createPortal(
    <div className="onboarding" role="dialog" aria-modal="true" aria-label={ui.onboarding.label}>
      <div className="onboarding-inner screen" key={step}>
        {step === 0 && (
          <>
            <Mark className="onboarding-mark" />
            <h1 className="onboarding-title">
              {ui.onboarding.title1}
              <br />
              <em>{ui.onboarding.title2}</em>
            </h1>
            <p className="muted lead">{ui.onboarding.intro}</p>
            <ul className="bullets mt-4">
              {ui.onboarding.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <button className="btn btn-primary btn-block mt-6" onClick={() => setStep(1)}>
              {ui.onboarding.start}
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="onboarding-title small">{ui.onboarding.notForTitle}</h1>
            <p className="muted">{ui.onboarding.notForIntro}</p>
            <ul className="bullets bad mt-2">
              {guide.notFor.slice(0, NOT_FOR_SHOWN).map((n) => (
                <li key={n} className="small">
                  {n}
                </li>
              ))}
            </ul>
            <label className="row agree mt-5">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span className="small">{ui.onboarding.agree}</span>
            </label>
            <button className="btn btn-primary btn-block mt-5" disabled={!agreed} onClick={() => setStep(2)}>
              {ui.onboarding.understand}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="onboarding-title small">{ui.onboarding.chooseTitle}</h1>
            <p className="muted mb-4">{ui.onboarding.chooseText}</p>
            <div role="radiogroup">
              {STARTER_PLAN_IDS.map((id) => {
                const plan = findPlan(id)!
                return (
                  <button key={id} className="option" role="radio" aria-checked={planId === id} onClick={() => setPlanId(id)}>
                    <span className="option-num">{plans[id].name}</span>
                    <span className="grow">
                      <span className="block strong">{plans[id].tagline}</span>
                      <span className="small muted">{ui.onboarding.fastEat(plan.fastHours!, plan.eatHours!)}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <button
              className="btn btn-primary btn-block mt-5"
              onClick={() => actions.setSettings({ planId, acceptedDisclaimer: true })}
            >
              {ui.onboarding.begin}
            </button>
          </>
        )}

        <div className="onboarding-dots" aria-hidden>
          {Array.from({ length: STEPS }, (_, i) => (
            <span key={i} className={i === step ? 'on' : ''} />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
