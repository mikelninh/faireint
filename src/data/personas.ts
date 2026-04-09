export interface Persona {
  id: string
  emoji: string
  name: string
  age: number
  profile: string
  location: string
  region: 'west' | 'east'
  setting: 'urban' | 'suburban' | 'rural'
  income: number // monthly net household
  party: string
  milieu: string
  weight: number // % of population
  concerns: string[]
}

export const personas: Persona[] = [
  { id: "thomas", emoji: "👔", name: "Thomas", age: 58, profile: "Konservativer Akademiker, Abteilungsleiter", location: "Stuttgart", region: "west", setting: "urban", income: 6500, party: "CDU", milieu: "Konservativ-Gehoben", weight: 5, concerns: ["Steuerlast", "Rentensicherheit", "Rechtsstaatlichkeit"] },
  { id: "claudia", emoji: "👩‍🏫", name: "Claudia", age: 45, profile: "Post-materielle Lehrerin, 2 Kinder", location: "Freiburg", region: "west", setting: "urban", income: 4200, party: "Grüne", milieu: "Postmateriell", weight: 6, concerns: ["Klimapolitik", "Bildungsqualität", "Ungleichheit"] },
  { id: "max", emoji: "💻", name: "Maximilian", age: 33, profile: "Software-Ingenieur, Tech-Performer", location: "München", region: "west", setting: "urban", income: 5800, party: "FDP", milieu: "Performer", weight: 5, concerns: ["Digitalisierung", "Steuerreform", "Bürokratieabbau"] },
  { id: "lena", emoji: "🎨", name: "Lena", age: 27, profile: "Freelance-Designerin, WG", location: "Berlin", region: "east", setting: "urban", income: 2400, party: "Grüne/Volt", milieu: "Expeditiv", weight: 5, concerns: ["Miete", "Freelancer-Absicherung", "Kulturförderung"] },
  { id: "stefan-julia", emoji: "👨‍👩‍👧‍👦", name: "Stefan & Julia", age: 37, profile: "Vorstadt-Familie, 2 Kinder, Doppelverdiener", location: "Hamburg-Umland", region: "west", setting: "suburban", income: 4800, party: "CDU/Swing", milieu: "Adaptiv-Pragmatisch", weight: 6, concerns: ["Kita-Plätze", "Hypothekenzinsen", "Work-Life-Balance"] },
  { id: "monika", emoji: "👵", name: "Monika", age: 71, profile: "Rentnerin, Bürgerliche Mitte", location: "Wuppertal", region: "west", setting: "urban", income: 1650, party: "CDU", milieu: "Bürgerliche Mitte", weight: 5, concerns: ["Arzttermine", "Rente", "Sicherheit"] },
  { id: "dieter", emoji: "🧓", name: "Dieter", age: 76, profile: "Rentner, pflegt Ehefrau, Dorf", location: "Niedersachsen", region: "west", setting: "rural", income: 1400, party: "CDU", milieu: "Traditionell", weight: 4, concerns: ["Landarzt-Mangel", "Pflegekosten", "ÖPNV"] },
  { id: "kevin", emoji: "😔", name: "Kevin", age: 41, profile: "Bürgergeld, geschieden", location: "Gelsenkirchen", region: "west", setting: "urban", income: 1100, party: "BSW", milieu: "Prekär", weight: 4, concerns: ["Essen/Energie bezahlen", "Respekt", "Jobchancen"] },
  { id: "michelle", emoji: "🛍️", name: "Michelle", age: 24, profile: "Einzelhandel + Minijob", location: "Dortmund", region: "west", setting: "urban", income: 1800, party: "Nichtwähler", milieu: "Konsum-Hedonistisch", weight: 4, concerns: ["Niedriglohn", "Freizeit leisten", "Konsumpreise"] },
  { id: "ayse", emoji: "💊", name: "Ayşe", age: 34, profile: "Apothekerin, türkisch-deutsch, 1 Kind", location: "Duisburg", region: "west", setting: "urban", income: 3200, party: "SPD", milieu: "Adaptiv-Pragmatisch", weight: 4, concerns: ["Diskriminierung", "Kita", "Doppelte Staatsbürgerschaft"] },
  { id: "ahmad", emoji: "⚡", name: "Ahmad", age: 29, profile: "Syrischer Geflüchteter, Azubi Elektriker", location: "Hannover", region: "west", setting: "urban", income: 2000, party: "—", milieu: "Transition", weight: 2, concerns: ["Aufenthaltssicherheit", "Berufsanerkennung", "Familiennachzug"] },
  { id: "olena", emoji: "🇺🇦", name: "Olena", age: 42, profile: "Ukrainische Geflüchtete, 2 Kinder", location: "Leipzig", region: "east", setting: "urban", income: 1400, party: "—", milieu: "Transition", weight: 1.5, concerns: ["Bleibeperspektive", "Schulintegration", "Anerkennung Buchhalter-Diplom"] },
  { id: "frank", emoji: "🏭", name: "Frank", age: 52, profile: "Chemiewerk-Operator, Ost", location: "Bitterfeld", region: "east", setting: "rural", income: 2200, party: "AfD", milieu: "Bürgerliche Mitte/Prekär", weight: 4, concerns: ["Lohngefälle Ost/West", "Industriesterben", "Abgehängt-Gefühl"] },
  { id: "sandra", emoji: "🚲", name: "Sandra", age: 31, profile: "Single-Mutter, Gig-Lieferfahrerin", location: "Bremen", region: "west", setting: "urban", income: 1600, party: "Linke", milieu: "Prekär/Adaptiv", weight: 3, concerns: ["Kita (Schichtzeiten!)", "Gig-Worker-Rechte", "Miete"] },
  { id: "heinrich", emoji: "🏰", name: "Prof. Heinrich", age: 67, profile: "Unternehmer, 85 Mitarbeiter", location: "Düsseldorf", region: "west", setting: "suburban", income: 12000, party: "FDP/CDU", milieu: "Performer/Konservativ", weight: 2, concerns: ["Vermögensteuer", "Erbschaftsteuer", "Standort DE"] },
  { id: "lea", emoji: "📚", name: "Lea", age: 22, profile: "Studentin, BAföG + Minijob", location: "Heidelberg", region: "west", setting: "urban", income: 950, party: "Grüne", milieu: "Expeditiv/Postmateriell", weight: 3, concerns: ["Wohnkosten Unistadt", "BAföG-Reform", "Therapiewartezeit"] },
  { id: "manfred", emoji: "♿", name: "Manfred", age: 59, profile: "Schwerbehindert, Erwerbsminderungsrente", location: "Kassel", region: "west", setting: "urban", income: 1300, party: "SPD", milieu: "Traditionell/Bürgerlich", weight: 3, concerns: ["Rente reicht nicht", "Barrierefreiheit", "Facharzt-Zugang"] },
  { id: "fatima", emoji: "🧕", name: "Fatima", age: 48, profile: "Konservative Migrantin, Hausfrau, 4 Kinder", location: "Berlin-Neukölln", region: "east", setting: "urban", income: 1800, party: "Nichtwähler", milieu: "Traditionell (Migration)", weight: 2, concerns: ["Bildung der Kinder", "Diskriminierung", "Lebensmittelpreise"] },
  { id: "jan", emoji: "🌾", name: "Jan", age: 44, profile: "Bauer, Ackerbau, 2 Kinder", location: "MV-Dorf", region: "east", setting: "rural", income: 3000, party: "CDU/AfD", milieu: "Traditionell/Bürgerlich", weight: 2, concerns: ["EU-Agrarpolitik", "Diesel/Dünger-Kosten", "Landflucht"] },
  { id: "alex", emoji: "🏳️‍🌈", name: "Alex", age: 30, profile: "Non-binary, UX-Designer*in", location: "Köln", region: "west", setting: "urban", income: 3400, party: "Grüne", milieu: "Expeditiv/Sozialökol.", weight: 2, concerns: ["Trans-Gesundheitsversorgung", "Antidiskriminierung", "Queere Familienrechte"] },
  { id: "renate", emoji: "💜", name: "Renate", age: 62, profile: "Pflegende Angehörige, Teilzeit-Pflegehelferin", location: "Passau", region: "west", setting: "suburban", income: 1900, party: "CSU", milieu: "Bürgerliche Mitte", weight: 3, concerns: ["Pflegesystem-Reform", "Auszeit für Pflegende", "Eigene Rentenlücke"] },
  { id: "pawel", emoji: "🇵🇱", name: "Pawel", age: 35, profile: "Polnischer Saisonarbeiter, Fleischwerk", location: "Cloppenburg", region: "west", setting: "rural", income: 1500, party: "—", milieu: "—", weight: 1, concerns: ["Arbeitsbedingungen", "Lohndiebstahl", "Unterkunftsqualität"] },
  { id: "juergen", emoji: "📖", name: "Jürgen", age: 50, profile: "Funktionaler Analphabet, Lagerarbeiter", location: "Magdeburg", region: "east", setting: "urban", income: 1700, party: "AfD", milieu: "Prekär/Konsum-Hed.", weight: 3, concerns: ["Digitalisierung macht Angst", "Jobsicherheit", "Scham/Stigma"] },
  { id: "maria", emoji: "📞", name: "Maria", age: 82, profile: "Allein, kein Internet, Grundsicherung", location: "Trier", region: "west", setting: "urban", income: 1200, party: "CDU", milieu: "Traditionell", weight: 3, concerns: ["Einsamkeit", "Bürokratie ohne Internet", "Medikamentenkosten"] },
]

