import { useState } from "react"
import SearchHeader from "@/features/global-search/components/SearchHeader"
import SearchSidebar from "@/features/global-search/components/SearchSidebar"
import SearchResults from "@/features/global-search/components/SearchResults"
import { useGlobalSearch } from "../hooks/useGlobalSearch"
import { useDebounce } from "use-debounce"

export default function GlobalSearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [delayedSearch] = useDebounce(query, 500)

  const { data, isLoading } = useGlobalSearch(delayedSearch)

  return (
    <div className="flex flex-col h-screen rounded-lg">
      <SearchHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setQuery={setQuery}
        query={query}
      />

      <div className="flex flex-1 overflow-hidden border rounded-lg">
        <SearchSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <SearchResults
          results={data?.results}
          isLoading={isLoading}
          query={query}
        />
      </div>
    </div>
  )
}
