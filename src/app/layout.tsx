import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silvano Cerza",
  description: "Hey! I'm Silvano and this is my website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
