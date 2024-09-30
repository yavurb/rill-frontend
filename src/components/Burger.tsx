
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  PanelLeft,
  Home,
  Waves,
  Clapperboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Burger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <a
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Waves className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Rill</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </a>
          <a
            href="/broadcasts"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Clapperboard className="h-5 w-5" />
            Broadcasts
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
