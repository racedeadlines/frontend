import Link from "next/link"

import Logo from "./ui/logo"

export default function Footer() {
  const currentYear = new Date().getFullYear().toString()
  return (
    <footer className="dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col space-y-4 px-4 py-4">
        <Link href="/" className="flex w-fit items-end space-x-4">
          <Logo />
          <span className="text-2xl font-semibold italic">Race Poke</span>
        </Link>
        <p className="flex items-center text-sm">
          Copyright © {currentYear} RacePoke.com
        </p>
      </div>
    </footer>
  )
}
