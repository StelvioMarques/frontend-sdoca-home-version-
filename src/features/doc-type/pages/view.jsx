
import { Calendar, Edit, Mail, MapPin, Phone, Users, Layers } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados da organização
const organizationData = {
    id: 1,
    name: "TechCorp Solutions",
    description:
        "Empresa líder em soluções tecnológicas corporativas, especializada em transformação digital e inovação empresarial.",
    cnpj: "12.345.678/0001-90",
    phone: "+55 (11) 3456-7890",
    email: "contato@techcorp.com.br",
    website: "www.techcorp.com.br",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    foundedDate: "2018-03-15",
    status: "active",
    totalEmployees: 245,
    totalAreas: 8,
    logo: "TC",
}

const areasData = [

    /* 
        {
            id: 1,
            name: "Tecnologia da Informação",
            manager: "João Silva",
            employees: 45,
            budget: "R$ 2.500.000",
            status: "active",
            description: "Desenvolvimento e manutenção de sistemas",
        },
        {
            id: 2,
            name: "Recursos Humanos",
            manager: "Maria Santos",
            employees: 12,
            budget: "R$ 800.000",
            status: "active",
            description: "Gestão de pessoas e desenvolvimento organizacional",
        },
        {
            id: 3,
            name: "Financeiro",
            manager: "Carlos Oliveira",
            employees: 18,
            budget: "R$ 1.200.000",
            status: "active",
            description: "Controle financeiro e contabilidade",
        },
        {
            id: 4,
            name: "Marketing",
            manager: "Ana Costa",
            employees: 25,
            budget: "R$ 1.800.000",
            status: "active",
            description: "Marketing digital e comunicação corporativa",
        },
        {
            id: 5,
            name: "Vendas",
            manager: "Pedro Lima",
            employees: 32,
            budget: "R$ 3.200.000",
            status: "active",
            description: "Vendas corporativas e relacionamento com clientes",
        },
        {
            id: 1,
            name: "Tecnologia da Informação",
            manager: "João Silva",
            employees: 45,
            budget: "R$ 2.500.000",
            status: "active",
            description: "Desenvolvimento e manutenção de sistemas",
        },
        {
            id: 2,
            name: "Recursos Humanos",
            manager: "Maria Santos",
            employees: 12,
            budget: "R$ 800.000",
            status: "active",
            description: "Gestão de pessoas e desenvolvimento organizacional",
        },
        {
            id: 3,
            name: "Financeiro",
            manager: "Carlos Oliveira",
            employees: 18,
            budget: "R$ 1.200.000",
            status: "active",
            description: "Controle financeiro e contabilidade",
        },
        {
            id: 4,
            name: "Marketing",
            manager: "Ana Costa",
            employees: 25,
            budget: "R$ 1.800.000",
            status: "active",
            description: "Marketing digital e comunicação corporativa",
        },
        {
            id: 5,
            name: "Vendas",
            manager: "Pedro Lima",
            employees: 32,
            budget: "R$ 3.200.000",
            status: "active",
            description: "Vendas corporativas e relacionamento com clientes",
        },
    */
]

export default function ViewArea() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Side */}
            <div className="space-y-6 lg:col-span-1">
                {/* Card Principal */}
                <Card className='shadow-none'>
                    <CardHeader className="text-center">
                        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-3xl font-bold rounded-full bg-primary text-primary-foreground">
                            {organizationData.logo}
                        </div>
                        <CardTitle className="text-xl">{organizationData.name}</CardTitle>
                        <CardDescription>{organizationData.description}</CardDescription>
                        <Badge variant={organizationData.status === "active" ? "default" : "secondary"} className="mx-auto w-fit">
                            {organizationData.status === "active" ? "Ativa" : "Inativa"}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar Organização
                        </Button>
                    </CardContent>
                </Card>

                {/* Card de Estatísticas */}
                <Card className='shadow-none'>
                    <CardHeader>
                        <CardTitle className="text-lg">Estatísticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Funcionários</span>
                            </div>
                            <span className="font-semibold">{organizationData.totalEmployees}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Layers className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Áreas</span>
                            </div>
                            <span className="font-semibold">{areasData.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Fundada</span>
                            </div>
                            <span className="font-semibold">{new Date(organizationData.foundedDate).getFullYear()}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card de Contato */}
                <Card className='shadow-none'>
                    <CardHeader>
                        <CardTitle className="text-lg">Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{organizationData.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{organizationData.email}</span>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span className="text-sm">{organizationData.address}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Área principal com tabela */}
            <div className="lg:col-span-2">
                <Card className="shadow-none h-fit">
                    <CardHeader>
                        <CardTitle>Áreas da Organização</CardTitle>
                        <CardDescription>Visualização detalhada de todas as áreas e departamentos da organização</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {areasData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Área</TableHead>
                                        <TableHead>Responsável</TableHead>
                                        <TableHead className="text-center">Funcionários</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="w-20 text-center"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {areasData.map((area) => (
                                        <TableRow key={area.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{area.name}</p>
                                                    <p className="text-sm text-muted-foreground">{area.description}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{area.manager}</TableCell>
                                            <TableCell className="text-center">{area.employees}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={area.status === "active" ? "default" : "secondary"}>
                                                    {area.status === "active" ? "Ativa" : "Inativa"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm text-center">...</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-12 text-center">
                                <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-semibold">Nenhuma área encontrada</h3>
                                <p className="mb-4 text-muted-foreground">
                                    Esta organização ainda não possui áreas ou departamentos cadastrados.
                                </p>
                                <Button>
                                    <Layers className="w-4 h-4 mr-2" />
                                    Criar Primeira Área
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

/* 
import { Loader2, ChevronLeftIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import ImageUploader from '@/components/ImageUploader'
//import { useOrganizations } from '@/hooks/useOrganization'
import { Link, useParams } from 'react-router-dom'
import { useEffect,  } from 'react'

export default function ViewOrganization() {
    const { id } = useParams()
    //const { getOrganization, loading } = useOrganizations()

    useEffect(function () {
        async function loadData() {
           // const data = await getOrganization(id)

        }

        loadData()
    }, [id])

    return (
        <>
        <p>teste view</p>
        </>
    )
}
 */