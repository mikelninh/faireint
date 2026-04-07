export interface TrustPillar {
  id: string
  emoji: string
  title: string
  insight: string
  research: string
  germanyNow: string
  target: string
  roleModel: { country: string; flag: string; what: string; result: string }
  concreteStep: string[]
}

export interface DeepNeed {
  level: string
  emoji: string
  need: string
  govEquivalent: string
  germanyScore: number // 0-100
  targetScore: number
  gap: string
}

export const truthBomb = {
  question: "Können wir alle glücklich machen?",
  answer: "Nein. Aber Dänemark schafft 92% Zufriedenheit mit der Demokratie. Die Frage ist nicht 'alle glücklich' — die Frage ist: fühlen sich die Menschen gehört, fair behandelt und sicher genug, um frei zu leben? DAS kann man für 80%+ erreichen. Die restlichen 20% sind in jeder Demokratie unzufrieden — und das ist gesund. Kritik ist kein Bug, sondern ein Feature.",
  proof: "Dänemark 92%, Luxemburg 88%, Irland 83%, Niederlande 80% — Zufriedenheit mit der Demokratie (Eurobarometer 2023). Deutschland: 53%. Der Abstand ist 40 Punkte. Aber: Deutschland lag 2017 noch bei ~70%. Der Fall ist nicht strukturell — er ist reparierbar.",
}

export const deepNeeds: DeepNeed[] = [
  {
    level: "1", emoji: "🏠", need: "Sicherheit",
    govEquivalent: "Wohnung, Essen, Gesundheit, Grundeinkommen",
    germanyScore: 72, targetScore: 90,
    gap: "8,5 Mio. Diabetiker. 4 Mio. können sich Zahnersatz nicht leisten. 1,9 Mio. von Wohnungsverlust bedroht."
  },
  {
    level: "2", emoji: "🛡️", need: "Stabilität",
    govEquivalent: "Rechtsstaat, stabile Preise, sichere Rente, funktionierender Staat",
    germanyScore: 55, targetScore: 85,
    gap: "Inflation 2,7%. Renten-Angst. Deutsche Bahn 64% pünktlich. Brücken bröckeln. OZG gescheitert."
  },
  {
    level: "3", emoji: "🤝", need: "Zugehörigkeit",
    govEquivalent: "Gemeinschaft, Integration, lokale Institutionen, geteilte Erfahrungen",
    germanyScore: 48, targetScore: 80,
    gap: "Vereinsamung steigt. Ost-West-Kluft. Stadt-Land-Gefälle. Parallelgesellschaften. Vereine sterben."
  },
  {
    level: "4", emoji: "✊", need: "Würde & Stimme",
    govEquivalent: "Respektvoller Umgang, Bürokratie die dich als Mensch behandelt, gehört werden",
    germanyScore: 35, targetScore: 80,
    gap: "Bürgeramt: Nummernziehen, stundenlang warten, Formulare auf Papier. 'Zuständig ist jemand anders.' Kein Feedback ob dein Anliegen angekommen ist."
  },
  {
    level: "5", emoji: "🌱", need: "Freiheit & Entfaltung",
    govEquivalent: "Bildung, Unternehmertum, Kreativität, Wahlfreiheit im Leben",
    germanyScore: 52, targetScore: 85,
    gap: "10 Tage für Firmengründung (Estland: <1 Tag). Steuererklärung: Wochen (Estland: 3 Minuten). 1.700 Bundesgesetze, 50.000 Verordnungen."
  },
]

