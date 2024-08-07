
export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    return(
        <div className="w-full h-full flex flex-col relative px-4 sm:px-6 lg:px-8">
            <div>
                {children}
            </div>
        </div>
    )
}
