import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Users, MapPin, Award, Trophy, Star, Sparkle } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { ThemeToggle } from "../components/ThemeToggle";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · TripSphere" },
      { name: "description", content: "Your identity, home base, stats and achievements." },
    ],
  }),
  component: Profile,
});

const gridImages = [tripIceland, feedAlps, feedLofoten, tripIceland, feedLofoten, feedAlps];

function Profile() {
  return (
    <div className="pb-40">
      <header className="flex items-center justify-between px-6 pt-6">
        <Link
          to="/friends"
          className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
          aria-label="Friends"
        >
          <Users className="size-5" />
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-primary/40">
          Profile
        </p>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/settings"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
            aria-label="Settings"
          >
            <Settings className="size-5" />
          </Link>
        </div>
      </header>

      <section className="mt-6 flex flex-col items-center px-6">
        <Avatar name="Sam Rivera" size={88} className="ring-4 ring-card shadow-sm" />
        <h1 className="mt-4 text-2xl font-bold">Sam Rivera</h1>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1">
          <MapPin className="size-3 text-accent" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
            Based in Amsterdam
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-2 gap-3 px-6">
        <StatCard label="Total trips" value="24" />
        <StatCard label="Countries" value="12" />

        {/* Home round-trip — hero stat, clearly labeled */}
        <div className="col-span-2 rounded-[22px] bg-ink p-5 text-ink-foreground">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-foreground/50">
                Home round-trip distance
              </p>
              <p className="mt-1 text-4xl font-bold">
                42,504 <span className="text-base font-medium opacity-60">km</span>
              </p>
              <p className="mt-1 text-[11px] text-accent">
                Total distance from Amsterdam and back
              </p>
            </div>
            <Sparkle className="size-8 text-accent" />
          </div>
        </div>

        {/* Walked / GPX — separately labeled */}
        <div className="col-span-2 rounded-[22px] border border-primary/5 bg-card p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
            Walked (GPX)
          </p>
          <p className="mt-1 text-2xl font-bold">
            642.8 <span className="text-sm font-medium text-primary/40">km on foot</span>
          </p>
          <p className="mt-1 text-[11px] text-primary/40">
            Not the same as round-trip · counted from your GPX tracks
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="mt-8 px-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary/40">
          Achievements
        </h2>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          <Badge Icon={Trophy} label="12 countries" />
          <Badge Icon={Star} label="1st trip" />
          <Badge Icon={Award} label="10k km" />
          <Badge Icon={Sparkle} label="Offline pro" />
        </div>
      </section>

      {/* Trip grid */}
      <section className="mt-8 px-4">
        <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-primary/40">
          Recent
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {gridImages.map((src, i) => (
            <Link
              key={i}
              to="/trip/$tripId"
              params={{ tripId: "iceland-2024" }}
              className="aspect-square overflow-hidden rounded-xl"
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-primary/5 bg-card p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Badge({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-primary/5 bg-card px-4 py-2">
      <span className="grid size-8 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="size-4" />
      </span>
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
}
