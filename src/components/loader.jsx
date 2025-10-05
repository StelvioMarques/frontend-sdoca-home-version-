
import { PuffLoader  } from "react-spinners";

export default function APPLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background">
      <PuffLoader  color="orange" size={50} />
      <span className="text-base font-medium text-muted-foreground">Carregando...</span>
    </div>
  );
}
