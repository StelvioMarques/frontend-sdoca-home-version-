import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useVerificarAssinatura, useAssinarDocumento } from './assinaturaHooks';

// Solicita código de confirmação
export function useEnviarCodigo(documentoId) {
  return useMutation({
    mutationFn: async (metodo) => {
      const res = await axios.post(`/documentos/${documentoId}/codigo/solicitar`, { metodo_envio: metodo });
      console.log('id do doc ao enviar codigo de confirmação: ', documentoId)
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Código enviado com sucesso!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Erro ao enviar código');
    },
  });
}

// Valida código e já encadeia verificação + assinatura
export function useValidarCodigo(documentoId) {
  const assinarDocumento = useAssinarDocumento(documentoId);
  const verificarAssinatura = useVerificarAssinatura(documentoId);

  return useMutation({
    mutationFn: async (codigo) => {
      const { data } = await axios.post(`/documentos/${documentoId}/codigo/validar`, { codigo });
      console.log('id do doc ao validar codigo de confirmação: ', documentoId)
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Código validado com sucesso!");

      // depois de validar, dispara a verificação
      const result = await verificarAssinatura.refetch();
      if (result?.data?.success) {
        assinarDocumento.mutate(); // se tiver tudo certo, já assina
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Código inválido ou expirado");
    },
  });
}
