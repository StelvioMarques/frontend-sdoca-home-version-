import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Users } from "lucide-react"
import { useCreateUserForm } from "@/features/users/hooks/forms/useCreateForm"
import { UserForm } from "@/features/users/components/UserForm"

export default function NewUser() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    data,
    isLoading
  } = useCreateUserForm()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="pt-2 pl-4">
        <Link to='/dashboard/users'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Criar Novo Usuário</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar um novo usuário no sistema
        </p>
      </div>

      <UserForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        isPending={isPending}
        data={data}
      />
    </>
  )
}
