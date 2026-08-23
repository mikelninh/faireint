import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FairEintV2 from './FairEintV2.tsx'

const showLegacy = new URLSearchParams(window.location.search).get('legacy') === '1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showLegacy ? <App /> : <FairEintV2 />}
  </StrictMode>,
)
