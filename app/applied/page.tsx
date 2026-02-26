"use client"

import Link from "next/link"
import {
  FileCheck2,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
} from "lucide-react"
import { useAppliedJobs } from "@/hooks/use-applied-jobs"
import { jobs } from "@/data/jobs"
import { AnimateIn } from "@/components/animate-in"
import { cn } from "@/lib/utils"

const typeColors: Record<string, string> = {
  "Full-time": "bg-primary/10 text-primary",
  "Part-time": "bg-accent/10 text-accent",
  Contract: "bg-chart-4/20 text-chart-4",
  Internship: "bg-chart-5/20 text-chart-5",
  Remote: "bg-chart-2/20 text-chart-2",
}

export default function AppliedJobsPage() {
  const { appliedJobs, loaded } = useAppliedJobs()

  const appliedJobDetails = appliedJobs
    .map((app) => ({
      ...app,
      job: jobs.find((j) => j.id === app.jobId),
    }))
    .filter((a) => a.job)
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    )

  if (!loaded) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-8 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-muted" />
                  <div className="flex-1">
                    <div className="h-4 w-40 rounded bg-muted" />
                    <div className="mt-2 h-3 w-24 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <AnimateIn direction="up" delay={0}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <FileCheck2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Applied Jobs
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {appliedJobDetails.length === 0
                  ? "You have not applied to any jobs yet"
                  : `${appliedJobDetails.length} application${appliedJobDetails.length !== 1 ? "s" : ""} submitted`}
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Empty state */}
        {appliedJobDetails.length === 0 ? (
          <AnimateIn direction="up" delay={100}>
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Briefcase className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  No applications yet
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Start applying to jobs you are interested in. Your
                  applications will be tracked here.
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
          <div className="mt-8 flex flex-col gap-4">
            {appliedJobDetails.map((app, i) => (
              <AnimateIn key={app.jobId} direction="up" delay={100 + i * 80}>
                <div className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <Link
                        href={`/company/${app.job!.companyId}`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
                      >
                        {app.job!.logo}
                      </Link>
                      <div>
                        <Link
                          href={`/jobs/${app.job!.id}`}
                          className="text-base font-semibold text-foreground hover:text-primary"
                        >
                          {app.job!.title}
                        </Link>
                        <Link
                          href={`/company/${app.job!.companyId}`}
                          className="mt-0.5 block text-sm text-primary hover:underline"
                        >
                          {app.job!.company}
                        </Link>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {app.job!.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {"Applied "}
                            {new Date(app.appliedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-medium",
                              typeColors[app.job!.type] ||
                                "bg-secondary text-secondary-foreground"
                            )}
                          >
                            {app.job!.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:shrink-0">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        Submitted
                      </span>
                      <Link
                        href={`/jobs/${app.job!.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
