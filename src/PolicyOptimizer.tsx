import { useMemo, useState } from 'react'
import { ExternalLink, Info, SlidersHorizontal } from 'lucide-react'
import PublicLabNav from './PublicLabNav'

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
    title: 'Einkommensteuer: Mitte gezielter entlasten',
    short: 'ZEW 2026 · Einkommensteuer',
    source: 'ZEW Mannheim, 2026',
    url: 'https://www.zew.de/das-zew/aktuelles/zew-tarif-entlastet-mittlere-einkommen-staerker',
    evidence: 'Das ZEW zeigt einen Tarifentwurf, der Entlastungen stärker auf mittlere Einkommen konzentriert. Bei gleicher Gegenfinanzierung liegt die modellierte Entlastung bei 40.000 € zu versteuerndem Einkommen in der dargestellten Variante bei rund 1.170 € statt 790 €.',
    metrics: { revenue: 4, middle: 10, simplicity: 7, concentration: 5 },
    upside: 'Hohe Zielgenauigkeit für mittlere Einkommen bei transparentem Finanzierungs-Trade-off.',
    tradeoff: 'Niedrige Einkommen profitieren in dieser Tarifvariante weniger; der Grenzsteuersatz verläuft weniger glatt.',
  },
  {
    id: 'diw-inheritance',
    title: 'Erbschaftsteuer: Lebensfreibetrag + weniger Privilegien',
    short: 'DIW 2026 · Szenario 5',
    source: 'DIW Wochenbericht 4/2026',
    url: 'https://www.diw.de/de/diw_01.c.996032.de/publikationen/wochenberichte/2026_04_1/erbschaftsteuerreform__verguenstigungen_abbauen__freibetraege_erhoehen__steuertarifstufen_reduzieren.html',
    evidence: 'DIW-Szenario 5 modelliert langfristig rund 2,3 Mrd. € zusätzliche Einnahmen pro Jahr. Die Zahl der Steuerpflichtigen sinkt um etwa 53 %; Übertragungen bis 1 Mio. € werden insgesamt entlastet, sehr große Übertragungen stärker belastet.',
    metrics: { revenue: 6, middle: 8, simplicity: 9, concentration: 10 },
    upside: 'Verbindet höhere Freibeträge, weniger Steuerfälle und stärkere Belastung sehr großer Übertragungen.',
    tradeoff: 'Unternehmensübertragungen benötigen belastbare Stundungs- und Verrentungsregeln; die volle Kassenwirkung entsteht nicht sofort.',
  },
  {
    id: 'diw-wealth',
    title: 'Vermögensteuer: 1 % mit hohen Freibeträgen',
    short: 'DIW 2026 · 5+5 Mio. €',
    source: 'DIW Politikberatung kompakt 211',
    url: 'https://www.diw.de/de/diw_01.c.998456.de/publikationen/politikberatung_kompakt/2026_0211/vermoegensteuer_die_linke_____aufkommens-_und_verteilungswir___n_die_linke_in_den_landtagen_und_der_rosa-luxemburg-stiftung.html',
    evidence: 'Bei 1 % jährlich, 5 Mio. € persönlichem Freibetrag und 5 Mio. € Betriebsvermögensfreibetrag modelliert das DIW ein potenzielles Aufkommen von rund 28,6 Mrd. € pro Jahr vor zusätzlichen Verhaltensanpassungen.',
    metrics: { revenue: 10, middle: 7, simplicity: 5, concentration: 10 },
    upside: 'Hohes potenzielles Aufkommen bei starker Konzentration auf sehr hohe Nettovermögen.',
    tradeoff: 'Bewertung, Betriebsvermögen, Liquidität, Rechtsgestaltung und Ausweichreaktionen sind zentrale Designrisiken.',
  },
]

const goals: { id: Goal; label: string; question: string }[] = [
  { id: 'revenue', label: 'Fiskalischer Spielraum', question: 'Wie wichtig sind zusätzliche oder geschonte Staatseinnahmen?' },
  { id: 'middle', label: 'Entlastung Mitte', question: 'Wie wichtig ist direkte Entlastung niedriger und mittlerer Einkommen?' },
  { id: 'simplicity', label: 'Administrative Einfachheit', question: 'Wie wichtig sind wenige Fälle und einfache Regeln?' },
  { id: 'concentration', label: 'Vermögenskonzentration', question: 'Wie wichtig ist stärkere Belastung sehr großer Vermögen oder Übertragungen?' },
]

