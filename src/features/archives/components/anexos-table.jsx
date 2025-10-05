import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Edit3, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PdfViewer from "@/components/pdf-viewer"
import { useViewAttachment } from "../hooks/archiveHooks"
import SolicitarCodigoDialog from "@/components/dialogs/solicitar-codigo-dialog"
import { useEffect } from "react"

export function AnexosTable({ Anexos = [] }) {
  const { fileUrl, /* isLoading, */ viewAttachment, /* closeViewer */ } = useViewAttachment()

  useEffect(() => {
    if (fileUrl) {
      window.open(fileUrl)
    }
  }, [fileUrl]) // só dispara quando fileUrl mudar

  return (
    <>
      {Anexos.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="w-10 h-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">
            Nenhum ficheiro anexado nesta entrada.
          </h3>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome do ficheiro</TableHead>
                {/* <TableHead className="px-4">id do doc</TableHead> */}
                {/* <TableHead className="px-4 text-end">Acções</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Anexos.map((doc) => (
                <TableRow
                  key={doc.id}
                  onClick={() => viewAttachment(doc.doc_path_primary)}
                  className='hover:cursor-pointer'
                >
                  <TableCell className="px-4">{doc.nome_primary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
