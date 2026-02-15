import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "תנ״ך — Tanakh — Стар завет (иврит и превод на български)",
  description: "Оригинален текст на иврит с превод директно на български.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 border-b border-amber-200/80 bg-[var(--color-card)] backdrop-blur-sm shadow-[var(--shadow-sm)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <Link
              href="/"
              className="text-lg sm:text-xl font-semibold text-amber-900 hover:text-amber-800 transition-colors"
            >
              <span className="font-hebrew">תנ״ך</span> — Tanakh — Стар завет
            </Link>
          </div>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>
        <footer className="mt-auto border-t border-amber-200/80 bg-[var(--color-parchment-dark)]/50 py-4 px-4 text-center text-sm text-[var(--color-ink-muted)]">
          Оригинални текстове от Иврит — Стар завет. Създадено от{" "}
          <a href="https://pvidev.dev/" target="_blank" rel="noopener noreferrer" className="text-amber-800 hover:text-amber-900 underline">PVidev Dev</a>.
        </footer>
      </body>
    </html>
  );
}