// Policy impact simulation
export interface PolicyReaction {
  personaId: string
  approval: number // 0-100
  reason: string
}

export interface PolicyScenario {
  id: string
  emoji: string
  title: string
  description: string
  annualCost: number // Mrd €
  annualSaving: number
  reactions: PolicyReaction[]
}

export const policyScenarios: PolicyScenario[] = [
  {
    id: "schulessen",
    emoji: "🍽️",
    title: "Kostenloses veganes Schulessen für alle",
    description: "100% pflanzlich, kostenlos, für jedes Kind. Ernährungsbildung wie Japan (Shokuiku). Fleisch optional mit Aufpreis — aber unnötig, wenn Kinder echte Ernährung lernen. Tierwohl + Gesundheit + Umwelt in einem.",
    annualCost: 4.1,
    annualSaving: 8.2,
    reactions: [
      { personaId: "thomas", approval: 75, reason: "€4 Mrd. klingt viel — aber €8 Mrd. Ersparnis bei Gesundheitskosten überzeugt mich." },
      { personaId: "claudia", approval: 98, reason: "Pflanzlich, kostenlos, für alle. So geht Gleichheit." },
      { personaId: "stefan-julia", approval: 95, reason: "Spart €150/Monat und die Kinder essen endlich gesund." },
      { personaId: "kevin", approval: 99, reason: "Mein Kind hat endlich täglich eine warme Mahlzeit. Sicher." },
      { personaId: "ayse", approval: 95, reason: "Pflanzlich = automatisch halal. Perfekte Lösung!" },
      { personaId: "fatima", approval: 95, reason: "Vegan löst alle religiösen Essensregeln. Brilliant." },
      { personaId: "frank", approval: 78, reason: "Alle kriegen es, keiner wird bevorzugt. Das ist fair." },
      { personaId: "jan", approval: 72, reason: "Kann mein Hof das Gemüse liefern? Dann bin ich voll dabei." },
      { personaId: "heinrich", approval: 60, reason: "ROI 1:2 — ok, das rechnet sich. Bin überzeugt." },
      { personaId: "lea", approval: 97, reason: "Vegan + kostenlos + Bildung = bestes Gesetz ever." },
      { personaId: "maria", approval: 80, reason: "Kinder sollen gut essen. Das ist doch selbstverständlich." },
      { personaId: "juergen", approval: 95, reason: "Mein Sohn isst oft nur Toast. Das rettet Familien wie uns." },
    ],
  },
  {
    id: "praevention",
    emoji: "🏥",
    title: "Pflicht-Gesundheitscheck ab 35 (wie Japan)",
    description: "Jährlicher Check für alle 35-74-Jährigen. Krankenkassen bekommen Anreize für gesündere Versicherte.",
    annualCost: 2.5,
    annualSaving: 18.0,
    reactions: [
      { personaId: "thomas", approval: 75, reason: "Sinnvoll — Prävention spart langfristig Milliarden." },
      { personaId: "max", approval: 80, reason: "Datengetrieben, effizient. Warum machen wir das nicht längst?" },
      { personaId: "monika", approval: 85, reason: "Endlich kümmert sich jemand BEVOR ich krank bin." },
      { personaId: "frank", approval: 72, reason: "Ok, aber ich will nicht gezwungen werden." },
      { personaId: "kevin", approval: 65, reason: "Kostenlos? Dann ja. Aber ich geh ungern zum Arzt." },
      { personaId: "renate", approval: 90, reason: "Für mich als Pflegende ist das überlebenswichtig!" },
      { personaId: "juergen", approval: 55, reason: "Pflicht? Hmm. Aber wenn mein Blutdruck entdeckt wird..." },
      { personaId: "heinrich", approval: 70, reason: "Weniger Krankentage bei meinen Mitarbeitern? Ja bitte." },
    ],
  },
  {
    id: "gkvpkv",
    emoji: "⚕️",
    title: "GKV + PKV zusammenführen (wie Taiwan)",
    description: "Ein System für alle. Keine Zwei-Klassen-Medizin. Verwaltungskosten von 5-6% auf 2% senken.",
    annualCost: 2.0,
    annualSaving: 7.0,
    reactions: [
      { personaId: "thomas", approval: 35, reason: "Verliere meine PKV-Vorteile. Ungerecht." },
      { personaId: "heinrich", approval: 20, reason: "Ich zahle mehr und warte länger. Nein danke." },
      { personaId: "monika", approval: 88, reason: "Endlich gleich behandelt wie Privatpatienten!" },
      { personaId: "kevin", approval: 92, reason: "Gleicher Arzt für alle? Das ist Gerechtigkeit." },
      { personaId: "manfred", approval: 95, reason: "Ich warte 3 Monate auf den Facharzt. Das muss aufhören." },
      { personaId: "claudia", approval: 85, reason: "Solidarisch und effizient. Überfällig." },
      { personaId: "max", approval: 45, reason: "Effizient ja, aber ich will Wahlfreiheit behalten." },
      { personaId: "sandra", approval: 90, reason: "Als Gig-Workerin falle ich durchs Raster. Ein System hilft." },
    ],
  },
  {
    id: "vermoegensteuer",
    emoji: "💰",
    title: "Vermögensabgabe 0,5% ab €5 Mio.",
    description: "Wie Norwegen + Schweiz. Bringt ~€10 Mrd./Jahr. Finanziert Schulessen, Pflege, Prävention.",
    annualCost: 0.5,
    annualSaving: 10.0,
    reactions: [
      { personaId: "thomas", approval: 30, reason: "Leistungsfeindlich. Wer hart arbeitet, wird bestraft." },
      { personaId: "heinrich", approval: 10, reason: "Enteignung! Ich wandere aus." },
      { personaId: "claudia", approval: 85, reason: "Norwegen + Schweiz haben es. Die sind nicht sozialistisch." },
      { personaId: "kevin", approval: 95, reason: "Die Reichen haben genug. Endlich fair." },
      { personaId: "frank", approval: 75, reason: "Wenn's wirklich nur die Superreichen trifft — bin dabei." },
      { personaId: "sandra", approval: 90, reason: "€10 Mrd. für Schulessen und Pflege? Sofort." },
      { personaId: "max", approval: 25, reason: "Kapital flieht. Kurzfristiges Denken." },
      { personaId: "lea", approval: 88, reason: "67% des Vermögens beim Top-10%. Das ist nicht normal." },
      { personaId: "jan", approval: 60, reason: "Solange mein Hof nicht betroffen ist — ok." },
      { personaId: "manfred", approval: 80, reason: "Die sollen zahlen. Ich lebe von €1.300." },
    ],
  },
  {
    id: "digitalverwaltung",
    emoji: "📱",
    title: "Digitale Verwaltung (Estland-Modell)",
    description: "Ein System für alles: Steuern in 3 Min, Firmengründung in 24h, Bürgeramt-Termin in 48h, du siehst wer deine Daten abruft.",
    annualCost: 3.0,
    annualSaving: 5.0,
    reactions: [
      { personaId: "max", approval: 98, reason: "ENDLICH. Warum hat das 20 Jahre gedauert?" },
      { personaId: "thomas", approval: 85, reason: "Effizienz. Weniger Bürokratie. Absolut dafür." },
      { personaId: "heinrich", approval: 95, reason: "Firmengründung in 24h statt 10 Tagen? Gestern!" },
      { personaId: "lena", approval: 90, reason: "Als Freelancerin: Steuern in 3 Minuten = Lebensretter." },
      { personaId: "maria", approval: 15, reason: "Ich habe kein Internet. Was wird aus mir?" },
      { personaId: "juergen", approval: 20, reason: "Ich kann die Formulare kaum lesen. Digital macht es schlimmer." },
      { personaId: "dieter", approval: 25, reason: "Zu alt für Computer. Persönlicher Kontakt muss bleiben." },
      { personaId: "ahmad", approval: 75, reason: "Digital ist gut — aber in welcher Sprache?" },
    ],
  },
  {
    id: "vermoegensteuer",
    emoji: "💰",
    title: "Vermögensteuer 0,5% ab €5 Mio.",
    description: "Wie Norwegen und die Schweiz: 0,5% jährlich auf Nettovermögen ab €5 Mio. Betrifft ~0,3% der Bevölkerung. Einnahmen: €10-15 Mrd./Jahr. Finanziert Schulessen, Pflege, Prävention.",
    annualCost: 0.5,
    annualSaving: 12.0,
    reactions: [
      { personaId: "thomas", approval: 55, reason: "Schweiz macht's seit Jahrzehnten — wirtschaftlich stabil. Aber Freibetrag muss hoch genug sein." },
      { personaId: "claudia", approval: 92, reason: "Endlich. Top 10% besitzen 67% — 0,5% ist das Mindeste." },
      { personaId: "max", approval: 40, reason: "Kapitalflucht-Risiko. Nur wenn EU-weit koordiniert." },
      { personaId: "lena", approval: 88, reason: "Ich hab €200 am Monatsende. Die haben €5 Mio. — 0,5% ist fair." },
      { personaId: "stefan-julia", approval: 72, reason: "Betrifft uns nicht (unter €5 Mio.). Wenn es Kita und Schulessen finanziert — ja." },
      { personaId: "kevin", approval: 95, reason: "Wer Millionen hat und nichts abgibt, während ich nicht weiß wie ich Strom bezahle? Klar." },
      { personaId: "michelle", approval: 85, reason: "Klingt fair. Die merken das doch kaum." },
      { personaId: "monika", approval: 65, reason: "Wenn es wirklich für Pflege und Rente geht — ja. Aber nicht verschwenden." },
      { personaId: "heinrich", approval: 15, reason: "Ich habe 40 Jahre gearbeitet für mein Vermögen. Das ist leistungsfeindlich." },
      { personaId: "frank", approval: 80, reason: "Die Reichen zahlen weniger als ich. Das muss sich ändern." },
      { personaId: "jan", approval: 55, reason: "Wenn mein Hof verschont bleibt (Freibetrag) — ok." },
      { personaId: "sandra", approval: 92, reason: "€10 Mrd. für Kitas und Schulessen? Sofort." },
      { personaId: "fatima", approval: 78, reason: "Im Islam ist Zakat Pflicht — 2,5%. 0,5% ist ja noch wenig." },
      { personaId: "manfred", approval: 88, reason: "Meine Rente reicht nicht, die haben Millionen. Gerechtigkeit." },
      { personaId: "maria", approval: 70, reason: "Mein Mann hat auch immer gesagt: wer viel hat, soll teilen." },
      { personaId: "lea", approval: 95, reason: "Deutschland hat die höchste Vermögensungleichheit der Eurozone. 0,5% ist Minimum." },
      { personaId: "alex", approval: 90, reason: "Vermögen = Macht. Ungleichheit verstärkt jede andere Diskriminierung." },
      { personaId: "dieter", approval: 60, reason: "Soll aber wirklich bei den Reichen ankommen, nicht bei der Mittelschicht." },
      { personaId: "ayse", approval: 82, reason: "Meine Eltern sind mit nichts gekommen. Chancengleichheit braucht Umverteilung." },
      { personaId: "juergen", approval: 75, reason: "Hab zwar nix, aber die könnten mal was abgeben." },
    ],
  },
  {
    id: "ubs",
    emoji: "🏠",
    title: "Universal Basic Services (UBS)",
    description: "Statt Geld verteilen: Grunddienste für alle kostenlos. Schulessen, ÖPNV u25/ü65, Kinderbetreuung, Basisenergie. Kostet €30-45 Mrd. netto — 1/10 von UBI. Spart €70-110 Mrd. durch weniger Ungleichheitskosten.",
    annualCost: 45.0,
    annualSaving: 90.0,
    reactions: [
      { personaId: "thomas", approval: 62, reason: "€45 Mrd. ist viel. Aber die Rechnung mit €90 Mrd. Ersparnis — wenn das stimmt, rechnet es sich." },
      { personaId: "claudia", approval: 95, reason: "Wien, Skandinavien, Singapur — überall funktioniert es. Warum nicht hier?" },
      { personaId: "max", approval: 45, reason: "Klingt nach Planwirtschaft. Lieber Geld geben, Leute entscheiden selbst." },
      { personaId: "lena", approval: 90, reason: "Gratis ÖPNV, kostenlose Kita — das verändert mein ganzes Budget." },
      { personaId: "stefan-julia", approval: 92, reason: "Kita €0 + Schulessen €0 + ÖPNV €0 = €400/Monat gespart. Game changer." },
      { personaId: "kevin", approval: 98, reason: "Endlich ein System das mir wirklich hilft, statt Formulare ausfüllen." },
      { personaId: "monika", approval: 75, reason: "Gratis Bus ab 65? Endlich komme ich zum Arzt ohne €49/Monat." },
      { personaId: "dieter", approval: 70, reason: "Auf dem Land haben wir keinen ÖPNV. Das muss mitgedacht werden." },
      { personaId: "heinrich", approval: 25, reason: "Wer bezahlt das? Mittelstand wird wieder geschröpft." },
      { personaId: "frank", approval: 82, reason: "Alle kriegen das Gleiche, egal ob Ost oder West. Das ist fair." },
      { personaId: "sandra", approval: 97, reason: "Kita zu meinen Schichtzeiten + gratis = ich kann endlich planen." },
      { personaId: "fatima", approval: 90, reason: "Vier Kinder, alles kostenlos? Bildung, Essen, Transport? Ja!" },
      { personaId: "ahmad", approval: 85, reason: "Integration durch Zugang, nicht durch Formulare. Richtig." },
      { personaId: "manfred", approval: 88, reason: "Barrierefreier ÖPNV + Gesundheitsversorgung = mein Leben wird leichter." },
      { personaId: "maria", approval: 80, reason: "Gratis Bus und warmes Essen für Senioren — das hätte mein Mann sich gewünscht." },
      { personaId: "lea", approval: 93, reason: "UBS kostet 1/10 von UBI und liefert mehr pro Euro. Die Forschung ist klar." },
      { personaId: "pawel", approval: 70, reason: "Gilt das auch für Saisonarbeiter? Wenn ja — sehr gut." },
      { personaId: "renate", approval: 85, reason: "Pflegende Angehörige brauchen kostenlose Entlastung. UBS liefert das." },
    ],
  },
  {
    id: "erbschaft",
    emoji: "🏛️",
    title: "Erbschaftsteuer: Schlupflöcher schließen",
    description: "Betriebsvermögensprivileg deckeln bei €50 Mio. (aktuell unbegrenzt). Effektiver Steuersatz von 2,3% auf 15%+ für Großvermögen. Freibeträge für Normalvermögen bleiben. Einnahmen: €5-10 Mrd./Jahr.",
    annualCost: 0.2,
    annualSaving: 7.5,
    reactions: [
      { personaId: "thomas", approval: 70, reason: "€50 Mio. Freibetrag ist großzügig. Schlupflöcher schließen — ja." },
      { personaId: "claudia", approval: 88, reason: "2,3% effektiv auf Milliardenvermögen? Das ist doch ein Witz. Reform überfällig." },
      { personaId: "max", approval: 50, reason: "Familienunternehmen schützen, aber Stiftungstricks stoppen — finde ich ok." },
      { personaId: "kevin", approval: 90, reason: "Die erben Milliarden steuerfrei. Ich erbe Schulden." },
      { personaId: "heinrich", approval: 20, reason: "Mein Betrieb ist 120 Mio. wert — soll ich verkaufen um Steuern zu zahlen?" },
      { personaId: "stefan-julia", approval: 75, reason: "Unser Haus (€400k) ist eh unter dem Freibetrag. Betrifft uns nicht." },
      { personaId: "frank", approval: 85, reason: "Dynastien wie die Quandts zahlen quasi nichts. Wo ist da Leistung?" },
      { personaId: "sandra", approval: 92, reason: "Niemand hat sich 10 Milliarden verdient. Das ist geerbte Macht." },
      { personaId: "jan", approval: 45, reason: "Wenn mein Hof als Betriebsvermögen geschützt bleibt — ok. Sonst nein." },
      { personaId: "lea", approval: 95, reason: "Piketty hat Recht: r > g. Ohne Erbschaftsteuer wächst Ungleichheit ewig." },
      { personaId: "fatima", approval: 75, reason: "Im Islam gibt es feste Erbregeln — aber auch Pflicht zum Teilen (Zakat)." },
      { personaId: "monika", approval: 60, reason: "Mein Häuschen soll an die Kinder gehen — aber Milliarden steuerfrei? Nein." },
    ],
  },
]

export function simulatePolicy(scenarioId: string): { approval: number; label: string } {
  const scenario = policyScenarios.find(s => s.id === scenarioId)
  if (!scenario) return { approval: 0, label: "?" }

  // Weight reactions by persona population weight
  let totalWeight = 0
  let weightedApproval = 0
  for (const reaction of scenario.reactions) {
    const persona = personas.find(p => p.id === reaction.personaId)
    if (persona) {
      weightedApproval += reaction.approval * persona.weight
      totalWeight += persona.weight
    }
  }
  const approval = Math.round(weightedApproval / totalWeight)
  const label = approval >= 70 ? "Breite Zustimmung" : approval >= 50 ? "Knappe Mehrheit" : "Umstritten"
  return { approval, label }
}
