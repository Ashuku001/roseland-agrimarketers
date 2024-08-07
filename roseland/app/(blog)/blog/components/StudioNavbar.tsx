import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
function StudioNavbar(props: any) {
  const {renderDefault, title} = props;
  return (
  <>
    <div className="flex items-center justify-between py-2">
      <Link href="/" className="text-[#d1bc01] text-md flex items-center">
          <ArrowUpDown className="h-6 w-6 text-[#d1bc01] mr-2"/>
          Go To Website
      </Link>
    </div>
    {renderDefault(props)}
  </>
  )
}

export default StudioNavbar;
