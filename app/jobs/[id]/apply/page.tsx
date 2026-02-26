"use client"

import { use, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  FileCheck2,
} from "lucide-react"
import { jobs } from "@/data/jobs"
import { useAppliedJobs } from "@/hooks/use-applied-jobs"
import { AnimateIn } from "@/components/animate-in"
import { cn } from "@/lib/utils"

interface FormErrors {
  name?: string
  email?: string
  resumeLink?: string
}

export default function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const job = jobs.find((j) => j.id === Number(id))
  const { hasApplied, markApplied, getApplication } = useAppliedJobs()

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [resumeLink, setResumeLink] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function validate(): FormErrors {
    const newErrors: FormErrors = {}
    if (!name.trim()) newErrors.name = "Full name is required"
    if (!email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required"
    } else if (!/^https?:\/\/.+/i.test(resumeLink)) {
      newErrors.resumeLink =
        "Please enter a valid URL (starting with http:// or https://)"
    }
    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setTimeout(() => {
      if (job) markApplied(job.id, name, email)
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-foreground">Job Not Found</h2>
        <p className="text-sm text-muted-foreground">
          This job listing does not exist.
        </p>
        <Link
          href="/jobs"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Browse Jobs
        </Link>
      </div>
    )
  }

  // Already applied state
  if (hasApplied(job.id) && !submitted) {
    const application = getApplication(job.id)
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <AnimateIn direction="up" delay={0}>
            <div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-card p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <FileCheck2 className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Already Applied
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {"You have already submitted your application for "}
                  <span className="font-semibold text-foreground">
                    {job.title}
                  </span>
                  {" at "}
                  <span className="font-semibold text-foreground">
                    {job.company}
                  </span>
                  . We will review it and get back to you soon.
                </p>
              </div>
              {application && (
                <div className="w-full rounded-lg bg-secondary/50 p-4 text-left">
                  <h3 className="text-sm font-semibold text-foreground">
                    Application Details
                  </h3>
                  <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Name:</span>{" "}
                      {application.applicantName}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Email:
                      </span>{" "}
                      {application.applicantEmail}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Applied on:
                      </span>{" "}
                      {new Date(application.appliedAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/jobs/${job.id}`}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  View Job Details
                </Link>
                <Link
                  href="/applied"
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View All Applications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    )
  }

  // Success state after submission
  if (submitted) {
    return (
      <div className="px-4 py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <AnimateIn direction="up" delay={0}>
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Application Submitted!
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {"Your application for "}
                <span className="font-semibold text-foreground">
                  {job.title}
                </span>
                {" at "}
                <span className="font-semibold text-foreground">
                  {job.company}
                </span>
                {
                  " has been submitted successfully. We will get back to you soon."
                }
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/jobs/${job.id}`}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  View Job Details
                </Link>
                <Link
                  href="/applied"
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Applied Jobs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href={`/jobs/${job.id}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {"Back to Job Details"}
        </Link>

        {/* Header */}
        <AnimateIn direction="up" delay={0}>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
              {job.logo}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                Apply for {job.title}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {job.company} &middot; {job.location}
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Application Form */}
        <AnimateIn direction="up" delay={100}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
            noValidate
          >
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined }))
                }}
                placeholder="John Doe"
                className={cn(
                  "h-11 rounded-lg border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                  errors.name
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-border focus:border-primary"
                )}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="flex items-center gap-1 text-xs text-destructive"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                placeholder="john@example.com"
                className={cn(
                  "h-11 rounded-lg border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                  errors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-border focus:border-primary"
                )}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="flex items-center gap-1 text-xs text-destructive"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Resume Link */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="resumeLink"
                className="text-sm font-medium text-foreground"
              >
                Resume Link <span className="text-destructive">*</span>
              </label>
              <input
                id="resumeLink"
                type="url"
                value={resumeLink}
                onChange={(e) => {
                  setResumeLink(e.target.value)
                  if (errors.resumeLink)
                    setErrors((prev) => ({ ...prev, resumeLink: undefined }))
                }}
                placeholder="https://drive.google.com/your-resume"
                className={cn(
                  "h-11 rounded-lg border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20",
                  errors.resumeLink
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : "border-border focus:border-primary"
                )}
                aria-invalid={!!errors.resumeLink}
                aria-describedby={
                  errors.resumeLink ? "resume-error" : undefined
                }
              />
              {errors.resumeLink && (
                <p
                  id="resume-error"
                  className="flex items-center gap-1 text-xs text-destructive"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.resumeLink}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Provide a link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>

            {/* Cover Letter */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="coverLetter"
                className="text-sm font-medium text-foreground"
              >
                Cover Letter{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you are a great fit for this role..."
                rows={5}
                className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </AnimateIn>
      </div>
    </div>
  )
}
