"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Heart, ThumbsUp, ArrowRight, Search } from "lucide-react"
import { getRandomImages, type CatImage } from "@/lib/cat-api"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useVoting } from "@/components/voting-context"
import { useFavorites } from "@/components/favorites-context"
import Image from "next/image"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [featuredImages, setFeaturedImages] = useState<CatImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        const images = await getRandomImages(5)
        setFeaturedImages(images)
      } catch (error) {
        console.error("Failed to fetch featured images:", error)
      }
    }

    fetchFeaturedImages()
  }, [])

  useEffect(() => {
    if (featuredImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [featuredImages.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/breeds?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {featuredImages.map((img, index) => (
          <div
            key={img.id}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${img.url})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Amazing
          <span className="block text-primary">Cat Breeds</span>
        </h1>

        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Explore hundreds of cat breeds from around the world. Vote on your favorites, save the ones you love,
          and learn everything about these amazing felines.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex max-w-md mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search cat breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/90 backdrop-blur-sm border-border"
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/breeds">
              Browse All Breeds
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-card/90 backdrop-blur-sm">
            <Link href="/favorites">View Favorites</Link>
          </Button>
        </div>
      </div>

      {/* Image Indicators */}
      {featuredImages.length > 0 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImageIndex ? "bg-primary" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}




export function FeaturedCatsSection() {
    const [featuredCats, setFeaturedCats] = useState<CatImage[]>([])
    const [loading, setLoading] = useState(true)
    const { isFavorite, toggleFavorite } = useFavorites()
    const { voteOnImage, getVote } = useVoting()

    useEffect(() => {
        const fetchFeaturedCats = async () => {
            try {
                const images = await getRandomImages(8)
                setFeaturedCats(images)
            } catch (error) {
                console.error("Failed to fetch featured cats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchFeaturedCats()
    }, [])

    const handleFavorite = async (e: React.MouseEvent, imageId: string) => {
        e.preventDefault()
        e.stopPropagation()
        await toggleFavorite(imageId)
    }

    const handleVote = async (e: React.MouseEvent, imageId: string) => {
        e.preventDefault()
        e.stopPropagation()
        await voteOnImage(imageId, "up")
    }

    if (loading) {
        return (
            <section className="py-16 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Featured Cats</h2>
                        <div className="animate-pulse bg-muted h-4 w-64 mx-auto rounded"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-muted aspect-square rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Featured Cats</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover beautiful cats from our community. Vote on your favorites and add them to your collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {featuredCats.map((cat) => {
                        const isFavorited = isFavorite(cat.id)
                        const currentVote = getVote(cat.id)
                        const isVoted = currentVote === "up"

                        return (
                            <Card
                                key={cat.id}
                                className="group py-0 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-background border-border"
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <div className="aspect-square bg-muted">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={cat.url || "/placeholder.svg"}
                                            alt="Featured cat"
                                            priority
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={(e) => handleFavorite(e, cat.id)}
                                            className={cn("h-8 w-8 p-0 text-white hover:text-black bg-background/80 backdrop-blur-sm", isFavorited && "text-red-500")}
                                        >
                                            <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={(e) => handleVote(e, cat.id)}
                                            className={cn("h-8 w-8 p-0 text-white hover:text-black bg-background/80 backdrop-blur-sm", isVoted && "text-green-500")}
                                        >
                                            <ThumbsUp className={cn("h-4 w-4", isVoted && "fill-current")} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>

                <div className="text-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="/breeds">
                            View All Breeds
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
