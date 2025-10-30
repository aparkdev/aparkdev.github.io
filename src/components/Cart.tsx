import { CartItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  total: number;
}

export const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, total }: CartProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cart.length})</SheetTitle>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive"
                          onClick={() => onRemove(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Ready to upgrade? Connect to Shopify for full e-commerce features
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
