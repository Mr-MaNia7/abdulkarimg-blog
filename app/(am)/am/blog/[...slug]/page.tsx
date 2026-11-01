import { PostPage, postMetadata, postStaticParams } from 'app/post-page'

type Props = { params: Promise<{ slug: string[] }> }

/** Amharic posts: data/blog/am/<slug>.mdx → /am/blog/<slug>/. */
export const generateStaticParams = async () => postStaticParams('am')
export const generateMetadata = (props: Props) => postMetadata('am', props)

export default function Page(props: Props) {
  return <PostPage lang="am" params={props.params} />
}
