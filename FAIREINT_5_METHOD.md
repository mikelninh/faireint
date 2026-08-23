# FairEint 5.0 — Methodik & Grenzen

FairEint soll politische Entscheidungen verständlicher machen, ohne Simulationen als Tatsachen auszugeben. Dieses Dokument beschreibt die Regeln hinter V5 so, dass Ergebnisse überprüfbar und kritisierbar bleiben.

## 1. Evidenzklassen

FairEint trennt fünf Arten von Aussagen:

1. **Ground Truth** — repräsentative Befragungen. Angezeigt werden Quelle, Datum und Stichprobe.
2. **Modell** — wissenschaftliche oder nachvollziehbare Modellrechnungen. Ergebnisbereiche sind keine garantierten Zukunftswerte.
3. **Programm / Position** — dokumentierte Positionen von Parteien oder Fraktionen.
4. **Parlament** — dokumentierte Anträge, Debatten oder Abstimmungen im Deutschen Bundestag.
5. **Simulation** — von FairEint berechnete Vergleichs-, Stress- oder Konsenswerte.

Diese Klassen dürfen in der UI nicht ohne Kennzeichnung vermischt werden.

## 2. Vermögensteuer-Korridor

V5 übernimmt vorerst den bereits in V2 verwendeten gerundeten Explorationskorridor:

- keine Vermögensteuer: 0 Mrd. €/Jahr
- moderates Szenario: 20–30 Mrd. €/Jahr
- stärkeres Szenario: 30–40 Mrd. €/Jahr

Die Orientierung stammt aus der DIW-Modellierung 2026. FairEint bezeichnet diese Werte ausdrücklich **nicht** als amtlichen Forecast. Bewertung, Freibeträge, Unternehmensvermögen, Ausweichreaktionen, Recht und Konjunktur können das reale Aufkommen verändern.

Erbschaft- und Einkommensteuerentscheidungen werden in V5 **nicht** künstlich zu einem Gesamtbetrag addiert, solange keine einheitlich geprüften Szenariotabellen integriert sind.

### 1 / 5 / 10 Jahre

Die V3-Zeitansicht ist eine mechanische Fiskalhülle:

`Jahreskorridor × Anzahl Jahre`

Sie ist **keine Makroprognose**. Es werden weder Wachstumseffekte noch Verhaltensanpassungen, Inflation, Gesetzesänderungen oder Rückkopplungen automatisch fortgeschrieben. Darum sind 5- und 10-Jahreswerte als `exploratory` markiert.

## 3. Partei-Programm-Match

Der bestehende V2-Score vergleicht Nutzerentscheidungen und dokumentierte Parteipositionen auf einer groben Skala von -2 bis +2.

Aktuelle Dimensionen:

- Vermögensteuer
- Erbschaftsteuer
- Besteuerung hoher Einkommen
- Investitionen / Schuldenregel
- öffentliche Daseinsvorsorge
- Klimaausgaben
- Sicherheitsausgaben

Gewichte in `src/lib/policyEngine.ts`:

- Vermögen: 1.35
- Erbschaft: 1.25
- hohe Einkommen: 1.15
- Investitionen / Schulden: 0.85
- Daseinsvorsorge: 1.20
- Klima: 0.70
- Sicherheit: 0.70

Der Prozentwert ist eine normalisierte Ähnlichkeit innerhalb **dieser** Dimensionen. Er ist keine Wahlprognose, keine politische Identität und keine Wahlempfehlung. Außenpolitik, Migration, Europa, Bürgerrechte und weitere wichtige Felder fehlen.

### Programme und Handlungen bleiben getrennt

V4 zeigt Bundestags-Evidenz zusätzlich zum Programm-Match. Parlamentarische Anträge oder Abstimmungen werden noch **nicht** heimlich in denselben Score eingerechnet. So bleibt sichtbar, ob eine Aussage aus einem Programm oder aus tatsächlichem parlamentarischem Handeln stammt.

## 4. Haushalts-Stresstest (V2.5)

