import type { CapacitorConfig } from '@capacitor/cli'

/**
 * Native iOS/Android shells around the web build (see docs/deployment.md).
 * Change `appId` to your own reverse-domain id before publishing to the stores.
 */
const config: CapacitorConfig = {
  appId: 'app.openfast',
  appName: 'Open Fast',
  webDir: 'dist',
  backgroundColor: '#0d0f1c',
  plugins: {
    LocalNotifications: {
      iconColor: '#f4a259',
    },
  },
}

export default config
