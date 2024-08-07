import Link from "next/link"
import Image from "next/image"

function Header() {
  return (
    <header className="flex flex-raw items-center mt-5">
            {/* <div className="flex items-center space-x-1">
                <Image
                    className ='rounded-full object-contain'
                    src='/Logo.svg'
                    alt='Logo'
                    height={60}
                    width={60}
                />
            </div>
            <div className="ml-auto">
                <Link href={'/'}
                    className="px-2 py-5 text-sm md:text-base bg-gray-900 text-[#f4b400] rounded-full text-center"
                >
                    Subscribe to our newsletter
                </Link>
            </div> */}
    </header>
  )
}

export default Header