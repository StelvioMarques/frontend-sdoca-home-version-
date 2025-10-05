import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DocumentTimeline from "@/components/document-timeline"

export default function HistoryContent({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do Documento</CardTitle>
        <CardDescription>Cronologia completa de todas as alterações e ações</CardDescription>
      </CardHeader>

      <CardContent>
        <DocumentTimeline historical={data} />
      </CardContent>
    </Card>
  )
}