import { useState } from 'react'
import { reforms, principles } from './data/manifesto'
import { timeline, costs, partyReactions } from './data/roadmap'
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

  // Compute totals from data
  const totalCost = costs.reduce((s, c) => s + c.annualCost, 0)
  const totalSaving = costs.reduce((s, c) => s + c.annualSaving, 0)
  const netGain = totalSaving - totalCost

  return (
    <div className="min-h-screen">

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-bg/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-14">
          <a href="#" className="font-display text-xl">Fair<span className="text-gold">Eint</span></a>
          <div className="hidden lg:flex gap-1 text-[13px]">
            {[['problem','Problem'],['reformen','Reformen'],['rechnung','Zahlen'],['simulator','Simulator'],['parteien','Parteien'],['fahrplan','Fahrplan'],['handeln','Handeln']].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-bg-alt transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ━━━━ 1. HERO ━━━━ */}
      <header className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center pt-20 bg-bg">
        <div className="max-w-2xl mx-auto fade-in">
          <Tag>Einigkeit beginnt mit Fairness</Tag>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mt-6 mb-6 tracking-tight">
            Einigkeit. Und <span className="text-gold">Recht</span>. Und <span className="text-gold">Freiheit</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-ink-soft leading-relaxed mb-4">
            Aber Einigkeit funktioniert nur, wenn sie <strong>fair</strong> ist.
          </p>
          <p className="text-ink-muted mb-10">10 Reformen. Jede existiert bereits — irgendwo auf der Welt. Wir zeigen was sie kosten, was sie bringen, und wie Deutschland darauf reagiert.</p>

          {/* The killer comparison */}
          <Card className="max-w-md mx-auto mb-12 fade-in-delay">
            <p className="text-ink-muted text-sm mb-4">Die zentrale Erkenntnis</p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display text-red">€70-110 Mrd.</p>
                <p className="text-sm text-ink-muted mt-1">kostet Ungleichheit pro Jahr</p>
              </div>
              <span className="text-ink-muted text-2xl font-display">vs</span>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-display text-green">€30-45 Mrd.</p>
                <p className="text-sm text-ink-muted mt-1">kostet die Lösung</p>
              </div>
            </div>
            <p className="text-sm text-ink-muted">Das sind €4 pro Bürger pro Tag. Weniger als ein Kaffee bei Starbucks.</p>
          </Card>

          <a href="#problem" className="text-gold text-sm hover:underline">
            Was genau ist das Problem? <ChevronDown className="w-4 h-4 inline ml-1 animate-bounce" />
          </a>
        </div>
      </header>

      {/* ━━━━ 2. DAS PROBLEM ━━━━ */}
      <Section id="problem" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="red">Das Problem</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3">Deutschland funktioniert — aber es <span className="text-red">fühlt</span> sich nicht so an.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { n: '€65.000', l: 'Median-Vermögen in Deutschland', s: 'Weniger als Italien, Spanien, Griechenland. Die Hälfte aller Deutschen besitzt fast nichts.' },
            { n: '67%', l: 'des gesamten Vermögens gehört den Top 10%', s: 'Die untere Hälfte teilt sich 1,4%. Ein Kind in Grünwald erbt mehr als ein Kind in Gelsenkirchen je verdienen wird.' },
            { n: '25% vs 45%', l: 'Kapitalerträge vs. Arbeit besteuert', s: 'Wer mit Geld Geld verdient, zahlt weniger Steuern als wer arbeitet.' },
            { n: '€0', l: 'Vermögensteuer seit 1996', s: 'Nie abgeschafft — nur ausgesetzt. Die Schweiz erhebt sie seit Jahrzehnten: €9,5 Mrd./Jahr.' },
          ].map((s, i) => (
            <Card key={i}><p className="text-2xl font-display text-red mb-1">{s.n}</p><p className="text-ink-soft font-bold text-sm">{s.l}</p><p className="text-sm text-ink-muted mt-2">{s.s}</p></Card>
          ))}
        </div>
        <Card className="bg-red-light border-red/10 text-center">
          <p className="text-ink-soft text-lg mb-4">
            Ungleichheit ist kein Schicksal. Sie kostet uns <strong className="text-ink">€70-110 Mrd. pro Jahr</strong> — durch verlorenes Wachstum, Krankheit und Kriminalität. Das sind <strong className="text-ink">€1.300 pro Bürger pro Jahr</strong>, die uns einfach verloren gehen.
          </p>
          <button onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'FairEint', text: 'Ungleichheit kostet Deutschland €1.300 pro Bürger pro Jahr. Das muss sich ändern.', url: window.location.href })
            } else {
              navigator.clipboard.writeText(window.location.href)
              alert('Link kopiert!')
            }
          }} className="px-4 py-2 bg-red/10 border border-red/20 rounded-xl text-sm font-bold text-red cursor-pointer hover:bg-red/20 transition-colors">
            Diese Zahl teilen
          </button>
        </Card>
      </Section>

      {/* ━━━━ 3. PRINZIPIEN ━━━━ */}
      <WideSection bg="bg-bg">
        <div className="text-center mb-10">
          <Tag>Unsere Philosophie</Tag>
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

      {/* ━━━━ 4. REFORMEN ━━━━ */}
      <Section id="reformen" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="green">Die Reformen</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">10 Bereiche</h2>
          <p className="text-ink-muted">Jede Reform existiert bereits — irgendwo auf der Welt. Tippe auf einen Bereich.</p>
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

      {/* ━━━━ 5. DIE RECHNUNG ━━━━ */}
      <WideSection id="rechnung" bg="bg-bg">
        <div className="text-center mb-10">
          <Tag color="green">Die Rechnung</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Können wir uns das leisten?</h2>
          <p className="text-ink-muted">Kurze Antwort: Ja. Wir geben mehr für die Folgen von Ungleichheit aus als die Lösung kosten würde.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card><p className="text-3xl font-display text-red">€{Math.round(totalCost)} Mrd.</p><p className="text-ink-soft">Investition pro Jahr</p><p className="text-xs text-ink-muted mt-1">= €{Math.round(totalCost / 83 * 1000 / 12)}/Bürger/Monat</p></Card>
          <Card><p className="text-3xl font-display text-green">€{Math.round(totalSaving)} Mrd.</p><p className="text-ink-soft">Ersparnis + Einnahmen</p><p className="text-xs text-ink-muted mt-1">= €{Math.round(totalSaving / 83 * 1000 / 12)}/Bürger/Monat</p></Card>
          <Card className="border-gold/20 bg-gold-light"><p className="text-3xl font-display text-gold">+€{Math.round(netGain)} Mrd.</p><p className="text-ink-soft">Nettogewinn pro Jahr</p><p className="text-xs text-ink-muted mt-1">= +€{Math.round(netGain / 83 * 1000 / 12)}/Bürger/Monat</p></Card>
        </div>
        <Card className="mb-10 bg-blue-light border-blue/10">
          <p className="text-sm text-ink-soft text-center"><strong>Zum Vergleich:</strong> Die Energiekrise 2022-2023 hat Deutschland über <strong>€100 Mrd.</strong> für Gaspreisbremse und Tankrabatt gekostet — an einem Wochenende beschlossen. Alle unsere Reformen zusammen kosten weniger als das. Der Unterschied: sie wirken dauerhaft.</p>
        </Card>
        <div className="grid sm:grid-cols-2 gap-4">
          {costs.map((c, i) => {
            const roi = c.annualCost > 0 ? c.annualSaving / c.annualCost : c.annualSaving
            return (
              <Card key={i}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display text-sm sm:text-base">{c.reform}</h4>
                  <Tag>{c.annualCost > 0 ? `1:${roi.toFixed(0)}` : 'Gratis'}</Tag>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-red-light rounded-xl p-3 text-center"><p className="text-xl font-display text-red">€{c.annualCost}</p><p className="text-xs text-ink-muted">Mrd. Kosten</p></div>
                  <div className="bg-green-light rounded-xl p-3 text-center"><p className="text-xl font-display text-green">€{c.annualSaving}</p><p className="text-xs text-ink-muted">Mrd. Ersparnis</p></div>
                </div>
              </Card>
            )
          })}
        </div>
        <p className="text-center text-sm text-ink-muted mt-6">Dies sind keine beschlossenen Gesetze. Es sind evidenzbasierte Vorschläge mit nachprüfbaren Quellen.</p>
      </WideSection>

      {/* ━━━━ 6. POLICY SIMULATOR ━━━━ */}
      <Section id="simulator" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="purple">Simulator</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Wie reagiert Deutschland?</h2>
          <p className="text-ink-muted">23 Personas, gewichtet nach Bevölkerungsanteil. Wähle eine Reform.</p>
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
                      <p className="text-sm text-ink-muted mt-2 italic">&bdquo;{r.reason}&ldquo;</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </Section>

      {/* ━━━━ 7. MENSCHEN ━━━━ */}
      <Section id="menschen" bg="bg-bg">
        <div className="text-center mb-10">
          <Tag>Echte Menschen</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Werden die Menschen zufriedener?</h2>
          <p className="text-ink-muted">8 echte Wählerprofile. Ehrlich — auch was die Reformen NICHT lösen.</p>
        </div>
        <Card className="mb-8 text-center">
          <div className="flex items-center justify-center gap-8 mb-2">
            <div><p className="text-4xl font-display text-red">{satisfactionSummary.currentAverage}%</p><p className="text-sm text-ink-muted">Jetzt</p></div>
            <ArrowRight className="w-5 h-5 text-border" />
            <div><p className="text-4xl font-display text-green">{satisfactionSummary.afterAverage}%</p><p className="text-sm text-ink-muted">Nach Reformen</p></div>
          </div>
          <p className="text-sm text-ink-muted">+{satisfactionSummary.afterAverage - satisfactionSummary.currentAverage} Punkte im Durchschnitt</p>
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
                  <div className="flex items-center gap-3"><span className="text-2xl">{v.emoji}</span><div><span className="font-display">{v.name}, {v.age}</span><span className="text-ink-muted text-sm ml-2">{v.location} &middot; {v.votedLast}</span></div></div>
                  <div className="flex items-center gap-2"><span className="text-sm font-display text-green">+{v.afterSatisfaction - v.currentSatisfaction}</span>{open ? <ChevronUp className="w-5 h-5 text-gold" /> : <ChevronDown className="w-5 h-5 text-ink-muted/20" />}</div>
                </button>
                {open && (
                  <div className="px-4 sm:px-5 pb-5 space-y-4">
                    <p className="text-sm text-ink-muted">{v.profile} &middot; {v.income}</p>
                    <div><Tag color="red">Sorgen</Tag><div className="mt-2 space-y-1">{v.topWorries.map((w, i) => <p key={i} className="text-sm text-ink-muted">&bull; {w}</p>)}</div></div>
                    <div><Tag color="green">Was die Reformen liefern</Tag><div className="mt-2 space-y-1.5">{v.whatTheyGet.map((g, i) => (
                      <div key={i} className="flex items-start gap-2">{g.delivered ? <CheckCircle className="w-4 h-4 text-green mt-0.5 shrink-0" /> : <X className="w-4 h-4 text-red/40 mt-0.5 shrink-0" />}<span className="text-sm text-ink-soft">{g.item} <span className="text-ink-muted">&mdash; {g.note}</span></span></div>
                    ))}</div></div>
                    <div className="bg-bg-alt rounded-xl p-5"><p className="text-ink-soft italic">&bdquo;{v.quote}&ldquo;</p><p className="text-sm text-ink-muted mt-1">&mdash; {v.name}, {v.age}</p></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ━━━━ 8. PARTEIEN ━━━━ */}
      <WideSection id="parteien" bg="bg-bg-alt">
        <div className="text-center mb-10">
          <Tag color="blue">Parteien-Check</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Können die Parteien zustimmen?</h2>
          <p className="text-ink-muted">Wo gibt es Konsens? Wo braucht es Kompromisse?</p>
        </div>
        <Card className="mb-8 !p-4 sm:!p-6">
          {partyReactions.map(p => (
            <div key={p.party} className="flex items-center gap-3 py-2">
              <span className="w-20 text-sm font-bold">{p.party}</span>
              <div className="flex-1"><Bar pct={p.approval} color={p.approval >= 70 ? 'bg-green' : p.approval >= 50 ? 'bg-gold' : 'bg-red'} /></div>
              <span className="text-sm font-display w-10 text-right">{p.approval}%</span>
            </div>
          ))}
          <p className="text-sm text-ink-muted mt-3 text-center">4 von 6 Parteien über 50% &mdash; Mehrheit ist realistisch</p>
        </Card>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partyPathTo80.map(p => (
            <Card key={p.party}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display text-lg">{p.party}</h4>
                <span className="text-sm font-display"><span className="text-ink-muted">{p.currentApproval}</span> &rarr; <span className={p.potentialApproval >= 80 ? 'text-green' : 'text-gold'}>{p.potentialApproval}%</span></span>
              </div>
              <Bar pct={p.potentialApproval} color={p.potentialApproval >= 80 ? 'bg-green' : 'bg-gold'} />
              <p className="text-sm text-ink-muted italic mt-3 mb-3">{p.whatTheyReallyWant}</p>
              <div className="bg-gold-light rounded-xl p-4"><p className="text-xs font-bold text-gold mb-1">DER KOMPROMISS</p><p className="text-sm text-ink-soft">{p.keyCompromise}</p></div>
            </Card>
          ))}
        </div>
      </WideSection>

      {/* ━━━━ 9. FAHRPLAN ━━━━ */}
      <Section id="fahrplan" bg="bg-bg">
        <div className="text-center mb-10">
          <Tag color="blue">Der Fahrplan</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">Was passiert wann?</h2>
          <p className="text-ink-muted">3 Phasen. Kein Wunschdenken — konkret was sich für dich ändert.</p>
        </div>
        <div className="space-y-6">
          {timeline.map((step, i) => {
            const colors = ['border-gold/30 bg-gold-light/30', 'border-green/30 bg-green-light/30', 'border-blue/30 bg-blue-light/30']
            const dots = ['bg-gold', 'bg-green', 'bg-blue']
            const tags: Array<'gold' | 'green' | 'blue'> = ['gold', 'green', 'blue']
            const labels = ['Sofort spürbar', 'Systeme ändern sich', 'Ein anderes Deutschland']
            return (
              <div key={i} className={`rounded-2xl border p-6 sm:p-8 ${colors[i] || ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${dots[i]}`} />
                  <span className="font-display text-3xl">{step.year}</span>
                  <Tag color={tags[i]}>{labels[i]}</Tag>
                </div>
                <h3 className="font-display text-xl mb-2">{step.title}</h3>
                <p className="text-ink-muted mb-4">{step.description}</p>
                <div className="space-y-2">
                  {step.laws?.map((law, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green mt-0.5 shrink-0" />
                      <span className="text-[15px]">{law}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-8">
          <a href="#handeln" className="inline-block px-6 py-3 bg-gold text-white rounded-xl font-bold cursor-pointer hover:bg-gold/90 transition-colors">
            Ich will, dass das passiert &rarr;
          </a>
        </div>
      </Section>

      {/* ━━━━ 10. INNOVATIONEN ━━━━ */}
      <Section id="innovationen" bg="bg-bg">
        <div className="text-center mb-10">
          <Tag color="purple">Weiterdenken</Tag>
          <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-2">7 Ideen die es noch nirgendwo gibt</h2>
          <p className="text-ink-muted">Technisch machbar. Politisch möglich. Demokratie-Innovation.</p>
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

      {/* ━━━━ 11. FINALE + CTA ━━━━ */}
      <section id="handeln" className="py-20 sm:py-28 px-6 bg-bg-alt text-center">
        <Heart className="w-8 h-8 text-gold mx-auto mb-8" />
        <h2 className="font-display text-3xl sm:text-4xl max-w-lg mx-auto mb-6 leading-tight">
          Jede Reform existiert bereits. <span className="text-gold">Irgendwo auf der Welt.</span>
        </h2>
        <p className="text-ink-muted text-lg mb-4 max-w-md mx-auto">Die Lösungen sind da. Die Zahlen stimmen. Die Menschen wollen es.</p>
        <p className="text-ink font-bold text-lg mb-8">Was fehlt, bist du.</p>

        <div className="flex flex-wrap justify-center gap-3 text-3xl mb-10">
          {["🇯🇵","🇫🇮","🇹🇼","🇪🇪","🇨🇭","🇩🇰","🇵🇹","🇸🇬","🇬🇧","🇮🇸","🇸🇪","🇳🇴","🇦🇹"].map((f, i) => (
            <span key={i} className="hover:scale-150 transition-transform duration-500 cursor-default">{f}</span>
          ))}
        </div>

        {/* CTA — zero friction */}
        <div className="max-w-md mx-auto space-y-4 mb-12">
          <h3 className="font-display text-2xl">3 Dinge die du jetzt tun kannst</h3>

          <Card className="text-left !p-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">1.</span>
              <div>
                <p className="font-bold">Teile diese Seite</p>
                <p className="text-sm text-ink-muted mt-1">Schick den Link an eine Person, der Politik wichtig ist. WhatsApp, Instagram, LinkedIn &mdash; egal wo.</p>
                <button onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'FairEint', text: 'Einigkeit beginnt mit Fairness. 10 evidenzbasierte Reformen für Deutschland — mit Simulator, Zahlen und Quellen.', url: window.location.href })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link kopiert!')
                  }
                }} className="mt-3 px-5 py-2.5 bg-gold text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-gold/90 transition-colors">
                  Jetzt teilen
                </button>
              </div>
            </div>
          </Card>

          <Card className="text-left !p-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">2.</span>
              <div>
                <p className="font-bold">Schreib deinem Abgeordneten</p>
                <p className="text-sm text-ink-muted mt-1">Finde deinen Bundestagsabgeordneten und frag: &bdquo;Warum hat Deutschland keine Vermögensteuer, obwohl die Schweiz es seit Jahrzehnten vormacht?&ldquo;</p>
                <a href="https://www.bundestag.de/abgeordnete" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-5 py-2.5 bg-bg border border-border rounded-xl text-sm font-bold hover:bg-bg-alt transition-colors">
                  Abgeordnete finden &rarr;
                </a>
              </div>
            </div>
          </Card>

          <Card className="text-left !p-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">3.</span>
              <div>
                <p className="font-bold">Werde Teil der Bewegung</p>
                <p className="text-sm text-ink-muted mt-1">Dieses Projekt ist Open Source. Jeder kann Daten prüfen, Reformen vorschlagen, oder den Code verbessern.</p>
                <a href="https://github.com/mikelninh/faireint" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-5 py-2.5 bg-bg border border-border rounded-xl text-sm font-bold hover:bg-bg-alt transition-colors">
                  GitHub &rarr;
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card className="max-w-xs mx-auto text-left mb-8">
          <div className="flex justify-between mb-1"><span className="text-ink-muted text-sm">Investition</span><span className="font-display text-red">€{Math.round(totalCost)} Mrd.</span></div>
          <div className="flex justify-between mb-1"><span className="text-ink-muted text-sm">Ersparnis</span><span className="font-display text-green">€{Math.round(totalSaving)} Mrd.</span></div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between"><span className="font-bold">Nettogewinn</span><span className="font-display text-gold text-xl">+€{Math.round(netGain)} Mrd.</span></div>
          <p className="text-xs text-ink-muted mt-2 text-center">= +€{Math.round(netGain / 83 * 1000 / 12)} pro Bürger pro Monat</p>
        </Card>
        <p className="text-sm text-ink-muted max-w-md mx-auto">Alle Zahlen sind Vorschläge auf Basis internationaler Evidenz &mdash; keine beschlossenen Gesetze. Quellen und Berechnungen sind offen einsehbar.</p>
      </section>

      {/* ━━━━ FOOTER ━━━━ */}
      <footer className="py-8 px-6 border-t border-border text-center bg-bg">
        <p className="text-ink-muted text-sm">FairEint &mdash; Einigkeit beginnt mit Fairness</p>
        <p className="text-ink-muted/50 text-xs mt-1">Quellen: OECD &middot; WHO &middot; IMF &middot; Bundesbank &middot; Eurostat &middot; World Inequality Database &middot; Open Source</p>
      </footer>
    </div>
  )
}
