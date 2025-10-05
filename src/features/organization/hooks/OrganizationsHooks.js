import axios from "@/lib/axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
}

// 1. Listar organizações
export function useOrganizations() {
  const { data: organizations = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const res = await axios.get("/organizacoes")
      return res.data.organizacoes
    },
    onError: () => toast.error("Erro ao carregar organizações"),
    ...queryDefaults
  })

  return { organizations, isLoading, isError, error, refetch }
}

// 2. Buscar uma organização pelo ID
export function useOrganization(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["organization", id],
    queryFn: async () => {
      const res = await axios.get(`/organizacoes/${id}/show`)
      return res.data.organizacao
    },
    enabled: !!id,
    onError: () => toast.error("Erro ao buscar a Comuna"),
    ...queryDefaults
  })

  return {
    organization: data, // ✅ esse nome é importante pra funcionar lá no outro hook
    isLoading,
    isError,
    error,
    refetch
  }
}


// 3. Criar uma nova organização
export function useCreateOrganization() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const req = await axios.post("/organizacoes", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return req.data
    },
    onSuccess: () => {
      toast.success("Organização criada com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      navigate("/dashboard/organizations")
    },
    onError: () => toast.error("Erro ao criar a Comuna"),
  })

  return mutation
}

// 4. Atualizar uma organização
export function useUpdateOrganization() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const req = await axios.put(`/organizacoes/${id}`, formData, {

      })
      return req.data
    },
    onSuccess: () => {
      toast.success("Comuna atualizada com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      navigate("/dashboard/organizations")
    },
    onError: () => toast.error("Erro ao atualizar a Comuna"),
  })

  return mutation
}
