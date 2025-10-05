import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Trash2, ArrowRightLeft, Edit3, X, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteDialog from "@/components/dialogs/delete-dialog"
import useModalStore from "@/store/modalStore"
import { useActivateDepartamento, useDeleteDepartamento } from "../hooks/departamentoHooks"
import ActionMenuTable from "@/components/action-menu-table"
import formatDate from "@/utils/format-date"

export function DepartmentsTable({ departments = [] }) {
  const navigate = useNavigate()
  const deleteMutation = useDeleteDepartamento() // pega o objeto inteiro
  const activateDepartMutation = useActivateDepartamento() // pega o objeto inteiro
  const { isOpen, modalType, data, open, close } = useModalStore()

  const getDepartmentActions = (depart) => {
    const baseActions = []

    if (depart.status_departamento === "1") {
      baseActions.push(
        {
          Icon: Edit3,
          text: "Editar",
          onClick: () => navigate(`/dashboard/departments/edit/${depart.encrypted_id}`)
        },
        {
          Icon: X,
          text: "Desactivar",
          onClick: () => open("delete", depart.id)
        })
    } else {
      baseActions.push({
        Icon: Check,
        text: "Activar",
        onClick: () => activateDepartMutation.mutate(depart.id)
      })
    }

    return baseActions
  }

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Nome</TableHead>
           {/*    <TableHead className="px-4">E-mail</TableHead>
              <TableHead className="px-4">Telefone </TableHead> */}
              <TableHead className="px-4">Descrição</TableHead>
            {/*   <TableHead className="px-4">Criado em</TableHead> */}
              <TableHead className="w-[50px] px-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {departments.map((depart) => (
              <TableRow key={depart.id}>
                <TableCell className="px-4">{depart.name_departamento}</TableCell>
               {/*  <TableCell className="px-4">{depart.email_departamento}</TableCell>
                <TableCell className="px-4">{depart.telefone_departamento}</TableCell> */}
                <TableCell className="px-4">{depart.descricao_departamento}</TableCell>
               {/*  <TableCell className="px-4">{formatDate(depart.created_at, 'medium') || "-"}</TableCell> */}
                <TableCell className="px-4">
                  <ActionMenuTable actions={getDepartmentActions(depart)} />
                  {/*  onDelete={} */}
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
          featureName="departamento"
        />
      )}
    </>
  )
}