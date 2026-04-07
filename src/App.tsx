import { useState } from 'react'
import { reforms, principles } from './data/manifesto'
import { timeline, costs, partyReactions, generationImpact } from './data/roadmap'
import { voters, satisfactionSummary } from './data/voters'
import { deepNeeds, trustPillars, partyPathTo80, internationalCeiling, truthBomb } from './data/path-to-80'
import {
  ChevronDown, ChevronUp, Heart, Users, ArrowRight, CheckCircle,
  Clock, Target, TrendingUp, Scale, Sparkles, X, Lightbulb, BookOpen
} from 'lucide-react'
import './index.css'

/* ── Reusable Components ────────────────────────────── */

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-gold" />
      <p className="text-gold uppercase tracking-[0.25em] text-[11px] font-semibold">{label}</p>
    </div>
  )
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">{children}</h2>
      {sub && <p className="text-sm sm:text-base opacity-50 max-w-xl mx-auto">{sub}</p>}
    </div>
  )
}

function Bar({ value, max, color = 'bg-sage', height = 'h-2.5' }: { value: number; max: number; color?: string; height?: string }) {
  return (
    <div className={`w-full bg-white/10 rounded-full ${height} overflow-hidden`}>
      <div className={`${height} rounded-full count-bar ${color}`} style={{ width: `${Math.min(value / max * 100, 100)}%` }} />
    </div>
  )
}

