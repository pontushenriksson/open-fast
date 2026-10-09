# Architecture

Open Fast is a small, dependency-light React app. Its guiding rules:

1. **Local-first.** No backend. All user data lives in `localStorage` on the device.
2. **Content is data.** Facts (hours, verdicts, sources) and texts (per language) are separate, typed modules – not strings scattered through components.
3. **No unnecessary libraries.** No UI kit, state manager, router or date library. Each would add more weight than it saves at this size.
4. **Mobile first.** Designed for a 375 px wide phone, safe areas, thumb-reachable tab bar and bottom sheets.

## Directory layout

```
src/
├── main.tsx                 entry: fonts, styles, service worker, <App />
├── App.tsx                  shell: top bar, tab bar, screen switch, global sheets
├── navigation.ts            hash routes (#timer, #learn/body …)
│
├── content/                 language-neutral facts
│   ├── plans.ts             fasting methods (hours, level, timer-capable)
│   ├── phases.ts            body phases (start hour, evidence, sources)
│   ├── foods.ts             "breaks my fast?" items (verdict, impact)
│   ├── research.ts          research highlights (tag, citation, URL)
│   └── moods.ts             mood scale
│
├── i18n/
│   ├── index.ts             useI18n(), language detection, locale registry
│   ├── format.ts            dates, durations, kcal, kg/lb per locale
│   ├── types.ts             the shape every locale must satisfy
│   └── locales/{en,sv}/     ui, plans, phases, foods, research, guide
│
├── lib/                     framework-free logic (unit tested)
│   ├── store.ts             state + actions + persistence
│   ├── stats.ts             streaks, hours per day, summaries
│   ├── energy.ts            energy/weight estimate model
│   ├── time.ts              time helpers
│   ├── notifications.ts     native vs web goal notifications
│   └── download.ts          file download + .ics reminder
│
├── hooks/                   small React hooks
│   ├── useNow.ts            ticking clock
│   ├── useEnergy.ts         daily energy from profile/weight
│   ├── useHashRoute.ts      route state
│   ├── useTheme.ts          light/dark
│   ├── useGoalNotification.ts
│   ├── useDawnGlow.ts       background glow follows progress
│   └── useToast.ts
│
├── components/
│   ├── Dial.tsx             the timer ring
│   ├── EnergyCard.tsx
│   ├── Sheet.tsx            bottom sheet primitive
│   ├── sheets/              PlanSheet, TimePickSheet, EndFastSheet, EditFastSheet,
│   │                        PhaseSheet, FoodSheet, SettingsSheet
│   ├── charts/              BarChart, WeightChart, ProgressRing (hand-written SVG)
│   └── …                    Icons, Onboarding, Toast, MoodPicker, LevelBadge
│
├── screens/
│   ├── TimerScreen.tsx
│   ├── ProgressScreen.tsx
│   ├── CheckScreen.tsx
│   └── learn/               LearnScreen + Methods, Body, Estimates, Research, Tips, Safety
│
└── styles/                  tokens → base → utilities → layout → components → screens
```

## State

`src/lib/store.ts` is a ~150-line external store:

```ts
const { active, history, settings } = useStore() // read (re-renders on change)
actions.startFast(start, goalHours, planId) // write
```

- Built on React's `useSyncExternalStore` – components subscribe directly, no context or provider.
- Every write is persisted to `localStorage` (`open-fast:v1`) and broadcast to other open tabs through the `storage` event.
- `normalize()` validates anything read from storage or imported from a file and fills in defaults for fields added in newer versions. **When you add a setting, add its default to `DEFAULT_SETTINGS`; existing users get it automatically.**

### Data model

```ts
interface Fast {
  id: string
  start: number // epoch ms – when the user stopped eating
  end?: number // set when the fast is saved
  goalHours: number
  planId: string // '16:8', 'omad', 'custom', …
  mood?: number // 1–5
  note?: string
}
```

`active` is the running fast (no `end`), `history` holds finished fasts sorted newest first. Weights are stored as `{ date: 'YYYY-MM-DD', kg }` and water as glasses per date.

## Internationalization

- `en` is the reference locale. `Messages = typeof en.ui`, so the Swedish dictionary is type-checked against it: a missing or extra key is a compile error.
- Content texts are `Record<PlanId | PhaseId | FoodId | ResearchId, …>` – adding an id to `content/` without translating it fails the build.
- `src/i18n/i18n.test.ts` additionally checks that list lengths and "read more" fields match across locales.
- Language: `settings.language` is `'auto' | 'en' | 'sv'`; auto picks the first language in the device's preference list that the app supports, falling back to English.
- All formatting (time, dates, numbers, kcal, kg/lb) goes through `useI18n().f`, so locale rules stay in one place.

See [content-and-translations.md](content-and-translations.md) for adding a language.

## Energy model

`src/lib/energy.ts`:

1. **Daily energy** = Mifflin–St Jeor resting energy × activity factor (1.2–1.9). Falls back to 2,000 kcal/day without a complete, plausible profile. The latest logged weight is used if the profile has none.
2. **Energy during a fast** = daily energy × hours / 24.
3. **Fat equivalent** = energy / 7,700 kcal per kg.
4. **Scale change** = a typical range interpolated from a table (water + glycogen + gut content), clearly labeled as rough.
5. **Expected loss over time** (Learn → Estimates) = chosen daily deficit × days / 7,700.

The UI always explains that fat loss depends on the total deficit, not on fasting hours alone.

## Notifications

`src/lib/notifications.ts` has a single API with two implementations:

- **Native (Capacitor):** `LocalNotifications.schedule()` – fires even when the app is closed. The plugin is loaded with a dynamic `import()`, so the web bundle doesn't pay for it.
- **Web:** a `setTimeout` that shows a notification through the service worker while the page is alive.

`useGoalNotification()` reschedules whenever the start time, goal, language or setting changes.

## Styling

Plain CSS, split by concern under `src/styles/`. Design tokens (colors, radii, fonts) are custom properties in `tokens.css`; the light theme overrides them under `[data-theme='light']`. The theme is applied before first paint by a small inline script in `index.html` to avoid flashing.

Fonts are self-hosted through Fontsource (Fraunces for display, Instrument Sans for text), so the app works offline and makes no third-party requests.

## PWA

`vite-plugin-pwa` generates the web manifest and a Workbox service worker that precaches the whole app (≈ 800 KB). Updates install in the background (`registerType: 'autoUpdate'`). The service worker is not registered inside the native apps.

## Testing

- **Unit tests** (Vitest) cover the logic in `src/lib`, navigation and translation completeness: `npm test`.
- **Type safety** does a lot of the work: content ids and translation keys are checked at compile time.
- **CI** (`.github/workflows/ci.yml`) runs `npm run check` and `npm run build` on every push and pull request.
