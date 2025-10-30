import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={itemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Flower Balloon Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrate life's special moments with our beautiful flower-inspired balloon arrangements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default Index;
