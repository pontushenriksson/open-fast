import { useMemo, useState } from 'react'
import { IconSearch } from '../components/Icons'
import { FOODS, type Food, type Verdict } from '../content/foods'
import { LOCALES, useI18n } from '../i18n'

type Filter = Verdict | 'all'

/** Lowercase and strip diacritics, so "cafe" finds "café" and "apple" also matches "äpple". */
const normalize = (s: string) => s.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Search text per food: names and aliases in every language, so "cola" works everywhere. */
const SEARCH_INDEX = new Map(
  FOODS.map((food) => [
    food.id,
    normalize(
      Object.values(LOCALES)
        .flatMap((l) => [l.foods[food.id].name, ...(l.foods[food.id].aliases ?? [])])
        .join(' '),
    ),
  ]),
)

export function CheckScreen({ onFood }: { onFood: (food: Food) => void }) {
  const { ui, foods } = useI18n()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const results = useMemo(() => {
    const q = normalize(query.trim())
    return FOODS.filter((f) => filter === 'all' || f.verdict === filter).filter((f) => !q || SEARCH_INDEX.get(f.id)!.includes(q))
  }, [query, filter])

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: ui.check.all },
    { id: 'ok', label: ui.check.filterOk },
    { id: 'gray', label: ui.check.filterGray },
    { id: 'breaks', label: ui.check.filterBreaks },
  ]
  const short: Record<Verdict, string> = { ok: ui.verdict.okShort, gray: ui.verdict.grayShort, breaks: ui.verdict.breaksShort }

  return (
    <div className="screen">
      <h1 className="screen-title">{ui.check.title}</h1>
      <p className="screen-sub">{ui.check.subtitle}</p>

      <div className="search">
        <IconSearch />
        <input
          className="input"
          type="search"
          placeholder={ui.check.placeholder}
          aria-label={ui.check.searchLabel}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="chips mt-3">
        {filters.map((f) => (
          <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="food-list mt-4">
        {results.map((food) => (
          <button key={food.id} className="food-row" onClick={() => onFood(food)}>
            <span className="food-emoji">{food.emoji}</span>
            <span className="grow">
              <span className="name block">{foods[food.id].name}</span>
              <span className="meta">
                {foods[food.id].amount} · {foods[food.id].kcal}
              </span>
            </span>
            <span className={`badge ${food.verdict}`}>
              <span className="dot" />
              {short[food.verdict]}
            </span>
          </button>
        ))}
        {results.length === 0 && (
          <div className="empty">
            <div className="empty-icon">🤔</div>
            <p>{ui.check.noResults(query)}</p>
            <p className="small mt-2">{ui.check.noResultsHint}</p>
          </div>
        )}
      </div>

      <div className="section-label">{ui.check.rules}</div>
      <div className="card stack">
        <div className="callout ok">
          <span className="callout-icon">✓</span>
          <span>
            <strong>{ui.check.safe}</strong>
            {ui.check.safeText}
          </span>
        </div>
        <div className="callout">
          <span className="callout-icon">~</span>
          <span>
            <strong>{ui.check.small}</strong>
            {ui.check.smallText}
          </span>
        </div>
        <div className="callout bad">
          <span className="callout-icon">!</span>
          <span>
            <strong>{ui.check.sugarProtein}</strong>
            {ui.check.sugarProteinText}
          </span>
        </div>
      </div>

      <div className="section-label">{ui.check.oopsTitle}</div>
      <div className="card">
        <p className="small">{ui.check.oopsText}</p>
        <ul className="bullets small">
          {ui.check.oopsBullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
