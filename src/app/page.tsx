import Link from "next/link";
import { getBible } from "@/lib/bible";

export default async function HomePage() {
  const data = await getBible();
  return (
    <div className="space-y-8">
      <p className="text-[var(--color-ink-muted)] text-base sm:text-lg text-center sm:text-left">
        Оригинален текст на иврит с превод директно на български.
      </p>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {data.books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/${book.id}`}
              className="card card-hover flex flex-col items-center justify-center text-center aspect-square min-h-[120px] p-3 sm:p-4 text-amber-900 font-medium"
            >
              <span className="font-hebrew text-lg sm:text-xl mb-0.5">{book.nameHe}</span>
              <span className="text-[var(--color-ink-muted)] text-sm sm:text-base">{book.nameBg}</span>
              <span className="text-amber-700/80 text-xs sm:text-sm mt-1 font-normal">({book.chapters.length} глави)</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
