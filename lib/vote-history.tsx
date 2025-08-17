"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useVoting } from "@/components/voting-context"
import { ThumbsUp, ThumbsDown, Clock } from "lucide-react"
import { Key } from "react"

export function VoteHistory() {
  const { voteHistory } = useVoting()

  if (voteHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Vote History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No votes yet. Start voting on cat images to see your history here!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="font-heading text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Votes ({voteHistory.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {voteHistory.slice(0, 10).map((vote: { id: Key | null | undefined; value: number; created_at: string | number | Date }) => (
            <div key={vote.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {vote.value === 1 ? (
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-medium">{vote.value === 1 ? "Upvoted" : "Downvoted"}</span>
              </div>
              <div className="text-xs text-muted-foreground">{new Date(vote.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
