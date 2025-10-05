import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft } from "lucide-react"

export default function SidebarFilters() {
  return (
    <div className="relative flex-1 p-4 space-y-4 overflow-y-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="tipo">
          <AccordionTrigger>Tipo de Conteúdo</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="docs" />
              <label htmlFor="docs">Documentos</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="users" />
              <label htmlFor="users">Usuários</label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ativo" />
              <label htmlFor="ativo">Ativo</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="inativo" />
              <label htmlFor="inativo">Inativo</label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" size='sm' className="w-full">
        <X className="size-3"/>
        Limpar filtros
      </Button>
    </div>
  )
}
