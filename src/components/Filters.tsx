import { ChevronDown, SlidersHorizontal, Store } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedVendor: string | null;
  onVendorChange: (value: string | null) => void;
  vendors: { id: string; name: string }[];
}

const Filters = ({ sortBy, onSortChange, selectedVendor, onVendorChange, vendors }: FiltersProps) => {
  return (
    <div className="flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Ordenar por</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-card border-border">
          <DropdownMenuItem 
            onClick={() => onSortChange("price")}
            className={sortBy === "price" ? "bg-primary/10" : ""}
          >
            Precio (menor a mayor)
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onSortChange("expiry")}
            className={sortBy === "expiry" ? "bg-primary/10" : ""}
          >
            Vencimiento (próximo)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
            <Store className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedVendor ? vendors.find(v => v.id === selectedVendor)?.name : "Tiendas"}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-card border-border">
          <DropdownMenuItem onClick={() => onVendorChange(null)}>
            Todas las tiendas
          </DropdownMenuItem>
          {vendors.map((vendor) => (
            <DropdownMenuItem 
              key={vendor.id}
              onClick={() => onVendorChange(vendor.id)}
              className={selectedVendor === vendor.id ? "bg-primary/10" : ""}
            >
              {vendor.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filters;
