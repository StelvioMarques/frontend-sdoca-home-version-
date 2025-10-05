import { Loader2 } from 'lucide-react'

import { DashboardCards } from "@/components/dashboard-cards-v1"
import { PerformanceTableArea } from "@/components/performance-table-areas"
import { DocumentosBarChart } from '@/components/charts/DocumentosBarChart'
import { TempoRespostaChart } from '@/components/charts/TempoRespostaChart'
import { useDashData } from '@/hooks/useDashboardData'
import { useAuth } from '@/context/AuthContext'
import { PerformanceTableUsers } from '@/components/performance-table-users'

export default function Dashboard() {
  const { data, isLoading } = useDashData()
  const { canAny } = useAuth()

  // Se estiver carregando, mostra loader
  if (isLoading || !data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    )
  }

  return (
    <section className="space-y-8 overflow-x-clip">
      <DashboardCards data={data} />

      {canAny(['master-post']) && (
        <PerformanceTableArea data={data.desempenhoAreas} />
      )}

      {canAny(['cs-post']) && (
        <PerformanceTableUsers data={data.desempenhoUsuarios} />
      )}

      {canAny(['master-post']) && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DocumentosBarChart />
          <TempoRespostaChart />
        </div>
      )}
    </section>
  )
}
