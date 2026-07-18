import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Search, Heart, MessageCircle, Share, Bookmark, Plus, Send } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { ThemeToggle } from "../components/ThemeToggle";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";
import tripIceland from "../assets/trip-iceland.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

type FeedPost = {
  id: string;
  author: string;
  place: string;
  timeAgo: string;
  image: string;
  aspect: string;
  likes: number;
  comments: number;
  caption: string;
  liked?: boolean;
  saved?: boolean;
  thread?: { author: string; text: string }[];
};

const stories = [
  { id: "s1", name: "You", isSelf: true },
  { id: "s2", name: "Elena Vance" },
  { id: "s3", name: "Julian Thorne" },
  { id: "s4", name: "Mira Okafor" },
  { id: "s5", name: "Theo Lindqvist" },
  { id: "s6", name: "Aiko Mori" },
  { id: "s7", name: "Noah Costa" },
];

const feed: FeedPost[] = [
  {
    id: "1",
    author: "Elena Vance",
    place: "Chamonix, France",
    timeAgo: "2h ago",
    image: feedAlps,
    aspect: "aspect-[4/5]",
    likes: 128,
    comments: 14,
    caption:
      "Just reached the summit of Aiguille du Midi. The air is thin but the view is everything.",
    liked: true,
    thread: [
      { author: "Mira Okafor", text: "Unreal. The ridge looks brutal." },
      { author: "Theo Lindqvist", text: "GPX when?" },
    ],
  },
  {
    id: "2",
    author: "Julian Thorne",
    place: "Lofoten Islands",
    timeAgo: "5h ago",
    image: feedLofoten,
    aspect: "aspect-[4/3]",
    likes: 89,
    comments: 3,
    caption:
      "Found a quiet spot by the water. No service, just the sound of the ocean. #offline",
    saved: true,
    thread: [{ author: "Aiko Mori", text: "This is the one. Saving for later." }],
  },
  {
    id: "3",
    author: "Mira Okafor",
    place: "Reykjavík, Iceland",
    timeAgo: "1d ago",
    image: tripIceland,
    aspect: "aspect-[4/5]",
    likes: 243,
    comments: 22,
    caption:
      "Golden hour hit the harbour just right. Twelve days around the ring road start tomorrow.",
    thread: [{ author: "Elena Vance", text: "Jealous. Drive safe out there." }],
  },
  {
    id: "4",
    author: "Theo Lindqvist",
    place: "Swiss Alps",
    timeAgo: "2d ago",
    image: feedAlps,
    aspect: "aspect-[4/3]",
    likes: 312,
    comments: 41,
    caption:
      "Sunrise from the ridge. Worth every frozen finger. GPX track coming once I'm back in range.",
    liked: true,
    thread: [],
  },
];

