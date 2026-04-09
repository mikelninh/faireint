export interface TimelineStep {
  year: string
  quarter?: string
  title: string
  description: string
  laws?: string[]
  status: 'now' | 'soon' | 'mid' | 'future'
}

export interface CostBenefit {
  reform: string
  annualCost: number
  annualSaving: number
  breakEvenYears: number
  costItems: { label: string; amount: number }[]
  savingItems: { label: string; amount: number }[]
}

export interface PartyReaction {
  party: string
  color: string
  emoji: string
  approval: number // 0-100
  quote: string
  wins: string[]
  concerns: string[]
}

export const timeline: TimelineStep[] = [
  {
    year: "2026",
    quarter: "Q3",
    title: "Sofortmaßnahmen",
    description: "Was morgen startet — ohne neue Gesetze",
    status: "now",
    laws: [
      "Verordnung: Tempolimit 120 km/h (befristet 6 Monate)",
      "Haushaltsbeschluss: €150 Energiegeld",
      "Verordnung: €29-Regionalticket",
    ],
  },
  {
    year: "2026",
    quarter: "Q4",
    title: "Erste Gesetzespakete",
    description: "Bundestag beschließt die Grundlagen",
    status: "soon",
    laws: [
      "Grundsicherungsreformgesetz (Sanktionsdeckel 30%, Gesundheitscheck)",
      "GEG-Novelle (65% EE Neubau ab 2028, Förderung 80%)",
      "Steuerreformgesetz (Splitting-Deckelung, Kinderbonus €2.000)",
    ],
  },
  {
    year: "2027",
    quarter: "Q1",
    title: "Neue Strukturen",
    description: "Institutionen werden aufgebaut",
    status: "soon",
    laws: [
      "Gesellschaftsdienstgesetz + GG-Änderung Art. 12a",
      "Energieresilienzgesetz (Import-Diversifizierung, EE-Beschleunigung)",
      "Ernährungsbildungsgesetz (Schulessen, Ernährungsfachkräfte)",
    ],
  },
  {
    year: "2028",
    quarter: "Q1",
    title: "Systemwechsel",
    description: "Die großen Reformen greifen",
    status: "mid",
    laws: [
      "Rentenreformgesetz: Deutschlandfonds startet (2% AN + 1% AG)",
      "Selbstständige in Rentenversicherung",
      "Präventionsgesetz (Pflicht-Gesundheitscheck 35-74)",
      "Tierschutz-Novelle (Würde des Tieres, Massentierhaltung-Ausstieg)",
    ],
  },
  {
    year: "2029",
    quarter: "Q1",
    title: "Volle Wirkung",
    description: "Alle Reformen laufen, erste Ergebnisse sichtbar",
    status: "mid",
    laws: [
      "Neue Beamte in gesetzliche Rente",
      "Körperschaftsteuer Stufe 2 (25% für Reinvestitionen)",
      "200.000 Gesellschaftsdienstplätze erreicht",
      "Digitale Gesundheitsakte für alle",
    ],
  },
  {
    year: "2029",
    quarter: "Q3",
    title: "Vermögensreform",
    description: "Faire Verteilung — die größte ungelöste Frage",
    status: "mid",
    laws: [
      "Vermögensteuer reaktiviert: 0,5% ab €5 Mio. (Art. 106 GG — nie abgeschafft, nur ausgesetzt seit 1996)",
      "Erbschaftsteuer-Reform: Betriebsvermögensprivileg gedeckelt bei €50 Mio.",
      "Abgeltungssteuer abgeschafft: Kapitalerträge in Einkommensteuer integriert",
      "UBS Stufe 1: Gratis ÖPNV u25/ü65, kostenlose Kinderbetreuung 0-6",
    ],
  },
  {
    year: "2030",
    quarter: "",
    title: "Zwischenbilanz",
    description: "Erste große Evaluierung — was wirkt, was muss angepasst werden",
    status: "future",
    laws: [
      "CO₂-Preis Gebäude: €200/Tonne erreicht",
      "Ölheizungs-Verbot (rein fossil) in Kraft",
      "Schulessen: Flächendeckend kostenlos",
      "Boden-Wertsteuer als Ergänzung zur Grundsteuer",
      "UBS Stufe 2: Basisenergie-Pauschale, Breitband als Grundrecht",
    ],
  },
  {
    year: "2035",
    quarter: "",
    title: "Strukturwandel abgeschlossen",
    description: "Deutschland ist ein anderes Land — fairer, stärker, nachhaltiger",
    status: "future",
    laws: [
      "140 GW Wind + 280 GW Solar installiert",
      "Deutschlandfonds: erste Generation profitiert sichtbar",
      "Massentierhaltung weitgehend beendet",
      "Präventions-Anteil: 6% der Gesundheitsausgaben (von 3%)",
      "Universal Basic Access als Rechtsrahmen: Zugang zu Wohnung, Gesundheit, Bildung, Mobilität, Digital, Ernährung",
      "EU-weite Mindest-Vermögensteuer in Verhandlung",
    ],
  },
]

