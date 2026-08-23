import { useMemo, useState } from 'react'
import { ArrowLeft, ExternalLink, Info, Landmark } from 'lucide-react'
import { diwWealthScenarios, diwWealthSource } from './data/diw2026'

const number = (value: number, digits = 1) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: digits }).format(value)

export default function DiwWealthLab() {
  const [selectedId, setSelectedId] = useState('2-5')
  const selected = useMemo(() => diwWealthScenarios.find((item) => item.id === selectedId) ?? diwWealthScenarios[1], [selectedId])

  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-14">
        <a href="./" className="inline-flex items-center gap-1 text-sm font-bold text-ink-muted hover:text-ink"><ArrowLeft size={16} /> FairEint 5.0</a>

        <div className="mt-8 flex flex-wrap gap-2"><span className="rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-gold">DIW 2026 · Tabelle 5-4</span><span className="rounded-full bg-blue-light px-3 py-1 text-xs font-bold text-blue">Modell, keine Prognose</span></div>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">Was bringt eine <span className="text-gold">1%-Vermögensteuer</span> — je nach Freibetrag?</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">Wähle einen persönlichen Freibetrag. Der Unternehmensfreibetrag bleibt in diesen drei direkt vergleichbaren DIW-Szenarien bei 5 Mio. €. FairEint zeigt die Original-Mikrosimulationswerte, nicht eine selbst erfundene Schätzung.</p>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          {diwWealthScenarios.map((scenario) => {
            const active = scenario.id === selected.id
            return <button key={scenario.id} onClick={() => setSelectedId(scenario.id)} className={`rounded-3xl border p-5 text-left transition ${active ? 'border-ink bg-ink text-white shadow-xl' : 'border-border bg-white hover:border-ink/30'}`}>
              <div className={`text-xs font-black uppercase tracking-widest ${active ? 'text-white/45' : 'text-ink-muted'}`}>Persönlicher Freibetrag</div>
              <div className="mt-2 text-3xl font-black">{scenario.personalAllowanceM} Mio. €</div>
              <div className={`mt-1 text-xs ${active ? 'text-white/60' : 'text-ink-muted'}`}>+ {scenario.businessAllowanceM} Mio. € Unternehmensfreibetrag</div>
              <div className="mt-5 text-sm font-bold">→ {number(scenario.revenueBn)} Mrd. €/Jahr</div>
            </button>
          })}
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-9">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Ausgewähltes Szenario</div>
              <div className="mt-3 text-6xl font-black tracking-tight">{number(selected.revenueBn)} <span className="text-2xl">Mrd. €</span></div>
              <p className="mt-2 text-sm text-ink-muted">simuliertes jährliches Steueraufkommen</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-bg-alt p-4"><div className="text-xs text-ink-muted">Konfidenzintervall der DIW-Schätzung</div><div className="mt-1 text-xl font-black">{number(selected.ciLowBn)}–{number(selected.ciHighBn)} Mrd. €</div></div>
                <div className="rounded-2xl bg-bg-alt p-4"><div className="text-xs text-ink-muted">Steuerpflichtige im Modell</div><div className="mt-1 text-xl font-black">≈ {number(selected.taxpayersThousands / 1000, 3)} Mio.</div></div>
              </div>

              <div className="mt-6 rounded-2xl border border-gold/20 bg-gold-light/60 p-4 text-sm leading-relaxed text-ink-soft"><strong>Wichtig:</strong> Das ist das potenzielle Aufkommen im DIW-Mikrosimulationsszenario. Die Studie weist ausdrücklich darauf hin, dass mögliche Anpassungsreaktionen der Steuerpflichtigen das reale Aufkommen verändern können.</div>
            </div>

            <aside className="border-t border-border bg-bg-alt p-6 sm:p-9 lg:border-l lg:border-t-0">
              <Landmark className="text-gold" />
              <h2 className="mt-4 text-xl font-black">Was wird konstant gehalten?</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                <li>✓ proportionaler Steuersatz: <strong>1 % pro Jahr</strong></li>
                <li>✓ Unternehmensfreibetrag: <strong>5 Mio. €</strong></li>
                <li>✓ nur der persönliche Freibetrag ändert sich</li>
                <li>✓ Zahlen stammen aus derselben DIW-Tabelle</li>
              </ul>
              <div className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-ink-muted"><strong>Auftraggeber transparent:</strong><br />{diwWealthSource.commissionedBy}</div>
              <a href={diwWealthSource.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white">Originalstudie öffnen <ExternalLink size={14} /></a>
            </aside>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-blue/20 bg-blue-light p-5 sm:p-6">
          <div className="flex gap-3"><Info className="mt-0.5 shrink-0 text-blue" size={19} /><div><h2 className="font-black text-blue">Warum ist dieses Lab separat vom FairEint-Partei-Match?</h2><p className="mt-2 text-sm leading-relaxed text-ink-soft">Weil eine konkrete fiskalische DIW-Simulation etwas anderes ist als eine grobe politische Richtungsentscheidung. Wir zeigen sie nebeneinander, aber mischen sie nicht heimlich in Partei- oder Konsensscores. Genau diese Trennung soll FairEint politisch belastbar machen.</p></div></div>
        </section>
      </div>
    </main>
  )
}
