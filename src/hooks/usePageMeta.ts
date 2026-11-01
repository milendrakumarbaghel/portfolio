import { useEffect } from 'react'
import { SITE_URL } from '../data/personal.ts'

interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/** Updates the tags shipped in index.html rather than appending duplicates. */
export function usePageMeta({ title, description, path, image = '/og.png' }: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const img = image.startsWith('http') ? image : `${SITE_URL}${image}`
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', img)
  }, [title, description, path, image])
}
