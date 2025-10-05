import { format, formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

export default function formatDate(date, type = "short") {
  const d = new Date(date)

  switch (type) {
    case "short": // Data + hora curtas
      return format(d, "dd/MM/yyyy HH:mm") // 08/09/2025 17:22

    case "medium": // Meio termo
      return format(d, "dd MMM yyyy, HH:mm", { locale: pt }) // 08 set 2025, 17:22

    case "long": // Data + hora extensas
      return format(d, "EEEE, dd 'de' MMMM yyyy, HH:mm", { locale: pt }) // segunda-feira, 08 de setembro 2025, 17:22

    case "notification": // Estilo "há 2h"
      return formatDistanceToNow(d, { addSuffix: true, locale: pt }) // há 3 horas

    default:
      return format(d, "dd/MM/yyyy HH:mm")
  }
}
