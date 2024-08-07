import Link from "next/link"
import { ArrowUpLeftIcon } from "lucide-react"


function CustomStudioNavBar(props: any) {
  return (
    <div>
      <div className="flex sm:flex-col items-center justify-between p-2 bg-black">
        <Link className="text-[#f7A86A] flex items-center mr-2" href={'/'}>
          <ArrowUpLeftIcon className="text-[#f7A86A] h-5 w-5 mr-2"/>
          Home
        </Link>
        <>{props.renderDefault(props)}</>
      </div>
    </div>
  )
}

export default CustomStudioNavBar