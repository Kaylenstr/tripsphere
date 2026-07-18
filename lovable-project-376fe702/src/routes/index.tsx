import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Search, Heart, MessageCircle } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { ThemeToggle } from "../components/ThemeToggle";
import feedAlps from "../assets/feed-alps.jpg";
import feedLofoten from "../assets/feed-lofoten.jpg";

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
};

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
          <button
            aria-label="Search friends"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card text-primary/70 shadow-sm"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label="Notifications"
            className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card text-primary/70 shadow-sm"
          >
            <Bell className="size-5" />
          </button>
        </div>
      </header>

      <main className="mt-2 space-y-6 px-4">
        {feed.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-[22px] border border-primary/5 bg-card shadow-sm"
          >
            <div className="flex items-center gap-3 p-4">
              <Avatar name={post.author} size={40} />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold">{post.author}</h3>
                <p className="truncate text-[11px] uppercase tracking-wider text-primary/50">
                  {post.place} · {post.timeAgo}
                </p>
              </div>
            </div>
            <img
              src={post.image}
              alt={`${post.place} by ${post.author}`}
              loading="lazy"
              className={`w-full ${post.aspect} object-cover`}
            />
            <div className="p-5">
              <div className="mb-3 flex gap-5">
                <button className="flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors hover:text-accent">
                  <Heart className="size-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors hover:text-accent">
                  <MessageCircle className="size-4" />
                  {post.comments}
                </button>
              </div>
              <p className="text-sm leading-relaxed">
                <span className="font-bold">{post.author}</span> {post.caption}
              </p>
            </div>
          </article>
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
              className="flex h-40 flex-col justify-between rounded-[30px] bg-ink p-6 text-ink-foreground"
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
              className="flex h-40 flex-col justify-between rounded-[30px] border border-primary/5 bg-card p-6"
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
