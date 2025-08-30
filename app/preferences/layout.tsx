import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected Layout",
  description: "Protected Layout",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-10 container mx-auto h-screen overflow-y-auto">
      {children}
    </main>
  );
}
