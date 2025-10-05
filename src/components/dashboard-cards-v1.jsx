import { cn } from "@/lib/utils"
import { FileText, Clock, CheckCircle, HardDrive } from "lucide-react"

export function DashboardCards({ data }) {
  // Monta os cards dinamicamente a partir do objeto data da API
  const stats = [
    {
      title: "Total de Documentos",
      value: data.total_documentos.total,
      description: "Documentos armazenados no sistema",
      icon: <FileText className="w-6 h-6" />,
      trend: `${data.total_documentos.variacao} em relação ao mês anterior`, // ex: "12%" ou "NA"
    },
    {
      title: "Pendentes de Aprovação",
      value: data.pendentes_aprovacao.total,
      description: "Documentos aguardando revisão",
      icon: <Clock className="w-6 h-6" />,
      trend: `${data.pendentes_aprovacao.variacao} em relação semana anterior`,
    },
    {
      title: "Processados Hoje",
      value: data.processados_hoje.total,
      description: "Documentos processados nas últimas 24h",
      icon: <CheckCircle className="w-6 h-6" />,
      trend: `${data.processados_hoje.variacao} em relação a ontem`
    },
    {
      title: "Armazenamento",
      value: data.armazenamento.percentual,
      description: `Espaço utilizado do total disponível (${data.armazenamento.restante})`,
      icon: <HardDrive className="w-6 h-6" />,
      trend: data.armazenamento.usado,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  /*  index */
}) {
  return (
    <div
      className={cn(
        "relative group/card border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all duration-200"
      )}>
      {/* Hover effect overlay */}
      <div
        className="absolute inset-0 w-full h-full transition duration-200 rounded-lg opacity-0 pointer-events-none group-hover/card:opacity-100 bg-gradient-to-br from-[#f8941f]/10 to-transparent dark:from-[#f8941f]/20"
      />

      {/* Icon */}
      <div
        className="relative z-10 mb-4 transition-colors duration-200 dark:text-neutral-400 group-hover/card:text-sidebar-accent-foreground dark:group-hover/card:text-sidebar-accent-foreground/40 text-secondary-foreground">
        {icon}
      </div>

      {/* Value */}
      <div
        className="relative z-10 mb-2 text-3xl font-medium transition-colors duration-200 text-neutral-900 dark:text-neutral-100 group-hover/card:text-sidebar-accent-foreground dark:group-hover/card:text-sidebar-accent-foreground/40">
        {value}
      </div>

      {/* Title */}
      <div className="relative z-10 mb-2 text-lg font-semibold">
        <div
          className="absolute inset-y-0 left-0 w-1 h-6 transition-all duration-200 origin-center rounded-full group-hover/card:h-8 bg-icon-foreground dark:bg-neutral-700 group-hover/card:bg-icon-foreground" />
        <span
          className="inline-block ml-3 transition duration-200 group-hover/card:translate-x-2 text-foreground dark:text-neutral-100">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="relative z-10 mb-3 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>

      {/* Trend */}
      <div className="relative z-10 text-xs font-medium text-secondary-foreground dark:text-secondary-foreground/40">
        {trend}
      </div>
    </div>
  );
}

