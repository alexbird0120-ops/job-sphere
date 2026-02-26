"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { SearchBar } from "@/components/search-bar";
import { JobCard } from "@/components/job-card";
import { AnimateIn } from "@/components/animate-in";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { jobs, companies } from "@/data/jobs";

const stats = [
  { icon: Briefcase, label: "Job Listings", value: "500+" },
  { icon: Building2, label: "Companies", value: "200+" },
  { icon: Users, label: "Job Seekers", value: "10K+" },
  { icon: TrendingUp, label: "Placements", value: "1K+" },
];

// Data for charts
const jobsByType = [
  {
    name: "Full-time",
    count: jobs.filter((j) => j.type === "Full-time").length,
    fill: "var(--color-chart-1)",
  },
  {
    name: "Part-time",
    count: jobs.filter((j) => j.type === "Part-time").length,
    fill: "var(--color-chart-2)",
  },
  {
    name: "Contract",
    count: jobs.filter((j) => j.type === "Contract").length,
    fill: "var(--color-chart-4)",
  },
  {
    name: "Internship",
    count: jobs.filter((j) => j.type === "Internship").length,
    fill: "var(--color-chart-5)",
  },
  {
    name: "Remote",
    count: jobs.filter((j) => j.type === "Remote").length,
    fill: "var(--color-chart-3)",
  },
];

const jobsByDepartment = [
  {
    name: "Engineering",
    count: jobs.filter((j) => j.department === "Engineering").length,
  },
  {
    name: "Design",
    count: jobs.filter((j) => j.department === "Design").length,
  },
  {
    name: "Analytics",
    count: jobs.filter((j) => j.department === "Analytics").length,
  },
  {
    name: "Marketing",
    count: jobs.filter((j) => j.department === "Marketing").length,
  },
  {
    name: "Product",
    count: jobs.filter((j) => j.department === "Product").length,
  },
  {
    name: "Security",
    count: jobs.filter((j) => j.department === "Security").length,
  },
  {
    name: "Infra",
    count: jobs.filter((j) => j.department === "Infrastructure").length,
  },
  {
    name: "QA",
    count: jobs.filter((j) => j.department === "Quality Assurance").length,
  },
  {
    name: "Docs",
    count: jobs.filter((j) => j.department === "Documentation").length,
  },
];

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-3)",
];

// Steps for the "How it Works" section
const howItWorks = [
  {
    step: "01",
    title: "Search Jobs",
    description:
      "Browse our extensive job listings by title, location, or job type.",
  },
  {
    step: "02",
    title: "Save Favorites",
    description:
      "Bookmark jobs you are interested in and come back to them later.",
  },
  {
    step: "03",
    title: "Apply Easily",
    description:
      "Submit your application with just a few clicks. Track your progress.",
  },
  {
    step: "04",
    title: "Get Hired",
    description: "Hear back from companies and land your dream job.",
  },
];

export default function HomePage() {
  const { toggleSave, isSaved } = useSavedJobs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const featuredJobs = jobs.slice(0, 6);
  const topCompanies = companies.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary px-4 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-foreground" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary-foreground" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <AnimateIn direction="up" delay={0}>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Find Your Dream Job Today
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Browse hundreds of opportunities from top companies. Your next
              career move starts here.
            </p>
          </AnimateIn>

          <AnimateIn direction="up" delay={200}>
            <div className="mt-8">
              <SearchBar />
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={300}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-primary-foreground/60">
                Popular:
              </span>
              {["Frontend Developer", "Remote", "Internship", "Full Stack"].map(
                (term) => (
                  <Link
                    key={term}
                    href={`/jobs?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
                  >
                    {term}
                  </Link>
                ),
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card px-4 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} direction="up" delay={i * 100}>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <AnimateIn direction="up" delay={0}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Job Market Overview
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                See the distribution of jobs across types and departments
              </p>
            </div>
          </AnimateIn>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Jobs by Type - Pie Chart */}
            <AnimateIn direction="left" delay={100}>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">
                  Jobs by Type
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Distribution of current openings
                </p>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jobsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="name"
                        stroke="none"
                      >
                        {jobsByType.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                          color: "var(--color-foreground)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px" }}
                        iconType="circle"
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimateIn>

            {/* Jobs by Department - Bar Chart */}
            <AnimateIn direction="right" delay={150}>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">
                  Jobs by Department
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Open positions across departments
                </p>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={jobsByDepartment} barSize={28}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{
                          fontSize: 11,
                          fill: "var(--color-muted-foreground)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontSize: 11,
                          fill: "var(--color-muted-foreground)",
                        }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                          color: "var(--color-foreground)",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="var(--color-primary)"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <AnimateIn direction="up" delay={0}>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Featured Jobs
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore our latest job openings
                </p>
              </div>
              <Link
                href="/jobs"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                View All Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>

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
          ) : (
            <>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map((job, i) => (
                  <AnimateIn key={job.id} direction="up" delay={i * 80}>
                    <JobCard
                      job={job}
                      isSaved={isSaved(job.id)}
                      onToggleSave={toggleSave}
                    />
                  </AnimateIn>
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/jobs"
                  className="inline-block w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View All Jobs
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <AnimateIn direction="up" delay={0}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Top Companies Hiring
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore opportunities from leading organizations
              </p>
            </div>
          </AnimateIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topCompanies.map((company, i) => {
              const companyJobCount = jobs.filter(
                (j) => j.companyId === company.id,
              ).length;
              return (
                <AnimateIn key={company.id} direction="up" delay={i * 80}>
                  <Link
                    href={`/company/${company.id}`}
                    className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {company.logo}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {company.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {company.industry}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {company.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {company.headquarters}
                        </span>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {companyJobCount} job{companyJobCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/30 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <AnimateIn direction="up" delay={0}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                How It Works
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Find your next opportunity in four simple steps
              </p>
            </div>
          </AnimateIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, i) => (
              <AnimateIn key={item.step} direction="up" delay={i * 100}>
                <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
                  <span className="text-3xl font-bold text-primary/20">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <AnimateIn direction="up" delay={0}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                What Job Seekers Say
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hear from people who found their dream jobs through JobSphere
              </p>
            </div>
          </AnimateIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer at TechNova",
                quote:
                  "JobSphere made my job search so much easier. I found my dream role in just two weeks!",
              },
              {
                name: "Marcus Johnson",
                role: "DevOps Engineer at CloudBridge",
                quote:
                  "The filtering and search features helped me find exactly what I was looking for. Highly recommend.",
              },
              {
                name: "Emily Reyes",
                role: "UI/UX Designer at CreativeEdge",
                quote:
                  "Clean interface, great job listings, and the application process was seamless.",
              },
            ].map((testimonial, i) => (
              <AnimateIn key={i} direction="up" delay={i * 100}>
                <div className="flex flex-col rounded-xl border border-border bg-card p-5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-chart-4 text-chart-4"
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm italic leading-relaxed text-muted-foreground">
                    {`"${testimonial.quote}"`}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-14 md:py-20">
        <AnimateIn direction="up" delay={0}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold text-primary-foreground md:text-3xl">
              Ready to Start Your Career Journey?
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              Join thousands of job seekers who have found their perfect role
              through JobSphere. Start browsing today.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/jobs"
                className="w-full rounded-lg bg-primary-foreground px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-foreground/90 sm:w-auto"
              >
                Browse All Jobs
              </Link>
              <Link
                href="/applied"
                className="w-full rounded-lg border border-primary-foreground/20 px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
              >
                View My Applications
              </Link>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
