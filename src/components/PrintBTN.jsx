import { useState } from "react";
import { Printer } from "lucide-react";
import { usePrintProtocolo } from "@/hooks/usePrintProtocolo";

export default function PrintButton({ docId }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2"
      >
        <Printer className="w-4 h-4" />
        Imprimir protocolo
      </button>

      {/* renderiza o template invisível só quando o usuário clicar */}
      {show && usePrintProtocolo(docId)}
    </>
  );
}
