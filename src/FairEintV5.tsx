import { useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BarChart3, Check, ChevronDown, Clipboard, Copy, ExternalLink,
  FileText, FlaskConical, HeartHandshake, Info, Landmark, Printer, RefreshCw, Share2, Sparkles, Users,
} from 'lucide-react'
import {
  budgetCategories, defaultBudget, groundTruth, revenueModel, spendingGroundTruth,
  type BudgetCategoryId, type BudgetState, type ChoiceLevel, type DebtChoice,
} from './data/v2'
import { evidenceLedger, householdArchetypes, implementationPath, versionMilestones } from './data/v5'
import { defaultChoices, type PolicyChoices } from './lib/policyEngine'
import {
  consensus, horizonEnvelopes, householdImpacts, packageFromSearch, packageSearch, parsePackageLink,
  politicalSummary, rebalanceBudget, topPublicConsensus, type FairPackage,
} from './lib/v5Engine'

type Stage = 'home' | 'build' | 'result' | 'impact' | 'politics' | 'consensus' | 'evidence'

const choiceLevels: { value: ChoiceLevel; label: string; hint: string }[] = [
  { value: 'off', label: 'Nein', hint: 'Status quo / keine zusätzliche Belastung' },
  { value: 'moderate', label: 'Gezielt', hint: 'hohe Freibeträge, fokussierte Reform' },
  { value: 'strong', label: 'Deutlich', hint: 'stärkere Progression / geringere Ausnahmen' },
]

const debtLevels: { value: DebtChoice; label: string; hint: string }[] = [
  { value: 'strict', label: 'Strikt', hint: 'Schuldenregel eng halten' },
  { value: 'balanced', label: 'Balanciert', hint: 'Investitionen + Haushaltsdisziplin' },
  { value: 'flexible', label: 'Flexibel', hint: 'mehr Spielraum für Investitionen' },
]

const formatMoney = (value: number) => `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value)} Mrd. €`

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'green' | 'gold' | 'blue' | 'red' }) {
  const styles = {
    neutral: 'bg-bg-alt text-ink-soft', green: 'bg-green-light text-green', gold: 'bg-gold-light text-gold',
    blue: 'bg-blue-light text-blue', red: 'bg-red-light text-red',
  }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[tone]}`}>{children}</span>
}

function Shell({ stage, setStage, children }: { stage: Stage; setStage: (stage: Stage) => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          <button onClick={() => setStage('home')} className="mr-auto flex items-center gap-2 font-black tracking-tight">
            <span>FairEint</span><span className="rounded-full bg-ink px-2 py-0.5 text-[10px] text-white">5.0</span>
          </button>
          <nav className="hidden gap-1 md:flex">
            {([
              ['build', 'Bauen'], ['impact', 'Wirkung'], ['politics', 'Politik'], ['consensus', 'Konsens'], ['evidence', 'Quellen'],
            ] as [Stage, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setStage(id)} className={`rounded-xl px-3 py-2 text-xs font-bold ${stage === id ? 'bg-ink text-white' : 'text-ink-muted hover:bg-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setStage('build')} className="rounded-xl bg-gold px-3 py-2 text-xs font-bold text-white md:hidden">Bauen</button>
        </div>
      </header>
      {children}
    </div>
  )
}

