import { Link } from "react-router-dom"
import { Loader2, Plus, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DocumentsTable } from "@/features/documentos/components/documents-table"
import { useDocuments } from "@/features/documentos/hooks/docHooks"
import { useSearch } from "@/context/SearchContext"
import { useState } from "react"

export default function Documents() {
  const { searchTerm } = useSearch()
  const [filter, setFilter] = useState("entradas")
  const { documents = [], isLoading } = useDocuments(filter)
  const filteredDocuments = searchTerm.trim()
    ? documents.filter((doc) =>
      (doc.titulo_doc || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.n_bi || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.tipo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.codigo_documento || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    : documents

  return (
    <div className="relative space-y-4">
      {/* Cabeçalho e filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Documentos</h1>

        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entradas">Entradas</SelectItem>
            <SelectItem value="saidas">Saídas</SelectItem>
            <SelectItem value="por_assinar">Por assinar</SelectItem>
            <SelectItem value="assinados">Assinado</SelectItem>
           {/*  <SelectItem value="arquivados">Arquivados</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
          <FileText className="w-10 h-10 text-icon-foreground" />
          <p className="text-sm">
            Nenhum documento em
            <span className="font-semibold text-secondary-foreground"> "{filter}"</span>.
          </p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
          <Search className="h-9 w-9 text-icon-foreground" />
          <p className="text-sm">
            Nenhum resultado encontrado para{" "}
            <span className="font-semibold text-secondary-foreground">"{searchTerm}"</span>.
          </p>
        </div>
      ) : (
        <DocumentsTable documents={filteredDocuments} />
      )}

      {/* Botão flutuante */}
      <Link to="/dashboard/documents/new" className="fixed z-50 bottom-6 right-6 group">
        <Button className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6">
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar Documento
          </span>
        </Button>
      </Link>
    </div>
  )
}
