import { Lang, texToHtml } from "./latex";


const rawPosts = import.meta.glob("./posts/*.tex", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const rawNotes = import.meta.glob("./notes/*.{png,jpg,jpeg,webp,svg}", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

const postMap: Record<string, { date: string; slug: string; src: { es: string; en: string } }> = {};

for (const [path, src] of Object.entries(rawPosts)) {
  const fileName = path.split("/").pop()!;
  const match = fileName.match(/^(\d{4}-\d{2}(?:-\d{2})?)-(.*?)\.(es|en)\.tex$/);
  
  if (match) {
    const [, date, slug, lang] = match;
    if (!postMap[slug]) {
      postMap[slug] = { date, slug, src: { es: "", en: "" } };
    }
    postMap[slug].src[lang as Lang] = src;
  }
}

export const posts = Object.values(postMap).sort((a, b) => b.date.localeCompare(a.date));

const splitNote = (path: string) => {
  const f = path
    .split("/")
    .pop()!
    .replace(/\.[a-z]+$/i, "");
  const m = f.match(/^(\d{4}-\d{2}(?:-\d{2})?)-(.*)$/);
  return { date: m ? m[1] : "", slug: m ? m[2] : f };
};

export const notes = Object.entries(rawNotes)
  .map(([p, url]) => ({ ...splitNote(p), url }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const isSample = (slug: string) => slug.startsWith("sample");

export const postTitle = (src: { es: string; en: string }, lang: Lang, slug: string) => {
  const currentTex = src[lang] || src.es;
  return texToHtml(currentTex, lang).title || slug;
};

export const noteTitle = (slug: string) => {
  const t = slug.replace(/^sample-/, "").replace(/-/g, " ");
  return t[0].toUpperCase() + t.slice(1);
};