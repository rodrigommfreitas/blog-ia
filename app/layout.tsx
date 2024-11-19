import { cn } from "@/app/_components/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { FloatingNav } from "./_components/floating-navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Blog de IA - Grupo 6",
    template: "%s | Blog de IA - Grupo 6",
  },
  openGraph: {
    title: "Blog de Inteligência Artificial",
    url: "https://blog-ia.vercel.app",
    siteName: "Blog de IA",
    locale: "pt",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="pt"
      className={cn("antialiased", GeistSans.className, GeistMono.className)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <main className="min-w-screen min-h-screen bg-zinc-50 text-black dark:bg-black dark:text-white">
            <FloatingNav />
            <div className="mx-auto max-w-2xl px-4 pb-16 xl:px-0">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
