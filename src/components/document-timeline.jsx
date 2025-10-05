import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

export default function DocumentTimeline({ historical }) {
  const areaAtual = historical.areaAtual

  const formatStatus = (status, history, index) => {
    // Se for o PRIMEIRO evento do documento → Entrada inicial
    if (index === 0) return "Entrada inicial"

    switch (Number(status)) {
      case 1:
      case 2:
        if (history.area_origem_id === areaAtual) {
          return "Saída"
        }
        if (history.area_destino_id === areaAtual) {
          return "Entrada"
        }
        return "Movimentação"

      case 4: return "Por Assinar"
      case 5: return "Assinado"
      case 6: return "Arquivado"
      case 7: return "Cancelado"
      default: return "Indefinido"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )
  }

  const buildMessage = (history, areaAtual, index) => {
    const origem = history.nome_area_origem
    const destino = history.nome_area_destino
    const titulo = history.titulo_doc
    const user = history.nome_user

    // Primeiro evento SEMPRE entrada inicial
    if (index === 0) {
      return `${user} deu entrada no documento "${titulo}" na área "${origem}"`
    }

    switch (Number(history.status_historico)) {
      case 1:
      case 2:
        if (history.area_origem_id === history.area_destino_id) {
          return `${user} deu entrada no documento "${titulo}" na área "${origem}"`
        }
        if (history.area_origem_id === areaAtual) {
          return `${user} transferiu o documento "${titulo}" para ${destino}`
        }
        if (history.area_destino_id === areaAtual) {
          return `${user} recebeu o documento "${titulo}" vindo de ${origem}`
        }
        return `${user} movimentou o documento "${titulo}" de ${origem} para ${destino}`

      case 4:
        return `${user} finalizou o documento "${titulo}" para a área "${destino}"`

      case 5:
        return `${user} assinou o documento "${titulo}"`

      case 6:
        return `${user} arquivou o documento "${titulo}"`

      case 7:
        return `${user} cancelou o documento "${titulo}"`

      default:
        return `${user} atualizou o documento "${titulo}"`
    }
  }

  return (
    <Timeline defaultValue={3}>
      {historical.historico.map((history, index) => (
        <TimelineItem key={history.id} step={history.id}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>
              {formatStatus(history.status_historico, history, index)} -{" "}
              {formatDate(history.data_tramitacao)}
            </TimelineDate>
            <TimelineTitle>
              {buildMessage(history, historical.areaAtual, index)}
            </TimelineTitle>
            <TimelineIndicator />
          </TimelineHeader>
          <TimelineContent>
            {history.descricao_tramitacao}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
