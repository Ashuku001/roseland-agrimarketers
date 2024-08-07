import { PostType } from "@/types"
import Image from "next/image"
import urlFor from "@/utils/blog/urlFor"
import { ArrowRightLeft } from "lucide-react"
import ClientSideRoute from "./ClientSideRoute"


type Props = {
    posts: PostType[],
}
function BlogList({ posts }: Props) {
    return (
        <>
            <hr className="border-[#f7A86A] mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-18 pb-40">
                {posts.map(post => (
                <ClientSideRoute key={post._id} route={`/blog/post/${post.slug.current}`}>
                    <div key={post._id}  className="flex flex-col group">
                        <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                            <Image
                                className="object-cover object-left lg:object-center"
                                src={urlFor(post.mainImage).url()}
                                alt={post.author.name}
                                fill
                            />
                            <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded-shadow-lg text-white p-5 flex justify-between">
                                <div>
                                    <p className="font-bold">{post.title}</p>
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
                                <div className="fkex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                                    {post.categories?.map(category => (
                                        <div key={category._id} className="bg-[#f7A86A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                                            <p>{category.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex-1">
                            <p className="underline text-lg font-bold">{post.title}</p>
                            <p className="text-gray-500 line-clamp-2">{post.description}</p>
                        </div>
                        <p className="mt-5 font-bold flex items-center group-hover:undeline">
                            Read Post
                            <ArrowRightLeft className="ml-2 h-4 w-4"/>
                        </p>
                    </div>
                </ClientSideRoute>
                ))}
            </div>
        </>
    )
}

export default BlogList