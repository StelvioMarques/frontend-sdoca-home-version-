import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDashData() {
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dash-data'],
    queryFn: async () => {
      const response = await axios.get('/dashboard-data');
      return response.data;
    },
    staleTime: 10000 * 2, // 30 segundos
    refetchInterval: 10000 * 2, // revalida automaticamente a cada 30s
    onError: () => {
      toast.error('Ocorreu um erro ao tentar carregar as informações');
    },
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
