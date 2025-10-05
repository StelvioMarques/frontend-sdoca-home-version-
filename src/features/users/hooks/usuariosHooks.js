import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


// hook para carregar usuários
export function useUsersList(filtro) {
  const queryKey = ["users", filtro]
  const { data: users = [], isLoading, isError, error, refetch } = useQuery({

    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/users?filtro=${filtro}`)
      console.log(response.data.users)
      return response.data.users
    },
    onError: () => {
      toast.error('Erro ao carregar usuarios')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    users,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar dados de um usuário
export function useUserShow(id) {
  const { data: user = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user', id],
    queryFn: async function () {
      const response = await axios.get(`/users/${id}`)
      return response.data.users
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar usuário')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    user,
    isLoading,
    isError,
    error,
    refetch
  }
}
// hook para carregar dados para a criação de usuários
export function useCreateData() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user_data'],
    queryFn: async function () {
      const response = await axios.get('/users/create')
      console.log(response.data)
      return response.data
    },
    onError: () => {
      toast.error('Erro ao carregar dados')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar um usuário
export function useCreateUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/users', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return request.data
    },
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/dashboard/users')
    },
    onError: () => {
      toast.error('Erro ao criar usuário!')
    },
  })

  return mutation
}

export function useEditUser(id) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user_edit_data', id],
    queryFn: async function () {
      const response = await axios.get(`/users/edit/${id}`)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar dados')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para actualizar um usuário
export function useUpdateUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, fd }) { // 👈 USE "fd", não "formData"
      console.log('🎯 Payload completo:', { id, fd })
      console.log('🚀 id:', id)
      console.log('🚀 fd:', fd)

      if (!fd) {
        throw new Error('fd é undefined! Verifique a chamada de mutate.')
      }

      const request = await axios.post(`/users/${id}`, fd) // 👈 USE "fd" aqui
      return request.data
    },
    onSuccess: () => {
      toast.success('Usuário actualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/dashboard/users')
    },
    onError: (error) => {
      console.error('Erro ao atualizar usuário:', error)
      toast.error('Erro ao atualizar usuário!')
    },
  })

  return mutation
}

// hook para apagar um usuário
export function useDeleteUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      await axios.get("/sanctum/csrf-cookie")
      const request = await axios.put(`/users/${id}/remover`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Usuário desactivado!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/dashboard/users')
    },
    onError: () => {
      toast.error('Erro ao apagar o usuário!')
    },
  })

  return mutation
}

// hook para activar um usuário
export function useActivateUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      await axios.get("/sanctum/csrf-cookie")
      const request = await axios.put(`/users/${id}/activar`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Usuário activado!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/dashboard/users')
    },
    onError: () => {
      toast.error('Erro ao activar o usuário!')
    },
  })

  return mutation
}