Die sechs Haushalts-Archetypen sind **keine repräsentativen Haushalte** und keine Mikrodaten. Sie dienen nur dazu, Designrisiken sichtbar zu machen.

Für jeden Archetyp berechnet FairEint zwei getrennte Größen:

### Steuerexposition

Jede Steuerentscheidung hat eine Intensität:

- aus = 0
- gezielt = 1
- deutlich = 2

Jeder Archetyp besitzt transparente Expositionsgewichte für Vermögen, Erbschaft und hohes Einkommen. Die Summe wird auf eine 0–100-Stressskala normalisiert.

Der Wert bedeutet nicht „so viel Prozent Steuer“. Er bedeutet nur: **Wie stark könnte dieser Archetyp im gewählten Politikdesign direkt betroffen sein?**

### Ausgaben-Passung

Die Budgetanteile des Nutzers werden mit transparenten Prioritätsgewichten des Archetyps gewichtet. Das Ergebnis wird auf eine 0–100-Passungsskala normalisiert.

Der Wert bedeutet nicht „so viel Euro Nutzen“. Er bedeutet nur: **Wie stark liegen die gewählten öffentlichen Prioritäten in Bereichen, die für diesen Archetyp plausibel relevant sind?**

Beide Werte müssen getrennt bleiben. Ein Haushalt kann zugleich höhere Steuerexposition und hohe Passung bei öffentlichen Leistungen haben.

## 5. Konsens-Lab (V5)

Das Konsens-Lab vergleicht ausschließlich die eingegebenen FairEint-Pakete. Es ist keine repräsentative Umfrage.

### Steuer- und Finanzierungsentscheidungen

Für Vermögensteuer, Erbschaftsteuer, hohe Einkommen und Schuldenregel wird der **Median** der ordinalen Entscheidungen als Kompromiss gewählt.

### Budget

Für jede Budgetkategorie wird der Durchschnitt der eingegebenen Anteile berechnet. Die Werte werden anschließend so gerundet, dass das Kompromissbudget wieder exakt 100 Punkte ergibt.

### Konfliktstärke

Für jede Budgetkategorie wird die Spannweite `Maximum − Minimum` berechnet:

- Spread ≤ 6 Punkte: `strong`
- Spread ≤ 13 Punkte: `workable`
- darüber: `conflict`

### Konsens-Index

Der Index kombiniert zwei Komponenten:

- 60 % Budget-Ähnlichkeit
- 40 % exakte Übereinstimmung bei den vier Richtungsentscheidungen

Budget-Ähnlichkeit pro Kategorie:

`max(0, 100 − Spread × 4)`

Der finale Index ist eine FairEint-Simulation und wird entsprechend beschriftet. Er ist kein wissenschaftlich validierter Demokratieindikator.

## 6. Datenschutz im Gruppenmodus

Der aktuelle V5-Gruppenmodus verarbeitet eingefügte Paket-Links lokal im Browser. In diesem Build gibt es keinen Gruppen-Backend-Speicher. Paketparameter können jedoch im geteilten URL-Link sichtbar sein; Nutzer sollten deshalb keine persönlichen oder sensiblen Informationen in Namen oder Links schreiben.

## 7. Was vor formellem politischen / wissenschaftlichen Einsatz noch fehlt

1. unabhängiger Review aller Partei-Scores gegen Originaldokumente
2. maschinenlesbare Integration der vollständigen DIW-Szenariotabellen
3. echte Mikrosimulation für Haushalts- und Verteilungswirkungen (z. B. PolicyEngine/EUROMOD, sofern methodisch passend)
4. strukturierte Bundestags-Abstimmungsdaten zusätzlich zu Anträgen und Debatten
5. systematische Quellen-Versionierung / Snapshots
6. Accessibility- und Usability-Test mit realen Nutzergruppen
7. externer methodischer Review des Konsens-Index

## Prinzip

> Eine Lücke sichtbar lassen ist besser als eine präzise Zahl erfinden.

FairEint darf anschaulich sein. Es darf spielerisch sein. Aber jede Zahl muss erkennen lassen, ob sie erhoben, modelliert oder simuliert wurde.
