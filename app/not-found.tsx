"use client"
import Image from "next/image"
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <Image priority width={700} height={700} src="/placeholder.svg?height=200&width=300" alt="404 Cat" className="mx-auto rounded-lg opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-orange-400 bg-slate-950/80 px-4 py-2 rounded-lg">404</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-white mb-4">Oops! Page Not Found</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          It looks like this page has wandered off like a curious cat. Don&#39;t worry, we&#39;ll help you find your way back to
          our amazing cat breeds!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <Link href="/breeds" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse Breeds
            </Link>
          </Button>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-slate-400 hover:text-orange-400 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
