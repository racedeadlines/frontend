"use client"

import { useEffect, useState } from "react"

type EventCountdownProps = {
  eventDate: string
}

export default function EventCountdown({ eventDate }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateObj = new Date(eventDate)
      const now = new Date()
      const difference = eventDateObj.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  return (
    <div className="flex gap-2 font-mono text-white">
      <div className="flex-1 rounded-lg bg-black/75 py-2 text-center">
        <div className="text-lg font-bold">{timeLeft.days}</div>
        <div className="text-xs text-neutral-300">Days</div>
      </div>
      <div className="flex-1 rounded-lg bg-black/75 py-2 text-center">
        <div className="text-lg font-bold">{timeLeft.hours}</div>
        <div className="text-xs text-neutral-300">Hours</div>
      </div>
      <div className="flex-1 rounded-lg bg-black/75 py-2 text-center">
        <div className="text-lg font-bold">{timeLeft.minutes}</div>
        <div className="text-xs text-neutral-300">Minutes</div>
      </div>
      <div className="flex-1 rounded-lg bg-black/75 py-2 text-center">
        <div className="text-lg font-bold">{timeLeft.seconds}</div>
        <div className="text-xs text-neutral-300">Seconds</div>
      </div>
    </div>
  )
}
