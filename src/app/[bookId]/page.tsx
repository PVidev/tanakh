import Link from "next/link";
import { notFound } from "next/navigation";
import { getBible, getBook } from "@/lib/bible";

export async function generateStaticParams() {
  const data = await getBible();
  return data.books.map((b) => ({ bookId: b.id }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const data = await getBible();
  const book = getBook(data, bookId);
  if (!book) notFound();

  return (
    <div className="space-y-6 sm:space-y-8">
      <Link
        href="/"
        className="btn btn-ghost rounded-[var(--radius-btn)] min-h-[var(--tap-min)] -ml-2"
      >
        ← Назад към книгите
      </Link>
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 font-hebrew">{book.nameHe}</h1>
        <p className="text-[var(--color-ink-muted)] text-lg mt-1">{book.nameBg}</p>
      </div>
      <p className="text-sm text-[var(--color-ink-muted)]">Изберете глава:</p>
      <ul className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {book.chapters.map((ch) => (
          <li key={ch.number}>
            <Link
              href={`/${book.id}/${ch.number}`}
              className="flex items-center justify-center aspect-square min-h-[var(--tap-min)] w-full max-w-[4rem] mx-auto sm:max-w-none sm:w-12 sm:min-h-0 rounded-[var(--radius-btn)] card card-hover text-amber-900 font-semibold text-sm sm:text-base"
            >
              {ch.number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
