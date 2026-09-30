import { useState } from 'react'
import { texToHtml, type Lang } from './latex'
import { posts, notes, isSample, postTitle, noteTitle } from './content'

const Bi = ({ es, en }: { es: string; en: string }) => (<><span className="es">{es}</span><span className="en">{en}</span></>)
const Sample = () => <span className="bdg"><Bi es="ejemplo" en="sample" /></span>

export function PostList({ lang }: { lang: Lang }) {
  return (
    <div className="pg">
      <h1><Bi es="Publicaciones" en="Posts" /></h1>
      {posts.length === 0 && <p className="empty"><Bi es="Aún no hay posts. Agrega un .tex en src/posts/." en="No posts yet. Add a .tex file to src/posts/." /></p>}
      {posts.map((p) => (
        <div className="po" key={p.slug}>
          <div className="h"><span><a href={`#/posts/${p.slug}`}>{postTitle(p.src, lang, p.slug)}</a>{isSample(p.slug) && <Sample />}</span><span className="d">{p.date}</span></div>
        </div>
      ))}

    </div>
  )
}

export function PostView({ slug, lang }: { slug: string; lang: Lang }) {
  const p = posts.find((x) => x.slug === slug)
  if (!p) return <p className="empty"><a href="#/posts">← Posts</a></p>

  const currentTexSrc = p.src[lang]

  const r = texToHtml(currentTexSrc, lang)

  return (
    <div className="pg">
      <a className="back" href="#/posts">← <Bi es="Todos los posts" en="All posts" /></a>
      <article className="rdr">
        <div className="rtt">{r.title}</div>
        <div className="rm"> <Bi es="Publicado" en="Posted" />  ·  {r.date}</div>
        <div dangerouslySetInnerHTML={{ __html: r.html }} />
      </article>
    </div>
  )
}

export function Notes() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="pg">
      <h1><Bi es="Notas manuscritas" en="Handwritten notes" /></h1>
      <p className="sub2"><Bi es="Apuntes de matemáticas escritos a mano. Toca una hoja para verla completa." en="Handwritten math notes. Tap a sheet to view it full size." /></p>
      {notes.length === 0 && <p className="empty"><Bi es="Aún no hay notas. Agrega imágenes en src/notes/." en="No notes yet. Add images to src/notes/." /></p>}
      <div className="ng">
        {notes.map((n, i) => (
          <button key={n.url} className={'nt' + (isSample(n.slug) ? ' ph' : '')} onClick={() => setOpen(n.url)}>
            <img src={n.url} alt={noteTitle(n.slug)} loading="lazy" />
            <span className="cap"><span className="es">Nota {i + 1}. {noteTitle(n.slug)}</span><span className="en">Note {i + 1}. {noteTitle(n.slug)}</span><i>{n.date}</i></span>
          </button>
        ))}
      </div>
      {open && <div id="lbx" className="o" onClick={() => setOpen(null)} onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}><img src={open} alt="" /></div>}
    </div>
  )
}

export function Latest() {
  return (
    <>
      <h2><Bi es="Posts y notas" en="Posts & notes" /></h2>
      {posts.slice(0, 3).map((p) => (
        <div className="po" key={p.slug}><div className="h"><a href={`#/posts/${p.slug}`}>{p.slug.replace(/-/g, ' ')}</a><span className="d">{p.date}</span></div></div>
      ))}
      <p><a href="#/posts"><Bi es="Leer todos los posts →" en="Read all posts →" /></a> · <a href="#/notes"><Bi es="Ver las notas →" en="See the notes →" /></a></p>
    </>
  )
}
