# FairEint 5.0

**Politik zum Ausprobieren. Und zum Einigen.**

[🚀 Live öffnen](https://mikelninh.github.io/faireint/) · [💻 Quellcode](https://github.com/mikelninh/faireint) · [🔬 Methodik](FAIREINT_5_METHOD.md) · [📐 ursprünglicher 2.0-Plan](FAIREINT_2_PLAN.md)

FairEint ist ein parteiunabhängiges, evidenzorientiertes Bürger-Policy-Lab. Menschen können ein eigenes Steuer- und Investitionspaket bauen, die Grenzen der Simulation sehen, dokumentierte Parteipositionen vergleichen und mehrere Pakete zu einem transparenten Konsensvorschlag zusammenführen.

## Die Grundregel

**Repräsentative Umfragen sind Ground Truth.**

Synthetische Personas oder FairEint-Simulationen dürfen nicht als Aussage darüber präsentiert werden, „was die Bürger wollen“.

FairEint trennt sichtbar:

- **Ground Truth** — repräsentative Befragungen
- **Modelle** — wissenschaftliche oder nachvollziehbare Modellrechnungen
- **Programme / Positionen** — dokumentierte politische Aussagen
- **Parlament** — dokumentierte Anträge, Debatten oder Abstimmungen
- **Simulationen** — FairEint-interne Stress-, Vergleichs- und Konsenswerte

## Was V5 kann

### 2.1 — Evidence Ledger
Jede zentrale Behauptung kann Quelle, Datum, Evidenzklasse, Confidence, Stichprobe und — wo relevant — Auftraggeber zeigen.

Aktuelle Kernbasis:

- Infratest dimap für WDR/ARD, April 2026 — Vermögensteuer und hohe Erbschaften
- ARD-DeutschlandTrend, Mai 2026 — hohe Einkommen und hohe Erbschaften
- IMK / Hans-Böckler-Stiftung, April 2026 — öffentliche Investitionsprioritäten und Finanzierung
- DIW Berlin, 2026 — Vermögensteuer-Modellierung
- Deutscher Bundestag, 2026 — erste getrennte Evidenzschicht zu parlamentarischen Anträgen und Debatten

### 2.5 — Wer zahlt / wer profitiert?
Sechs transparente Haushalts-Archetypen werden als **Stresstest** genutzt. FairEint zeigt getrennt:

- mögliche direkte Steuerexposition
- Passung des gewählten Zusatzbudgets zu plausiblen öffentlichen Prioritäten

Es werden bewusst keine erfundenen individuellen Euro-Gewinne angezeigt.

### 3.0 — 1 / 5 / 10 Jahre
Der aktuelle fiskalische Korridor kann mechanisch auf 1, 5 und 10 Jahre dargestellt werden. Diese Ansicht ist ausdrücklich **keine Makroprognose**; längerfristige Werte sind explorativ.

### 4.0 — Politik-Modus
Aus einem Nutzerpaket entsteht ein druckbares Bürger-Policy-Briefing:

- gewählte Steuer- und Investitionsrichtung
- Top-Budgetprioritäten
- Programm-Nähe mit Quellen
- separate Bundestags-Evidenz
- PDF/Druck via Browser

Programme und parlamentarisches Handeln werden nicht heimlich in einen gemeinsamen Score vermischt.

### 5.0 — Konsens-Lab
Mehrere FairEint-Ergebnislinks können lokal im Browser verglichen werden.

Das Lab zeigt:

- gemeinsame Prioritäten
- Konfliktlinien
- einen transparenten Konsens-Index
- den kleinsten gemeinsamen Kompromiss auf Basis von Median und Budgetdurchschnitt
- einen teilbaren Kompromiss-Link

Der Konsens-Index ist eine **Simulation**, keine repräsentative Umfrage und kein wissenschaftlich validierter Demokratieindikator.

## 3–5-Minuten-Flow

1. repräsentative Ground-Truth-Daten sehen
2. Vermögensteuer, hohe Erbschaften, hohe Einkommen und Investitionsregel wählen
3. 100 Budgetpunkte verteilen
4. Ergebnis und Programm-Nähe ansehen
5. Haushalts-/Zeit-Stresstest öffnen
6. Politik-Briefing erzeugen
7. Paket teilen und mit Freunden im Konsens-Lab vergleichen

## Partei-Match

FairEint ordnet Nutzerentscheidungen und dokumentierte Parteipositionen auf derselben groben Skala ein. Der Prozentwert ist nur eine Ähnlichkeit innerhalb der enthaltenen Dimensionen:

- Vermögensteuer
- Erbschaftsteuer
- hohe Einkommen
- Investitionen / Schuldenregel
- öffentliche Daseinsvorsorge
- Klimaausgaben
- Sicherheitsausgaben

**Nicht vollständig enthalten:** Außenpolitik, Migration, Europa, Bürgerrechte und viele weitere wahlentscheidende Themen.

Der Match ist deshalb **keine Wahlempfehlung**.

## Fiskalische Ehrlichkeit

V5 monetarisiert derzeit nur den vereinfachten Vermögensteuer-Korridor aus der bisherigen DIW-orientierten Modellschicht.

Erbschaft- und Einkommensteuerentscheidungen werden nicht künstlich addiert, solange keine einheitlich geprüften Szenariotabellen integriert sind.

> Eine sichtbare Lücke ist besser als Scheingenauigkeit.

Die vollständigen Formeln und Grenzen stehen in [`FAIREINT_5_METHOD.md`](FAIREINT_5_METHOD.md).

## Architektur

```text
src/
  FairEintV5.tsx          # aktuelle mobile-first Experience
  FairEintV2.tsx          # vorherige Evidence-first Experience
  data/
    v2.ts                 # Ground Truth, Budget, Partei-Positionen
    v5.ts                 # Evidence Ledger, Haushalts-Archetypen, Bundestag
  lib/
    policyEngine.ts       # Partei-Match + Vermögensteuer-Korridor
    v5Engine.ts           # Impact, Zeit, Sharing und Konsens
  App.tsx                 # ursprüngliche FairEint-Version
```

### Versionszugang

- Standard: **V5**
- `?v2=1` — V2
- `?legacy=1` — ursprüngliche FairEint-Version

Alte V2-Paketparameter (`w`, `e`, `i`, `d`, `b`) bleiben lesbar. Neue Share-Links verwenden zusätzlich `view=result`, damit Empfänger direkt beim Ergebnis landen.

## Noch nicht „wissenschaftlich fertig“

Vor formellem wissenschaftlichen oder institutionellen Einsatz sollten insbesondere folgen:

- unabhängiger Review der Partei-Scores
- vollständige maschinenlesbare DIW-Szenariotabellen
- echte Haushalts-/Verteilungsmikrosimulation
- strukturierte Bundestags-Abstimmungsdaten
- Quellen-Snapshots und Versionierung
- Accessibility-/Usability-Tests mit realen Bürger:innen
- externer Review des Konsens-Index

V5 ist damit ein **integrierter, politikfähiger Prototyp**, kein zertifiziertes Prognose- oder Wahlberatungssystem.

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

**FairEint ist parteiunabhängig.** Ziel ist nicht, Menschen zu sagen, was sie wählen sollen, sondern politische Entscheidungen verständlicher, vergleichbarer und überprüfbarer zu machen — und gemeinsame Handlungsmöglichkeiten sichtbar zu machen.

MIT Lizenz — Demokratie sollte Open Source sein.
