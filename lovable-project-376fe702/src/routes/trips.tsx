import { createFileRoute, Link } from "@tanstack/react-router";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "Your Trips · TripSphere" },
      { name: "description", content: "Your personal photo archive of every trip you've logged." },
    ],
  }),
  component: TripsPage,
});

const categories = ["All", "Mountains", "Coast", "City", "Wild", "Road"];

const trips = [
  { id: "iceland-2024", title: "Icelandic Circle", place: "Iceland", date: "Sep 2024", image: tripIceland },
  { id: "chamonix-2024", title: "Aiguille du Midi", place: "Chamonix, FR", date: "Aug 2024", image: feedAlps },
  { id: "lofoten-2024", title: "Lofoten Retreat", place: "Norway", date: "Jul 2024", image: feedLofoten },
  { id: "alps-2024", title: "Alpine Ridge", place: "Switzerland", date: "Jun 2024", image: feedAlps },
];

function TripsPage() {
  return (
    <div className="pb-40">
      <header className="sticky top-0 z-20 bg-canvas/80 px-6 py-5 backdrop-blur-md">
        <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
        <p className="mt-1 text-sm text-primary/50">Your personal archive · 24 logged</p>
      </header>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-6 pb-4">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "border border-primary/10 bg-card text-primary/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <main className="grid grid-cols-2 gap-3 px-4">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            to="/trip/$tripId"
            params={{ tripId: trip.id }}
            className="group overflow-hidden rounded-[22px] border border-primary/5 bg-card shadow-sm"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={trip.image}
                alt={trip.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-active:scale-95"
              />
            </div>
            <div className="p-3">
              <h3 className="truncate text-sm font-semibold">{trip.title}</h3>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-primary/40">
                {trip.place} · {trip.date}
              </p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
