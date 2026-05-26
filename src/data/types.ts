import raceJSON from "@data/races.json"
import { RaceEvent } from "@lib/api"

export type { RaceEvent }
export type { EventRegistrationOption as EventRegistrationOptions } from "@lib/api"

export const raceData: RaceEvent[] = (raceJSON as Omit<RaceEvent, "id">[]).map(
  (r, i) => ({ ...r, id: -(i + 1) })
)
