import { budgetCategories, defaultBudget, type BudgetCategoryId, type BudgetState, type ChoiceLevel, type DebtChoice } from '../data/v2'
import { householdArchetypes } from '../data/v5'
import { calculatePartyMatches, defaultChoices, revenueRange, type PolicyChoices } from './policyEngine'

export interface FairPackage {
  name?: string
  choices: PolicyChoices
  budget: BudgetState
}

const choiceOrder: ChoiceLevel[] = ['off', 'moderate', 'strong']
const debtOrder: DebtChoice[] = ['strict', 'balanced', 'flexible']

function validChoice(value: string | null): value is ChoiceLevel {
  return value !== null && choiceOrder.includes(value as ChoiceLevel)
}

function validDebt(value: string | null): value is DebtChoice {
  return value !== null && debtOrder.includes(value as DebtChoice)
}

function parseBudget(value: string | null): BudgetState | null {
  if (!value) return null
  const shares = value.split(',').map(Number)
  if (shares.length !== budgetCategories.length || shares.some((share) => !Number.isFinite(share) || share < 0 || share > 100)) return null
  if (shares.reduce((sum, share) => sum + share, 0) !== 100) return null
  return Object.fromEntries(budgetCategories.map((category, index) => [category.id, shares[index]])) as BudgetState
}

export function packageFromSearch(search: string): FairPackage | null {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  if (!params.has('w') && !params.has('b')) return null
  const wealth = validChoice(params.get('w')) ? params.get('w') as ChoiceLevel : defaultChoices.wealth
  const inheritance = validChoice(params.get('e')) ? params.get('e') as ChoiceLevel : defaultChoices.inheritance
  const highIncome = validChoice(params.get('i')) ? params.get('i') as ChoiceLevel : defaultChoices.highIncome
  const debt = validDebt(params.get('d')) ? params.get('d') as DebtChoice : defaultChoices.debt
  return {
    choices: { wealth, inheritance, highIncome, debt },
    budget: parseBudget(params.get('b')) ?? defaultBudget,
  }
}

export function parsePackageLink(input: string, index = 0): FairPackage | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://faireint.local/${trimmed.startsWith('?') ? trimmed : `?${trimmed}`}`)
    const parsed = packageFromSearch(url.search)
    if (!parsed) return null
    const name = url.searchParams.get('name') || `Person ${index + 1}`
    return { ...parsed, name }
  } catch {
    return null
  }
}

export function packageSearch(pkg: FairPackage, includeResult = true) {
  const params = new URLSearchParams()
  params.set('w', pkg.choices.wealth)
  params.set('e', pkg.choices.inheritance)
  params.set('i', pkg.choices.highIncome)
  params.set('d', pkg.choices.debt)
  params.set('b', budgetCategories.map((category) => pkg.budget[category.id]).join(','))
  if (pkg.name) params.set('name', pkg.name)
  if (includeResult) params.set('view', 'result')
  return `?${params.toString()}`
}

export function rebalanceBudget(budget: BudgetState, id: BudgetCategoryId, delta: number): BudgetState {
  const next = { ...budget }
  const target = Math.max(2, Math.min(40, next[id] + delta))
  let remaining = target - next[id]
  if (remaining === 0) return next
  next[id] = target
  const others = budgetCategories.map((category) => category.id).filter((otherId) => otherId !== id)
  const direction = remaining > 0 ? -1 : 1
  remaining = Math.abs(remaining)
  let guard = 0
  while (remaining > 0 && guard < 500) {
    guard += 1
    let changed = false
    for (const otherId of others) {
      if (remaining === 0) break
      const candidate = next[otherId] + direction
      if (candidate >= 2 && candidate <= 40) {
        next[otherId] = candidate
        remaining -= 1
        changed = true
      }
    }
    if (!changed) break
  }
  return next
}

const taxIntensity: Record<ChoiceLevel, number> = { off: 0, moderate: 1, strong: 2 }

export interface HouseholdImpact {
  id: string
  emoji: string
  title: string
  subtitle: string
  taxPressure: number
  serviceFit: number
  taxLabel: string
  serviceLabel: string
  caveat: string
}

