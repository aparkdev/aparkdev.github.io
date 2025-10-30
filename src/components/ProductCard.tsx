import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
