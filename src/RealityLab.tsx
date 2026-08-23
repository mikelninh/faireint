import { useMemo, useState } from 'react'
import { ArrowRight, ExternalLink, Info, Landmark, Scale, ShieldCheck, Vote } from 'lucide-react'
import PublicLabNav from './PublicLabNav'
import { groundTruth } from './data/v2'
import { afdCaseStudy, behaviourEvidence, bundestagData, fiscalEvidence, partyHousehold180k, partyHousehold40k, zewSource } from './data/reality'

const money = (value: number) => `${value >= 0 ? '+' : '−'}${Math.abs(value).toLocaleString('de-DE')} €`

function EvidenceLabel({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'model' | 'party' | 'caveat' }) {
  const styles = {
    neutral: 'border-border bg-bg-alt text-ink-muted',
    model: 'border-blue/20 bg-blue-light text-blue',
    party: 'border-gold/20 bg-gold-light text-gold',
    caveat: 'border-border bg-white text-ink-soft',
  }
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${styles[tone]}`}>{children}</span>
}

export default function RealityLab() {
  const [income, setIncome] = useState<40 | 180>(40)
  const rows = income === 40 ? partyHousehold40k : partyHousehold180k
  const max = useMemo(() => Math.max(...rows.map((row) => Math.abs(row.euro))), [rows])

  return <main className="min-h-screen bg-bg text-ink">
    <PublicLabNav active="reality" />

    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-4xl">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-gold">Haushaltscheck · veröffentlichte Mikrosimulation</div>
        <h1 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">Was bedeuten Steuer- und Transferpläne für verschiedene Haushalte?</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">FairEint stellt hier Ergebnisse einer externen ZEW-Mikrosimulation dar. Parteipositionen, Modellresultate, Gegenpositionen und methodische Grenzen werden bewusst getrennt gezeigt. Die Seite ist keine Wahlempfehlung.</p>
        <div className="mt-6 flex flex-wrap gap-2"><EvidenceLabel tone="model">Quelle: ZEW Mannheim</EvidenceLabel><EvidenceLabel>Modell: EviSTA / SOEP</EvidenceLabel><EvidenceLabel>Bundestagswahl 2025</EvidenceLabel></div>
      </div>

      <section className="mt-10 rounded-[2rem] border border-border bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div><div className="text-xs font-black uppercase tracking-widest text-gold">ZEW-Beispielhaushalt</div><h2 className="mt-2 text-2xl font-black">Alleinverdiener-Ehepaar · zwei Kinder</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">Modellierte Veränderung des verfügbaren Jahreseinkommens gegenüber dem Status quo. Gezeigt werden nur die vom ZEW untersuchten direkt modellierbaren Maßnahmen.</p></div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-bg-alt p-1.5">
            <button onClick={() => setIncome(40)} className={`rounded-xl px-3 py-3 text-sm font-bold transition ${income === 40 ? 'bg-ink text-white shadow-sm' : 'text-ink-muted hover:bg-white'}`}>40.000 € brutto</button>
            <button onClick={() => setIncome(180)} className={`rounded-xl px-3 py-3 text-sm font-bold transition ${income === 180 ? 'bg-ink text-white shadow-sm' : 'text-ink-muted hover:bg-white'}`}>180.000 € brutto</button>
          </div>
        </div>

        <div className="mt-8 space-y-3" aria-label="Modellierte Veränderung des verfügbaren Jahreseinkommens nach Partei">
          {rows.map((row) => <div key={row.party} className="grid grid-cols-[76px_1fr_78px] items-center gap-2 sm:grid-cols-[150px_1fr_100px] sm:gap-4">
            <div className="truncate text-xs font-bold sm:text-sm">{row.party}</div>
            <div className="relative h-8 overflow-hidden rounded-lg bg-bg-alt">
              <div className={`absolute top-0 h-full rounded-lg ${row.euro >= 0 ? 'left-1/2 bg-green/65' : 'right-1/2 bg-red/55'}`} style={{ width: `${Math.max(1, Math.abs(row.euro) / max * 50)}%` }} />
              <div className="absolute left-1/2 top-0 h-full w-px bg-ink/20" />
            </div>
            <div className={`text-right text-xs font-black tabular-nums sm:text-sm ${row.euro >= 0 ? 'text-green' : 'text-red'}`}>{money(row.euro)}</div>
          </div>)}
        </div>

        {income === 40 && <div className="mt-6 flex gap-3 rounded-2xl border border-blue/15 bg-blue-light p-4 text-sm leading-relaxed text-blue"><Info className="mt-0.5 shrink-0" size={18} /><p><strong>Wichtige Einordnung zum AfD-Wert:</strong> Das ZEW führt die −440 € auf die Wechselwirkung von Steuerentlastung und Wohngeld-Anrechnung zurück und schreibt, dass diese Schlechterstellung bei einer tatsächlichen Umsetzung vermutlich vermieden würde.</p></div>}

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5 text-xs text-ink-muted"><EvidenceLabel tone="model">externe Mikrosimulation</EvidenceLabel><span>{zewSource.model} · {zewSource.data}</span><a href={zewSource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold underline underline-offset-4">Studie & Methodik <ExternalLink size={11} /></a></div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2"><EvidenceLabel tone="party">Fallstudie: AfD</EvidenceLabel><EvidenceLabel tone="model">ZEW 2025</EvidenceLabel></div>
          <h2 className="mt-4 text-3xl font-black">Was zeigt die Modellrechnung – und was nicht?</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">Der relevante Befund ist nicht eine Aussage über Motive oder Wähler:innen. Er ist eine überprüfbare Frage: Wie verteilen sich die modellierten finanziellen Effekte über unterschiedliche Einkommen?</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Layer label="1 · Parteiposition" tone="party" text={afdCaseStudy.partyPosition} />
            <Layer label="2 · ZEW-Modellresultat" tone="model" text={afdCaseStudy.modelFinding} />
            <Layer label="3 · Einschränkung des ZEW" tone="caveat" text={afdCaseStudy.modelCaveat} />
            <Layer label="4 · Reaktion der AfD" tone="caveat" text={afdCaseStudy.partyResponse} href={afdCaseStudy.partyResponseUrl} />
          </div>
        </article>

        <article className="rounded-[2rem] bg-ink p-6 text-white sm:p-8">
          <ShieldCheck className="text-gold-light" />
          <div className="mt-5 text-xs font-black uppercase tracking-widest text-gold-light">FairEint-Standard</div>
          <h2 className="mt-3 text-2xl font-black">Prüfen statt zuschreiben.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">FairEint behauptet nicht, eine Partei „betrüge“ ihre Wähler:innen. Stattdessen gilt für alle Parteien derselbe Ablauf:</p>
          <ol className="mt-5 space-y-3 text-sm text-white/75"><li><strong className="text-white">1.</strong> Was wird versprochen?</li><li><strong className="text-white">2.</strong> Was findet eine unabhängige Modellrechnung?</li><li><strong className="text-white">3.</strong> Welche Annahmen und Grenzen hat das Modell?</li><li><strong className="text-white">4.</strong> Wie reagiert die betroffene Partei?</li><li><strong className="text-white">5.</strong> Was zeigen später reale Gesetze und Abstimmungen?</li></ol>
          <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/50">Das Ziel ist informierte Urteilsbildung — nicht die Vorgabe eines politischen Urteils.</p>
        </article>
      </section>

      <section className="mt-12"><div className="flex items-center gap-2"><Scale /><h2 className="text-2xl font-black">Staatsfinanzen und mögliche Verhaltensreaktionen</h2></div><p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-muted">Ein höheres verfügbares Einkommen privater Haushalte und höhere staatliche Einnahmen sind unterschiedliche politische Ziele. Das ZEW weist ausdrücklich darauf hin, dass es dafür keine automatisch „richtige“ Haushaltsgröße gibt.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-5"><h3 className="font-black">Geschätzte Veränderung der Staatseinnahmen</h3><p className="mt-1 text-xs text-ink-muted">Nur die in der ZEW-Studie untersuchten, direkt modellierbaren Maßnahmen.</p><div className="mt-4 space-y-2">{fiscalEvidence.map((item) => <div key={item.party} className="flex items-center justify-between gap-4 rounded-xl bg-bg-alt p-3"><span className="font-bold">{item.party}</span><span className="font-black tabular-nums">{item.stateRevenueChangeBn} Mrd. €/Jahr</span></div>)}</div><a href={zewSource.fiscalUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">ZEW-Fiskalanalyse <ExternalLink size={11} /></a></div>
          <div className="rounded-3xl border border-border bg-white p-5"><h3 className="font-black">Arbeitsangebots- und Gegenfinanzierungseffekte</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{behaviourEvidence.finding}</p><p className="mt-3 text-xs leading-relaxed text-ink-muted">{behaviourEvidence.caveat}</p><a href={behaviourEvidence.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">ifo-Analyse öffnen <ExternalLink size={11} /></a></div>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-border bg-white p-6 sm:p-9"><div className="flex items-start gap-3"><Vote className="mt-1 shrink-0 text-gold" /><div><div className="text-xs font-black uppercase tracking-widest text-gold">Parlamentarische Evidenz</div><h2 className="mt-2 text-2xl font-black">Was Parteien im Bundestag tatsächlich tun.</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">Programme und Modellrechnungen zeigen Absichten und mögliche Wirkungen. Namentliche Abstimmungen, Drucksachen und Parlamentsvorgänge zeigen eine andere Evidenzebene: dokumentiertes parlamentarisches Handeln.</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><SourceLink href={bundestagData.rollCallsUrl} title="Namentliche Abstimmungen" detail="offizielle Abstimmungslisten" /><SourceLink href={bundestagData.openDataUrl} title="Bundestag Open Data" detail="maschinenlesbare Dokumente" /><SourceLink href={bundestagData.dipApiUrl} title="DIP API" detail="Vorgänge und Drucksachen" /></div><div className="mt-5 rounded-2xl bg-gold-light p-4 text-xs leading-relaxed text-gold"><strong>Datenabdeckung:</strong> {bundestagData.coverage}</div></section>

      <section className="mt-12"><div className="flex items-center gap-2"><Landmark /><h2 className="text-2xl font-black">Repräsentative Einstellungen als eigene Evidenzebene</h2></div><p className="mt-2 max-w-3xl text-sm text-ink-muted">Umfragen beantworten nicht, welche Politik „richtig“ ist. Sie zeigen, welche Präferenzen in der Bevölkerung gemessen wurden.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{groundTruth.map((item) => <a key={item.id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"><div className="text-3xl font-black">{item.value}{item.suffix}</div><div className="mt-2 text-sm font-bold">{item.label}</div><div className="mt-2 text-[11px] text-ink-muted">{item.fieldwork}</div></a>)}</div></section>

      <section className="mt-12 rounded-[2rem] bg-ink p-7 text-white sm:p-10"><div className="text-xs font-black uppercase tracking-widest text-gold-light">Weiterdenken</div><h2 className="mt-3 max-w-3xl text-3xl font-black">Welche Reform passt zu welchen Zielen und Nebenbedingungen?</h2><p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/65">Der Trade-off Explorer vergleicht einige Reformdesigns entlang transparenter Zielkriterien. Die Ratings sind FairEint-Heuristiken, keine wissenschaftlich gemessenen Nutzenwerte.</p><a href="?optimizer=1" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-ink">Trade-offs erkunden <ArrowRight size={16} /></a></section>
    </section>
  </main>
}

function Layer({ label, text, tone, href }: { label: string; text: string; tone: 'party' | 'model' | 'caveat'; href?: string }) {
  const styles = tone === 'model' ? 'border-blue/15 bg-blue-light' : tone === 'party' ? 'border-gold/15 bg-gold-light' : 'border-border bg-bg-alt'
  return <div className={`rounded-2xl border p-4 ${styles}`}><div className="text-[10px] font-black uppercase tracking-widest text-ink-muted">{label}</div><p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>{href && <a href={href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold underline underline-offset-4">Originalposition <ExternalLink size={11} /></a>}</div>
}
function SourceLink({ href, title, detail }: { href: string; title: string; detail: string }) { return <a href={href} target="_blank" rel="noreferrer" className="rounded-2xl border border-border p-4 transition hover:border-ink/25 hover:bg-bg-alt"><div className="flex items-center justify-between gap-2"><strong>{title}</strong><ExternalLink size={13} /></div><div className="mt-1 text-xs text-ink-muted">{detail}</div></a> }
