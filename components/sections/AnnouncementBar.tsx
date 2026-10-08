import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-primary px-4 py-3 text-primary-foreground">
      <div className="container flex items-center justify-center text-sm font-medium">
        <span className="hidden sm:inline">Announcing Vprofessionals 2.0: The complete hospitality dashboard.</span>
        <span className="sm:hidden">Vprofessionals 2.0 is here!</span>
        <Link 
          href="/pricing" 
          className="ml-2 flex items-center underline underline-offset-4 hover:text-primary-foreground/80"
        >
          View pricing
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
