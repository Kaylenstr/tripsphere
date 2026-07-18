type Props = {
  name: string;
  size?: number;
  className?: string;
};

// Simple initial-based avatar with a deterministic tint. Avoids
// dependency on generated portrait images.
export function Avatar({ name, size = 40, className = "" }: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Hash name -> hue for a subtle accent tint variation
  const hue =
    Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-primary ring-1 ring-primary/5 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `oklch(0.92 0.03 ${hue})`,
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
