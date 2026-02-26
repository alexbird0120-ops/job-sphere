import Link from "next/link";
import { Briefcase } from "lucide-react";

// Simple footer with brand info and quick links
export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand section */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="JobSphere Home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground font-mono">
                JobSphere
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your go-to platform for finding the perfect job opportunity.
              Browse, save, and apply with ease.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                Navigation
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/jobs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/saved"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Saved Jobs
                </Link>
                <Link
                  href="/applied"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Applied Jobs
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                Job Types
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/jobs?type=Full-time"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Full-time
                </Link>
                <Link
                  href="/jobs?type=Part-time"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Part-time
                </Link>
                <Link
                  href="/jobs?type=Remote"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Remote
                </Link>
                <Link
                  href="/jobs?type=Internship"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Internship
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            {"2026 JobSphere. Built as a college project. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
