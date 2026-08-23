# FairEint 5.0

**Politik zum Ausprobieren. Und zum Einigen.**

[🚀 FairEint öffnen](https://mikelninh.github.io/faireint/) · [💰 DIW 1%-Vermögensteuer-Lab](https://mikelninh.github.io/faireint/?diw=1) · [🔬 Methodik](FAIREINT_5_METHOD.md)

FairEint ist ein parteiunabhängiges, evidenzorientiertes Bürger-Policy-Lab. Menschen können ein eigenes Steuer- und Investitionspaket bauen, Unsicherheiten prüfen, dokumentierte Parteipositionen vergleichen und mehrere Pakete zu einem transparenten Konsensvorschlag zusammenführen.

## Die Grundregel

**Repräsentative Umfragen sind Ground Truth.**

Synthetische Personas oder FairEint-Simulationen dürfen nicht als Aussage darüber präsentiert werden, „was die Bürger wollen“.

FairEint trennt sichtbar:

- **Ground Truth** — repräsentative Befragungen
- **Modelle** — wissenschaftliche oder nachvollziehbare Modellrechnungen
- **Programme / Positionen** — dokumentierte politische Aussagen
- **Parlament** — dokumentierte Anträge, Debatten oder Abstimmungen
- **Simulationen** — FairEint-interne Stress-, Vergleichs- und Konsenswerte

## V2.1 → V5.0

### 2.1 — Evidence Ledger
Quelle, Datum, Evidenzklasse, Confidence, Stichprobe und — wo relevant — Auftraggeber werden sichtbar gemacht.

Kernbasis 2026: WDR/ARD + infratest dimap, ARD-DeutschlandTrend, IMK/Hans-Böckler-Stiftung, DIW Berlin und Deutscher Bundestag.

### 2.5 — Wer zahlt / wer profitiert?
Sechs transparente Haushalts-Archetypen dienen als **Stresstest**. Steuerexposition und Passung öffentlicher Ausgaben werden getrennt dargestellt. Keine erfundenen individuellen Euro-Gewinne.

### 3.0 — 1 / 5 / 10 Jahre
Die derzeitige FairEint-Fiskalhülle kann mechanisch über 1, 5 und 10 Jahre betrachtet werden. Das ist ausdrücklich **keine Makroprognose**.

### 4.0 — Politik-Modus
Ein Nutzerpaket wird zu einem druckbaren Bürger-Policy-Briefing mit:

- Steuer- und Investitionsrichtung
- Budgetprioritäten
- Programm-Nähe mit Quellen
- separater Bundestags-Evidenz
- PDF/Druck via Browser

Programme und parlamentarisches Handeln werden nicht heimlich in einen gemeinsamen Score gemischt.

### 5.0 — Konsens-Lab
Mehrere FairEint-Ergebnislinks können lokal im Browser verglichen werden. Das Lab zeigt gemeinsame Prioritäten, Konfliktlinien, einen transparenten Konsens-Index und einen teilbaren Kompromiss.

Der Index ist eine **Simulation**, keine repräsentative Umfrage und kein wissenschaftlich validierter Demokratieindikator.

## Neu: DIW 1%-Vermögensteuer-Lab

Unter [`?diw=1`](https://mikelninh.github.io/faireint/?diw=1) gibt es einen getrennten Quellen-/Szenario-Explorer für **DIW Politikberatung kompakt 211 (2026), Tabelle 5-4**.

Verglichen werden drei direkt aus derselben Tabelle stammende Szenarien mit proportionalem Steuersatz von 1 % und 5 Mio. € Unternehmensfreibetrag:

| Persönlicher Freibetrag | Steueraufkommen | DIW-Konfidenzintervall | Steuerpflichtige im Modell |
|---|---:|---:|---:|
| 1 Mio. € | 42,2 Mrd. € | 39,3–45,3 Mrd. € | ca. 1,322 Mio. |
| 2 Mio. € | 34,7 Mrd. € | 32,4–37,1 Mrd. € | ca. 0,400 Mio. |
| 5 Mio. € | 28,6 Mrd. € | 26,8–30,6 Mrd. € | ca. 0,117 Mio. |

**Wichtig:** Das sind potenzielle Mikrosimulationswerte. Die DIW-Studie weist darauf hin, dass Anpassungsreaktionen der Steuerpflichtigen das reale Aufkommen verändern können. Der Auftraggeber der Studie wird im Lab transparent angezeigt.

Das DIW-Lab bleibt absichtlich getrennt von Partei- und Konsensscores. Eine konkrete fiskalische Simulation ist nicht dasselbe wie eine politische Richtungsentscheidung.

## Partei-Match

Der Score vergleicht Nutzerentscheidungen und dokumentierte Parteipositionen nur in den enthaltenen Dimensionen:

- Vermögensteuer
- Erbschaftsteuer
- hohe Einkommen
- Investitionen / Schuldenregel
- öffentliche Daseinsvorsorge
- Klimaausgaben
- Sicherheitsausgaben

Außenpolitik, Migration, Europa, Bürgerrechte und weitere wahlentscheidende Felder fehlen. Der Match ist deshalb **keine Wahlempfehlung**.

## Fiskalische Ehrlichkeit

Der Haupt-Policy-Flow nutzt weiterhin einen bewusst vereinfachten Vermögensteuer-Korridor für die spielerische Gesamt-Experience. Die **exakten drei 1%-DIW-Szenarien** sind separat im DIW-Lab verfügbar, damit Quelle und Modellannahmen nicht mit dem politischen Richtungs-Score vermischt werden.

Erbschaft- und Einkommensteuerentscheidungen werden nicht künstlich zu einem Gesamt-Eurobetrag addiert, solange keine einheitlich geprüften Szenariotabellen integriert sind.

> Eine sichtbare Lücke ist besser als Scheingenauigkeit.

## Architektur

```text
src/
  FairEintV5.tsx          # V5 Policy- & Konsens-Experience
  DiwWealthLab.tsx        # exakter 1%-Szenario-Explorer
  FairEintV2.tsx          # vorherige V2
  data/
    v2.ts                 # Ground Truth, Budget, Partei-Positionen
    v5.ts                 # Evidence Ledger, Archetypen, Bundestag
    diw2026.ts            # DIW Tabelle 5-4: drei 1%-Szenarien
  lib/
    policyEngine.ts       # Partei-Match + Haupt-Fiskalkorridor
    v5Engine.ts           # Impact, Zeit, Sharing und Konsens
```

### Zugänge

- Standard: **V5**
- `?diw=1` — DIW 1%-Vermögensteuer-Lab
- `?v2=1` — V2
- `?legacy=1` — ursprüngliche FairEint-Version

Alte V2-Paketparameter (`w`, `e`, `i`, `d`, `b`) bleiben lesbar. Neue Share-Links verwenden zusätzlich `view=result`, damit Empfänger direkt beim Ergebnis landen.

## Noch nicht wissenschaftlich fertig

Vor formellem wissenschaftlichen oder institutionellen Einsatz sollten insbesondere folgen:

- unabhängiger Review der Partei-Scores
- weitere DIW-Tarifszenarien inklusive systematischer Verhaltensreaktionen integrieren
- echte Haushalts-/Verteilungsmikrosimulation
- strukturierte Bundestags-Abstimmungsdaten
- Quellen-Snapshots und Versionierung
- Accessibility-/Usability-Tests mit realen Bürger:innen
- externer Review des Konsens-Index

V5 ist ein **integrierter, politikfähiger Prototyp**, kein zertifiziertes Prognose- oder Wahlberatungssystem.

## Lokal starten

```bash
npm install
npm run dev
```

```bash
npm run build
```

React · TypeScript · Vite · Tailwind CSS · Lucide

---

**FairEint ist parteiunabhängig.** Ziel ist nicht, Menschen zu sagen, was sie wählen sollen, sondern politische Entscheidungen verständlicher, vergleichbarer und überprüfbarer zu machen — und gemeinsame Handlungsmöglichkeiten sichtbar zu machen.

MIT Lizenz — Demokratie sollte Open Source sein.
