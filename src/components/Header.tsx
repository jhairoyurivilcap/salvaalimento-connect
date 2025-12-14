import { Bell, LogIn, Leaf } from "lucide-react";

interface HeaderProps {
  onNotificationsClick: () => void;
  onLoginClick: () => void;
  notificationCount?: number;
}

const Header = ({ onNotificationsClick, onLoginClick, notificationCount = 0 }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={onNotificationsClick}
          className="relative p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <Bell className="w-6 h-6 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse-soft">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Kumi
          </h1>
        </div>

        <button 
          onClick={onLoginClick}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <LogIn className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
