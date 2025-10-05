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

export const documentosData = {
  labels: ["Financeiro", "Compras", "RH", "Marketing", "Jurídico", "TI"],
  datasets: [
    {
      label: "Documentos",
      data: [567, 423, 480, 234, 189, 240],
      backgroundColor: "#113155",
      borderRadius: 3,
      barThickness: 38,
    },
  ],
};

export const documentosOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.raw} documentos`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "#6b7280", stepSize: 100, font: { size: 12 } },
      grid: { color: "#f3f4f6" },
    },
    x: {
      ticks: {
        color: "#6b7280", font: { size: 11 },
        maxRotation: 30, minRotation: 20,
      },
      grid: { display: false },
    },
  },
};
