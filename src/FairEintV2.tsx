import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Copy, ExternalLink, Info, RotateCcw, Share2 } from 'lucide-react'
import {
  budgetCategories,
  defaultBudget,
  groundTruth,
  methodSources,
  revenueModel,
  spendingGroundTruth,
  type BudgetCategoryId,
  type BudgetState,
  type ChoiceLevel,
  type DebtChoice,
} from './data/v2'
import { calculatePartyMatches, defaultChoices, revenueRange, type PolicyChoices } from './lib/policyEngine'

type Step = 0 | 1 | 2 | 3

const stepLabels = ['Start', 'Finanzieren', 'Verteilen', 'Ergebnis']

function formatMoney(value: number) {
  return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(value)} Mrd. €`
}

function OptionButton({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`group rounded-2xl border p-4 text-left transition-all ${active ? 'border-ink bg-ink text-white shadow-lg' : 'border-border bg-white hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md'}`}>
      <div className="flex items-start justify-between gap-3">
        <div><div className="font-semibold leading-tight">{title}</div><div className={`mt-1 text-sm leading-snug ${active ? 'text-white/70' : 'text-ink-muted'}`}>{subtitle}</div></div>
        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-white bg-white text-ink' : 'border-border'}`}>{active && <Check size={13} strokeWidth={3} />}</div>
      </div>
    </button>
  )
}

