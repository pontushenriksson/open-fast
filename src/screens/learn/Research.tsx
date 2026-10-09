import { useState } from 'react'
import { RESEARCH, RESEARCH_TAGS, type ResearchTag } from '../../content/research'
import { useI18n } from '../../i18n'

/** Verified research highlights with links to the original papers. */
export function Research() {
  const { ui, research, guide } = useI18n()
  const [tag, setTag] = useState<ResearchTag | 'all'>('all')
  const list = tag === 'all' ? RESEARCH : RESEARCH.filter((r) => r.tag === tag)

  return (
    <>
      <p className="muted small mb-3">{ui.research.intro}</p>
      <div className="chips mb-4">
        <button className="chip" aria-pressed={tag === 'all'} onClick={() => setTag('all')}>
          {ui.research.all}
        </button>
        {RESEARCH_TAGS.map((t) => (
          <button key={t} className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>
            {ui.research.tags[t]}
          </button>
        ))}
      </div>
      <div className="stack">
        {list.map((r) => {
          const text = research[r.id]
          return (
            <article key={r.id} className="card stat-card">
              <div className="row between top">
                <div className="big num">{text.big}</div>
                <span className={`badge ${r.tag === 'caution' ? 'bad' : ''}`}>{ui.research.tags[r.tag]}</span>
              </div>
              <h3>{text.title}</h3>
              <p className="small muted">{text.body}</p>
              <div className="src">
                <div>{text.design}</div>
                <a href={r.url} target="_blank" rel="noreferrer noopener">
                  {r.source} ↗
                </a>
              </div>
            </article>
          )
        })}
      </div>
      <div className="section-label">{ui.research.critical}</div>
      <div className="card">
        <ul className="bullets small">
          {guide.researchCaveats.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
