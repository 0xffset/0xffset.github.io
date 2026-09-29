import katex from 'katex'

export type Lang = 'es' | 'en'

const TH: Record<string, [string, string]> = {
  theorem: ['Teorema', 'Theorem'], lemma: ['Lema', 'Lemma'], proposition: ['Proposición', 'Proposition'],
  corollary: ['Corolario', 'Corollary'], definition: ['Definición', 'Definition'], remark: ['Observación', 'Remark'], example: ['Ejemplo', 'Example'],
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function math(m: string) {
  let d = true, t = m
  if (m.startsWith('$$') || m.startsWith('\\[')) t = m.slice(2, -2)
  else if (m.startsWith('\\(')) { d = false; t = m.slice(2, -2) }
  else if (m[0] === '$') { d = false; t = m.slice(1, -1) }
  return katex.renderToString(t, { displayMode: d, throwOnError: false })
}


const GRAPH_SVGS: Record<string, string> = {
  trapezoidalplot: `<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="auto" style="max-width: 650px; color: currentColor;">
    <defs>
      <pattern id="hatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
      </pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor"/>
      </marker>
    </defs>
    <style>
      text { font-family: system-ui, -apple-system, sans-serif; font-size: 18px; fill: currentColor; }
      .axis { stroke: currentColor; stroke-width: 2.5; marker-end: url(#arrow); }
      .curve { fill: none; stroke: #06b6d4; stroke-width: 4; stroke-linecap: round; }
      .dashed { stroke: currentColor; stroke-width: 2; stroke-dasharray: 6,6; opacity: 0.6; }
      .point { fill: #f97316; }
      .label-sm { font-size: 15px; font-style: italic; }
    </style>
    <line x1="80" y1="520" x2="870" y2="520" class="axis" />
    <line x1="80" y1="520" x2="80" y2="50" class="axis" />
    <text x="880" y="525" font-style="italic" font-weight="bold">x</text>
    <text x="50" y="45" font-style="italic" font-weight="bold">y</text>
    <path d="M 505 520 L 505 169 C 550 120, 600 112, 640 110.5 L 640 520 Z" fill="url(#hatch)" />
    <line x1="190" y1="520" x2="190" y2="340" class="dashed" />
    <line x1="280" y1="520" x2="280" y2="358" class="dashed" />
    <line x1="505" y1="520" x2="505" y2="169" class="dashed" />
    <line x1="640" y1="520" x2="640" y2="110.5" class="dashed" />
    <line x1="820" y1="520" x2="820" y2="214" class="dashed" />
    <path d="M 190 340 C 235 348, 250 358, 280 358 C 340 358, 370 260, 460 232 C 480 220, 495 190, 505 169 C 540 115, 600 110.5, 640 110.5 C 700 115, 750 160, 820 214" class="curve" />
    <circle cx="190" cy="340" r="5" class="point" /><circle cx="280" cy="358" r="5" class="point" /><circle cx="370" cy="322" r="5" class="point" /><circle cx="460" cy="232" r="5" class="point" /><circle cx="505" cy="169" r="5" class="point" /><circle cx="577" cy="115" r="5" class="point" /><circle cx="640" cy="110.5" r="5" class="point" /><circle cx="748" cy="160" r="5" class="point" /><circle cx="820" cy="214" r="5" class="point" />
    <text x="190" y="550" text-anchor="middle">x₁</text><text x="280" y="550" text-anchor="middle">x₂</text><text x="505" y="550" text-anchor="middle">xᵢ</text><text x="640" y="550" text-anchor="middle">xᵢ₊₁</text><text x="820" y="550" text-anchor="middle">xₙ</text>
    <text x="235" y="505" text-anchor="middle" class="label-sm">h</text><text x="572.5" y="505" text-anchor="middle" class="label-sm">h</text>
    <text x="160" y="440" class="label-sm">f₁</text><text x="290" y="440" class="label-sm">f₂</text><text x="515" y="340" class="label-sm">fᵢ</text><text x="650" y="320" class="label-sm">fᵢ₊₁</text><text x="830" y="380" class="label-sm">fₙ</text>
    <text x="535" y="95" text-anchor="middle" font-size="16">(xᵢ, fᵢ)</text>
  </svg>
</div>`,

};


export function texToHtml(src: string, lang: Lang) {
  const I = lang === 'es' ? 0 : 1, st: string[] = []
  const keep = (h: string) => '\u0001' + (st.push(h) - 1) + '\u0001'
  const meta: Record<string, string> = {}

  for (const k of ['title', 'author', 'date']) {
    const m = src.match(new RegExp('\\\\' + k + '\\{([^}]*)\\}'))
    if (m) meta[k] = m[1]
  }

  let b = src.includes('\\begin{document}')
    ? src.split('\\begin{document}')[1].split('\\end{document}')[0]
    : src.replace(/\\(title|author|date)\{[^}]*\}/g, '')

  b = b.replace(/\\begin\{(verbatim|lstlisting)\}(\[[^\]]*\])?([\s\S]*?)\\end\{\1\}/g,
    (_m, _e, _o, c: string) => keep('<pre><code>' + esc(c.replace(/^\n/, '')) + '</code></pre>'))

