import Link from "next/link"

import Logo from "./ui/logo"
import MenuIcon from "./ui/menu-icon"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex justify-between bg-white p-4 dark:bg-neutral-900">
      <Link href="/" className="flex w-fit items-end space-x-2">
        <Logo />
      </Link>
      <button>
        <MenuIcon />
      </button>
    </header>
  )
}
