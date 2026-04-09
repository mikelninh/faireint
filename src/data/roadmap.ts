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
  source?: string // URL to primary source
  costItems: { label: string; amount: number }[]
  savingItems: { label: string; amount: number }[]
}

// Expert quotes for credibility
export interface ExpertQuote {
  name: string
  role: string
  quote: string
  source?: string
}

export const expertQuotes: ExpertQuote[] = [
  { name: "Marcel Fratzscher", role: "Präsident DIW Berlin", quote: "Deutschland hat eine der höchsten Vermögensungleichheiten in Europa. Eine moderate Vermögensteuer würde das Wachstum nicht bremsen — Ungleichheit tut es.", source: "DIW Wochenbericht 2024" },
  { name: "IMF Fiscal Monitor", role: "Internationaler Währungsfonds", quote: "Wenn der Einkommensanteil der unteren 20% um 1 Prozentpunkt steigt, wächst das BIP in den folgenden 5 Jahren um 0,38 Prozentpunkte.", source: "IMF Fiscal Monitor 2014" },
  { name: "WHO Europe", role: "Weltgesundheitsorganisation", quote: "Jeder Euro für Prävention spart 3 bis 7 Euro für Behandlung — je nach Krankheitsbild und Zeithorizont.", source: "WHO Health Evidence Network 2023" },
  { name: "Sachverständigenrat", role: "Wirtschaftsweise", quote: "Die Integration von Kapitalerträgen in die Einkommensteuer würde die horizontale Steuergerechtigkeit erhöhen.", source: "SVR Jahresgutachten 2023/24" },
  { name: "Thomas Piketty", role: "Ökonom, Paris School of Economics", quote: "Ohne aktive Umverteilung wächst die Vermögenskonzentration immer weiter — weil die Kapitalrendite dauerhaft über dem Wirtschaftswachstum liegt (r > g).", source: "Das Kapital im 21. Jahrhundert" },
]

// FAQ / Gegenargumente — what critics say + honest answers
export interface FAQ {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  { question: "Führt eine Vermögensteuer nicht zu Kapitalflucht?",
    answer: "Norwegen verlor nach Einführung ca. 0,5% der Steuerbasis. Die Schweiz erhebt sie seit Jahrzehnten ohne nennenswerte Flucht — weil die Lebensqualität die Steuer überwiegt. Entscheidend: EU-weite Koordination verhindert Steuerwettbewerb. Die OECD arbeitet bereits daran." },
  { question: "Warum sollten Reiche mehr zahlen? Sie haben das Geld verdient.",
    answer: "0,5% ab €5 Mio. betrifft 0,3% der Bevölkerung. Die Schweiz zeigt: moderate Vermögensteuer und Unternehmertum schließen sich nicht aus. Gleichzeitig: Kapitalerträge werden mit 25% besteuert, Arbeit mit bis zu 45%. Wer arbeitet, zahlt mehr als wer Geld anlegt. Das ist das eigentliche Gerechtigkeitsproblem." },
  { question: "Können wir uns €61 Mrd. pro Jahr leisten?",
    answer: "Deutschland hat 2022-2023 über €100 Mrd. für die Energiekrise ausgegeben — an einem Wochenende beschlossen. Der Bundeshaushalt 2026 beträgt €520 Mrd. Die Reformen kosten 12% davon, erwirtschaften aber selbst im konservativen Szenario mehr als sie kosten." },
  { question: "Sind die Simulationsergebnisse echte Umfragen?",
    answer: "Nein. Die 23 Personas sind fiktive Profile, gewichtet nach Sinus-Milieus. Die Zustimmungswerte sind modellbasierte Schätzungen, keine empirischen Daten. Wir kennzeichnen das klar. Für echte Umfragedaten empfehlen wir Infratest dimap oder Forschungsgruppe Wahlen." },
  { question: "Ist UBS nicht Sozialismus?",
    answer: "Kostenloses Schulessen gibt es in Finnland seit 1948. Wiens Gemeindebau existiert seit 100 Jahren. Singapur — kein sozialistisches Land — hat 82% öffentlichen Wohnungsbau. UBS bedeutet nicht Planwirtschaft, sondern: Grundbedürfnisse garantieren, darüber hinaus freie Marktwirtschaft." },
  { question: "Warum sollte ich einer Website ohne wissenschaftlichen Beirat vertrauen?",
    answer: "Solltest du nicht blind. Deshalb ist jede Berechnung im Quellcode einsehbar, jede Quelle verlinkt, und wir benennen offen was wir nicht wissen. Dieses Projekt ist ein Diskussionsbeitrag — kein Gutachten. Prüfe die Zahlen selbst. Wenn du Fehler findest, melde sie auf GitHub." },
]

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
    title: "Sofort spürbar",
    description: "Was sich in deinem Alltag ändert — ohne auf neue Gesetze zu warten",
    status: "now",
    laws: [
      "Du bekommst €150 Energiegeld direkt aufs Konto",
      "€29-Ticket für Bus und Bahn in deiner Region",
      "Dein Kind isst in der Schule kostenlos — warm, gesund, jeden Tag",
      "Bürgergeld: Gesundheitscheck statt Sanktionsdrohung",
      "€2.000 Kinderbonus pro Kind — für alle, einkommensunabhängig",
    ],
  },
  {
    year: "2028",
    title: "Systeme ändern sich",
    description: "Die großen Reformen greifen — du merkst den Unterschied",
    status: "mid",
    laws: [
      "Deutschlandfonds startet: dein persönliches Vermögen wächst, automatisch",
      "Vermögensteuer 0,5% ab €5 Mio. — finanziert Kita, Pflege, Schulen",
      "Erbschaftsteuer-Schlupflöcher geschlossen: Milliarden fließen in Bildung",
      "Gesundheitscheck für alle 35-74 — Diabetes und Herzinfarkt verhindern statt behandeln",
      "Gratis ÖPNV unter 25 und über 65 — Mobilität ist kein Privileg",
      "Ein Gesundheitssystem für alle (GKV + PKV zusammen)",
    ],
  },
  {
    year: "2035",
    title: "Ein anderes Deutschland",
    description: "Fair. Stark. Nachhaltig. So fühlt sich Einigkeit an.",
    status: "future",
    laws: [
      "Jeder hat Zugang zu Wohnung, Gesundheit, Bildung, Mobilität, Internet, Ernährung — per Gesetz",
      "Deutschlandfonds: Erste Generation hat echtes Vermögen aufgebaut",
      "100% erneuerbare Energie. Keine Abhängigkeit mehr von Diktatoren.",
      "Prävention statt Reparatur: Gesundheitskosten sinken seit 5 Jahren",
      "EU-weite Mindest-Vermögensteuer — Kapitalflucht ist Geschichte",
    ],
  },
]

export const costs: CostBenefit[] = [
  {
    reform: "Kostenloses Schulessen",
    annualCost: 4.1,
    annualSaving: 8.2,
    breakEvenYears: 0,
    source: "https://www.bmel.de/DE/themen/ernaehrung/gesunde-ernaehrung/kita-und-schulverpflegung/kita-und-schulverpflegung_node.html",
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
    source: "https://www.who.int/europe/publications/i/item/9789289058988",
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
    source: "https://www.bertelsmann-stiftung.de/de/themen/aktuelle-meldungen/2019/november/eine-einheitliche-krankenversicherung",
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
    source: "https://www.diw.de/de/diw_01.c.893214.de/publikationen/wochenberichte/2024_18/staatsfonds_fuer_die_altersvorsorge.html",
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
    source: "https://wid.world/country/germany/",
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
