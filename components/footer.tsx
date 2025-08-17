"use client"


import { useAuth } from "@/lib/auth-context"
import { Heart, Vote, User, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"

export function UserFooter() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-heading font-semibold text-lg">Welcome back!</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-heading font-semibold text-lg">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/favorites"
                className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>My Favorites</span>
              </Link>
              <Link
                href="/breeds"
                className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Vote className="w-4 h-4" />
                <span>Vote on Breeds</span>
              </Link>
            </div>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-heading font-semibold text-lg">Account</h3>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <Link
                href="/contact"
                className="flex items-center space-x-2 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Support</span>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-heading font-semibold text-lg">Your Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Favorites:</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Votes Cast:</span>
                <span className="text-white font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Member Since:</span>
                <span className="text-white font-medium">Today</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center">
          <p className="text-slate-400 text-sm">© 2024 CatBreeds. Made with ❤️ for cat lovers everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
