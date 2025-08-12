// client-side: uses user's locale & timezone automatically
export function formatDate(
  ymd: string,
  style: "short" | "medium" | "long" | "full" = "long"
) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1); // local date
  return new Intl.DateTimeFormat(undefined, { dateStyle: style }).format(dt);
}
