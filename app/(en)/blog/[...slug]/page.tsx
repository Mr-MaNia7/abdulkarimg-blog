import { PostPage, postMetadata, postStaticParams } from 'app/post-page'

type Props = { params: Promise<{ slug: string[] }> }

/** English posts: data/blog/<slug>.mdx → /blog/<slug>/. */
export const generateStaticParams = async () => postStaticParams('en')
export const generateMetadata = (props: Props) => postMetadata('en', props)

export default function Page(props: Props) {
  return <PostPage lang="en" params={props.params} />
}
