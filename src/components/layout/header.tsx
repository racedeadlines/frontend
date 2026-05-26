import Link from "next/link"

import Logo from "./ui/logo"
import MenuIcon from "./ui/menu-icon"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex w-fit items-end space-x-2">
          <Logo />
        </Link>
        <button>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
