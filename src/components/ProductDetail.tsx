import { ArrowLeft, Clock, MapPin, Package, ExternalLink } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import galletasCasino from "@/assets/galletas-casino.png";
import galletasChocolate from "@/assets/galletas-chocolate.png";
import yogurtFresa from "@/assets/yogurt-fresa.png";
import incaKola from "@/assets/inca-kola.png";
import panMolde from "@/assets/pan-molde.png";
import chocolates from "@/assets/chocolates.png";

const imageMap: Record<string, string> = {
  "1": galletasCasino,
  "2": galletasChocolate,
  "3": yogurtFresa,
  "4": incaKola,
  "5": panMolde,
  "6": chocolates,
};

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const getExpiryBadgeClass = (days: number) => {
    if (days <= 3) return "badge-urgent";
    if (days <= 7) return "badge-warning";
    return "badge-safe";
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${product.vendor} ${product.vendorLocation} Lima Peru`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
            <img
              src={imageMap[product.id] || galletasCasino}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 px-3 py-1.5 gradient-accent rounded-full">
                <span className="text-sm font-bold text-accent-foreground">-{discount}% OFF</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-sm text-primary font-medium uppercase tracking-wide">
                Categoría {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                {product.name}
              </h1>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  S/ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    S/ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className={cn("badge-expiry text-sm", getExpiryBadgeClass(product.daysToExpire))}>
                <Clock className="w-4 h-4 mr-1" />
                Vence en {product.daysToExpire} días
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{product.vendor}</p>
                    <p className="text-sm text-muted-foreground">{product.vendorLocation}</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenMaps}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                >
                  Abrir Maps
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Stock disponible</p>
                    <p className="text-sm text-muted-foreground">{product.stock} unidades</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full h-14 text-lg font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Contactar vendedor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
