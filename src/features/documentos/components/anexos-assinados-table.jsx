import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Edit3, FileText, Printer } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PdfViewer from "@/components/pdf-viewer"
import { printPdf, useViewAnexoAssinado } from "../hooks/docHooks"
import { useEffect } from "react"

export function AnexosAssinadosTable({ Assinados = [] }) {
  const { fileUrl, viewAnexoAssinado, /* closeViewer */ } = useViewAnexoAssinado()

  useEffect(() => {
    if (fileUrl) {
      window.open(fileUrl)
    }
  }, [fileUrl]) // só dispara quando fileUrl mudar


  return (
    <>
      {Assinados.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="w-10 h-10 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">
            Nenhum documento assinado.
          </h3>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome do ficheiro</TableHead>
                <TableHead className="px-4 text-end">Acções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Assinados.map((assinado) => (
                <TableRow
                  key={assinado.id}
                  onClick={() => viewAnexoAssinado(assinado.documento_id)}
                  className='hover:cursor-pointer'
                >
                  <TableCell className="px-4">{assinado.nome_arquivo}</TableCell>
                  <TableCell className="px-4 text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/*  <DropdownMenuItem onClick={() => viewAnexoAssinado(assinado.documento_id)}>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </DropdownMenuItem> */}

                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation(),
                              printPdf(assinado.documento_id)
                          }}
                        >
                          <Printer className="w-4 h-4" />
                          Imprimir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* PDF Viewer */}
      {/*       {fileUrl && (
        <PdfViewer
          selectedPdfUrl={fileUrl}
          setSelectedPdfUrl={closeViewer}
        />
      )} */}
    </>
  )
}

