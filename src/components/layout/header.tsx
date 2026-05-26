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
        <Link href="/" className="flex w-fit items-end space-x-2">
          <Logo />
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          className="cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
        >
          <MenuIcon />
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900">
          <nav className="mx-auto flex w-full max-w-6xl flex-col space-y-2 text-sm">
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-1">
              Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
