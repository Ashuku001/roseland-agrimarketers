import Image from "next/image"
import Link from "next/link"
import urlFor from "@/utils/blog/urlFor"


export const RichTextComponents = {
    types: {
        image: ({value}: any) => {
            return (
                <div className="relative w-full h-80 m-2 mx-auto">
                    <Image
                        className="object-contain"
                        src={urlFor(value).url()}
                        alt="Blog post Image"
                        fill
                    />
                </div>
            );
        },
    },
    list: {
        // Ex. 1: customizing common list types
        bullet: ({children}: any) => <ul className="mt-xl">{children}</ul>,
        number: ({children}: any) => <ol className="mt-lg">{children}</ol>,
    
        // Ex. 2: rendering custom lists
        checkmarks: ({children}: any) => <ol className="m-auto text-lg">{children}</ol>,
      },
    block: {
        // Ex. 1: customizing common block types
        h1: ({children}: any) => <h1 className="text-5xl font-bold">{children}</h1>,
        h2: ({children}: any) => <h2 className="text-4xl font-bold">{children}</h2>,
        h3: ({children}: any) => <h3 className="text-3xl font-bold">{children}</h3>,
        h4: ({children}: any) => <h4 className="text-2xl font-bold">{children}</h4>,
        blockquote: ({children}: any) => <blockquote className="border-l-[#f7A86A] border-l-4 pl-5 my-5">{children}</blockquote>,

        // Ex. 2: rendering custom styles
        customHeading: ({children}: any) => (
          <h2 className="text-lg text-primary text-purple-700">{children}</h2>
        ),
      },
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({children}: any) => <em className="text-gray-600 font-semibold">{children}</em>,
    
        // Ex. 2: rendering a custom `link` annotation
        link: ({value, children}: any) => {
          const target = (value?.href || '').startsWith('http') ? "_blank" : undefined
          return (
            <Link href={value?.href} target={target} rel={target} className="underLine decoration=[#f7A86A] hover-decoration-black">
              {children}
            </Link>
          )
        },
    },
}