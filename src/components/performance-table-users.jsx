import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Minus,
  CircleArrowUp,
  CircleArrowDown,
  CircleAlertIcon,
  CircleArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export function PerformanceTableUsers({ data }) {
  const getTrendIcon = (efficiency) => {
    if (efficiency >= 95) {
      return <CircleArrowUp className="w-4 h-4 text-green-500" />;
    } else if (efficiency >= 90) {
      return <CircleArrowRight className="w-4 h-4 text-yellow-500" />;
    } else if (efficiency >= 80) {
      return <CircleAlertIcon className="w-4 h-4 text-orange-500" />;
    } else {
      return <CircleArrowDown className="w-4 h-4 text-red-600" />;
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
          Desempenho por técnico
        </h3>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho de cada técnico
        </p>
      </div>

      {/* Scroll somente em telas pequenas/médias */}
      <div className="overflow-x-auto lg:overflow-x-visible">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className='max-w-[100px]'>Usuário</TableHead>
              <TableHead className="text-center ">Processados</TableHead>
              <TableHead className="text-center">Tempo Médio</TableHead>
              <TableHead className="text-center">Eficiência</TableHead>
              <TableHead className="text-center">Tendência</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((user) => (
              <TableRow
                key={user.usuario}
                className="whitespace-normal lg:break-words"
              >
                {/* Usuário */}
                <TableCell className="font-medium whitespace-normal lg:break-words">
                  {user.usuario}
                </TableCell>

                {/* Processados */}
                <TableCell className="text-center">
                  <Link to="#" className="hover:underline">
                    {user.processados}
                  </Link>
                </TableCell>

                {/* Tempo médio */}
                <TableCell className="flex justify-center lg:whitespace-normal lg:break-words">
                  {user.tempo_medio ? (
                    user.tempo_medio
                  ) : (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  )}
                </TableCell>

                {/* Eficiência + Badge */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {Number(user.eficiencia) > 0 ? (
                      <>
                        <span className="font-medium">
                          {Number(user.eficiencia)}%
                        </span>
                        {getEfficiencyBadge(Number(user.eficiencia))}
                      </>
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                {/* Tendência */}
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    {Number(user.eficiencia) > 0 ? (
                      getTrendIcon(Number(user.eficiencia))
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