export function householdImpacts(pkg: FairPackage): HouseholdImpact[] {
  return householdArchetypes.map((household) => {
    const rawTax = household.taxExposure.wealth * taxIntensity[pkg.choices.wealth]
      + household.taxExposure.inheritance * taxIntensity[pkg.choices.inheritance]
      + household.taxExposure.highIncome * taxIntensity[pkg.choices.highIncome]
    const taxPressure = Math.min(100, Math.round(rawTax / 10 * 100))

    const weightEntries = Object.entries(household.benefitWeights) as [BudgetCategoryId, number][]
    const totalWeight = weightEntries.reduce((sum, [, weight]) => sum + weight, 0) || 1
    const weightedShare = weightEntries.reduce((sum, [id, weight]) => sum + pkg.budget[id] * weight, 0) / totalWeight
    const serviceFit = Math.min(100, Math.round(weightedShare / 28 * 100))

    const taxLabel = taxPressure < 15 ? 'kaum direkte Steuerexposition' : taxPressure < 40 ? 'eher geringe Exposition' : taxPressure < 70 ? 'spürbare Exposition' : 'hohe Exposition im Stresstest'
    const serviceLabel = serviceFit >= 75 ? 'starke Prioritäten-Passung' : serviceFit >= 50 ? 'mittlere Prioritäten-Passung' : 'geringe Prioritäten-Passung'
    return { id: household.id, emoji: household.emoji, title: household.title, subtitle: household.subtitle, taxPressure, serviceFit, taxLabel, serviceLabel, caveat: household.caveat }
  })
}

export function topPublicConsensus(pkg: FairPackage) {
  return budgetCategories
    .filter((category) => typeof category.support === 'number')
    .map((category) => ({ ...category, share: pkg.budget[category.id], support: category.support as number }))
    .sort((a, b) => (b.share * b.support) - (a.share * a.support))
    .slice(0, 4)
}

export interface HorizonEnvelope {
  years: 1 | 5 | 10
  low: number
  high: number
  midpoint: number
  confidence: 'medium' | 'exploratory'
  note: string
  allocations: { id: BudgetCategoryId; label: string; emoji: string; low: number; high: number }[]
}

export function horizonEnvelopes(pkg: FairPackage): HorizonEnvelope[] {
  const annual = revenueRange(pkg.choices)
  return ([1, 5, 10] as const).map((years) => {
    const low = annual.low * years
    const high = annual.high * years
    return {
      years,
      low,
      high,
      midpoint: (low + high) / 2,
      confidence: years === 1 ? 'medium' : 'exploratory',
      note: years === 1
        ? 'Mechanische Jahres-Hülle aus dem aktuellen Vermögensteuer-Korridor; andere Steuerentscheidungen sind noch nicht monetarisiert.'
        : `Mechanische ${years}-Jahres-Hülle: Jahreskorridor × ${years}. Keine Makroprognose; Verhaltens-, Wachstums- und Gesetzesänderungen sind nicht fortgeschrieben.`,
      allocations: budgetCategories.map((category) => ({
        id: category.id,
        label: category.label,
        emoji: category.emoji,
        low: low * pkg.budget[category.id] / 100,
        high: high * pkg.budget[category.id] / 100,
      })).sort((a, b) => b.high - a.high).slice(0, 4),
    }
  })
}

function median<T>(items: T[], order: T[]): T {
  const sorted = [...items].sort((a, b) => order.indexOf(a) - order.indexOf(b))
  return sorted[Math.floor((sorted.length - 1) / 2)]
}

function roundedBudgetAverage(packages: FairPackage[]): BudgetState {
  const averages = budgetCategories.map((category) => ({
    id: category.id,
    raw: packages.reduce((sum, pkg) => sum + pkg.budget[category.id], 0) / packages.length,
  }))
  const rounded = averages.map((item) => ({ ...item, value: Math.floor(item.raw), fraction: item.raw - Math.floor(item.raw) }))
  let remainder = 100 - rounded.reduce((sum, item) => sum + item.value, 0)
  rounded.sort((a, b) => b.fraction - a.fraction)
  for (let i = 0; i < rounded.length && remainder > 0; i += 1, remainder -= 1) rounded[i].value += 1
  return Object.fromEntries(rounded.map((item) => [item.id, item.value])) as BudgetState
}

