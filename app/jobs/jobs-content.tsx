"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { JobCard } from "@/components/job-card";
import { AnimateIn } from "@/components/animate-in";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { jobs } from "@/data/jobs";
import { cn } from "@/lib/utils";

const jobTypes = [
  "All",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
];

export function JobsContent() {
  const searchParams = useSearchParams();
  const { toggleSave, isSaved } = useSavedJobs();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [locationQuery, setLocationQuery] = useState(
    searchParams.get("location") || "",
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || "All",
  );
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        !locationQuery.trim() ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesType = selectedType === "All" || job.type === selectedType;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [searchQuery, locationQuery, selectedType]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, locationQuery, selectedType]);

  const hasActiveFilters =
    searchQuery || locationQuery || selectedType !== "All";

  function clearFilters() {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedType("All");
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <AnimateIn direction="up" delay={0}>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Browse Jobs
            </h1>
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Loading jobs..."
                : `${filteredJobs.length} job${filteredJobs.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </AnimateIn>

        {/* Search and filter controls */}
        <AnimateIn direction="up" delay={100}>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Search jobs"
                />
              </div>
              <div className="relative sm:w-48">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Filter by location"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm text-foreground sm:hidden"
                aria-expanded={showFilters}
                aria-label="Toggle job type filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            <div
              className={cn(
                "flex flex-wrap gap-2",
                showFilters ? "flex" : "hidden sm:flex",
              )}
            >
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {type}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </AnimateIn>

        {/* Job listings */}
        {loading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
                <div className="mt-4 flex gap-3">
                  <div className="h-3 w-20 rounded bg-muted" />
                  <div className="h-3 w-16 rounded bg-muted" />
                </div>
                <div className="mt-3 h-8 rounded bg-muted" />
                <div className="mt-4 h-6 w-20 rounded-full bg-muted" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <AnimateIn direction="up" delay={0}>
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  No jobs found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear All Filters
              </button>
            </div>
          </AnimateIn>
        ) : (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedJobs.map((job, i) => (
                <AnimateIn key={job.id} direction="up" delay={i * 60}>
                  <JobCard
                    job={job}
                    isSaved={isSaved(job.id)}
                    onToggleSave={toggleSave}
                  />
                </AnimateIn>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      const isCurrentPage = page === currentPage;
                      const isNearCurrentPage =
                        Math.abs(page - currentPage) <= 1 ||
                        page === 1 ||
                        page === totalPages;

                      if (
                        !isNearCurrentPage &&
                        page !== 1 &&
                        page !== totalPages
                      ) {
                        if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span
                              key={page}
                              className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                            isCurrentPage
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-card text-foreground hover:bg-secondary",
                          )}
                          aria-label={`Go to page ${page}`}
                          aria-current={isCurrentPage ? "page" : undefined}
                        >
                          {page}
                        </button>
                      );
                    },
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
