import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { renderToolbar } from '@/features/documentos/components/pdf/CustomPdfToolbar.jsx'
import { renderSidebarTabs } from '@/features/documentos/components/pdf/CustomPdfSidebar.jsx'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { RemoveScroll } from 'react-remove-scroll';

export default function PdfViewer({ selectedPdfUrl, setSelectedPdfUrl }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => renderToolbar(Toolbar, () => setSelectedPdfUrl(null)),
    sidebarTabs: renderSidebarTabs
  });

  return (
    <>
      {selectedPdfUrl && (
        <RemoveScroll>
          <div className="fixed inset-0 z-50 flex bg-background">
            <div className="flex-1 h-full overflow-hidden bg-white shadow">
              <Viewer
                fileUrl={selectedPdfUrl}
                defaultScale="PageFit"
                initialPage={0}
                theme="light"
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </div>
        </RemoveScroll>
      )}
    </>
  )
}