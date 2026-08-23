import { useMemo, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, ExternalLink, Info, UserRound } from 'lucide-react'
import { budgetCategories, defaultBudget, type BudgetState } from './data/v2'
import { calculatePartyMatches, type PolicyChoices } from './lib/policyEngine'
import { rebalanceBudget } from './lib/v5Engine'

type Step = 'start' | 'profile' | 'policy' | 'budget' | 'result'
type Household = 'single' | 'couple' | 'family' | 'single-parent' | 'business'
type Relation = 'partner' | 'parent' | 'grandparent' | 'sibling' | 'other'

const householdOptions: { id: Household; label: string; hint: string }[] = [
  { id: 'single', label: 'Alleinlebend', hint: 'eine Person' },
  { id: 'couple', label: 'Paar', hint: 'ohne Kinder' },
  { id: 'family', label: 'Familie', hint: 'mit Kind(ern)' },
  { id: 'single-parent', label: 'Alleinerziehend', hint: 'mit Kind(ern)' },
  { id: 'business', label: 'Selbstständig / Unternehmen', hint: 'eigener Betrieb' },
]

const relationOptions: { id: Relation; label: string; allowance: number }[] = [
  { id: 'partner', label: 'Ehe-/Lebenspartner:in', allowance: 500_000 },
  { id: 'parent', label: 'Elternteil', allowance: 400_000 },
  { id: 'grandparent', label: 'Großeltern', allowance: 200_000 },
  { id: 'sibling', label: 'Geschwister', allowance: 20_000 },
  { id: 'other', label: 'Andere Person', allowance: 20_000 },
]

const wealthSteps = [0, 100_000, 250_000, 500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000, 20_000_000]
const inheritanceSteps = [0, 50_000, 100_000, 200_000, 300_000, 400_000, 500_000, 750_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000]

const incomeTaxSource = 'https://usth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-32a/inhalt.html'
const inheritanceTaxSource = 'https://www.gesetze-im-internet.de/erbstg_1974/__16.html'

function euro(value: number) {
  if (value >= 1_000_000) return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: value % 1_000_000 === 0 ? 0 : 1 }).format(value / 1_000_000)} Mio. €`
  return `${new Intl.NumberFormat('de-DE').format(value)} €`
}

function StepBar({ step }: { step: Step }) {
  const order: Step[] = ['profile', 'policy', 'budget', 'result']
  const current = Math.max(0, order.indexOf(step))
  return <div className="mx-auto flex max-w-xl items-center gap-2 px-4 py-4 sm:px-6">{order.map((id, index) => <div key={id} className="flex flex-1 items-center gap-2"><div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${index <= current ? 'bg-ink text-white' : 'bg-bg-alt text-ink-muted'}`}>{index < current ? <Check size={14} /> : index + 1}</div>{index < order.length - 1 && <div className={`h-1 flex-1 rounded-full ${index < current ? 'bg-ink' : 'bg-bg-alt'}`} />}</div>)}</div>
}

