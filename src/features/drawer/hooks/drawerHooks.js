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

// hook de carregar drawers
export function useDrawers() {
  const { data: drawers = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['drawers'],
    queryFn: async function () {
      const response = await axios.get('/gavetas') // endpoint ainda em pt
      console.log(response.data)
      return response.data.gavetas
    },
    onError: () => {
      toast.error('Erro ao carregar gavetas')
    },
    ...queryDefaults
  })

  return {
    drawers,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar uma drawer
export function useDrawer(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['drawer', id],
    queryFn: async function () {
      const response = await axios.get(`/gavetas/${id}`)
      return response.data.gaveta
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar gaveta')
    },
    ...queryDefaults
  })

  return {
    drawer: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar uma drawer
export function useCreateDrawer() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/gavetas', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Gaveta criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['drawers'] })
      navigate('/dashboard/drawers')
    },
    onError: () => {
      toast.error('Erro ao criar gaveta!')
    },
  })

  return mutation
}

// hook para atualizar uma drawer
export function useUpdateDrawer() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/gavetas/${id}`, formData)
      console.log(request.data)
      return request.data
    },
    onSuccess: () => {
      toast.success('Gaveta atualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['drawers'] })
      navigate('/dashboard/drawers')
    },
    onError: () => {
      toast.error('Erro ao atualizar gaveta!')
    },
  })

  return mutation
}

// hook para deletar uma drawer
export function useDeleteDrawer() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/gavetas/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Gaveta apagada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['drawers'] })
      navigate('/dashboard/drawers')
    },
    onError: () => {
      toast.error('Erro ao apagar gaveta!')
    },
  })

  return mutation
}
