# FairEint 2.0 — Product & Impact Plan

## Mission
Turn FairEint from a reform catalogue into a neutral, evidence-grounded citizen policy lab that lets people build, understand and share a concrete policy package in 3–5 minutes.

## Product promise
**Build the Germany you want.** Decide who should contribute more, allocate the resulting fiscal space, compare your priorities with representative public-opinion data, and see which documented party positions are closest to your choices.

## Non-negotiable trust rules
1. **Representative polls are Ground Truth.** Synthetic personas may explain scenarios, but never stand in for what citizens actually want.
2. **Facts, models and simulations are visually separated.** A poll result is not a forecast; a model estimate is not a fact about the future.
3. **Every material number has source, fieldwork date and sample where applicable.**
4. **Party matching is a similarity score, never a voting recommendation.** Show source, date, included dimensions and blind spots.
5. **Revenue is a range, not a magic number.** Uncertainty and behaviour responses are first-class UI.
6. **No hidden editorial weighting.** Scoring rules live in code and are documented.

## V1 experience
1. **Hook:** three big representative facts and one question: “If Germany had more fiscal room, what would you do with it?”
2. **Finance:** wealth tax, inheritance tax, high-income tax and investment/debt preference.
3. **Allocate:** distribute 100 budget points across eight concrete areas; preserve total automatically.
4. **Result:** show top priorities, modeled fiscal corridor and party-program similarity.
5. **Share:** encode choices in the URL so friends can open the exact package and compare.
6. **Transparency:** source drawer + methodological caveats + legacy version link.

## Data architecture
- `src/data/v2.ts`: ground-truth polling, fiscal scenario metadata, budget categories, documented party-position vectors and sources.
- `src/lib/policyEngine.ts`: revenue range, user vector, party matching and explanations.
- `src/FairEintV2.tsx`: mobile-first guided experience.
- Legacy app remains available at `?legacy=1` during migration.

## Scoring v0.1
Each selected policy dimension maps to −2..+2. Party positions use the same scale. Similarity is a weighted normalized distance across:
- wealth taxation
- inheritance taxation
- high-income taxation
- investment/debt flexibility
- public-service priority
- climate-spending priority
- security-spending priority

The result explicitly excludes major dimensions such as migration, foreign policy, Europe, civil rights and institutional reform.

## Ground-truth sources in V1
- Infratest dimap for WDR/ARD, April 2026 — wealth distribution, wealth tax, inheritance tax.
- ARD-DeutschlandTrend, May 2026 — high-income and inheritance taxation.
- IMK/Hans-Böckler-Stiftung, April 2026 — public-investment priorities and financing attitudes.
- DIW Berlin, 2026 — wealth-tax revenue/distribution modelling.

## Party-position sources in V1
Use comparable official party documents, with an `asOf` label in UI. Program proximity is intentionally coarse and reviewable. Next iteration should add structured Bundestag voting records as a separate “what parties did” layer rather than mixing votes with manifestos.

## Impact roadmap
### V1 — shareable citizen lab
Ground Truth, finance choices, budget game, party-program match, URL sharing, method panel.

### V1.1 — research hardening
- independent review of every party score
- replace manual fiscal corridors with machine-readable scenario tables from source studies
- add source snapshots/hash/version history
- accessibility audit and keyboard-first controls
- event analytics without personal profiling

### V1.2 — richer citizen evidence
- add more representative polls with demographic/region cuts where methodologically valid
- show agreement and disagreement across party electorates
- show polling uncertainty and question wording

### V2 — policy simulation
- microsimulation adapters (PolicyEngine / EUROMOD where legally and technically suitable)
- household archetypes based on public statistics, never invented “representative citizens”
- distributional incidence by income/wealth decile
- 1/5/10-year scenario ranges with explicit macro assumptions

### V3 — political-use mode
- one-page policy brief export
- sources appendix
- Bundestag vote evidence layer
- legislative implementation checklist
- “send to representative” flow without partisan framing

### V4 — deliberation
- compare packages with friends or groups
- find consensus package
- identify the smallest changes needed to reach broad agreement
- publish anonymous aggregate package statistics only with clear consent and privacy controls

## Success metrics
- ≥70% finish rate from start to result
- median completion ≤5 minutes
- ≥25% share/copy rate
- ≥60% of users open at least one source or methodology item in research/politics sessions
- zero uncited material numerical claims in production
- every party position independently reviewable from a public source
