# FairEint 2.0

**Politik zum Ausprobieren, nicht nur zum Streiten.**

[🚀 Live öffnen](https://mikelninh.github.io/faireint/) · [💻 Quellcode](https://github.com/mikelninh/faireint) · [📐 Product & Impact Plan](FAIREINT_2_PLAN.md)

FairEint ist ein parteiunabhängiges, evidenzbasiertes Bürger-Policy-Lab. Menschen können in wenigen Minuten ein eigenes Politikpaket bauen: Wer soll mehr beitragen? Wofür soll zusätzlicher finanzieller Spielraum genutzt werden? Und welche dokumentierten Parteipositionen liegen den eigenen Entscheidungen am nächsten?

## Was in 2.0 neu ist

### 1. Repräsentative Umfragen sind Ground Truth
Synthetische Personas sind nicht mehr der Anker für Aussagen wie „Was wollen die Bürger?“. Dafür nutzt FairEint repräsentative Umfragen mit Quelle, Erhebungszeitraum und Stichprobe.

Aktuelle V1-Basis:
- Infratest dimap für WDR/ARD, April 2026 — Vermögensverteilung, Vermögensteuer, Erbschaftsteuer
- ARD-DeutschlandTrend, Mai 2026 — höhere Besteuerung hoher Einkommen und hoher Erbschaften
- IMK / Hans-Böckler-Stiftung, April 2026 — Investitionsprioritäten und Finanzierung
- DIW Berlin, 2026 — Vermögensteuer-Modellierung

### 2. Drei Ebenen bleiben getrennt
- **Ground Truth:** repräsentative Befragungen
- **Modelle:** fiskalische und verteilungsbezogene Schätzungen mit Unsicherheit
- **Simulation:** interaktive Szenarien und Partei-Nähe

Eine Umfrage ist keine Prognose. Eine Modellrechnung ist keine garantierte Einnahme. Ein Partei-Match ist keine Wahlempfehlung.

### 3. 3–5-Minuten-Erlebnis
1. Echte Bürgerdaten sehen
2. Steuer- und Finanzierungsrichtung wählen
3. 100 Budgetpunkte verteilen
4. Ergebnis und Programm-Nähe ansehen
5. Paket per Link mit Freunden teilen

### 4. Transparenter Partei-Match
FairEint ordnet Nutzerentscheidungen und dokumentierte Parteipositionen auf derselben groben Skala ein. Der Score zeigt nur die Nähe in den enthaltenen Politikdimensionen — aktuell u. a. Vermögensteuer, Erbschaftsteuer, hohe Einkommen, Investitionen/Schuldenregel, Daseinsvorsorge, Klima- und Sicherheitsausgaben.

**Nicht enthalten:** viele andere wahlentscheidende Themen wie Außenpolitik, Migration, Europa oder Bürgerrechte. Die Rangliste darf deshalb nicht als vollständige Wahlentscheidung gelesen werden.

### 5. Shareable by design
Die Entscheidungen werden beim Teilen in URL-Parameter geschrieben. Freunde können genau dieses Paket öffnen und danach ihr eigenes bauen.

## Architektur

```text
src/
  FairEintV2.tsx          # mobile-first guided citizen experience
  data/
    v2.ts                 # polls, fiscal metadata, party sources/positions
  lib/
    policyEngine.ts       # revenue corridor + transparent matching logic
  App.tsx                 # legacy FairEint experience
```

Die bisherige FairEint-Version bleibt während der Migration über `?legacy=1` verfügbar.

## Vertrauensregeln

1. Jede wesentliche Zahl bekommt eine Quelle.
2. Bei Umfragen werden Erhebungszeitraum und Stichprobe sichtbar gemacht.
3. Einnahmen werden als Korridor statt als magische Punktzahl gezeigt.
4. Auftraggeber von Studien werden transparent genannt.
5. Partei-Scores sind in Code und Quellen nachvollziehbar.
6. Kein synthetisches Bürgerprofil wird als repräsentative öffentliche Meinung ausgegeben.

## Nächste Schritte

- unabhängiger Review aller Partei-Scores
- maschinenlesbare DIW-Szenariotabellen statt manuell gerundeter Korridore
- Bundestagsabstimmungen als separate Ebene „Was Parteien getan haben“
- mehr repräsentative Umfragen mit sauberer Demografie-/Regionsauswertung
- PolicyEngine/EUROMOD-Mikrosimulation, soweit technisch und methodisch passend
- Politik-Modus mit 1-Seiten-Briefing, Quellenanhang und Umsetzungspfad
- Gruppenmodus: Pakete vergleichen und Konsensvorschläge finden

Siehe [`FAIREINT_2_PLAN.md`](FAIREINT_2_PLAN.md) für die vollständige Roadmap.

## Lokal starten

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Tech

React · TypeScript · Vite · Tailwind CSS · Lucide

---

**FairEint ist parteiunabhängig.** Es soll politische Entscheidungen verständlicher und überprüfbarer machen, nicht Menschen sagen, was sie wählen sollen.

MIT Lizenz — Demokratie sollte Open Source sein.
