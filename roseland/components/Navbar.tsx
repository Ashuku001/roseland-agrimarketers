import Link from "next/link"
import Container from "@/components/ui/Container"
import getCategories from "@/actions/get-categories"
import { NavbarActions } from "@/components/navbar-actions"
import Image from "next/image"

const Navbar = async () => {
    const data = await getCategories()
    return (
        <div className="border-b relative h-30">
                <div className="flex h-18 items-center justify-between">
                    <Link href="/" className="">
                        <p className="font-bold text-xl">STORE</p>
                    </Link>
                    <div className="flex flex-col items-center">
                        <Image
                            className ='rounded-full object-contain'
                            src='/Logo.svg'
                            alt='Logo'
                            height={60}
                            width={60}
                        />
                        <h2 className="mt-5 hidden md:visible lg:visible">
                            Roseland Agrimarketer&apos;s Hub
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/blog" className="">
                            <p className="font-bold text-xl">BLOG</p>
                        </Link>
                        <NavbarActions />
                    </div>
                </div>
        </div>
    )
}

export default Navbar
