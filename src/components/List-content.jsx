import { Loader2, Search, List } from "lucide-react"
import { useSearch } from "@/context/SearchContext"

export default function ListContent({
  isLoading,
  data = [],
  filtered = [],
  children,
  resource = "item",
  icon = List,
  filter
}) {
  const { searchTerm } = useSearch()
  const EmptyIcon = icon

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // 1. nenhum registro cadastrado no sistema
  if (data.length === 0 && !searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <EmptyIcon className="w-8 h-8 text-accent-foreground" />
        <p className="text-sm">
          Nenhuma {resource} {filter === "ativas" ? "ativa" : "inativa"} encontrada.
        </p>
      </div>
    )
  }

  // ListContent.jsx
  if (data.length === 0 && !searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <EmptyIcon className="w-8 h-8 text-accent-foreground" />
        <p className="text-sm">
          Nenhuma {resource} {filter === "ativas" ? "ativa" : "inativa"} encontrada.
        </p>
      </div>
    )
  }

  // 3. busca não encontrou nada
  if (filtered.length === 0 && searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
        <Search className="w-8 h-8 text-icon-foreground" />
        <p className="text-sm">
          Nenhum resultado encontrado para
          <span className="font-semibold text-secondary-foreground"> "{searchTerm}"</span>.
        </p>
      </div>
    )
  }

  return children
}
