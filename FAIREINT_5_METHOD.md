# FairEint 5.0 — Methodik & Grenzen

FairEint soll politische Entscheidungen verständlicher machen, ohne Simulationen als Tatsachen auszugeben. Jede zentrale Zahl soll erkennen lassen, ob sie **erhoben, modelliert oder von FairEint simuliert** wurde.

## 1. Evidenzklassen

1. **Ground Truth** — repräsentative Befragungen mit Quelle, Datum und Stichprobe.
2. **Modell** — wissenschaftliche oder nachvollziehbare Modellrechnungen; keine garantierten Zukunftswerte.
3. **Programm / Position** — dokumentierte Positionen von Parteien oder Fraktionen.
4. **Parlament** — dokumentierte Anträge, Debatten oder Abstimmungen im Deutschen Bundestag.
5. **Simulation** — FairEint-interne Vergleichs-, Stress- oder Konsenswerte.

Diese Klassen werden nicht ohne Kennzeichnung vermischt.

## 2. Vermögensteuer: zwei bewusst getrennte Ebenen

### A. Haupt-Policy-Flow

Der spielerische V5-Hauptflow übernimmt zunächst den groben V2-Explorationskorridor:

- keine Vermögensteuer: 0 Mrd. €/Jahr
- gezielte Richtung: 20–30 Mrd. €/Jahr
- deutlich stärkere Richtung: 30–40 Mrd. €/Jahr

Dieser Korridor dient der **Policy-Experience**, nicht als amtlicher Forecast. Erbschaft- und Einkommensteuerentscheidungen werden nicht künstlich zu einem Gesamtbetrag addiert.

### B. Separates DIW 1%-Vermögensteuer-Lab (`?diw=1`)

Für konkrete fiskalische Diskussionen zeigt FairEint drei Original-Szenarien aus **DIW Berlin, Politikberatung kompakt 211 (2026), Tabelle 5-4**, Tarifszenario 3: proportionaler Vermögensteuersatz von 1 %.

Alle drei Szenarien halten den Unternehmensfreibetrag bei 5 Mio. € konstant:

| Persönlicher Freibetrag | Aufkommen | Konfidenzintervall | Steuerpflichtige |
|---|---:|---:|---:|
| 1 Mio. € | 42,2 Mrd. € | 39,3–45,3 Mrd. € | ca. 1,322 Mio. |
| 2 Mio. € | 34,7 Mrd. € | 32,4–37,1 Mrd. € | ca. 0,400 Mio. |
| 5 Mio. € | 28,6 Mrd. € | 26,8–30,6 Mrd. € | ca. 0,117 Mio. |

Die DIW-Studie beschreibt dieses potenzielle Aufkommen **vorbehaltlich von Anpassungsreaktionen der Steuerpflichtigen**. Das Lab behauptet deshalb nicht, dass genau dieser Betrag real eingenommen würde.

Der Auftraggeber der DIW-Studie wird in der UI transparent genannt. Das Szenario-Lab bleibt absichtlich getrennt von Partei- und Konsensscores.

### 1 / 5 / 10 Jahre im Hauptflow

Die V3-Zeitansicht ist mechanisch:

`Jahreskorridor × Anzahl Jahre`

Sie ist **keine Makroprognose**. Wachstum, Verhaltensanpassungen, Inflation, Gesetzesänderungen und Rückkopplungen werden nicht fortgeschrieben. 5- und 10-Jahreswerte sind deshalb `exploratory`.

## 3. Partei-Programm-Match

Der bestehende Score vergleicht Nutzerentscheidungen und dokumentierte Parteipositionen auf einer groben Skala von -2 bis +2.

Dimensionen:

- Vermögensteuer
- Erbschaftsteuer
- hohe Einkommen
- Investitionen / Schuldenregel
- öffentliche Daseinsvorsorge
- Klimaausgaben
- Sicherheitsausgaben

Gewichte in `src/lib/policyEngine.ts`:

- Vermögen 1,35
- Erbschaft 1,25
- hohe Einkommen 1,15
- Daseinsvorsorge 1,20
- Investitionen / Schulden 0,85
- Klima 0,70
- Sicherheit 0,70

Der Prozentwert ist nur eine normalisierte Ähnlichkeit innerhalb dieser Dimensionen. Außenpolitik, Migration, Europa, Bürgerrechte und viele weitere Felder fehlen. Der Match ist **keine Wahlempfehlung**.

### Programme und Handlungen bleiben getrennt

V4 zeigt Bundestags-Evidenz zusätzlich zum Programm-Match. Parlamentarische Handlungen werden noch nicht heimlich in denselben Score eingerechnet.

## 4. Haushalts-Stresstest (V2.5)

Die sechs Archetypen sind **keine repräsentativen Haushalte** und keine Mikrodaten.

### Steuerexposition

Entscheidungsintensität:

- aus = 0
- gezielt = 1
- deutlich = 2

Archetypen besitzen transparente Expositionsgewichte für Vermögen, Erbschaft und hohes Einkommen. Das Resultat ist eine 0–100-Stressskala — **kein Steuersatz und kein Eurobetrag**.

### Ausgaben-Passung

Budgetanteile werden mit transparenten Prioritätsgewichten des Archetyps gewichtet und auf 0–100 normalisiert. Das ist **kein individueller Geldnutzen**.

Beide Größen bleiben getrennt: Ein Haushalt kann höhere Steuerexposition und zugleich hohe Passung bei öffentlichen Leistungen haben.

## 5. Konsens-Lab (V5)

Das Lab vergleicht nur die eingegebenen FairEint-Pakete. Es ist keine repräsentative Umfrage.

### Kompromiss

- Steuer-/Finanzierungsentscheidungen: Median der ordinalen Entscheidungen
- Budget: Durchschnitt je Kategorie, danach Rundung auf exakt 100 Punkte

### Konfliktstärke beim Budget

`Spread = Maximum − Minimum`

- Spread ≤ 6: `strong`
- Spread ≤ 13: `workable`
- darüber: `conflict`

### Konsens-Index

- 60 % Budget-Ähnlichkeit
- 40 % exakte Übereinstimmung bei den vier Richtungsentscheidungen

Budget-Ähnlichkeit je Kategorie:

`max(0, 100 − Spread × 4)`

Der Index ist eine **FairEint-Simulation**, kein wissenschaftlich validierter Demokratieindikator.

## 6. Datenschutz im Gruppenmodus

Paket-Links werden im aktuellen V5-Build lokal im Browser verarbeitet. Es gibt keinen Gruppen-Backend-Speicher. URL-Parameter sind allerdings sichtbar; keine sensiblen Daten in Namen oder Links schreiben.

## 7. Was noch fehlt

Vor formellem wissenschaftlichen oder institutionellen Einsatz sollten insbesondere folgen:

1. unabhängiger Review aller Partei-Scores
2. weitere DIW-Tarifvarianten und systematische Anpassungsreaktionen integrieren
3. echte Haushalts-/Verteilungsmikrosimulation (z. B. PolicyEngine/EUROMOD, sofern passend)
4. strukturierte Bundestags-Abstimmungsdaten
5. Quellen-Snapshots und Versionierung
6. Accessibility-/Usability-Tests mit realen Bürger:innen
7. externer methodischer Review des Konsens-Index

## Prinzip

> Eine Lücke sichtbar lassen ist besser als eine präzise Zahl erfinden.

FairEint darf spielerisch sein. Aber jede Zahl muss erkennen lassen, woher sie kommt und wie sicher sie ist.
