# Deployment: web, iOS and Android

Open Fast is one codebase with three ways to ship it:

| Target                                        | How                      | Effort                       | Notifications                              |
| --------------------------------------------- | ------------------------ | ---------------------------- | ------------------------------------------ |
| [Web / PWA](#web--pwa)                        | Static files on any host | Minutes                      | While the app is open or in the background |
| [iOS (App Store)](#ios-app-store)             | Capacitor native shell   | An afternoon + Apple review  | Real scheduled notifications               |
| [Android (Google Play)](#android-google-play) | Capacitor native shell   | An afternoon + Google review | Real scheduled notifications               |

Start with the web. It's free and instant, and on both iPhone and Android users can install it to the home screen, where it looks and works like an app.

---

## Web / PWA

### Build

```bash
npm run build
```

This creates `dist/` – plain static files (HTML, JS, CSS, icons, a web manifest and a service worker for offline use). Any static host works. **HTTPS is required** for installation and offline mode (all hosts below provide it).

### Vercel

1. Push the repo to GitHub.
2. In [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
4. Deploy. Every push to `main` redeploys automatically.

### Netlify

1. In [app.netlify.com](https://app.netlify.com), choose **Add new site → Import an existing project**.
2. Build command `npm run build`, publish directory `dist`.

Or from the terminal:

```bash
npx netlify-cli deploy --prod --dir=dist
```

### Cloudflare Pages

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset **Vite**, build command `npm run build`, output `dist`.

### GitHub Pages

GitHub Pages serves the site from a sub-path (`https://<user>.github.io/open-fast/`), so build with a base path:

```bash
BASE_PATH=/open-fast/ npm run build
```

To automate it, add `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: /${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then enable **Settings → Pages → Source: GitHub Actions** in the repository.

### Your own server

Copy `dist/` to any web server (nginx, Apache, S3 + CloudFront…). Two recommendations:

- Serve `sw.js` and `index.html` with `Cache-Control: no-cache` so updates reach users quickly.
- Everything in `assets/` has hashed filenames and can be cached forever.

### Installing the PWA

| Platform               | Steps                                                             |
| ---------------------- | ----------------------------------------------------------------- |
| iPhone / iPad (Safari) | Share button → **Add to Home Screen**                             |
| Android (Chrome)       | ⋮ menu → **Install app** (Chrome often suggests it automatically) |
| Desktop (Chrome/Edge)  | Install icon in the address bar                                   |

The app also shows these instructions in **Settings** when it isn't installed.

**PWA limitations:** browsers can't schedule notifications while the app is closed. Open Fast therefore offers a calendar reminder (`.ics`) on the timer screen, which works on every phone. If you want real background notifications, ship the native apps below.

---

## Native apps with Capacitor

[Capacitor](https://capacitorjs.com) wraps the same web build in a native iOS/Android app. The project is already configured (`capacitor.config.ts`) and uses `@capacitor/local-notifications` for real scheduled "goal reached" notifications – the code in `src/lib/notifications.ts` picks the native path automatically.

### One-time setup

1. **Pick your app id.** Edit `appId` in `capacitor.config.ts` – a reverse-domain id you own, e.g. `com.yourname.openfast`. It can't be changed after you publish.
2. **Add the platforms** you want (this creates the `ios/` and `android/` folders – commit them):

   ```bash
   npm run build
   npx cap add ios
   npx cap add android
   ```

3. **App icons and splash screens.** Put a 1024×1024 `icon.png` (and optionally `splash.png`, 2732×2732) in an `assets/` folder and run:

   ```bash
   npx @capacitor/assets generate --iconBackgroundColor '#0d0f1c' --splashBackgroundColor '#0d0f1c'
   ```

   You can export the icon from `public/icon.svg`.

### Day-to-day workflow

After changing the web code:

```bash
npm run cap:ios       # build → sync → open Xcode
npm run cap:android   # build → sync → open Android Studio
```

Then press **Run** in Xcode / Android Studio to launch on a simulator or a connected device.

---

## iOS (App Store)

### Requirements

- A Mac with **Xcode** (latest from the Mac App Store) and its command line tools: `xcode-select --install`
- An **Apple Developer account** ($99/year) to run on devices for more than 7 days and to publish
- An iPhone for testing (recommended)

### Run on your iPhone

1. `npm run cap:ios`
2. In Xcode, select the **App** target → **Signing & Capabilities** → choose your **Team**.
3. Connect your iPhone, pick it as the run destination and press **Run** (▶).
4. The first time, trust the developer certificate on the phone: **Settings → General → VPN & Device Management**.

### Publish

1. In Xcode, set the **version** and **build number** (target → General).
2. Select **Any iOS Device (arm64)** and choose **Product → Archive**.
3. In the Organizer window: **Distribute App → App Store Connect → Upload**.
4. In [App Store Connect](https://appstoreconnect.apple.com): create the app, fill in the listing (screenshots from `docs/screenshots` are a good start), the privacy section (_Data Not Collected_ – everything is stored on the device) and submit for review.
5. Optionally test with **TestFlight** first.

**Review tips:** Apple looks closely at health apps. Keep the in-app disclaimer, don't claim medical benefits, and mention in the review notes that the app gives general information and stores all data locally.

---

## Android (Google Play)

### Requirements

- **Android Studio** (bundles the Android SDK and an emulator)
- **JDK 21** (bundled with recent Android Studio)
- A **Google Play Console** account ($25 one-time) to publish

### Run on a device or emulator

1. `npm run cap:android`
2. Let Gradle sync finish in Android Studio.
3. Pick an emulator or a USB-connected phone (enable _Developer options → USB debugging_) and press **Run**.

### Notification permissions

Android 13+ asks the user for permission to show notifications – the app requests it when the user enables the goal notification in Settings. For notifications to fire at the exact minute while the phone is idle, add this to `android/app/src/main/AndroidManifest.xml` (inside `<manifest>`):

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

Without it, Android may deliver the notification a few minutes late – fine for a fasting goal.

### Publish

1. **Build → Generate Signed App Bundle / APK → Android App Bundle**, and create an upload key (store it safely – you need it for every update).
2. In the [Play Console](https://play.google.com/console), create the app and upload the `.aab` to an internal test track first.
3. Fill in the store listing, **Data safety** (no data collected or shared) and the content rating questionnaire, then promote to production.

Bump `versionCode` and `versionName` in `android/app/build.gradle` for every release.

### Alternative: Trusted Web Activity

If you only want a Play Store listing for the hosted PWA (no native notifications), you can wrap the deployed URL in a Trusted Web Activity with [PWABuilder](https://www.pwabuilder.com) or [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap). It requires hosting a `/.well-known/assetlinks.json` file on your domain.

---

## Release checklist

- [ ] `npm run check` passes
- [ ] Version bumped in `package.json` (shown in Settings) and, for native apps, in Xcode / `build.gradle`
- [ ] `CHANGELOG.md` updated
- [ ] Tested on a real phone in both English and Swedish, light and dark theme
- [ ] For native: `npm run cap:sync` run after the last web build
