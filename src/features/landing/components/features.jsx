import { cn } from "@/lib/utils";
import {
  IconBell,
  IconEdit,
  IconFileText,
  IconFolder,
  IconLock,
  IconRepeat,
  IconSearch,
  IconUpload,
} from "@tabler/icons-react";

const featuresData = [
  {
    title: "Gestão de Documentos",
    description: "Armazene, organize e acesse todos os documentos de forma segura e rápida.",
    icon: <IconFolder />
  },
  {
    title: "Tramitação Documental",
    description: "Acompanhe o fluxo dos documentos entre departamentos ou usuários, garantindo aprovação e rastreabilidade.",
    icon: <IconRepeat />
  },
  {
    title: "Upload Rápido",
    description: "Envie documentos em massa com suporte a diferentes formatos.",
    icon: <IconUpload />
  },
  {
    title: "Assinatura Digital",
    description: "Permite assinar documentos eletronicamente de forma segura e legal.",
    icon: <IconEdit />
  },
  {
    title: "Notificações Automáticas",
    description: "Receba alertas quando documentos forem enviados, aprovados ou alterados.",
    icon: <IconBell />
  },
  {
    title: "Segurança de Dados",
    description: "Todos os arquivos são criptografados e só acessíveis por usuários autorizados.",
    icon: <IconLock />
  },
  {
    title: "Busca Inteligente",
    description: "Encontre qualquer documento em segundos usando filtros e pesquisa avançada.",
    icon: <IconSearch />
  },
  {
    title: "Controle de Versões",
    description: "Mantenha histórico de alterações e versões dos documentos importantes.",
    icon: <IconFileText />
  },
];

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature",

        // MOBILE (1 col) → lista
        "border-b first:border-t-0 border-x last:border-b-0 mx-4",

        // TABLET (2 cols)
        "md:mx-0 md:border-0 md:py-10 md:border-r",
        index < 6 && "md:border-b",        // só até linha 3 no md
        index % 2 === 0 && "md:border-l",  // col da esquerda no md

        // DESKTOP (4 cols)
        "lg:mx-0 lg:py-10 lg:border-r",
        index < 4 && "lg:border-b",        // só linha de cima
        index >= 4 && "lg:border-b-0",     // força tirar borda da linha de baixo
        index % 4 === 0 && "lg:border-l"   // col da esquerda
      )}
    >
      {index < 4 && (
        <div
          className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:opacity-100 bg-gradient-to-t from-[#f8941f]/15 to-transparent" />
      )}

      {index >= 4 && (
        <div
          className="absolute inset-0 w-full h-full transition duration-200 opacity-0 pointer-events-none group-hover/feature:opacity-100 bg-gradient-to-b from-[#f8941f]/15  to-transparent" />
      )}

      <div
        className="relative z-10 px-10 mb-4 text-secondary-foreground">
        {icon}
      </div>

      <div className="relative z-10 px-10 mb-2 text-lg font-semibold">
        <div
          className="absolute inset-y-0 left-0 w-1 h-6 transition-all duration-200 origin-center rounded-tr-full rounded-br-full bg-accent-foreground group-hover/feature:h-8 group-hover/feature:bg-accent-background"
        />

        <span
          className="inline-block transition duration-200 group-hover/feature:translate-x-2 text-secondary-foreground ">
          {title}
        </span>
      </div>

      <p className="relative z-10 px-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default function FeaturesContent() {
  return (
    <div id="features"
      className="container relative z-10 grid grid-cols-1 py-10 mx-auto md:grid-cols-2 lg:grid-cols-4">
      {featuresData.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}


