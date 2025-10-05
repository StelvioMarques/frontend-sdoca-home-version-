import QRCode from "@/components/qr-code";
import { useProtocoloData } from "../hooks/docHooks";

export default function ProtocolTemplate({ id }) {
  const { data, isLoading, error } = useProtocoloData(id);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar protocolo.</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  return (
    <div
      id="protocolo-template"
      style={{
        width: '800px',
        minHeight: '1120px', // tamanho aproximado de A4
        margin: '0 auto',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ccc',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Topo: logo */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
       {/*  <img
          src="/logo.png" // substitua pelo caminho do seu logo
          alt="Logo"
          style={{ maxHeight: '100px', objectFit: 'contain' }}
        /> */}
        LOGO
      </div>

      {/* Centro: título, data e responsável */}
      <div style={{ textAlign: 'center', marginBottom: '300px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{data.title}</h1>
        <p><strong>Data de Entrada:</strong> {data.date}</p>
        <p><strong>Responsável:</strong> {data.user_name}</p>
      </div>

      {/* Rodapé: QR code e Barcode */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
        }}
      >
        <QRCode />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
        }}
      >
        <img
          src={`data:image/png;base64,${data.barcode_doc}`}// Barcode vindo do back
          alt="Barcode"
          style={{ height: '60px' }}
        />
      </div>
    </div>
  );
}
