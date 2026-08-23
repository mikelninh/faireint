import { useMemo, useState } from 'react'
import { ExternalLink, SlidersHorizontal } from 'lucide-react'

type Goal = 'revenue' | 'middle' | 'simplicity' | 'concentration'

type Candidate = {
  id: string
  title: string
  short: string
  source: string
  url: string
  evidence: string
  metrics: Record<Goal, number>
  upside: string
  tradeoff: string
}

const candidates: Candidate[] = [
  {
    id: 'zew-middle',
    title: 'Mitte gezielt entlasten',
    short: 'ZEW 2026 · Einkommensteuer',
    source: 'ZEW Mannheim, Juni 2026',
    url: 'https://www.zew.de/presse/pressearchiv/einkommensteuer-mitte-gezielt-entlasten',
    evidence: 'Bei 40.000 € zu versteuerndem Einkommen sind rund 520 € Entlastung/Jahr mit einem 10-Mrd.-Volumen möglich. Alternativ kann dieselbe Entlastung laut ZEW aufkommensneutral über rund +3 Prozentpunkte bei Spitzen- und Reichensteuersatz finanziert werden.',
    metrics: { revenue: 4, middle: 10, simplicity: 7, concentration: 6 },
    upside: 'Sehr zielgenaue Entlastung der Mitte mit transparentem Finanzierungsweg.',
    tradeoff: 'Konzentriert Entlastung bewusst auf die Mitte; niedrige Einkommen profitieren bei der ZEW-Sprungtarif-Variante weniger.',
  },
  {
    id: 'diw-inheritance',
    title: 'Erbschaftsteuer: Privilegien abbauen + Lebensfreibetrag',
    short: 'DIW 2026 · Szenario 5',
    source: 'DIW Wochenbericht 4/2026',
    url: 'https://www.diw.de/de/diw_01.c.996032.de/publikationen/wochenberichte/2026_04_1/erbschaftsteuerreform__verguenstigungen_abbauen__freibetraege_erhoehen__steuertarifstufen_reduzieren.html',
    evidence: 'DIW-Szenario 5: ca. +2,3 Mrd. €/Jahr; Zahl der Steuerpflichtigen rund 53 % geringer; Übertragungen bis 1 Mio. € zahlen insgesamt 2,6 Mrd. € weniger, Übertragungen ab 5 Mio. € rund 5,2 Mrd. € mehr.',
    metrics: { revenue: 6, middle: 8, simplicity: 9, concentration: 10 },
    upside: 'Verbindet höhere Freibeträge und weniger Fälle mit stärkerer Belastung sehr großer Übertragungen.',
    tradeoff: 'Unternehmensübertragungen brauchen Stundungs-/Verrentungsregeln; langfristige statt sofortige Kassenwirkung.',
  },
  {
    id: 'diw-wealth',
    title: '1 % Vermögensteuer mit hohen Freibeträgen',
    short: 'DIW 2026 · 5+5 Mio. €',
    source: 'DIW Politikberatung kompakt 211',
    url: 'https://www.diw.de/de/diw_01.c.998456.de/publikationen/politikberatung_kompakt/2026_0211/vermoegensteuer_die_linke_____aufkommens-_und_verteilungswir___n_die_linke_in_den_landtagen_und_der_rosa-luxemburg-stiftung.html',
    evidence: '1 % jährlich, 5 Mio. € persönlicher Freibetrag + 5 Mio. € Betriebsvermögensfreibetrag: potenzielles Aufkommen ca. 28,6 Mrd. €/Jahr vor Verhaltensanpassungen.',
    metrics: { revenue: 10, middle: 7, simplicity: 5, concentration: 10 },
    upside: 'Sehr hohes potenzielles Aufkommen bei Konzentration auf hohe Nettovermögen.',
    tradeoff: 'Bewertung, Betriebsvermögen, Liquidität und Ausweichreaktionen sind zentrale Designrisiken.',
  },
]

const goals: { id: Goal; label: string; question: string }[] = [
  { id: 'revenue', label: 'Einnahmen', question: 'Wie wichtig ist zusätzlicher fiskalischer Spielraum?' },
  { id: 'middle', label: 'Breite Entlastung', question: 'Wie wichtig ist direkte Entlastung kleiner/mittlerer Haushalte?' },
  { id: 'simplicity', label: 'Einfachheit', question: 'Wie wichtig sind weniger Fälle und einfache Verwaltung?' },
  { id: 'concentration', label: 'Ungleichheit', question: 'Wie wichtig ist stärkere Belastung sehr großer Vermögen/Übertragungen?' },
]

