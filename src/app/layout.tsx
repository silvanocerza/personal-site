import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";

config.autoAddCss = false;

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased pb-8">
        <ThemeProvider attribute="class">
          <div className="mx-auto max-w-[800px] p-4">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
