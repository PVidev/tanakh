# תנ״ך — Tanakh — Стар завет

**Hebrew Old Testament with Bulgarian translation.**  
Оригинален текст на иврит с превод директно на български.

---

## Какво е това

Уебсайт за четене на **Стар завет** (Tanakh) на иврит с паралелен български превод по стихове. Включва книги от Тората, Историческите книги и книгата **Исая** (66 глави). Ивритът е от Westminster Leningrad Codex (WLC), Public Domain; българският превод се попълва постепенно.

- **Начална страница** — избор на книга (квадратни карти, 4 на ред на десктоп, 2 на мобилни).
- **Страница книга** — списък с глави.
- **Страница глава** — стихове с иврит и български в две колони (респонзивно).

---

## Технологии

- **Next.js** (App Router), **React**, **TypeScript**
- **Tailwind CSS**
- Данните са в **JSON**; преводите се управляват чрез скриптове и се прилагат в `public/bible.json`.

---

## Структура на проекта

| Папка / файл | Описание |
|--------------|----------|
| `src/` | Next.js приложение (страници, layout, стилове) |
| `public/bible.json` | Генериран JSON с книги, глави, стихове (иврит + български) |
| `scripts/parse-wlc.js` | Парсва WLC XML → `bible.json` |
| `scripts/add-isaiah.js` | Добавя/обновява книгата Исая от `isaiah 1-66.corrected.txt` |
| `scripts/translations/*-bg.js` | Български превод по книга и глава |
| `scripts/apply-translation.js` | Прилага преводите от `*-bg.js` към `bible.json` |
| `scripts/create-translation-templates.js` | Създава празни шаблони за превод за дадена книга |
| `wlc/` | XML файлове от WLC (иврит) |
| `isaiah 1-66.corrected.txt` | Източник за книга Исая (иврит, 66 глави) |
| `UPDATE.md` | Предложения за развитие на сайта |

---

## Инсталация и стартиране

```bash
git clone <url-на-репото>
cd Bible
npm install
npm run dev
```

Отворете [http://localhost:3000](http://localhost:3000).

### Генериране на данни

- **От WLC XML** (ако имате `wlc/`):
  ```bash
  npm run parse
  ```
- **Добавяне/обновяване на Исая** от `isaiah 1-66.corrected.txt`:
  ```bash
  npm run add-isaiah
  ```

---

## Превод на български

1. Преводите се пазят в **`scripts/translations/`** — по един файл за глава, напр. `genesis-01-bg.js`, `isaiah-34-bg.js`.
2. Редактирате съответния `*-bg.js` (попълвате полетата за всеки стих).
3. Прилагате ги към `bible.json`:
   ```bash
   npm run translate
   ```

За нова книга (или за да прегенерирате шаблони):

```bash
node scripts/create-translation-templates.js isaiah
node scripts/create-translation-templates.js genesis
```

---

## Публикуване

Подходящ за **Vercel**, **Netlify** или друг хостинг за Next.js. Root на проекта е коренът на репото; билдът е стандартен: `npm run build` и `npm run start`.

---

## Лиценз и източници

- **Код:** MIT — вижте [LICENSE](LICENSE).
- **Иврит текст:** Westminster Leningrad Codex (WLC), Public Domain.
- **Български превод:** в процес; съдържанието в `scripts/translations/` е част от този проект.

---

## Автор

Създадено от [PVidev Dev](https://pvidev.dev/).
