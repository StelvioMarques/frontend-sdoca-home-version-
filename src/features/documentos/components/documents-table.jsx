import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDocument } from "@/features/documentos/hooks/docHooks"
import { Eye, MoreHorizontal, Trash2, ArrowRightLeft, Printer } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteDialog from "@/components/dialogs/delete-dialog"
import useModalStore from "@/store/modalStore"
import TransferDialog from "@/components/dialogs/transfer-dialog"
import { printProtocolo } from "@/lib/printProtocolo"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"

export function DocumentsTable({ documents = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDocument() // pega o objeto inteiro
  const { isOpen, modalType, data, open, close } = useModalStore()

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Título</TableHead>
              <TableHead className="px-4">Tipo</TableHead>
              <TableHead className="px-4">Área de origem</TableHead>
              <TableHead className="px-4">Área de destino</TableHead>
              <TableHead className="px-4">Criado em</TableHead>
              <TableHead className="w-[50px] px-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.encrypted_id} onClick={() => navigate(`/dashboard/documents/${doc.encrypted_id}`)}>
                <TableCell className="px-4">{doc.titulo_doc}</TableCell>
                <TableCell className="px-4">{doc.tipo}</TableCell>
                <TableCell className="px-4">{doc.area_origem}</TableCell>
                <TableCell className="px-4">{doc.area_destino}</TableCell>
                <TableCell className="px-4">{formatDate(doc.created_at, 'medium')}</TableCell>
                <TableCell className="px-4">
                  <ActionMenuTable onClick={(e)=> e.stopPropagation}
                    actions={[
                      /*  { Icon: Eye, text: "Ver anexos", onClick: () => navigate(`/dashboard/documents/${doc.encrypted_id}`) }, */
                      { Icon: ArrowRightLeft, text: "Transferir", onClick: () => open('transfer', { id: doc.id, titulo: doc.titulo_doc }) },
                      { Icon: Printer, text: "Imprimir protocolo", onClick: () => printProtocolo(doc.encrypted_id) },
                    ]}
                  /*  showDelete={true}
                   onDelete={() => open("delete", doc.id)} */
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {modalType === "delete" && (
        <DeleteDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          onConfirm={() =>
            deleteMutation.mutate(data, { onSuccess: () => close() })
          }
          isPending={deleteMutation.isPending}
          featureName="documento"
        />
      )}

      {modalType === "transfer" && (
        <TransferDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          featureID={data.id}
          doc_title={data.titulo}
          isPending={false}
          featureName="documento"
        />
      )}
    </>
  )
}
