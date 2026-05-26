import Link from "next/link"

import Logo from "./ui/logo"

export default function Footer() {
  const currentYear = new Date().getFullYear().toString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <footer className="dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col space-y-4 px-4 py-4">
        <Link href="/" className="flex w-fit items-end space-x-4">
          <Logo />
          <span className="text-2xl font-semibold italic">MarathonTrack</span>
        </Link>
        <p className="flex items-center space-x-4 text-sm">
          <strong className="uppercase">time zone</strong>
          <span>{timeZone}</span>
        </p>
        <p className="flex items-center text-sm">
          Copyright © {currentYear} MarathonTrack.com
        </p>
      </div>
    </footer>
  )
}
