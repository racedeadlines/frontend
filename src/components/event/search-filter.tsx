import ChevronDown from "./icons/chevron-down"
import SearchIcon from "./icons/search-icon"

export default function SearchFilter() {
  return (
    <div className="scrollbar-hide flex items-center space-x-2 overflow-x-auto">
      <button
        type="button"
        className="cursor-pointer rounded-full border border-neutral-300 bg-neutral-100/50 p-2 backdrop-blur-sm transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
      >
        <SearchIcon />
      </button>
      {(["Distance", "City", "Country", "Tags"] as const).map((label) => (
        <button
          key={label}
          type="button"
          className="flex cursor-pointer select-none items-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100/50 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
        >
          <span>{label}</span>
          <ChevronDown />
        </button>
      ))}
    </div>
  )
}
