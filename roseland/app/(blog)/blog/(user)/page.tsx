// import {previewData} from 'next/headers'
import { client } from "@/utils/blog/sanity.client"
import {groq} from 'next-sanity'
// import PreviewSuspense from '../../components/PreviewSuspense'
// import PreviewBlogList from '@/components/PreviewBlogList'
import BlogList from '../components/BlogList'
import { PostType } from '@/types'

const query = groq `
 *[_type=='post']{
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`

export const revalidate = 60

export async function generateStaticParams(){
  const query = groq`*[_type=="post"]
  {
      slug
    }`;
  
  
  const slugs: PostType[] = await client.fetch(query)
  
  const slugRoutes = slugs.map((slug) => slug.slug.current)


  return slugRoutes.map(slug => ({
    slug: slug
  }))
}

// const previewData = null

export default async function Home() {
  // if(previewData){
  //   return (
  //     <PreviewSuspense fallback={
  //       <div>
  //         <p className="text-center text-lg animate-pulse text-[#f4b400]">
  //           Loading Preview Data
  //         </p>
  //       </div>
  //     }
  //     >
  //       <PreviewBlogList query={''}/>
  //     </PreviewSuspense>
  //   )
  // }

  const posts = await client.fetch(query)
  console.log(posts)
  return (
    <BlogList posts={posts}/>
  )
}