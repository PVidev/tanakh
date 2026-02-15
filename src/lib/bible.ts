import type { BibleData } from "@/types/bible";

let cached: BibleData | null = null;

export async function getBible(): Promise<BibleData> {
  if (typeof window === "undefined") {
    const fs = await import("fs");
    const path = await import("path");
    const p = path.join(process.cwd(), "public", "bible.json");
    const raw = fs.readFileSync(p, "utf8");
    const data = JSON.parse(raw) as BibleData;
    if (process.env.NODE_ENV === "production") cached = data;
    return data;
  }
  if (cached) return cached;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const res = await fetch(`${base}/bible.json`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to load Bible data");
  cached = (await res.json()) as BibleData;
  return cached;
}

export function getBook(data: BibleData, bookId: string) {
  return data.books.find((b) => b.id === bookId);
}

export function getChapter(
  book: { chapters: { number: number; verses: import("@/types/bible").Verse[] }[] },
  chapterNum: number
) {
  return book.chapters.find((c) => c.number === chapterNum);
}
