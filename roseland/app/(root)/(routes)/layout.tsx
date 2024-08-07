import { CategoriesNav } from "@/components/CategoriesNav"

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    return(
        <div className="w-full flex flex-col relative">
            <CategoriesNav/>
            <div>
                {children}
            </div>
        </div>
    )
}
