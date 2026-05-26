import clsx from "clsx"
import { EventRegistrationOptions } from "data/types"

type RegistrationStatusProps = {
  registration?: EventRegistrationOptions | null
}

export default function RegistrationStatus({
  registration,
}: RegistrationStatusProps) {
  let iconColor: string
  let textColor: string
  let statusText: string

  if (!registration) {
    // Race date mode - all registrations have ended
    iconColor = "border-red-400 bg-red-400"
    textColor = "text-red-400"
    statusText = "Closed"
  } else if (!registration.openDate || !registration.closeDate) {
    iconColor = "border-black bg-white"
    textColor = "text-white"
    statusText = "To be announced"
  } else {
    const now = new Date()
    const openDate = new Date(registration.openDate)
    const closeDate = new Date(registration.closeDate)
    const fiveDaysBeforeClose = new Date(
      closeDate.getTime() - 5 * 24 * 60 * 60 * 1000
    )

    if (now < openDate) {
      iconColor = "border-black bg-white"
      textColor = "text-white"
      statusText = "Opens soon"
    } else if (now >= openDate && now < fiveDaysBeforeClose) {
      iconColor = "border-green-400 bg-green-400"
      textColor = "text-green-400"
      statusText = "Open"
    } else if (now >= fiveDaysBeforeClose && now <= closeDate) {
      iconColor = "border-yellow-400 bg-yellow-400"
      textColor = "text-yellow-400"
      statusText = "Closing soon"
    } else {
      iconColor = "border-red-400 bg-red-400"
      textColor = "text-red-400"
      statusText = "Closed"
    }
  }

  const iconClassName = clsx("size-2 rounded-full border", iconColor)
  const textClassName = clsx(textColor)
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={iconClassName} />
      <span className={textClassName}>{statusText}</span>
    </div>
  )
}
