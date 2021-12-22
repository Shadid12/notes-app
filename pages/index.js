import { useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import gemoji from '@bytemd/plugin-gemoji'
import styles from '../styles/Home.module.css'

const plugins = [
  gfm(),
  gemoji(),
  mermaid(),
  mediumZoom(),
  math(),
  highlight(),
  frontmatter(),
  footnotes(),
  breaks(),
]

export default function Home() {
  const [value, setValue] = useState('')

  return (
    <div className={styles.container}>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
        }}
      />
    </div>
  ) 
}
