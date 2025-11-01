import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-base text-foreground">{product.name}</h3>
          <p className="hidden md:block text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                  -{discount}%
                </Badge>
              </div>
            )}
            <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            size="icon"
            className="md:gap-2 md:w-auto md:px-4 rounded-full md:rounded-md"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden md:inline">Add</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
