import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQrCodeData } from "@/hooks/QRcodeHooks";
import { CalendarDays, Check, Clock1, FileText, User, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function QrCodePage() {
  const { data } = useQrCodeData();

  if (data) {
    return (
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="container flex flex-col max-w-2xl px-4 py-8">
            <div className="space-y-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-accent-foreground" />
                    <h2 className="text-lg font-medium">Dados do Utente</h2>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Nome Completo</span>
                      <span className="text-sm font-medium">{data.documento.nome}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        Nº Bilhete Identidade
                      </span>
                      <span className="font-mono text-sm">{data.documento.n_bi}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                    <h2 className="text-lg font-medium">Informações do Documento</h2>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Documento</span>
                      <span className="text-sm font-medium">{data.documento.titulo_doc}</span>
                    </div>

                    <Separator />
                    
                    {/* Estado Actual */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estado Actual</span>
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs font-medium ${data.documento.status_tramitacao === '1'
                          ? 'bg-blue-500'       // Na Área de Recepção
                          : data.documento.status_tramitacao === '2'
                            ? 'bg-orange-500'     // Em Transferência
                            : data.documento.status_tramitacao === '4'
                              ? 'bg-green-500'      // Despachado / Assinado
                              : 'bg-gray-400'       // Desconhecido
                          }`}
                      >
                        {data.documento.status_tramitacao === '1'
                          ? 'Na Área de Recepção'
                          : data.documento.status_tramitacao === '2'
                            ? 'Em Despacho'
                            : data.documento.status_tramitacao === '4'
                              ? 'Finalizado'
                              : 'Desconhecido'}
                      </span>
                    </div>



                    <Separator />

                    {/* Localização Actual */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Localização Actual</span>
                      <span className="text-sm font-medium">{data.documento.localizacao_actual}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <span className="text-sm font-medium">{data.documento.tipo_documento}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Nº Processo</span>
                      <span className="font-mono text-sm">{data.documento.codigo_documento}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        Data Solicitação
                      </span>

                      <span className="text-sm font-medium">
                        {new Date(data.documento.created_at).toLocaleDateString("pt-PT")}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        Data Emissão
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(data.documento.created_at).toLocaleDateString("pt-PT")}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="w-3 h-3" />
                        Data Validade
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(data.documento.created_at).toLocaleDateString("pt-PT")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-xs text-muted-foreground">Para questões ou suporte, contacte os nossos serviços</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
