import Link from "next/link"

import Logo from "./ui/logo"
import MenuIcon from "./ui/menu-icon"

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <Link href="/" className="flex w-fit items-end space-x-2">
        <Logo />
      </Link>
      <button>
        <MenuIcon />
      </button>
    </header>
  )
}
