import React from 'react'
import hljs from 'highlight.js'

export const Highlight = ({ lang, children }) => (
  <pre>
    <code className={lang} ref={c => c && hljs.highlightBlock(c)}>
      {children}
    </code>
  </pre>
)
