"use client";

import Link from "next/link";
import {
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import type { Job } from "@/data/jobs";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "Full-time": "bg-primary/10 text-primary",
  "Part-time": "bg-accent/10 text-accent",
  Contract: "bg-chart-4/20 text-chart-4",
  Internship: "bg-chart-5/20 text-chart-5",
  Remote: "bg-chart-2/20 text-chart-2",
};

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: number) => void;
}

export function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/company/${job.companyId}`}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
          >
            {job.logo}
          </Link>
          <div>
            <Link
              href={`/company/${job.companyId}`}
              className="relative z-10 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {job.company}
            </Link>
            <h3 className="text-base font-semibold leading-snug text-foreground">
              <Link
                href={`/jobs/${job.id}`}
                className="after:absolute after:inset-0 hover:text-primary"
              >
                {job.title}
              </Link>
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(job.id);
          }}
          className={cn(
            "relative z-10 shrink-0 rounded-md p-1.5 transition-colors",
            isSaved
              ? "text-primary hover:text-primary/80"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
        >
          {isSaved ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap gap-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDate}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5" />
          {job.salary}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {job.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            typeColors[job.type] || "bg-secondary text-secondary-foreground",
          )}
        >
          {job.type}
        </span>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          {"View Details \u2192"}
        </span>
      </div>
    </article>
  );
}
