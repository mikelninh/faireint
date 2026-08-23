# FairEint 5.1

**Politik zum Ausprobieren. Und zum Einigen.**

[🚀 FairEint](https://mikelninh.github.io/faireint/) · [🔎 Reality Lab](https://mikelninh.github.io/faireint/?reality=1) · [🧭 Policy Optimizer](https://mikelninh.github.io/faireint/?optimizer=1) · [🧑‍🏫 Workshop Mode](https://mikelninh.github.io/faireint/?workshop=1) · [💰 DIW 1%-Lab](https://mikelninh.github.io/faireint/?diw=1) · [🔬 Methodik](FAIREINT_5_METHOD.md)

FairEint ist ein parteiunabhängiges, evidenzorientiertes Bürger-Policy-Lab. Menschen bauen ein Steuer- und Investitionspaket, prüfen Quellen und Nebenwirkungen, vergleichen dokumentierte politische Positionen und können mehrere Pakete zu einem transparenten Konsensvorschlag zusammenführen.

## Grundregel

**Repräsentative Umfragen sind Ground Truth.**

FairEint trennt sichtbar:

- **Ground Truth** — repräsentative Befragungen
- **veröffentlichte Mikrosimulation** — z. B. ZEW-EviSTA/SOEP oder DIW
- **Modelle** — wissenschaftliche oder nachvollziehbare Modellrechnungen
- **Programme / Positionen** — dokumentierte politische Aussagen
- **Parlament** — dokumentierte Anträge, Debatten oder Abstimmungen
- **Simulationen** — FairEint-interne Stress-, Vergleichs-, Optimizer- und Konsenswerte

Eine FairEint-Heuristik darf nie als repräsentative Meinung oder wissenschaftlich bewiesenes Optimum dargestellt werden.

## V2.1 → V5.1

### 2.1 — Evidence Ledger
Quelle, Datum, Evidenzklasse, Confidence, Stichprobe und — wo relevant — Auftraggeber werden sichtbar.

### 2.5 — Wer zahlt / wer profitiert?
Der Hauptflow nutzt transparente Haushalts-Archetypen nur als Stresstest. Keine erfundenen individuellen Euro-Gewinne.

### 3.0 — 1 / 5 / 10 Jahre
Mechanische Fiskalhüllen mit expliziten Unsicherheiten. Keine Makroprognose.

### 4.0 — Politik-Modus
Druckbares Bürger-Policy-Briefing mit Programm-Nähe, Quellen und einer getrennten Bundestags-Evidenzschicht.

### 5.0 — Konsens-Lab
Mehrere Ergebnislinks werden lokal im Browser verglichen. Das Lab zeigt gemeinsame Prioritäten, Konflikte, einen transparenten Konsens-Index und einen teilbaren Kompromiss.

### 5.1 — Reality Lab
Unter [`?reality=1`](https://mikelninh.github.io/faireint/?reality=1) nutzt FairEint **veröffentlichte ZEW-Mikrosimulationsergebnisse** statt eigener Haushaltsannahmen.

Aktueller Beispielhaushalt: Alleinverdiener-Ehepaar mit zwei Kindern. ZEW-EviSTA auf Basis des Sozio-oekonomischen Panels (SOEP), direkte modellierte Wirkungen der untersuchten Steuer-/Transfermaßnahmen.

Beispiele aus der ZEW-Veröffentlichung:

| Brutto/Jahr | AfD | CDU/CSU | SPD | Grüne | Linke | BSW | FDP |
|---|---:|---:|---:|---:|---:|---:|---:|
| 40.000 € | −440 € | +300 € | +860 € | +870 € | +6.150 € | +1.010 € | −1.520 € |
| 180.000 € | +19.190 € | +5.840 € | +2.200 € | +100 € | −800 € | ±0 € | +11.990 € |

**Wichtig:** Das ZEW simuliert nicht die Wahlprogramme als Ganzes. Nicht alle Maßnahmen sind haushaltsbezogen quantifizierbar; Zweitrundeneffekte und manche Kaufkraftwirkungen sind nicht enthalten.

FairEint formuliert deshalb nicht „Partei X verarscht ihre Wähler“. Der Reality Check zeigt stattdessen:

**Parteibehauptung → unabhängige Simulation → fiskalische Wirkung → Gegenargument → Modellgrenzen → parlamentarische Evidenz.**

### Verhalten / Zweitrundeneffekte
Das Reality Lab verlinkt zusätzlich die ifo-Analyse 2025, die Arbeitsangebotsreaktionen modelliert. Die dort untersuchten Reformen finanzieren sich durch solche Reaktionen in der Regel zu weniger als 10 % selbst. FairEint verwendet daraus bewusst **keinen pauschalen Multiplikator** für einzelne Gesetze.

### Bundestag Open-Data-Gateway
FairEint verlinkt direkt auf:

- offizielle namentliche Abstimmungen
- Bundestag Open Data (XML/JSON/XLSX)
- offizielle DIP API

Der Bundestag stellt diese Daten maschinenlesbar bereit. **5.1 behauptet noch keinen vollständigen lokalen Mirror aller Abstimmungslisten.** Das ist die nächste Datenpipeline; bis dahin ist die Coverage in der UI explizit sichtbar.

### Policy Optimizer
Unter [`?optimizer=1`](https://mikelninh.github.io/faireint/?optimizer=1) werden derzeit drei belegte Reformdesigns vergleichbar gemacht:

- ZEW 2026: gezielte Entlastung mittlerer Einkommen
- DIW 2026: Erbschaftsteuerreform mit Lebensfreibeträgen und weniger Privilegien
- DIW 2026: 1%-Vermögensteuer mit hohen Freibeträgen

Nutzer gewichten Ziele wie fiskalischen Spielraum, breite Entlastung, Einfachheit und Vermögenskonzentration. Der resultierende Score ist eine **sichtbare FairEint-Heuristik**, kein wissenschaftlich bewiesenes soziales Optimum.

Die langfristige Zielarchitektur ist eine echte Pareto-Front auf Basis geprüfter Mikrosimulation, Verhaltensreaktionen, Verwaltungs-/Rechtsrisiken und Bürgerpräferenzen.

### Workshop / Education Mode
Unter [`?workshop=1`](https://mikelninh.github.io/faireint/?workshop=1) gibt es einen Facilitator-Modus mit 60- und 120-Minuten-Ablauf.

Er orientiert sich an den veröffentlichten HPI Design-Thinking-Phasen:

1. Verstehen
2. Beobachten
3. Sichtweise definieren
4. Ideen finden
5. Prototypen entwickeln
6. Testen

FairEint ist dabei der Policy-Prototyp. Parteien werden bewusst erst nach Bedürfnisinterviews und individuellen Entscheidungen eingeblendet.

Das ist **kein offizielles HPI-Format**.

## DIW 1%-Vermögensteuer-Lab

Unter [`?diw=1`](https://mikelninh.github.io/faireint/?diw=1) gibt es einen getrennten Explorer für DIW Politikberatung kompakt 211 (2026), Tabelle 5-4.

Bei 1 % Steuersatz und 5 Mio. € Betriebsvermögensfreibetrag:

| Persönlicher Freibetrag | potenzielles Aufkommen | DIW-Konfidenzintervall |
|---|---:|---:|
| 1 Mio. € | 42,2 Mrd. € | 39,3–45,3 Mrd. € |
| 2 Mio. € | 34,7 Mrd. € | 32,4–37,1 Mrd. € |
| 5 Mio. € | 28,6 Mrd. € | 26,8–30,6 Mrd. € |

Anpassungsreaktionen können das tatsächliche Aufkommen reduzieren. Auftraggeber der Studie und Modellgrenzen werden sichtbar ausgewiesen.

## Zugänge

- Standard: **FairEint 5.1**
- `?reality=1` — veröffentlichte Haushalts-Mikrosimulation / Party Reality Check
- `?optimizer=1` — transparenter Policy-Trade-off-Optimizer
- `?workshop=1` — Facilitator / Education Mode
- `?diw=1` — DIW 1%-Vermögensteuer-Lab
- `?v2=1` — V2
- `?legacy=1` — ursprüngliche FairEint-Version

## Noch offen für institutionellen / wissenschaftlichen Einsatz

- vollständiger lokaler Mirror und Normalisierung aller namentlichen Bundestagsabstimmungen
- unabhängiger Review aller Partei-Positionsscores
- eigener reproduzierbarer Tax-Benefit-Mikrosimulationsadapter (z. B. EUROMOD/geeignete Modelle) statt nur veröffentlichter Ergebnis-Snapshots
- systematischer Verhaltensreaktions-Layer pro Reformdesign
- Quellen-Snapshots und Versionierung
- Accessibility-/Usability-Tests mit realen Bürger:innen
- externer Review von Konsens- und Optimizer-Heuristiken

FairEint 5.1 ist ein **integrierter, politikfähiger Prototyp**, kein zertifiziertes Prognose-, Wahlberatungs- oder Optimierungssystem.

## Lokal

```bash
npm install
npm run dev
npm run build
```

React · TypeScript · Vite · Tailwind CSS · Lucide

---

**FairEint ist parteiunabhängig.** Ziel ist nicht, Menschen zu sagen, was sie wählen sollen, sondern politische Entscheidungen verständlicher, vergleichbarer und überprüfbarer zu machen — und gemeinsame Handlungsmöglichkeiten sichtbar zu machen.

MIT Lizenz — Demokratie sollte Open Source sein.