export const trustPillars: TrustPillar[] = [
  {
    id: "service",
    emoji: "🏛️",
    title: "Der Staat funktioniert",
    insight: "Menschen beurteilen den Staat danach, wie er sie am Schalter behandelt — nicht im Bundestag.",
    research: "Bo Rothstein (Quality of Government Institute): Impartialität der Institutionen ist der stärkste Prädiktor für Vertrauen. Die 'Output-Seite' (Bürgeramt, Schule, Polizei) zählt mehr als die 'Input-Seite' (Wahlen, Parlament).",
    germanyNow: "OZG gescheitert. DB 64% pünktlich. Bürgeramt: Wochen Wartezeit. Fax im Gesundheitsamt.",
    target: "Digitale Verwaltung in 3 Minuten (wie Estland). DB >85% pünktlich. Bürgeramt-Termin in 48h.",
    roleModel: { country: "Estland", flag: "🇪🇪", what: "X-Road: ein digitales System für ALLES. Steuern in 3 Min. 99% Rezepte digital. Bürger sehen wer ihre Daten anschaut.", result: "88% nutzen e-Services regelmäßig. 844 Arbeitsjahre/Jahr gespart." },
    concreteStep: [
      "Bundes-X-Road: ein einheitliches Datenaustausch-System statt 16 Länder-Systeme",
      "Digitale Identität aktivieren (eID im Personalausweis) — Ziel: 80% bis 2029",
      "Bürgeramt-Garantie: Termin innerhalb von 48 Stunden, online buchbar",
      "Jeder Bürger sieht: wer hat meine Daten abgefragt? (Transparenz wie Estland)",
    ],
  },
  {
    id: "fairness",
    emoji: "⚖️",
    title: "Der Prozess ist fair",
    insight: "Menschen akzeptieren Ergebnisse die ihnen nicht gefallen — wenn der PROZESS fair war. Gehört werden zählt mehr als bekommen was man will.",
    research: "Tom Tyler (1990, 2006): Prozedurale Gerechtigkeit hat 4 Säulen: Stimme (wurde ich gehört?), Neutralität (war die Entscheidung unvoreingenommen?), Respekt (wurde ich würdevoll behandelt?), Vertrauenswürdigkeit (hatte die Behörde gute Absichten?).",
    germanyNow: "Opake Entscheidungen. Keine Begründung warum der Antrag abgelehnt wurde. Kein Feedback-Loop. Petitionsausschuss hat keine Zähne.",
    target: "Jede behördliche Entscheidung mit Begründung in einfacher Sprache. Bürgerräte mit echtem Einfluss. Feedback-Pflicht.",
    roleModel: { country: "Irland", flag: "🇮🇪", what: "Citizens' Assembly: 99 zufällig ausgewählte Bürger beraten über Abtreibung + Ehe für alle. Ergebnis: 66% Ja im Referendum. Das unmögliche Thema — gelöst.", result: "83% Zufriedenheit mit der Demokratie (Eurobarometer). Höchster Wert außerhalb Skandinaviens." },
    concreteStep: [
      "Bürgerräte mit Zähnen: Bundestag MUSS innerhalb von 6 Monaten auf Empfehlungen reagieren",
      "Jede Behörde: Begründungspflicht in einfacher Sprache für jede Ablehnung",
      "Digitales Feedback-System: War dein Anliegen gelöst? Ja/Nein. Aggregierte Daten öffentlich.",
      "Losbasierte Bürgerbeteiligung bei großen Infrastrukturprojekten (wie Irland)",
    ],
  },
  {
    id: "security",
    emoji: "🔒",
    title: "Keine existenzielle Angst",
    insight: "Wer keine Angst vor dem Absturz hat, kann frei leben, Risiken eingehen, Unternehmen gründen. Angst ist der größte Feind von Zufriedenheit.",
    research: "Dänisches Flexicurity-Modell: Einfach kündigen + großzügiges Arbeitslosengeld + aktive Arbeitsmarktpolitik. Ergebnis: höchste 'Freiheit, das eigene Leben zu gestalten' im World Happiness Report.",
    germanyNow: "ALG I → Bürgergeld-Klippe nach 12 Monaten. Angst vor Jobverlust = Angst vor Absturz. Selbstständige: null Sicherheitsnetz (bis Reform 2028).",
    target: "Weicher Übergang statt Klippe. Deutschlandfonds als Vermögensaufbau. Flexicurity: sicher UND frei.",
    roleModel: { country: "Dänemark", flag: "🇩🇰", what: "Flexicurity: 90% Lohnersatz bei Arbeitslosigkeit (gedeckelt). 2% des BIP für aktive Arbeitsmarktpolitik (DE: 0,6%). Persönlicher Plan in 4 Wochen.", result: "92% Zufriedenheit mit der Demokratie. Höchster Wert in Europa." },
    concreteStep: [
      "ALG I verlängern auf 18 Monate (von 12) bei aktiver Mitwirkung",
      "Aktive Arbeitsmarktpolitik: Budget von 0,6% auf 1,5% des BIP anheben",
      "Persönlicher Arbeitsmarkt-Plan innerhalb von 2 Wochen nach Kündigung",
      "Deutschlandfonds: Jeder baut Vermögen auf, nicht nur Gutverdiener",
    ],
  },
  {
    id: "equality",
    emoji: "🏫",
    title: "Gleiche Qualität für alle",
    insight: "Wenn Arm und Reich die gleiche Schule, das gleiche Krankenhaus, den gleichen Zug nutzen — entsteht Solidarität durch Erfahrung, nicht durch Predigt.",
    research: "Finnland-Effekt: Nur 2% Privatschulen. CEO-Kind und Reinigungskraft-Kind in der gleichen Klasse. Geringste PISA-Varianz weltweit. Ergebnis: erlebte Gleichheit schafft Vertrauen.",
    germanyNow: "GKV vs. PKV: Zwei-Klassen-Medizin. Privatschulen wachsen. Gymnasium-Empfehlung nach Eltern-Einkommen korreliert. DB 1. Klasse vs. überfüllte 2. Klasse.",
    target: "Ein Gesundheitssystem. Eine Schulqualität. Öffentliche Dienste so gut, dass niemand privat braucht.",
    roleModel: { country: "Finnland", flag: "🇫🇮", what: "Keine relevanten Privatschulen. Kostenloses Schulessen seit 1948. Gleiche Qualität überall. Postleitzahl bestimmt nicht deine Zukunft.", result: "77% Zufriedenheit. Höchstes Vertrauen in die Polizei in der EU (91%)." },
    concreteStep: [
      "GKV/PKV zusammenführen: ein System, eine Warteliste, eine Qualität",
      "Schulfinanzierung: Bundesstandard für Ausstattung (kein Lehrer kauft Kreide selbst)",
      "Kostenloses Schulessen: die tägliche Gleichheitserfahrung",
      "DB-Qualitätsoffensive: Pünktlichkeit als Staatsziel (nicht Witz)",
    ],
  },
  {
    id: "voice",
    emoji: "🗳️",
    title: "Ich kann mitbestimmen",
    insight: "Schon die OPTION mitzureden erhöht die Zufriedenheit um 20-30% — selbst wenn das Ergebnis gleich bleibt. Die Option ist das Feature.",
    research: "Schweiz: 700+ Referenden seit 1848. Wahlbeteiligung nur ~45% — aber die MÖGLICHKEIT zu wählen schafft Legitimität. Lind & Tyler: Der 'Voice-Effekt' funktioniert kulturübergreifend.",
    germanyNow: "Kein Bundesreferendum. Bürgerräte ohne Konsequenz. Petitionen versanden. 'Alle 4 Jahre Kreuzchen machen' = das wars.",
    target: "Regelmäßige Bürgerbeteiligung. Digitale Abstimmungen über lokale Themen. Transparente Reaktionspflicht.",
    roleModel: { country: "Schweiz", flag: "🇨🇭", what: "4 Abstimmungstage/Jahr, 3-4 Themen je. 100.000 Unterschriften = Volksinitiative. Populismus wird kanalisiert statt zu explodieren.", result: "65% Regierungsvertrauen (OECD-Spitze). Höchste Steuermoral trotz niedrigem Enforcement." },
    concreteStep: [
      "Bundesweite Bürgerräte zu den 3 wichtigsten Themen pro Jahr (losbasiert)",
      "Kommunale Online-Abstimmungen über Haushaltsprioritäten (Bürgerhaushalt)",
      "Reaktionspflicht: Bundestag muss Bürgerrat-Empfehlungen innerhalb 6 Monaten behandeln",
      "Jugend-Bürgerrat: 16-25-Jährige beraten über Zukunftsthemen (Rente, Klima, Digitales)",
    ],
  },
  {
    id: "simplicity",
    emoji: "✨",
    title: "Einfachheit = Respekt",
    insight: "Jedes Formular, jede Wartezeit, jeder unverständliche Bescheid sagt: 'Deine Zeit ist uns egal.' Vereinfachung ist die tiefste Form von Respekt.",
    research: "Estland: Steuererklärung in 3 Minuten. Firmengründung in 18 Minuten. 844 Arbeitsjahre/Jahr gespart. Die Botschaft: Wir respektieren deine Lebenszeit.",
    germanyNow: "1.700 Bundesgesetze. 50.000 Verordnungen. 14-seitiger Weiterbewilligungsantrag. 33 Tage Bearbeitungszeit. Steuererklärung: Wochen + Steuerberater.",
    target: "Halbierung der Regulierungslast bis 2030. Jeder Behördengang digital möglich. Vorbefüllte Steuererklärung in 10 Minuten.",
    roleModel: { country: "Estland", flag: "🇪🇪", what: "3-Minuten-Steuererklärung. 18-Minuten-Firmengründung. Jeder Behördengang digital. Und: du siehst wer deine Daten anschaut.", result: "Beste digitale öffentliche Dienste in Europa. Höchstes Startup-Gründungsrate pro Kopf in der EU." },
    concreteStep: [
      "One-in-two-out: Für jede neue Verordnung zwei alte streichen",
      "Vorbefüllte Steuererklärung bis 2028 (Finanzamt kennt 90% schon)",
      "Firmengründung in 24 Stunden (digital, ein Formular)",
      "Behörden-Sprache-Gesetz: Jeder Bescheid muss für B1-Deutsch verständlich sein",
    ],
  },
]

