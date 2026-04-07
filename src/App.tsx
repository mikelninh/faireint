import { useState } from 'react'
import { reforms, principles } from './data/manifesto'
import { timeline, costs, partyReactions, generationImpact } from './data/roadmap'
import { voters, satisfactionSummary } from './data/voters'
import { partyPathTo80 } from './data/path-to-80'
import { policyScenarios, simulatePolicy, personas } from './data/personas'
import { innovations } from './data/innovations'
import { ChevronDown, ChevronUp, Heart, ArrowRight, CheckCircle, X } from 'lucide-react'
import './index.css'

/* ── Helpers ── */

function Section({ id, bg = 'bg-bg', children }: { id?: string; bg?: string; children: React.ReactNode }) {
  return <section id={id} className={`py-16 sm:py-24 px-5 sm:px-8 ${bg}`}><div className="max-w-3xl mx-auto">{children}</div></section>
}

function WideSection({ id, bg = 'bg-bg', children }: { id?: string; bg?: string; children: React.ReactNode }) {
  return <section id={id} className={`py-16 sm:py-24 px-5 sm:px-8 ${bg}`}><div className="max-w-5xl mx-auto">{children}</div></section>
}

function Tag({ children, color = 'gold' }: { children: React.ReactNode; color?: string }) {
  const c: Record<string, string> = { gold: 'bg-gold-light text-gold', green: 'bg-green-light text-green', red: 'bg-red-light text-red', blue: 'bg-blue-light text-blue', purple: 'bg-purple-light text-purple' }
  return <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${c[color] || c.gold}`}>{children}</span>
}

function Bar({ pct, color = 'bg-green' }: { pct: number; color?: string }) {
  return (
    <div className="w-full bg-bg-alt rounded-full h-3 overflow-hidden">
      <div className={`h-3 rounded-full bar-animate ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-bg-card rounded-2xl border border-border p-6 sm:p-8 hover-lift ${className}`}>{children}</div>
}

/* ── App ── */

export default function App() {
  const [openReform, setOpenReform] = useState<string | null>(null)
  const [openVoter, setOpenVoter] = useState<string | null>(null)
  const [activePolicy, setActivePolicy] = useState(policyScenarios[0].id)
  const [openInnovation, setOpenInnovation] = useState<string | null>(null)

  return (
    <div className="min-h-screen">

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-bg/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-14">
          <a href="#" className="font-display text-xl">Deutschland <span className="text-gold">2030</span></a>
          <div className="hidden lg:flex gap-1 text-[13px]">
            {[['start','Start'],['reformen','Reformen'],['simulator','Simulator'],['innovationen','Ideen'],['menschen','Menschen'],['parteien','Parteien']].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ━━━━ HERO ━━━━ */}
      <header className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center pt-20 bg-bg">
        <div className="max-w-2xl mx-auto fade-in">
          <Tag>Manifest</Tag>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mt-6 mb-6 tracking-tight">
            Deutschland <span className="text-gold">2030</span>
          </h1>
          <p className="text-xl sm:text-2xl text-ink-soft leading-relaxed mb-10">
            Was wäre, wenn wir das Beste aus 12 Ländern nehmen — und daraus ein Land bauen?
          </p>

          {/* The one number */}
          <Card className="max-w-sm mx-auto mb-12 fade-in-delay">
            <p className="text-ink-muted text-sm mb-4">Zufriedenheit mit unserer Demokratie</p>
            <div className="flex items-center justify-center gap-6 mb-2">
              <div className="text-center">
                <p className="text-4xl font-display text-red">53%</p>
                <p className="text-sm text-ink-muted mt-1">Heute</p>
              </div>
              <ArrowRight className="w-5 h-5 text-border" />
              <div className="text-center">
                <p className="text-4xl font-display text-green">80%+</p>
                <p className="text-sm text-ink-muted mt-1">Unser Ziel</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted">Dänemark schafft 92%. Es ist möglich.</p>
          </Card>

          <a href="#start" className="text-gold text-sm hover:underline">
            So funktioniert's <ChevronDown className="w-4 h-4 inline ml-1 animate-bounce" />
          </a>
        </div>
      </header>

      {/* ━━━━ DAS PROBLEM ━━━━ */}
      <Section id="start" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="red">Das Problem</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3">Deutschland funktioniert — aber es <span className="text-red">fühlt</span> sich nicht so an.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { n: '64%', l: 'DB-Pünktlichkeit', s: 'Japan: 99%' },
            { n: '€2,43', l: 'Diesel pro Liter', s: 'Allzeithoch' },
            { n: '3%', l: 'für Prävention', s: '97% für Reparatur' },
          ].map((s, i) => (
            <Card key={i}><p className="text-3xl font-display text-red mb-1">{s.n}</p><p className="text-ink-soft">{s.l}</p><p className="text-sm text-ink-muted">{s.s}</p></Card>
          ))}
        </div>
        <p className="text-center text-ink-muted text-lg">
          Es geht nicht nur um Geld. Es geht darum, ob der Staat dich <strong className="text-ink">respektiert</strong> und du dich <strong className="text-ink">frei</strong> fühlst.
        </p>
      </Section>

      {/* ━━━━ 6 PRINZIPIEN ━━━━ */}
      <WideSection bg="bg-bg">
        <div className="text-center mb-10">
          <Tag>Die Vision</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">6 Prinzipien</h2>
          <p className="text-ink-muted">Keine Partei. Keine Ideologie. Nur was funktioniert.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((p, i) => (
            <Card key={i}>
              <span className="text-2xl font-display text-gold/30">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-lg mt-2 mb-2">{p.title}</h3>
              <p className="text-ink-muted text-[15px]">{p.description}</p>
            </Card>
          ))}
        </div>
      </WideSection>

      {/* ━━━━ FAHRPLAN ━━━━ */}
      <Section bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="blue">Der Fahrplan</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Von heute bis 2035</h2>
          <p className="text-ink-muted">Konkrete Gesetze. Konkrete Fristen.</p>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-6 bottom-6 w-px bg-border" />
          <div className="space-y-5">
            {timeline.map((step, i) => {
              const dot = step.status === 'now' ? 'bg-red' : step.status === 'soon' ? 'bg-gold' : step.status === 'mid' ? 'bg-green' : 'bg-blue'
              const tag = step.status === 'now' ? 'red' : step.status === 'soon' ? 'gold' : step.status === 'mid' ? 'green' : 'blue'
              const label = step.status === 'now' ? 'Jetzt' : step.status === 'soon' ? 'Bald' : step.status === 'mid' ? '2028-29' : 'Zukunft'
              return (
                <div key={i} className="relative pl-12">
                  <div className={`absolute left-2.5 top-6 w-3 h-3 rounded-full ${dot} ring-4 ring-bg-alt`} />
                  <Card>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display text-2xl">{step.year}</span>
                      {step.quarter && <span className="text-ink-muted text-sm">{step.quarter}</span>}
                      <Tag color={tag}>{label}</Tag>
                    </div>
                    <h3 className="font-display text-lg mb-1">{step.title}</h3>
                    <p className="text-ink-muted text-sm mb-3">{step.description}</p>
                    {step.laws?.map((law, j) => (
                      <div key={j} className="flex items-start gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green mt-0.5 shrink-0" />
                        <span className="text-sm">{law}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ━━━━ 9 REFORMEN ━━━━ */}
      <Section id="reformen">
        <div className="text-center mb-10">
          <Tag color="green">Die Reformen</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">9 Bereiche</h2>
          <p className="text-ink-muted">Tippe auf einen Bereich für Details.</p>
        </div>
        <div className="space-y-3">
          {reforms.map(r => {
            const open = openReform === r.id
            return (
              <div key={r.id} className={`rounded-2xl border transition-all duration-200 ${open ? 'bg-bg-card shadow-lg border-gold/30' : 'bg-bg-card border-border'}`}>
                <button onClick={() => setOpenReform(open ? null : r.id)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.emoji}</span>
                    <div><h3 className="font-display text-lg">{r.title}</h3><p className="text-sm text-ink-muted">{r.subtitle}</p></div>
                  </div>
                  {open ? <ChevronUp className="w-5 h-5 text-gold shrink-0" /> : <ChevronDown className="w-5 h-5 text-ink-muted/30 shrink-0" />}
                </button>
                {open && (
                  <div className="px-5 sm:px-6 pb-6 space-y-5">
                    <div className="bg-red-light rounded-xl p-5"><Tag color="red">Problem</Tag><p className="mt-2 text-ink-soft">{r.problem}</p></div>
                    <div><Tag color="green">Lösung</Tag>
                      <ul className="mt-2 space-y-2">{r.solution.map((s, i) => (
                        <li key={i} className="flex items-start gap-3"><ArrowRight className="w-4 h-4 text-green mt-1 shrink-0" /><span className="text-ink-soft">{s}</span></li>
                      ))}</ul>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">{r.worldwide.map((w, i) => (
                      <div key={i} className="bg-blue-light rounded-xl p-4"><p className="font-bold text-sm">{w.flag} {w.country}</p><p className="text-sm text-ink-muted mt-1">{w.lesson}</p></div>
                    ))}</div>
                    <div className="bg-gold-light rounded-xl p-5 border border-gold/10">
                      <Tag>Geschichte</Tag>
                      <p className="font-display text-lg mt-2">{r.story.name}, {r.story.age} — {r.story.role}</p>
                      <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        <div className="bg-red-light rounded-lg p-4"><p className="text-xs font-bold text-red mb-1">VORHER</p><p className="text-sm text-ink-soft">{r.story.before}</p></div>
                        <div className="bg-green-light rounded-lg p-4"><p className="text-xs font-bold text-green mb-1">NACHHER</p><p className="text-sm text-ink-soft">{r.story.after}</p></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ━━━━ DIE RECHNUNG ━━━━ */}
      <WideSection bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="green">Die Rechnung</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Was kostet's? Was bringt's?</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <Card><p className="text-3xl font-display text-red">€23 Mrd.</p><p className="text-ink-soft">Investition pro Jahr</p></Card>
          <Card><p className="text-3xl font-display text-green">€91 Mrd.</p><p className="text-ink-soft">Ersparnis pro Jahr</p></Card>
          <Card className="border-gold/20 bg-gold-light"><p className="text-3xl font-display text-gold">+€68 Mrd.</p><p className="text-ink-soft">Nettogewinn</p><p className="text-sm text-ink-muted">= €820 pro Bürger</p></Card>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {costs.map((c, i) => {
            const roi = c.annualSaving / c.annualCost
            return (
              <Card key={i}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display">{c.reform}</h4>
                  <Tag>1:{roi.toFixed(0)}</Tag>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-light rounded-xl p-3 text-center"><p className="text-xl font-display text-red">€{c.annualCost}</p><p className="text-xs text-ink-muted">Mrd. Kosten</p></div>
                  <div className="bg-green-light rounded-xl p-3 text-center"><p className="text-xl font-display text-green">€{c.annualSaving}</p><p className="text-xs text-ink-muted">Mrd. Ersparnis</p></div>
                </div>
              </Card>
            )
          })}
        </div>
      </WideSection>

      {/* ━━━━ POLICY SIMULATOR ━━━━ */}
      <Section id="simulator">
        <div className="text-center mb-10">
          <Tag color="purple">Simulator</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Was denkt Deutschland?</h2>
          <p className="text-ink-muted">Wähle eine Reform — sieh wie 84 Millionen reagieren.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {policyScenarios.map(s => (
            <button key={s.id} onClick={() => setActivePolicy(s.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${activePolicy === s.id ? 'bg-gold text-white shadow-md' : 'bg-bg-card border border-border text-ink-muted hover:text-ink'}`}>
              {s.emoji} {s.title}
            </button>
          ))}
        </div>
        {policyScenarios.filter(s => s.id === activePolicy).map(scenario => {
          const result = simulatePolicy(scenario.id)
          return (
            <div key={scenario.id}>
              <Card className="mb-6">
                <p className="text-ink-soft mb-4">{scenario.description}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-red-light rounded-xl p-4 text-center"><p className="text-2xl font-display text-red">€{scenario.annualCost}</p><p className="text-xs text-ink-muted">Mrd. Kosten</p></div>
                  <div className="bg-green-light rounded-xl p-4 text-center"><p className="text-2xl font-display text-green">€{scenario.annualSaving}</p><p className="text-xs text-ink-muted">Mrd. Ersparnis</p></div>
                  <div className="bg-gold-light rounded-xl p-4 text-center"><p className="text-2xl font-display text-gold">{result.approval}%</p><p className="text-xs text-ink-muted">{result.label}</p></div>
                </div>
              </Card>
              <div className="grid sm:grid-cols-2 gap-3">
                {scenario.reactions.map(r => {
                  const p = personas.find(x => x.id === r.personaId)
                  if (!p) return null
                  return (
                    <Card key={r.personaId} className="!p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{p.emoji}</span>
                        <div className="flex-1"><span className="font-bold text-sm">{p.name}, {p.age}</span><span className="text-ink-muted text-xs ml-1">({p.party})</span></div>
                        <span className={`font-display text-lg ${r.approval >= 70 ? 'text-green' : r.approval >= 40 ? 'text-gold' : 'text-red'}`}>{r.approval}%</span>
                      </div>
                      <Bar pct={r.approval} color={r.approval >= 70 ? 'bg-green' : r.approval >= 40 ? 'bg-gold' : 'bg-red'} />
                      <p className="text-sm text-ink-muted mt-2 italic">„{r.reason}"</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </Section>

      {/* ━━━━ 7 INNOVATIONEN ━━━━ */}
      <Section id="innovationen" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="purple">Weltneuheiten</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">7 Ideen die es noch nirgendwo gibt</h2>
          <p className="text-ink-muted">Technisch machbar. Politisch möglich. Wir bauen sie.</p>
        </div>
        <div className="space-y-3">
          {innovations.map(inv => {
            const open = openInnovation === inv.id
            return (
              <div key={inv.id} className={`rounded-2xl border transition-all ${open ? 'bg-bg-card shadow-lg border-gold/30' : 'bg-bg-card border-border'}`}>
                <button onClick={() => setOpenInnovation(open ? null : inv.id)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{inv.emoji}</span>
                    <div><h3 className="font-display text-lg">{inv.title}</h3><p className="text-sm text-ink-muted">{inv.oneLiner}</p></div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Tag color={inv.feasibility === 'sofort' ? 'green' : inv.feasibility === '1-2 Jahre' ? 'gold' : 'red'}>{inv.feasibility}</Tag>
                    {open ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5 text-ink-muted/30" />}
                  </div>
                </button>
                {open && (
                  <div className="px-5 sm:px-6 pb-6 space-y-4">
                    <div className="bg-red-light rounded-xl p-5"><Tag color="red">Problem</Tag><p className="mt-2 text-ink-soft">{inv.problem}</p></div>
                    <div className="bg-green-light rounded-xl p-5"><Tag color="green">Lösung</Tag><p className="mt-2 text-ink-soft">{inv.solution}</p></div>
                    <div>
                      <p className="font-bold text-sm text-ink-muted mb-2">So funktioniert's</p>
                      {inv.howItWorks.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 mb-2">
                          <span className="w-6 h-6 rounded-full bg-gold-light text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-ink-soft">{s}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-light rounded-xl p-4"><Tag color="blue">Existiert schon?</Tag><p className="mt-2 text-sm text-ink-soft">{inv.exists}</p></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ━━━━ MENSCHEN ━━━━ */}
      <Section id="menschen">
        <div className="text-center mb-10">
          <Tag>Echte Menschen</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Sind die Menschen zufriedener?</h2>
        </div>
        <Card className="mb-8 text-center">
          <div className="flex items-center justify-center gap-8 mb-2">
            <div><p className="text-4xl font-display text-red">{satisfactionSummary.currentAverage}%</p><p className="text-sm text-ink-muted">Jetzt</p></div>
            <ArrowRight className="w-5 h-5 text-border" />
            <div><p className="text-4xl font-display text-green">{satisfactionSummary.afterAverage}%</p><p className="text-sm text-ink-muted">Nach Reformen</p></div>
          </div>
          <p className="text-sm text-ink-muted">+{satisfactionSummary.afterAverage - satisfactionSummary.currentAverage} Punkte · 8 Wählerprofile</p>
        </Card>
        <Card className="mb-6 !p-4 sm:!p-6">
          {voters.map(v => (
            <div key={v.id} className="flex items-center gap-3 py-2">
              <span className="text-xl">{v.emoji}</span>
              <span className="w-24 text-sm text-ink-muted truncate">{v.name}, {v.age}</span>
              <div className="flex-1"><Bar pct={v.afterSatisfaction} color={v.afterSatisfaction >= 70 ? 'bg-green' : v.afterSatisfaction >= 50 ? 'bg-gold' : 'bg-red'} /></div>
              <span className="text-sm font-display text-green w-10 text-right">+{v.afterSatisfaction - v.currentSatisfaction}</span>
            </div>
          ))}
        </Card>
        <div className="space-y-3">
          {voters.map(v => {
            const open = openVoter === v.id
            return (
              <div key={v.id} className={`rounded-2xl border transition-all ${open ? 'bg-bg-card shadow-lg border-gold/30' : 'bg-bg-card border-border'}`}>
                <button onClick={() => setOpenVoter(open ? null : v.id)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer">
                  <div className="flex items-center gap-3"><span className="text-2xl">{v.emoji}</span><div><span className="font-display">{v.name}, {v.age}</span><span className="text-ink-muted text-sm ml-2">{v.location} · {v.votedLast}</span></div></div>
                  <div className="flex items-center gap-2"><span className="text-sm font-display text-green">+{v.afterSatisfaction - v.currentSatisfaction}</span>{open ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5 text-ink-muted/20" />}</div>
                </button>
                {open && (
                  <div className="px-4 sm:px-5 pb-5 space-y-4">
                    <p className="text-sm text-ink-muted">{v.profile} · {v.income}</p>
                    <div><Tag color="red">Sorgen</Tag><div className="mt-2 space-y-1">{v.topWorries.map((w, i) => <p key={i} className="text-sm text-ink-muted">• {w}</p>)}</div></div>
                    <div><Tag color="green">Was die Reformen liefern</Tag><div className="mt-2 space-y-1.5">{v.whatTheyGet.map((g, i) => (
                      <div key={i} className="flex items-start gap-2">{g.delivered ? <CheckCircle className="w-4 h-4 text-green mt-0.5 shrink-0" /> : <X className="w-4 h-4 text-red/40 mt-0.5 shrink-0" />}<span className="text-sm text-ink-soft">{g.item} <span className="text-ink-muted">— {g.note}</span></span></div>
                    ))}</div></div>
                    <div className="bg-bg-alt rounded-xl p-5"><p className="text-ink-soft italic">„{v.quote}"</p><p className="text-sm text-ink-muted mt-1">— {v.name}, {v.age}</p></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ━━━━ PARTEIEN ━━━━ */}
      <WideSection id="parteien" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="blue">Parteien-Check</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Können alle zustimmen?</h2>
        </div>
        <Card className="mb-8 !p-4 sm:!p-6">
          {partyReactions.map(p => (
            <div key={p.party} className="flex items-center gap-3 py-2">
              <span className="w-20 text-sm font-bold">{p.party}</span>
              <div className="flex-1"><Bar pct={p.approval} color={p.approval >= 70 ? 'bg-green' : p.approval >= 50 ? 'bg-gold' : 'bg-red'} /></div>
              <span className="text-sm font-display w-10 text-right">{p.approval}%</span>
            </div>
          ))}
          <p className="text-sm text-ink-muted mt-3 text-center">4 von 6 über 50% — verfassungsändernde Mehrheit möglich</p>
        </Card>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partyPathTo80.map(p => (
            <Card key={p.party}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display text-lg">{p.party}</h4>
                <span className="text-sm font-display"><span className="text-ink-muted">{p.currentApproval}</span> → <span className={p.potentialApproval >= 80 ? 'text-green' : 'text-gold'}>{p.potentialApproval}%</span></span>
              </div>
              <Bar pct={p.potentialApproval} color={p.potentialApproval >= 80 ? 'bg-green' : 'bg-gold'} />
              <p className="text-sm text-ink-muted italic mt-3 mb-3">{p.whatTheyReallyWant}</p>
              <div className="bg-gold-light rounded-xl p-4"><p className="text-xs font-bold text-gold mb-1">DER KOMPROMISS</p><p className="text-sm text-ink-soft">{p.keyCompromise}</p></div>
            </Card>
          ))}
        </div>
      </WideSection>

      {/* ━━━━ FÜR DICH ━━━━ */}
      <WideSection>
        <div className="text-center mb-10">
          <Tag color="green">Für dich</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Was ändert sich in deinem Leben?</h2>
          <p className="text-ink-muted">Sofort. In 5 Jahren. Lebenslang.</p>
        </div>
        <div className="space-y-4">
          {generationImpact.map((p, i) => (
            <Card key={i}>
              <div className="flex items-center gap-3 mb-4"><span className="text-3xl">{p.emoji}</span><div><h3 className="font-display text-lg">{p.name}</h3><p className="text-sm text-ink-muted">{p.label}</p></div></div>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-gold-light rounded-xl p-4"><Tag>Sofort</Tag><p className="text-sm text-ink-soft mt-2">{p.shortTerm}</p></div>
                <div className="bg-green-light rounded-xl p-4"><Tag color="green">In 5 Jahren</Tag><p className="text-sm text-ink-soft mt-2">{p.longTerm}</p></div>
                <div className="bg-blue-light rounded-xl p-4"><Tag color="blue">Lebenslang</Tag><p className="text-sm text-ink-soft mt-2">{p.lifetime}</p></div>
              </div>
            </Card>
          ))}
        </div>
      </WideSection>

      {/* ━━━━ FINALE ━━━━ */}
      <section className="py-20 sm:py-28 px-6 bg-bg text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-8" />
        <h2 className="font-display text-3xl sm:text-4xl max-w-lg mx-auto mb-6 leading-tight">
          Jedes Element existiert bereits. <span className="text-gold">Irgendwo auf der Welt.</span>
        </h2>
        <p className="text-ink-muted text-lg mb-8 max-w-md mx-auto">Wir müssen es nur zusammensetzen. Und anfangen.</p>
        <div className="flex flex-wrap justify-center gap-3 text-3xl mb-10">
          {["🇯🇵","🇫🇮","🇹🇼","🇪🇪","🇨🇭","🇩🇰","🇵🇹","🇸🇬","🇨🇺","🇬🇧","🇮🇸","🇸🇪"].map((f, i) => (
            <span key={i} className="hover:scale-150 transition-transform duration-500 cursor-default">{f}</span>
          ))}
        </div>
        <Card className="max-w-xs mx-auto text-left">
          <div className="flex justify-between mb-1"><span className="text-ink-muted text-sm">Investition</span><span className="font-display text-red">€23 Mrd.</span></div>
          <div className="flex justify-between mb-1"><span className="text-ink-muted text-sm">Ersparnis</span><span className="font-display text-green">€91 Mrd.</span></div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between"><span className="font-bold">Nettogewinn</span><span className="font-display text-gold text-xl">+€68 Mrd.</span></div>
        </Card>
      </section>

      {/* ━━━━ FOOTER ━━━━ */}
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-ink-muted text-sm">Deutschland 2030 — Manifest für die Zukunft</p>
        <p className="text-ink-muted/50 text-xs mt-1">Daten: OECD · WHO · Eurobarometer · World Happiness Report · Bundestag · Open Source</p>
      </footer>
    </div>
  )
}
