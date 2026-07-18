import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Search as SearchIcon, MapPin, X, TrendingUp } from "lucide-react";
import { Avatar } from "../components/Avatar";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search · TripSphere" },
      { name: "description", content: "Find people and places." },
    ],
  }),
  component: SearchPage,
});

type Person = { id: string; name: string; place: string; trips: number };
type Place = { id: string; name: string; country: string; trips: number; image: string };

const people: Person[] = [
  { id: "p1", name: "Elena Vance", place: "Chamonix, FR", trips: 18 },
  { id: "p2", name: "Julian Thorne", place: "Lofoten, NO", trips: 9 },
  { id: "p3", name: "Mira Okafor", place: "Reykjavík, IS", trips: 31 },
  { id: "p4", name: "Theo Lindqvist", place: "Zermatt, CH", trips: 14 },
  { id: "p5", name: "Aiko Mori", place: "Kyoto, JP", trips: 22 },
  { id: "p6", name: "Noah Costa", place: "Lisbon, PT", trips: 6 },
  { id: "p7", name: "Sam Rivera", place: "Amsterdam, NL", trips: 24 },
];

const places: Place[] = [
  { id: "pl1", name: "Lofoten Islands", country: "Norway", trips: 1284, image: feedLofoten },
  { id: "pl2", name: "Aiguille du Midi", country: "France", trips: 982, image: feedAlps },
  { id: "pl3", name: "Ring Road", country: "Iceland", trips: 2104, image: tripIceland },
  { id: "pl4", name: "Zermatt", country: "Switzerland", trips: 1543, image: feedAlps },
];

const trending = ["Lofoten", "Iceland", "Chamonix", "Kyoto", "Patagonia", "Faroe Islands"];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"people" | "places">("people");

  const q = query.trim().toLowerCase();
  const matchedPeople = q
    ? people.filter(
        (p) => p.name.toLowerCase().includes(q) || p.place.toLowerCase().includes(q),
      )
    : people;
  const matchedPlaces = q
    ? places.filter(
        (p) => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q),
    )
    : places;

  return (
    <div className="min-h-screen pb-40">
      <header className="sticky top-0 z-20 bg-canvas/80 px-6 py-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/5 bg-card px-4 py-3.5">
          <SearchIcon className="size-5 text-primary/40" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="People or places…"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-primary/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear"
              className="grid size-6 place-items-center rounded-full bg-primary/5 text-primary/50"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          {(["people", "places"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/10 bg-card text-primary/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {!q && mode === "people" && (
        <section className="mt-2 px-6 py-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-primary/40">
            Suggested
          </p>
        </section>
      )}

      {!q && mode === "places" && (
        <section className="mt-2 px-6 py-4">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/40">
            <TrendingUp className="size-3 text-accent" />
            Trending now
          </p>
          <div className="scrollbar-hide flex flex-wrap gap-2">
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="rounded-full border border-primary/10 bg-card px-4 py-2 text-xs font-semibold text-primary/70 transition-colors hover:border-accent hover:text-accent"
              >
                {t}
              </button>
            ))}
          </div>
        </section>
      )}

      <main className="mt-2 space-y-2 px-4">
        {mode === "people" &&
          (matchedPeople.length ? (
            matchedPeople.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4"
              >
                <Avatar name={p.name} size={48} />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold">{p.name}</h3>
                  <p className="flex items-center gap-1 truncate text-[11px] text-primary/50">
                    <MapPin className="size-3 text-accent" />
                    {p.place} · {p.trips} trips
                  </p>
                </div>
                <Link
                  to="/friends"
                  className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-transform active:scale-95"
                >
                  Add
                </Link>
              </div>
            ))
          ) : (
            <p className="mt-16 text-center text-sm text-primary/40">
              No people match "{query}".
            </p>
          ))}

        {mode === "places" &&
          (matchedPlaces.length ? (
            <div className="grid grid-cols-2 gap-3">
              {matchedPlaces.map((p) => (
                <Link
                  key={p.id}
                  to="/explore"
                  className="group overflow-hidden rounded-[22px] border border-primary/5 bg-card shadow-sm"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-active:scale-95"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-sm font-semibold">{p.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-primary/40">
                      {p.country} · {p.trips.toLocaleString()} logs
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-sm text-primary/40">
              No places match "{query}".
            </p>
          ))}
      </main>
    </div>
  );
}
