"use client"

import { useState, useEffect, useCallback } from "react"

export interface AppliedJob {
  jobId: number
  appliedAt: string
  applicantName: string
  applicantEmail: string
}

// Custom hook for managing applied jobs in localStorage
export function useAppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load applied jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("appliedJobs")
      if (stored) {
        setAppliedJobs(JSON.parse(stored))
      }
    } catch {
      // If localStorage is unavailable, start with empty array
    }
    setLoaded(true)
  }, [])

  // Persist to localStorage whenever appliedJobs changes
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs))
      } catch {
        // Silently fail if localStorage is full or unavailable
      }
    }
  }, [appliedJobs, loaded])

  // Mark a job as applied
  const markApplied = useCallback(
    (jobId: number, name: string, email: string) => {
      setAppliedJobs((prev) => {
        if (prev.some((a) => a.jobId === jobId)) return prev
        return [
          ...prev,
          {
            jobId,
            appliedAt: new Date().toISOString(),
            applicantName: name,
            applicantEmail: email,
          },
        ]
      })
    },
    []
  )

  // Check if a specific job has been applied to
  const hasApplied = useCallback(
    (jobId: number) => appliedJobs.some((a) => a.jobId === jobId),
    [appliedJobs]
  )

  // Get application details for a specific job
  const getApplication = useCallback(
    (jobId: number) => appliedJobs.find((a) => a.jobId === jobId),
    [appliedJobs]
  )

  return { appliedJobs, markApplied, hasApplied, getApplication, loaded }
}
