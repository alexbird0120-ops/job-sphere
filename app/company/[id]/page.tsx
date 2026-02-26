"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Users,
  Calendar,
  Briefcase,
  CheckCircle2,
  Building2,
  ArrowRight,
} from "lucide-react";
import { companies, getJobsByCompanyId } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useAppliedJobs } from "@/hooks/use-applied-jobs";
import { AnimateIn } from "@/components/animate-in";
import { JobCard } from "@/components/job-card";
import { cn } from "@/lib/utils";

export default function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedJobs();
  const { hasApplied } = useAppliedJobs();
  const [loading, setLoading] = useState(true);

  const company = companies.find((c) => c.id === id);
  const companyJobs = company ? getJobsByCompanyId(company.id) : [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-5 w-24 rounded bg-muted" />
          <div className="mt-8 flex gap-5">
            <div className="h-20 w-20 rounded-2xl bg-muted" />
            <div className="flex-1">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="mt-3 h-4 w-32 rounded bg-muted" />
              <div className="mt-3 flex gap-4">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
              </div>
            </div>
          </div>
          <div className="mt-8 h-32 rounded-xl bg-muted" />
          <div className="mt-6 h-48 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Building2 className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Company Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The company you are looking for does not exist.
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

        {/* Company header */}
        <AnimateIn direction="up" delay={0}>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
              {company.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                {company.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-primary">
                {company.industry}
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {company.headquarters}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {company.size}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {"Founded "}
                  {company.founded}
                </span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* About */}
        <AnimateIn direction="up" delay={100}>
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              About {company.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {company.description}
            </p>
          </div>
        </AnimateIn>

        {/* Mission */}
        <AnimateIn direction="up" delay={150}>
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Our Mission
            </h2>
            <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
              {`"${company.mission}"`}
            </p>
          </div>
        </AnimateIn>

        {/* Benefits & Tech Stack */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <AnimateIn direction="left" delay={200}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Benefits & Perks
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {company.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={250}>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Tech Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {company.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Open Positions */}
        <AnimateIn direction="up" delay={300}>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground md:text-2xl">
                  Open Positions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {companyJobs.length} open position
                  {companyJobs.length !== 1 ? "s" : ""} at {company.name}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-primary">
                <Briefcase className="h-4 w-4" />
                {companyJobs.length} job{companyJobs.length !== 1 ? "s" : ""}
              </div>
            </div>

            {companyJobs.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {companyJobs.map((job, i) => (
                  <AnimateIn key={job.id} direction="up" delay={350 + i * 80}>
                    <div className="relative">
                      <JobCard
                        job={job}
                        isSaved={isSaved(job.id)}
                        onToggleSave={toggleSave}
                      />
                      {hasApplied(job.id) && (
                        <div className="absolute right-3 top-3 z-10 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                          Applied
                        </div>
                      )}
                    </div>
                  </AnimateIn>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No open positions at {company.name} right now.
                </p>
              </div>
            )}
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
