# Content and translations

All health content in Open Fast follows one rule: **if we can't back it with a source, we don't state it as fact.** Please keep it that way.

## How content is organized

Each kind of content is split in two:

| Kind                    | Facts (language-neutral)  | Texts (per language)                  |
| ----------------------- | ------------------------- | ------------------------------------- |
| Fasting methods         | `src/content/plans.ts`    | `src/i18n/locales/<lang>/plans.ts`    |
| Body phases             | `src/content/phases.ts`   | `src/i18n/locales/<lang>/phases.ts`   |
| Does it break my fast?  | `src/content/foods.ts`    | `src/i18n/locales/<lang>/foods.ts`    |
| Research highlights     | `src/content/research.ts` | `src/i18n/locales/<lang>/research.ts` |
| Tips, FAQ, safety lists | –                         | `src/i18n/locales/<lang>/guide.ts`    |
| Interface strings       | –                         | `src/i18n/locales/<lang>/ui.ts`       |

TypeScript enforces that every id in `content/` has a text in **every** locale. If you forget one, `npm run typecheck` tells you exactly where.

## Recipes

### Add a food or drink

1. Add the id to `FOOD_IDS` in `src/content/foods.ts`.
2. Add an entry to `FOODS` with emoji, category, verdict (`ok` / `gray` / `breaks`) and impact (0–2 for insulin, ketosis, autophagy).
3. Add the texts to `src/i18n/locales/en/foods.ts` **and** `sv/foods.ts`: name, amount, kcal, what happens, advice and search aliases (brand names are great aliases).
4. Run `npm run check`.

### Add or change a body phase

1. Edit `PHASES` in `src/content/phases.ts`: start hour, evidence level (`strong` / `moderate` / `limited`) and **at least one source** (prefer PubMed links).
2. Write title, short, body, fuel, feel and tips in every locale's `phases.ts`.
3. The timeline, the timer's "right now" card, the dial markers and the "read more" sheet all update automatically.

### Add a research highlight

1. Add the id to `RESEARCH_IDS` and an entry to `RESEARCH` with tag, citation and URL.
2. Write `big` (the headline number), `title`, `body` and `design` (study type · n · duration) in every locale.
3. Verify the number against the paper itself, not a news article – see the policy below.

### Add a UI string

1. Add the key to `src/i18n/locales/en/ui.ts`. Use a function when the text needs values:

   ```ts
   greeting: (name: string) => `Hi ${name}`,
   ```

2. Add the same key to `sv/ui.ts` – the compiler will remind you.
3. Use it in a component: `const { ui } = useI18n()` → `ui.section.key`.

## Add a new language

Say you want to add German (`de`):

1. Copy `src/i18n/locales/en/` to `src/i18n/locales/de/` and translate every file. Keep ids and keys; only change the strings.
2. In `de/index.ts`, export `de` with `lang: 'de'` and the right `intl` tag (e.g. `'de-DE'`).
3. Register it:
   - `src/i18n/types.ts`: `export type Lang = 'en' | 'sv' | 'de'`
   - `src/i18n/index.ts`: add `de` to `LOCALES` and `{ id: 'de', label: 'Deutsch' }` to `LANGUAGES`. `detectLang()` picks it up automatically for `de*` device languages.
   - `src/lib/store.ts`: add `'de'` to `LanguageSetting`.
4. Run `npm run check` – `i18n.test.ts` runs every check against the new locale automatically.
5. Some texts are country-specific (e.g. emergency numbers and eating-disorder organizations in `ui.safety`). Use resources for the new language's main region, or keep them generic.

## Writing style

- **Plain language.** Write for a curious adult, not a biochemist. Explain terms like _ketosis_ the first time.
- **Calm and non-judgmental.** Eating during a fast is not a failure. No guilt, no shame.
- **Honest about uncertainty.** Prefer "studies suggest" or "in animal studies" over absolute claims. Say "we don't know" when that's the truth.
- **No medical claims.** Don't promise disease prevention, longevity or "detox".
- **Numbers with care.** Round sensibly (≈ 95 kcal, not 94.6) and give ranges where people differ.

## Source policy

- Prefer randomized controlled trials, systematic reviews and meta-analyses; label observational studies and conference abstracts as such.
- Link to PubMed or the DOI. Avoid paywalled news coverage as the only source.
- Check the figure in the abstract or full text, including the sample size and duration.
- If a commonly repeated claim can't be traced to a source (e.g. "autophagy starts at 16 hours"), don't include it – or explain why it's unsupported.

All sources currently used are listed in [science.md](science.md).
