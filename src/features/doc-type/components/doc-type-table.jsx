import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDocument } from "@/features/documentos/hooks/docHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Users, Loader2, Tags, Clock2, FileType } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"


export function DocTypesTable({ docs_types = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDocument()
  const [docTypeId, setDocTypeId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (docTypeId) {
      deleteMutation.mutate(docTypeId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setDocTypeId(null)
        },
      })
    }
  }

  return (
    <>
      {docs_types.length === 0 ? (
        <div className="py-12 text-center">
          <FileType className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum tipo de documento encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome</TableHead>
                <TableHead className="px-4">Nível</TableHead>
                <TableHead className="px-4">Descrição</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs_types.map((docs_type) => (
                <TableRow key={docs_type.id}>
                  <TableCell className="px-4">{docs_type.nome}</TableCell>
                  <TableCell className="px-4">{docs_type.nivel}</TableCell>
                  <TableCell className="px-4">{docs_type.descricao}</TableCell>
                  <TableCell className="px-4">{formatDate(docs_type.created_at, 'medium')}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable
                      actions={[
                        { Icon: Edit3, text: "Editar", onClick: () => navigate(`/dashboard/doc-types/edit/${docs_type.encrypted_id}`) }
                      ]}
                      /* showDelete={true}
                      onDelete={() => {
                        setDocTypeId(docs_type.id)
                        setShowDeleteDialog(true)
                      }} */
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ALERT MODAL */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar Tipo de Documento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar este Tipo de Documento? Essa acção é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                </>
              ) : (
                "Apagar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
