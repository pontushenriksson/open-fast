# Getting started

From zero to Open Fast running on your phone in about five minutes.

## 1. Prerequisites

| Tool                          | Version                                    | Check           |
| ----------------------------- | ------------------------------------------ | --------------- |
| [Node.js](https://nodejs.org) | 20 or newer (22 recommended, see `.nvmrc`) | `node -v`       |
| npm                           | comes with Node                            | `npm -v`        |
| Git                           | any recent                                 | `git --version` |

Native builds need more tools – see [deployment.md](deployment.md#ios-app-store).

## 2. Install and run

```bash
git clone https://github.com/pontushenriksson/open-fast.git
cd open-fast
npm install
npm run dev
```

Vite prints two URLs:

```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.23:5173/
```

- Open **Local** on your computer.
- Open **Network** on your phone (same Wi-Fi) to try it on a real device. Use your browser's device toolbar for a quick mobile view on desktop.

> Service workers and "install app" only work over HTTPS or on `localhost`. On your phone over the LAN everything works except installation and offline mode – use a deployed URL (see [deployment.md](deployment.md)) to test those.

## 3. The everyday commands

| Command                            | Use it when                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run dev`                      | Developing. Hot reload on save.                                                                   |
| `npm run check`                    | Before committing. Runs type-check, ESLint, Prettier check and unit tests – exactly what CI runs. |
| `npm test` / `npm run test:watch`  | Working on logic in `src/lib` or translations.                                                    |
| `npm run format`                   | Auto-format all files.                                                                            |
| `npm run build && npm run preview` | Testing the production build, service worker and offline mode locally.                            |

## 4. Find your way around

| I want to…                             | Go to                                                   |
| -------------------------------------- | ------------------------------------------------------- |
| Change a text or translation           | `src/i18n/locales/en/*` and `src/i18n/locales/sv/*`     |
| Add a food to "Does it break my fast?" | `src/content/foods.ts` + both `foods.ts` locale files   |
| Change fasting phases or their sources | `src/content/phases.ts` + both `phases.ts` locale files |
| Change how energy/weight is estimated  | `src/lib/energy.ts` (with tests in `energy.test.ts`)    |
| Change colors, fonts or spacing        | `src/styles/tokens.css`                                 |
| Understand the data model              | `src/lib/store.ts`                                      |

Read [architecture.md](architecture.md) for the full picture, and [content-and-translations.md](content-and-translations.md) before editing content.

## 5. Reset the app while developing

All data lives in `localStorage` under the key `open-fast:v1`. To start over (and see onboarding again):

- In the app: **Settings → Delete everything**, or
- In the browser console: `localStorage.removeItem('open-fast:v1'); location.reload()`

## Troubleshooting

| Problem                                                  | Fix                                                                                                        |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `npm install` fails on `sharp`                           | Only needed for `npm run icons`. Run `npm install --ignore-scripts` if you don't need to regenerate icons. |
| Phone can't reach the Network URL                        | Make sure both devices are on the same network and that your firewall allows port 5173.                    |
| Old version keeps showing after deploy                   | The service worker updates in the background; close and reopen the app (or hard-reload) once.              |
| TypeScript errors in your editor but not in the terminal | Use the workspace TypeScript version (`node_modules/typescript`).                                          |
