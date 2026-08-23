import type { BudgetCategoryId } from './v2'

export type EvidenceKind = 'ground-truth' | 'model' | 'program' | 'parliament' | 'simulation'
export type Confidence = 'high' | 'medium' | 'exploratory'

export interface EvidenceItem {
  id: string
  kind: EvidenceKind
  title: string
  publisher: string
  date: string
  url: string
  confidence: Confidence
  note: string
  sample?: string
  commissionedBy?: string
}

export const evidenceLedger: EvidenceItem[] = [
  {
    id: 'poll-wealth-2026', kind: 'ground-truth', confidence: 'high',
    title: 'Vermögensteuer & hohe Erbschaften', publisher: 'Infratest dimap für WDR / ARD', date: 'April 2026',
    url: 'https://www.presseportal.de/pm/7899/6262746',
    sample: '2.084 Personen, deutschsprachige Bevölkerung ab 16',
    note: '64 % befürworten die Wiedereinführung der Vermögensteuer; 61 % höhere Steuern auf hohe Erbschaften.',
  },
  {
    id: 'poll-tax-2026', kind: 'ground-truth', confidence: 'high',
    title: 'Steuerreform: hohe Einkommen & Erbschaften', publisher: 'ARD-DeutschlandTrend / infratest dimap', date: 'Mai 2026',
    url: 'https://www.presseportal.de/pm/6694/6270973',
    sample: '1.303 Wahlberechtigte, zufallsbasierte Telefon-/Online-Befragung',
    note: '67 % halten höhere Steuern auf hohe Einkommen für den richtigen Weg; 54 % höhere Steuern auf hohe Erbschaften.',
  },
  {
    id: 'poll-invest-2026', kind: 'ground-truth', confidence: 'high',
    title: 'Öffentliche Investitionsprioritäten', publisher: 'IMK / Hans-Böckler-Stiftung', date: 'April 2026',
    url: 'https://www.imk-boeckler.de/de/pressemitteilungen-15992-oeffentliche-investitionen-mehrheit-der-bevoelkerung-fur-massive-erhoehung-76178.htm',
    sample: 'rund 2.700 Personen zwischen 18 und 75',
    note: 'Gesundheit/Pflege 91 %, Bildung 87 %, Straßen/Brücken 82 %, Sicherheit 80 %, Bahn/ÖPNV 78 % für mehr Ausgaben.',
  },
  {
    id: 'diw-wealth-2026', kind: 'model', confidence: 'medium',
    title: 'Vermögensteuer – Aufkommens- und Verteilungswirkungen', publisher: 'DIW Berlin', date: '2026',
    url: 'https://www.diw.de/de/diw_01.c.998456.de/publikationen/politikberatung_kompakt/2026_0211/vermoegensteuer_die_linke_____aufkommens-_und_verteilungswir___n_die_linke_in_den_landtagen_und_der_rosa-luxemburg-stiftung.html',
    commissionedBy: 'Fraktion Die Linke im Bundestag u. a.',
    note: 'Mikrosimulation verschiedener Vermögensteuer-Szenarien. FairEint nutzt daraus bewusst nur einen gerundeten Explorationskorridor, bis die Szenariotabellen vollständig maschinenlesbar integriert sind.',
  },
  {
    id: 'bt-wealth-left-2026', kind: 'parliament', confidence: 'high',
    title: 'Antrag: Vermögensteuer wieder erheben', publisher: 'Deutscher Bundestag', date: '06.03.2026',
    url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw10-de-vermoegensteuer-1150522',
    note: 'Die Linke beantragte eine Wiedererhebung; der Antrag wurde zur Beratung in den Finanzausschuss überwiesen.',
  },
  {
    id: 'bt-inheritance-green-2026', kind: 'parliament', confidence: 'high',
    title: 'Antrag: 300-Wohneinheiten-Regelung abschaffen', publisher: 'Deutscher Bundestag', date: '06.03.2026',
    url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw10-de-vermoegensteuer-1150522',
    note: 'Die Grünen beantragten, eine konkrete Erbschaftsteuer-Ausnahme für große Wohnungsbestände zu schließen.',
  },
  {
    id: 'bt-wealth-afd-2026', kind: 'parliament', confidence: 'high',
    title: 'Antrag: Vermögensteuer abschaffen', publisher: 'Deutscher Bundestag', date: '23.04.2026',
    url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw17-de-vermoegensteuer-1145270',
    note: 'Die AfD beantragte die Abschaffung des Vermögensteuergesetzes; die Vorlage wurde zur weiteren Beratung überwiesen.',
  },
  {
    id: 'bt-income-left-2026', kind: 'parliament', confidence: 'high',
    title: 'Antrag: kleine und mittlere Einkommen entlasten', publisher: 'Deutscher Bundestag', date: '25.06.2026',
    url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw26-de-einkommen-1184318',
    note: 'Die Linke schlug höhere Spitzen-, Reichen- und Millionärssteuersätze zur Gegenfinanzierung von Entlastungen vor.',
  },
]

export interface HouseholdArchetype {
  id: string
  emoji: string
  title: string
  subtitle: string
  taxExposure: { wealth: number; inheritance: number; highIncome: number }
  benefitWeights: Partial<Record<BudgetCategoryId, number>>
  caveat: string
}

