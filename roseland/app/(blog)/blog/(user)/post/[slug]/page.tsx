import { PostType } from "@/types"
import { groq } from "next-sanity"
import { client } from "@/utils/blog/sanity.client"
import urlFor from "@/utils/blog/urlFor"
import Image from "next/image"
import { PortableText} from "@portabletext/react"
import { RichTextComponents } from "../../../components/RichTextComponents"

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 60

export async function generateStaticParams() {
    const query = groq`*[_type=="post"]
        {
            slug
        }`;
   const slugs: PostType[] = await client.fetch(query)

   const slugRoutes = slugs.map((slug) => slug.slug.current)

   return slugRoutes.map((slug) => ({slug: slug}))
   
}


async function Post({ params: { slug } }: Props) {

    const query = groq`
        *[_type=="post" && slug.current == $slug][0]
            {
                ...,
                author->,
                categories[]->
            }
       `
    const post: PostType = await client.fetch(query, { slug: slug })
    return (
        <article className="p-1 pb-10">
            <section className="relative border border-[#f7A86A] h-100">
                <div className=" max-h-30 flex flex-col md:flex-row  h-full">
                    <div className="absolute top-0 w-full h-full opacity-40 blur-50 p-12 bg-orange-600">
                        <Image
                            className="object-cover object-center mx-auto"
                            src={urlFor(post.mainImage).url()}
                            alt={post.author.name}
                            fill
                        />
                    </div>
                </div>
                <section className="p-2 w-full ">
                    <div className="flex flex-col md:flex-row justify-between sm:gap-y-2 md:gap-x-2 items-cente">
                        <div>
                            <h1 className="text-4xl font-extrabold">{post.title}</h1>
                            <p>
                                {new Date(post._createdAt).toLocaleDateString(
                                    "en-UK", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 md:justify-end">
                            <Image
                                className="rounded-full"
                                src={urlFor(post.author.image).url()}
                                alt={post.author.name}
                                height={40}
                                width={40}
                            />
                            <div className="w-54">
                                <h3>{post.author.name}</h3>
                                <div>
                                    {/* {post.author.bio} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="italic pt-10">{post.description}</h2>
                        <div className="flex items-center justify-end mt-auto">
                            {post.categories.map(category => 
                                <div 
                                    key={category._id}
                                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                                >
                                    {category.title}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </section>
            <PortableText value={post.body} components={RichTextComponents}/>
        </article>
    )
}

export default Post