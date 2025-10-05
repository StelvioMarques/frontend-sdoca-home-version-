import { useForm } from "react-hook-form"
import { useCreateUser, useCreateData } from "@/features/users/hooks/usuariosHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "@/validations/user"

export function useCreateUserForm() {
  const { data, isLoading } = useCreateData()
  const mutation = useCreateUser()

  const form = useForm({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name_user: "",
      email_user: "",
      password_user: "",
      password_user_confirmation: "",
      area_user: "",
      tipo_user: "",
      profile_photo_path: null,
      assinatura_path: null,
    },
  })

  const appendFile = (fd, key, value) => {
    if (!value) return
    if (value instanceof File) {
      fd.append(key, value)
    } else if (value instanceof FileList && value.length > 0) {
      fd.append(key, value[0])
    }
  }

  const onSubmit = form.handleSubmit((values) => {
    const fd = new FormData()

    fd.append("name_user", values.name_user)
    fd.append("email_user", values.email_user)
    fd.append("password_user", values.password_user)
    fd.append("password_user_confirmation", values.password_user_confirmation)
    fd.append("area_user", values.area_user)
    fd.append("tipo_user", values.tipo_user)

    appendFile(fd, "profile_photo_path", values.profile_photo_path)
    appendFile(fd, "assinatura_path", values.assinatura_path)

    mutation.mutate(fd, {
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
    data,
  }
}
