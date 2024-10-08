'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/utils/utils"
import { Category } from "@/types"


interface MainNavProps {
    data: Category[]
}


const MainNav: React.FC<MainNavProps> =({data}) => {
  
  const pathname = usePathname()

  const routes = data?.map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathname === `/category/${route.id}`
  }))
  return (
    <div
        className="mx-6 flex items-center space-x-2 lg:space-x-6 py-2"
    >
      {routes?.map((route) => (
        <Link 
            key={route.href}
            href={route.href}
            className={cn("text-sm font-medium transition-colors hover:text-black", 
            route.active ? "text-black": "text-neutral-500")}
        >
            {route.label}
        </Link>
      ))}
    </div>
  )
}

export default MainNav