export interface ConsensusResult {
  score: number
  label: string
  compromise: FairPackage
  budget: { id: BudgetCategoryId; label: string; emoji: string; average: number; min: number; max: number; spread: number; status: 'strong' | 'workable' | 'conflict' }[]
  choices: { key: keyof PolicyChoices; label: string; compromise: string; agreement: number }[]
  sharedTop: { id: BudgetCategoryId; label: string; emoji: string; average: number }[]
  conflicts: string[]
}

export function consensus(packages: FairPackage[]): ConsensusResult | null {
  if (packages.length < 2) return null
  const compromiseChoices: PolicyChoices = {
    wealth: median(packages.map((pkg) => pkg.choices.wealth), choiceOrder),
    inheritance: median(packages.map((pkg) => pkg.choices.inheritance), choiceOrder),
    highIncome: median(packages.map((pkg) => pkg.choices.highIncome), choiceOrder),
    debt: median(packages.map((pkg) => pkg.choices.debt), debtOrder),
  }
  const compromiseBudget = roundedBudgetAverage(packages)
  const budgetStats = budgetCategories.map((category) => {
    const values = packages.map((pkg) => pkg.budget[category.id])
    const average = values.reduce((a, b) => a + b, 0) / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    const spread = max - min
    return {
      id: category.id,
      label: category.label,
      emoji: category.emoji,
      average: Math.round(average), min, max, spread,
      status: (spread <= 6 ? 'strong' : spread <= 13 ? 'workable' : 'conflict') as 'strong' | 'workable' | 'conflict',
    }
  })
  const choiceDefs: { key: keyof PolicyChoices; label: string }[] = [
    { key: 'wealth', label: 'Vermögensteuer' },
    { key: 'inheritance', label: 'Erbschaftsteuer' },
    { key: 'highIncome', label: 'Hohe Einkommen' },
    { key: 'debt', label: 'Investitionen / Schuldenregel' },
  ]
  const choiceStats = choiceDefs.map(({ key, label }) => {
    const compromise = compromiseChoices[key]
    const agreement = Math.round(100 * packages.filter((pkg) => pkg.choices[key] === compromise).length / packages.length)
    return { key, label, compromise, agreement }
  })
  const budgetAgreement = budgetStats.reduce((sum, item) => sum + Math.max(0, 100 - item.spread * 4), 0) / budgetStats.length
  const choiceAgreement = choiceStats.reduce((sum, item) => sum + item.agreement, 0) / choiceStats.length
  const score = Math.round((budgetAgreement * 0.6) + (choiceAgreement * 0.4))
  const label = score >= 80 ? 'überraschend hoher Konsens' : score >= 65 ? 'tragfähige gemeinsame Basis' : score >= 50 ? 'Kompromiss möglich' : 'echte Konfliktlinien'
  const sharedTop = budgetStats.filter((item) => item.status !== 'conflict').sort((a, b) => b.average - a.average).slice(0, 4)
  const conflicts = [
    ...budgetStats.filter((item) => item.status === 'conflict').sort((a, b) => b.spread - a.spread).slice(0, 3).map((item) => `${item.emoji} ${item.label}`),
    ...choiceStats.filter((item) => item.agreement < 60).map((item) => item.label),
  ].slice(0, 5)
  return {
    score,
    label,
    compromise: { name: 'Gemeinsamer Kompromiss', choices: compromiseChoices, budget: compromiseBudget },
    budget: budgetStats,
    choices: choiceStats,
    sharedTop,
    conflicts,
  }
}

export function politicalSummary(pkg: FairPackage) {
  const matches = calculatePartyMatches(pkg.choices, pkg.budget)
  const revenue = revenueRange(pkg.choices)
  const top = [...budgetCategories].sort((a, b) => pkg.budget[b.id] - pkg.budget[a.id]).slice(0, 3)
  return {
    revenue,
    matches,
    top,
    text: `FairEint-Paket: Vermögensteuer ${pkg.choices.wealth}, Erbschaftsteuer ${pkg.choices.inheritance}, hohe Einkommen ${pkg.choices.highIncome}, Investitionsregel ${pkg.choices.debt}. Top-Prioritäten: ${top.map((item) => `${item.label} ${pkg.budget[item.id]}%`).join(', ')}. Modellierter Vermögensteuer-Korridor: ${revenue.low}–${revenue.high} Mrd. €/Jahr.`,
  }
}
