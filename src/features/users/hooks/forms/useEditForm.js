import { useForm } from "react-hook-form"
import { useEditUser, useUpdateUser } from "@/features/users/hooks/usuariosHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { userEditSchema } from "@/validations/user"
import { useState, useEffect } from "react" // 👈 ADICIONE useEffect

export function useEditUserForm(id) {
  const { data, isLoading } = useEditUser(id)
  const mutation = useUpdateUser()
  const [profilePhotoInitial, setProfilePhotoInitial] = useState(null)
  const [signatureImgInitial, setSignatureImgInitial] = useState(null)

  const form = useForm({
    resolver: zodResolver(userEditSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: { // 👈 USE defaultValues + reset, não values (já conversamos sobre isso!)
      name_user: "",
      email_user: "",
      password_user: "",
      password_user_confirmation: "",
      area_user: "",
      tipo_user: "",
      profile_photo_path: null,
      assinatura_path: null
    }
  })

  // 👇 Atualiza os valores do formulário quando os dados carregam
  useEffect(() => {
    if (data?.user) {
      form.reset({
        name_user: data.user.name,
        email_user: data.user.email,
        password_user: "",
        password_user_confirmation: "",
        area_user: String(data.user.id_area),
        tipo_user: String(data.user.id_role),
        profile_photo_path: null, // ← campo de arquivo começa como null
        assinatura_path: null
      })
    }
  }, [data, form])

  // 👇 Define a URL da foto inicial para o preview
  useEffect(() => {
    if (data?.user) {
      setProfilePhotoInitial(data.user.profile_photo_url)
      setSignatureImgInitial(data.user.signature_url)
    } else {
      setProfilePhotoInitial(null)
      setSignatureImgInitial(null)
    }
  }, [data])

  const appendFile = (fd, key, value) => {
    if (!value) return
    if (value === "__PHOTO_REMOVED__" || value === "__SIGNATURE_REMOVED__") {
      // Indicar explicitamente que a foto ou assinatura deve ser removida
      fd.append(key, value)
    } else if (value instanceof File) {
      fd.append(key, value)
    } else if (value instanceof FileList && value.length > 0) {
      fd.append(key, value[0])
    }
  }

  const onSubmit = form.handleSubmit((formData) => {
    const fd = new FormData()
    fd.append("_method", "PUT")
    fd.append("name_user", formData.name_user)
    fd.append("email_user", formData.email_user)
    fd.append("password_user", formData.password_user)
    fd.append("password_user_confirmation", formData.password_user_confirmation)
    fd.append("area_user", formData.area_user)
    fd.append("tipo_user", formData.tipo_user)

    appendFile(fd, "profile_photo_path", formData.profile_photo_path)
    appendFile(fd, "assinatura_path", formData.assinatura_path)


    console.log("📦 payload ->", Object.fromEntries(fd)) // debug
    console.log('✅ Chamando mutate com:', { id, fd })
    mutation.mutate({ id, fd }, {
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
    profilePhotoInitial,
    signatureImgInitial,
    ...form,
    data
  }
}