export default function PolicyOptimizer() {
  const [weights, setWeights] = useState<Record<Goal, number>>({ revenue: 7, middle: 9, simplicity: 6, concentration: 8 })
  const ranked = useMemo(() => candidates.map((candidate) => ({ ...candidate, score: goals.reduce((sum, goal) => sum + candidate.metrics[goal.id] * weights[goal.id], 0) / goals.reduce((sum, goal) => sum + weights[goal.id], 0) })).sort((a, b) => b.score - a.score), [weights])

  return <main className="min-h-screen bg-bg text-ink">
    <PublicLabNav active="tradeoffs" />
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-4xl"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-gold/20 bg-gold-light px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-gold">Beta</span><span className="text-xs font-black uppercase tracking-[0.18em] text-gold">Trade-off Explorer</span></div><h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">Welche Reform passt zu deinen Zielen?</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">Politische Reformen haben selten nur einen Effekt. Hier kannst du Zielgewichte verändern und sehen, wie sich drei belegte Reformdesigns in einer <strong>offengelegten FairEint-Heuristik</strong> verschieben. Das ist ein Denkwerkzeug — kein objektives Ranking und kein wissenschaftlich bewiesenes soziales Optimum.</p></div>

      <div className="mt-7 flex gap-3 rounded-2xl border border-blue/15 bg-blue-light p-4 text-sm leading-relaxed text-blue"><Info className="mt-0.5 shrink-0" size={18} /><p>Die Quellenwerte zu Einnahmen und Reformwirkungen stammen aus ZEW bzw. DIW. Die <strong>1–10-Designratings</strong> unten stammen dagegen von FairEint und sind ausdrücklich keine empirischen Messwerte.</p></div>

      <div className="mt-10 grid gap-7 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-[2rem] border border-border bg-white p-6 shadow-sm lg:sticky lg:top-20 lg:self-start"><div className="flex items-center gap-2"><SlidersHorizontal size={18} /><h2 className="font-black">Deine Zielgewichte</h2></div><p className="mt-2 text-xs leading-relaxed text-ink-muted">Die Gewichtung verändert nur die FairEint-Passung — niemals die zugrunde liegenden Quellenwerte.</p><div className="mt-6 space-y-6">{goals.map((goal) => <label key={goal.id} className="block"><div className="flex items-end justify-between gap-3"><div><div className="font-bold">{goal.label}</div><div className="mt-1 text-xs leading-relaxed text-ink-muted">{goal.question}</div></div><strong className="tabular-nums">{weights[goal.id]}/10</strong></div><input aria-label={goal.label} type="range" min="1" max="10" value={weights[goal.id]} onChange={(event) => setWeights({ ...weights, [goal.id]: Number(event.target.value) })} className="mt-3 w-full" /></label>)}</div><div className="mt-6 rounded-2xl bg-bg-alt p-4 text-xs leading-relaxed text-ink-muted"><strong className="text-ink">Berechnung:</strong> gewichteter Mittelwert der sichtbaren 1–10-FairEint-Ratings. Für institutionellen Einsatz müssten diese Ratings extern definiert oder durch messbare Indikatoren ersetzt werden.</div></aside>

        <section className="space-y-4">{ranked.map((candidate, index) => <article key={candidate.id} className={`rounded-[2rem] border bg-white p-6 transition ${index === 0 ? 'border-gold/40 shadow-md' : 'border-border'}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-black uppercase tracking-widest text-gold">{candidate.short}</span>{index === 0 && <span className="rounded-full bg-gold-light px-2.5 py-1 text-[10px] font-black text-gold">höchste Passung bei deinen Gewichten</span>}</div><h2 className="mt-2 text-2xl font-black">{candidate.title}</h2></div><div className="text-right"><div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">FairEint-Passung</div><div className="mt-1 text-2xl font-black tabular-nums">{candidate.score.toFixed(1)}/10</div></div></div><p className="mt-4 text-sm leading-relaxed text-ink-soft">{candidate.evidence}</p><div className="mt-5"><div className="mb-2 text-[10px] font-black uppercase tracking-widest text-ink-muted">Heuristische Designratings · keine Messwerte</div><div className="grid gap-2 sm:grid-cols-4">{goals.map((goal) => <div key={goal.id} className="rounded-xl bg-bg-alt p-3"><div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{goal.label}</div><div className="mt-1 text-xl font-black">{candidate.metrics[goal.id]}/10</div></div>)}</div></div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-green-light p-4 text-sm text-green"><strong>Potenzielle Stärke:</strong> {candidate.upside}</div><div className="rounded-2xl bg-gold-light p-4 text-sm text-gold"><strong>Wichtiger Trade-off:</strong> {candidate.tradeoff}</div></div><a href={candidate.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">Originalquelle: {candidate.source} <ExternalLink size={11} /></a></article>)}</section>
      </div>
    </section>
  </main>
}