function ChoiceGroup({ title, subtitle, value, onChange }: { title: string; subtitle: string; value: ChoiceLevel; onChange: (value: ChoiceLevel) => void }) {
  return (
    <section className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <h3 className="font-black">{title}</h3><p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {choiceLevels.map((option) => (
          <button key={option.value} onClick={() => onChange(option.value)} className={`rounded-2xl border p-3 text-left transition ${value === option.value ? 'border-ink bg-ink text-white' : 'border-border hover:border-ink/30'}`}>
            <div className="font-bold">{option.label}</div><div className={`mt-1 text-xs ${value === option.value ? 'text-white/65' : 'text-ink-muted'}`}>{option.hint}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

function BudgetEditor({ budget, setBudget }: { budget: BudgetState; setBudget: (budget: BudgetState) => void }) {
  return (
    <section className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className="font-black">100 Punkte. Wohin damit?</h3><p className="mt-1 text-sm text-ink-muted">Jeder Plus-Klick nimmt automatisch Punkte aus den anderen Töpfen.</p></div><Badge tone="green">Summe 100</Badge></div>
      <div className="mt-5 space-y-4">
        {budgetCategories.map((category) => (
          <div key={category.id}>
            <div className="mb-1.5 flex items-center gap-2"><span>{category.emoji}</span><span className="min-w-0 flex-1 truncate text-sm font-semibold">{category.label}</span>{typeof category.support === 'number' && <span className="text-[11px] text-ink-muted">{category.support}% wollen mehr</span>}<strong className="w-10 text-right text-sm">{budget[category.id]}%</strong></div>
            <div className="flex items-center gap-2">
              <button aria-label={`${category.label} reduzieren`} onClick={() => setBudget(rebalanceBudget(budget, category.id, -2))} className="h-8 w-8 rounded-lg border border-border font-bold hover:bg-bg-alt">−</button>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-ink transition-all" style={{ width: `${Math.min(100, budget[category.id] * 2.5)}%` }} /></div>
              <button aria-label={`${category.label} erhöhen`} onClick={() => setBudget(rebalanceBudget(budget, category.id, 2))} className="h-8 w-8 rounded-lg border border-border font-bold hover:bg-bg-alt">+</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GroundTruthStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {groundTruth.map((item) => (
        <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-4xl font-black tracking-tight">{item.value}{item.suffix}</div><div className="mt-2 text-sm font-bold leading-snug">{item.label}</div><div className="mt-3 text-[11px] text-ink-muted">{item.sourceLabel} ↗</div>
        </a>
      ))}
    </div>
  )
}

function Home({ setStage }: { setStage: (stage: Stage) => void }) {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,105,20,0.13),transparent_32%),radial-gradient(circle_at_85%_40%,rgba(40,112,176,0.10),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap gap-2"><Badge tone="green">Parteiunabhängig</Badge><Badge tone="blue">Ground Truth zuerst</Badge><Badge tone="gold">V5 · Konsens-Lab</Badge></div>
          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">Politik zum <span className="text-gold">Ausprobieren.</span><br />Und zum Einigen.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">Baue dein Steuer- und Investitionspaket, prüfe Folgen und Quellen, vergleiche Programme — und finde heraus, worauf sich deine Freunde tatsächlich einigen können.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => setStage('build')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 font-bold text-white shadow-xl">Mein Deutschland bauen <ArrowRight size={18} /></button><button onClick={() => setStage('consensus')} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-6 py-4 font-bold"><Users size={18} /> Gruppen-Konsens testen</button></div>
          <div className="mt-9 grid gap-2 text-xs text-ink-muted sm:grid-cols-4"><span>📊 echte repräsentative Umfragen</span><span>🧪 Modelle klar markiert</span><span>🗳️ keine Wahlempfehlung</span><span>🔗 Pakete vergleichbar & teilbar</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6"><div className="mb-7"><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Ground Truth</div><h2 className="mt-2 text-3xl font-black tracking-tight">Bevor wir streiten: Was zeigen die Daten?</h2></div><GroundTruthStrip /></section>
      <section className="border-y border-border bg-white"><div className="mx-auto max-w-6xl px-4 py-14 sm:px-6"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">2.1 → 5.0</div><h2 className="mt-2 text-3xl font-black">Alles in einer Experience.</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">Jede Version löst ein anderes Problem: Glaubwürdigkeit, Wirkung, Zeit, politische Nutzbarkeit und schließlich Konsens.</p></div><div className="grid gap-3 sm:grid-cols-2">{versionMilestones.map((item) => <div key={item.version} className="rounded-2xl border border-border p-4"><div className="flex items-center justify-between"><strong>{item.version} · {item.title}</strong><Badge tone="green">gebaut</Badge></div><p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.detail}</p></div>)}</div></div></div></section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6"><div className="rounded-[2rem] bg-ink p-7 text-white sm:p-10"><div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center"><div><Sparkles className="text-gold-light" /><h2 className="mt-4 text-3xl font-black">Der eigentliche Moonshot: Konsens sichtbar machen.</h2><p className="mt-3 text-white/65">Nicht „welches Lager gewinnt?“, sondern: Welche Prioritäten teilen Menschen mit unterschiedlichen politischen Instinkten — und was ist der kleinste tragfähige Kompromiss?</p></div><button onClick={() => setStage('consensus')} className="rounded-2xl bg-white px-6 py-5 text-left text-ink"><div className="text-xs font-black uppercase tracking-widest text-gold">V5</div><div className="mt-1 text-xl font-black">Links von Freunden rein → gemeinsames Paket raus</div><div className="mt-2 text-sm text-ink-muted">Keine Registrierung. Keine Speicherung. Läuft im Browser.</div></button></div></div></section>
    </main>
  )
}

function Builder({ pkg, setPkg, setStage }: { pkg: FairPackage; setPkg: (pkg: FairPackage) => void; setStage: (stage: Stage) => void }) {
  const revenue = revenueModel.wealth[pkg.choices.wealth]
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <button onClick={() => setStage('home')} className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-ink-muted hover:text-ink"><ArrowLeft size={16} /> Zurück</button>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Build</div><h1 className="mt-2 text-4xl font-black tracking-tight">Dein Deutschland-Paket.</h1><p className="mt-3 max-w-2xl text-ink-soft">Vier Richtungsentscheidungen, dann 100 Budgetpunkte. Die UI bleibt simpel; Methodik und Unsicherheit liegen einen Tap tiefer.</p>
          <div className="mt-7 space-y-4">
            <ChoiceGroup title="Vermögensteuer" subtitle="64 % befürworteten 2026 eine Wiedereinführung." value={pkg.choices.wealth} onChange={(wealth) => setPkg({ ...pkg, choices: { ...pkg.choices, wealth } })} />
            <ChoiceGroup title="Hohe Erbschaften" subtitle="61 % befürworteten höhere Steuern auf hohe Erbschaften." value={pkg.choices.inheritance} onChange={(inheritance) => setPkg({ ...pkg, choices: { ...pkg.choices, inheritance } })} />
            <ChoiceGroup title="Hohe Einkommen" subtitle="67 % hielten höhere Steuern auf hohe Einkommen im Mai 2026 für den richtigen Weg." value={pkg.choices.highIncome} onChange={(highIncome) => setPkg({ ...pkg, choices: { ...pkg.choices, highIncome } })} />
            <section className="rounded-3xl border border-border bg-white p-5 shadow-sm sm:p-6"><h3 className="font-black">Investitionen & Schuldenregel</h3><p className="mt-1 text-sm text-ink-muted">59 % akzeptierten in der IMK-Befragung grundsätzlich Kredite für öffentliche Investitionen; Umschichtungen blieben die bevorzugte Finanzierungsoption.</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{debtLevels.map((option) => <button key={option.value} onClick={() => setPkg({ ...pkg, choices: { ...pkg.choices, debt: option.value } })} className={`rounded-2xl border p-3 text-left ${pkg.choices.debt === option.value ? 'border-ink bg-ink text-white' : 'border-border'}`}><div className="font-bold">{option.label}</div><div className={`mt-1 text-xs ${pkg.choices.debt === option.value ? 'text-white/65' : 'text-ink-muted'}`}>{option.hint}</div></button>)}</div></section>
            <BudgetEditor budget={pkg.budget} setBudget={(budget) => setPkg({ ...pkg, budget })} />
          </div>
        </div>
        <aside className="lg:sticky lg:top-20 lg:self-start"><div className="rounded-3xl bg-ink p-6 text-white shadow-xl"><div className="text-xs font-black uppercase tracking-widest text-white/45">Modell · nicht Ground Truth</div><div className="mt-2 text-4xl font-black">{formatMoney(revenue.low)}–<br />{formatMoney(revenue.high)}</div><p className="mt-3 text-sm leading-relaxed text-white/65">jährlicher FairEint-Explorationskorridor nur für die Vermögensteuer-Komponente.</p><a href={revenueModel.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">DIW-Modellquelle <ExternalLink size={12} /></a><button onClick={() => setStage('result')} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 font-black text-ink">Paket auswerten <ArrowRight size={18} /></button></div>
          <div className="mt-4 rounded-2xl border border-border bg-white p-4 text-xs leading-relaxed text-ink-muted"><strong className="text-ink">Warum kein Gesamt-Eurobetrag?</strong><br />Erbschaft- und Einkommensteuer sind in V5 noch nicht monetarisiert, solange keine einheitliche, geprüfte Szenariotabelle eingebunden ist. Keine Scheingenauigkeit.</div></aside>
      </div>
    </main>
  )
}

function Result({ pkg, setStage, sharePackage }: { pkg: FairPackage; setStage: (stage: Stage) => void; sharePackage: () => void }) {
  const summary = useMemo(() => politicalSummary(pkg), [pkg])
  const publicConsensus = useMemo(() => topPublicConsensus(pkg), [pkg])
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Dein Ergebnis</div><h1 className="mt-2 text-4xl font-black tracking-tight">So sieht dein Paket aus.</h1></div><div className="flex gap-2"><button onClick={() => setStage('build')} className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-bold">Ändern</button><button onClick={sharePackage} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white"><Share2 size={15} /> Teilen</button></div></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-ink p-6 text-white"><div className="text-xs font-black uppercase tracking-widest text-white/40">Vermögensteuer-Modell</div><div className="mt-2 text-3xl font-black">{summary.revenue.low}–{summary.revenue.high} Mrd. €/Jahr</div><div className="mt-2 text-xs text-white/55">Explorationskorridor, keine Prognose</div></div><div className="rounded-3xl border border-border bg-white p-6"><div className="text-xs font-black uppercase tracking-widest text-ink-muted">Top-Priorität</div><div className="mt-2 text-3xl font-black">{summary.top[0].emoji} {pkg.budget[summary.top[0].id]}%</div><div className="mt-2 text-sm text-ink-soft">{summary.top[0].label}</div></div><div className="rounded-3xl border border-border bg-white p-6"><div className="text-xs font-black uppercase tracking-widest text-ink-muted">Programm-Nähe</div><div className="mt-2 text-3xl font-black">{summary.matches[0].score}%</div><div className="mt-2 text-sm text-ink-soft">am nächsten: {summary.matches[0].party.name} · keine Wahlempfehlung</div></div></div>
      <section className="mt-8"><h2 className="text-2xl font-black">Wo dein Paket auf breiten Bürgerwunsch trifft</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{publicConsensus.map((item) => <div key={item.id} className="rounded-2xl border border-border bg-white p-4"><div className="flex items-center justify-between"><span className="text-2xl">{item.emoji}</span><Badge tone="green">{item.support}% wollen mehr</Badge></div><div className="mt-3 font-black">{item.label}</div><div className="mt-1 text-sm text-ink-muted">Du gibst {item.share}% deines Zusatzbudgets.</div></div>)}</div></section>
      <section className="mt-8 grid gap-4 md:grid-cols-3"><button onClick={() => setStage('impact')} className="rounded-3xl border border-border bg-white p-6 text-left hover:border-ink/30"><FlaskConical /><div className="mt-4 text-xl font-black">Wirkung simulieren</div><p className="mt-2 text-sm text-ink-muted">Haushalte + 1/5/10 Jahre</p></button><button onClick={() => setStage('politics')} className="rounded-3xl border border-border bg-white p-6 text-left hover:border-ink/30"><Landmark /><div className="mt-4 text-xl font-black">Politik-Modus</div><p className="mt-2 text-sm text-ink-muted">Programme, Bundestag, Briefing</p></button><button onClick={() => setStage('consensus')} className="rounded-3xl border border-border bg-white p-6 text-left hover:border-ink/30"><HeartHandshake /><div className="mt-4 text-xl font-black">Mit Freunden vergleichen</div><p className="mt-2 text-sm text-ink-muted">Konsens statt Lagerdenken</p></button></section>
    </main>
  )
}

function Impact({ pkg, setStage }: { pkg: FairPackage; setStage: (stage: Stage) => void }) {
  const impacts = useMemo(() => householdImpacts(pkg), [pkg])
  const horizons = useMemo(() => horizonEnvelopes(pkg), [pkg])
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="flex items-center gap-3"><button onClick={() => setStage('result')} className="rounded-xl border border-border bg-white p-2"><ArrowLeft size={18} /></button><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">2.5 + 3.0</div><h1 className="text-4xl font-black tracking-tight">Wer spürt was — und wann?</h1></div></div>
      <div className="mt-6 rounded-2xl border border-blue/20 bg-blue-light p-4 text-sm leading-relaxed text-blue"><strong>Kein Mikrosimulationsmodell.</strong> Diese Karten sind transparente Stresstests: Steuerexposition und Passung zu öffentlichen Prioritäten werden getrennt gezeigt. Keine individuellen Euro-Gewinne.</div>
      <section className="mt-8"><h2 className="text-2xl font-black">Haushalts-Stresstest</h2><div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{impacts.map((item) => <article key={item.id} className="rounded-3xl border border-border bg-white p-5"><div className="text-3xl">{item.emoji}</div><h3 className="mt-3 font-black">{item.title}</h3><p className="text-sm text-ink-muted">{item.subtitle}</p><div className="mt-5"><div className="flex justify-between text-xs"><span>Steuerexposition</span><strong>{item.taxPressure}%</strong></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full bg-red" style={{ width: `${item.taxPressure}%` }} /></div><div className="mt-1 text-[11px] text-ink-muted">{item.taxLabel}</div></div><div className="mt-4"><div className="flex justify-between text-xs"><span>Passung der Ausgabenprioritäten</span><strong>{item.serviceFit}%</strong></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full bg-green" style={{ width: `${item.serviceFit}%` }} /></div><div className="mt-1 text-[11px] text-ink-muted">{item.serviceLabel}</div></div><details className="mt-4 text-xs text-ink-muted"><summary className="cursor-pointer font-bold">Grenzen dieses Stresstests</summary><p className="mt-2 leading-relaxed">{item.caveat}</p></details></article>)}</div></section>
      <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black">1 / 5 / 10 Jahre</h2><p className="mt-1 text-sm text-ink-muted">Mechanische Fiskalhülle statt Zukunftsorakel.</p></div><Badge tone="gold">Modell</Badge></div><div className="mt-4 grid gap-4 lg:grid-cols-3">{horizons.map((item) => <article key={item.years} className="rounded-3xl border border-border bg-white p-5"><div className="flex items-center justify-between"><strong className="text-xl">{item.years} {item.years === 1 ? 'Jahr' : 'Jahre'}</strong><Badge tone={item.confidence === 'medium' ? 'blue' : 'gold'}>{item.confidence}</Badge></div><div className="mt-4 text-3xl font-black">{formatMoney(item.low)}–{formatMoney(item.high)}</div><p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.note}</p><div className="mt-5 space-y-2">{item.allocations.map((allocation) => <div key={allocation.id} className="flex items-center justify-between gap-3 text-xs"><span>{allocation.emoji} {allocation.label}</span><strong>{allocation.low.toFixed(1)}–{allocation.high.toFixed(1)}</strong></div>)}</div></article>)}</div></section>
      <section className="mt-12"><h2 className="text-2xl font-black">Was müsste politisch wirklich passieren?</h2><div className="mt-4 grid gap-4 lg:grid-cols-3">{implementationPath.map((phase) => <div key={phase.horizon} className="rounded-3xl bg-ink p-5 text-white"><div className="text-xs font-black uppercase tracking-widest text-gold-light">{phase.horizon}</div><h3 className="mt-2 text-xl font-black">{phase.title}</h3><ul className="mt-4 space-y-2 text-sm text-white/65">{phase.points.map((point) => <li key={point} className="flex gap-2"><Check className="mt-0.5 shrink-0" size={14} />{point}</li>)}</ul></div>)}</div></section>
    </main>
  )
}

function Politics({ pkg, setStage }: { pkg: FairPackage; setStage: (stage: Stage) => void }) {
  const summary = useMemo(() => politicalSummary(pkg), [pkg])
  const [copied, setCopied] = useState(false)
  const copyBrief = async () => { await navigator.clipboard.writeText(summary.text); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }
  const parliament = evidenceLedger.filter((item) => item.kind === 'parliament')
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="print:hidden"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><button onClick={() => setStage('result')} className="rounded-xl border border-border bg-white p-2"><ArrowLeft size={18} /></button><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">4.0 · Politik-Modus</div><h1 className="text-4xl font-black tracking-tight">Vom Gespräch zum Briefing.</h1></div></div><div className="flex gap-2"><button onClick={copyBrief} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-bold"><Copy size={15} /> {copied ? 'Kopiert' : 'Kurztext'}</button><button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white"><Printer size={15} /> PDF / Drucken</button></div></div></div>
      <section className="mt-7 rounded-[2rem] border border-border bg-white p-6 shadow-sm sm:p-9 print:mt-0 print:border-0 print:shadow-none"><div className="flex items-start justify-between gap-5"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">FairEint · Bürger-Policy-Brief</div><h2 className="mt-2 text-3xl font-black">Steuern, Investitionen & dokumentierte politische Nähe</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">Dieses Briefing dokumentiert eine Nutzerentscheidung. Es ist weder repräsentative Bürgermeinung noch Wahlempfehlung. Repräsentative Umfragen, Modelle und politische Evidenz sind getrennt gekennzeichnet.</p></div><FileText className="hidden text-gold sm:block" size={40} /></div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-bg-alt p-4"><div className="text-xs text-ink-muted">Vermögensteuer-Korridor</div><strong className="mt-1 block text-xl">{summary.revenue.low}–{summary.revenue.high} Mrd. €/Jahr</strong><Badge tone="gold">Modell</Badge></div>{summary.top.slice(0, 2).map((item) => <div key={item.id} className="rounded-2xl bg-bg-alt p-4"><div className="text-xs text-ink-muted">Priorität</div><strong className="mt-1 block text-xl">{item.emoji} {item.label}</strong><div className="mt-1 text-sm">{pkg.budget[item.id]}% des Zusatzbudgets</div></div>)}</div>
        <div className="mt-8"><div className="flex items-center gap-2"><h3 className="text-xl font-black">Programm-Nähe</h3><Badge tone="blue">Programme / Positionen</Badge></div><p className="mt-1 text-xs text-ink-muted">Nur die im Modell enthaltenen Themen. Außenpolitik, Migration, Europa, Bürgerrechte u. a. fehlen.</p><div className="mt-4 space-y-3">{summary.matches.slice(0, 5).map((match, index) => <div key={match.party.id} className="rounded-2xl border border-border p-4"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-black text-white">{index + 1}</div><div className="flex-1"><div className="flex items-center justify-between gap-3"><strong>{match.party.name}</strong><strong>{match.score}%</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full bg-ink" style={{ width: `${match.score}%` }} /></div></div></div><div className="mt-3 grid gap-2 text-xs sm:grid-cols-2"><div><span className="font-bold text-green">Nähe:</span> {match.aligns.join(', ') || '–'}</div><div><span className="font-bold text-red">Abweichung:</span> {match.differs.join(', ') || '–'}</div></div><a href={match.party.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">{match.party.sourceLabel} <ExternalLink size={11} /></a></div>)}</div></div>
        <div className="mt-8"><div className="flex items-center gap-2"><h3 className="text-xl font-black">Was im Bundestag tatsächlich passiert ist</h3><Badge tone="green">separate Evidenz</Badge></div><p className="mt-1 text-xs text-ink-muted">Diese Ebene wird bewusst noch nicht in den Programm-Match eingerechnet. So vermischen wir Worte und Handlungen nicht heimlich.</p><div className="mt-4 grid gap-3 md:grid-cols-2">{parliament.map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border p-4 hover:border-ink/30"><div className="flex justify-between gap-3"><strong className="text-sm">{item.title}</strong><ExternalLink size={13} /></div><div className="mt-1 text-xs text-ink-muted">{item.publisher} · {item.date}</div><p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.note}</p></a>)}</div></div>
        <div className="mt-8 border-t border-border pt-5 text-[11px] leading-relaxed text-ink-muted">FairEint 5.0 · Stand August 2026 · Methodik und Quellen im Evidence Ledger. Politische Positionen verändern sich; vor externer Verwendung bitte Datum und Quelle öffnen.</div>
      </section>
    </main>
  )
}

const demoGroup = [
  '?name=Alex&w=moderate&e=moderate&i=moderate&d=balanced&b=24,18,14,13,12,7,5,7',
  '?name=Sam&w=off&e=moderate&i=off&d=strict&b=20,16,20,9,11,14,5,5',
  '?name=Lea&w=strong&e=strong&i=strong&d=flexible&b=25,22,9,14,11,5,4,10',
].join('\n')

function ConsensusLab({ pkg }: { pkg: FairPackage }) {
  const [input, setInput] = useState('')
  const parsed = useMemo(() => input.split(/\n+/).map((line, index) => parsePackageLink(line, index + 1)).filter(Boolean) as FairPackage[], [input])
  const group = useMemo(() => [{ ...pkg, name: 'Ich' }, ...parsed], [pkg, parsed])
  const result = useMemo(() => consensus(group), [group])
  const currentLink = `${window.location.origin}${window.location.pathname}${packageSearch(pkg)}`
  const copyCompromise = async () => { if (!result) return; await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}${packageSearch(result.compromise)}`) }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"><section><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">5.0 · Konsens-Lab</div><h1 className="mt-2 text-4xl font-black tracking-tight">Wo seid ihr euch wirklich einig?</h1><p className="mt-3 text-ink-soft">Dein aktuelles Paket ist automatisch Person 1. Lass Freunde ihr FairEint-Ergebnis schicken und füge jeden Link in eine neue Zeile ein.</p><div className="mt-5 rounded-2xl border border-border bg-white p-4"><div className="text-xs font-bold text-ink-muted">Dein Link</div><div className="mt-2 break-all text-xs">{currentLink}</div></div><textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder="FairEint-Link von Person 2\nFairEint-Link von Person 3\n…" className="mt-4 min-h-44 w-full rounded-2xl border border-border bg-white p-4 text-sm outline-none focus:border-ink" /><div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setInput(demoGroup)} className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-bold">Demo-Gruppe laden</button><button onClick={() => setInput('')} className="rounded-xl px-4 py-2 text-sm font-bold text-ink-muted">Leeren</button></div><p className="mt-4 text-xs leading-relaxed text-ink-muted"><strong>Datenschutz:</strong> V5 verarbeitet diese Links nur lokal im Browser. Es gibt in diesem Build keinen Gruppen-Backend-Speicher.</p></section>
        <section>{parsed.length === 0 ? <div className="flex min-h-96 items-center justify-center rounded-[2rem] border border-dashed border-border bg-white p-8 text-center"><div><Users className="mx-auto text-ink-muted" size={40} /><h2 className="mt-4 text-2xl font-black">Noch eine Person fehlt.</h2><p className="mt-2 max-w-md text-sm text-ink-muted">Füge mindestens einen zweiten Paket-Link ein — oder lade die Demo-Gruppe für den Wow-Effekt.</p></div></div> : result && <div><div className="rounded-[2rem] bg-ink p-7 text-white"><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-widest text-white/40">FairEint Konsens-Index · Simulation</div><div className="mt-2 text-6xl font-black">{result.score}</div><div className="mt-1 text-xl font-bold text-gold-light">{result.label}</div></div><div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{group.length} Menschen</div></div><p className="mt-4 text-sm text-white/60">Der Index misst Ähnlichkeit eurer eingegebenen Pakete — keine repräsentative Umfrage.</p></div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-border bg-white p-5"><h3 className="font-black text-green">Gemeinsame Basis</h3><div className="mt-4 space-y-3">{result.sharedTop.map((item) => <div key={item.id} className="flex items-center justify-between text-sm"><span>{item.emoji} {item.label}</span><strong>Ø {item.average}%</strong></div>)}</div></div><div className="rounded-3xl border border-border bg-white p-5"><h3 className="font-black text-red">Konfliktlinien</h3><div className="mt-4 flex flex-wrap gap-2">{result.conflicts.length ? result.conflicts.map((item) => <Badge key={item} tone="red">{item}</Badge>) : <span className="text-sm text-ink-muted">Keine große Konfliktlinie im aktuellen Set.</span>}</div></div></div>
          <div className="mt-4 rounded-3xl border border-border bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-black">Kleinster gemeinsamer Kompromiss</h3><p className="text-xs text-ink-muted">Median bei Steuerentscheidungen, gerundeter Durchschnitt beim Budget.</p></div><button onClick={copyCompromise} className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white"><Copy size={14} /> Kompromiss-Link</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{result.choices.map((choice) => <div key={choice.key} className="rounded-2xl bg-bg-alt p-3"><div className="text-xs text-ink-muted">{choice.label}</div><div className="mt-1 flex items-center justify-between"><strong>{choice.compromise}</strong><span className="text-xs">{choice.agreement}% exakt dabei</span></div></div>)}</div><div className="mt-5 space-y-2">{result.budget.sort((a, b) => b.average - a.average).map((item) => <div key={item.id}><div className="flex justify-between gap-4 text-xs"><span>{item.emoji} {item.label}</span><span>Ø {item.average}% · Range {item.min}–{item.max}</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-alt"><div className={`h-full ${item.status === 'strong' ? 'bg-green' : item.status === 'workable' ? 'bg-gold' : 'bg-red'}`} style={{ width: `${item.average * 2.5}%` }} /></div></div>)}</div></div>
        </div>}</section></div></main>
  )
}

function Evidence() {
  const [kind, setKind] = useState<'all' | string>('all')
  const filtered = evidenceLedger.filter((item) => kind === 'all' || item.kind === kind)
  const kindLabel: Record<string, string> = { 'ground-truth': 'Ground Truth', model: 'Modell', program: 'Programm', parliament: 'Bundestag', simulation: 'Simulation' }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="max-w-3xl"><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">2.1 · Evidence Ledger</div><h1 className="mt-2 text-4xl font-black tracking-tight">Jede wichtige Behauptung bekommt einen Pass.</h1><p className="mt-3 text-ink-soft">Quelle, Datum, Evidenzklasse, Confidence, Sample und Auftraggeber — damit ein Screenshot nie glaubwürdiger wirkt als seine Quelle.</p></div><div className="mt-6 flex flex-wrap gap-2">{['all', 'ground-truth', 'model', 'parliament'].map((item) => <button key={item} onClick={() => setKind(item)} className={`rounded-full px-3 py-2 text-xs font-bold ${kind === item ? 'bg-ink text-white' : 'border border-border bg-white'}`}>{item === 'all' ? 'Alle' : kindLabel[item]}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-2">{filtered.map((item) => <article key={item.id} className="rounded-3xl border border-border bg-white p-5"><div className="flex flex-wrap items-center gap-2"><Badge tone={item.kind === 'ground-truth' ? 'green' : item.kind === 'model' ? 'gold' : 'blue'}>{kindLabel[item.kind]}</Badge><Badge>{item.confidence}</Badge></div><h2 className="mt-3 text-lg font-black">{item.title}</h2><div className="mt-1 text-xs text-ink-muted">{item.publisher} · {item.date}</div><p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.note}</p>{item.sample && <div className="mt-3 text-xs"><strong>Sample:</strong> {item.sample}</div>}{item.commissionedBy && <div className="mt-2 text-xs"><strong>Auftraggeber:</strong> {item.commissionedBy}</div>}<a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">Originalquelle öffnen <ExternalLink size={12} /></a></article>)}</div></main>
  )
}

export default function FairEintV5() {
  const shared = useMemo(() => packageFromSearch(window.location.search), [])
  const params = useMemo(() => new URLSearchParams(window.location.search), [])
  const [pkg, setPkg] = useState<FairPackage>(shared ?? { choices: defaultChoices, budget: defaultBudget })
  const [stage, setStage] = useState<Stage>(params.get('view') === 'result' && shared ? 'result' : 'home')
  const [toast, setToast] = useState('')

  const navigate = (next: Stage) => {
    setStage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const sharePackage = async () => {
    const url = `${window.location.origin}${window.location.pathname}${packageSearch(pkg)}`
    const text = 'Ich habe mein FairEint-Paket gebaut. Bau deins und lass uns schauen, wo wir uns einigen.'
    try {
      if (navigator.share) await navigator.share({ title: 'Mein FairEint-Paket', text, url })
      else { await navigator.clipboard.writeText(url); setToast('Link kopiert ✓') }
    } catch { /* user cancelled native share */ }
    window.setTimeout(() => setToast(''), 1800)
  }

  return <Shell stage={stage} setStage={navigate}>
    {stage === 'home' && <Home setStage={navigate} />}
    {stage === 'build' && <Builder pkg={pkg} setPkg={setPkg} setStage={navigate} />}
    {stage === 'result' && <Result pkg={pkg} setStage={navigate} sharePackage={sharePackage} />}
    {stage === 'impact' && <Impact pkg={pkg} setStage={navigate} />}
    {stage === 'politics' && <Politics pkg={pkg} setStage={navigate} />}
    {stage === 'consensus' && <ConsensusLab pkg={pkg} />}
    {stage === 'evidence' && <Evidence />}
    {toast && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white shadow-xl print:hidden">{toast}</div>}
  </Shell>
}
