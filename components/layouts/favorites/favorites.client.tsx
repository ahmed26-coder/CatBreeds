"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

import { getFavourites, type Favourite, type CatImage } from "@/lib/cat-api"
import { Heart, Loader2 } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/components/favorites-context"
import { FavoriteImageCard } from "@/lib/favorite-image-card"
import { VoteHistory } from "@/lib/vote-history"

export default function FavoritesPage() {
  const { favorites, isLoading: favoritesLoading, refreshFavorites } = useFavorites()
  const [favoriteImages, setFavoriteImages] = useState<(Favourite & { image: CatImage })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        setLoading(true)
        const favoritesData = await getFavourites()

        // Fetch image details for each favorite
        const favoriteImagesData = await Promise.all(
          favoritesData.map(async (favorite) => {
            try {
              const response = await fetch(`https://api.thecatapi.com/v1/images/${favorite.image_id}`, {
                headers: {
                  "x-api-key": "live_gdJVidz4ZYZUYJurODkGM1on5qkv9mLy9Beepn0eg56Loaky2Hz1m0JKGIgP09WE",
                },
              })
              const image = await response.json()
              return { ...favorite, image }
            } catch (error) {
              console.error(`Failed to fetch image ${favorite.image_id}:`, error)
              return null
            }
          }),
        )

        setFavoriteImages(favoriteImagesData.filter(Boolean) as (Favourite & { image: CatImage })[])
      } catch (error) {
        console.error("Failed to fetch favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteImages()
  }, [favorites])

  if (loading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your favorites...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="font-heading text-4xl font-bold text-foreground">Your Favorites</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {favoriteImages.length > 0
              ? `You have ${favoriteImages.length} favorite cat ${favoriteImages.length === 1 ? "image" : "images"}`
              : "You haven't added any favorites yet"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {favoriteImages.length > 0 ? (
              <>
                {/* Refresh Button */}
                <div className="flex justify-center mb-6">
                  <Button variant="outline" onClick={refreshFavorites}>
                    Refresh Favorites
                  </Button>
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteImages.map((favorite) => (
                    <FavoriteImageCard key={favorite.id} favorite={favorite} />
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">No Favorites Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Start exploring cat breeds and click the heart icon on images you love to add them to your favorites.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/breeds">Browse Cat Breeds</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <VoteHistory />
          </div>
        </div>
      </main>
    </div>
  )
}
