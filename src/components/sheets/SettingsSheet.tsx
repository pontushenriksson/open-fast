import { useRef, useState, type ReactNode } from 'react'
import { LANGUAGES, useI18n } from '../../i18n'
import { CM_PER_IN, KG_PER_LB } from '../../i18n/format'
import { downloadFile } from '../../lib/download'
import { ACTIVITIES, type Sex } from '../../lib/energy'
import { isNative, notificationsSupported, requestNotificationPermission } from '../../lib/notifications'
import { actions, useStore, type LanguageSetting, type Theme, type Units } from '../../lib/store'
import { dateKey } from '../../lib/time'
import { Sheet } from '../Sheet'

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent)
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { id: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="segmented compact" role="tablist">
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="setting-row">
      <span className="grow">
        {label}
        {hint && <span className="tiny muted block">{hint}</span>}
      </span>
      {children}
    </div>
  )
}

/** Parses a number input, returning undefined for empty or invalid values. */
const parseNum = (v: string) => {
  const n = Number(v.replace(',', '.'))
  return v.trim() && Number.isFinite(n) && n > 0 ? n : undefined
}
const round1 = (n: number) => Math.round(n * 10) / 10

export function SettingsSheet({ open, onClose, toast }: { open: boolean; onClose: () => void; toast: (m: string) => void }) {
  const { ui } = useI18n()
  const { settings, history } = useStore()
  const { profile, units } = settings
  const fileRef = useRef<HTMLInputElement>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const imperial = units === 'imperial'

  const toggleNotify = async () => {
    if (settings.notify) return actions.setSettings({ notify: false })
    if (!notificationsSupported()) return toast(ui.settings.notifyUnsupported)
    if (await requestNotificationPermission()) actions.setSettings({ notify: true })
    else toast(ui.settings.notifyBlocked)
  }

  const importData = async (file?: File) => {
    if (!file) return
    try {
      actions.importData(await file.text())
      toast(ui.settings.imported)
    } catch {
      toast(ui.settings.importFailed)
    }
  }

  const sexOptions: { id: Sex; label: string }[] = [
    { id: 'female', label: ui.settings.female },
    { id: 'male', label: ui.settings.male },
    { id: 'unspecified', label: ui.settings.unspecified },
  ]

  return (
    <Sheet open={open} onClose={onClose} title={ui.settings.title}>
      <div className="card card-list">
        <Row label={ui.settings.language}>
          <Segmented<LanguageSetting>
            value={settings.language}
            options={[{ id: 'auto', label: ui.settings.languageAuto }, ...LANGUAGES]}
            onChange={(language) => actions.setSettings({ language })}
          />
        </Row>
        <Row label={ui.settings.appearance}>
          <Segmented<Theme>
            value={settings.theme}
            options={[
              { id: 'system', label: ui.settings.themeSystem },
              { id: 'dark', label: ui.settings.themeDark },
              { id: 'light', label: ui.settings.themeLight },
            ]}
            onChange={(theme) => actions.setSettings({ theme })}
          />
        </Row>
        <Row label={ui.settings.units}>
          <Segmented<Units>
            value={units}
            options={[
              { id: 'metric', label: ui.settings.metric },
              { id: 'imperial', label: ui.settings.imperial },
            ]}
            onChange={(u) => actions.setSettings({ units: u })}
          />
        </Row>
        <Row label={ui.settings.notify} hint={isNative() ? undefined : ui.settings.notifyHint}>
          <button
            className="switch"
            role="switch"
            aria-checked={settings.notify}
            aria-label={ui.settings.notify}
            onClick={toggleNotify}
          />
        </Row>
        <Row label={ui.settings.waterGoal}>
          <div className="row gap-2">
            <button
              className="round-btn small"
              aria-label={ui.settings.decreaseWater}
              onClick={() => actions.setSettings({ waterGoal: Math.max(1, settings.waterGoal - 1) })}
            >
              −
            </button>
            <span className="num stepper-value">{ui.settings.glasses(settings.waterGoal)}</span>
            <button
              className="round-btn small"
              aria-label={ui.settings.increaseWater}
              onClick={() => actions.setSettings({ waterGoal: Math.min(20, settings.waterGoal + 1) })}
            >
              +
            </button>
          </div>
        </Row>
      </div>

      <div className="section-label" id="profile">
        {ui.settings.profile}
      </div>
      <div className="card">
        <p className="tiny muted mb-3">{ui.settings.profileHint}</p>
        <div className="field">
          <span>{ui.settings.sex}</span>
          <Segmented<Sex> value={profile.sex} options={sexOptions} onChange={(sex) => actions.setProfile({ sex })} />
        </div>
        <div className="form-grid mt-4">
          <label className="field">
            <span>{ui.settings.age}</span>
            <input
              className="input"
              inputMode="numeric"
              value={profile.age ?? ''}
              onChange={(e) => actions.setProfile({ age: parseNum(e.target.value) })}
            />
          </label>
          <label className="field">
            <span>
              {ui.settings.height} ({imperial ? 'in' : 'cm'})
            </span>
            <input
              className="input"
              inputMode="decimal"
              defaultValue={profile.heightCm ? round1(imperial ? profile.heightCm / CM_PER_IN : profile.heightCm) : ''}
              key={`h-${units}`}
              onChange={(e) => {
                const v = parseNum(e.target.value)
                actions.setProfile({ heightCm: v && (imperial ? v * CM_PER_IN : v) })
              }}
            />
          </label>
          <label className="field">
            <span>
              {ui.settings.weight} ({imperial ? 'lb' : 'kg'})
            </span>
            <input
              className="input"
              inputMode="decimal"
              defaultValue={profile.weightKg ? round1(imperial ? profile.weightKg / KG_PER_LB : profile.weightKg) : ''}
              key={`w-${units}`}
              onChange={(e) => {
                const v = parseNum(e.target.value)
                actions.setProfile({ weightKg: v && (imperial ? v * KG_PER_LB : v) })
              }}
            />
          </label>
        </div>
        <p className="tiny muted mt-1">{ui.settings.weightHint}</p>
        <label className="field mt-4">
          <span>{ui.settings.activity}</span>
          <select
            className="input"
            value={profile.activity}
            onChange={(e) => actions.setProfile({ activity: e.target.value as typeof profile.activity })}
          >
            {ACTIVITIES.map((a) => (
              <option key={a} value={a}>
                {ui.settings.activities[a]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!isStandalone() && !isNative() && (
        <>
          <div className="section-label">{ui.settings.install}</div>
          <div className="card small">{isIOS() ? ui.settings.installIos : ui.settings.installAndroid}</div>
        </>
      )}

      <div className="section-label">{ui.settings.data}</div>
      <div className="card small">
        <p className="muted">{ui.settings.dataText(history.length)}</p>
        <div className="row wrap mt-3">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => downloadFile(actions.exportData(), `open-fast-${dateKey()}.json`, 'application/json')}
          >
            {ui.settings.export}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()}>
            {ui.settings.import}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => importData(e.target.files?.[0])}
          />
          {confirmReset ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                actions.resetAll()
                setConfirmReset(false)
                toast(ui.settings.resetDone)
              }}
            >
              {ui.settings.confirmReset}
            </button>
          ) : (
            <button className="btn btn-sm text-bad" onClick={() => setConfirmReset(true)}>
              {ui.settings.reset}
            </button>
          )}
        </div>
      </div>

      <p className="footer-note">
        {ui.settings.footer} · v{__APP_VERSION__}
        <br />
        {ui.settings.footerNote}
      </p>
    </Sheet>
  )
}
