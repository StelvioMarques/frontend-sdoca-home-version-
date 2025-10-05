import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
}


export function useQrCodeData() {
  const params = useParams();
  const token = params.token ? decodeURIComponent(params.token) : null;

  return useQuery({
    queryKey: ["qrcode", token],
    queryFn: async () => {
      const response = await axios.get(`/documentos/qrcode/${token}`);
      console.log(response.data);
      return response.data;
    },
    enabled: !!token,
    onError: (error) => {
      console.log('erro ao carregar dados: ', error);
      toast.error("Erro ao carregar dados");
    },
    ...queryDefaults
  });
}
