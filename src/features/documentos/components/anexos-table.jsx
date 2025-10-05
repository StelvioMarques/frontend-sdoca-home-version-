import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Edit3, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PdfViewer from "@/components/pdf-viewer"
import { useViewAttachment } from "../hooks/docHooks"
import useModalStore from "@/store/modalStore"
import SolicitarCodigoDialog from "@/components/dialogs/solicitar-codigo-dialog"
import { useEffect } from "react"

export function AnexosTable({ Anexos = [] }) {
  const { fileUrl, /* isLoading, */ viewAttachment, /* closeViewer */ } = useViewAttachment()
  const { isOpen, modalType, data,/*  open, */ close } = useModalStore()

  useEffect(() => {
    if (fileUrl) {
      window.open(fileUrl)
    }
  }, [fileUrl]) // só dispara quando fileUrl mudar
  /*  console.log('Id do doc em anexos no modal (anexos table): ', data) */

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
                  onClick={() => viewAttachment(doc.doc_path)}
                  className='hover:cursor-pointer'
                >
                  <TableCell className="px-4">{doc.nome_original}</TableCell>
                  {/* <TableCell className="px-4">{doc.documento_id}</TableCell> */}
                  {/* <TableCell className="px-4 text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewAttachment(doc.doc_path)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => open("solicitarCodigo", { id: doc.documento_id, nome: doc.nome })}>
                          <Edit3 className="w-4 h-4" />
                          Assinar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* PDF Viewer */}
      {/* {fileUrl && !isLoading && (
        <PdfViewer
          selectedPdfUrl={fileUrl}
          setSelectedPdfUrl={closeViewer}
        />
      )}
 */}
      {modalType === "solicitarCodigo" && (
        <SolicitarCodigoDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          featureName="código"
          nomeDoc={data.nome}
          documentoId={data.id}
        />
      )}
    </>
  )
}
