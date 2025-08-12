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
  return <main className="p-10 container mx-auto">{children}</main>;
}
