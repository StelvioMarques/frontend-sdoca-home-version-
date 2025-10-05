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


// hook de carregar departamentos
export function useDepartamentos(filtro) {
  const queryKey = ["departamentos", filtro]

  const { data: departamentos = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/departamentos?filtro=${filtro}`)
      return response.data.departamentos
    },
    onError: () => {
      toast.error('Erro ao carregar departamentos')
    },
    ...queryDefaults
  })

  return {
    departamentos,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar um departamento
export function useDepartamento(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['departamento', id],
    queryFn: async function () {
      const response = await axios.get(`/departamentos/${id}`)
      return response.data.departamento
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar departamento')
    },
    ...queryDefaults
  })

  return {
    departamento: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar um departamento
export function useCreateDepartamento() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/departamentos', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Departamento criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      navigate('/dashboard/departments')
    },
    onError: () => {
      toast.error('Erro ao criar departamento!')
    },
  })

  return mutation
}

// hook para atualizar um departamento
export function useUpdateDepartamento() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/departamentos/${id}`, formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Departamento atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
      navigate('/dashboard/departments')
    },
    onError: () => {
      toast.error('Erro ao atualizar departamento!')
    },
  })

  return mutation
}

// hook para deletar um departamento
export function useDeleteDepartamento() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.put(`/departamentos/${id}/remover`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Departamento excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
    },
    onError: () => {
      toast.error('Erro ao excluir departamento!')
    },
  })

  return mutation
}


// hook para activar um departamento
export function useActivateDepartamento() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.put(`/departamentos/${id}/activar`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Departamento activado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['departamentos'] })
    },
    onError: () => {
      toast.error('Erro ao activar departamento!')
    },
  })

  return mutation
}