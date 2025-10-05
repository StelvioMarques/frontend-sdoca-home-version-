import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import printJS from 'print-js';

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
}

export function useDocuments(filtro = "entradas") {
  const queryKey = ["documents", filtro]

  const { data: documents = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(`/documentos?filtro=${filtro}`)
      return response.data.documentos
    },
    onError: () => {
      toast.error("Erro ao carregar documentos")
    },
    ...queryDefaults
    // Configurações de cache e refetch
    /* staleTime: 0,
    cacheTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    // Permitir que os dados anteriores sejam mantidos enquanto novos dados são carregados
    keepPreviousData: true */
  })

  return {
    documents,
    isLoading,
    isError,
    error,
    refetch,
  }
}

/* export function useDocuments(filtro = "entradas", page = 1) {
  const queryKey = ["documents", filtro, page]

  const { data: documents = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axios.get(`/documentos?filtro=${filtro}&page=${page}`)
      return response.data.documentos
    },
    onError: () => {
      toast.error("Erro ao carregar documentos")
    },
    ...queryDefaults
  })

  return {
    documents: documents?.data ?? [],   // registros
    pagination: documents ?? null,  // paginator inteiro
    isLoading,
    isError,
    error,
    refetch,
  }
} */

// hook para carregar um único documento
export function useDocument(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['document', id],
    queryFn: async function () {
      const response = await axios.get(`/documentos/${id}`)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar documento')
    },
    ...queryDefaults
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar um documento
export function useCreateDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const response = await axios.post('/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 🧠 ESSENCIAL!
        }
      })

      return response.data
    },
    onSuccess: () => {
      toast.success('Documento criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao criar documento!')
    },
  })

  return mutation
}

// hook para carregar documentos com base no filtro
export function useUtenteData() {
  const queryKey = ["utente-data",] // ← inclui a área

  const { data: utentes, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/utentes`)
      return response.data
    },
    onError: () => {
      toast.error("Erro ao carregar utentes")
    },
    staleTime: 0, // força refetch sempre que entra na página
  })

  return {
    utentes,
    isLoading,
    isError,
    error,
    refetch,
  }
}

// hook para atualizar um documento
export function useUpdateDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const response = await axios.put(`/documentos/${id}`, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao atualizar documento!')
    },
  })

  return mutation
}

// hook para deletar um documento
export function useDeleteDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const response = await axios.put(`/documentos/${id}/cancelar`)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento apagado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao apagar documento!')
    },
  })

  return mutation
}

// hook para carregar dados para transferência da entrada
export function useTranferData(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['transfer-data', id],
    queryFn: async function () {
      const response = await axios.get(`/documentos/transferir/${id}`)
      console.log("📦 Dados da API (useTranferData):", response.data)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar dados para transferência.')
    },
    ...queryDefaults
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export function useCreateTransfer() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const response = await axios.post(`/documentos/transferir/${id}`, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento transferido com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      // Invalidar também os dados de transferência para atualizar a UI
      queryClient.invalidateQueries({ queryKey: ['transfer-data'] })
    },
    onError: (error) => {
      console.error('Erro na transferência:', error.response.data.message)
      toast.error(`Erro ao transferir: ${error.response.data.message}`)
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
      const response = await axios.get(`/documentos/anexos/${anexoId}/view`, {
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

// hook para visualizar um anexo
export function useViewAnexoAssinado() {
  const [fileUrl, setFileUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  console.log('url do doc', fileUrl)

  const viewAnexoAssinado = async (docId) => {
    console.log('Id do doc (ver anexo assinado) : ', docId)

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`/documentos/anexos/assinados/${docId}/view`, {
        responseType: 'blob'
      })

      if (response.data.type !== 'application/pdf') {
        throw new Error('O arquivo não é um PDF válido')
      }

      // sempre cria uma nova URL
      const blobUrl = URL.createObjectURL(response.data)
      setFileUrl(blobUrl)
      return blobUrl
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
    viewAnexoAssinado,
    closeViewer,
  }
}

// hook para pegar dados de geração de protocolo do doc
export function useProtocoloData(id) {
  const query = useQuery({
    queryKey: ['protocolo-data', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/documentos/${id}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar protocolo:', error.response?.data?.message || error.message);
        toast.error('Erro ao buscar os dados do protocolo.');
        throw error;
      }
    },
    enabled: !!id, // só roda se existir um id válido
    ...queryDefaults
  });

  return query;
}

export function useFinalizeDocument(id) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      if (!id) throw new Error("ID do documento é obrigatório")

      const response = await axios.post(`/documentos/${id}/finalizar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // essencial para envio de arquivos
        }
      })

      return response.data
    },
    onSuccess: () => {
      toast.success('Documento finalizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao finalizar documento!')
    },
  })

  return mutation
}

export const printPdf = async (docId) => {
  try {
    const response = await axios.get(`/documentos/anexos/assinados/${docId}/view`, {
      responseType: 'blob',
    });

    if (response.data.type !== 'application/pdf') {
      throw new Error('O arquivo não é um PDF válido');
    }

    const blobUrl = URL.createObjectURL(response.data);

    printJS({ printable: blobUrl, type: 'pdf' });

    // opcional: libera memória depois de alguns segundos
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

  } catch (err) {
    console.error('Erro ao imprimir PDF:', err);
    toast.error('Erro ao imprimir PDF');
  }
};
