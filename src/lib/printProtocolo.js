// lib/printProtocolo.js
import axios from '@/lib/axios';
import QRCode from 'qrcode';

export async function printProtocolo(id) {
  try {
    const response = await axios.get(`/documentos/${id}`);
    const data = response.data;

    const qrBase64 = await QRCode.toDataURL(data.documento.qrcode_doc);

    const html = `
      <html>
        <head>
          <title>Protocolo</title>
          <style>
            @media print { @page { margin: 40px; } }
            body { font-family: Arial; padding: 40px; position: relative; }
            .header { text-align: center; margin-bottom: 50px; }
            .center { text-align: center; margin-bottom: 300px; }
            .footer-left { position: absolute; bottom: 40px; left: 40px; }
            .footer-right { position: absolute; bottom: 40px; right: 40px; text-align:center; }
          </style>
        </head>

        <body onload="window.print(); window.close();">
          <div class="header" style="text-align:center; margin-bottom:120px;">
            <img src="/insignia.svg" alt="Logo" style="max-height:80px; display:block; margin:0 auto 10px;"/>
            <div style="font-weight:bold;">REPÚBLICA DE ANGOLA</div>
            <div style="font-weight:bold;">GOVERNO PROVINCIAL DE LUANDA</div>
            <div style="font-weight:bold;">ADMINISTRAÇÃO MUNICIPAL DO CAZENGA</div>
          </div>

          <div class="center">
            <h1>${data.documento.titulo_doc}</h1>
            <p><strong>Nome do munícipe:</strong> ${data.documento.nome_utente}</p>
            <p>
              <strong>Data de entrada:</strong>
              ${new Date(data.documento.created_at).toLocaleString("pt-AO", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <img src="${qrBase64}" style="width:120px;height:120px"/>
            <p><strong>O técnico:</strong> ${data.documento.name}</p>
          </div>

          <div class="footer" style="position:absolute; bottom:40px; left:40px; right:40px; font-size:12px;">
            <!-- Segunda linha: Logos -->
            <div style="display:flex; justify-content:center; gap:20px; margin-bottom:10px;">
              <img src="/logo gov.png" alt="Instituição 1" style="height:60px;"/>
              <img src="/logo-50anos.jpeg" alt="Instituição 2" style="height:60px;"/>
              <img src="/cazengalogo.png" alt="Instituição 3" style="height:60px;"/>
            </div>

            <!-- Primeira linha: Contactos + Barcode -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 20px;">
              <!-- Contactos -->
              <div style="text-align:left;">
                <div>RUA DOS COMANDOS TALA HADY - CAZENGA</div>
                <div>Província de Luanda | Angola</div>
                <div>944 790 821 | 944 790 921</div>
                <div>adm.municipalcz@gmail.com</div>
              </div>

              <!-- Barcode -->
              <div style="text-align:center;">
                <img src="data:image/png;base64,${data.documento.barcode_doc}" style="height:40px; width:150px;" />
                <div style="margin-top:5px;">${data.documento.codigo_documento}</div>
              </div>
            </div>            
          </div>
        </body>
      </html>
    `;

    // Tenta abrir a nova janela
    const printWindow = window.open('', '_blank');

    // Se o browser bloqueou, cai aqui
    if (!printWindow) {
      alert("⚠️ O navegador bloqueou a janela de impressão. Habilite pop-ups para este site.");
      return;
    }

    // Escreve o HTML no novo documento
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

  } catch (error) {
    console.error('Erro ao imprimir protocolo:', error);
    alert('Erro ao imprimir protocolo. Veja o console para detalhes.');
  }
}
