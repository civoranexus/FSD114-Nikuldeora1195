import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";


export function AppNavbar() {
  return (
    <header className="sticky top-0 z-20 flex h-12 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="shrink-0" />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Link to="/" className="truncate text-sm font-semibold">
          EduVillage
        </Link>
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Learning platform UI shell
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant="secondary">
          <Link to="/auth">Login</Link>
        </Button>
      </div>
    </header>
  );
}
 