export const costs: CostBenefit[] = [
  {
    reform: "Kostenloses Schulessen",
    annualCost: 4.1,
    annualSaving: 8.2,
    breakEvenYears: 0,
    costItems: [
      { label: "8 Mio. Schüler × €2,70 × 190 Tage", amount: 4.1 },
    ],
    savingItems: [
      { label: "Weniger Adipositas-Behandlung (langfristig)", amount: 3.5 },
      { label: "Bessere Schulleistung → höheres Einkommen → mehr Steuern", amount: 2.8 },
      { label: "Weniger Ungleichheit → weniger Sozialausgaben", amount: 1.9 },
    ],
  },
  {
    reform: "Prävention statt Behandlung",
    annualCost: 6.0,
    annualSaving: 42.0,
    breakEvenYears: 3,
    costItems: [
      { label: "Pflicht-Gesundheitschecks für alle 35-74", amount: 2.5 },
      { label: "Kommunale Präventionsprogramme (50 Kreise)", amount: 1.5 },
      { label: "Zuckersteuer-Verwaltung + Ernährungsberatung", amount: 1.0 },
      { label: "Krankenhaus-Ernährungsreform", amount: 1.0 },
    ],
    savingItems: [
      { label: "Vermiedene Diabetes-Kosten (WHO: €1 Prävention = €7 Ersparnis)", amount: 18.0 },
      { label: "Kürzere Krankenhausaufenthalte (-2,3 Tage/Patient)", amount: 12.0 },
      { label: "Weniger Herz-Kreislauf-Behandlungen (Finnland-Effekt)", amount: 8.0 },
      { label: "Weniger Fehltage → höhere Produktivität", amount: 4.0 },
    ],
  },
  {
    reform: "GKV/PKV zusammenführen",
    annualCost: 0,
    annualSaving: 7.0,
    breakEvenYears: 0,
    costItems: [
      { label: "Übergangskosten (einmalig, auf 5 Jahre verteilt)", amount: 2.0 },
    ],
    savingItems: [
      { label: "Verwaltungskosten-Reduktion (5-6% → 2%)", amount: 5.0 },
      { label: "Keine doppelten Abrechnungssysteme", amount: 1.2 },
      { label: "Bessere Verhandlungsposition gegenüber Pharma", amount: 0.8 },
    ],
  },
  {
    reform: "Deutschlandfonds (ersetzt Riester)",
    annualCost: 0,
    annualSaving: 25.0,
    breakEvenYears: 15,
    costItems: [
      { label: "Aufbaukosten Fonds-Verwaltung", amount: 0.3 },
      { label: "Staatliche Zulagen (€175/Person + €200/Kind)", amount: 8.0 },
    ],
    savingItems: [
      { label: "Rendite 5-7% statt Riester ~2% (Differenz × Volumen)", amount: 15.0 },
      { label: "Weniger Altersarmut → weniger Grundsicherung im Alter", amount: 6.0 },
      { label: "Gebühren 0,15% statt 1-2% (Riester) → mehr bei Bürgern", amount: 4.0 },
    ],
  },
  {
    reform: "Gesellschaftsdienst",
    annualCost: 5.5,
    annualSaving: 9.2,
    breakEvenYears: 2,
    costItems: [
      { label: "200.000 Plätze × Vergütung + Sozialversicherung", amount: 3.6 },
      { label: "Unterkunft, Verpflegung, Verwaltung", amount: 1.5 },
      { label: "Anreize (Rente, Führerschein, Steuerbonus)", amount: 0.4 },
    ],
    savingItems: [
      { label: "Pflegekräfte-Entlastung (80.000 Hilfskräfte)", amount: 4.0 },
      { label: "Bundeswehr-Rekrutierung (25.000 Freiwillige)", amount: 2.5 },
      { label: "Katastrophenschutz-Stärkung (Schadensvermeidung)", amount: 1.5 },
      { label: "Weniger Orientierungslosigkeit bei Jugendlichen", amount: 1.2 },
    ],
  },
  {
    reform: "Vermögensverteilung (UBS + Vermögensteuer + Erbschaftsreform)",
    annualCost: 45.0,
    annualSaving: 110.0,
    breakEvenYears: 1,
    costItems: [
      { label: "Universal Basic Services (Schulessen, ÖPNV, Kita, Energie, Digital)", amount: 35.0 },
      { label: "Deutschlandfonds: Staatliche Zulagen", amount: 8.0 },
      { label: "Verwaltung Vermögensteuer + Erbschaftsteuer-Reform", amount: 0.5 },
      { label: "Boden-Wertsteuer-Einführung", amount: 1.5 },
    ],
    savingItems: [
      { label: "Vermögensteuer 0,5% ab €5 Mio. (Einnahmen)", amount: 12.0 },
      { label: "Erbschaftsteuer-Reform (geschlossene Schlupflöcher)", amount: 8.0 },
      { label: "Kapitalerträge in Einkommensteuer (Mehreinnahmen)", amount: 25.0 },
      { label: "Verlorenes BIP-Wachstum durch Ungleichheit (vermieden)", amount: 40.0 },
      { label: "Gesundheitskosten durch Armut (vermieden)", amount: 12.0 },
      { label: "Kriminalitätskosten durch Ungleichheit (vermieden)", amount: 8.0 },
      { label: "Boden-Wertsteuer (Einnahmen + weniger Spekulation)", amount: 5.0 },
    ],
  },
]

