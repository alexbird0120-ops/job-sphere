"use client"

import { useState, useEffect, useCallback } from "react"

// Custom hook for managing saved job IDs in localStorage
// Handles duplicate prevention and provides toggle functionality
export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedJobs")
      if (stored) {
        setSavedIds(JSON.parse(stored))
      }
    } catch {
      // If localStorage is unavailable, start with empty array
    }
    setLoaded(true)
  }, [])

  // Persist to localStorage whenever savedIds changes
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem("savedJobs", JSON.stringify(savedIds))
      } catch {
        // Silently fail if localStorage is full or unavailable
      }
    }
  }, [savedIds, loaded])

  // Toggle a job: save if not saved, remove if already saved
  const toggleSave = useCallback((jobId: number) => {
    setSavedIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId)
      }
      return [...prev, jobId]
    })
  }, [])

  // Check if a specific job is saved
  const isSaved = useCallback(
    (jobId: number) => savedIds.includes(jobId),
    [savedIds]
  )

  return { savedIds, toggleSave, isSaved, loaded }
}
