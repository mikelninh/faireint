export interface Innovation {
  id: string
  emoji: string
  title: string
  oneLiner: string
  problem: string
  solution: string
  howItWorks: string[]
  exists: string // where does something similar exist?
  impact: 'transformativ' | 'hoch' | 'mittel'
  feasibility: 'sofort' | '1-2 Jahre' | 'GG-Änderung'
  techNeeded: string
}

export const innovations: Innovation[] = [
  {
    id: "gitlaw",
    emoji: "📝",
    title: "GitLaw — Gesetze wie Code",
    oneLiner: "Jede Gesetzesänderung getrackt, jeder Einfluss sichtbar, jeder Bürger kann die Geschichte lesen.",
    problem: "Gesetze werden hinter verschlossenen Türen geändert. Niemand weiß, wer welche Klausel eingefügt hat oder welcher Lobbyist dahintersteckt.",
    solution: "Versionskontrolle für Gesetze — wie GitHub für Software. Jede Änderung hat einen Autor, einen Zeitstempel und eine Begründung.",
    howItWorks: [
      "Jedes Gesetz öffentlich auf einer Plattform — jede Änderung getrackt mit Autor + Begründung",
      "Bürger können jeden Absatz kommentieren. Automatischer Diff zeigt: was hat sich geändert?",
      "Lobbying-Register verlinkt: Treffen am Montag + Amendment am Freitag = automatisches Flag",
    ],
    exists: "Frankreich: lafabriquedelaloi.fr trackt Amendments. Taiwan g0v: Prototyp. Aber: KEIN Land hat vollständige Gesetzes-Versionskontrolle.",
    impact: "transformativ",
    feasibility: "sofort",
    techNeeded: "Git + Markdown + Web-Interface. Alles existiert. Kostet fast nichts.",
  },
  {
    id: "constituency",
    emoji: "📊",
    title: "Wähler-Dashboard für Abgeordnete",
    oneLiner: "Jeder Abgeordnete sieht LIVE: Was denken meine Wähler? Und wie habe ich abgestimmt?",
    problem: "Abgeordnete wissen nicht, was ihre 200.000+ Wähler wirklich denken. Sie verlassen sich auf Lobbyisten, Medien und ihre Filterblase.",
    solution: "Ein Dashboard das zeigt: Wähler-Meinung zu jedem Thema, eigenes Abstimmungsverhalten, und den Gap dazwischen.",
    howItWorks: [
      "500-1.000 verifizierte Wähler pro Wahlkreis beantworten wöchentlich 2-3 Fragen (Pol.is-Format)",
      "Dashboard: 'Ihre Wähler sagen 72% Ja zu X. Sie haben Nein gestimmt.' — öffentlich einsehbar",
      "Transparenz-Score pro Abgeordneter: Wie gut vertritt er/sie die Wähler?",
    ],
    exists: "Nichts Vergleichbares existiert. Pol.is (Taiwan) + StemWijzer (NL) sind Teile davon. Aber kein permanentes System.",
    impact: "transformativ",
    feasibility: "1-2 Jahre",
    techNeeded: "Pol.is (open source) + Verifizierungssystem + Dashboard. Machbar.",
  },
  {
    id: "generations",
    emoji: "👶→👴",
    title: "Generationen-Score für jedes Gesetz",
    oneLiner: "Jedes Gesetz bekommt einen öffentlichen Fairness-Score: Wer profitiert? Kinder, Junge, Mittelalte, Ältere, Ungeborene?",
    problem: "Politiker bevorzugen Wähler die JETZT wählen. Kinder und Ungeborene haben keine Stimme. Schulden und Klimakosten werden verschoben.",
    solution: "Pflicht-Score für jedes Gesetz, erstellt von einem unabhängigen Büro. Ähnlich wie der Haushaltsausschuss den Preis berechnet.",
    howItWorks: [
      "Jedes Gesetz wird auf 5 Altersgruppen modelliert: Kinder, Junge, Mittlere, Ältere, Ungeborene",
      "Score wird VOR der Abstimmung veröffentlicht — Pflicht, nicht optional",
      "Beispiel: 'Rentenerhöhung +4,24%' → Ältere: +8, Ungeborene: -6. Die Öffentlichkeit sieht die Rechnung.",
    ],
    exists: "Wales: Well-being of Future Generations Act (2015) — Framework aber kein Score. Finnland: Committee for the Future. Kein Land hat numerischen Score.",
    impact: "hoch",
    feasibility: "1-2 Jahre",
    techNeeded: "Demografisches Modell + Schulden-Projektion + Klima-Impact. Methodisch anspruchsvoll aber machbar.",
  },
  {
    id: "ai-deliberation",
    emoji: "🤖",
    title: "AI Deliberation Facilitator",
    oneLiner: "KI die Debatten VERBESSERT statt sie zu ersetzen — Missverständnisse aufdecken, Konsens finden, Brücken bauen.",
    problem: "In politischen Debatten reden Menschen aneinander vorbei. Gleiche Worte, verschiedene Bedeutungen. Emotionen statt Argumente.",
    solution: "Ein LLM das in Echtzeit: definitionale Missverständnisse aufdeckt, jede Position fair zusammenfasst, und Kompromiss-Formulierungen vorschlägt.",
    howItWorks: [
      "Erkennt Missverständnisse in Echtzeit: 'Ihr meint verschiedene Dinge mit Freiheit'",
      "Fasst jede Position fair zusammen (Steel-Man) und findet Brücken-Statements die beide Seiten akzeptieren",
      "Kein Entscheider — ein Kommunikations-Werkzeug. Macht Debatten produktiv statt destruktiv.",
    ],
    exists: "Pol.is findet Konsens-Cluster automatisch (Taiwan). Aber: kein LLM-basiertes Facilitation-Tool existiert in der Governance. Wir wären die Ersten.",
    impact: "hoch",
    feasibility: "sofort",
    techNeeded: "Claude/GPT API + Deliberationsplattform-Integration. Die Technologie ist da.",
  },
  {
    id: "lobbying-trace",
    emoji: "🔍",
    title: "Lobbying mit Einfluss-Tracing",
    oneLiner: "Jeder Kontakt zwischen Lobbyist und Abgeordnetem geloggt. Verdächtige Timelines automatisch geflaggt.",
    problem: "EU Transparenz-Register und Bundeslobbyregister existieren — aber sie zeigen nicht, welche Klausel durch welches Meeting beeinflusst wurde.",
    solution: "Strukturierte Datenbank: Meeting am Montag + Amendment am Freitag das dem Positionspapier ähnelt = automatisches Flag.",
    howItWorks: [
      "Jeder Kontakt zwischen Lobbyist und Abgeordnetem wird geloggt — Meetings, E-Mails, Anrufe",
      "KI vergleicht Lobbying-Papiere mit Amendments: '§14 ist zu 87% identisch mit dem BDI-Papier'",
      "Öffentlich einsehbar. Kein Verbot — nur Transparenz. Die Sonne ist das beste Desinfektionsmittel.",
    ],
    exists: "Nichts Vergleichbares. EU Transparenz-Register + US FARA sind Kontakt-Listen ohne Inhalts-Analyse. Taiwan kommt am nächsten (Audrey Tang's Radikal-Transparenz).",
    impact: "transformativ",
    feasibility: "1-2 Jahre",
    techNeeded: "NLP für Textvergleich + Lobby-Register-API + Timeline-Analyse. Technisch machbar, politisch schwer.",
  },
  {
    id: "policy-engine",
    emoji: "🧮",
    title: "PolicyEngine + AI = Bürger-Simulator",
    oneLiner: "'Was passiert wenn wir den Mindestlohn auf €15 erhöhen?' — sofort simuliert, für jeden verständlich.",
    problem: "Niemand versteht die Auswirkungen von Gesetzen. Nicht Bürger, nicht Journalisten, oft nicht mal Abgeordnete.",
    solution: "PolicyEngine (UK/US existiert bereits) + deutsches Steuer/Sozial-Modell + LLM-Interface für natürliche Sprache.",
    howItWorks: [
      "Frag in normaler Sprache: 'Was kostet kostenloses Schulessen?' → sofort Kosten + Verteilung + Langzeiteffekt",
      "24 Personas zeigen ihre Reaktion. Vergleich mit Ländern die es schon machen.",
      "Jeder kann es nutzen: Bürger, Schüler, Journalisten, Abgeordnete. Demokratie zum Anfassen.",
    ],
    exists: "PolicyEngine.org (UK/US) existiert — ohne AI-Interface und ohne deutsche Daten. Wir bauen die deutsche Version mit AI.",
    impact: "hoch",
    feasibility: "1-2 Jahre",
    techNeeded: "Deutsches Mikrosimulationsmodell + Claude API + Frontend. Das aufwändigste der 7 Projekte.",
  },
  {
    id: "sortition",
    emoji: "🎲",
    title: "Permanente Bürger-Kammer",
    oneLiner: "200 zufällig ausgewählte Bürger. Bezahlt. 2 Jahre. Echtes Veto-Recht bei Gesetzen die zukünftige Generationen belasten.",
    problem: "Bürgerräte sind einmalig und unverbindlich. Die Ergebnisse versanden. Bürger investieren Zeit und sehen keinen Impact — das zerstört Vertrauen.",
    solution: "Permanente zweite Kammer (neben Bundesrat), besetzt durch Los. Kein Ersatz für den Bundestag — eine Ergänzung.",
    howItWorks: [
      "200 Bürger per Los, bezahlt (€4.000/Monat), 2 Jahre Amtszeit — wie Geschworene, aber für Gesetze",
      "Veto-Recht bei Gesetzen die zukünftige Generationen belasten (Generationen-Score negativ)",
      "Kann durch 2/3-Mehrheit im Bundestag überstimmt werden. Ostbelgien macht's seit 2019 — wir skalieren es.",
    ],
    exists: "Ostbelgien: permanenter Bürgerrat (24 Personen), seit 2019. Aber: kein Veto-Recht, nur beratend. Wir gehen weiter.",
    impact: "transformativ",
    feasibility: "GG-Änderung",
    techNeeded: "Keine Tech — nur politischer Wille. Das billigste und wirkungsvollste aller 7 Projekte.",
  },
]
