import { useMutation, useQuery } from "@tanstack/react-query"
import { scanAPI } from "./axios"
import { toast } from "sonner"

export function useScanMutation({ currentFiles, setValue, onScanComplete, onScanError }) {
  return useMutation({
    mutationFn: async ({ scannerId, filename, format, profile }) => {
      const response = await scanAPI.post(
        `${scannerId}/scan`,
        { filename, format, profile }, // envia pro backend
        { responseType: 'blob' }
      )
      return response.data
    },
    onSuccess: (blob, variables) => {
      const scannedFile = new File([blob], `${variables.filename}.${variables.format}`, {
        type: 'application/pdf'
      })

      if (onScanComplete) {
        onScanComplete(scannedFile)
      } else {
        const updatedFiles = [...currentFiles, scannedFile]
        const deduplicated = Array.from(new Map(updatedFiles.map(f => [f.name, f])).values())
        setValue("anexo_docs", deduplicated)
      }

      toast.success("Documento escaneado com sucesso!")
    },
    onError: (error) => {
      if (onScanError) {
        onScanError(error)
      }
      toast.error("Falha ao escanear documento!")
    }
  })
}

export function useScannerList() {
  const { data , isLoading, isError, error, refetch } = useQuery({
    queryKey: ['scanners'],
    queryFn: async function () {
      const response = await scanAPI.get('/') // endpoint ainda em pt
      console.log(response.data)
      return response.data.devices
    },
    onError: () => {
      toast.error('Erro ao carregar scanners')
    },
  })

  return {
    scanners: data || [],
    isLoading,
    isError,
    error,
    refetch
  }
}

/* export function useScanMutation({ currentFiles, setValue, onScanComplete }) {
  return useMutation({
    mutationFn: async () => {
      const response = await scanAPI.get('/scan', { responseType: 'blob' })
      return response.data
    },
    onSuccess: (blob) => {
      const now = new Date()
      const formattedDate = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      const scannedFile = new File([blob], `Documento escaneado - ${formattedDate}.pdf`, {
        type: 'application/pdf',
      })

      // Chama o callback com o arquivo escaneado para atualizar o uploader
      // Movido para antes da atualização do React Hook Form para garantir que o uploader seja atualizado primeiro
      if (onScanComplete) {
        onScanComplete(scannedFile)
      } else {
        // Se não houver callback, atualiza o React Hook Form diretamente
        const updatedFiles = [...currentFiles, scannedFile]
        const deduplicated = Array.from(new Map(updatedFiles.map(f => [f.name, f])).values())
        setValue("anexo_docs", deduplicated)
      }

      toast.success("Documento escaneado com sucesso!")
    },
    onError: () => {
      toast.error("Falha ao escanear documento!")
    }
  })
}
 */

