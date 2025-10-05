import { useNavigate, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnexosTable } from "@/features/documentos/components/anexos-table"
import { useDocument } from "@/features/documentos/hooks/docHooks"
import { Separator } from "@/components/ui/separator"
import { Tabs } from "@/components/ui/vercel-tabs"
import DetailsContent from "../components/details-content"
import HistoryContent from "../components/history-content"
import { AnexosAssinadosTable } from "../components/anexos-assinados-table"
import { useState } from "react"
import { AnexosPorAssinarTable } from "../components/anexos-por-assinar-table"

export default function ViewAnexos() {
  const { id } = useParams()
  const { data, isLoading } = useDocument(id)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("attachments")

  const status = data?.documento?.status_tramitacao // string

  // Tabs base (sempre na ordem correta)
  const allTabs = [
    { id: "attachments", label: "Ficheiros Primários", show: true },
    { id: "por_assinar", label: "Por assinar", show: status === "4" || status === "5" },
    { id: "assinados", label: "Ficheiro Assinado", show: status === "5" },
    { id: "details", label: "Detalhes", show: true },
    { id: "history", label: "Histórico", show: true },
  ]

  // Filtra só as tabs que devem aparecer
  const tabs = allTabs.filter(t => t.show)

  return (
    <div className="relative space-y-6">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col items-center w-full md:px-3 md:justify-between md:flex-row">
            <div className="order-2 text-center lfex md:order-1 md:text-start">
              <h1 className="text-2xl font-medium text-secondary-foreground">
                {data.documento.titulo_doc}
              </h1>

              <p className="mt-2 text-sm md:max-w-3xl text-muted-foreground ">
                {data.documento.descricao_doc}
              </p>
            </div>

            {/* Botão Finalizar só em status 4 e 5 */}
            {(status === "1" || status === "2"  /* status === "5" */) && (
              <Button
                className="order-1"
                onClick={() => navigate(`/dashboard/documents/finalizar/${id}`)}
              >
                Finalizar
              </Button>
            )}
          </div>

          <Separator />

          {/* Tabs customizadas */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
            className="mb-6"
          />

          {/* Conteúdo baseado na aba ativa */}
          <div className="space-y-6">
            {activeTab === "attachments" && (
              <AnexosTable Anexos={data.anexos_primarios} />
            )}

            {activeTab === "por_assinar" && (
              <AnexosPorAssinarTable porAssinar={data.anexos_finalizados} />
            )}

            {activeTab === "assinados" && (
              <AnexosAssinadosTable Assinados={data.anexos_assinados} />
            )}

            {activeTab === "details" && <DetailsContent data={data.documento} />}

            {activeTab === "history" && <HistoryContent data={data} />}
          </div>
        </>
      )}
    </div>
  )
}
