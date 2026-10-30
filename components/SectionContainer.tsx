import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/** The page frame: one pair of equal outer margins at every width. */
export default function SectionContainer({ children }: Props) {
  return <div className="max-w-page mx-auto w-full px-5 sm:px-8 lg:px-10">{children}</div>
}
