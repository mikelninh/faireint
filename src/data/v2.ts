export type ChoiceLevel = 'off' | 'moderate' | 'strong'
export type DebtChoice = 'strict' | 'balanced' | 'flexible'

export interface GroundTruthCard {
  id: string
  value: number
  suffix: string
  label: string
  detail: string
  sourceLabel: string
  sourceUrl: string
  fieldwork: string
  sample: string
}

export const groundTruth: GroundTruthCard[] = [
  {
    id: 'wealth-tax',
    value: 64,
    suffix: '%',
    label: 'für eine Vermögensteuer',
    detail: 'Knapp zwei Drittel befürworten die Wiedereinführung. Unter Unionsanhänger:innen waren es 62 %.',
    sourceLabel: 'Infratest dimap für WDR / ARD, April 2026',
    sourceUrl: 'https://www.presseportal.de/pm/7899/6262746',
    fieldwork: '07.–14.04.2026',
    sample: '2.084 Personen, deutschsprachige Bevölkerung ab 16',
  },
  {
    id: 'inheritance-tax',
    value: 61,
    suffix: '%',
    label: 'für höhere Steuern auf große Erbschaften',
    detail: 'Eine Mehrheit unterstützt eine stärkere Besteuerung hoher Erbschaften.',
    sourceLabel: 'Infratest dimap für WDR / ARD, April 2026',
    sourceUrl: 'https://www.presseportal.de/pm/7899/6262746',
    fieldwork: '07.–14.04.2026',
    sample: '2.084 Personen, deutschsprachige Bevölkerung ab 16',
  },
  {
    id: 'high-income-tax',
    value: 67,
    suffix: '%',
    label: 'für höhere Steuern auf hohe Einkommen',
    detail: 'Im ARD-DeutschlandTrend hielten zwei Drittel diesen Weg für richtig.',
    sourceLabel: 'ARD-DeutschlandTrend, Mai 2026',
    sourceUrl: 'https://www.presseportal.de/pm/6694/6270973',
    fieldwork: '04.–06.05.2026',
    sample: '1.303 Wahlberechtigte, zufallsbasierte Telefon-/Online-Befragung',
  },
  {
    id: 'health-spending',
    value: 91,
    suffix: '%',
    label: 'wollen mehr für Gesundheit & Pflege',
    detail: 'Das ist die stärkste Investitionspriorität in der aktuellen IMK-Befragung.',
    sourceLabel: 'IMK / Hans-Böckler-Stiftung, April 2026',
    sourceUrl: 'https://www.imk-boeckler.de/de/pressemitteilungen-15992-oeffentliche-investitionen-mehrheit-der-bevoelkerung-fur-massive-erhoehung-76178.htm',
    fieldwork: 'Oktober–November 2025',
    sample: 'rund 2.700 Personen zwischen 18 und 75',
  },
]

export const spendingGroundTruth = [
  { id: 'health', label: 'Gesundheit & Pflege', emoji: '🏥', support: 91 },
  { id: 'education', label: 'Bildung', emoji: '🎓', support: 87 },
  { id: 'roads', label: 'Straßen & Brücken', emoji: '🌉', support: 82 },
  { id: 'security', label: 'Öffentliche Sicherheit', emoji: '🛡️', support: 80 },
  { id: 'transit', label: 'Bahn & ÖPNV', emoji: '🚆', support: 78 },
  { id: 'digital', label: 'Mobilnetz & Internet', emoji: '🌐', support: 56 },
  { id: 'climate', label: 'Klima & Umwelt', emoji: '🌱', support: 53 },
]

