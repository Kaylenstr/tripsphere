import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, Compass, User, Plus } from "lucide-react";

export function FloatingNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-6 left-1/2 z-40 flex h-16 w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-[30px] border border-white/10 bg-ink/95 px-4 shadow-2xl backdrop-blur-xl"
    >
      <NavItem to="/" label="Home" active={isActive("/")} Icon={Home} />
      <NavItem to="/trips" label="Trips" active={isActive("/trips")} Icon={Map} />

      <Link
        to="/add"
        aria-label="Log a new trip"
        className="-mt-10 flex size-16 items-center justify-center rounded-full border-4 border-canvas bg-accent text-primary shadow-xl transition-transform active:scale-95"
      >
        <Plus className="size-7" strokeWidth={2.5} />
      </Link>

      <NavItem to="/explore" label="Explore" active={isActive("/explore")} Icon={Compass} />
      <NavItem to="/profile" label="Profile" active={isActive("/profile")} Icon={User} />
    </nav>
  );
}

function NavItem({
  to,
  label,
  active,
  Icon,
}: {
  to: string;
  label: string;
  active: boolean;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 transition-colors ${
        active ? "text-accent" : "text-white/50"
      }`}
    >
      <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>{label}</span>
    </Link>
  );
}
