import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DiwWealthLab from './DiwWealthLab.tsx'
import FairEintV2 from './FairEintV2.tsx'
import FairEintV5 from './FairEintV5.tsx'
import PolicyOptimizer from './PolicyOptimizer.tsx'
import RealityLab from './RealityLab.tsx'
import WorkshopLab from './WorkshopLab.tsx'

const params = new URLSearchParams(window.location.search)
const showLegacy = params.get('legacy') === '1'
const showV2 = params.get('v2') === '1'
const showDiwLab = params.get('diw') === '1'
const showRealityLab = params.get('reality') === '1'
const showWorkshopLab = params.get('workshop') === '1'
const showOptimizer = params.get('optimizer') === '1'

function BonusLauncher() {
  return <div className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-border bg-white/95 p-1.5 shadow-xl backdrop-blur print:hidden">
    <a href="?reality=1" className="rounded-xl px-3 py-2 text-[11px] font-black text-ink hover:bg-bg-alt">Reality</a>
    <a href="?optimizer=1" className="rounded-xl px-3 py-2 text-[11px] font-black text-ink hover:bg-bg-alt">Optimizer</a>
    <a href="?workshop=1" className="rounded-xl bg-ink px-3 py-2 text-[11px] font-black text-white">Workshop</a>
  </div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showLegacy
      ? <App />
      : showV2
        ? <FairEintV2 />
        : showDiwLab
          ? <DiwWealthLab />
          : showRealityLab
            ? <RealityLab />
            : showWorkshopLab
              ? <WorkshopLab />
              : showOptimizer
                ? <PolicyOptimizer />
                : <><FairEintV5 /><BonusLauncher /></>}
  </StrictMode>,
)