b = b.replace(/\\begin\{([a-zA-Z0-9]+plot)\}[\s\S]*?\\end\{\1\}/g, (_m, plotName: string) => {
    const svgCode = GRAPH_SVGS[plotName] || `<p style="color:red;">[Gráfico "${plotName}" no encontrado]</p>`;
    return keep(svgCode);
  })

  b = b.replace(/(^|[^\\])%.*$/gm, '$1')

  b = b.replace(/\\begin\{(equation|align|gather)(\*?)\}[\s\S]*?\\end\{\1\2\}|\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$(?:\\.|[^$\\])+\$/g,
    (m) => keep(math(m)))

  b = esc(b).replace(/\\&amp;/g, '&amp;')

  b = b.replace(/\\(sub)?section\*?\{([^}]*)\}/g, (_m, s, t) => { const h = s ? 'h4' : 'h3'; return `\n\n<${h}>${t}</${h}>\n\n` })
    .replace(/\\(maketitle|noindent|newpage|clearpage|label\{[^}]*\})/g, '')
    .replace(/\\(?:cite|ref|eqref)\{([^}]*)\}/g, '[$1]')

  b = b.replace(/\\begin\{(itemize|enumerate)\}([\s\S]*?)\\end\{\1\}/g, (_m, t: string, c: string) => {
    const l = t === 'itemize' ? 'ul' : 'ol'
    return `\n\n<${l}>` + c.split(/\\item\s*/).slice(1).map((x) => '<li>' + x.trim() + '</li>').join('') + `</${l}>\n\n`
  })

  let n = 0
  b = b.replace(/\\begin\{proof\}(\[[^\]]*\])?/g, `\n\n<div class="th pf"><i>${['Demostración.', 'Proof.'][I]}</i> `).replace(/\\end\{proof\}/g, ' ∎</div>\n\n')
  b = b.replace(/\\begin\{(\w+)\}(?:\[([^\]]*)\])?/g, (m, e: string, t?: string) =>
    TH[e] ? `\n\n<div class="th thm"><b>${TH[e][I]} ${++n}${t ? ' (' + t + ')' : ''}.</b> ` : m)
    .replace(/\\end\{(\w+)\}/g, (m, e: string) => (TH[e] ? '</div>\n\n' : m))

  for (let i = 0; i < 3; i++)
    b = b.replace(/\\textbf\{([^{}]*)\}/g, '<b>$1</b>').replace(/\\(?:textit|emph)\{([^{}]*)\}/g, '<i>$1</i>')
      .replace(/\\texttt\{([^{}]*)\}/g, '<code>$1</code>').replace(/\\underline\{([^{}]*)\}/g, '<u>$1</u>')

  b = b.replace(/\\\\/g, '<br>').replace(/---/g, '—').replace(/--/g, '–').replace(/``/g, '“').replace(/''/g, '”').replace(/~/g, '&nbsp;').replace(/\\ldots/g, '…')

  const blk = (c: string) => /^\s*<\/?(div|ul|ol|h3|h4)/.test(c) ||
    (/^\s*\u0001(\d+)\u0001\s*$/.test(c) && st[+(c.match(/\d+/) as RegExpMatchArray)[0]].startsWith('<pre'))

  b = b.split(/\n\s*\n/).map((c) => (c.trim() ? (blk(c) ? c : '<p>' + c.trim() + '</p>') : '')).join('\n')
    .replace(/\u0001(\d+)\u0001/g, (_m, i: string) => st[+i])

  return { title: meta.title || '', author: meta.author || '', date: meta.date || '', html: b }
}