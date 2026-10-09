# Contributing to Open Fast

Thanks for helping! Open Fast aims to be the most honest fasting app around, so content quality matters as much as code quality.

## Ways to help

- **Translations** – add a language or improve an existing one ([guide](docs/content-and-translations.md#add-a-new-language)).
- **Content corrections** – found an outdated figure or a claim without a source? [Open an issue](https://github.com/pontushenriksson/open-fast/issues/new?template=content-correction.md) with a link to the evidence.
- **Bugs and accessibility** – screen reader issues, contrast problems and small-screen layout bugs are all welcome fixes.
- **Features** – please open an issue to discuss bigger features first. Open Fast deliberately stays simple.

## Development setup

See [docs/getting-started.md](docs/getting-started.md). In short:

```bash
npm install
npm run dev
```

## Branches and pull requests

- `main` is the released version. `development` is where work comes together.
- Create a branch from `development` named after what it does, e.g. `feat/weekly-summary`, `fix/streak-midnight`, `content/add-kefir`, `i18n/german`.
- Open your pull request against `development`.
- Keep pull requests focused – one change per PR is easier to review.

### Before you open a PR

```bash
npm run check
```

This runs the TypeScript compiler, ESLint, the Prettier check and the unit tests – the same as CI. Run `npm run format` to fix formatting automatically.

Also:

- Try your change on a phone-sized screen (375 px wide), in both light and dark mode.
- If you changed or added text, update **every** locale. The compiler and `i18n.test.ts` will catch missing keys.
- If you changed logic in `src/lib`, add or update a test next to it (`*.test.ts`).

## Code style

- TypeScript strict mode, functional React components and hooks.
- Formatting is Prettier's job (`.prettierrc.json`); don't hand-format.
- Keep components small and readable. Put logic that doesn't need React in `src/lib` so it can be unit tested.
- No new runtime dependencies without discussing it first – bundle size and simplicity are features.
- Comments explain _why_, not _what_.

## Commit messages

Use short, imperative messages with a type prefix:

```
feat: add weekly summary card
fix: count streaks across daylight saving changes
content: add kefir to "does it break my fast?"
i18n: add German translation
docs: explain Android notification permissions
```

## Code of conduct

Be kind and assume good intent. Health topics can be personal – this includes comments about bodies, weight and eating.
