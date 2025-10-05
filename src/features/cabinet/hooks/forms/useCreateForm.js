import { useForm } from "react-hook-form"
import { useCreateCabinet } from "@/features/cabinet/hooks/cabinetHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { armarioSchema } from "@/validations/armario"

export function useCreateForm() {
  const { mutate, isPending } = useCreateCabinet()

  const form = useForm({
    resolver: zodResolver(armarioSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      num_armario: "",
      num_gavetas: "",
    }
  })

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

  return {
    isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
  }
}
