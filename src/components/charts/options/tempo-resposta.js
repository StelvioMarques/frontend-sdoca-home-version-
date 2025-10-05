import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTRO GLOBAL
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const tempoBruto = [
  { area: "TI", tempoMedio: 1.5 },
  { area: "Financeiro", tempoMedio: 2.5 },
  { area: "RH", tempoMedio: 3.3 },
  { area: "Marketing", tempoMedio: 2.7 },
  { area: "Compras", tempoMedio: 1 },
  { area: "Jurídico", tempoMedio: 1.3 },
];

const labels = tempoBruto.map((d) => d.area);
const normal = tempoBruto.map((d) => (d.tempoMedio <= 2 ? d.tempoMedio : 0));
const atencao = tempoBruto.map((d) => (d.tempoMedio > 2 && d.tempoMedio <= 3 ? d.tempoMedio : 0));
const critico = tempoBruto.map((d) => (d.tempoMedio > 3 ? d.tempoMedio : 0));

export const tempoRespostaData = {
  labels,
  datasets: [
    {
      label: "Normal (≤ 2 dias)",
      data: normal,
      backgroundColor: "#113155",
      borderRadius: 4,
      barThickness: 32,
    },
    {
      label: "Atenção (2 - 3 dias)",
      data: atencao,
      backgroundColor: "#f8941f",
      borderRadius: 4,
      barThickness: 32,
    },
    {
      label: "Crítico (> 3 dias)",
      data: critico,
      backgroundColor: "#ef4444",
      borderRadius: 4,
      barThickness: 32,
    },
  ],
};

export const tempoRespostaOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        font: { size: 12 },
        boxWidth: 12,
        padding: 12,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.raw} dias`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "#6b7280", font: { size: 12 } },
      grid: { color: "#f3f4f6" },
    },
    x: {
      stacked: true,
      ticks: {
        color: "#6b7280", font: { size: 11 },
        maxRotation: 30, minRotation: 20,
      },
      grid: { display: false },
    },
  },
};
