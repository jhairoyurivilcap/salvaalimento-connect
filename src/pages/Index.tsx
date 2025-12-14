import { useState, useMemo } from "react";
import { Info, X } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import LoginView from "@/components/LoginView";
import NotificationsView from "@/components/NotificationsView";
import { products, categories, vendors, notifications } from "@/data/mockData";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type View = "home" | "product-detail" | "login" | "notifications";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("price");
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by vendor
    if (selectedVendor) {
      const vendorName = vendors.find((v) => v.id === selectedVendor)?.name;
      if (vendorName) {
        result = result.filter((p) => p.vendor === vendorName);
      }
    }

    // Sort
    if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "expiry") {
      result.sort((a, b) => a.daysToExpire - b.daysToExpire);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedVendor, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product-detail");
  };

  const handleBack = () => {
    setCurrentView("home");
    setSelectedProduct(null);
  };

  const newNotificationsCount = notifications.filter((n) => n.isNew).length;

  if (currentView === "product-detail" && selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBack} />;
  }

  if (currentView === "login") {
    return <LoginView onBack={handleBack} />;
  }

  if (currentView === "notifications") {
    return <NotificationsView notifications={notifications} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNotificationsClick={() => setCurrentView("notifications")}
        onLoginClick={() => setCurrentView("login")}
        notificationCount={newNotificationsCount}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <Filters
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedVendor={selectedVendor}
          onVendorChange={setSelectedVendor}
          vendors={vendors}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-primary font-medium">
              ¿Quiénes somos?
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">¿Quiénes somos?</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En <span className="font-semibold text-primary">Kumi</span>, creemos que la comida no debería tener un punto final en la basura, sino un nuevo comienzo en la mesa. Nacimos de una convicción simple pero poderosa: el desperdicio no es una opción cuando hay tantas necesidades por cubrir.
              </p>
              <p>
                Somos una plataforma que actúa como puente entre los supermercados y la comunidad. Transformamos lo que antes se consideraba "pérdida" —productos próximos a vencer o excedentes— en oportunidades.
              </p>
              <p>
                Nuestra misión es doble: facilitar el acceso a alimentos de calidad a precios reducidos para las familias y conectar recursos vitales. En <span className="font-semibold text-primary">Kumi</span>, impulsamos la economía circular, asegurando que cada alimento cumpla su propósito real: alimentar.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;
