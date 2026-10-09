import { useEffect } from 'react'
import { useI18n } from '../../i18n'
import { LEARN_SECTIONS, type LearnSection } from '../../navigation'
import { Body } from './Body'
import { Estimates } from './Estimates'
import { Methods } from './Methods'
import { Research } from './Research'
import { Safety } from './Safety'
import { Tips } from './Tips'

interface Props {
  section: LearnSection
  onSection: (section: LearnSection) => void
  openSettings: () => void
}

export function LearnScreen({ section, onSection, openSettings }: Props) {
  const { ui } = useI18n()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [section])

  return (
    <div className="screen">
      <h1 className="screen-title">{ui.learn.title}</h1>
      <p className="screen-sub">{ui.learn.subtitle}</p>
      <div className="segmented sticky-seg" role="tablist">
        {LEARN_SECTIONS.map((id) => (
          <button key={id} role="tab" aria-selected={section === id} onClick={() => onSection(id)}>
            {ui.learn[id]}
          </button>
        ))}
      </div>
      <div key={section}>
        {section === 'methods' && <Methods />}
        {section === 'body' && <Body />}
        {section === 'estimates' && <Estimates openSettings={openSettings} />}
        {section === 'research' && <Research />}
        {section === 'tips' && <Tips />}
        {section === 'safety' && <Safety />}
      </div>
    </div>
  )
}
