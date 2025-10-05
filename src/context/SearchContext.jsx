import { createContext, useContext, useState } from "react"

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  return useContext(SearchContext)
}
