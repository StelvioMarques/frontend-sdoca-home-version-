import { useForm } from "react-hook-form"
import { useTranferData, useCreateTransfer } from "@/features/documentos/hooks/docHooks"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useAuth } from "@/context/AuthContext"
/* import { useEffect } from "react" */

export function useTransferForm(id, onOpenChange) {
  const { data, isLoading: isLoadingData } = useTranferData(id)
  const { areas, isLoading: isLoadingAreas } = useAreas()
  const { user } = useAuth()
  const { tiposDocumentos, isLoading: isLoadingTipos } = useTiposDocumentos()
  const { mutate, isPending } = useCreateTransfer()

  const form = useForm({
    defaultValues: {
      /*  titulo_doc: "",
       tipo_doc_id: "",
       area_origem_id: user?.id_area ? String(user.id_area) : "", */
      area_destinos_ids: [],
      descricao_doc: "",
    }
  })



  const onSubmit = form.handleSubmit((formData) => {
    mutate({ id, formData }, {
      onSuccess: () => {
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    })
  })

  // Combinando todos os estados de carregamento
  const isLoading = isLoadingData || isLoadingAreas || isLoadingTipos

  return {
    isLoading,
    isPending,
    onSubmit,
    ...form,
    data,
    areas,
    user,
    tiposDocumentos
  }
}
