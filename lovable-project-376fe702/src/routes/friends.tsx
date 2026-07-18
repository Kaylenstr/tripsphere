import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, UserPlus, MapPin, Search, Check, Clock } from "lucide-react";
import { Avatar } from "../components/Avatar";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends · TripSphere" },
      { name: "description", content: "Your friends and trip companions." },
    ],
  }),
  component: Friends,
});

type FriendStatus = "added" | "pending" | "request";

type Friend = {
  id: string;
  name: string;
  place: string;
  status: FriendStatus;
  trips: number;
  mutual?: number;
};

const initial: Friend[] = [
  { id: "1", name: "Elena Vance", place: "Chamonix, FR", status: "added", trips: 18, mutual: 7 },
  { id: "2", name: "Julian Thorne", place: "Lofoten, NO", status: "added", trips: 9, mutual: 3 },
  { id: "3", name: "Mira Okafor", place: "Reykjavík, IS", status: "added", trips: 31, mutual: 12 },
  { id: "4", name: "Theo Lindqvist", place: "Zermatt, CH", status: "pending", trips: 14 },
  { id: "5", name: "Aiko Mori", place: "Kyoto, JP", status: "request", trips: 22 },
  { id: "6", name: "Noah Costa", place: "Lisbon, PT", status: "request", trips: 6 },
];

const tabs = ["All", "Added", "Pending", "Requests"] as const;
type Tab = (typeof tabs)[number];

function Friends() {
  const [friends, setFriends] = useState<Friend[]>(initial);
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");

  const setStatus = (id: string, status: FriendStatus) =>
    setFriends((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));

  const filtered = friends.filter((f) => {
    const matchesTab =
      tab === "All" ||
      (tab === "Added" && f.status === "added") ||
      (tab === "Pending" && f.status === "pending") ||
      (tab === "Requests" && f.status === "request");
    const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="min-h-screen pb-40">
      <header className="sticky top-0 z-20 bg-canvas/80 px-6 py-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Friends</h1>
        </div>
        <p className="mt-1 text-sm text-primary/50">
          {friends.filter((f) => f.status === "added").length} added ·{" "}
          {friends.filter((f) => f.status === "request").length} requests
        </p>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/5 bg-card px-4 py-3">
          <Search className="size-5 text-primary/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search friends by name…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary/30"
          />
        </div>

        <div className="scrollbar-hide mt-4 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/10 bg-card text-primary/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className="mt-2 space-y-2 px-4">
        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-primary/40">
            No one matches "{query}".
          </p>
        )}
        {filtered.map((f) => (
          <FriendRow key={f.id} friend={f} onAction={setStatus} />
        ))}

        <Link
          to="/search"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/10 py-5 text-sm font-semibold text-primary/50 transition-colors hover:border-accent hover:text-accent"
        >
          <UserPlus className="size-4" />
          Find more travellers
        </Link>
      </main>
    </div>
  );
}

function FriendRow({
  friend,
  onAction,
}: {
  friend: Friend;
  onAction: (id: string, status: FriendStatus) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4">
      <Avatar name={friend.name} size={48} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold">{friend.name}</h3>
        <p className="flex items-center gap-1 truncate text-[11px] text-primary/50">
          <MapPin className="size-3 text-accent" />
          {friend.place} · {friend.trips} trips
          {friend.mutual && ` · ${friend.mutual} mutual`}
        </p>
      </div>

      {friend.status === "added" && (
        <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
          <Check className="size-3" strokeWidth={3} />
          Friends
        </span>
      )}
      {friend.status === "pending" && (
        <span className="flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary/50">
          <Clock className="size-3" />
          Sent
        </span>
      )}
      {friend.status === "request" && (
        <div className="flex gap-2">
          <button
            onClick={() => onAction(friend.id, "added")}
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-transform active:scale-95"
          >
            Accept
          </button>
          <button
            onClick={() => onAction(friend.id, "pending")}
            aria-label="Decline"
            className="grid size-8 place-items-center rounded-full border border-primary/10 text-primary/40 transition-colors hover:text-primary"
          >
            <span className="text-base leading-none">×</span>
          </button>
        </div>
      )}
    </div>
  );
}
