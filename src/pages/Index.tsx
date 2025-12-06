import { useState, useMemo } from "react";
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
      </main>
    </div>
  );
};

export default Index;