export const partyReactions: PartyReaction[] = [
  {
    party: "CDU/CSU",
    color: "#000000",
    emoji: "⚫",
    approval: 72,
    quote: "Wir haben in vielen Bereichen unsere Handschrift durchgesetzt.",
    wins: [
      "Körperschaftsteuer runter auf 25%",
      "Deutschlandfonds mit Kapitaldeckung",
      "Gesellschaftsdienst mit Bundeswehr-Komponente",
      "Technologieoffenheit im GEG",
      "Vermittlungsvorrang im Sozialrecht",
      "Erbschaftsteuer-Freibetrag €50 Mio. schützt Mittelstand",
    ],
    concerns: [
      "Splitting-Deckelung geht zu weit",
      "GKV/PKV-Zusammenführung nicht im Koalitionsvertrag",
      "Vermögensteuer leistungsfeindlich — nur mit EU-Koordination",
      "UBS darf nicht zur Planwirtschaft werden",
    ],
  },
  {
    party: "SPD",
    color: "#E3000F",
    emoji: "🔴",
    approval: 78,
    quote: "Die soziale Gerechtigkeit zieht sich durch jede Reform — Vermögensverteilung ist der Kern.",
    wins: [
      "48% Rentenniveau gesichert",
      "Kinderbonus €2.000 einkommensunabhängig",
      "Kostenloses Schulessen",
      "Vermögensteuer reaktiviert — Kernforderung seit Jahrzehnten",
      "UBS: Kostenlose Grunddienste für alle",
      "Erbschaftsteuer-Schlupflöcher geschlossen",
    ],
    concerns: [
      "Hätten gerne höhere Vermögensteuer (1% statt 0,5%)",
      "UBI wäre noch besser als UBS",
    ],
  },
  {
    party: "Grüne",
    color: "#64A12D",
    emoji: "🟢",
    approval: 70,
    quote: "Klimaschutz und soziale Gerechtigkeit gehören zusammen.",
    wins: [
      "CO₂-Preis €200/t bis 2030 gesetzlich verankert",
      "Ölheizungs-Verbot ab 2030",
      "280 GW Solar bis 2035",
      "Zuckersteuer + Ernährungsbildung",
      "Tierschutz-Novelle mit Würde-Konzept",
    ],
    concerns: [
      "H₂-ready ist fossiler Lock-in-Risiko",
      "100% EE Neubau erst 2040 — zu spät",
      "Gesellschaftsdienst hat Militär-Komponente",
    ],
  },
  {
    party: "FDP",
    color: "#FFED00",
    emoji: "🟡",
    approval: 58,
    quote: "Marktwirtschaft funktioniert — wenn die Rahmenbedingungen stimmen.",
    wins: [
      "Tarif auf Rädern (kalte Progression weg)",
      "Körperschaftsteuer-Senkung",
      "Hinzuverdienst-Liberalisierung",
      "Deutschlandfonds statt Riester",
      "Digitalisierung Jobcenter + Gesundheitsakte",
    ],
    concerns: [
      "Zu viel Ordnungsrecht, zu wenig Markt",
      "Splitting-Deckelung greift in Familienrecht ein",
      "GKV/PKV-Zusammenführung lehnen wir ab",
    ],
  },
  {
    party: "Linke",
    color: "#BE3075",
    emoji: "🟣",
    approval: 45,
    quote: "Richtige Richtung, aber nicht weit genug.",
    wins: [
      "Sanktionsdeckel + Gesundheitsschutz",
      "Kostenloses Schulessen",
      "Tierschutz-Novelle",
      "Hinzuverdienst-Reform",
    ],
    concerns: [
      "563€ Regelsatz ist Armut — braucht mindestens €700",
      "0,5% Vermögensteuer ist zu wenig — braucht 2%+",
      "Gesellschaftsdienst mit Militär: Nein",
      "Rentenniveau sollte 53% sein",
      "UBI statt UBS — Menschen brauchen Geld, nicht Bevormundung",
    ],
  },
  {
    party: "AfD",
    color: "#009EE0",
    emoji: "🔵",
    approval: 22,
    quote: "Mehr Staat, mehr Steuern, mehr Umerziehung.",
    wins: [
      "Kindererziehungszeiten aufgewertet",
      "Hinzuverdienst-Liberalisierung",
    ],
    concerns: [
      "Lehnt Tempolimit, CO₂-Steuer, GEG ab",
      "Lehnt Cannabis-Fortführung ab",
      "Will keine Tierhaltungs-CO₂-Steuer",
      "GKV/PKV-Zusammenführung: Sozialismus",
    ],
  },
]

