import { useForm } from "react-hook-form"
import { useCreateDrawer } from "@/features/drawer/hooks/drawerHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { gavetaSchema } from "@/validations/gaveta"

export function useCreateForm() {
  const { cabinets, isLoading } = useCabinets()
  const { mutate, isPending } = useCreateDrawer()

  const form = useForm({
    resolver: zodResolver(gavetaSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      titulo: "",
      armario_id: "",
      num_gaveta: "",
      num_processos: "",
    }
  })
  
  // Não forçamos a validação inicial para evitar mostrar erros antes da interação do usuário

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
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
    cabinets
  }
}
