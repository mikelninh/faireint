import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DiwWealthLab from './DiwWealthLab.tsx'
import FairEintSimple from './FairEintSimple.tsx'
import FairEintV2 from './FairEintV2.tsx'
import FairEintV5 from './FairEintV5.tsx'
import PolicyOptimizer from './PolicyOptimizer.tsx'
import RealityLab from './RealityLab.tsx'
import WorkshopLab from './WorkshopLab.tsx'

const params = new URLSearchParams(window.location.search)
const showLegacy = params.get('legacy') === '1'
const showV2 = params.get('v2') === '1'
const showV5 = params.get('v5') === '1'
const showDiwLab = params.get('diw') === '1'
const showRealityLab = params.get('reality') === '1'
const showWorkshopLab = params.get('workshop') === '1'
const showOptimizer = params.get('optimizer') === '1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showLegacy
      ? <App />
      : showV2
        ? <FairEintV2 />
        : showV5
          ? <FairEintV5 />
          : showDiwLab
            ? <DiwWealthLab />
            : showRealityLab
              ? <RealityLab />
              : showWorkshopLab
                ? <WorkshopLab />
                : showOptimizer
                  ? <PolicyOptimizer />
                  : <FairEintSimple />}
  </StrictMode>,
)
