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
  return <>{children}</>;
}
