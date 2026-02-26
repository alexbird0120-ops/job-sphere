"use client"

import Link from "next/link"
import { Bookmark } from "lucide-react"
import { JobCard } from "@/components/job-card"
import { AnimateIn } from "@/components/animate-in"
import { useSavedJobs } from "@/hooks/use-saved-jobs"
import { jobs } from "@/data/jobs"

export default function SavedJobsPage() {
  const { savedIds, toggleSave, isSaved, loaded } = useSavedJobs()

  const savedJobs = jobs.filter((job) => savedIds.includes(job.id))

  if (!loaded) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg bg-muted" />
                  <div className="flex-1">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="mt-2 h-4 w-40 rounded bg-muted" />
                  </div>
                </div>
                <div className="mt-4 h-8 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <AnimateIn direction="up" delay={0}>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Saved Jobs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {savedJobs.length === 0
              ? "You have not saved any jobs yet"
              : `${savedJobs.length} saved job${savedJobs.length !== 1 ? "s" : ""}`}
          </p>
        </AnimateIn>

        {savedJobs.length === 0 ? (
          <AnimateIn direction="up" delay={100}>
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Bookmark className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  No saved jobs
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  When you find jobs you are interested in, click the bookmark
                  icon to save them here for later.
                </p>
              </div>
              <Link
                href="/jobs"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse Jobs
              </Link>
            </div>
          </AnimateIn>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job, i) => (
              <AnimateIn key={job.id} direction="up" delay={i * 80}>
                <JobCard
                  job={job}
                  isSaved={isSaved(job.id)}
                  onToggleSave={toggleSave}
                />
              </AnimateIn>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