function CardButton({ active, title, text, onClick }: { active: boolean; title: string; text: string; onClick: () => void }) {
  return <button onClick={onClick} className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'border-ink bg-ink text-white shadow-sm' : 'border-border bg-white hover:border-ink/30'}`}><div className="font-black">{title}</div><div className={`mt-1 text-sm leading-relaxed ${active ? 'text-white/70' : 'text-ink-muted'}`}>{text}</div></button>
}

function PersonalNote({ children }: { children: ReactNode }) {
  return <div className="mt-3 flex gap-2 rounded-xl bg-blue-light p-3 text-sm leading-relaxed text-blue"><Info size={16} className="mt-0.5 shrink-0" /><div>{children}</div></div>
}

export default function FairEintSimple() {
  const [step, setStep] = useState<Step>('start')
  const [household, setHousehold] = useState<Household>('single')
  const [grossIncome, setGrossIncome] = useState(60_000)
  const [wealthIndex, setWealthIndex] = useState(3)
  const [relation, setRelation] = useState<Relation>('parent')
  const [inheritanceIndex, setInheritanceIndex] = useState(4)
  const [choices, setChoices] = useState<PolicyChoices>({ wealth: 'moderate', inheritance: 'moderate', highIncome: 'moderate', debt: 'balanced' })
  const [budget, setBudget] = useState<BudgetState>(defaultBudget)

  const netWealth = wealthSteps[wealthIndex]
  const expectedInheritance = inheritanceSteps[inheritanceIndex]
  const allowance = relationOptions.find((item) => item.id === relation)?.allowance ?? 20_000
  const householdLabel = householdOptions.find((item) => item.id === household)?.label ?? 'Nicht angegeben'
  const matches = useMemo(() => calculatePartyMatches(choices, budget), [choices, budget])
  const topBudget = useMemo(() => [...budgetCategories].sort((a, b) => budget[b.id] - budget[a.id]).slice(0, 3), [budget])

  const incomeImpact = choices.highIncome === 'off'
    ? 'Du hast keine höhere Besteuerung hoher Einkommen gewählt.'
    : choices.highIncome === 'moderate'
      ? grossIncome < 300_000 ? 'Bei deinem Brutto wahrscheinlich nicht direkt betroffen. Der 45%-Satz beginnt 2026 erst ab 277.826 € zu versteuerndem Einkommen.' : 'Bei deinem Brutto könnte diese Änderung relevant sein. Entscheidend ist dein zu versteuerndes Einkommen, nicht dein Brutto.'
      : grossIncome < 90_000 ? 'Bei deinem Brutto wahrscheinlich nicht direkt betroffen. Der 42%-Tarifbereich beginnt 2026 ab 69.879 € zu versteuerndem Einkommen.' : 'Diese Änderung könnte dich betreffen. Brutto und zu versteuerndes Einkommen sind aber nicht dasselbe.'

  const wealthThreshold = choices.wealth === 'strong' ? 2_000_000 : choices.wealth === 'moderate' ? 5_000_000 : Infinity
  const wealthImpact = choices.wealth === 'off'
    ? 'Keine Vermögensteuer gewählt.'
    : netWealth < wealthThreshold
      ? `Mit rund ${euro(netWealth)} Nettovermögen liegst du unter dem hier verwendeten Freibetrag von ${euro(wealthThreshold)}.`
      : `Mit rund ${euro(netWealth)} Nettovermögen würdest du in diesem vereinfachten Szenario wahrscheinlich in den steuerpflichtigen Bereich fallen.`

  const inheritanceImpact = expectedInheritance <= allowance
    ? `Bei ${euro(expectedInheritance)} erwarteter Erbschaft liegst du innerhalb des heutigen persönlichen Freibetrags von ${euro(allowance)}.`
    : `Deine angenommene Erbschaft liegt ${euro(expectedInheritance - allowance)} über dem heutigen persönlichen Freibetrag. Die konkrete Steuer hängt von weiteren Regeln ab.`

  if (step === 'start') return <main className="min-h-screen bg-bg text-ink"><section className="mx-auto flex min-h-[86vh] max-w-5xl items-center px-4 py-16 sm:px-6"><div className="max-w-4xl"><div className="inline-flex rounded-full bg-green-light px-3 py-1.5 text-xs font-black text-green">parteiunabhängig · Quellen offen · ca. 3 Minuten</div><h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-[-0.05em] sm:text-7xl">Was würde deine Politik <span className="text-gold">für dich</span> bedeuten?</h1><p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink-soft">Beantworte wenige konkrete Fragen. FairEint zeigt dir, ob dich die Entscheidungen ungefähr betreffen, wofür du Geld ausgeben würdest und wie nah dein Paket an <strong>allen großen Parteien</strong> liegt.</p><div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"><MiniStep n="1" title="Kurz zu dir" text="Lebenslage + ungefähres Einkommen" /><MiniStep n="2" title="Deine Entscheidungen" text="mit persönlicher Einordnung" /><MiniStep n="3" title="Alle Parteien" text="vollständiger Vergleich statt nur Platz 1" /></div><button onClick={() => setStep('profile')} className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-4 font-black text-white shadow-xl">Starten <ArrowRight size={18} /></button><p className="mt-4 text-xs text-ink-muted">Deine Angaben bleiben in deinem Browser. FairEint erstellt keine individuelle Steuerberatung.</p></div></section></main>

  return <main className="min-h-screen bg-bg text-ink"><header className="border-b border-border bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6"><button onClick={() => setStep('start')} className="font-black">FairEint</button><span className="ml-2 rounded-full bg-bg-alt px-2 py-1 text-[10px] font-black text-ink-muted">einfach</span><div className="ml-auto text-xs font-bold text-ink-muted">3-Minuten-Check</div></div></header><StepBar step={step} />

    {step === 'profile' && <section className="mx-auto max-w-3xl px-4 pb-16 pt-5 sm:px-6"><div className="text-xs font-black uppercase tracking-widest text-gold">1 · Kurz zu dir</div><h1 className="mt-2 text-4xl font-black">Damit die Fragen nicht abstrakt bleiben.</h1><p className="mt-3 text-ink-soft">Zwei freiwillige Angaben reichen für eine grobe persönliche Einordnung.</p>
      <div className="mt-8 rounded-3xl border border-border bg-white p-5 sm:p-7"><div className="flex items-center gap-2"><UserRound size={18} /><h2 className="font-black">Was beschreibt deine Lebenslage am ehesten?</h2></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{householdOptions.map((item) => <CardButton key={item.id} active={household === item.id} title={item.label} text={item.hint} onClick={() => setHousehold(item.id)} />)}</div></div>
      <div className="mt-4 rounded-3xl border border-border bg-white p-5 sm:p-7"><div className="flex items-end justify-between gap-3"><div><h2 className="font-black">Wie hoch ist ungefähr dein persönliches Jahresbrutto?</h2><p className="mt-1 text-sm text-ink-muted">Nur für die grobe Frage: Könnte eine Änderung bei hohen Einkommen dich betreffen?</p></div><div className="shrink-0 text-2xl font-black">{euro(grossIncome)}</div></div><input type="range" min="20" max="350" step="5" value={grossIncome / 1000} onChange={(e) => setGrossIncome(Number(e.target.value) * 1000)} className="mt-6 w-full" aria-label="Jahresbrutto" /><div className="mt-2 flex justify-between text-[10px] font-bold text-ink-muted"><span>20k</span><span>70k</span><span>150k</span><span>280k</span><span>350k+</span></div><PersonalNote><strong>Wichtig:</strong> Einkommensteuer richtet sich nach dem <em>zu versteuernden Einkommen</em>. Brutto ist nur eine verständliche Orientierung.</PersonalNote></div>
      <NextBack back={() => setStep('start')} next={() => setStep('policy')} />
    </section>}

    {step === 'policy' && <section className="mx-auto max-w-4xl px-4 pb-16 pt-5 sm:px-6"><div className="text-xs font-black uppercase tracking-widest text-gold">2 · Deine Entscheidungen</div><h1 className="mt-2 text-4xl font-black">Was soll sich konkret ändern?</h1><p className="mt-3 max-w-2xl text-ink-soft">Keine politischen Fachwörter ohne Erklärung. Jede Frage zeigt dir zuerst, was die Option ungefähr bedeutet.</p>
      <Question title="Vermögensteuer" question="Soll sehr großes Nettovermögen jährlich besteuert werden?" intro="Nettovermögen = Immobilien + Geld + Wertpapiere + Unternehmensanteile minus Schulden."><div className="rounded-2xl bg-bg-alt p-4"><div className="flex justify-between gap-3"><strong>Dein grobes Nettovermögen</strong><strong>{euro(netWealth)}</strong></div><input type="range" min="0" max={wealthSteps.length - 1} value={wealthIndex} onChange={(e) => setWealthIndex(Number(e.target.value))} className="mt-4 w-full" aria-label="Nettovermögen" /><div className="mt-2 flex justify-between text-[10px] text-ink-muted"><span>0</span><span>1 Mio.</span><span>2 Mio.</span><span>5 Mio.</span><span>20 Mio.</span></div></div><div className="mt-3 grid gap-2"><CardButton active={choices.wealth === 'off'} title="Keine Vermögensteuer" text="Status quo beibehalten." onClick={() => setChoices({ ...choices, wealth: 'off' })} /><CardButton active={choices.wealth === 'moderate'} title="1 % ab 5 Mio. € Nettovermögen" text="Sehr hoher persönlicher Freibetrag; Orientierung an einem DIW-Szenario." onClick={() => setChoices({ ...choices, wealth: 'moderate' })} /><CardButton active={choices.wealth === 'strong'} title="1 % ab 2 Mio. € Nettovermögen" text="Mehr Vermögende wären betroffen; ebenfalls als vereinfachtes DIW-orientiertes Szenario." onClick={() => setChoices({ ...choices, wealth: 'strong' })} /></div><PersonalNote>{wealthImpact}</PersonalNote></Question>

      <Question title="Erbschaftsteuer" question="Sollen sehr große Erbschaften stärker besteuert werden?" intro="Ob dich das betrifft, hängt stark davon ab, von wem du erbst und wie hoch die Erbschaft ist."><div className="grid gap-3 sm:grid-cols-2"><label className="rounded-2xl bg-bg-alt p-4"><span className="text-xs font-bold text-ink-muted">Von wem würdest du erben?</span><select value={relation} onChange={(e) => setRelation(e.target.value as Relation)} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 font-bold">{relationOptions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><div className="rounded-2xl bg-bg-alt p-4"><div className="flex justify-between gap-3"><span className="text-xs font-bold text-ink-muted">Ungefähre Erbschaft</span><strong>{euro(expectedInheritance)}</strong></div><input type="range" min="0" max={inheritanceSteps.length - 1} value={inheritanceIndex} onChange={(e) => setInheritanceIndex(Number(e.target.value))} className="mt-4 w-full" aria-label="Erwartete Erbschaft" /></div></div><div className="mt-3 rounded-xl border border-border p-3 text-sm"><strong>Heutiger persönlicher Freibetrag in deinem Beispiel: {euro(allowance)}</strong> <a href={inheritanceTaxSource} target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-1 text-xs font-bold text-ink-muted underline">Quelle <ExternalLink size={10} /></a></div><div className="mt-3 grid gap-2"><CardButton active={choices.inheritance === 'off'} title="Regeln nicht verschärfen" text="Bestehende Besteuerung großer Erbschaften nicht erhöhen." onClick={() => setChoices({ ...choices, inheritance: 'off' })} /><CardButton active={choices.inheritance === 'moderate'} title="Große Ausnahmen begrenzen" text="Normale Freibeträge schützen, Privilegien bei sehr großen Übertragungen reduzieren." onClick={() => setChoices({ ...choices, inheritance: 'moderate' })} /><CardButton active={choices.inheritance === 'strong'} title="Sehr große Erbschaften stärker besteuern" text="Hohe Millionenübertragungen deutlich stärker belasten." onClick={() => setChoices({ ...choices, inheritance: 'strong' })} /></div><PersonalNote>{inheritanceImpact}</PersonalNote></Question>

      <Question title="Hohe Einkommen" question="Soll der Staat hohe Einkommen stärker besteuern?" intro="2026 beginnt der 42%-Tarifbereich ab 69.879 € zu versteuerndem Einkommen; der 45%-Satz ab 277.826 €. Das ist nicht dasselbe wie Brutto."><div className="grid gap-2"><CardButton active={choices.highIncome === 'off'} title="Steuersätze nicht erhöhen" text="Die heutigen Spitzensteuersätze bleiben unverändert." onClick={() => setChoices({ ...choices, highIncome: 'off' })} /><CardButton active={choices.highIncome === 'moderate'} title="Nur sehr hohe Einkommen stärker besteuern" text="Den 45%-Bereich oberhalb von 277.826 € zu versteuerndem Einkommen stärker belasten." onClick={() => setChoices({ ...choices, highIncome: 'moderate' })} /><CardButton active={choices.highIncome === 'strong'} title="Auch den 42%-Bereich stärker belasten" text="Die höhere Belastung würde bereits weiter unten im oberen Einkommensbereich beginnen." onClick={() => setChoices({ ...choices, highIncome: 'strong' })} /></div><PersonalNote>{incomeImpact} <a href={incomeTaxSource} target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-1 font-bold underline">BMF-Quelle <ExternalLink size={10} /></a></PersonalNote></Question>

      <Question title="Investitionen" question="Wie soll Deutschland zusätzliche Investitionen finanzieren?" intro="Zum Beispiel Schulen, Bahn, Brücken, Digitalisierung oder Krankenhäuser."><div className="grid gap-2"><CardButton active={choices.debt === 'strict'} title="Nur aus vorhandenen Einnahmen" text="Schuldenregel strikt halten; neue Ausgaben müssen an anderer Stelle finanziert werden." onClick={() => setChoices({ ...choices, debt: 'strict' })} /><CardButton active={choices.debt === 'balanced'} title="Kredite nur für klar abgegrenzte Investitionen" text="Laufende Ausgaben begrenzen, aber Zukunftsinvestitionen teilweise über Kredite erlauben." onClick={() => setChoices({ ...choices, debt: 'balanced' })} /><CardButton active={choices.debt === 'flexible'} title="Mehr Investitionen auch über Kredite" text="Schuldenregel stärker lockern, wenn dadurch zusätzliche öffentliche Investitionen möglich werden." onClick={() => setChoices({ ...choices, debt: 'flexible' })} /></div></Question>
      <NextBack back={() => setStep('profile')} next={() => setStep('budget')} />
    </section>}

    {step === 'budget' && <section className="mx-auto max-w-3xl px-4 pb-16 pt-5 sm:px-6"><div className="text-xs font-black uppercase tracking-widest text-gold">3 · Dein Budget</div><h1 className="mt-2 text-4xl font-black">Du hast 100 Punkte. Wofür soll der Staat mehr tun?</h1><p className="mt-3 text-ink-soft">Das ist bewusst getrennt von den Steuerfragen. Mehr Punkte = höhere Priorität in deinem Paket. Es sind keine echten Haushaltsprozente.</p><div className="mt-7 rounded-3xl border border-border bg-white p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><strong>100 Prioritätspunkte</strong><span className="rounded-full bg-green-light px-3 py-1 text-sm font-black text-green">100 / 100</span></div><div className="space-y-5">{budgetCategories.map((category) => <div key={category.id}><div className="mb-2 flex items-center gap-2"><span>{category.emoji}</span><span className="flex-1 font-bold">{category.label}</span><strong>{budget[category.id]}</strong></div><div className="flex items-center gap-2"><button aria-label={`${category.label} weniger`} onClick={() => setBudget(rebalanceBudget(budget, category.id, -2))} className="h-9 w-9 rounded-xl border border-border font-black">−</button><div className="h-3 flex-1 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-ink" style={{ width: `${budget[category.id] * 2.5}%` }} /></div><button aria-label={`${category.label} mehr`} onClick={() => setBudget(rebalanceBudget(budget, category.id, 2))} className="h-9 w-9 rounded-xl border border-border font-black">+</button></div>{typeof category.support === 'number' && <div className="mt-1 text-[11px] text-ink-muted">Repräsentative Befragung: {category.support}% wünschen hier mehr öffentliche Ausgaben.</div>}</div>)}</div></div><NextBack back={() => setStep('policy')} next={() => setStep('result')} nextLabel="Parteien vergleichen" />
    </section>}

    {step === 'result' && <section className="mx-auto max-w-5xl px-4 pb-20 pt-5 sm:px-6"><div className="text-xs font-black uppercase tracking-widest text-gold">4 · Ergebnis</div><h1 className="mt-2 text-4xl font-black">So sieht dein Deutschland aus.</h1><p className="mt-3 max-w-3xl text-ink-soft">Jetzt siehst du zwei Dinge getrennt: <strong>was deine Entscheidungen für dich ungefähr bedeuten</strong> und <strong>welche Parteiprogramme deinem Paket am nächsten liegen.</strong></p><div className="mt-4 inline-flex rounded-full bg-bg-alt px-3 py-1.5 text-xs font-bold text-ink-muted">Lebenslage: {householdLabel} · Jahresbrutto: ca. {euro(grossIncome)}</div>
      <div className="mt-7 grid gap-3 md:grid-cols-3"><Summary title="Einkommen" text={incomeImpact} /><Summary title="Vermögen" text={wealthImpact} /><Summary title="Erbschaft" text={inheritanceImpact} /></div>
      <div className="mt-8 rounded-3xl border border-border bg-white p-5 sm:p-7"><div className="text-xs font-black uppercase tracking-widest text-gold">Deine drei größten Prioritäten</div><div className="mt-4 grid gap-3 sm:grid-cols-3">{topBudget.map((item, index) => <div key={item.id} className="rounded-2xl bg-bg-alt p-4"><div className="text-xs text-ink-muted">#{index + 1}</div><div className="mt-1 text-xl font-black">{item.emoji} {item.label}</div><div className="mt-1 text-sm text-ink-muted">{budget[item.id]} von 100 Punkten</div></div>)}</div></div>

      <section className="mt-8"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-xs font-black uppercase tracking-widest text-gold">Programmvergleich</div><h2 className="mt-2 text-3xl font-black">Wie nah sind dir die Parteien?</h2></div><div className="text-xs text-ink-muted">Alle 7 Parteien · keine Wahlempfehlung</div></div><p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">Der Wert vergleicht nur die Themen in FairEint. Außenpolitik, Migration, Europa, Bürgerrechte und viele andere Wahlthemen fehlen.</p><div className="mt-5 space-y-3">{matches.map((match, index) => <article key={match.party.id} className="rounded-3xl border border-border bg-white p-5"><div className="flex items-center gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-alt font-black">{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-black">{match.party.name}</h3><div className="text-2xl font-black tabular-nums">{match.score}%</div></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-alt"><div className="h-full rounded-full bg-ink" style={{ width: `${match.score}%` }} /></div></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-green-light p-3 text-sm text-green"><strong>Ähnlich bei:</strong> {match.aligns.length ? match.aligns.join(', ') : 'keiner der stärksten Dimensionen'}</div><div className="rounded-2xl bg-bg-alt p-3 text-sm text-ink-soft"><strong>Unterschiede bei:</strong> {match.differs.length ? match.differs.join(', ') : 'wenigen der enthaltenen Themen'}</div></div><a href={match.party.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-ink-muted underline underline-offset-4">Quelle zur Parteiposition <ExternalLink size={11} /></a></article>)}</div></section>

      <div className="mt-8 rounded-3xl bg-ink p-6 text-white"><h2 className="text-xl font-black">Was dieser Vergleich kann – und was nicht.</h2><p className="mt-3 text-sm leading-relaxed text-white/70">FairEint zeigt Programmnähe auf wenigen ausgewählten wirtschafts- und investitionspolitischen Fragen. Die Scores sind ein transparenter Vergleich, keine Aussage darüber, welche Partei du wählen solltest.</p></div>
      <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setStep('policy')} className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold">Entscheidungen ändern</button><button onClick={() => setStep('start')} className="rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white">Neu starten</button><a href="?reality=1" className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold">Haushaltscheck mit ZEW-Daten</a></div><div className="mt-8 border-t border-border pt-5 text-xs text-ink-muted">Vertiefen: <a className="underline" href="?diw=1">DIW-Steuerlab</a> · <a className="underline" href="?workshop=1">Workshop-Modus</a> · <a className="underline" href="?v5=1">erweiterte FairEint-Version</a></div>
    </section>}
  </main>
}

function MiniStep({ n, title, text }: { n: string; title: string; text: string }) { return <div className="rounded-2xl border border-border bg-white p-4"><div className="text-xs font-black text-gold">{n}</div><div className="mt-1 font-black">{title}</div><div className="mt-1 text-sm text-ink-muted">{text}</div></div> }
function Question({ title, question, intro, children }: { title: string; question: string; intro: string; children: ReactNode }) { return <section className="mt-6 rounded-3xl border border-border bg-white p-5 sm:p-7"><div className="text-xs font-black uppercase tracking-widest text-gold">{title}</div><h2 className="mt-2 text-2xl font-black">{question}</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">{intro}</p><div className="mt-5">{children}</div></section> }
function NextBack({ back, next, nextLabel = 'Weiter' }: { back: () => void; next: () => void; nextLabel?: string }) { return <div className="mt-8 flex justify-between gap-3"><button onClick={back} className="inline-flex items-center gap-1 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold"><ArrowLeft size={15} /> Zurück</button><button onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-black text-white">{nextLabel} <ArrowRight size={15} /></button></div> }
function Summary({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-border bg-white p-4"><div className="text-xs font-black uppercase tracking-widest text-gold">{title}</div><p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p></div> }
