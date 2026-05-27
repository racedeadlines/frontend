"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"
import { RaceEvent } from "data/types"
import { api } from "@lib/api"

import FlagCheckered from "./icons/flag-checkered"
import RegistrationStatus from "./registration-status"

type EventCardProps = {
  event: RaceEvent
}

function formatLocation(event: RaceEvent): string {
  if (event.state) return `${event.city}, ${event.state}`
  if (event.country) return `${event.city}, ${event.country}`
  return event.city
}

function formatType(type: string): string {
  return type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

export default function EventCard({ event }: EventCardProps) {
  const [alerted, setAlerted] = useState<boolean>(false)
  const [alertLoading, setAlertLoading] = useState<boolean>(false)

  useEffect(() => {
    api.reminders.getAll()
      .then(reminders => setAlerted(reminders.some(r => r.race_id === event.id)))
      .catch(() => { })
  }, [event.id])

  const toggleAlert = async () => {
    setAlertLoading(true)
    try {
      if (alerted) {
        await api.reminders.delete(event.id)
        setAlerted(false)
      } else {
        await api.reminders.create(event.id)
        setAlerted(true)
      }
    } catch {
      // not logged in or error — silently ignore for now
    } finally {
      setAlertLoading(false)
    }
  }

  const activeRegistration = event.registration.find(r => {
    if (!r.closeDate) return true
    return new Date() <= new Date(r.closeDate)
  }) ?? null

  return (
    <div className="w-full rounded-2xl shadow-2xs contain-content">
      <div
        className="flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${event.img})` }}
      >
        <div className="flex min-h-64 flex-col justify-between space-y-2 bg-black/30 p-2 backdrop-invert backdrop-opacity-10">
          <div className="flex justify-between">
            <span className="flex w-fit items-center space-x-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              <FlagCheckered />
              <span>
                {new Date(event.raceDate).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
            <button
              onClick={toggleAlert}
              disabled={alertLoading}
              className={clsx(
                "w-fit cursor-pointer rounded-full px-2 py-1 text-xs transition-colors",
                alerted
                  ? "bg-white/90 text-black hover:bg-white/70 active:bg-white/60"
                  : "bg-black/60 text-white hover:bg-black/80 active:bg-black/90"
              )}
            >
              {alerted ? "🫵 Receiving Pokes" : "🔔"}
            </button>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-1 flex-col rounded-lg bg-black/60 p-2">
              <h1 className="text-lg font-semibold text-white">{event.name}</h1>
              <h2 className="text-sm text-neutral-300">{formatLocation(event)}</h2>
              {event.distance && (
                <span className="mt-1 w-fit rounded-full bg-white/10 px-2 py-0.5 text-xs text-neutral-300">
                  {event.distance}
                </span>
              )}
            </div>
          </div>

          {(event.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {(event.tags ?? []).map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {activeRegistration?.closeDate && (
            <div className="rounded-lg bg-black/60 px-3 py-2 text-xs text-neutral-300">
              Closes {new Date(activeRegistration.closeDate).toLocaleDateString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg bg-black/75 px-3 py-2">
            <div className="text-sm text-white">
              {activeRegistration ? formatType(activeRegistration.type) : "Registration Closed"}
            </div>
            <RegistrationStatus registration={activeRegistration} />
          </div>
        </div>
      </div>
    </div>
  )
}
