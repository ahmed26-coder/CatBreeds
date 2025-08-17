"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ExternalLink } from "lucide-react"
import type { Favourite, CatImage } from "@/lib/cat-api"
import Link from "next/link"
import { useFavorites } from "@/components/favorites-context"
import Image from "next/image"

interface FavoriteImageCardProps {
  favorite: Favourite & { image: CatImage }
}

export function FavoriteImageCard({ favorite }: FavoriteImageCardProps) {
  const { removeFavorite } = useFavorites()
  const { image } = favorite

  const handleRemoveFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await removeFavorite(image.id)
  }

  const breed = image.breeds?.[0]

  return (
    <Card className="group py-0 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card border-border">
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Image */}
        <div className="aspect-square bg-muted">
          <Image
          priority
          width={500}
          height={500}
            src={image.url || "/placeholder.svg"}
            alt={breed?.name || "Cat"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Remove Favorite Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleRemoveFavorite}
            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm text-red-500 hover:text-red-600"
          >
            <Heart className="h-4 w-4 fill-current" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {/* Breed Info */}
          {breed ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {breed.name}
                </h3>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/breeds/${breed.id}`}>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>

              {breed.origin && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {breed.origin}
                </Badge>
              )}

              {breed.temperament && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {breed.temperament.split(", ").slice(0, 3).join(", ")}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-2">
              <h3 className="font-heading text-lg font-semibold text-foreground">Beautiful Cat</h3>
              <p className="text-sm text-muted-foreground">No breed information available</p>
            </div>
          )}

          {/* Added Date */}
          <p className="text-xs text-muted-foreground">Added {new Date(favorite.created_at).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
