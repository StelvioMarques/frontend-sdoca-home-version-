import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { useEnviarCodigo, useValidarCodigo } from "@/hooks/codigoConfirmacaoHooks";
import { Input } from "../ui/input";

export default function SolicitarCodigoDialog({ documentoId, showDialog, onOpenChange, nomeDoc }) {
  const [metodo, setMetodo] = useState("email");
  const [codigo, setCodigo] = useState("");
  const [etapa, setEtapa] = useState(1);

  const enviarCodigoMutation = useEnviarCodigo(documentoId);
  const validarCodigoMutation = useValidarCodigo(documentoId);

  const handleConfirmarCodigo = () => {
    validarCodigoMutation.mutate(codigo, {
      onSuccess: () => {
        onOpenChange(false); // fecha o modal ao finalizar
      }
    });
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={onOpenChange && enviarCodigoMutation.isPending}>
      <AlertDialogContent className="md:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {etapa === 1 ? "Solicitar Código de Confirmação" : "Inserir Código de Verificação"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {etapa === 1
              ? `Escolha o método para receber o código de confirmação para a assinatura do documento ${nomeDoc} com id ${documentoId}`
              : "Digite o código que você recebeu para confirmar a operação."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {etapa === 1 && (
          <div className="flex flex-col gap-2 my-2">
            <Label htmlFor="metodo_envio">Método de envio</Label>
            <Select value={metodo} onValueChange={setMetodo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o método de envio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {etapa === 2 && (
          <div className="flex flex-col gap-2 my-2">
            <Label htmlFor="codigo">Código de verificação</Label>
            <Input id="codigo" onChange={(e) => setCodigo(e.target.value)} />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={enviarCodigoMutation.isPending || validarCodigoMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </AlertDialogCancel>

          {etapa === 1 && (
            <AlertDialogAction
              onClick={() =>
                enviarCodigoMutation.mutate(metodo, {
                  onSuccess: () => {
                    if (metodo === "sms") {
                      onOpenChange(false); // fecha o modal direto
                    } else {
                      setEtapa(2); // só vai pra etapa 2 se for email
                    }
                  }
                })
              }
              disabled={enviarCodigoMutation.isPending}
            >
              {enviarCodigoMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Código"
              )}
            </AlertDialogAction>

          )}

          {etapa === 2 && (
            <AlertDialogAction
              onClick={handleConfirmarCodigo}
              disabled={!codigo || validarCodigoMutation.isPending}
            >
              {validarCodigoMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validando...
                </>
              ) : (
                "Confirmar e Assinar"
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
