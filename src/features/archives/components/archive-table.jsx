import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import formatDate from "@/utils/format-date"

export function ArchivesTable({ archives = [] }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Título</TableHead>
              <TableHead className="px-4">Técnico resposável (Área)</TableHead>
              <TableHead className="px-4">Tipo</TableHead>
              <TableHead className="px-4">Criado em</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {archives.map((archive) => (
              <TableRow key={archive.encrypted_id} onClick={() => navigate(`/dashboard/archives/${archive.encrypted_id}`)}>
                <TableCell className="px-4">{archive.titulo_doc}</TableCell>
                <TableCell className="px-4">{archive.name_user_responsavel} ({archive.name_area_responsavel})</TableCell>
                <TableCell className="px-4">{archive.name_tipo_documento}</TableCell>
                <TableCell className="px-4">{formatDate(archive.created_at, 'medium')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
