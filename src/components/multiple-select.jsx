
import { Label } from "@/components/ui/label"
import MultipleSelector from "@/components/ui/multiselect";
import { Loader2 } from "lucide-react";

export default function AreasSelector({ areas = [], selected = [], onChange }) {

  if (!Array.isArray(areas) || areas.length === 0) {
    // Mostra loader ou mensagem enquanto os dados não chegam
    return <Loader2 className="w-3 h-3 animate-spin" />
  }

  const options = areas
    .filter(area => area && area.id !== undefined && area.name_area)
    .map(area => ({
      value: area.id,
      label: area.name_area,
    }))

  const selectedOptions = selected
    .filter(area => area && area.id !== undefined && area.name_area)
    .map(area => ({
      value: area.id,
      label: area.name_area,
    }))

  return (
    <div className="*:not-first:mt-2">
      <Label>Área(s) de destino</Label>
      <MultipleSelector
        commandProps={{ label: "Select areas" }}
        value={selectedOptions}
        defaultOptions={options}
        placeholder="Selecione as áreas"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-sm text-center">Sem resultados encontrados</p>}
        onChange={(selectedOptions) => {
          // aqui transformamos para array de IDs e repassamos
          if (onChange) {
            onChange(selectedOptions.map(option => option.value))
          }
        }}
      />
    </div>
  )
}