function Chip({ children, color = 'bg-gold/10 text-gold' }: { children: React.ReactNode; color?: string }) {
  return <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${color}`}>{children}</span>
}

/* ── App ────────────────────────────────────────────── */

export default function App() {
  const [expandedReform, setExpandedReform] = useState<string | null>(null)
  const [expandedVoter, setExpandedVoter] = useState<string | null>(null)

  return (
    <div className="min-h-screen text-[15px] leading-relaxed">

      {/* ━━ NAV ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav className="fixed top-0 w-full z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-12">
          <a href="#" className="font-serif text-gold text-base tracking-wide">DE 2030</a>
          <div className="hidden md:flex gap-0.5">
            {[
              ['problem','Problem'],['vision','Vision'],['reformen','Reformen'],['rechnung','Zahlen'],
              ['waehler','Menschen'],['weg-zu-80','→ 80%'],['parteien','Parteien'],['generationen','Für dich']
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}
                className="px-3 py-1 rounded-full text-[11px] text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-ink">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[150px] glow-orb" />
          <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-sage/15 blur-[130px] glow-orb" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-sky/10 blur-[120px] glow-orb" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto fade-up">
          <p className="text-gold/80 uppercase tracking-[0.4em] text-[11px] mb-8 font-semibold">Manifest für die Zukunft</p>
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-[96px] text-white leading-[1.05] mb-6 tracking-tight">
            Deutschland<br /><span className="text-gold">2030</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-lg mx-auto mb-16 leading-relaxed">
            Was wäre, wenn wir das Beste aus 12 Ländern nehmen — und daraus ein Land bauen?
          </p>

          {/* The one stat that matters */}
          <div className="fade-up fade-up-delay-2 bg-white/[0.03] backdrop-blur rounded-2xl p-8 border border-white/[0.06] max-w-md mx-auto mb-16">
            <p className="text-white/30 text-[11px] uppercase tracking-widest mb-4">Zufriedenheit mit der Demokratie</p>
            <div className="flex items-end justify-center gap-8 mb-4">
              <div>
                <p className="text-5xl font-serif text-accent">53%</p>
                <p className="text-white/30 text-xs mt-1">Deutschland heute</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 mb-3" />
              <div>
                <p className="text-5xl font-serif text-sage-light">80%+</p>
                <p className="text-white/30 text-xs mt-1">Unser Ziel</p>
              </div>
            </div>
            <p className="text-white/25 text-xs">Dänemark: 92%. Irland: 83%. Es ist möglich.</p>
          </div>

          <a href="#problem" className="inline-flex flex-col items-center gap-1 text-white/30 hover:text-gold transition-colors">
            <span className="text-[11px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </header>

      {/* ━━ THE PROBLEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="problem" className="py-20 sm:py-28 px-6 bg-ink-light">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel icon={Target} label="Das Problem" />
          <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight mb-8">
            Deutschland funktioniert —<br />aber es <span className="text-accent">fühlt</span> sich nicht so an.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { stat: '64%', label: 'DB-Pünktlichkeit', sub: '(Japan: 99%)' },
              { stat: '€2,43', label: 'Diesel/Liter', sub: '(Allzeithoch)' },
              { stat: '3%', label: 'für Prävention', sub: '(97% für Reparatur)' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.05]">
                <p className="text-3xl font-serif text-accent-light mb-1">{s.stat}</p>
                <p className="text-white/50 text-sm">{s.label}</p>
                <p className="text-white/25 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Es geht nicht nur um Geld. Es geht darum, ob der Staat dich respektiert.
            Ob du gehört wirst. Ob du dich sicher fühlst. Ob du frei bist.<br />
            <span className="text-white/60">Die Forschung zeigt: das kann man ändern.</span>
          </p>
        </div>
      </section>

      {/* ━━ THE VISION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="vision" className="py-20 sm:py-28 px-6 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <SectionLabel icon={Sparkles} label="Die Vision" />
          <SectionTitle sub="Keine Partei. Keine Ideologie. Nur das, was nachweislich funktioniert — irgendwo auf der Welt.">
            6 Prinzipien
          </SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p, i) => (
              <div key={i} className="group bg-white rounded-2xl p-7 border border-parchment-dark hover:border-gold/30 hover:shadow-lg transition-all duration-300">
                <span className="text-2xl font-serif text-gold/40 group-hover:text-gold transition-colors">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-lg mt-3 mb-2">{p.title}</h3>
                <p className="text-ink-light/60 text-[14px] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ ROADMAP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="roadmap" className="py-20 sm:py-28 px-6 bg-ink text-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel icon={Clock} label="Der Fahrplan" />
          <SectionTitle sub="Konkrete Gesetze. Konkrete Fristen. Was du wann spürst.">
            <span className="text-white">Von heute bis 2035</span>
          </SectionTitle>
          <div className="relative">
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-white/10" />
            <div className="space-y-6">
              {timeline.map((step, i) => {
                const dotColor = step.status === 'now' ? 'bg-accent' : step.status === 'soon' ? 'bg-gold' : step.status === 'mid' ? 'bg-sage' : 'bg-sky'
                return (
                  <div key={i} className="relative pl-12">
                    <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full ${dotColor} ring-4 ring-ink`} />
                    <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-serif text-xl text-white/90">{step.year}</span>
                        {step.quarter && <span className="text-white/30 text-xs">{step.quarter}</span>}
                        <Chip color={step.status === 'now' ? 'bg-accent/20 text-accent-light' : step.status === 'soon' ? 'bg-gold/20 text-gold' : step.status === 'mid' ? 'bg-sage/20 text-sage-light' : 'bg-sky/20 text-sky-light'}>
                          {step.status === 'now' ? 'Jetzt' : step.status === 'soon' ? 'Bald' : step.status === 'mid' ? '2028-29' : 'Zukunft'}
                        </Chip>
                      </div>
                      <h3 className="font-serif text-base text-white/80 mb-1">{step.title}</h3>
                      <p className="text-white/35 text-xs mb-3">{step.description}</p>
                      {step.laws?.map((law, j) => (
                        <div key={j} className="flex items-start gap-2 mb-1">
                          <CheckCircle className="w-3 h-3 text-sage/60 mt-0.5 shrink-0" />
                          <span className="text-xs text-white/50">{law}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ REFORMS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="reformen" className="py-20 sm:py-28 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <SectionLabel icon={BookOpen} label="Die Reformen" />
          <SectionTitle sub="9 Bereiche. Klick auf einen — sieh Problem, Lösung, Vorbild, und eine echte Geschichte.">
            Was sich konkret ändert
          </SectionTitle>
          <div className="space-y-2">
            {reforms.map(reform => {
              const open = expandedReform === reform.id
              return (
                <div key={reform.id} className={`rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'bg-white shadow-lg border border-gold/20' : 'bg-white border border-parchment-dark hover:border-gold/10'}`}>
                  <button onClick={() => setExpandedReform(open ? null : reform.id)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{reform.emoji}</span>
                      <div>
                        <h3 className="font-serif text-base">{reform.title}</h3>
                        <p className="text-[12px] text-ink-light/40">{reform.subtitle}</p>
                      </div>
                    </div>
                    {open ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-ink-light/20" />}
                  </button>
                  {open && (
                    <div className="px-5 pb-6 space-y-5">
                      <div className="bg-accent/[0.04] rounded-xl p-4">
                        <Chip color="bg-accent/10 text-accent">Problem</Chip>
                        <p className="text-ink-light/70 text-[14px] mt-2 leading-relaxed">{reform.problem}</p>
                      </div>
                      <div>
                        <Chip color="bg-sage/10 text-sage">Lösung</Chip>
                        <ul className="mt-2 space-y-1.5">
                          {reform.solution.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-[14px] text-ink-light/70">
                              <ArrowRight className="w-3.5 h-3.5 text-sage mt-0.5 shrink-0" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {reform.worldwide.map((w, i) => (
                          <div key={i} className="bg-sky/[0.04] rounded-xl p-3 border border-sky/10">
                            <p className="font-medium text-sm">{w.flag} {w.country}</p>
                            <p className="text-[12px] text-ink-light/60 mt-1">{w.lesson}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gold/[0.04] rounded-xl p-4 border border-gold/10">
                        <Chip color="bg-gold/10 text-gold">Echte Geschichte</Chip>
                        <p className="font-serif text-base mt-2">{reform.story.name}, {reform.story.age} — {reform.story.role}</p>
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                          <div className="bg-accent/[0.06] rounded-lg p-3">
                            <p className="text-[10px] uppercase tracking-wider text-accent/50 mb-1">Vorher</p>
                            <p className="text-[13px] text-ink-light/70">{reform.story.before}</p>
                          </div>
                          <div className="bg-sage/[0.06] rounded-lg p-3">
                            <p className="text-[10px] uppercase tracking-wider text-sage/50 mb-1">Nachher</p>
                            <p className="text-[13px] text-ink-light/70">{reform.story.after}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ━━ THE MATH ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="rechnung" className="py-20 sm:py-28 px-6 bg-ink text-white">
        <div className="max-w-5xl mx-auto">
          <SectionLabel icon={TrendingUp} label="Die Rechnung" />
          <SectionTitle sub="Jede Reform rechnet sich. Hier ist der Beweis.">
            <span className="text-white">Was kostet's? Was bringt's?</span>
          </SectionTitle>

          <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.06] mb-10 text-center">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Investition</p>
                <p className="text-3xl sm:text-4xl font-serif text-accent-light">€23 Mrd.</p>
              </div>
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Ersparnis</p>
                <p className="text-3xl sm:text-4xl font-serif text-sage-light">€91 Mrd.</p>
              </div>
              <div>
                <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Netto</p>
                <p className="text-3xl sm:text-4xl font-serif text-gold">+€68 Mrd.</p>
              </div>
            </div>
            <p className="text-white/25 text-xs mt-4">= €820 pro Bürger pro Jahr, die wir gewinnen</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {costs.map((item, i) => {
              const roi = item.annualSaving / item.annualCost
              return (
                <div key={i} className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-base text-white/80">{item.reform}</h4>
                    <Chip>ROI 1:{roi.toFixed(0)}</Chip>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center bg-accent/10 rounded-lg p-3">
                      <p className="text-xl font-serif text-accent-light">€{item.annualCost} Mrd.</p>
                      <p className="text-[10px] text-white/30 uppercase">Kosten</p>
                    </div>
                    <div className="text-center bg-sage/10 rounded-lg p-3">
                      <p className="text-xl font-serif text-sage-light">€{item.annualSaving} Mrd.</p>
                      <p className="text-[10px] text-white/30 uppercase">Ersparnis</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {item.savingItems.slice(0, 2).map((s, j) => (
                      <div key={j} className="flex justify-between text-xs">
                        <span className="text-white/40 truncate mr-2">{s.label}</span>
                        <span className="text-sage-light shrink-0">€{s.amount} Mrd.</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ━━ REAL PEOPLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="waehler" className="py-20 sm:py-28 px-6 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <SectionLabel icon={Users} label="Echte Menschen" />
          <SectionTitle sub="8 Wähler. Was sie sich wünschen. Was sie bekommen. Ob es reicht.">
            Sind die Menschen zufriedener?
          </SectionTitle>

          {/* Satisfaction shift */}
          <div className="bg-ink rounded-2xl p-8 mb-8 text-center">
            <div className="flex items-end justify-center gap-12 mb-4">
              <div>
                <p className="text-4xl font-serif text-accent-light">{satisfactionSummary.currentAverage}%</p>
                <p className="text-white/30 text-xs mt-1">Jetzt</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/20 mb-2" />
              <div>
                <p className="text-4xl font-serif text-sage-light">{satisfactionSummary.afterAverage}%</p>
                <p className="text-white/30 text-xs mt-1">Nach Reformen</p>
              </div>
            </div>
            <p className="text-white/40 text-xs">Durchschnitt aller 8 Profile · +{satisfactionSummary.afterAverage - satisfactionSummary.currentAverage} Punkte</p>
          </div>

          {/* Voter bars */}
          <div className="bg-white rounded-2xl p-6 border border-parchment-dark mb-6">
            {voters.map(v => (
              <div key={v.id} className="flex items-center gap-3 py-2">
                <span className="text-lg w-7">{v.emoji}</span>
                <span className="w-28 text-xs text-ink-light/60 truncate">{v.name}, {v.age}</span>
                <div className="flex-1"><Bar value={v.afterSatisfaction} max={100} color={v.afterSatisfaction >= 70 ? 'bg-sage' : v.afterSatisfaction >= 50 ? 'bg-gold' : 'bg-accent'} /></div>
                <span className="text-xs font-serif w-14 text-right text-sage">+{v.afterSatisfaction - v.currentSatisfaction}</span>
              </div>
            ))}
          </div>

          {/* Expandable voter cards */}
          <div className="space-y-2">
            {voters.map(voter => {
              const open = expandedVoter === voter.id
              return (
                <div key={voter.id} className={`rounded-2xl overflow-hidden transition-all ${open ? 'bg-white shadow-lg border border-gold/20' : 'bg-white border border-parchment-dark'}`}>
                  <button onClick={() => setExpandedVoter(open ? null : voter.id)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{voter.emoji}</span>
                      <div>
                        <span className="font-serif text-sm">{voter.name}, {voter.age}</span>
                        <span className="text-ink-light/40 text-xs ml-2">{voter.location} · {voter.votedLast}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif text-sage">+{voter.afterSatisfaction - voter.currentSatisfaction}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4 text-ink-light/20" />}
                    </div>
                  </button>
                  {open && (
                    <div className="px-4 pb-5 space-y-4">
                      <p className="text-xs text-ink-light/50">{voter.profile} · {voter.income}</p>
                      <div>
                        <Chip color="bg-accent/10 text-accent">Sorgen</Chip>
                        <div className="mt-2 space-y-1">
                          {voter.topWorries.map((w, i) => <p key={i} className="text-xs text-ink-light/60">• {w}</p>)}
                        </div>
                      </div>
                      <div>
                        <Chip color="bg-sage/10 text-sage">Was die Reformen liefern</Chip>
                        <div className="mt-2 space-y-1.5">
                          {voter.whatTheyGet.map((g, i) => (
                            <div key={i} className="flex items-start gap-2">
                              {g.delivered ? <CheckCircle className="w-3 h-3 text-sage mt-0.5 shrink-0" /> : <X className="w-3 h-3 text-accent/40 mt-0.5 shrink-0" />}
                              <span className="text-xs text-ink-light/60">{g.item} <span className="text-ink-light/30">— {g.note}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-ink rounded-xl p-4">
                        <p className="text-white/60 text-xs italic">„{voter.quote}"</p>
                        <p className="text-white/25 text-[10px] mt-1">— {voter.name}, {voter.age}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ━━ PATH TO 80% ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="weg-zu-80" className="py-20 sm:py-28 px-6 bg-ink text-white">
        <div className="max-w-4xl mx-auto">
          <SectionLabel icon={Lightbulb} label="Der Weg zu 80%" />
          <SectionTitle sub="Was wollen Menschen WIRKLICH? Die Psychologie hinter Zufriedenheit.">
            <span className="text-white">5 tiefe Bedürfnisse</span>
          </SectionTitle>

          {/* Deep needs */}
          <div className="space-y-3 mb-16">
            {deepNeeds.map((need, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.05]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{need.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm text-white/80">{need.need}</h4>
                      <span className="text-xs font-serif"><span className="text-accent-light">{need.germanyScore}</span><span className="text-white/20"> → </span><span className="text-sage-light">{need.targetScore}</span></span>
                    </div>
                    <p className="text-[11px] text-white/30">{need.govEquivalent}</p>
                  </div>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div className="absolute inset-y-0 left-0 bg-sage/20 rounded-full" style={{ width: `${need.targetScore}%` }} />
                  <div className="absolute inset-y-0 left-0 bg-accent rounded-full" style={{ width: `${need.germanyScore}%` }} />
                </div>
                <p className="text-[11px] text-white/25">{need.gap}</p>
              </div>
            ))}
          </div>

          {/* 6 Trust Pillars */}
          <SectionTitle sub="Was die zufriedensten Demokratien anders machen — und wie Deutschland es kopieren kann.">
            <span className="text-white">6 Hebel für Vertrauen</span>
          </SectionTitle>
          <div className="space-y-4 mb-16">
            {trustPillars.map(pillar => (
              <div key={pillar.id} className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.05]">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">{pillar.emoji}</span>
                  <div>
                    <h4 className="font-serif text-base text-white/90">{pillar.title}</h4>
                    <p className="text-xs text-white/40 italic mt-1">{pillar.insight}</p>
                  </div>
                </div>
                <div className="bg-white/[0.02] rounded-xl p-4 mb-3 border border-white/[0.04]">
                  <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Forschung</p>
                  <p className="text-xs text-white/50 leading-relaxed">{pillar.research}</p>
                </div>
                <div className="bg-sky/[0.06] rounded-xl p-4 mb-3 border border-sky/10">
                  <p className="text-[11px] text-sky-light/70 uppercase tracking-wider mb-1">{pillar.roleModel.flag} {pillar.roleModel.country}</p>
                  <p className="text-xs text-white/50 mb-1">{pillar.roleModel.what}</p>
                  <p className="text-xs text-sage-light">{pillar.roleModel.result}</p>
                </div>
                <div className="space-y-1">
                  {pillar.concreteStep.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gold/60 mt-0.5 shrink-0" />
                      <span className="text-xs text-white/45">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* International ceiling */}
          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.06] mb-16">
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-4 text-center">Zufriedenheit mit der Demokratie (Eurobarometer 2023)</p>
            <div className="space-y-2">
              {internationalCeiling.map(c => (
                <div key={c.country} className="flex items-center gap-3">
                  <span className="text-base w-6">{c.flag}</span>
                  <span className="w-24 text-xs text-white/50">{c.country}</span>
                  <div className="flex-1"><Bar value={c.satisfaction} max={100} color={c.country === 'Deutschland' ? 'bg-accent' : 'bg-sage'} height="h-4" /></div>
                  <span className={`text-xs font-serif w-10 text-right ${c.country === 'Deutschland' ? 'text-accent-light' : 'text-sage-light'}`}>{c.satisfaction}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Truth bomb */}
          <div className="bg-gold/[0.06] rounded-2xl p-8 border border-gold/10 text-center">
            <h3 className="font-serif text-2xl text-white mb-4">{truthBomb.question}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{truthBomb.answer}</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-white/[0.04] rounded-xl p-4">
                <p className="text-2xl font-serif text-sage-light">80%+</p>
                <p className="text-white/30 text-[10px]">Ist erreichbar</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4">
                <p className="text-2xl font-serif text-gold">53→80</p>
                <p className="text-white/30 text-[10px]">+27 Punkte möglich</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4">
                <p className="text-2xl font-serif text-white/60">~10 J.</p>
                <p className="text-white/30 text-[10px]">Zeithorizont</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ PARTY CHECK ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="parteien" className="py-20 sm:py-28 px-6 bg-parchment">
        <div className="max-w-5xl mx-auto">
          <SectionLabel icon={Scale} label="Parteien-Check" />
          <SectionTitle sub="Was jede Partei WIRKLICH will — und der Kompromiss der sie über 80% bringt.">
            Können alle Parteien zustimmen?
          </SectionTitle>

          <div className="bg-white rounded-2xl p-6 border border-parchment-dark mb-8">
            <div className="space-y-2">
              {partyReactions.map(p => (
                <div key={p.party} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-medium">{p.party}</span>
                  <div className="flex-1"><Bar value={p.approval} max={100} color={p.approval >= 70 ? 'bg-sage' : p.approval >= 50 ? 'bg-gold' : 'bg-accent'} height="h-3" /></div>
                  <span className="text-xs font-serif w-10 text-right">{p.approval}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-light/40 mt-3 text-center">4 von 6 über 50% · Verfassungsändernde Mehrheit möglich</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {partyPathTo80.map(p => (
              <div key={p.party} className="bg-white rounded-xl p-5 border border-parchment-dark">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif text-base">{p.party}</h4>
                  <span className="text-xs font-serif"><span className="text-ink-light/40">{p.currentApproval}</span> → <span className={p.potentialApproval >= 80 ? 'text-sage' : 'text-gold'}>{p.potentialApproval}%</span></span>
                </div>
                <Bar value={p.potentialApproval} max={100} color={p.potentialApproval >= 80 ? 'bg-sage' : p.potentialApproval >= 50 ? 'bg-gold' : 'bg-accent'} height="h-2" />
                <p className="text-[11px] text-ink-light/40 italic mt-3 mb-2">{p.whatTheyReallyWant}</p>
                <div className="bg-gold/[0.04] rounded-lg p-3 border border-gold/10">
                  <p className="text-[10px] uppercase tracking-wider text-gold/50 mb-1">Entscheidender Kompromiss</p>
                  <p className="text-[12px] text-ink-light/60">{p.keyCompromise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FOR YOU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="generationen" className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionLabel icon={Heart} label="Für dich" />
          <SectionTitle sub="Sofort. In 5 Jahren. Lebenslang.">
            Was ändert sich in deinem Leben?
          </SectionTitle>
          <div className="space-y-4">
            {generationImpact.map((person, i) => (
              <div key={i} className="bg-parchment rounded-2xl p-6 border border-parchment-dark">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{person.emoji}</span>
                  <div>
                    <h3 className="font-serif text-base">{person.name}</h3>
                    <p className="text-[11px] text-ink-light/40">{person.label}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Sofort', color: 'gold', text: person.shortTerm },
                    { label: 'In 5 Jahren', color: 'sage', text: person.longTerm },
                    { label: 'Lebenslang', color: 'sky', text: person.lifetime },
                  ].map((col, j) => (
                    <div key={j} className={`bg-${col.color}/[0.04] rounded-xl p-4 border border-${col.color}/10`}>
                      <Chip color={`bg-${col.color}/10 text-${col.color}`}>{col.label}</Chip>
                      <p className="text-xs text-ink-light/60 mt-2 leading-relaxed">{col.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 sm:py-32 px-6 bg-ink text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[200px] glow-orb" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-gold mx-auto mb-8 opacity-80" />
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6 leading-tight">
            Jedes Element existiert bereits.<br /><span className="text-gold">Irgendwo auf der Welt.</span>
          </h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Wir müssen es nur zusammensetzen. Und anfangen.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-2xl mb-12">
            {["🇯🇵","🇫🇮","🇹🇼","🇪🇪","🇨🇭","🇩🇰","🇵🇹","🇸🇬","🇨🇺","🇬🇧","🇮🇸","🇸🇪"].map((flag, i) => (
              <span key={i} className="hover:scale-150 transition-transform duration-300 cursor-default">{flag}</span>
            ))}
          </div>
          <p className="text-white/20 text-xs max-w-md mx-auto leading-relaxed">
            Die verfassungsändernde Mehrheit ist erreichbar. Die Rechnung geht auf.
            Der Weg ist klar. Es fehlt nur der Anfang.
          </p>
        </div>
      </section>

      {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="py-10 px-6 bg-ink border-t border-white/[0.03] text-center">
        <p className="text-white/20 text-xs">Deutschland 2030 — Manifest für die Zukunft</p>
        <p className="text-white/10 text-[10px] mt-1">
          Daten: OECD, WHO, Eurobarometer, World Happiness Report, Bundestag · Open Source
        </p>
      </footer>
    </div>
  )
}
