import type { ReactNode } from 'react'
import Image from '@/components/Image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  caption?: ReactNode
  credit?: ReactNode
  /** Let the figure run wider than the text column on large screens. */
  wide?: boolean
}

export default function Figure({ src, alt, width, height, caption, credit, wide }: Props) {
  return (
    <figure className={`figure not-prose${wide ? 'figure-wide' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={wide ? '(min-width: 64rem) 56rem, 100vw' : '(min-width: 48rem) 44rem, 100vw'}
      />
      {(caption || credit) && (
        <figcaption>
          {caption}
          {credit && <span className="figure-credit">{credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
