import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-3xl">🌸</div>
          <div>
            <h1 className="text-xl font-bold text-primary">GBG Studio</h1>
            <p className="text-xs text-muted-foreground">Gifts By Gloria Studio</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};
