"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"
import { EventRegistrationOptions, RaceEvent } from "data/types"
import { api } from "@lib/api"

import ChevronDown from "./icons/chevron-down"
import FlagCheckered from "./icons/flag-checkered"
import EventCountdown from "./event-countdown"
import RegistrationStatus from "./registration-status"

type EventCardProps = {
  event: RaceEvent
}

export default function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alerted, setAlerted] = useState<boolean>(false)
  const [alertLoading, setAlertLoading] = useState<boolean>(false)

  useEffect(() => {
    api.reminders.getAll()
      .then(reminders => setAlerted(reminders.some(r => r.race_id === event.id)))
      .catch(() => {})
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

  // Check if registration is still open (not past close date)
  const isRegistrationOpen = (registration: EventRegistrationOptions) => {
    if (!registration.closeDate) return true // TBA dates are considered "open"
    const now = new Date()
    const closeDate = new Date(registration.closeDate)
    return now <= closeDate
  }

  // Get available (non-expired) registrations
  const availableRegistrations = event.registration.filter(isRegistrationOpen)

  // Default to first available registration, or race date if all expired
  const getInitialSelection = () => {
    if (availableRegistrations.length === 0) return null
    return (
      availableRegistrations.find(reg => reg.type === "general-lottery") ||
      availableRegistrations[0]
    )
  }

  const [selectedRegistration, setSelectedRegistration] =
    useState<EventRegistrationOptions | null>(getInitialSelection())

  const toggleOptionMenu = () => setIsOpen(prev => !prev)

  const handleRegistrationSelect = (registration: EventRegistrationOptions) => {
    setSelectedRegistration(registration)
    setIsOpen(false)
  }

  // Format registration type for display
  const formatRegistrationType = (type: string) => {
    return type
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Format date for display based on registration status
  const formatRegistrationDate = (registration: EventRegistrationOptions) => {
    if (!registration.openDate || !registration.closeDate) return "TBA"

    const now = new Date()
    const openDate = new Date(registration.openDate)
    const closeDate = new Date(registration.closeDate)
    const fiveDaysBeforeClose = new Date(
      closeDate.getTime() - 5 * 24 * 60 * 60 * 1000
    )

    const formatDate = (date: Date) => {
      return date.toLocaleDateString([], {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    }

    if (now < openDate) {
      return `Opens ${formatDate(openDate)}`
    } else if (now >= openDate && now < fiveDaysBeforeClose) {
      return `Closes ${formatDate(closeDate)}`
    } else if (now >= fiveDaysBeforeClose && now <= closeDate) {
      return `Closes ${formatDate(closeDate)}`
    } else {
      return `Closed ${formatDate(closeDate)}`
    }
  }

  return (
    <div className="w-full rounded-2xl shadow-2xs contain-content">
      <div
        className="flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${event.img})` }}
      >
        <div className="space-y-2 bg-black/30 p-2 backdrop-invert backdrop-opacity-10">
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
                "w-fit rounded-full px-2 py-1 text-xs transition-colors",
                alerted
                  ? "bg-white/90 text-black"
                  : "bg-black/60 text-white hover:bg-black/80"
              )}
            >
              {alerted ? "🔔 Alerted" : "🔕 Alert me"}
            </button>
          </div>
          <div className="flex space-x-2">
            <div className="flex flex-1 flex-col rounded-lg bg-black/60 p-2">
              <h1 className="truncate text-lg font-semibold text-white">
                {event.name}
              </h1>
              <h2 className="text-sm text-neutral-300">{event.location}</h2>
            </div>
          </div>
          <EventCountdown
            eventDate={selectedRegistration?.closeDate || event.raceDate}
          />
          <div className="flex items-center justify-between rounded-lg bg-black/75 px-3 py-2">
            <div className="font-mono text-sm text-white">
              {selectedRegistration
                ? formatRegistrationType(selectedRegistration.type)
                : "All Registration"}
            </div>
            <RegistrationStatus registration={selectedRegistration} />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col bg-neutral-100 p-2 dark:bg-neutral-800">
        <button
          className="flex items-center justify-between"
          onClick={toggleOptionMenu}
        >
          <div className="flex w-full items-center space-x-2">
            <ChevronDown />
            <span className="font-mono text-xs">Options</span>
          </div>
        </button>
        {isOpen && (
          <div className="flex flex-col space-y-2 pt-2 font-mono">
            {event.registration.map((registration, index) => {
              const isExpired = !isRegistrationOpen(registration)
              const isSelected =
                selectedRegistration?.type === registration.type
              return (
                <button
                  key={index}
                  onClick={() =>
                    !isExpired && handleRegistrationSelect(registration)
                  }
                  disabled={isExpired}
                  className={clsx(
                    "flex items-center justify-between rounded-lg border p-1 text-xs",
                    {
                      "border-neutral-600 bg-neutral-800 text-white dark:border-neutral-400 dark:bg-neutral-200 dark:text-neutral-800":
                        isSelected,
                      "cursor-not-allowed text-neutral-400 dark:text-neutral-600":
                        isExpired && !isSelected,
                      "hover:bg-neutral-200 dark:hover:bg-neutral-700":
                        !isSelected && !isExpired,
                    }
                  )}
                >
                  <span
                    className={clsx("font-medium", {
                      "text-neutral-400": isExpired && !isSelected,
                    })}
                  >
                    {formatRegistrationType(registration.type)}
                  </span>
                  <span
                    className={clsx({
                      "text-neutral-400 dark:text-neutral-600":
                        isExpired && !isSelected,
                      "text-neutral-600 dark:text-neutral-400":
                        !isSelected && !isExpired,
                    })}
                  >
                    {formatRegistrationDate(registration)}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
