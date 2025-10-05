// components/ProtocolTemplate.jsx
import QRCode from "./qr-code";

export default function ProtocolTemplate({ data }) {
  if (!data) return <p>Sem dados</p>;

  return (
    <div style={{ padding: 40, fontFamily: "Arial", position: "relative" }}>
      {/* Topo */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <img src="/logo.png" alt="Logo" style={{ maxHeight: 100 }} />
      </div>

      {/* Centro */}
      <div style={{ textAlign: "center", marginBottom: 300 }}>
        <h1>{data.documento.titulo_doc}</h1>
        <p><strong>Data de Entrada:</strong> {data.documento.created_at}</p>
        <p><strong>Responsável:</strong> {data.documento.name}</p>
      </div>

      {/* Rodapé */}
      <div style={{ position: "absolute", bottom: 40, left: 40 }}>
        <QRCode link={data.qrcode_value} />
      </div>

      <div style={{ position: "absolute", bottom: 40, right: 40 }}>
        <img src={data.barcode_doc} style={{ height: 60 }} />
      </div>
    </div>
  );
}
