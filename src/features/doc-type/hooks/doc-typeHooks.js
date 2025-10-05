import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
}


// hook de carregar tipos de documentos
export function useTiposDocumentos() {
  const { data: tiposDocumentos = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tipos-documentos'],
    queryFn: async function () {
      const response = await axios.get('/tipos-documentos')
      console.log(response.data)
      return response.data.tiposDocumentos
    },
    onError: () => {
      toast.error('Erro ao carregar tipos de documentos')
    },
    ...queryDefaults
  })

  return {
    tiposDocumentos,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar um tipo de documento
export function useTipoDocumento(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tipo-documento', id],
    queryFn: async function () {
      const response = await axios.get(`/tipos-documentos/${id}`)
      return response.data.tipoDocumento
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar tipo de documento')
    },
    ...queryDefaults
  })

  return {
    tipoDocumento: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar um tipo de documento
export function useCreateTipoDocumento() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/tipos-documentos', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Tipo de documento criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['tipos-documentos'] })
      navigate('/dashboard/doc-types')
    },
    onError: () => {
      toast.error('Erro ao criar tipo de documento!')
    },
  })

  return mutation
}

// hook para atualizar um tipo de documento
export function useUpdateTipoDocumento() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/tipos-documentos/${id}`, formData)
      console.log(request.data)
      return request.data
    },
    onSuccess: () => {
      toast.success('Tipo de documento actualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['tipos-documentos'] })
      navigate('/dashboard/doc-types')
    },
    onError: () => {
      toast.error('Erro ao actualizar tipo de documento!')
    },
  })

  return mutation
}

// hook para deletar um tipo de documento
export function useDeleteTipoDocumento() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/tipos-documentos/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Tipo de documento apagado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['tipos-documentos'] })
      navigate('/dashboard/doc-types')
    },
    onError: () => {
      toast.error('Erro ao apagar tipo de documento!')
    },
  })

  return mutation
}
