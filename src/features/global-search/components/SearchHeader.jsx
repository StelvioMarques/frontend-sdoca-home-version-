import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, SearchIcon } from "lucide-react"

export default function SearchHeader({
  sidebarOpen,
  setSidebarOpen,
  setQuery,
  query
}) {
  return (
    <header className="z-10 flex flex-col items-center w-full gap-3 p-4 px-2 md:justify-between md:gap-0 md:flex-row bg-background shrink-0">
      <h1 className="text-lg font-medium md:text-2xl">Pesquisa</h1>

      <div className="flex items-center gap-3">
        <div className="relative w-72">
          <Input
            id="searchInput"
            className="w-full peer ps-9"
            placeholder="Pesquise em todo sistema..."
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3 text-muted-foreground/80">
            <SearchIcon size={16} />
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