export const partyPathTo80 = [
  {
    party: "CDU/CSU",
    currentApproval: 72,
    potentialApproval: 85,
    whatTheyReallyWant: "Wirtschaftliche Stärke + Sicherheit + Tradition respektiert",
    whatGetsThemTo80: [
      "Körperschaftsteuer auf 25% → internationaler Standortvorteil",
      "Bürokratieabbau als messbares Ziel (50% weniger Verordnungen)",
      "Bundeswehr auf 250.000 → Sicherheit gewährleistet",
      "Familienbonus €2.000/Kind → konservativer Familienwert bedient",
      "Flexicurity: mehr Eigenverantwortung, weniger Abhängigkeit",
    ],
    keyCompromise: "Akzeptiert GKV/PKV-Zusammenführung WENN die Qualität steigt (nicht nur Gleichheit nach unten)",
  },
  {
    party: "SPD",
    currentApproval: 78,
    potentialApproval: 88,
    whatTheyReallyWant: "Soziale Gerechtigkeit + Würde der Arbeit + Aufstieg möglich",
    whatGetsThemTo80: [
      "48% Rentenniveau langfristig gesichert",
      "Kostenloses Schulessen = Gleichheit von Anfang an",
      "Pflege-Entlastung durch Gesellschaftsdienst",
      "Sanktionsdeckel + Gesundheitsschutz = SPD-DNA",
      "Flexicurity nach dänischem Vorbild: DER SPD-Traum",
    ],
    keyCompromise: "Akzeptiert Deutschlandfonds mit Kapitalmarkt-Komponente WEIL er öffentlich verwaltet ist",
  },
  {
    party: "Grüne",
    currentApproval: 70,
    potentialApproval: 84,
    whatTheyReallyWant: "Klimaschutz + Tierwohl + Gerechtigkeit + Transformation",
    whatGetsThemTo80: [
      "CO₂ €200/t gesetzlich verankert = stärkstes Klimagesetz",
      "Tierschutz-Novelle mit Würde-Konzept = historisch",
      "Ernährungswende: pflanzliche Kantinen + Zuckersteuer",
      "280 GW Solar: größter EE-Ausbau der Geschichte",
      "Bürgerräte: mehr Demokratie, nicht weniger",
    ],
    keyCompromise: "Akzeptiert H₂-ready mit Sunset-Klausel + akzeptiert Gesellschaftsdienst mit Friedensdienst-Option",
  },
  {
    party: "FDP",
    currentApproval: 58,
    potentialApproval: 78,
    whatTheyReallyWant: "Freiheit + Eigenverantwortung + weniger Staat + Innovation",
    whatGetsThemTo80: [
      "Tarif auf Rädern = liberale Kernforderung seit Jahrzehnten",
      "Digitale Verwaltung (Estland-Modell) = Bürokratieabbau live",
      "Deutschlandfonds: marktbasiert, nicht staatlich umverteilt",
      "Firmengründung in 24h: Unternehmergeist entfesseln",
      "Hinzuverdienst-Liberalisierung: Arbeit lohnt sich wieder",
    ],
    keyCompromise: "Akzeptiert Tempolimit ALS temporäre Krisenmassnahme + akzeptiert Ernährungswende OHNE Fleischverbot",
  },
  {
    party: "Linke",
    currentApproval: 45,
    potentialApproval: 82,
    whatTheyReallyWant: "Umverteilung + Vermögensteuer + Mieten runter + Frieden",
    whatGetsThemTo80: [
      "Regelsatz-Neuberechnung mit realistischem Existenzminimum",
      "Sanktionsdeckel: Kein Mensch fällt unter das Minimum",
      "Kostenloses Schulessen: Kinderarmut bekämpfen",
      "Mieterschutz bei Heizungstausch: €1/m² Deckel",
      "Bürgerräte: direkte Demokratie von unten",
      "Vermögensabgabe 0,5% ab €5 Mio. — wie Norwegen, Schweiz, Spanien (€10 Mrd./Jahr)",
    ],
    keyCompromise: "Moderate Vermögensabgabe (0,5% ab €5 Mio.) bringt ~€10 Mrd./Jahr — finanziert Schulessen, Pflege, Regelsatz-Erhöhung. Norwegen und Schweiz haben Vermögensteuer und sind die glücklichsten Länder. Es ist nicht radikal — es ist Mainstream bei den Besten.",
  },
  {
    party: "AfD",
    currentApproval: 22,
    potentialApproval: 42,
    whatTheyReallyWant: "Kontrolle + nationale Identität + weniger Bevormundung + gehört werden",
    whatGetsThemTo80: [
      "Mehr Netto (Grundfreibetrag, Tarif auf Rädern)",
      "Pflicht-Gesundheitscheck: Der Staat kümmert sich um MICH",
      "Bürgerräte: Endlich wird der 'kleine Mann' gefragt",
      "Firmengründung einfacher: Eigeninitiative statt Abhängigkeit",
      "Gesellschaftsdienst: Gemeinschaft erleben, Sinn finden",
    ],
    keyCompromise: "80% ist unrealistisch. Die AfD-Wählerschaft definiert sich teilweise DURCH Ablehnung des Systems. Aber: Wenn der Staat funktioniert, fair ist und man gehört wird — sinkt der Protest-Anteil. 42% Zustimmung wäre ein Riesenerfolg. Der Rest braucht eine Generation.",
  },
]

