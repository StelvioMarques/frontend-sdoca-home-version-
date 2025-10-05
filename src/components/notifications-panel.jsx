"use client";

import * as React from "react";
import { Bell, Check, Download, Upload, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNotificacoes } from "@/hooks/useNotificationsHooks";
import { useUpdateNotificacao } from "@/hooks/useNotificationsHooks";
import { Link } from "react-router-dom";
import formatDate from "@/utils/format-date";

const ICON_MAP = {
  entrada: Download,
  saida: Upload,
  revisao: Clock,
  aprovacao: Mail,
  default: Mail,
};

export function NotificationsPanel() {
  const [open, setOpen] = React.useState(false);

  const { notificacoes, isLoading } = useNotificacoes();
  const { mutate: updateNotificacao } = useUpdateNotificacao();

  const unreadCount = notificacoes?.filter((n) => n.status !== "1").length || 0;

  const markAsRead = (id) => {
    updateNotificacao({ id, formData: { status: "1" } });
  };

  const markAllAsRead = () => {
    notificacoes.forEach((notif) => {
      if (notif.status !== "1") {
        markAsRead(notif.id);
      }
    });
  };

  // --- 🔊 Lógica do som ---
  const prevCountRef = React.useRef(null); // começa como null para ignorar o primeiro render
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    // inicializa o áudio só uma vez
    audioRef.current = new Audio("/notification.mp3");
    audioRef.current.volume = 0.7; // opcional: controla o volume
  }, []);

  React.useEffect(() => {
    if (!notificacoes) return;

    const currentCount = notificacoes.length;

    if (prevCountRef.current !== null && currentCount > prevCountRef.current) {
      // toca o som só quando chega uma nova notificação
      audioRef.current?.play().catch(() => {
        console.warn("Som bloqueado até interação do usuário.");
      });
    }

    prevCountRef.current = currentCount;
  }, [notificacoes]);
  // --- fim do som ---

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative w-8 h-8">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-0.5 -right-0.5 w-3 h-3 p-0 flex items-center justify-center text-[8px] rounded-full"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-80 sm:w-96 md:pt-5">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notificações</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </SheetHeader>
        <ScrollArea className="h-full pb-10 mt-3 overflow-auto">
          <div className="px-3 space-y-4">
            {isLoading ? (
              <p className="text-sm text-center text-muted-foreground">Carregando...</p>
            ) : notificacoes?.length === 0 ? (
              <p className="text-sm text-center text-muted-foreground">Nenhuma notificação</p>
            ) : (
              notificacoes.map((notif) => {
                const Icon = ICON_MAP[notif.acao] || ICON_MAP.default;
                const isRead = notif.status === "1";

                return (
                  <div
                    key={notif.id}
                    className={`flex gap-3 p-3 rounded-lg border transition-colors ${
                      !isRead ? "bg-muted border-none" : "bg-background"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium">{notif.titulo}</p>
                        {!isRead && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6"
                            onClick={() => markAsRead(notif.id)}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notif.mensagem}</p>
                      <div className="flex items-center justify-between pr-2">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(notif.data_notificacao, "notification")}
                        </p>
                        <Link
                          to={`/dashboard/documents/${notif.doc_encrypted_id}`}
                          onClick={() => {
                            setOpen(false);
                            if (!isRead) {
                              markAsRead(notif.id);
                            }
                          }}
                        >
                          <p className="text-xs text-muted-foreground hover:underline hover:text-accent-foreground">
                            Ver
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
