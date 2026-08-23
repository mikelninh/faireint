import type { BudgetState, ChoiceLevel, DebtChoice, PartyProfile } from '../data/v2'
import { partyProfiles, revenueModel } from '../data/v2'

export interface PolicyChoices {
  wealth: ChoiceLevel
  inheritance: ChoiceLevel
  highIncome: ChoiceLevel
  debt: DebtChoice
}

export const defaultChoices: PolicyChoices = {
  wealth: 'moderate',
  inheritance: 'moderate',
  highIncome: 'moderate',
  debt: 'balanced',
}

const levelScore: Record<ChoiceLevel, number> = {
  off: -2,
  moderate: 1,
  strong: 2,
}

const debtScore: Record<DebtChoice, number> = {
  strict: -2,
  balanced: 0,
  flexible: 2,
}

export function revenueRange(choices: PolicyChoices) {
  const wealth = revenueModel.wealth[choices.wealth]
  return { low: wealth.low, high: wealth.high, midpoint: (wealth.low + wealth.high) / 2 }
}

function publicServicesScore(budget: BudgetState) {
  const sum = budget.health + budget.education + budget.housing + budget.transit + budget.infrastructure
  if (sum >= 72) return 2
  if (sum >= 58) return 1
  if (sum <= 38) return -1
  return 0
}

function priorityScore(value: number, high: number, medium: number, low: number) {
  if (value >= high) return 2
  if (value >= medium) return 1
  if (value <= low) return -1
  return 0
}

export function userVector(choices: PolicyChoices, budget: BudgetState) {
  return {
    wealth: levelScore[choices.wealth],
    inheritance: levelScore[choices.inheritance],
    highIncome: levelScore[choices.highIncome],
    debt: debtScore[choices.debt],
    publicServices: publicServicesScore(budget),
    climate: priorityScore(budget.climate, 12, 8, 3),
    security: priorityScore(budget.security, 14, 10, 4),
  }
}

const weights = {
  wealth: 1.35,
  inheritance: 1.25,
  highIncome: 1.15,
  debt: 0.85,
  publicServices: 1.2,
  climate: 0.7,
  security: 0.7,
} as const

type Dimension = keyof typeof weights

const labels: Record<Dimension, string> = {
  wealth: 'Vermögensteuer',
  inheritance: 'Erbschaftsteuer',
  highIncome: 'Besteuerung hoher Einkommen',
  debt: 'Investitionen & Schuldenregel',
  publicServices: 'öffentliche Daseinsvorsorge',
  climate: 'Klimaausgaben',
  security: 'Sicherheitsausgaben',
}

export interface PartyMatch {
  party: PartyProfile
  score: number
  aligns: string[]
  differs: string[]
}

export function calculatePartyMatches(choices: PolicyChoices, budget: BudgetState): PartyMatch[] {
  const user = userVector(choices, budget)
  const dimensions = Object.keys(weights) as Dimension[]
  const maxWeightedDistance = dimensions.reduce((sum, key) => sum + 4 * weights[key], 0)

  return partyProfiles
    .map((party) => {
      const distances = dimensions.map((key) => ({ key, distance: Math.abs(user[key] - party.scores[key]) }))
      const weightedDistance = distances.reduce((sum, item) => sum + item.distance * weights[item.key], 0)
      const score = Math.round(100 * (1 - weightedDistance / maxWeightedDistance))
      const aligns = distances.filter((item) => item.distance <= 1).sort((a, b) => a.distance - b.distance).slice(0, 3).map((item) => labels[item.key])
      const differs = distances.filter((item) => item.distance >= 2).sort((a, b) => b.distance - a.distance).slice(0, 2).map((item) => labels[item.key])
      return { party, score, aligns, differs }
    })
    .sort((a, b) => b.score - a.score)
}

export function topBudgetPriorities(budget: BudgetState, count = 3) {
  return Object.entries(budget)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([id, share]) => ({ id, share }))
}
