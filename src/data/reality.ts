export const zewSource = {
  label: 'ZEW Mannheim – Reformvorschläge der Parteien zur Bundestagswahl 2025',
  url: 'https://www.zew.de/publikationen/reformvorschlaege-der-parteien-zur-bundestagswahl-2025-finanzielle-auswirkungen',
  pdf: 'https://www.zew.de/fileadmin/FTP/gutachten/Bundestagswahlprogramme_ZEW_2025.pdf',
  model: 'ZEW-EviSTA',
  data: 'Sozio-oekonomisches Panel (SOEP)',
  scope: 'Direkte Wirkungen auf verfügbare Haushaltseinkommen; keine Zweitrundeneffekte und nicht alle kaufkraftwirksamen Maßnahmen.',
} as const

export const partyHousehold40k = [
  { party: 'Die Linke', euro: 6150 },
  { party: 'BSW', euro: 1010 },
  { party: 'Bündnis 90/Die Grünen', euro: 870 },
  { party: 'SPD', euro: 860 },
  { party: 'CDU/CSU', euro: 300 },
  { party: 'AfD', euro: -440 },
  { party: 'FDP', euro: -1520 },
] as const

export const partyHousehold180k = [
  { party: 'AfD', euro: 19190 },
  { party: 'FDP', euro: 11990 },
  { party: 'CDU/CSU', euro: 5840 },
  { party: 'SPD', euro: 2200 },
  { party: 'Bündnis 90/Die Grünen', euro: 100 },
  { party: 'BSW', euro: 0 },
  { party: 'Die Linke', euro: -800 },
] as const

export const afdRealityCheck = {
  claim: 'Die AfD beschreibt ihr Steuerkonzept als breite Entlastung und verweist u. a. auf höhere Freibeträge, Familiensplitting sowie geringere Steuern und Abgaben.',
  independentFinding: 'In der veröffentlichten ZEW-EviSTA/SOEP-Simulation steigen die Entlastungen beim AfD-Paket stark mit dem Einkommen. Beim ZEW-Beispiel eines Alleinverdiener-Ehepaars mit zwei Kindern ergeben sich bei 40.000 € brutto rund 440 € weniger verfügbares Einkommen, bei 180.000 € brutto rund 19.190 € mehr.',
  counterpoint: 'Die AfD kritisiert solche Studien und argumentiert, dass weitere Programmteile und Kaufkraftwirkungen nicht vollständig erfasst würden. Das ZEW selbst weist darauf hin, dass nicht das gesamte Wahlprogramm simuliert wird und keine Zweitrundeneffekte enthalten sind.',
} as const

export const fiscalEvidence = [
  { party: 'AfD', stateRevenueChangeBn: -97, note: 'ZEW-Schätzung der untersuchten direkt modellierbaren Maßnahmen.' },
  { party: 'CDU/CSU', stateRevenueChangeBn: -47, note: 'ZEW-Schätzung der untersuchten direkt modellierbaren Maßnahmen.' },
  { party: 'FDP', stateRevenueChangeBn: -116, note: 'ZEW-Schätzung der untersuchten direkt modellierbaren Maßnahmen.' },
] as const

export const behaviourEvidence = {
  label: 'ifo Institut 2025',
  url: 'https://www.ifo.de/publikationen/2025/aufsatz-zeitschrift/reformvorschlaege-oder-steuergeschenke-wahlprogramme-2025',
  finding: 'Das ifo Institut modelliert zusätzlich Arbeitsangebotsreaktionen und kommt bei den untersuchten Reformpaketen in der Regel auf eine Eigenfinanzierungsquote von unter 10 %.',
  caveat: 'Das ist kein universeller Faktor für jedes einzelne Gesetz. FairEint verwendet ihn deshalb nicht als pauschalen Multiplikator.',
} as const

export const bundestagData = {
  rollCallsUrl: 'https://www.bundestag.de/parlament/plenum/abstimmung/abstimmungen',
  openDataUrl: 'https://www.bundestag.de/services/opendata',
  dipApiUrl: 'https://search.dip.bundestag.de/api/v1/swagger-ui/',
  coverage: 'Offizielle Quelle vollständig verfügbar; FairEint 5.1 verlinkt und klassifiziert sie, hat aber noch keinen vollständigen lokalen Mirror aller XLSX-Abstimmungslisten.',
} as const

export const workshop60 = [
  { minutes: 5, phase: 'Verstehen', prompt: 'Welche politische Entscheidung beeinflusst euren Alltag konkret?' },
  { minutes: 10, phase: 'Beobachten', prompt: 'Interviewt euch zu Bedürfnissen – ohne Parteien oder Lösungen zu nennen.' },
  { minutes: 8, phase: 'Sichtweise', prompt: 'Formuliert: „Wie könnten wir …?“ und einigt euch auf ein Bürgerbedürfnis.' },
  { minutes: 12, phase: 'Ideen', prompt: 'Baut individuell ein FairEint-Paket. Erst danach vergleichen.' },
  { minutes: 10, phase: 'Prototyp', prompt: 'Nutzt das Konsens-Lab: Was ist euer kleinstes gemeinsames Paket?' },
  { minutes: 10, phase: 'Testen', prompt: 'Reality Check: Hält euer Paket gegen Ground Truth, Mikrosimulation und Gegenargumente?' },
  { minutes: 5, phase: 'Reflexion', prompt: 'Was hat eure Meinung verändert – Daten, Empathie, Trade-offs oder Gruppendiskussion?' },
] as const

export const workshop120 = [
  { minutes: 10, phase: 'Warm-up', prompt: 'Jede Person schreibt drei Dinge auf: Was sollte Politik für Menschen leisten?' },
  { minutes: 20, phase: 'Empathie', prompt: 'Interviews in Paaren: Kosten, Sicherheit, Chancen, Gesundheit, Zukunft. Keine Parteibegriffe.' },
  { minutes: 15, phase: 'Problem framing', prompt: 'Cluster Bedürfnisse und formt 2–3 „How might we?“-Fragen.' },
  { minutes: 20, phase: 'Policy prototyping', prompt: 'Jede Person baut ihr FairEint-Paket und begründet nur drei Entscheidungen.' },
  { minutes: 15, phase: 'Evidence shock', prompt: 'Öffnet Reality Lab: Welche Annahme widerspricht der veröffentlichten Mikrosimulation oder Umfrage?' },
  { minutes: 15, phase: 'Consensus', prompt: 'Konsens-Lab: Was teilt ihr? Wo liegen echte Konflikte?' },
  { minutes: 15, phase: 'Iteration', prompt: 'Ändert nur zwei Parameter, um mehr Gruppen-Nutzen bei weniger Nebenwirkungen zu erreichen.' },
  { minutes: 10, phase: 'Debrief', prompt: 'Welche Information bräuchtet ihr, bevor daraus ein reales Gesetz wird?' },
] as const