export const revenueModel = {
  wealth: {
    off: { low: 0, high: 0, label: 'Keine Vermögensteuer', description: 'Status quo: die Vermögensteuer wird weiterhin nicht erhoben.' },
    moderate: { low: 20, high: 30, label: 'Moderat', description: 'Hohe Freibeträge, niedriger Einstiegssatz, Schutzregeln für Betriebsvermögen.' },
    strong: { low: 30, high: 40, label: 'Stärker', description: 'Niedrigere Freibeträge und/oder progressivere Sätze für sehr hohe Nettovermögen.' },
  },
  sourceLabel: 'Orientierungskorridor auf Basis der DIW-Modellierung 2026',
  sourceUrl: 'https://www.diw.de/de/diw_01.c.954409.de/vermoegensteuer_die_linke..html',
  caveat: 'Vereinfachter FairEint-Korridor. Kein amtlicher Einnahmeforecast. Bewertung, Ausweichreaktionen, Rechtsgestaltung und Konjunktur können das tatsächliche Aufkommen deutlich verändern.',
} as const

export const budgetCategories = [
  { id: 'health', label: 'Gesundheit & Pflege', emoji: '🏥', defaultShare: 22, support: 91 },
  { id: 'education', label: 'Bildung & Kitas', emoji: '🎓', defaultShare: 18, support: 87 },
  { id: 'infrastructure', label: 'Brücken & Infrastruktur', emoji: '🌉', defaultShare: 15, support: 82 },
  { id: 'transit', label: 'Bahn & ÖPNV', emoji: '🚆', defaultShare: 12, support: 78 },
  { id: 'housing', label: 'Bezahlbares Wohnen', emoji: '🏠', defaultShare: 12, support: null },
  { id: 'security', label: 'Öffentliche Sicherheit', emoji: '🛡️', defaultShare: 8, support: 80 },
  { id: 'digital', label: 'Digitalisierung', emoji: '🌐', defaultShare: 6, support: 56 },
  { id: 'climate', label: 'Klima & Umwelt', emoji: '🌱', defaultShare: 7, support: 53 },
] as const

export type BudgetCategoryId = (typeof budgetCategories)[number]['id']
export type BudgetState = Record<BudgetCategoryId, number>

export const defaultBudget = Object.fromEntries(
  budgetCategories.map((category) => [category.id, category.defaultShare]),
) as BudgetState

export interface PartyProfile {
  id: string
  name: string
  short: string
  sourceLabel: string
  sourceUrl: string
  asOf: string
  scores: {
    wealth: number
    inheritance: number
    highIncome: number
    debt: number
    publicServices: number
    climate: number
    security: number
  }
}

