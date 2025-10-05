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


// hook de carregar areas
/* export function useAreas(filtro) {
  const queryKey = ["areas", filtro]

  const { data: areas = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/areas?filtro=${filtro}`)
      console.log(response.data)
      return response.data.areas
    },
    onError: () => {
      toast.error('Erro ao carregar áreas')
    },
    ...queryDefaults
  })

  return {
    areas,
    isLoading,
    isError,
    error,
    refetch
  }
} */

// hook de carregar areas
export function useAreas(filtro, page = 1, searchTerm) {
  const queryKey = ["areas", filtro, page]

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/areas`, {
        params: { filtro, page, search: searchTerm }
      })
      console.log('dados: ', response.data)
      return response.data // pega o paginator completo
    },
    onError: () => {
      toast.error('Erro ao carregar áreas')
    },
    ...queryDefaults
  })

  return {
    areas: data?.areas?.data ?? [],   // registros
    pagination: data?.areas ?? null,  // paginator inteiro
    allAreas: data?.todas_areas,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar uma area
export function useArea(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['area', id],
    queryFn: async function () {
      const response = await axios.get(`/areas/${id}`)
      return response.data.area
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar área')
    },
    ...queryDefaults
  })

  return {
    area: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar uma area
export function useCreateArea() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      // Garantir que departamento_id seja enviado para o backend
      const request = await axios.post('/areas', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Área criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      navigate('/dashboard/areas')
    },
    onError: () => {
      toast.error('Erro ao criar área!')
    },
  })

  return mutation
}

// hook para atualizar uma area
export function useUpdateArea() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      // Garantir que departamento_id seja enviado para o backend
      const request = await axios.put(`/areas/${id}`, formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Área actualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      navigate('/dashboard/areas')
    },
    onError: () => {
      toast.error('Erro ao atualizar área!')
    },
  })

  return mutation
}

// hook para deletar uma area
export function useDeleteArea() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.put(`/areas/${id}/remover`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Área desactivada!')
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      navigate('/dashboard/areas')
    },
    onError: () => {
      toast.error('Erro ao desactivar esta área!')
    },
  })

  return mutation
}

// hook para deletar uma area
export function useActiveArea() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.put(`/areas/${id}/activar`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Área activada!')
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      navigate('/dashboard/areas')
    },
    onError: () => {
      toast.error('Erro ao activar esta área!')
    },
  })

  return mutation
}