import { MoreVertical, DownloadIcon, ChevronRight, ChevronLeft, Minus, Plus, X, Share2, Printer, FileText, Split, FilePlus2, Shield, ShieldOff, ComputerIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';


export const renderToolbar = (Toolbar, onClose) => (
  <Toolbar>
    {(slots) => {
      const {
        Download,
        ZoomIn,
        ZoomOut,
        Zoom,
        GoToNextPage,
        GoToPreviousPage,
        CurrentPageInput,
        NumberOfPages,
      } = slots;

      return (
        <div className="flex items-end justify-between w-full gap-2 p-2 bg-white border-b">
          {/* ZOOM CONTROLS - Esquerda */}
          <div className="flex items-center ">
            <ZoomOut>
              {(props) => (
                <button onClick={props.onClick} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100" title='Diminuir'>
                  <Minus size={14} className='text-black' />
                </button>
              )}
            </ZoomOut>

            <Zoom>
              {(props) => (
                <button onClick={props.onClick} className="flex items-center justify-center px-3 py-1 text-xs font-medium"  >
                  {Math.round(props.scale * 100)}%
                </button>
              )}
            </Zoom>

            <ZoomIn>
              {(props) => (
                <button onClick={props.onClick} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100" title='Aumentar'>
                  <Plus size={14} className='text-black' />
                </button>
              )}
            </ZoomIn>
          </div>

          {/* NAVEGAÇÃO DE PÁGINAS - Centro */}
          <div className="flex items-center gap-1">
            <GoToPreviousPage>
              {(props) => (
                <button onClick={props.onClick} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100" title='Página anterior'>
                  <ChevronLeft size={14} />
                </button>
              )}
            </GoToPreviousPage>

            <div className="flex items-center gap-1 text-gray-700">
              <CurrentPageInput />
              <span >de</span>
              <NumberOfPages />
            </div>

            <GoToNextPage>
              {(props) => (
                <button onClick={props.onClick} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100" title='Página seguinte'>
                  <ChevronRight size={14} />
                </button>
              )}
            </GoToNextPage>
          </div>

          {/* DOWNLOAD - Direita */}
          <div className="flex items-center">


            {/* Menu de 3 pontos */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100" title="Mais opções">
                  <MoreVertical size={17} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Download>
                    {(props) => (
                      <button onClick={props.onClick} className="flex w-full items-center gap-2 px-2 py-1.5 text-sm hover:bg-[#f5f5f5]">
                        <DownloadIcon className="w-4 h-4 mr-2 text-gray-500" />
                        Baixar PDF
                      </button>
                    )}
                  </Download>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Imprimir')}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Dividir PDF')}>
                  <Split className="w-4 h-4 mr-2" />
                  Dividir PDF
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Juntar PDFs')}>
                  <FilePlus2 className="w-4 h-4 mr-2" />
                  Juntar PDFs
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Comprimir')}>
                  <ComputerIcon className="w-4 h-4 mr-2" />
                  Comprimir PDF
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Proteger com senha')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Proteger com senha
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Remover senha')}>
                  <ShieldOff className="w-4 h-4 mr-2" />
                  Remover senha
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log('Converter para Word')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Converter para Word
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onClose} className="text-red-500">
                  <X className="w-4 h-4 mr-2" />
                  Fechar visualização
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    }}
  </Toolbar>
);
