import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


// hook para listar arquivos
export function useArchives() {
  const queryKey = ["archives"]

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(`/arquivos`)
      return response.data.arquivos
    },
    onError: () => {
      toast.error("Erro ao carregar arquivos")
    },
  })

  return {
    archives: data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

// hook para carregar um único arquivo
export function useArchive(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["archive", id],
    queryFn: async function () {
      const response = await axios.get(`/arquivos/${id}`)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error("Erro ao carregar arquivo")
    },
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

// hook para criar um arquivo
export function useCreateArchive() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const response = await axios.post("/arquivos", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 🧠 ESSENCIAL!
        },
      })

      return response.data
    },
    onSuccess: () => {
      toast.success("Arquivo criado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["archives"] })
      navigate("/dashboard/archives")
    },
    onError: () => {
      toast.error("Erro ao criar arquivo!")
    },
  })

  return mutation
}


// hook para visualizar um anexo
export function useViewAttachment() {
  const [fileUrl, setFileUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const viewAttachment = async (anexoId) => {

    console.log('Id do doc (ver anexo) : ', anexoId)
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`/arquivos/anexos/${anexoId}/view`, {
        responseType: 'blob'
      })

      if (response.data.type !== 'application/pdf') {
        throw new Error('O arquivo não é um PDF válido')
      }

      // sempre cria uma nova URL
      const blobUrl = URL.createObjectURL(response.data)
      setFileUrl(blobUrl)
    } catch (err) {
      setError(err)
      toast.error('Erro ao carregar o anexo')
    } finally {
      setIsLoading(false)
    }
  }

  const closeViewer = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl) // libera memória
    setFileUrl(null)
  }

  return {
    fileUrl,
    isLoading,
    error,
    viewAttachment,
    closeViewer,
  }
}
