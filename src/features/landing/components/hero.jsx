import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function HeroContent() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["eficiente", "inteligente", "segura", "moderna", "completa"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);


  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-40 lg:py-50">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-5xl tracking-tighter text-center md:text-7xl font-regular">
            <span className="text-secondary-foreground">Gestão documental</span>

            <span className="relative flex justify-center w-full overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold text-accent-foreground"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                        y: 0,
                        opacity: 1,
                      }
                      : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed tracking-tight text-center md:text-xl text-muted-foreground">
            Transforme a gestão de documentos da sua empresa com nossa plataforma
            avançada. Organize, compartilhe e controle todos os seus documentos
            de forma segura e eficiente, garantindo compliance e produtividade.
          </p>
        </div>

        <div className="flex flex-col justify-center w-full gap-3 p-2 md:flex-row md:w-auto md:p-0">
          <Button size="lg" variant="outline">
            Agendar demonstração
          </Button>

          <Button size="lg">
            Começar agora <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}