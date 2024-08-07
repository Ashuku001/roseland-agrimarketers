import Image from "next/image"


function Logo(props: any) {
    return (
        <div className="flex items-center space-x-2">
            <Image
                className ='rounded-full object-cover'
                src='/Logo.svg'
                alt='Logo'
                height={50}
                width={50}
             />
            <>{props.renderDefault(props)}</>
        </div>
    )
}

export default Logo