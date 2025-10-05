import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteCabinet } from "@/features/cabinet/hooks/cabinetHooks"
import { MoreHorizontal, Edit3, Trash2, Loader2, Tags } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import formatDate from "@/utils/format-date"
import ActionMenuTable from "@/components/action-menu-table"

export function CabinetsTable({ cabinets = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteCabinet()
  const [cabinetId, setCabinetId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (cabinetId) {
      deleteMutation.mutate(cabinetId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setCabinetId(null)
        },
      })
    }
  }

  return (
    <>
      {cabinets.length === 0 ? (
        <div className="py-12 text-center">
          <Tags className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum armário encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Número do Armário</TableHead>
                <TableHead className="px-4">Número de gavetas</TableHead>
                <TableHead className="px-4">Área pertencente</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cabinets.map((cabinet) => (
                <TableRow key={cabinet.id}>
                  <TableCell className="px-4">{cabinet.num_armario}</TableCell>
                  <TableCell className="px-4">{cabinet.num_gavetas}</TableCell>
                  <TableCell className="px-4">{cabinet.name_area}</TableCell>
                  <TableCell className="px-4">{formatDate(cabinet.created_at, 'medium')}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable
                      actions={[
                        { Icon: Edit3, text: "Editar", onClick: () => navigate(`/dashboard/cabinets/edit/${cabinet.encrypted_id}`) }
                      ]}
                     /*  showDelete={true}
                      onDelete={() => {
                        setCabinetId(cabinet.id)
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
