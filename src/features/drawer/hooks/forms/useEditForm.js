import { useForm } from "react-hook-form"
import { useDrawer, useUpdateDrawer } from "@/features/drawer/hooks/drawerHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { gavetaSchema } from "@/validations/gaveta"

export function useEditForm(id) {
  const { cabinets } = useCabinets()
  const { drawer, isLoading } = useDrawer(id)
  const { mutate, isPending } = useUpdateDrawer(id)

  const form = useForm({
    resolver: zodResolver(gavetaSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    values: drawer?.num_gaveta ? {
      titulo: drawer.titulo,
      armario_id: drawer.armario_id,
      num_gaveta: drawer.num_gaveta,
      num_processos: drawer.num_processos,
    } : undefined
  })
  
  // Não forçamos a validação inicial para evitar mostrar erros antes da interação do usuário

  const onSubmit = form.handleSubmit((formData) => {
    mutate({ id, formData }, {
      onError: (error) => {
        // supondo que o back devolva algo tipo:
        // { errors: { email_user: ["Email já existe"], area_user: ["Área inválida"] } }
        if (error?.response?.data?.errors) {
          const serverErrors = error.response.data.errors
          Object.entries(serverErrors).forEach(([field, messages]) => {
            form.setError(field, {
              type: "server",
              message: messages[0], // pega só a primeira msg
            })
          })
        }
      },
    })
  })

  // Verifica se há erros no formulário
  const hasErrors = Object.keys(form.formState.errors).length > 0

  return {
    isLoading,
    isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: !hasErrors, // Considera válido se não houver erros
    ...form,
    drawer,
    cabinets,
  }
}
