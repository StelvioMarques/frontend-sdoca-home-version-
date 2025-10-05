"use client"

import {
  Archive,
  Boxes,
  Clock,
  FileText,
  FolderOpen,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Monitor, Sun, Moon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/context/theme-context"

export default function SettingsPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-full mx-auto space-y-6 max-w-7xl">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-medium tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground">
          Personalize o comportamento do sistema de gestão documental
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2">
          <TabsTrigger value="documents" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documentos</span>
          </TabsTrigger>
          <TabsTrigger value="others" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Outras</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab: Documentos */}
        <TabsContent value="documents" className="space-y-10">
          {/* Seção 1: Definições Lógicas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tipologia e Retenção</h2>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Temporalidades */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-icon-foreground" />
                    <span>Temporalidades</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie os prazos de guarda e destino dos documentos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/temps")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Tipos de Documentos */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-icon-foreground" />
                    <span>Tipos de Documentos</span>
                  </CardTitle>
                  <CardDescription>
                    Classifique os documentos por tipo ou categoria.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/doc-types")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Seção 2: Mapeamento Físico */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Mapeamento Físico</h2>

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Armários */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Boxes className="w-5 h-5 text-icon-foreground" />
                    <span>Armários</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie os armários físicos usados para arquivamento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/cabinets")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Gavetas */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Archive className="w-5 h-5 text-icon-foreground" />
                    <span>Gavetas</span>
                  </CardTitle>
                  <CardDescription>
                    Defina a estrutura de gavetas dentro dos armários.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/drawers")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>

              {/* Capas de Processo */}
              <Card className='shadow-none'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5 text-icon-foreground" />
                    <span>Capas de Processo</span>
                  </CardTitle>
                  <CardDescription>
                    Organize as capas dentro das gavetas físicas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate("/dashboard/process-covers")}>
                    Gerenciar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Outras Configurações */}
        <TabsContent value="others" className="space-y-6">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Outras Configurações</CardTitle>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Linha de Modo Escuro */}
              <div className="flex flex-col gap-4 px-4 py-3 border rounded-lg md:flex-row md:items-center md:justify-between">
                <div className="space-y-0.5 flex-1">
                  <p className="text-sm font-medium">Modo Escuro</p>
                  <p className="text-sm text-muted-foreground">
                    Ative para usar o tema escuro em toda a aplicação.
                  </p>
                </div>

                <ToggleGroup
                  type="single"
                  className="flex justify-center md:justify-end"
                  value={theme}
                  onValueChange={(value) => value && setTheme(value)}
                >
                  <ToggleGroupItem value="light" aria-label="Modo Claro">
                    <Sun className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Claro</span>
                  </ToggleGroupItem>

                  <ToggleGroupItem value="system" aria-label="Modo Sistema" className='p-2'>
                    <Monitor className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Sistema</span>
                  </ToggleGroupItem>

                  <ToggleGroupItem value="dark" aria-label="Modo Escuro">
                    <Moon className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Escuro</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