// Scores run from -2 (clear opposition / lower priority) to +2 (clear support / high priority).
// They are deliberately coarse. The result is a policy-position similarity, not a voting recommendation.
export const partyProfiles: PartyProfile[] = [
  {
    id: 'spd', name: 'SPD', short: 'SPD', asOf: 'Bundestagswahlprogramm 2025',
    sourceLabel: 'SPD – Regierungsprogramm / Steuerpolitik 2025',
    sourceUrl: 'https://www.spd.de/bundestagswahl/programm/uebersicht/ii-ein-neuer-aufschwung-fuer-deutschland',
    scores: { wealth: 1, inheritance: 1, highIncome: 1, debt: 2, publicServices: 2, climate: 1, security: 1 },
  },
  {
    id: 'cdu', name: 'CDU/CSU', short: 'Union', asOf: 'Bundestagswahlprogramm 2025',
    sourceLabel: 'CDU/CSU – Politikwechsel für Deutschland 2025',
    sourceUrl: 'https://www.cdu.de/app/uploads/2025/01/km_btw_2025_wahlprogramm_langfassung_ansicht.pdf',
    scores: { wealth: -2, inheritance: -1, highIncome: -1, debt: -2, publicServices: 1, climate: 0, security: 2 },
  },
  {
    id: 'greens', name: 'Bündnis 90/Die Grünen', short: 'Grüne', asOf: 'Fraktionsbeschluss 2025 + Wahlprogramm 2025',
    sourceLabel: 'Grüne Bundestagsfraktion – Gerechtigkeitslücken im Steuersystem schließen',
    sourceUrl: 'https://www.gruene-bundestag.de/unsere-politik/fachtexte/gerechtigkeitsluecken-im-steuersystem-schliessen/',
    scores: { wealth: 1, inheritance: 2, highIncome: 1, debt: 2, publicServices: 2, climate: 2, security: 1 },
  },
  {
    id: 'left', name: 'Die Linke', short: 'Linke', asOf: 'Bundestagswahlprogramm 2025 + Bundestagsantrag 2026',
    sourceLabel: 'Die Linke – Vermögensteuer / Bundestagswahlprogramm',
    sourceUrl: 'https://www.die-linke.de/themen/steuern/vermoegensteuer/',
    scores: { wealth: 2, inheritance: 2, highIncome: 2, debt: 2, publicServices: 2, climate: 1, security: -1 },
  },
  {
    id: 'fdp', name: 'FDP', short: 'FDP', asOf: 'Bundestagswahlprogramm 2025',
    sourceLabel: 'FDP – Wahlprogramm 2025',
    sourceUrl: 'https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm.pdf',
    scores: { wealth: -2, inheritance: -1, highIncome: -2, debt: -2, publicServices: 0, climate: -1, security: 1 },
  },
  {
    id: 'afd', name: 'AfD', short: 'AfD', asOf: 'Bundestagswahlprogramm 2025',
    sourceLabel: 'AfD – Bundestagswahlprogramm 2025',
    sourceUrl: 'https://wahlkampf.afd.de/wp-content/uploads/2025/02/AfD_Bundestagswahlprogramm2025_web.pdf',
    scores: { wealth: -2, inheritance: -2, highIncome: -1, debt: -2, publicServices: 0, climate: -2, security: 2 },
  },
  {
    id: 'bsw', name: 'BSW', short: 'BSW', asOf: 'Bundesparteitag Dezember 2025',
    sourceLabel: 'BSW – Tagungsunterlagen 3. Bundesparteitag 2025',
    sourceUrl: 'https://bsw-vg.de/wp-content/uploads/2025/11/BSW-Tagungsunterlagen-3.-Bundesparteitag-am-6.-und-7.-Dezember-2025-in-Magdeburg.pdf',
    scores: { wealth: 2, inheritance: 2, highIncome: 1, debt: 2, publicServices: 2, climate: -1, security: 1 },
  },
]

export const methodSources = [
  {
    title: 'Vermögensteuer – Modellierung',
    publisher: 'DIW Berlin',
    date: '2026',
    url: 'https://www.diw.de/de/diw_01.c.954409.de/vermoegensteuer_die_linke..html',
    note: 'Aufkommens- und Verteilungswirkungen verschiedener Vermögensteuer-Szenarien; Auftraggeber der Studie wird transparent ausgewiesen.',
  },
  {
    title: 'Vermögen, Erbschaften und Gerechtigkeit',
    publisher: 'Infratest dimap für WDR / ARD',
    date: 'April 2026',
    url: 'https://www.presseportal.de/pm/7899/6262746',
    note: 'Repräsentative Ground-Truth-Daten zu Vermögensverteilung, Vermögensteuer und Erbschaftsteuer.',
  },
  {
    title: 'Steuerreform',
    publisher: 'ARD-DeutschlandTrend',
    date: 'Mai 2026',
    url: 'https://www.presseportal.de/pm/6694/6270973',
    note: 'Repräsentative Ground-Truth-Daten zu höheren Steuern auf hohe Einkommen und hohe Erbschaften.',
  },
  {
    title: 'Öffentliche Investitionen',
    publisher: 'IMK / Hans-Böckler-Stiftung',
    date: 'April 2026',
    url: 'https://www.imk-boeckler.de/de/pressemitteilungen-15992-oeffentliche-investitionen-mehrheit-der-bevoelkerung-fur-massive-erhoehung-76178.htm',
    note: 'Repräsentative Prioritäten für Gesundheit, Bildung, Infrastruktur, Sicherheit, ÖPNV, Digitales und Klima.',
  },
]
