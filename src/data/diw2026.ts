export interface DiwWealthScenario {
  id: string
  personalAllowanceM: number
  businessAllowanceM: number
  taxpayersThousands: number
  revenueBn: number
  ciLowBn: number
  ciHighBn: number
}

/**
 * DIW Berlin, Politikberatung kompakt 211 (2026), Tabelle 5-4.
 * Tarifszenario 3: proportionaler Vermögensteuersatz 1 Prozent.
 * Potenzielles Aufkommen vor möglichen Anpassungsreaktionen der Steuerpflichtigen.
 */
export const diwWealthScenarios: DiwWealthScenario[] = [
  { id: '1-5', personalAllowanceM: 1, businessAllowanceM: 5, taxpayersThousands: 1322, revenueBn: 42.2, ciLowBn: 39.3, ciHighBn: 45.3 },
  { id: '2-5', personalAllowanceM: 2, businessAllowanceM: 5, taxpayersThousands: 400, revenueBn: 34.7, ciLowBn: 32.4, ciHighBn: 37.1 },
  { id: '5-5', personalAllowanceM: 5, businessAllowanceM: 5, taxpayersThousands: 117, revenueBn: 28.6, ciLowBn: 26.8, ciHighBn: 30.6 },
]

export const diwWealthSource = {
  title: 'DIW Berlin · Politikberatung kompakt 211 · Tabelle 5-4 · 2026',
  url: 'https://www.diw.de/documents/publikationen/73/diw_01.c.998454.de/diwkompakt_2026-211.pdf',
  commissionedBy: 'Fraktion Die Linke im Bundestag, Fraktionsvorsitzendenkonferenz der Linken in den Landtagen und Rosa-Luxemburg-Stiftung',
}
