import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import formatDate from "@/utils/format-date"

export default function DetailsContent({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da entrada</CardTitle>
        <CardDescription>Detalhes completos do registro desta entrada de documento</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-foreground">Código</p>
            <p className="text-sm text-muted-foreground">{data.codigo_arquivo}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Tipo</p>
            <p className="text-sm text-muted-foreground">{data.name_tipo_documento}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Data de Entrada</p>
            <p className="text-sm text-muted-foreground">{formatDate(data.created_at, 'long')}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Localização</p>
            <p className="text-sm text-muted-foreground">
              Armário {data.num_armario}, Gaveta {data.num_gaveta}, dentro da capa {data.num_capa_processo}
            </p>
          </div>

          {/*  <div>
            <p className="text-sm font-medium text-foreground">Ficheiros anexados ao processo</p>
            <p className="text-sm text-muted-foreground">{data.num_documentos}</p>
          </div> */}
        </div>

        {/*   <img
          src={`data:image/png;base64,${data.barcode_doc}`}
          alt="Código de Barras"
        /> */}
        {/*  {data.codigo_documento} */}
      </CardContent>
    </Card>
  )
}