import { ArrowLeft, Clock, Bell } from "lucide-react";
import { Notification } from "@/types/product";
import { cn } from "@/lib/utils";

import galletasCasino from "@/assets/galletas-casino.png";
import yogurtFresa from "@/assets/yogurt-fresa.png";
import panMolde from "@/assets/pan-molde.png";

const imageMap: Record<string, string> = {
  "1": galletasCasino,
  "2": yogurtFresa,
  "3": panMolde,
  "4": galletasCasino,
};

interface NotificationsViewProps {
  notifications: Notification[];
  onBack: () => void;
}

const NotificationsView = ({ notifications, onBack }: NotificationsViewProps) => {
  const getExpiryBadgeClass = (days: number) => {
    if (days <= 3) return "badge-urgent";
    if (days <= 7) return "badge-warning";
    return "badge-safe";
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Notificaciones</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No tienes notificaciones</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  "bg-card border rounded-xl p-4 flex items-start gap-4 animate-fade-in",
                  notification.isNew ? "border-primary/30 bg-primary/5" : "border-border"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/50 overflow-hidden flex-shrink-0">
                  <img
                    src={imageMap[notification.id] || galletasCasino}
                    alt={notification.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {notification.isNew && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-accent/15 text-accent text-xs font-semibold rounded-full mb-1">
                          ¡Nuevo!
                        </span>
                      )}
                      <p className="text-foreground">
                        El producto{" "}
                        <span className="font-semibold">{notification.productName}</span>{" "}
                        vence en{" "}
                        <span className={cn(
                          "font-semibold",
                          notification.daysToExpire <= 3 ? "text-accent" : "text-warning"
                        )}>
                          {notification.daysToExpire} días
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;
