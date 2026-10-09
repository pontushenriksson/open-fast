import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/instrument-sans/wdth.css'
import './styles/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import { isNative } from './lib/notifications'

// The service worker gives offline support on the web. Native apps bundle their files already.
if (!isNative()) registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