export default function PolicyOptimizer() {
  const [weights, setWeights] = useState<Record<Goal, number>>({ revenue: 7, middle: 9, simplicity: 6, concentration: 8 })
  const ranked = useMemo(() => candidates.map((candidate) => ({ ...candidate, score: goals.reduce((sum, goal) => sum + candidate.metrics[goal.id] * weights[goal.id], 0) / goals.reduce((sum, goal) => sum + weights[goal.id], 0) })).sort((a, b) => b.score - a.score), [weights])

  return <main className="min-h-screen bg-bg text-ink"><header className="border-b border-border bg-white"><div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6"><a href="./" className="font-black">FairEint</a><span className="rounded-full bg-ink px-2 py-1 text-[10px] font-black text-white">Policy Optimizer</span><a href="?reality=1" className="ml-auto text-xs font-bold text-ink-muted">Reality Lab</a></div></header>
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"><div className="max-w-4xl"><div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Mehrkriterielle Entscheidung</div><h1 className="mt-3 text-5xl font-black leading-[0.98] tracking-[-0.04em]">Welches Gesetz ist „am besten“? <span className="text-gold">Kommt auf dein Ziel an.</span></h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">Setze deine Prioritäten. FairEint rankt drei evidenzbasierte Reformdesigns mit einer vollständig sichtbaren Heuristik. Das Ergebnis ist ein Denkwerkzeug, kein wissenschaftlich bewiesenes soziales Optimum.</p></div>

      <div className="mt-10 grid gap-7 lg:grid-cols-[340px_1fr]"><aside className="rounded-[2rem] border border-border bg-white p-6 lg:sticky lg:top-6 lg:self-start"><div className="flex items-center gap-2"><SlidersHorizontal size={18} /><h2 className="font-black">Deine Zielgewichte</h2></div><div className="mt-6 space-y-6">{goals.map((goal) => <label key={goal.id} className="block"><div className="flex items-end justify-between gap-3"><div><div className="font-bold">{goal.label}</div><div className="mt-1 text-xs leading-relaxed text-ink-muted">{goal.question}</div></div><strong>{weights[goal.id]}/10</strong></div><input aria-label={goal.label} type="range" min="1" max="10" value={weights[goal.id]} onChange={(event) => setWeights({ ...weights, [goal.id]: Number(event.target.value) })} className="mt-3 w-full" /></label>)}</div><div className="mt-6 rounded-2xl bg-bg-alt p-4 text-xs leading-relaxed text-ink-muted"><strong className="text-ink">Formel:</strong> gewichteter Mittelwert der sichtbaren 1–10-Designratings. Die Ratings sind FairEint-Heuristiken und müssen für institutionellen Einsatz extern reviewed werden.</div></aside>
        <section className="space-y-4">{ranked.map((candidate, index) => <article key={candidate.id} className={`rounded-[2rem] border bg-white p-6 ${index === 0 ? 'border-gold shadow-lg' : 'border-border'}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-widest text-gold">#{index + 1} · {candidate.short}</div><h2 className="mt-2 text-2xl font-black">{candidate.title}</h2></div><div className="rounded-full bg-ink px-4 py-2 text-xl font-black text-white">{candidate.score.toFixed(1)}</div></div><p className="mt-4 text-sm leading-relaxed text-ink-soft">{candidate.evidence}</p><div className="mt-5 grid gap-2 sm:grid-cols-4">{goals.map((goal) => <div key={goal.id} className="rounded-xl bg-bg-alt p-3"><div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{goal.label}</div><div className="mt-1 text-xl font-black">{candidate.metrics[goal.id]}/10</div></div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-green-light p-4 text-sm text-green"><strong>Stärke:</strong> {candidate.upside}</div><div className="rounded-2xl bg-gold-light p-4 text-sm text-gold"><strong>Trade-off:</strong> {candidate.tradeoff}</div></div><a href={candidate.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">{candidate.source} <ExternalLink size={11} /></a></article>)}</section></div>
    </section></main>
}
