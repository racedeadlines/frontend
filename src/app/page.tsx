import { Metadata } from "next"

import EventCard from "@components/event/event-card"
import SearchFilter from "@components/event/search-filter"
import { api, RaceEvent } from "@lib/api"
import { raceData } from "@data/types"

export const metadata: Metadata = {
  title: "MarathonTrack.com | Home",
  description: "Track your next marathon registration.",
}

export default async function HomePage() {
  const races = await api.races.getAll().catch(() => raceData)

  const sorted = [...races].sort(
    (a: RaceEvent, b: RaceEvent) =>
      new Date(a.raceDate).getTime() - new Date(b.raceDate).getTime()
  )

  return (
    <main className="flex h-full w-full flex-1 flex-col pt-6 pb-16">
      <div className="mx-auto w-full max-w-4xl px-4">
        <header>
          <h1 className="text-xl font-semibold">
            Track your next marathon race.
          </h1>
        </header>
        <section className="sticky top-0 z-10 bg-gradient-to-b from-white via-white/75 to-transparent py-4 dark:from-neutral-900 dark:via-neutral-900/75">
          <SearchFilter />
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((event: RaceEvent) => (
            <EventCard key={event.name} event={event} />
          ))}
        </section>
      </div>
    </main>
  )
}
