import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import ResultGroup from "./ResultGroup"
import UserResultGroup from "./UserResultGroup"
import { FileText, Loader2, Search, SearchX, User } from "lucide-react"
import formatResults from "@/utils/format-results"
import TramitationResult from "./tramitacaoResultGroup"

export default function SearchResults({ results, isLoading, query }) {
  const formatedResults = formatResults(results || {})

  const totalCount = formatedResults.reduce(
    (acc, group) => acc + group.items.length,
    0
  )

  if (!query) {
    return (
      <main className="flex-1 p-6 text-center text-muted-foreground">
        <div className="flex flex-col items-center justify-start mt-20">
          <Search className="mb-2 w-9 h-9 text-accent-foreground" />
          <h2 className="text-lg font-medium text-muted-foreground">Comece sua pesquisa</h2>
          <span className="mt-2 text-sm">
            Digite um termo no campo acima para buscar no sistema.
          </span>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-medium">Resultados da busca</h2>
        <Badge className="bg-primary hover:bg-primary/90">
          {isLoading ? "..." : `${totalCount} resultado(s)`}
        </Badge>
      </div>

      <div className="relative h-[calc(100vh-240px)]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        ) : formatedResults.length > 0 ? (
          <ScrollArea className="h-full space-y-6">
            {formatedResults.map((group) => {
              if (group.key === "usuarios") {
                return (
                  <UserResultGroup
                    key={group.key}
                    title={group.title}
                    Icon={group.Icon || User}
                    users={group.items}
                  />
                )
              }

              if (group.key === "entradas") {
                return (
                  <ResultGroup
                    key={group.key}
                    title={group.title}
                    Icon={group.Icon || FileText}
                    items={group.items}
                  />
                )
              }

              /* if (group.key === "tramitacoes") {
                return (
                  <TramitationResult
                    key={group.key}
                    title={group.title}
                    Icon={group.Icon || FileText}
                    steps={group.items} // timeline espera steps
                  />
                )
              }

              if (group.key === "tipos") {
                return (
                  <DocTypesResult
                    key={group.key}
                    title={group.title}
                    Icon={group.Icon || FileText}
                    types={group.items}
                  />
                )
              }
              */
            
            })}
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-start mt-20 text-center text-muted-foreground">
            <SearchX className="mb-2 w-9 h-9 text-accent-foreground" />
            <h2 className="text-lg font-medium text-muted-foreground">
              Sem resultados encontrados para{" "}
              <span className="text-accent-foreground">"{query}"</span>
            </h2>
            <span className="mt-2 text-sm">Tente ajustar o termo digitado.</span>
          </div>
        )}
      </div>
    </main>
  )
}
