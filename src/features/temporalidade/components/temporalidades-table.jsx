import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useDeleteTemporalidade } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Users, Loader2, FileClock, Clock2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"

export function TemporalidadesTable({ temporalidades = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteTemporalidade()
  const [tempId, setTempId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (tempId) {
      deleteMutation.mutate(tempId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setTempId(null)
        },
      })
    }
  }

  return (
    <>
      {temporalidades.length === 0 ? (
        <div className="py-12 text-center">
          <FileClock className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma Temporalidade encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome da fase</TableHead>
                <TableHead className="px-4">Prazo de guarda</TableHead>
                <TableHead className="px-4">Destino final</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {temporalidades.map((temporalidade) => (
                <TableRow key={temporalidade.id}>
                  <TableCell className="px-4">{temporalidade.nome_fase}</TableCell>
                  <TableCell className="px-4">{temporalidade.prazo_guarda}</TableCell>
                  <TableCell className="px-4">{temporalidade.destino_final}</TableCell>
                  <TableCell className="px-4">{formatDate(temporalidade.created_at, 'medium')}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable
                      actions={[
                        { Icon: Edit3, text: "Editar", onClick: () => navigate(`/dashboard/temps/edit/${temporalidade.encrypted_id}`) }
                      ]}
                    /* showDelete={true}
                    onDelete={() => {
                      setTempId(temporalidade.id)
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
            <AlertDialogTitle>Apagar Temporalidade</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar esta temporalidade? Essa acção é irreversível.
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