// These are transparent stress-test archetypes, not representative households and not microdata.
export const householdArchetypes: HouseholdArchetype[] = [
  {
    id: 'single-parent', emoji: '👩‍👧‍👦', title: 'Alleinerziehend + 2 Kinder', subtitle: 'Mieter:in, normales Erwerbseinkommen',
    taxExposure: { wealth: 0, inheritance: 0, highIncome: 0 },
    benefitWeights: { housing: 2, education: 2, health: 1.5, transit: 1, infrastructure: 0.5 },
    caveat: 'Zeigt nur die Richtung öffentlicher Leistungsprioritäten; keine individuelle Anspruchs- oder Einkommensberechnung.',
  },
  {
    id: 'care-worker', emoji: '🩺', title: 'Pflegekraft', subtitle: 'Mieter:in, mittleres Einkommen',
    taxExposure: { wealth: 0, inheritance: 0, highIncome: 0 },
    benefitWeights: { health: 2.5, housing: 1.5, transit: 1, education: 0.5, digital: 0.5 },
    caveat: 'Mehr Gesundheitsbudget bedeutet nicht automatisch höhere Löhne; dafür wären konkrete Gesetze nötig.',
  },
  {
    id: 'family-middle', emoji: '👨‍👩‍👧', title: 'Familie in der Mitte', subtitle: 'Zwei Erwerbstätige, ein Kind',
    taxExposure: { wealth: 0, inheritance: 0.25, highIncome: 0.25 },
    benefitWeights: { education: 2, housing: 1, health: 1, infrastructure: 1, transit: 0.75, digital: 0.5 },
    caveat: 'Ob eine Steuerreform belastet oder entlastet, hängt von konkreten Freibeträgen und Einkommen ab.',
  },
  {
    id: 'high-earner', emoji: '💼', title: 'Sehr hohes Erwerbseinkommen', subtitle: 'Kaum Vermögen, hohes zu versteuerndes Einkommen',
    taxExposure: { wealth: 0, inheritance: 0.25, highIncome: 1.5 },
    benefitWeights: { infrastructure: 1, digital: 1, security: 1, education: 0.5, health: 0.5 },
    caveat: 'Die Belastungsrichtung ist plausibel; ohne konkreten Tarif wird kein Eurobetrag ausgewiesen.',
  },
  {
    id: 'wealthy-household', emoji: '🏛️', title: 'Sehr vermögender Haushalt', subtitle: 'Nettovermögen deutlich oberhalb hoher Freibeträge',
    taxExposure: { wealth: 2.5, inheritance: 1.5, highIncome: 0.5 },
    benefitWeights: { infrastructure: 1, security: 1, digital: 0.75, education: 0.5, health: 0.5 },
    caveat: 'Bewertung, Liquidität und Vermögensstruktur sind entscheidend. Das ist ein Belastungs-Stresstest, kein Steuerbescheid.',
  },
  {
    id: 'family-business', emoji: '🏭', title: 'Familienunternehmen', subtitle: 'Hoher Unternehmenswert, begrenzte Liquidität',
    taxExposure: { wealth: 1.5, inheritance: 1.5, highIncome: 0.5 },
    benefitWeights: { infrastructure: 1.5, digital: 1.25, education: 1, security: 0.5, transit: 0.5 },
    caveat: 'Betriebsvermögen ist der sensibelste Designpunkt. Stundung, Freibeträge und Bewertung können die Belastung stark verändern.',
  },
]

export const versionMilestones = [
  { version: '2.1', title: 'Evidence Ledger', status: 'built', detail: 'Quellenklassen, Confidence, Auftraggeber und parlamentarische Evidenz sichtbar.' },
  { version: '2.5', title: 'Who wins / who pays?', status: 'built', detail: 'Richtungsbasierte Haushalts-Stresstests ohne erfundene Euro-Präzision.' },
  { version: '3.0', title: '1 / 5 / 10 Jahre', status: 'built', detail: 'Mechanische Fiskalhülle + Umsetzungspfad + Unsicherheit, klar getrennt von Prognosen.' },
  { version: '4.0', title: 'Politik-Modus', status: 'built', detail: 'Druckbares Briefing, Programm-Match und Bundestags-Handlungen als getrennte Evidenzebenen.' },
  { version: '5.0', title: 'Konsens-Lab', status: 'built', detail: 'Pakete mehrerer Menschen vergleichen, Konsens und Konflikt sichtbar machen.' },
] as const

export const implementationPath = [
  { horizon: 'Jahr 1', title: 'Gesetz & Verwaltung', points: ['Verfassungs- und Bewertungsdesign', 'IT-/Bewertungsinfrastruktur', 'Stundungs- und Härtefallregeln', 'erste Evaluationsdaten'] },
  { horizon: 'Jahr 5', title: 'Wirkung messen', points: ['reales Steueraufkommen vs. Modell', 'Verhaltensreaktionen', 'Verteilungswirkung', 'Ausgabenwirkung in priorisierten Bereichen'] },
  { horizon: 'Jahr 10', title: 'Nachsteuern', points: ['Freibeträge indexieren', 'Schlupflöcher schließen oder Regeln vereinfachen', 'Wachstum/Investitionen mit Kontrollgruppe evaluieren', 'Bürgerprioritäten neu erheben'] },
] as const
