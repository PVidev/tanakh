export interface Verse {
  num: number;
  hebrew: string;
  english: string;
  bulgarian: string | null;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  nameEn: string;
  nameHe: string;
  nameBg: string;
  chapters: Chapter[];
}

export interface BibleData {
  books: Book[];
}
