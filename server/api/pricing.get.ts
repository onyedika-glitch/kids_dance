import { discounts, faqs, fees, makeupSteps, plans, systemPoints } from '../../data/pricing'

export default defineEventHandler(() => ({ systemPoints, makeupSteps, plans, fees, discounts, faqs }))
