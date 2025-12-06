import { Clock, MapPin, Tag } from "lucide-react";
import { Product } from "@/types/product";
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

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const getExpiryBadgeClass = (days: number) => {
    if (days <= 3) return "badge-urgent";
    if (days <= 7) return "badge-warning";
    return "badge-safe";
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <button
      onClick={onClick}
      className="bg-card rounded-xl border border-border overflow-hidden hover-lift text-left w-full group animate-fade-in"
    >
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        <img
          src={imageMap[product.id] || galletasCasino}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 gradient-accent rounded-full">
            <span className="text-xs font-bold text-accent-foreground">-{discount}%</span>
          </div>
        )}
        <div className={cn("badge-expiry absolute top-2 right-2", getExpiryBadgeClass(product.daysToExpire))}>
          <Clock className="w-3 h-3 mr-1" />
          {product.daysToExpire} días
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="text-xs">{product.vendor} - {product.vendorLocation}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">S/ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
