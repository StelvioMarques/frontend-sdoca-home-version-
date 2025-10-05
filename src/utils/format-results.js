import { ArrowRightLeft, FileType, FileDown, Eye, Download } from "lucide-react"

export default function formatResults(results) {
  if (!results) return []

  const groups = [
    /*  {
       key: 'tipos_documentos',
       title: 'Tipos de Documento',
       Icon: FileType,
       items: results.tipos_documentos?.map(doc => ({
         id: doc.id,
         title: doc.nome,
         desc: doc.descricao
       })) || []
     }, */
    {
      key: 'entradas',
      title: 'Entradas de Documento',
      Icon: FileDown,
      items: results.entradas?.map(doc => ({
        id: doc.id,
        title: doc.titulo || doc.nome,
        desc: doc.descricao,
        codigo_documento: doc.codigo_documento, // nome certo p/ bater com ResultGroup
        tipo: doc.tipo,
        actions: [
          { label: 'Visualizar', Icon: Eye, url: `/dashboard/documents/${doc.encrypted_id}` },
        ]
      })) || []
    },
/*     {
      key: 'tramitacoes',
      title: 'Tramitações',
      Icon: ArrowRightLeft,
      items: results.tramitacoes?.map(tram => ({
        id: tram.id,
        title: tram.titulo || tram.nome,
        desc: tram.descricao,
        codigo: tram.codigo_documento,
        origem: tram.nome_area_origem,
        destino: tram.nome_area_destino,
        user: tram.nome_user
      })) || []
    }, */
    {
      key: 'outros',
      title: 'Outros',
      items: results.outros?.map(item => ({
        id: item.id,
        title: item.titulo || item.nome,
        desc: item.descricao
      })) || []
    }
  ]

  // Filtra grupos vazios
  return groups.filter(group => group.items.length > 0)
}
