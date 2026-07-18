import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bell, Lock, Globe, Download, Moon, Wifi, Eye, ChevronRight, LogOut, Trash2, Shield, Circle as HelpCircle } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { ThemeToggle } from "../components/ThemeToggle";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · TripSphere" },
      { name: "description", content: "Account, privacy and app preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMaps, setOfflineMaps] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [showDistance, setShowDistance] = useState(true);

  return (
    <div className="min-h-screen pb-40">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-canvas/80 px-6 py-5 backdrop-blur-md">
        <Link
          to="/profile"
          aria-label="Back"
          className="grid size-10 place-items-center rounded-full border border-primary/5 bg-card"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </header>

      {/* Account */}
      <section className="mt-4 px-4">
        <Link
          to="/profile"
          className="flex items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4 transition-transform active:scale-[0.98]"
        >
          <Avatar name="Sam Rivera" size={56} />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold">Sam Rivera</h3>
            <p className="truncate text-[11px] text-primary/50">sam.rivera@tripsphere.app</p>
          </div>
          <ChevronRight className="size-5 text-primary/30" />
        </Link>
      </section>

      {/* Preferences */}
      <Section title="Preferences">
        <Row
          icon={<Moon className="size-5" />}
          label="Appearance"
          sub="Light or dark theme"
          trailing={<ThemeToggle />}
        />
        <ToggleRow
          icon={<Bell className="size-5" />}
          label="Notifications"
          sub="Likes, comments, friend requests"
          value={notifications}
          onChange={setNotifications}
        />
        <ToggleRow
          icon={<Wifi className="size-5" />}
          label="Offline maps"
          sub="Cache regions for no-signal use"
          value={offlineMaps}
          onChange={setOfflineMaps}
        />
        <Row
          icon={<Globe className="size-5" />}
          label="Units"
          sub="Kilometres"
          trailing={<ChevronRight className="size-5 text-primary/30" />}
        />
      </Section>

      {/* Privacy */}
      <Section title="Privacy">
        <ToggleRow
          icon={<Lock className="size-5" />}
          label="Private account"
          sub="Only friends see your log"
          value={privateAccount}
          onChange={setPrivateAccount}
        />
        <ToggleRow
          icon={<Eye className="size-5" />}
          label="Show distance from home"
          sub="Visible on your profile"
          value={showDistance}
          onChange={setShowDistance}
        />
        <Row
          icon={<Shield className="size-5" />}
          label="Blocked travellers"
          sub="0 blocked"
          trailing={<ChevronRight className="size-5 text-primary/30" />}
        />
      </Section>

      {/* Data */}
      <Section title="Data">
        <Row
          icon={<Download className="size-5" />}
          label="Download your data"
          sub="All trips, photos and GPX tracks"
          trailing={<ChevronRight className="size-5 text-primary/30" />}
        />
        <Row
          icon={<HelpCircle className="size-5" />}
          label="Help & support"
          sub="FAQ, contact, status"
          trailing={<ChevronRight className="size-5 text-primary/30" />}
        />
      </Section>

      {/* Danger */}
      <Section title="Account">
        <button className="flex w-full items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4 text-left transition-colors hover:bg-secondary">
          <span className="grid size-10 place-items-center rounded-full bg-primary/5">
            <LogOut className="size-5 text-primary/70" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold">Sign out</p>
            <p className="text-[11px] text-primary/50">You can sign back in any time</p>
          </div>
        </button>
        <button className="flex w-full items-center gap-4 rounded-[22px] border border-destructive/20 bg-destructive/5 p-4 text-left transition-colors hover:bg-destructive/10">
          <span className="grid size-10 place-items-center rounded-full bg-destructive/10">
            <Trash2 className="size-5 text-destructive" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold text-destructive">Delete account</p>
            <p className="text-[11px] text-destructive/70">Permanent. All logs removed.</p>
          </div>
        </button>
      </Section>

      <p className="mt-8 text-center text-[11px] text-primary/30">
        TripSphere · v1.0.0
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 px-4">
      <h2 className="mb-3 px-2 text-[11px] font-bold uppercase tracking-widest text-primary/40">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({
  icon,
  label,
  sub,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  trailing: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4">
      <span className="grid size-10 place-items-center rounded-full bg-primary/5 text-primary/70">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{label}</p>
        <p className="truncate text-[11px] text-primary/50">{sub}</p>
      </div>
      {trailing}
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  sub,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-primary/5 bg-card p-4">
      <span className="grid size-10 place-items-center rounded-full bg-primary/5 text-primary/70">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{label}</p>
        <p className="truncate text-[11px] text-primary/50">{sub}</p>
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          value ? "bg-accent" : "bg-primary/15"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