export const generationImpact = [
  {
    name: "Mia, 8",
    emoji: "👧",
    label: "Kind",
    shortTerm: "Kostenloses warmes Schulessen ab sofort. Ernährungsbildung. Anti-Mobbing-Programm.",
    longTerm: "Wächst gesünder auf. Bessere Bildung. Niedrigeres Adipositas-Risiko. Lernt Programmieren ab Klasse 1.",
    lifetime: "Spart ~€80.000 an Gesundheitskosten über ihr Leben. Verdient geschätzt 5-8% mehr durch bessere Bildung.",
  },
  {
    name: "Jonas, 18",
    emoji: "🧑‍🎓",
    label: "Junger Erwachsener",
    shortTerm: "Gesellschaftsdienst: €1.400/Monat statt FSJ-Taschengeld. Kostenloser Führerschein. Studienbonus.",
    longTerm: "Deutschlandfonds startet mit 18 — bei 5% Rendite und €100/Monat hat er mit 63 über €200.000.",
    lifetime: "Kann mit 63 abschlagsfrei in Rente (45 Beitragsjahre). Hat echte Altersvorsorge, nicht Riester-Schrott.",
  },
  {
    name: "Karin, 35",
    emoji: "👩",
    label: "Alleinerziehende",
    shortTerm: "Kinderbonus €2.000/Kind/Jahr. Hinzuverdienst: €510 behalten statt €300. Recht auf 24 Monate Weiterbildung.",
    longTerm: "Deutschlandfonds baut Altersvorsorge auf. Keine Splitting-Benachteiligung als Alleinerziehende.",
    lifetime: "Raus aus der Armutsfalle. Kinder essen kostenlos in der Schule. Altersarmut vermieden.",
  },
  {
    name: "Helmut, 55",
    emoji: "👨‍🔧",
    label: "Arbeiter",
    shortTerm: "Pflicht-Gesundheitscheck entdeckt Prä-Diabetes. Kostenlose Ernährungsberatung.",
    longTerm: "8kg leichter, kein Diabetes. Spart €10.000/Jahr an Medikamenten. Bei 40 Beitragsjahren: reduzierter Abschlag.",
    lifetime: "Lebt geschätzt 5-7 Jahre länger (Finnland-Effekt). Hat echten Deutschlandfonds statt nichts.",
  },
  {
    name: "Brigitte, 72",
    emoji: "👵",
    label: "Rentnerin",
    shortTerm: "Rentenerhöhung +4,24%. Kindererziehungszeiten: +€30/Monat pro Kind. €150 Energiegeld.",
    longTerm: "48% Rentenniveau gesichert bis 2035. Klimageld €250/Jahr aus CO₂-Einnahmen. Heizungs-Austausch: befreit (≥75).",
    lifetime: "Würdevoller Lebensabend. Keine Angst vor Altersarmut.",
  },
]
