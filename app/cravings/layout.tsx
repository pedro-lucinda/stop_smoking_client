import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cravings",
  description: "Cravings",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-screen w-full overflow-y-auto">{children}</main>;
}
