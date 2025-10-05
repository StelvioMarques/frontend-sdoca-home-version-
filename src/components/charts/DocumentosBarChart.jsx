import { Bar } from "react-chartjs-2";
import { documentosData, documentosOptions } from "./options/documents";

export function DocumentosBarChart() {
  return (
    <div className="p-4 border rounded-md bg-background">
      <p className="mb-2 text-sm text-muted-foreground">Volume de Documentos por Área</p>
      <div className="relative h-[300px]">
        <Bar
          data={documentosData}
          options={{ ...documentosOptions }}
          key={JSON.stringify(documentosData)}
        />
      </div>
    </div>
  );
}
