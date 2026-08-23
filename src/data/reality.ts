export const zewSource = {
  label: 'ZEW Mannheim – Reformvorschläge der Parteien zur Bundestagswahl 2025',
  url: 'https://www.zew.de/publikationen/reformvorschlaege-der-parteien-zur-bundestagswahl-2025-finanzielle-auswirkungen',
  fiscalUrl: 'https://www.zew.de/presse/pressearchiv/wie-sich-die-wahlprogramme-fiskalisch-auswirken',
  model: 'ZEW-EviSTA',
  data: 'Sozio-oekonomisches Panel (SOEP)',
  scope: 'Direkte modellierte Wirkungen ausgewählter Steuer- und Transfermaßnahmen auf verfügbare Haushaltseinkommen. Nicht das gesamte Wahlprogramm; keine allgemeinen Zweitrundeneffekte und nicht alle kaufkraftwirksamen Maßnahmen.',
} as const

export const partyHousehold40k = [
  { party: 'Die Linke', euro: 6150 },
  { party: 'BSW', euro: 1010 },
  { party: 'Grüne', euro: 870 },
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
  { party: 'Grüne', euro: 100 },
  { party: 'BSW', euro: 0 },
  { party: 'Die Linke', euro: -800 },
] as const

export const afdCaseStudy = {
  partyPosition: 'Die AfD beschreibt ihr Steuerkonzept als breite Entlastung. Sie verweist unter anderem auf höhere Freibeträge, Familiensplitting sowie niedrigere Steuern und Abgaben.',
  modelFinding: 'In der veröffentlichten ZEW-EviSTA/SOEP-Simulation nimmt die modellierte Entlastung beim AfD-Paket mit dem Einkommen deutlich zu. Für das ZEW-Beispiel eines Alleinverdiener-Ehepaars mit zwei Kindern ergeben sich bei 40.000 € brutto rund 440 € weniger verfügbares Jahreseinkommen und bei 180.000 € brutto rund 19.190 € mehr.',
  modelCaveat: 'Das ZEW erklärt den negativen Wert beim 40.000-€-Beispiel mit einer komplexen Wechselwirkung von Steuerentlastung und Wohngeld-Anrechnung und schreibt ausdrücklich, dass diese Schlechterstellung bei einer tatsächlichen Umsetzung vermutlich vermieden würde.',
  partyResponse: 'Die AfD kritisiert die ZEW- und ifo-Auswertungen und argumentiert, dass weitere Programmteile, zusätzliche Wohngeld-Regeln und kaufkraftwirksame Maßnahmen nicht vollständig erfasst würden.',
  partyResponseUrl: 'https://www.afd.de/kay-gottschalk-afd-entlastet-alle-steuerzahler-taeuschung-durch-medien-und-institute-aufdecken/',
} as const

export const fiscalEvidence = [
  { party: 'AfD', stateRevenueChangeBn: -97 },
  { party: 'CDU/CSU', stateRevenueChangeBn: -47 },
  { party: 'FDP', stateRevenueChangeBn: -116 },
] as const

export const behaviourEvidence = {
  label: 'ifo Institut 2025',
  url: 'https://www.ifo.de/publikationen/2025/aufsatz-zeitschrift/reformvorschlaege-oder-steuergeschenke-wahlprogramme-2025',
  finding: 'Das ifo Institut modelliert zusätzlich Arbeitsangebotsreaktionen. Bei den untersuchten Reformpaketen liegt die Eigenfinanzierungsquote durch diese Reaktionen in der Regel unter 10 %.',
  caveat: 'Das ist kein universeller Faktor für jedes einzelne Gesetz. FairEint verwendet die Quote deshalb nicht als pauschalen Abschlag oder Multiplikator.',
} as const

export const bundestagData = {
  rollCallsUrl: 'https://www.bundestag.de/parlament/plenum/abstimmung/abstimmungen',
  openDataUrl: 'https://www.bundestag.de/services/opendata',
  dipApiUrl: 'https://search.dip.bundestag.de/api/v1/swagger-ui/',
  coverage: 'Die offiziellen Datenquellen sind verfügbar. FairEint 5.1 verlinkt und klassifiziert sie, hat aber noch keinen vollständigen lokalen Mirror aller namentlichen Abstimmungen und Parlamentsvorgänge.',
} as const

export const workshop60 = [
  { minutes: 5, phase: 'Verstehen', prompt: 'Welche politische Entscheidung beeinflusst euren Alltag konkret?' },
  { minutes: 10, phase: 'Beobachten', prompt: 'Interviewt euch zu Bedürfnissen – zunächst ohne Parteien oder fertige Lösungen zu nennen.' },
  { minutes: 8, phase: 'Sichtweise', prompt: 'Formuliert eine „Wie könnten wir …?“-Frage und einigt euch auf ein konkretes Bürgerbedürfnis.' },
  { minutes: 12, phase: 'Ideen', prompt: 'Baut individuell ein FairEint-Paket. Vergleicht eure Entscheidungen erst danach.' },
  { minutes: 10, phase: 'Prototyp', prompt: 'Nutzt das Konsens-Lab: Welche gemeinsame Lösung ist mit euren unterschiedlichen Prioritäten möglich?' },
  { minutes: 10, phase: 'Testen', prompt: 'Prüft euer Paket gegen Umfragen, veröffentlichte Modellrechnungen und Gegenargumente.' },
  { minutes: 5, phase: 'Reflexion', prompt: 'Was hat eure Einschätzung verändert – Bedürfnisse, Daten, Zielkonflikte oder die Gruppendiskussion?' },
] as const

export const workshop120 = [
  { minutes: 10, phase: 'Warm-up', prompt: 'Jede Person notiert drei Antworten auf die Frage: Was sollte Politik für Menschen leisten?' },
  { minutes: 20, phase: 'Empathie', prompt: 'Interviews in Paaren zu Kosten, Sicherheit, Chancen, Gesundheit und Zukunft – zunächst ohne Parteibegriffe.' },
  { minutes: 15, phase: 'Problem Framing', prompt: 'Clustert Bedürfnisse und formuliert zwei bis drei „Wie könnten wir …?“-Fragen.' },
  { minutes: 20, phase: 'Policy Prototyping', prompt: 'Jede Person baut ein FairEint-Paket und begründet drei zentrale Entscheidungen.' },
  { minutes: 15, phase: 'Evidenz-Check', prompt: 'Öffnet den Haushaltscheck: Welche Annahmen werden durch veröffentlichte Daten gestützt, relativiert oder infrage gestellt?' },
  { minutes: 15, phase: 'Konsens', prompt: 'Nutzt das Konsens-Lab: Wo gibt es eine gemeinsame Basis – und wo bleiben echte Zielkonflikte?' },
  { minutes: 15, phase: 'Iteration', prompt: 'Ändert höchstens zwei Parameter, um eure gemeinsame Lösung robuster gegenüber Nebenwirkungen zu machen.' },
  { minutes: 10, phase: 'Debrief', prompt: 'Welche zusätzliche Evidenz bräuchtet ihr, bevor aus eurem Prototyp ein reales Gesetz werden sollte?' },
] as const
