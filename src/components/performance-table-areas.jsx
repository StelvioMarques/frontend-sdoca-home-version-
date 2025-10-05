import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Circle, CircleArrowUp, CircleArrowDown, CircleCheck, CircleAlertIcon, CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { Link } from "react-router-dom";

export function PerformanceTableArea({ data }) {
  const getTrendIcon = (efficiency) => {
    if (efficiency >= 95) {
      return <CircleArrowUp className="w-4 h-4 text-green-500 " />;
    } else if (efficiency >= 90) {
      return <CircleArrowRight className="w-4 h-4 text-yellow-500" />; // estável (bom)
    } else if (efficiency >= 80) {
      return <CircleAlertIcon className="w-4 h-4 text-orange-500" />; // queda leve
    } else {
      return <CircleArrowDown className="w-4 h-4 text-red-600" />; // queda crítica
    }
  };

  const getEfficiencyBadge = (efficiency) => {
    if (efficiency >= 95) {
      return (
        <Badge className="text-green-800 bg-green-100 hover:bg-green-100">
          Excelente
        </Badge>
      );
    } else if (efficiency >= 90) {
      return (
        <Badge className="text-yellow-800 bg-yellow-100 hover:bg-yellow-100">
          Bom
        </Badge>
      );
    } else if (efficiency >= 80) {
      return (
        <Badge className="text-orange-800 bg-orange-100 hover:bg-orange-100">
          Regular
        </Badge>
      );
    } else {
      return (
        <Badge className="text-red-800 bg-red-100 hover:bg-red-100">
          Crítico
        </Badge>
      );
    }
  };


  return (
    <div className="p-6 mb-10 border rounded-md bg-background">
      <div className="mb-6">
        <h3 className="mb-1 text-xl font-semibold text-foreground">
          Desempenho por área
        </h3>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho de cada área na tramitação de documentos
        </p>
      </div>

      {/* Scroll apenas em telas pequenas e médias */}
      <div className="overflow-x-auto ">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Área</TableHead>
              <TableHead className="text-center">Total docs.</TableHead>
              <TableHead className="text-center">Pendentes</TableHead>
              <TableHead className="text-center">Processados</TableHead>
              <TableHead className="text-center">Tempo Médio</TableHead>
              <TableHead className="text-center">Eficiência</TableHead>
              <TableHead className="text-center">Tendência</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((area) => (
              <TableRow key={area.nome}>
                <TableCell className="font-medium whitespace-normal lg:break-words">
                  {area.nome}
                </TableCell>

                <TableCell className="text-center">
                  <Link to="#" className="hover:underline">
                    {area.total_docs}
                  </Link>
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={
                      Number(area.pendentes) > 20
                        ? "text-red-600 font-medium"
                        : ""
                    }
                  >
                    <Link to="#" className="hover:underline">
                      {area.pendentes}
                    </Link>
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  <Link to="#" className="hover:underline">
                    {area.processados}
                  </Link>
                </TableCell>

                <TableCell className="flex justify-center lg:break-words lg:whitespace-normal">
                  {area.tempo_medio ? (
                    area.tempo_medio
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {Number(area.eficiencia) > 0 ? (
                      <>
                        <span className="font-medium">
                          {Number(area.eficiencia)}%
                        </span>
                        {getEfficiencyBadge(Number(area.eficiencia))}
                      </>
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {Number(area.eficiencia) > 0 ? (
                      getTrendIcon(Number(area.eficiencia))
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

  );
}
