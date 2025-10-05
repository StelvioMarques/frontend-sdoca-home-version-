import { useForm } from "react-hook-form"
import { useCreateArea } from "../areasHooks"
import { useDepartamentos } from "./useDepartamentos"
import { zodResolver } from "@hookform/resolvers/zod"
import { areaSchema } from "@/validations/area"

export function useCreateAreaForm() {
  const { departamentos, isLoading } = useDepartamentos()
  const mutation = useCreateArea()

  const form = useForm({
    resolver: zodResolver(areaSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name_area: "",
      slogan_area: "",
      telefone_area: "",
      email_area: "",
      descricao_area: "",
      depart_id: ""
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData, {
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
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
    departamentos
  }
}
