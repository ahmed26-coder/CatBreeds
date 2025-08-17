"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ThumbsUp, ArrowRight } from "lucide-react"
import { getBreeds, getBreedImages, type CatBreed, type CatImage } from "@/lib/cat-api"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useFavorites } from "@/components/favorites-context"
import { useVoting } from "@/components/voting-context"

interface SuggestedBreedsProps {
  currentBreedId: string
}

interface BreedWithImage extends CatBreed {
  image?: CatImage
}

export function SuggestedBreeds({ currentBreedId }: SuggestedBreedsProps) {
  const [suggestedBreeds, setSuggestedBreeds] = useState<BreedWithImage[]>([])
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { voteOnImage, getVote } = useVoting()

  useEffect(() => {
    const fetchSuggestedBreeds = async () => {
      try {
        const allBreeds = await getBreeds()

        // Filter out current breed and get 4 random suggestions
        const otherBreeds = allBreeds.filter((breed) => breed.id !== currentBreedId)
        const shuffled = otherBreeds.sort(() => 0.5 - Math.random())
        const selectedBreeds = shuffled.slice(0, 4)

        // Fetch images for each suggested breed
        const breedsWithImages = await Promise.all(
          selectedBreeds.map(async (breed) => {
            try {
              const images = await getBreedImages(breed.id, 1)
              return {
                ...breed,
                image: images[0] || undefined,
              }
            } catch (error) {
              console.error(`Failed to fetch image for breed ${breed.id}:`, error)
              return breed
            }
          }),
        )

        setSuggestedBreeds(breedsWithImages)
      } catch (error) {
        console.error("Failed to fetch suggested breeds:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestedBreeds()
  }, [currentBreedId])

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
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">You Might Also Like</h2>
            <div className="animate-pulse bg-muted h-4 w-64 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-square rounded-lg mb-4"></div>
                <div className="bg-muted h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-muted h-3 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (suggestedBreeds.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">You Might Also Like</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover other amazing cat breeds that might interest you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {suggestedBreeds.map((breed) => {
            const isFavorited = breed.image ? isFavorite(breed.image.id) : false
            const currentVote = breed.image ? getVote(breed.image.id) : null
            const isVoted = currentVote === "up"

            return (
              <Link key={breed.id} href={`/breeds/${breed.id}`}>
                <Card className="group py-0 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-background border-border">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      {breed.image ? (
                        <Image
                        priority
                        width={700}
                        height={700}
                          src={breed.image.url || "/placeholder.svg"}
                          alt={breed.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-muted-foreground text-center p-4">
                          <span className="text-4xl mb-2 block">🐱</span>
                          <span className="text-sm">No image available</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons Overlay */}
                    {breed.image && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => handleFavorite(e, breed.image!.id)}
                          className={cn("h-8 text-white hover:text-black w-8 p-0 bg-background/80 backdrop-blur-sm", isFavorited && "text-red-500")}
                        >
                          <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => handleVote(e, breed.image!.id)}
                          className={cn("h-8 text-white hover:text-black w-8 p-0 bg-background/80 backdrop-blur-sm", isVoted && "text-green-500")}
                        >
                          <ThumbsUp className={cn("h-4 w-4", isVoted && "fill-current")} />
                        </Button>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {breed.name}
                      </h3>

                      {breed.origin && <p className="text-sm text-muted-foreground">Origin: {breed.origin}</p>}

                      <p className="text-sm text-muted-foreground line-clamp-2">{breed.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
