import { useEffect, useState } from 'react'
import type { Lang } from './latex'
import { CvTop, CvMid, CvEnd } from './Cv'
import Lorenz from './Lorenz'
import Life from './Life'
import { PostList, PostView, Notes, Latest } from './Reader'

const useHash = () => {
  const get = () => location.hash.replace(/^#\/?/, '')
  const [h, setH] = useState(get)
  useEffect(() => {
    const f = () => { setH(get()); window.scrollTo(0, 0) }
    addEventListener('hashchange', f); return () => removeEventListener('hashchange', f)
  }, [])
  return h
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const s = localStorage.getItem('lg') as Lang | null
    return s || (navigator.language.slice(0, 2) === 'es' ? 'es' : 'en')
  })
  useEffect(() => { document.body.className = lang; document.documentElement.lang = lang; localStorage.setItem('lg', lang) }, [lang])
  const [page, arg] = useHash().split('/')
  const nav = (p: string, es: string, en: string) => (
    <a href={p ? `#/${p}` : '#/'} className={(page || '') === p ? 'on' : ''}><span className="es">{es}</span><span className="en">{en}</span></a>
  )
  return (
    <main>
      <div className="lg">
        {(['es', 'en'] as Lang[]).map((l, i) => (<span key={l}>{i > 0 && '/'}<button className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button></span>))}
      </div>
      <nav className="top">{nav('', 'Inicio', 'Home')}{nav('posts', 'Posts', 'Posts')}{nav('notes', 'Notas', 'Notes')}</nav>
      {page === 'posts' ? (arg ? <PostView slug={arg} lang={lang} /> : <PostList lang={lang} />)
        : page === 'notes' ? <Notes />
          : (<><CvTop /><Lorenz /><CvMid /><Life /><Latest /><CvEnd /></>)}
      <footer><span>© {new Date().getFullYear().toString()} 0xffset</span><span>∎</span></footer>
    </main>
  )
}
