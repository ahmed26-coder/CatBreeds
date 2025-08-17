"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ThumbsUp, MapPin, Clock } from "lucide-react"
import { getBreedImages, type CatBreed, type CatImage } from "@/lib/cat-api"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/components/favorites-context"
import { useVoting } from "@/components/voting-context"
import Image from "next/image"

interface BreedCardProps {
  breed: CatBreed
}

export function BreedCard({ breed }: BreedCardProps) {
  const [breedImage, setBreedImage] = useState<CatImage | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { voteOnImage, getVote } = useVoting()

  useEffect(() => {
    const fetchBreedImage = async () => {
      try {
        const images = await getBreedImages(breed.id, 1)
        if (images.length > 0) {
          setBreedImage(images[0])
        }
      } catch (error) {
        console.error(`Failed to fetch image for breed ${breed.id}:`, error)
      } finally {
        setImageLoading(false)
      }
    }

    fetchBreedImage()
  }, [breed.id])

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (breedImage) {
      await toggleFavorite(breedImage.id)
    }
  }

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (breedImage) {
      await voteOnImage(breedImage.id, "up")
    }
  }

  const temperaments = breed.temperament?.split(", ").slice(0, 3) || []
  const isFavorited = breedImage ? isFavorite(breedImage.id) : false
  const currentVote = breedImage ? getVote(breedImage.id) : null
  const isVoted = currentVote === "up"

  return (
    <Link href={`/breeds/${breed.id}`} className="h-full">
      <Card className="group py-0 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card border-border h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          {/* Image */}
          <div className="aspect-square bg-muted flex items-center justify-center">
            {imageLoading ? (
              <div className="animate-pulse bg-muted-foreground/20 w-full h-full" />
            ) : breedImage ? (
              <Image
                width={500}
                height={500}
                priority
                src={breedImage.url || "/placeholder.svg"}
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
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleFavorite}
              className={cn(
                "h-8 w-8 p-0 text-white hover:text-black bg-background/80 backdrop-blur-sm",
                isFavorited && "text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleVote}
              className={cn(
                "h-8 w-8 p-0 text-white hover:text-black bg-background/80 backdrop-blur-sm",
                isVoted && "text-green-500"
              )}
            >
              <ThumbsUp className={cn("h-4 w-4", isVoted && "fill-current")} />
            </Button>
          </div>
        </div>

        <CardContent className="p-4 pt-0 flex-1 flex flex-col">
          <div className="space-y-3 flex-1 flex flex-col">
            {/* Breed Name */}
            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {breed.name}
            </h3>

            {/* Origin and Lifespan */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {breed.origin && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{breed.origin}</span>
                </div>
              )}
              {breed.life_span && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{breed.life_span} years</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">{breed.description}</p>

            {/* Temperament Tags */}
            {temperaments.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-auto">
                {temperaments.map((temperament) => (
                  <Badge
                    key={temperament}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {temperament.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
