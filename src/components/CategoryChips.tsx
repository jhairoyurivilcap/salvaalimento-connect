import { Cookie, Wine, Candy, Milk, Croissant, Package, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Cookie: <Cookie className="w-4 h-4" />,
  Wine: <Wine className="w-4 h-4" />,
  Candy: <Candy className="w-4 h-4" />,
  Milk: <Milk className="w-4 h-4" />,
  Croissant: <Croissant className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
};

interface CategoryChipsProps {
  categories: { id: string; name: string; icon: string }[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const CategoryChips = ({ categories, selectedCategory, onCategorySelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.slice(0, 4).map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(selectedCategory === category.id ? null : category.id)}
          className={cn(
            "chip flex-shrink-0 gap-2",
            selectedCategory === category.id ? "chip-active" : "chip-inactive"
          )}
        >
          {iconMap[category.icon]}
          {category.name}
        </button>
      ))}
      <button
        onClick={() => {}}
        className="chip chip-inactive flex-shrink-0 gap-1"
      >
        <MoreHorizontal className="w-4 h-4" />
        Ver más
      </button>
    </div>
  );
};

export default CategoryChips;
