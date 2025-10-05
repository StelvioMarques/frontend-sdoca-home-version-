import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useActiveArea, useDeleteArea } from "@/features/areas/hooks/areasHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Layers, Loader2, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"

export function AreasTable({ areas = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteArea()
  const activateMutation = useActiveArea()
  const [areaId, setAreaId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (areaId) {
      deleteMutation.mutate(areaId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setAreaId(null)
        },
      })
    }
  }

  const getActions = (area) => {
    const baseActions = []

    if (area.status_area === "1") {
      baseActions.push(
        {
          Icon: Edit3,
          text: "Editar",
          onClick: () => navigate(`/dashboard/areas/edit/${area.encrypted_id}`)
        },
        {
          Icon: X,
          text: "Desactivar",
          onClick: () => {
            setAreaId(area.id)
            setShowDeleteDialog(true)
          }
        })
    } else {
      baseActions.push({
        Icon: Check,
        text: "Activar",
        onClick: () => {
          console.log("⚡ Ativar área", area.id)
          activateMutation.mutate(area.id)
        }
      })
    }

    return baseActions
  }


  return (
    <>
      {areas.length === 0 ? (
        <div className="py-12 text-center">
          <Layers className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma organização encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome</TableHead>
                {/* <TableHead className="px-4">Email</TableHead> */}
                {/* <TableHead className="px-4">Telefone</TableHead> */}
                <TableHead className="px-4">Descrição</TableHead>
                {/* <TableHead className="px-4">Criada em</TableHead> */}
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {areas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="px-4">
                    <div className="flex items-center space-x-3 font-medium">
                      <div className="flex items-center justify-center p-2 rounded-md bg-muted size-auto">
                        <span>{area.slogan_area}</span>
                      </div>
                      <span>{area.name_area}</span>
                    </div>
                  </TableCell>
                 {/*  <TableCell className="px-4">{area.email_area}</TableCell>
                  <TableCell className="px-4">{area.telefone_area}</TableCell> */}
                  <TableCell className="max-w-[250px] truncate text-muted-foreground px-4">
                    {area.descricao_area}
                  </TableCell>
                 {/*  <TableCell className="px-4">{formatDate(area.created_at, 'medium')}</TableCell> */}
                  <TableCell className="px-4">
                    <ActionMenuTable actions={getActions(area)} />
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
            <AlertDialogTitle>Desactivar área</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desactivar esta área?
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
                "Desactivar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
