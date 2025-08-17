"use client"
import Image from "next/image"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative">
            <Image
            priority
            width={700}
            height={700}
              src="/placeholder.svg?height=200&width=300"
              alt="Error Cat"
              className="mx-auto rounded-lg opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500/20 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-slate-400 mb-2 leading-relaxed">
          Even cats make mistakes sometimes! Our system encountered an unexpected error.
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="text-slate-500 text-sm cursor-pointer hover:text-slate-400 mb-2">
              Error Details (Development)
            </summary>
            <div className="bg-slate-900 p-3 rounded-lg text-xs text-red-400 font-mono overflow-auto max-h-32">
              {error.message}
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button onClick={reset} className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-slate-500 text-sm">
          If this problem persists, please{" "}
          <Link href="/contact" className="text-orange-400 hover:text-orange-300 underline">
            contact us
          </Link>{" "}
          for assistance.
        </p>
      </div>
    </div>
  )
}
