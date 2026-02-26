"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"

// Reusable search bar component for searching jobs by title and location
export function SearchBar() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // Build search params and navigate to jobs page
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-3 sm:flex-row"
      role="search"
      aria-label="Job search"
    >
      {/* Title / keyword input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Job title or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-lg border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search by job title or keyword"
        />
      </div>

      {/* Location input */}
      <div className="relative sm:w-56">
        <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-12 w-full rounded-lg border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search by location"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Search Jobs
      </button>
    </form>
  )
}
