import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useActivateUser, useDeleteUser } from "@/features/users/hooks/usuariosHooks"
import { Eye, MoreHorizontal, Edit3, Trash2, Users, Loader2, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"


export function UsersTable({ users = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteUser()
  const activateUserMutation = useActivateUser()
  const [userId, setUserId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  function confirmDelete() {
    if (userId) {
      deleteMutation.mutate(userId, {
        onSuccess: () => {
          setShowDeleteDialog(false)
          setUserId(null)
        },
      })
    }
  }

  const getUserActions = (user) => {
    const baseActions = []

    if (user.condicao_user === "1") {
      baseActions.push(
        {
          Icon: Edit3,
          text: "Editar",
          onClick: () => navigate(`/dashboard/users/edit/${user.encrypted_id}`)
        },
        {
          Icon: X,
          text: "Desactivar",
          onClick: () => {
            setUserId(user.id)
            setShowDeleteDialog(true)
          }
        })
    } else {
      baseActions.push({
        Icon: Check,
        text: "Activar",
        onClick: () => activateUserMutation.mutate(user.id)
      })
    }

    return baseActions
  }

  return (
    <>
      {users.length === 0 ? (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum usuário encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Nome</TableHead>
                <TableHead className="px-4">Email</TableHead>
                <TableHead className="px-4">Área pertencente</TableHead>
                <TableHead className="px-4">Papel no sistema</TableHead>
                <TableHead className="px-4">Criado em</TableHead>
                <TableHead className="w-[50px] px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4">
                    <div className="flex items-center w-auto space-x-3 font-medium">
                      <Avatar className="">
                        <AvatarImage
                          src={`http://192.168.146.139:8000/storage/UsersFotos/${user.profile_photo_path}`}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name?.slice(0, 1).toUpperCase() || "?"}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4">{user.email}</TableCell>
                  <TableCell className="px-4">{user.area}</TableCell>
                  <TableCell className="px-4">{user.role || "-"}</TableCell>
                  <TableCell className="px-4">{formatDate(user.created_at, 'medium')}</TableCell>
                  <TableCell className="px-4">
                    <ActionMenuTable actions={getUserActions(user)} />
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
            <AlertDialogTitle>Desactivar usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desactivar este usuário?.
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
