import { ShoppingCart, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const menuItems = [
  {
    title: "Occasions",
    items: [
      "Anniversary",
      "Birthday",
      "Valentine's Day",
      "Mother's Day",
      "Teacher's Day",
      "Graduation",
      "Christmas",
    ],
  },
  {
    title: "Flower Balloon",
    items: ["Helium"],
  },
  {
    title: "Magic Balloons / Character Balloons",
    items: [],
  },
];

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="flex flex-col">
                    <div className="border-b border-border p-4">
                      <h2 className="text-lg font-semibold text-primary">Shop By Department</h2>
                      <p className="text-sm text-muted-foreground">MENU</p>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                      {menuItems.map((menu) => (
                        <div key={menu.title} className="border-b border-border">
                          <button className="flex w-full items-center justify-between p-4 text-left hover:bg-accent">
                            <span className="font-medium">{menu.title}</span>
                            {menu.items.length > 0 && <ChevronRight className="h-4 w-4" />}
                          </button>
                          {menu.items.length > 0 && (
                            <div className="bg-muted/30 px-4 pb-2">
                              {menu.items.map((item) => (
                                <button
                                  key={item}
                                  className="block w-full py-2 text-left text-sm hover:text-primary"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <div className="flex items-center gap-2">
              <div className="text-3xl">🌸</div>
              <div>
                <h1 className="text-xl font-bold text-primary">GBG Studio</h1>
                <p className="text-xs text-muted-foreground">Gifts By Gloria Studio</p>
              </div>
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

        {!isMobile && (
          <div className="border-t border-border">
            <NavigationMenu className="mx-auto max-w-full">
              <NavigationMenuList className="flex-wrap justify-start gap-2">
                {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    {menu.items.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="h-auto py-3 text-sm font-medium">
                          {menu.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4 bg-popover">
                            {menu.items.map((item) => (
                              <button
                                key={item}
                                className="block rounded-md p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <button className="inline-flex h-auto items-center justify-center rounded-md bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        {menu.title}
                      </button>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </header>
  );
};
