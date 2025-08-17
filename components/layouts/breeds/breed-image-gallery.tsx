"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ThumbsUp, ThumbsDown } from "lucide-react"
import type { CatImage } from "@/lib/cat-api"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/components/favorites-context"
import { useVoting } from "@/components/voting-context"
import Image from "next/image"

interface BreedImageGalleryProps {
  images: CatImage[]
  breedName: string
}

export function BreedImageGallery({ images, breedName }: BreedImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<CatImage | null>(images[0] || null)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { voteOnImage, getVote } = useVoting()

  const handleFavorite = async (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await toggleFavorite(imageId)
  }

  const handleVote = async (imageId: string, voteType: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation()
    await voteOnImage(imageId, voteType)
  }

  if (images.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <span className="text-6xl mb-4 block">🐱</span>
          <p className="text-lg">No images available for this breed</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden py-0">
        <div className="relative group">
          <div className="aspect-[4/3] bg-muted">
            {selectedImage && (
              <Image
              priority
              width={700}
              height={700}
                src={selectedImage.url || "/placeholder.svg"}
                alt={`${breedName} cat`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Image Actions Overlay */}
          {selectedImage && (
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => handleFavorite(selectedImage.id, e)}
                className={cn("bg-background/80 text-white hover:text-black backdrop-blur-sm", isFavorite(selectedImage.id) && "text-red-500")}
              >
                <Heart className={cn("h-4 w-4", isFavorite(selectedImage.id) && "fill-current")} />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => handleVote(selectedImage.id, "up", e)}
                className={cn(
                  "bg-background/80 text-white hover:text-black backdrop-blur-sm",
                  getVote(selectedImage.id) === "up" && "text-green-500",
                )}
              >
                <ThumbsUp className={cn("h-4 w-4", getVote(selectedImage.id) === "up" && "fill-current")} />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => handleVote(selectedImage.id, "down", e)}
                className={cn(
                  "bg-background/80 text-white hover:text-black backdrop-blur-sm",
                  getVote(selectedImage.id) === "down" && "text-red-500",
                )}
              >
                <ThumbsDown className={cn("h-4 w-4", getVote(selectedImage.id) === "down" && "fill-current")} />
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                selectedImage?.id === image.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50",
              )}
            >
              <Image
              priority
              width={700}
              height={700}
                src={image.url || "/placeholder.svg"}
                alt={`${breedName} thumbnail`}
                className="w-full h-full object-cover"
              />

              {/* Favorite indicator */}
              {isFavorite(image.id) && (
                <div className="absolute top-1 right-1">
                  <Heart className="h-3 w-3 text-red-500 fill-current" />
                </div>
              )}

              {/* Vote indicator */}
              {getVote(image.id) && (
                <div className="absolute top-1 left-1">
                  {getVote(image.id) === "up" ? (
                    <ThumbsUp className="h-3 w-3 text-green-500 fill-current" />
                  ) : (
                    <ThumbsDown className="h-3 w-3 text-red-500 fill-current" />
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
