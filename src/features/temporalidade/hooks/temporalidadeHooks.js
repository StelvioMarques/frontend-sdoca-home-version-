import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// hook de carregar temporalidades
export function useTemporalidades() {
  const { data: temporalidades = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['temporalidades'],
    queryFn: async function () {
      const response = await axios.get('/temporalidades')
      console.log(response.data)
      return response.data.temporalidades
    },
    onError: () => {
      toast.error('Erro ao carregar temporalidades')
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  })

  return {
    temporalidades,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar uma temporalidade
export function useTemporalidade(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['temporalidade', id],
    queryFn: async function () {
      const response = await axios.get(`/temporalidades/${id}`)
      return response.data.temporalidade
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar temporalidade')
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  })

  return {
    temporalidade: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar uma temporalidade
export function useCreateTemporalidade() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/temporalidades', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Temporalidade criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['temporalidades'] })
      navigate('/dashboard/temps')
    },
    onError: () => {
      toast.error('Erro ao criar temporalidade!')
    },
  })

  return mutation
}

// hook para atualizar uma temporalidade
export function useUpdateTemporalidade() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/temporalidades/${id}`, formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Temporalidade actualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['temporalidades'] })
      navigate('/dashboard/temps')
    },
    onError: () => {
      toast.error('Erro ao atualizar temporalidade!')
    },
  })

  return mutation
}

// hook para deletar uma temporalidade
export function useDeleteTemporalidade() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/temporalidades/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Temporalidade apagada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['temporalidades'] })
      navigate('/dashboard/temps')
    },
    onError: () => {
      toast.error('Erro ao apagar temporalidade!')
    },
  })

  return mutation
}
