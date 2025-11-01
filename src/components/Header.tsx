import { ShoppingCart, Menu, ChevronRight, ChevronDown } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  currentCategory?: string;
  currentSubcategory?: string;
}

const menuItems = [
  {
    title: "Shop All",
    slug: "shop-all",
    items: [],
  },
  {
    title: "Occasions",
    slug: "occasions",
    items: [
      { name: "Anniversary", slug: "anniversary" },
      { name: "Birthday", slug: "birthday" },
      { name: "Valentine's Day", slug: "valentines-day" },
      { name: "Mother's Day", slug: "mothers-day" },
      { name: "Teacher's Day", slug: "teachers-day" },
      { name: "Graduation", slug: "graduation" },
      { name: "Christmas", slug: "christmas" },
    ],
  },
  {
    title: "Flower Balloon",
    slug: "flower-balloon",
    items: [{ name: "Helium", slug: "helium" }],
  },
  {
    title: "Magic Balloons",
    slug: "magic-balloons",
    items: [{ name: "Character Balloons", slug: "character-balloons" }],
  },
];

export const Header = ({ cartItemCount, onCartClick, currentCategory, currentSubcategory }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (categorySlug: string, subcategorySlug?: string) => {
    if (subcategorySlug) {
      navigate(`/category/${categorySlug}/${subcategorySlug}`);
    } else if (categorySlug === "shop-all") {
      navigate("/");
    } else {
      navigate(`/category/${categorySlug}`);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (categorySlug: string, subcategorySlug?: string) => {
    if (subcategorySlug) {
      return currentCategory === categorySlug && currentSubcategory === subcategorySlug;
    }
    return currentCategory === categorySlug && !currentSubcategory;
  };

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
                          <button 
                            onClick={() => menu.items.length === 0 && handleMenuClick(menu.slug)}
                            className={`flex w-full items-center justify-between p-4 text-left hover:bg-accent ${
                              isActive(menu.slug) ? "bg-accent text-primary font-semibold" : ""
                            }`}
                          >
                            <span className="font-medium">{menu.title}</span>
                            {menu.items.length > 0 && <ChevronRight className="h-4 w-4" />}
                          </button>
                          {menu.items.length > 0 && (
                            <div className="bg-muted/30 px-4 pb-2">
                              {menu.items.map((item) => (
                                <button
                                  key={item.slug}
                                  onClick={() => handleMenuClick(menu.slug, item.slug)}
                                  className={`block w-full py-2 text-left text-sm hover:text-primary ${
                                    isActive(menu.slug, item.slug) ? "text-primary font-semibold" : ""
                                  }`}
                                >
                                  {item.name}
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
            <Link to="/" className="flex items-center gap-2">
              <div className="text-3xl">🌸</div>
              <div>
                <h1 className="text-xl font-bold text-primary">GBG Studio</h1>
                <p className="text-xs text-muted-foreground">Gifts By Gloria Studio</p>
              </div>
            </Link>
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
            <NavigationMenu className="mx-auto max-w-full justify-center">
              <NavigationMenuList className="flex-wrap justify-center gap-0">
                {menuItems.map((menu) => (
                  <NavigationMenuItem key={menu.title}>
                    {menu.items.length > 0 ? (
                      <>
                        <NavigationMenuTrigger 
                          className={`h-auto py-3 px-6 text-sm font-medium rounded-none border-b-2 ${
                            isActive(menu.slug) 
                              ? "border-primary text-primary bg-accent/50" 
                              : "border-transparent"
                          }`}
                        >
                          {menu.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-0 bg-popover border-t-0 shadow-lg">
                            {menu.items.map((item) => (
                              <button
                                key={item.slug}
                                onClick={() => handleMenuClick(menu.slug, item.slug)}
                                className={`block p-4 text-left text-sm transition-colors hover:bg-accent border-b border-border last:border-b-0 ${
                                  isActive(menu.slug, item.slug) 
                                    ? "bg-accent text-primary font-semibold" 
                                    : ""
                                }`}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleMenuClick(menu.slug)}
                        className={`inline-flex h-auto items-center justify-center rounded-none bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent border-b-2 ${
                          isActive(menu.slug) 
                            ? "border-primary text-primary bg-accent/50" 
                            : "border-transparent"
                        }`}
                      >
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
