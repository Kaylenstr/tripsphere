import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal, Home as HomeIcon, Footprints } from "lucide-react";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/trip/$tripId")({
  head: () => ({
    meta: [
      { title: "Trip · TripSphere" },
      { name: "description", content: "A trip in your personal log." },
    ],
  }),
  component: TripDetail,
});

function TripDetail() {
  const { tripId } = Route.useParams();

  return (
    <div className="pb-40">
      {/* Hero */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={tripIceland}
          alt="Icelandic Circle"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-ink/40" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-6">
          <Link
            to="/trips"
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <button
            aria-label="More"
            className="grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative -mt-14 px-5">
        <div className="rounded-[30px] border border-primary/5 bg-card p-6 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
            {tripId === "iceland-2024" ? "Iceland" : "Trip"}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Icelandic Circle</h1>
          <p className="mt-1 text-sm text-primary/50">September 12 – 24, 2024</p>

          {/* Distances — home round-trip separated from walked km */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <HomeIcon className="size-3.5 text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
                  Home round-trip
                </p>
              </div>
              <p className="text-xl font-bold text-accent">2,104 km</p>
              <p className="text-[10px] text-primary/40">From Amsterdam</p>
            </div>
            <div className="border-l border-primary/5 pl-4">
              <div className="mb-2 flex items-center gap-1.5">
                <Footprints className="size-3.5 text-primary/40" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
                  Walked (GPX)
                </p>
              </div>
              <p className="text-xl font-bold">84.2 km</p>
              <p className="text-[10px] text-primary/40">On foot, logged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="mt-8 px-6">
        <p className="text-[15px] leading-relaxed text-primary/80">
          Twelve days of ring road driving, coastal cliffs, and one very cold swim.
          Every morning a new kind of weather. The car became a small home; the
          horizon kept moving.
        </p>
      </section>

      {/* Media gallery */}
      <section className="mt-8 px-4">
        <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-primary/40">
          Media journal
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[tripIceland, feedAlps, feedLofoten, tripIceland].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
