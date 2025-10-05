import { useForm } from "react-hook-form"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useFinalizeDocument } from "../docHooks"

export function useFinalizarForm(id) {
  const { areas, isLoading } = useAreas()
  const mutation = useFinalizeDocument(id)

  const form = useForm({
    defaultValues: {
      area_destino_id: "",
      anexo_docs: [],
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    const data = new FormData()

    // Campos essenciais
    data.append("area_destino_id", formData.area_destino_id)

    // ficheiros
    if (formData.anexo_docs?.length > 0) {
      formData.anexo_docs.forEach((file) => {
        data.append("anexo_docs[]", file)
      })
    }

    // 🚨 log bonito pra debug
    console.log("FORM DATA RAW:", formData)

    // ver o que foi montado no FormData
    for (const [key, value] of data.entries()) {
      console.log(key, value)
    }

    mutation.mutate(data)
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    areas
  }
}
