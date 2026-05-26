"use client"

import { useState } from "react"
import Link from "next/link"

import Logo from "./ui/logo"
import MenuIcon from "./ui/menu-icon"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex w-fit items-end space-x-2 rounded-lg p-1 opacity-100 transition-opacity hover:opacity-70 active:opacity-50"
        >
          <Logo />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          className="cursor-pointer rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
          onClick={() => setMenuOpen(o => !o)}
        >
          <MenuIcon />
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <nav className="mx-auto flex w-full max-w-6xl flex-col space-y-2 text-sm">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
