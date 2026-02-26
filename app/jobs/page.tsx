"use client";

import { Suspense } from "react";
import { JobsContent } from "./jobs-content";

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Browse Jobs
              </h1>
              <p className="text-sm text-muted-foreground">Loading jobs...</p>
            </div>
          </div>
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
