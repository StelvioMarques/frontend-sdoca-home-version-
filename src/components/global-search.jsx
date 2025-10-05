"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/context/SearchContext"

export function GlobalSearch({ placeholder = "Buscar..." }) {
  const { searchTerm, setSearchTerm } = useSearch()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleSearch = (value) => setSearchTerm(value)

  const clearSearch = () => {
    setSearchTerm("")
    setIsExpanded(false)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => {
        document.getElementById("global-search-input")?.focus()
      }, 100)
    } else {
      clearSearch()
    }
  }

  return (
    <div className="flex items-center">
      {!isExpanded && (
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={toggleExpanded}>
          <Search className="w-4 h-4" />
        </Button>
      )}

      {isExpanded && (
        <div className="flex items-center space-x-2 duration-200 animate-in slide-in-from-right-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="global-search-input"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64 pl-8"
            />
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={toggleExpanded}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
