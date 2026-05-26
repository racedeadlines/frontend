import ChevronDown from "./icons/chevron-down"
import SearchIcon from "./icons/search-icon"

export default function SearchFilter() {
  return (
    <div className="scrollbar-hide flex items-center space-x-2 overflow-x-auto">
      <div className="rounded-full border border-neutral-300 bg-neutral-100/50 p-2 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
        <SearchIcon />
      </div>
      <div className="flex items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-2 text-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
        <span>Distance</span>
        <ChevronDown />
      </div>
      <div className="flex items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-2 text-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
        <span>City</span>
        <ChevronDown />
      </div>
      <div className="flex items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-2 text-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
        <span>Country</span>
        <ChevronDown />
      </div>
      <div className="flex items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-2 text-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
        <span>Tags</span>
        <ChevronDown />
      </div>
    </div>
  )
}
