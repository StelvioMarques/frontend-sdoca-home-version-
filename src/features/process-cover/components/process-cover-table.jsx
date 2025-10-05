import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit3, Trash2, Loader2, Tags } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useDeleteProcessCover } from "../hooks/process-coverHooks"
import ActionMenuTable from "@/components/action-menu-table"

export function ProcessCoversTable({ processCovers = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteProcessCover()
  const [processCoverId, setProcessCoverId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (processCoverId) {
      deleteMutation.mutate(processCoverId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setProcessCoverId(null)
        },
      })
    }
  }

  return (
    <>
      {processCovers.length === 0 ? (
        <div className="py-12 text-center">
          <Tags className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma capa encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Número da capa de processo</TableHead>
                <TableHead className="px-4">Número da gaveta</TableHead>
                <TableHead className="px-4">Tipo de documento</TableHead>
                <TableHead className="px-4">Número de documentos</TableHead>
                <TableHead className="px-4">Ano</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processCovers.map((processCover) => (
                <TableRow key={processCover.id}>
                  <TableCell className="px-4">{processCover.num_capa_processo}</TableCell>
                  <TableCell className="px-4">{processCover.num_gaveta}</TableCell>
                  <TableCell className="px-4">{processCover.nome_tipo}</TableCell>
                  <TableCell className="px-4">{processCover.num_documentos}</TableCell>
                  <TableCell className="px-4">{processCover.ano || "-"}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable
                      actions={[
                        { Icon: Edit3, text: "Editar", onClick: () => navigate(`/dashboard/process-covers/edit/${processCover.encrypted_id}`) }
                      ]}
                    /* showDelete={true}
                    onDelete={() => {
                      setProcessCoverId(processCover.id)
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
            <AlertDialogTitle>Apagar capa de processo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar esta capa de processo? Essa acção é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Apagar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
