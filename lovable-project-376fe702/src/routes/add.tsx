import { createFileRoute, Link } from "@tanstack/react-router";
import { X, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "Log a Trip · TripSphere" },
      { name: "description", content: "Start a new travel log entry." },
    ],
  }),
  component: AddTrip,
});

function AddTrip() {
  const [step] = useState(1);

  return (
    <div className="min-h-screen bg-canvas pb-40">
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          aria-label="Cancel"
          className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
        >
          <X className="size-5" />
        </Link>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 rounded-full transition-all ${
                n === step ? "w-8 bg-accent" : "w-4 bg-primary/10"
              }`}
            />
          ))}
        </div>
        <div className="size-10" />
      </header>

      <div className="px-6 pt-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
          Step 1 · Basics
        </p>
        <h1 className="mb-10 text-4xl font-bold leading-tight tracking-tight">
          Log a new
          <br />
          journey
        </h1>

        <div className="space-y-7">
          <Field label="Trip title">
            <input
              type="text"
              placeholder="e.g. Icelandic Circle"
              className="w-full border-b-2 border-primary/10 bg-transparent pb-2 text-lg font-medium outline-none transition-colors placeholder:text-primary/20 focus:border-accent"
            />
          </Field>

          <Field label="Location">
            <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-2 focus-within:border-accent">
              <MapPin className="size-5 text-primary/30" />
              <input
                type="text"
                placeholder="Search places…"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-primary/20"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start date">
              <div className="flex items-center gap-2 rounded-2xl bg-card p-4 text-sm font-medium ring-1 ring-primary/5">
                <Calendar className="size-4 text-primary/40" />
                Oct 24, 2024
              </div>
            </Field>
            <Field label="End date">
              <div className="flex items-center gap-2 rounded-2xl bg-card p-4 text-sm font-medium ring-1 ring-primary/5">
                <Calendar className="size-4 text-primary/40" />
                Oct 28, 2024
              </div>
            </Field>
          </div>
        </div>

        <button className="group mt-14 flex w-full items-center justify-center gap-3 rounded-[30px] bg-primary py-5 text-base font-bold text-primary-foreground shadow-lg transition-transform active:scale-[0.98]">
          Continue
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-center text-xs text-primary/40">
          Saved locally. Syncs when you're online.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-primary/40">
        {label}
      </label>
      {children}
    </div>
  );
}
