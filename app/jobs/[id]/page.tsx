"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Building2,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Tag,
  ArrowRight,
  CheckCircle,
  Users,
} from "lucide-react";
import { jobs, getCompanyById, getJobsByCompanyId } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useAppliedJobs } from "@/hooks/use-applied-jobs";
import { AnimateIn } from "@/components/animate-in";
import { JobCard } from "@/components/job-card";
import { cn } from "@/lib/utils";

// Job type badge colors
const typeColors: Record<string, string> = {
  "Full-time": "bg-primary/10 text-primary",
  "Part-time": "bg-accent/10 text-accent",
  Contract: "bg-chart-4/20 text-chart-4",
  Internship: "bg-chart-5/20 text-chart-5",
  Remote: "bg-chart-2/20 text-chart-2",
};

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedJobs();
  const { hasApplied } = useAppliedJobs();
  const [loading, setLoading] = useState(true);

  const job = jobs.find((j) => j.id === Number(id));
  const company = job ? getCompanyById(job.companyId) : undefined;
  const relatedJobs = job
    ? getJobsByCompanyId(job.companyId).filter((j) => j.id !== job.id)
    : [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-5 w-24 rounded bg-muted" />
          <div className="mt-6 h-8 w-64 rounded bg-muted" />
          <div className="mt-4 flex gap-4">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>
          <div className="mt-8 h-40 rounded-xl bg-muted" />
          <div className="mt-6 h-60 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Building2 className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Job Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/jobs"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const saved = isSaved(job.id);
  const applied = hasApplied(job.id);

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1">
            {/* Job header */}
            <AnimateIn direction="up" delay={0}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <Link
                    href={`/company/${job.companyId}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-colors hover:bg-primary/20"
                  >
                    {job.logo}
                  </Link>
                  <div>
                    <Link
                      href={`/company/${job.companyId}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {job.company}
                    </Link>
                    <h1 className="text-xl font-bold text-foreground md:text-2xl">
                      {job.title}
                    </h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          typeColors[job.type] ||
                            "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {job.type}
                      </span>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {job.department}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleSave(job.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                      saved
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:bg-secondary",
                    )}
                  >
                    {saved ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                    {saved ? "Saved" : "Save"}
                  </button>
                  {applied ? (
                    <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent">
                      <CheckCircle className="h-4 w-4" />
                      Applied
                    </div>
                  ) : (
                    <Link
                      href={`/jobs/${job.id}/apply`}
                      className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Apply Now
                    </Link>
                  )}
                </div>
              </div>
            </AnimateIn>

            {/* Job meta info grid */}
            <AnimateIn direction="up" delay={100}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    Location
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {job.location}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    Salary
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {job.salary}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Experience
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {job.experience}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Posted
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {job.postedDate}
                  </span>
                </div>
              </div>
            </AnimateIn>

            {/* Skills */}
            {job?.skills && job.skills.length > 0 && (
              <AnimateIn direction="up" delay={150}>
                <div className="mt-6">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Tag className="h-5 w-5 text-primary" />
                    Required Skills
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}

            {/* Job description */}
            <AnimateIn direction="up" delay={200}>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">
                  About the Role
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>
            </AnimateIn>

            {/* Requirements */}
            <AnimateIn direction="up" delay={250}>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">
                  Requirements
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* Responsibilities */}
            <AnimateIn direction="up" delay={300}>
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">
                  Responsibilities
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {job.responsibilities.map((resp, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* Apply CTA */}
            <AnimateIn direction="up" delay={350}>
              <div className="mt-10 rounded-xl border border-border bg-secondary/50 p-6 text-center">
                {applied ? (
                  <>
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                        <CheckCircle className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">
                      You have already applied
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your application for this position has been submitted. We
                      will get back to you soon.
                    </p>
                    <Link
                      href="/applied"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      View Applied Jobs
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground">
                      Interested in this role?
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Submit your application and take the next step in your
                      career.
                    </p>
                    <Link
                      href={`/jobs/${job.id}/apply`}
                      className="mt-4 inline-block w-full rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                    >
                      Apply for this Position
                    </Link>
                  </>
                )}
              </div>
            </AnimateIn>
          </div>

          {/* Sidebar - Company info */}
          <aside className="w-full shrink-0 lg:w-72">
            <AnimateIn direction="right" delay={200}>
              <Link
                href={`/company/${job.companyId}`}
                className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                    {job.logo}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {job.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {company?.industry}
                    </p>
                  </div>
                </div>
                {company && (
                  <>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        {company.headquarters}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3 w-3" />
                        {company.size}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                      View Company Profile
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </>
                )}
              </Link>
            </AnimateIn>

            {/* Related jobs */}
            {relatedJobs.length > 0 && (
              <AnimateIn direction="right" delay={300}>
                <div className="mt-5 rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    More jobs at {job.company}
                  </h3>
                  <div className="mt-3 flex flex-col gap-3">
                    {relatedJobs.map((rj) => (
                      <Link
                        key={rj.id}
                        href={`/jobs/${rj.id}`}
                        className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {rj.logo}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary">
                            {rj.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {rj.type} &middot; {rj.location}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
