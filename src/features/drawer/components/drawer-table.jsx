import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteDrawer } from "@/features/drawer/hooks/drawerHooks"
import { MoreHorizontal, Edit3, Trash2, Loader2, Tags } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"

export function DrawersTable({ drawers = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDrawer()
  const [drawerId, setDrawerId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (drawerId) {
      deleteMutation.mutate(drawerId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setDrawerId(null)
        },
      })
    }
  }

  return (
    <>
      {drawers.length === 0 ? (
        <div className="py-12 text-center">
          <Tags className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma gaveta encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Título</TableHead>
                <TableHead className="px-4">Número da gaveta</TableHead>
                <TableHead className="px-4">Armário</TableHead>
                <TableHead className="px-4">Número de processos</TableHead>
                <TableHead className="px-4">Criada em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drawers.map((drawer) => (
                <TableRow key={drawer.id}>
                  <TableCell className="px-4">{drawer.titulo}</TableCell>
                  <TableCell className="px-4">{drawer.num_gaveta}</TableCell>
                  <TableCell className="px-4">{drawer.num_armario}</TableCell>
                  <TableCell className="px-4">{drawer.num_processos}</TableCell>
                  <TableCell className="px-4">{formatDate(drawer.created_at, 'medium')}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable
                      actions={[
                        { Icon: Edit3, text: "Editar", onClick: () => navigate(`/dashboard/drawers/edit/${drawer.encrypted_id}`) }
                      ]}
                    /* showDelete={true}
                    onDelete={() => {
                      setDrawerId(drawer.id)
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
            <AlertDialogTitle>Apagar armário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar este armário? Essa acção é irreversível.
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