export const internationalCeiling = [
  { country: "Dänemark", flag: "🇩🇰", satisfaction: 92, trust: 60, secret: "Flexicurity + Transparenz + 'Janteloven' (Gleichheitskultur)" },
  { country: "Luxemburg", flag: "🇱🇺", satisfaction: 88, trust: 60, secret: "Klein, reich, mehrsprachig, EU-Hauptstadt = Sicherheit + Identität" },
  { country: "Irland", flag: "🇮🇪", satisfaction: 83, trust: 52, secret: "Citizens' Assembly löste die unmöglichen Themen (Abtreibung, Ehe für alle)" },
  { country: "Niederlande", flag: "🇳🇱", satisfaction: 80, trust: 52, secret: "Poldermodell: Konsens-Kultur, alle an einem Tisch, niemand gewinnt alles" },
  { country: "Schweiz", flag: "🇨🇭", satisfaction: 78, trust: 65, secret: "Direkte Demokratie: Die OPTION mitzureden reicht. 700+ Referenden seit 1848." },
  { country: "Finnland", flag: "🇫🇮", satisfaction: 77, trust: 62, secret: "Gleiche Schule für alle. 91% vertrauen der Polizei. Staat als Partner, nicht Feind." },
  { country: "Deutschland", flag: "🇩🇪", satisfaction: 53, trust: 38, secret: "Starke Wirtschaft, aber: Bürokratie, Zwei-Klassen-System, kein Voice-Kanal" },
]
