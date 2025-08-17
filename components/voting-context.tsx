"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { voteOnImage, type Vote } from "@/lib/cat-api"

interface VotingContextType {
  votes: Map<string, "up" | "down">
  isLoading: boolean
  voteOnImage: (imageId: string, voteType: "up" | "down") => Promise<void>
  getVote: (imageId: string) => "up" | "down" | null
  removeVote: (imageId: string) => void
  voteHistory: Vote[]
}

const VotingContext = createContext<VotingContextType | undefined>(undefined)

export function VotingProvider({ children }: { children: React.ReactNode }) {
  const [votes, setVotes] = useState<Map<string, "up" | "down">>(new Map())
  const [voteHistory, setVoteHistory] = useState<Vote[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load votes from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem("cat-votes")
    const savedHistory = localStorage.getItem("cat-vote-history")

    if (savedVotes) {
      try {
        const votesArray = JSON.parse(savedVotes)
        setVotes(new Map(votesArray))
      } catch (error) {
        console.error("Failed to load saved votes:", error)
      }
    }

    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory)
        setVoteHistory(history)
      } catch (error) {
        console.error("Failed to load vote history:", error)
      }
    }
  }, [])

  // Save votes to localStorage whenever votes change
  useEffect(() => {
    localStorage.setItem("cat-votes", JSON.stringify([...votes]))
  }, [votes])

  // Save vote history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cat-vote-history", JSON.stringify(voteHistory))
  }, [voteHistory])

  const vote = async (imageId: string, voteType: "up" | "down") => {
    try {
      setIsLoading(true)

      // Call the API
      const voteValue = voteType === "up" ? 1 : 0
      const voteResponse = await voteOnImage(imageId, voteValue)

      // Update local state
      setVotes((prev) => {
        const newVotes = new Map(prev)
        if (newVotes.get(imageId) === voteType) {
          // Remove vote if clicking the same vote type
          newVotes.delete(imageId)
        } else {
          // Set new vote
          newVotes.set(imageId, voteType)
        }
        return newVotes
      })

      // Add to vote history
      setVoteHistory((prev) => [voteResponse, ...prev.slice(0, 49)]) // Keep last 50 votes
    } catch (error) {
      console.error("Failed to vote on image:", error)

      // Fallback to local-only voting
      setVotes((prev) => {
        const newVotes = new Map(prev)
        if (newVotes.get(imageId) === voteType) {
          newVotes.delete(imageId)
        } else {
          newVotes.set(imageId, voteType)
        }
        return newVotes
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getVote = (imageId: string): "up" | "down" | null => {
    return votes.get(imageId) || null
  }

  const removeVote = (imageId: string) => {
    setVotes((prev) => {
      const newVotes = new Map(prev)
      newVotes.delete(imageId)
      return newVotes
    })
  }

  return (
    <VotingContext.Provider
      value={{
        votes,
        isLoading,
        voteOnImage: vote,
        getVote,
        removeVote,
        voteHistory,
      }}
    >
      {children}
    </VotingContext.Provider>
  )
}

export function useVoting() {
  const context = useContext(VotingContext)
  if (context === undefined) {
    throw new Error("useVoting must be used within a VotingProvider")
  }
  return context
}
