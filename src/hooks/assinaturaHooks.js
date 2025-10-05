// hooks/assinaturaHooks.js
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const queryDefaults = {
  staleTime: 0,               // nunca considera dado fresco
  cacheTime: 0,               // não guarda nada em cache
  refetchOnMount: true,       // sempre refaz ao montar o componente
  refetchOnWindowFocus: true, // refaz quando volta pra aba
  refetchOnReconnect: true,   // refaz se internet cair e voltar
}


// Verifica se o usuário pode assinar o documento
export function useVerificarAssinatura(documentoId, enabled = false) {
  console.log('id do doc ao verificar assinatura: ', documentoId)
  return useQuery({
    queryKey: ["verificar-assinatura", documentoId],
    queryFn: async () => {
      const response = await axios.get(`/documentos/${documentoId}/assinatura/verificar`);
      return response.data;
    },
    enabled: !!documentoId && enabled,
    onError: (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Tente novamente.";

      if (status === 400) {
        toast.error("Você não possui uma assinatura cadastrada. " + message);
      } else if (status === 403) {
        toast.error("Código de confirmação não validado. " + message);
      } else {
        toast.error("Erro ao verificar assinatura: " + message);
      }
    },
    ...queryDefaults
  });
}

// Assina o documento
export function useAssinarDocumento(documentoId) {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/documentos/${documentoId}/assinatura/assinar`);
      console.log('id do doc ao assinar: ', documentoId)

      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Documento assinado com sucesso!");
      } else {
        toast.error(data.message || "Erro ao assinar documento.");
      }
    },
    onError: (error) => {
      toast.error("Erro ao assinar: " + (error.response?.data?.message || "Tente novamente."));
    },
  });
}
