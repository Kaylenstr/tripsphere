import { createFileRoute, Link } from "@tanstack/react-router";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore · TripSphere" },
      { name: "description", content: "See where you've been on the globe." },
    ],
  }),
  component: Explore,
});

function Explore() {
  return (
    <div className="relative h-screen overflow-hidden bg-ink text-ink-foreground">
      {/* Faux 3D globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative size-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, oklch(0.35 0.06 185) 0%, oklch(0.2 0.02 200) 45%, oklch(0.1 0.005 60) 80%)",
            boxShadow:
              "inset -30px -40px 80px oklch(0 0 0 / 0.6), 0 0 100px oklch(0.65 0.09 185 / 0.15)",
          }}
        >
          {/* Longitude/latitude grid */}
          <div className="absolute inset-0 rounded-full opacity-20">
            {[25, 50, 75].map((p) => (
              <div
                key={`h-${p}`}
                className="absolute left-0 right-0 h-px bg-accent"
                style={{ top: `${p}%` }}
              />
            ))}
            {[25, 50, 75].map((p) => (
              <div
                key={`v-${p}`}
                className="absolute top-0 bottom-0 w-px bg-accent"
                style={{ left: `${p}%` }}
              />
            ))}
          </div>

          {/* Markers */}
          <Marker top="30%" left="35%" pulse />
          <Marker top="55%" left="60%" />
          <Marker top="42%" left="72%" />
          <Marker top="65%" left="30%" />
        </div>
      </div>

      {/* Top overlay */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-ink/90 to-transparent px-6 pt-6 pb-10">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Explore
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">Where you've been</h1>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          12 countries
        </div>
      </div>

      {/* Bottom sheet on marker */}
      <div className="absolute inset-x-3 bottom-32 z-10">
        <Link
          to="/trip/$tripId"
          params={{ tripId: "iceland-2024" }}
          className="block rounded-[30px] bg-card p-4 shadow-2xl ring-1 ring-black/5"
        >
          <div className="mb-4 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-primary/10" />
          </div>
          <div className="flex gap-4">
            <img
              src={tripIceland}
              alt="Icelandic Circle"
              loading="lazy"
              className="size-24 shrink-0 rounded-2xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                Recent trip
              </p>
              <h3 className="mt-1 truncate text-xl font-bold">Icelandic Circle</h3>
              <p className="text-sm text-primary/60">Sep 2024 · 14 photos</p>
              <span className="mt-2 inline-block text-xs font-semibold underline decoration-2 underline-offset-4">
                View full log
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Marker({
  top,
  left,
  pulse = false,
}: {
  top: string;
  left: string;
  pulse?: boolean;
}) {
  return (
    <div className="absolute" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      {pulse && (
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-accent/40" />
      )}
      <div
        className="size-3 rounded-full bg-accent"
        style={{ boxShadow: "0 0 16px oklch(0.65 0.09 185)" }}
      />
    </div>
  );
}
