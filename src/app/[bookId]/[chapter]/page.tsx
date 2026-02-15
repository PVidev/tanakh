import Link from "next/link";
import { notFound } from "next/navigation";
import { getBible, getBook, getChapter } from "@/lib/bible";

export async function generateStaticParams() {
  const data = await getBible();
  const params: { bookId: string; chapter: string }[] = [];
  for (const book of data.books) {
    for (const ch of book.chapters) {
      params.push({ bookId: book.id, chapter: String(ch.number) });
    }
  }
  return params;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ bookId: string; chapter: string }>;
}) {
  const { bookId, chapter: chapterStr } = await params;
  const chapterNum = parseInt(chapterStr, 10);
  if (Number.isNaN(chapterNum)) notFound();

  const data = await getBible();
  const book = getBook(data, bookId);
  if (!book) notFound();
  const chapter = getChapter(book, chapterNum);
  if (!chapter) notFound();

  const hasPrev = chapter.number > 1;
  const hasNext = chapter.number < book.chapters.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Бутони назад / навигация */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/${book.id}`}
          className="btn btn-ghost w-fit min-h-[var(--tap-min)] rounded-[var(--radius-btn)] -ml-2 order-2 sm:order-1"
        >
          ← Назад към главите
        </Link>
        <nav className="flex items-center justify-between gap-2 sm:gap-4 order-1 sm:order-2">
          {hasPrev ? (
            <Link
              href={`/${book.id}/${chapter.number - 1}`}
              className="btn btn-secondary min-h-[var(--tap-min)] rounded-[var(--radius-btn)] text-sm"
            >
              ← Глава {chapter.number - 1}
            </Link>
          ) : (
            <span className="min-w-[5rem]" />
          )}
          <Link
            href={`/${book.id}`}
            className="btn btn-ghost min-h-[var(--tap-min)] rounded-[var(--radius-btn)] text-sm hidden sm:inline-flex"
          >
            Списък
          </Link>
          {hasNext ? (
            <Link
              href={`/${book.id}/${chapter.number + 1}`}
              className="btn btn-secondary min-h-[var(--tap-min)] rounded-[var(--radius-btn)] text-sm"
            >
              Глава {chapter.number + 1} →
            </Link>
          ) : (
            <span className="min-w-[5rem]" />
          )}
        </nav>
      </div>

      <div className="text-center sm:text-left pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 font-hebrew">{book.nameHe}</h1>
        <p className="text-[var(--color-ink-muted)] text-lg mt-1">
          Глава {chapter.number} — {book.nameBg}
        </p>
      </div>

      <section className="space-y-0">
        {chapter.verses.map((v) => (
          <div
            key={v.num}
            className="verse-row border-b border-amber-200/50 last:border-0"
          >
            <div className="font-hebrew text-right text-base sm:text-lg leading-relaxed text-amber-900">
              <span className="text-amber-700 font-bold ml-1">{v.num}</span>
              {" "}{v.hebrew}
            </div>
            <div className="text-amber-900/90 leading-relaxed pl-0 sm:pl-4 border-l-0 sm:border-l border-amber-200/80 text-base sm:text-lg">
              <span className="text-amber-700 font-semibold">{v.num}</span>
              {" "}{v.bulgarian || "—"}
            </div>
          </div>
        ))}
      </section>

      {/* Повторена навигация отдолу */}
      <nav className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-amber-200/60">
        {hasPrev ? (
          <Link
            href={`/${book.id}/${chapter.number - 1}`}
            className="btn btn-secondary min-h-[var(--tap-min)] rounded-[var(--radius-btn)]"
          >
            ← Глава {chapter.number - 1}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/${book.id}`}
          className="btn btn-primary min-h-[var(--tap-min)] rounded-[var(--radius-btn)]"
        >
          Списък глави
        </Link>
        {hasNext ? (
          <Link
            href={`/${book.id}/${chapter.number + 1}`}
            className="btn btn-secondary min-h-[var(--tap-min)] rounded-[var(--radius-btn)]"
          >
            Глава {chapter.number + 1} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
