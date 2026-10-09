import { dailyEnergy, type DailyEnergy } from '../lib/energy'
import { useStore } from '../lib/store'

/** Estimated daily energy use from the profile, falling back to the latest logged weight. */
export function useEnergy(): DailyEnergy {
  const { settings, weights } = useStore()
  return dailyEnergy(settings.profile, weights[weights.length - 1]?.kg)
}
