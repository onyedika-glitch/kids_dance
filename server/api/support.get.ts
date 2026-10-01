import { giftAmounts, MAX_GIFT, MIN_GIFT, sponsorPackages } from '../../data/support'

// GET /api/support — gift options, sponsorship packages and whether online giving is live
export default defineEventHandler(() => ({
  enabled: paystackEnabled(),
  amounts: giftAmounts,
  min: MIN_GIFT,
  max: MAX_GIFT,
  packages: sponsorPackages,
}))
