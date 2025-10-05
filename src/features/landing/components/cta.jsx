import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, MoveRight, PhoneCall } from "lucide-react";

export default function CTAContent() {

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="max-w-2xl text-lg leading-relaxed tracking-tight text-muted-foreground">
        Managing a small business today is already tough. Avoid further
        complications by ditching outdated, tedious trade methods. Our goal
        is to streamline SMB trade, making it easier and faster than ever.
      </p>

      <div className="flex flex-row gap-4">
        <Button variant="outline" size='lg'>
          Agendar Demonstração
        </Button>

        <Button className="gap-3" size='lg'>
          Começar Agora <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}


