import { ArrowLeft, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginViewProps {
  onBack: () => void;
}

const LoginView = ({ onBack }: LoginViewProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Función en desarrollo",
      description: "El sistema de login estará disponible próximamente.",
    });
  };

  const handleRegister = () => {
    toast({
      title: "Función en desarrollo",
      description: "El registro estará disponible próximamente.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">SalvaAlimento</h1>
            <p className="text-muted-foreground mt-2">Ingresa para ofertar tus productos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Usuario
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-card border-border focus:border-primary"
              />
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold gradient-primary text-primary-foreground hover:opacity-90"
              >
                Iniciar Sesión
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleRegister}
                className="w-full h-12 text-base font-semibold border-primary text-primary hover:bg-primary/10"
              >
                Regístrate
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            ¿Eres un supermercado o tienda?{" "}
            <button className="text-primary font-medium hover:underline">
              Únete como ofertante
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
