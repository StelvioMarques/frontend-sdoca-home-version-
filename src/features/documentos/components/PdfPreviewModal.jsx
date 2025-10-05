import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfPreviewModal({ fileUrl, onClose }) {
  const layoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute z-10 px-3 py-1 text-sm text-white bg-red-600 rounded top-2 right-2 hover:bg-red-700"
        >
          Fechar
        </button>

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} plugins={[layoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}
