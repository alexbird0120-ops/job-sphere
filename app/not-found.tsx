import Link from "next/link"
import { Search } from "lucide-react"

// Custom 404 page shown when a route is not found
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-24 text-center">
      {/* Large 404 text */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-7xl font-bold text-primary/20 md:text-9xl">
          404
        </span>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Page Not Found
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Sorry, the page you are looking for does not exist or has been moved.
          Let us help you find your way back.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Go Home
        </Link>
        <Link
          href="/jobs"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Search className="h-4 w-4" />
          Browse Jobs
        </Link>
      </div>
    </div>
  )
}
