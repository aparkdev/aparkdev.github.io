import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Get page title
  const getPageTitle = () => {
    if (subcategory) {
      return subcategory.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    if (category) {
      return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={itemCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentCategory={category}
        currentSubcategory={subcategory}
      />
      
      <main className="container py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {getPageTitle()}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrate life's special moments with our beautiful flower-inspired balloon arrangements
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={total}
      />
    </div>
  );
};

export default CategoryPage;
