import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
  keepPreviousData: false,
}

// hook para listar notificações
export function useNotificacoes() {
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: async () => {
      const response = await axios.get('/notificacoes');
      return response.data.notificacoes;
    },
    enabled: true, // sempre buscar notificações
    onError: () => {
      toast.error('Erro ao carregar notificações');
    },
    ...queryDefaults
  });

  // Polling automático a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // 10s, você pode ajustar

    return () => clearInterval(interval); // limpa o interval quando o componente desmonta
  }, [refetch]);

  return {
    notificacoes: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

// hook para atualizar uma notificação
export function useUpdateNotificacao() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await axios.put(`/notificacoes/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar notificação: ', error);
    },
  });

  return mutation;
}
