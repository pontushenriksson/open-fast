import type { Tip } from '../../i18n/types'
import { useI18n } from '../../i18n'

function Accordion({ items }: { items: Tip[] }) {
  return (
    <div className="card card-list">
      {items.map((t) => (
        <details key={t.title} className="acc">
          <summary>{t.title}</summary>
          <div>{t.body}</div>
        </details>
      ))}
    </div>
  )
}

/** Do's and don'ts, practical tips, breaking a fast and FAQ. */
export function Tips() {
  const { ui, guide } = useI18n()
  return (
    <>
      <div className="do-dont">
        <div className="card">
          <h3 className="card-title text-ok">{ui.tips.do}</h3>
          <ul className="bullets ok">
            {guide.dos.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="card-title text-bad">{ui.tips.dont}</h3>
          <ul className="bullets bad">
            {guide.donts.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      {guide.tipGroups.map((group) => (
        <section key={group.title}>
          <div className="section-label">{group.title}</div>
          <Accordion items={group.items} />
        </section>
      ))}

      <div className="section-label">{ui.tips.breaking}</div>
      <Accordion items={guide.breakingFast} />

      <div className="section-label">{ui.tips.faq}</div>
      <Accordion items={guide.faq} />
    </>
  )
}