function GroundTruthCard({ value, suffix, label, detail, sourceLabel, sourceUrl, fieldwork, sample }: (typeof groundTruth)[number]) {
  const [open, setOpen] = useState(false)
  return (
    <article className="rounded-3xl border border-border bg-white p-5 shadow-sm">
      <div className="text-4xl font-black tracking-tight sm:text-5xl">{value}{suffix}</div>
      <h3 className="mt-2 text-base font-semibold leading-snug">{label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{detail}</p>
      <button onClick={() => setOpen(!open)} className="mt-4 flex items-center gap-1 text-xs font-semibold text-ink-muted hover:text-ink">Quelle & Methode <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      {open && <div className="mt-3 rounded-2xl bg-bg-alt p-3 text-xs leading-relaxed text-ink-soft"><div>{fieldwork} · {sample}</div><a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-semibold underline decoration-ink/20 underline-offset-4 hover:decoration-ink">{sourceLabel} <ExternalLink size={12} /></a></div>}
    </article>
  )
}

function Stepper({ step }: { step: Step }) {
  return (
    <div className="sticky top-0 z-30 border-b border-border/70 bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 sm:px-6">
        <div className="mr-auto font-black tracking-tight">FairEint <span className="text-gold">2.0</span></div>
        <div className="hidden items-center gap-1 sm:flex">{stepLabels.map((label, index) => <div key={label} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${index === step ? 'bg-ink text-white' : index < step ? 'bg-green-light text-green' : 'text-ink-muted'}`}>{index < step ? '✓ ' : ''}{label}</div>)}</div>
        <div className="rounded-full bg-bg-alt px-3 py-1.5 text-xs font-semibold sm:hidden">{step + 1}/4</div>
      </div>
    </div>
  )
}

function rebalanceBudget(budget: BudgetState, id: BudgetCategoryId, delta: number): BudgetState {
  const next = { ...budget }
  const target = Math.max(2, Math.min(40, next[id] + delta))
  let remaining = target - next[id]
  if (remaining === 0) return next
  next[id] = target
  const others = budgetCategories.map((category) => category.id).filter((otherId) => otherId !== id)
  const direction = remaining > 0 ? -1 : 1
  remaining = Math.abs(remaining)
  let guard = 0
  while (remaining > 0 && guard < 500) {
    guard += 1
    let changed = false
    for (const otherId of others) {
      if (remaining === 0) break
      const candidate = next[otherId] + direction
      if (candidate >= 2 && candidate <= 40) { next[otherId] = candidate; remaining -= 1; changed = true }
    }
    if (!changed) break
  }
  return next
}

function useShare(choices: PolicyChoices, budget: BudgetState) {
  const [copied, setCopied] = useState(false)
  const buildUrl = () => {
    const url = new URL(window.location.href)
    url.search = ''
    url.searchParams.set('w', choices.wealth)
    url.searchParams.set('e', choices.inheritance)
    url.searchParams.set('i', choices.highIncome)
    url.searchParams.set('d', choices.debt)
    url.searchParams.set('b', budgetCategories.map((category) => budget[category.id]).join(','))
    return url.toString()
  }
  const share = async () => {
    const url = buildUrl()
    const text = 'Ich habe mein eigenes Deutschland-Paket gebaut. Wie würdest du Steuern und Investitionen verteilen?'
    if (navigator.share) { await navigator.share({ title: 'Mein FairEint-Paket', text, url }); return }
    await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }
  const copy = async () => { await navigator.clipboard.writeText(buildUrl()); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
  return { share, copy, copied }
}

export default function FairEintV2() {
  const [step, setStep] = useState<Step>(0)
  const [choices, setChoices] = useState<PolicyChoices>(() => {
    const params = new URLSearchParams(window.location.search)
    const wealth = params.get('w') as ChoiceLevel | null
    const inheritance = params.get('e') as ChoiceLevel | null
    const highIncome = params.get('i') as ChoiceLevel | null
    const debt = params.get('d') as DebtChoice | null
    return {
      wealth: wealth && ['off', 'moderate', 'strong'].includes(wealth) ? wealth : defaultChoices.wealth,
      inheritance: inheritance && ['off', 'moderate', 'strong'].includes(inheritance) ? inheritance : defaultChoices.inheritance,
      highIncome: highIncome && ['off', 'moderate', 'strong'].includes(highIncome) ? highIncome : defaultChoices.highIncome,
      debt: debt && ['strict', 'balanced', 'flexible'].includes(debt) ? debt : defaultChoices.debt,
    }
  })
  const [budget, setBudget] = useState<BudgetState>(() => {
    const params = new URLSearchParams(window.location.search)
    const shares = params.get('b')?.split(',').map(Number)
    if (shares?.length === budgetCategories.length && shares.every((value) => Number.isFinite(value)) && shares.reduce((a, b) => a + b, 0) === 100) return Object.fromEntries(budgetCategories.map((category, index) => [category.id, shares[index]])) as BudgetState
    return defaultBudget
  })
  const [showMethod, setShowMethod] = useState(false)
  const revenue = revenueRange(choices)
  const matches = useMemo(() => calculatePartyMatches(choices, budget), [choices, budget])
  const topMatch = matches[0]
  const share = useShare(choices, budget)
  const topBudget = [...budgetCategories].sort((a, b) => budget[b.id] - budget[a.id]).slice(0, 3)
  const reset = () => { setChoices(defaultChoices); setBudget(defaultBudget); setStep(0); window.history.replaceState({}, '', window.location.pathname) }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Stepper step={step} />

      {step === 0 && <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(139,105,20,0.12),transparent_35%),radial-gradient(circle_at_80%_45%,rgba(40,112,176,0.08),transparent_28%)]" />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur"><span className="h-2 w-2 rounded-full bg-green" /> Parteiunabhängig · Quellen offen · Stand August 2026</div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-7xl">Bau das Deutschland,<br /><span className="text-gold">das du dir wünschst.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">Wer soll mehr beitragen? Wofür soll das Geld genutzt werden? Und welche Parteien liegen deinen Entscheidungen tatsächlich am nächsten?</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => setStep(1)} className="btn-press inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 font-bold text-white shadow-xl shadow-black/10 hover:bg-black">Mein Paket bauen <ArrowRight size={18} /></button><button onClick={() => document.getElementById('ground-truth')?.scrollIntoView({ behavior: 'smooth' })} className="btn-press rounded-2xl border border-border bg-white px-6 py-4 font-bold hover:border-ink/30">Erst die echten Daten sehen</button></div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted"><span>⏱ 3–5 Minuten</span><span>📱 Mobile-first</span><span>🔎 Jede Zahl mit Quelle</span><span>🗳️ Keine Wahlempfehlung</span></div>
          </div>
        </section>
        <section id="ground-truth" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl"><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Ground Truth</div><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Was Menschen wirklich sagen.</h2><p className="mt-3 text-ink-soft">Nicht unsere Personas. Nicht Parteislogans. Repräsentative Umfragen bilden den Anker; Simulationen werden klar davon getrennt.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{groundTruth.map((card) => <GroundTruthCard key={card.id} {...card} />)}</div>
          <div className="mt-10 rounded-3xl bg-ink p-6 text-white sm:p-8"><div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Aha</div><h3 className="mt-2 text-3xl font-black tracking-tight">Wo ist der größte Konsens?</h3><p className="mt-3 text-sm leading-relaxed text-white/70">Bei den meisten zentralen öffentlichen Investitionen wünschen Mehrheiten mehr Ausgaben — über Parteigrenzen hinweg.</p></div><div className="space-y-3">{spendingGroundTruth.slice(0, 5).map((item) => <div key={item.id}><div className="mb-1 flex items-center justify-between gap-4 text-sm"><span>{item.emoji} {item.label}</span><strong>{item.support}%</strong></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${item.support}%` }} /></div></div>)}</div></div></div>
          <div className="mt-8 text-center"><button onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-4 font-bold text-white shadow-lg hover:brightness-95">Okay. Jetzt entscheide ich. <ArrowRight size={18} /></button></div>
        </section>
      </main>}

      {step === 1 && <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]"><section><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">1 · Finanzieren</div><h1 className="mt-2 text-4xl font-black tracking-tight">Wer soll mehr beitragen?</h1><p className="mt-3 max-w-2xl text-ink-soft">Wähle deine Richtung. Du kannst später alles ändern. Einnahmen zeigen wir nur dort, wo wir einen belastbaren Modellkorridor haben.</p>
          <div className="mt-8 space-y-8">
            <div><div className="mb-3 flex items-end justify-between gap-4"><div><h2 className="font-bold">Vermögensteuer</h2><p className="text-sm text-ink-muted">64 % Zustimmung in der repräsentativen ARD/WDR-Umfrage.</p></div><span className="rounded-full bg-green-light px-2.5 py-1 text-xs font-bold text-green">Ground Truth</span></div><div className="grid gap-3 sm:grid-cols-3">{(['off', 'moderate', 'strong'] as ChoiceLevel[]).map((level) => <OptionButton key={level} active={choices.wealth === level} title={revenueModel.wealth[level].label} subtitle={revenueModel.wealth[level].description} onClick={() => setChoices({ ...choices, wealth: level })} />)}</div></div>
            <div><div className="mb-3"><h2 className="font-bold">Hohe Erbschaften stärker besteuern?</h2><p className="text-sm text-ink-muted">61 % Zustimmung in der ARD/WDR-Umfrage. Einnahmen werden in V1 bewusst noch nicht in den Budgettopf gerechnet.</p></div><div className="grid gap-3 sm:grid-cols-3"><OptionButton active={choices.inheritance === 'off'} title="Nein" subtitle="Status quo / keine zusätzliche Belastung." onClick={() => setChoices({ ...choices, inheritance: 'off' })} /><OptionButton active={choices.inheritance === 'moderate'} title="Ja, gezielt" subtitle="Große Ausnahmen reduzieren, hohe Freibeträge schützen." onClick={() => setChoices({ ...choices, inheritance: 'moderate' })} /><OptionButton active={choices.inheritance === 'strong'} title="Ja, deutlich" subtitle="Große Erbschaften klar stärker belasten." onClick={() => setChoices({ ...choices, inheritance: 'strong' })} /></div></div>
            <div><div className="mb-3"><h2 className="font-bold">Hohe Einkommen stärker besteuern?</h2><p className="text-sm text-ink-muted">67 % hielten dies im ARD-DeutschlandTrend Mai 2026 für den richtigen Weg.</p></div><div className="grid gap-3 sm:grid-cols-3"><OptionButton active={choices.highIncome === 'off'} title="Nein" subtitle="Keine höhere Belastung hoher Einkommen." onClick={() => setChoices({ ...choices, highIncome: 'off' })} /><OptionButton active={choices.highIncome === 'moderate'} title="Etwas stärker" subtitle="Moderate Progression bei hohen Einkommen." onClick={() => setChoices({ ...choices, highIncome: 'moderate' })} /><OptionButton active={choices.highIncome === 'strong'} title="Deutlich stärker" subtitle="Stärkere Progression an der Spitze." onClick={() => setChoices({ ...choices, highIncome: 'strong' })} /></div></div>
            <div><div className="mb-3"><h2 className="font-bold">Wie offen bist du für Kredite für Investitionen?</h2><p className="text-sm text-ink-muted">59 % befürworten laut IMK grundsätzlich kreditfinanzierte öffentliche Investitionen; zugleich werden Umschichtungen bevorzugt.</p></div><div className="grid gap-3 sm:grid-cols-3"><OptionButton active={choices.debt === 'strict'} title="Strikt" subtitle="Investitionen vor allem aus laufenden Einnahmen finanzieren." onClick={() => setChoices({ ...choices, debt: 'strict' })} /><OptionButton active={choices.debt === 'balanced'} title="Ausgewogen" subtitle="Erst umschichten, Kredite gezielt für langlebige Investitionen." onClick={() => setChoices({ ...choices, debt: 'balanced' })} /><OptionButton active={choices.debt === 'flexible'} title="Investitionsoffen" subtitle="Mehr Kreditspielraum, wenn daraus langfristig Infrastruktur entsteht." onClick={() => setChoices({ ...choices, debt: 'flexible' })} /></div></div>
          </div></section>
          <aside className="lg:sticky lg:top-24 lg:self-start"><div className="rounded-3xl border border-border bg-white p-5 shadow-lg shadow-black/5"><div className="text-xs font-black uppercase tracking-[0.16em] text-ink-muted">Modellierter Spielraum</div><div className="mt-2 text-4xl font-black tracking-tight">{formatMoney(revenue.low)}–{formatMoney(revenue.high)}</div><p className="mt-2 text-sm leading-relaxed text-ink-soft">pro Jahr aus dem ausgewählten <strong>Vermögensteuer-Szenario</strong>. Andere Reformen sind im Budgettopf noch nicht monetarisiert.</p><div className="mt-4 rounded-2xl bg-blue-light p-3 text-xs leading-relaxed text-ink-soft"><Info size={14} className="mb-1" />{revenueModel.caveat}</div><a href={revenueModel.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline decoration-ink/20 underline-offset-4">{revenueModel.sourceLabel} <ExternalLink size={12} /></a></div></aside></div>
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6"><button onClick={() => setStep(0)} className="rounded-xl px-4 py-3 text-sm font-bold text-ink-muted hover:bg-bg-alt">Zurück</button><button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-4 font-bold text-white">Geld verteilen <ArrowRight size={18} /></button></div>
      </main>}

      {step === 2 && <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-gold">2 · Verteilen</div><h1 className="mt-2 max-w-3xl text-4xl font-black tracking-tight">Du hast ungefähr {formatMoney(revenue.midpoint)} pro Jahr. Was ist dir wichtig?</h1><p className="mt-3 max-w-2xl text-ink-soft">Verteile 100 Punkte. Jeder Klick verschiebt 2 Punkte — der Gesamtetat bleibt automatisch bei 100 %.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">{budgetCategories.map((category) => { const amount = revenue.midpoint * budget[category.id] / 100; return <div key={category.id} className="rounded-3xl border border-border bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><div className="text-2xl">{category.emoji}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h2 className="font-bold">{category.label}</h2>{category.support !== null && <div className="mt-0.5 text-xs text-ink-muted">{category.support}% wollen hier mehr öffentliche Ausgaben</div>}</div><div className="text-right"><div className="text-xl font-black">{budget[category.id]}%</div><div className="text-xs text-ink-muted">≈ {formatMoney(amount)}</div></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-ink transition-all" style={{ width: `${budget[category.id] * 2.5}%` }} /></div><div className="mt-4 flex items-center gap-2"><button aria-label={`${category.label} reduzieren`} onClick={() => setBudget(rebalanceBudget(budget, category.id, -2))} className="h-10 w-10 rounded-xl border border-border text-xl font-bold hover:bg-bg-alt">−</button><button aria-label={`${category.label} erhöhen`} onClick={() => setBudget(rebalanceBudget(budget, category.id, 2))} className="h-10 w-10 rounded-xl bg-ink text-xl font-bold text-white hover:bg-black">+</button><span className="ml-auto text-xs text-ink-muted">2–40 %</span></div></div></div></div> })}</div>
        <div className="mt-6 rounded-3xl bg-green-light p-5 text-sm text-ink-soft"><strong className="text-green">Ground-Truth-Hinweis:</strong> Die Prozentwerte aus Umfragen bedeuten „mehr ausgeben“, nicht „diesen Anteil des neuen Budgets zuweisen“. Deine Verteilung bleibt deine Entscheidung.</div>
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6"><button onClick={() => setStep(1)} className="rounded-xl px-4 py-3 text-sm font-bold text-ink-muted hover:bg-bg-alt">Zurück</button><button onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-2xl bg-gold px-6 py-4 font-bold text-white shadow-lg">Mein Ergebnis <ArrowRight size={18} /></button></div>
      </main>}

      {step === 3 && <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl shadow-black/15"><div className="grid lg:grid-cols-[1.15fr_0.85fr]"><div className="p-6 sm:p-9"><div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Dein FairEint-Paket</div><h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">Du priorisierst {topBudget[0].label}, {topBudget[1].label} und {topBudget[2].label}.</h1><p className="mt-5 max-w-2xl text-white/70">Dein ausgewähltes Vermögensteuer-Szenario schafft in unserem vereinfachten Modell einen Korridor von <strong className="text-white">{formatMoney(revenue.low)}–{formatMoney(revenue.high)}</strong> pro Jahr.</p><div className="mt-7 flex flex-wrap gap-2">{topBudget.map((category) => <span key={category.id} className="rounded-full bg-white/10 px-3 py-2 text-sm">{category.emoji} {category.label} · {budget[category.id]}%</span>)}</div></div><div className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-9 lg:border-l lg:border-t-0"><div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Programm-Nähe</div><div className="mt-3 flex items-end gap-3"><div className="text-5xl font-black">{topMatch.score}%</div><div className="pb-1 text-white/60">zu {topMatch.party.short}</div></div><p className="mt-4 text-sm leading-relaxed text-white/70">Das ist <strong className="text-white">keine Wahlempfehlung</strong>. Es misst nur die Nähe deiner Antworten zu dokumentierten Positionen in den ausgewählten Politikfeldern.</p></div></div></section>
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]"><div><div><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Partei-Match</div><h2 className="mt-2 text-3xl font-black tracking-tight">Welche Programme liegen deinem Paket nahe?</h2></div><div className="mt-5 space-y-3">{matches.map((match, index) => <article key={match.party.id} className="rounded-3xl border border-border bg-white p-5 shadow-sm"><div className="flex items-start gap-4"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${index === 0 ? 'bg-gold text-white' : 'bg-bg-alt'}`}>{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-lg font-black">{match.party.name}</h3><div className="text-2xl font-black">{match.score}%</div></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-ink" style={{ width: `${match.score}%` }} /></div><div className="mt-3 grid gap-2 text-xs sm:grid-cols-2"><div><span className="font-bold text-green">Nähe:</span> {match.aligns.join(', ') || 'keine starke Übereinstimmung'}</div><div><span className="font-bold text-red">Abweichung:</span> {match.differs.join(', ') || 'keine große Abweichung im Modell'}</div></div><a href={match.party.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink">{match.party.asOf} · Quelle <ExternalLink size={11} /></a></div></div></article>)}</div></div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start"><div className="rounded-3xl border border-border bg-white p-5 shadow-lg shadow-black/5"><div className="text-xs font-black uppercase tracking-[0.16em] text-ink-muted">Teile dein Paket</div><p className="mt-2 text-sm leading-relaxed text-ink-soft">Schick den Link an deine Freunde. Ihre Antworten bleiben unabhängig — danach könnt ihr eure Pakete vergleichen.</p><button onClick={share.share} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 font-bold text-white"><Share2 size={17} /> Teilen</button><button onClick={share.copy} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3.5 font-bold"><Copy size={16} /> {share.copied ? 'Link kopiert ✓' : 'Link kopieren'}</button></div><div className="rounded-3xl border border-border bg-bg-alt p-5"><div className="flex items-center gap-2 font-bold"><Info size={16} /> Was dieser Match nicht weiß</div><p className="mt-2 text-xs leading-relaxed text-ink-soft">Außenpolitik, Migration, Europa, Bürgerrechte und viele andere Themen fehlen bewusst. Die Rangliste darf deshalb niemals als vollständige Wahlentscheidung gelesen werden.</p><button onClick={() => setShowMethod(!showMethod)} className="mt-3 flex items-center gap-1 text-xs font-bold">Methodik & Quellen <ChevronDown size={13} className={showMethod ? 'rotate-180' : ''} /></button></div></aside></section>
        {showMethod && <section className="mt-8 rounded-3xl border border-border bg-white p-6 sm:p-8"><div className="max-w-3xl"><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Transparenz</div><h2 className="mt-2 text-3xl font-black">So funktioniert FairEint 2.0</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">Ground Truth, Modellrechnungen und Partei-Positionen sind drei getrennte Ebenen. Der Partei-Score nutzt grobe Positionswerte von −2 bis +2 und eine gewichtete Distanz. Das ist nachvollziehbar und reproduzierbar — aber keine objektive Wahrheit über eine Partei.</p></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{methodSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-border p-4 transition hover:-translate-y-0.5 hover:shadow-md"><div className="text-xs font-bold text-ink-muted">{source.publisher} · {source.date}</div><div className="mt-1 font-bold">{source.title}</div><p className="mt-2 text-xs leading-relaxed text-ink-soft">{source.note}</p><div className="mt-3 inline-flex items-center gap-1 text-xs font-bold">Quelle öffnen <ExternalLink size={11} /></div></a>)}</div></section>}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"><button onClick={() => setStep(2)} className="rounded-xl px-4 py-3 text-sm font-bold text-ink-muted hover:bg-bg-alt">Verteilung ändern</button><button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-3.5 font-bold hover:border-ink/30"><RotateCcw size={16} /> Neu starten</button></div>
      </main>}

      <footer className="mt-14 border-t border-border bg-white"><div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-7 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><strong className="text-ink">FairEint 2.0</strong> · Politik zum Ausprobieren, nicht nur zum Streiten.</div><div className="flex flex-wrap gap-4"><a className="hover:text-ink" href="?legacy=1">Alte FairEint-Version</a><a className="hover:text-ink" href="https://github.com/mikelninh/faireint" target="_blank" rel="noreferrer">Open Source ↗</a></div></div></footer>
    </div>
  )
}
