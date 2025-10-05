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

// hook de carregar process covers
export function useProcessCovers() {
  const { data: processCovers = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['processCovers'],
    queryFn: async function () {
      const response = await axios.get('/capas-processo') // endpoint ajustado
      console.log(response.data)
      return response.data.capas // depende do que tua API retorna
    },
    onError: () => {
      toast.error('Erro ao carregar capas de processo')
    },
    ...queryDefaults
  })

  return {
    processCovers,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar uma process cover
export function useProcessCover(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['processCover', id],
    queryFn: async function () {
      const response = await axios.get(`/capas-processo/${id}`)
      return response.data.capa
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar capa de processo')
    },
    ...queryDefaults
  })

  return {
    processCover: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar uma process cover
export function useCreateProcessCover() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/capas-processo', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Capa de processo criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['processCovers'] })
      navigate('/dashboard/process-covers')
    },
    onError: () => {
      toast.error('Erro ao criar capa de processo!')
    },
  })

  return mutation
}

// hook para atualizar uma process cover
export function useUpdateProcessCover() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/capas-processo/${id}`, formData)
      console.log(request.data)
      return request.data
    },
    onSuccess: () => {
      toast.success('Capa de processo atualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['processCovers'] })
      navigate('/dashboard/process-covers')
    },
    onError: () => {
      toast.error('Erro ao atualizar capa de processo!')
    },
  })

  return mutation
}

// hook para deletar uma process cover
export function useDeleteProcessCover() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/capas-processo/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Capa de processo apagada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['processCovers'] })
      navigate('/dashboard/process-covers')
    },
    onError: () => {
      toast.error('Erro ao apagar capa de processo!')
    },
  })

  return mutation
}
