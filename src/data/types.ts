import demoJSON from "@data/demo.json"
import raceJSON from "@data/races.json"

export type EventRegistrationOptions = {
  type: string
  openDate: string
  closeDate: string
}

export type RaceEvent = {
  name: string
  location: string
  url: string
  img: string
  raceDate: string
  registration: EventRegistrationOptions[]
}

export const raceData: RaceEvent[] = raceJSON