function Home() {
  return (
    <div className="pb-40">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-canvas/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-full bg-primary">
            <div className="size-3 animate-pulse rounded-full border-2 border-accent" />
          </div>
          <span className="text-xl font-bold tracking-tight">TripSphere</span>
        </div>
        <div className="flex gap-3">
          <ThemeToggle />
          <Link
            to="/search"
            aria-label="Search friends and places"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card text-primary/70 shadow-sm transition-transform active:scale-95"
          >
            <Search className="size-5" />
          </Link>
          <button
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-full border border-primary/5 bg-card text-primary/70 shadow-sm transition-transform active:scale-95"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent" />
          </button>
        </div>
      </header>

      {/* Stories row */}
      <section
        aria-label="Friends' recent trips"
        className="scrollbar-hide flex gap-4 overflow-x-auto px-6 py-4"
      >
        {stories.map((s) => (
          <button
            key={s.id}
            className="flex shrink-0 flex-col items-center gap-1.5 transition-transform active:scale-95"
          >
            <div
              className={`grid size-16 place-items-center rounded-full p-[2px] ${
                s.isSelf
                  ? "bg-primary/10"
                  : "bg-gradient-to-br from-accent to-accent/40"
              }`}
            >
              <div className="relative grid size-full place-items-center rounded-full bg-canvas">
                <Avatar name={s.name} size={52} />
                {s.isSelf && (
                  <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full border-2 border-canvas bg-primary text-primary-foreground">
                    <Plus className="size-3" strokeWidth={3} />
                  </span>
                )}
              </div>
            </div>
            <span className="max-w-[64px] truncate text-[11px] font-semibold text-primary/70">
              {s.isSelf ? "Your log" : s.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </section>

      <main className="mt-1 space-y-6 px-4">
        {feed.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
        {/* Your Log preview — link to profile for personal stats */}
        <section className="border-t border-primary/5 py-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Your Log</h2>
            <Link
              to="/profile"
              className="text-sm font-semibold text-accent underline decoration-2 underline-offset-4"
            >
              View Profile
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/profile"
              className="flex h-40 flex-col justify-between rounded-[30px] bg-ink p-6 text-ink-foreground transition-transform active:scale-[0.98]"
            >
              <span className="text-[11px] uppercase tracking-widest text-ink-foreground/50">
                Round-trip dist.
              </span>
              <div>
                <div className="text-3xl font-bold">4,820</div>
                <div className="text-xs font-medium text-accent">km from home</div>
              </div>
            </Link>
            <Link
              to="/trips"
              className="flex h-40 flex-col justify-between rounded-[30px] border border-primary/5 bg-card p-6 transition-transform active:scale-[0.98]"
            >
              <span className="text-[11px] uppercase tracking-widest text-primary/40">
                Trips logged
              </span>
              <div>
                <div className="text-3xl font-bold">24</div>
                <div className="text-xs font-medium text-primary/40">Worldwide</div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeedCard({ post }: { post: FeedPost }) {
  const [comments, setComments] = useState(post.thread ?? []);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [...prev, { author: "You", text }]);
    setDraft("");
  };

  return (
    <article className="overflow-hidden rounded-[22px] border border-primary/5 bg-card shadow-sm">
      <div className="flex items-center gap-3 p-4">
        <Avatar name={post.author} size={40} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{post.author}</h3>
          <p className="truncate text-[11px] uppercase tracking-wider text-primary/50">
            {post.place} · {post.timeAgo}
          </p>
        </div>
        <button
          aria-label="More"
          className="grid size-8 place-items-center rounded-full text-primary/40 transition-colors hover:text-primary"
        >
          <span className="text-lg leading-none">···</span>
        </button>
      </div>
      <img
        src={post.image}
        alt={`${post.place} by ${post.author}`}
        loading="lazy"
        className={`w-full ${post.aspect} object-cover`}
      />
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-5">
            <button className="flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors hover:text-accent active:scale-90">
              <Heart
                className={`size-4 ${post.liked ? "fill-accent text-accent" : ""}`}
              />
              {post.likes}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors active:scale-90 ${
                open ? "text-accent" : "text-primary/80 hover:text-accent"
              }`}
              aria-expanded={open}
            >
              <MessageCircle className="size-4" />
              {post.comments + comments.length - (post.thread?.length ?? 0)}
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors hover:text-accent active:scale-90">
              <Share className="size-4" />
            </button>
          </div>
          <button className="text-primary/60 transition-colors hover:text-accent active:scale-90">
            <Bookmark
              className={`size-4 ${post.saved ? "fill-primary text-primary" : ""}`}
            />
          </button>
        </div>
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{post.author}</span> {post.caption}
        </p>

        {open && (
          <div className="mt-4 border-t border-primary/5 pt-4">
            {comments.length > 0 ? (
              <ul className="mb-3 space-y-2.5">
                {comments.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-sm">
                    <Avatar name={c.author} size={28} className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold">{c.author}</span>{" "}
                      <span className="text-primary/80">{c.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-3 text-xs text-primary/40">
                Be the first to comment.
              </p>
            )}
            <div className="flex items-center gap-2 rounded-2xl bg-secondary/60 px-3 py-2">
              <Avatar name="Sam Rivera" size={28} />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Add a comment…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary/30"
              />
              <button
                onClick={submit}
                disabled={!draft.trim()}
                aria-label="Send comment"
                className="grid size-8 place-items-center rounded-full bg-accent text-primary transition-transform enabled:active:scale-90 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
